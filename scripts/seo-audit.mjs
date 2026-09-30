import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] || "http://localhost:8889";
const canonicalOrigin = "https://saudiwasel.com";
const errors = [];
const pages = new Map();
const headers = { "User-Agent": "Googlebot" };
const decode = (value) => value.replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number))).replace(/&#x([a-f\d]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16))).replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&nbsp;", " ");
const plain = (value) => decode(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
const reportError = (path, error) => errors.push({ path, error });

const sitemapResponse = await fetch(`${base}/sitemap.xml`, { headers });
if (sitemapResponse.status !== 200) throw new Error("Sitemap is unavailable");
const sitemap = await sitemapResponse.text();
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
if (new Set(locations).size !== locations.length) reportError("/sitemap.xml", "Duplicate URLs");
const routes = locations.map((location) => {
  const url = new URL(location);
  if (url.origin !== canonicalOrigin || url.search || url.hash) reportError("/sitemap.xml", "Non-canonical URL");
  return url.pathname;
});

for (const path of routes) {
  const response = await fetch(`${base}${path}`, { headers });
  const html = await response.text();
  if (response.status !== 200) { reportError(path, `HTTP ${response.status}`); continue; }
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attrs(match[0]));
  const meta = (name) => tags.find((tag) => tag.name === name || tag.property === name)?.content;
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attrs(match[0]));
  for (const tag of [...tags, ...links]) {
    if (Object.values(tag).some((value) => /localhost|127\.0\.0\.1|[a-z0-9-]+\.netlify\.app/i.test(value))) reportError(path, "Development or preview URL in SEO tags");
  }
  const canonical = links.find((link) => link.rel === "canonical")?.href;
  if (links.filter((link) => link.rel === "canonical").length !== 1) reportError(path, "Expected exactly one canonical link");
  const title = plain(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
  const headingMatches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  const h1 = plain(headingMatches[0]?.[1] || "");
  if (!title) reportError(path, "Missing title");
  if (headingMatches.length !== 1 || !h1) reportError(path, `Expected one H1, found ${headingMatches.length}`);
  if (!meta("description")) reportError(path, "Missing description");
  if (!canonical || new URL(canonical).href !== new URL(path, canonicalOrigin).href) reportError(path, "Incorrect canonical");
  for (const name of ["og:title", "og:description", "og:image", "og:url", "twitter:title", "twitter:description", "twitter:image", "twitter:card"]) if (!meta(name)) reportError(path, `Missing ${name}`);
  if (meta("og:url") !== canonical) reportError(path, "Open Graph URL differs from canonical");
  if (meta("robots")?.includes("noindex")) reportError(path, "Unexpected noindex");
  const alternateLinks = links.filter((link) => link.rel === "alternate" && link.hrefLang);
  for (const link of alternateLinks) {
    if (!["ar-SA", "en-SA", "x-default"].includes(link.hrefLang) || !link.href.startsWith(canonicalOrigin)) reportError(path, "Incorrect hreflang");
  }
  const visible = plain(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ""));
  const schemas = [];
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(match[1]);
      schemas.push(...(Array.isArray(data) ? data : data["@graph"] || [data]));
    } catch { reportError(path, "Invalid JSON-LD"); }
  }
  if (!schemas.length) reportError(path, "Missing schema");
  if (schemas.some((schema) => schema["@type"] === "LocalBusiness" || schema["@type"] === "Review" || schema.aggregateRating)) reportError(path, "Unsupported business or review schema");
  for (const breadcrumb of schemas.filter((schema) => schema["@type"] === "BreadcrumbList")) {
    for (const [index, item] of breadcrumb.itemListElement.entries()) {
      if (item.position !== index + 1 || !item.name || !item.item?.startsWith(`${canonicalOrigin}/`)) reportError(path, "Invalid breadcrumb item");
    }
    const lastItem = breadcrumb.itemListElement.at(-1)?.item;
    if (!lastItem || !canonical || new URL(lastItem).href !== new URL(canonical).href) reportError(path, "Breadcrumb does not end at canonical page");
  }
  for (const schema of schemas.filter((entry) => entry["@type"] === "FAQPage")) {
    for (const question of schema.mainEntity) {
      if (!visible.includes(plain(question.name)) || !visible.includes(plain(question.acceptedAnswer.text))) reportError(path, "FAQ schema does not match visible content");
    }
  }
  if (path.startsWith("/articles/")) {
    if (!schemas.some((schema) => schema["@type"] === "Article")) reportError(path, "Missing Article schema");
  }
  if (!["/", "/en"].includes(path)) {
    if (!html.includes('aria-current="page"')) reportError(path, "Missing visible breadcrumb");
    if (!schemas.some((schema) => schema["@type"] === "BreadcrumbList")) reportError(path, "Missing breadcrumb schema");
  }
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)].map((match) => decode(match[1]));
  const ids = new Set([...html.matchAll(/\bid="([^"]*)"/g)].map((match) => decode(match[1])));
  pages.set(path, { title, h1, description: meta("description"), canonical, anchors, ids, alternateLinks, schemas: schemas.map((schema) => schema["@type"]) });
  console.log(`Checked ${path}`);
}

for (const field of ["title", "h1", "description"]) {
  const seen = new Map();
  for (const [path, page] of pages) {
    if (seen.has(page[field])) reportError(path, `Duplicate ${field} with ${seen.get(page[field])}`);
    seen.set(page[field], path);
  }
}
const assetLinks = new Set();
for (const [path, page] of pages) {
  for (const href of page.anchors) {
    const url = new URL(href, `${canonicalOrigin}${path}`);
    if (url.origin !== canonicalOrigin || !["http:", "https:"].includes(url.protocol)) continue;
    if (!pages.has(url.pathname)) { assetLinks.add(url.pathname); continue; }
    if (url.hash && !pages.get(url.pathname).ids.has(decodeURIComponent(url.hash.slice(1)))) reportError(path, `Missing anchor ${url.pathname}${url.hash}`);
  }
  for (const alternate of page.alternateLinks.filter((link) => link.hrefLang !== "x-default")) {
    const counterpart = pages.get(new URL(alternate.href).pathname);
    if (!counterpart || !counterpart.alternateLinks.some((link) => link.href === page.canonical)) reportError(path, "Non-reciprocal hreflang");
  }
}
for (const path of assetLinks) {
  const response = await fetch(`${base}${path}`, { headers });
  if (response.status >= 400) reportError(path, `Broken internal link: HTTP ${response.status}`);
}
const robotsResponse = await fetch(`${base}/robots.txt`, { headers });
const robots = await robotsResponse.text();
if (robotsResponse.status !== 200 || !robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) reportError("/robots.txt", "Incorrect robots sitemap");
if (!robots.includes("Allow: /") || /Disallow:\s*\/\s*$/m.test(robots)) reportError("/robots.txt", "Important routes blocked");
for (const path of ["/api/", "/.netlify/functions/"]) if (!robots.includes(`Disallow: ${path}`)) reportError("/robots.txt", `Missing disallow: ${path}`);
for (const image of ["/opengraph-image.png", "/twitter-image.png"]) {
  const response = await fetch(`${base}${image}`, { headers });
  if (response.status !== 200) reportError(image, "Unavailable social image");
}
const report = { checkedAt: new Date().toISOString(), routeCount: routes.length, pagesChecked: pages.size, errors, pages: Object.fromEntries([...pages].map(([path, { title, h1, canonical, schemas }]) => [path, { title, h1, canonical, schemas }])) };
await mkdir(".netlify", { recursive: true });
await writeFile(".netlify/seo-audit.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ routes: routes.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
