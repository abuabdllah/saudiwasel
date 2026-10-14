import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { parse } = require("parse5");
const base = process.argv[2] || "http://localhost:8889";
const output = process.argv[3] || ".netlify/content-audit-after.json";
const baseline = process.argv[4];
const blocks = new Set(["p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "td", "th", "blockquote", "figcaption"]);
const excluded = new Set(["header", "footer", "form", "script", "style", "noscript"]);
const normalize = (text) => text.replace(/\s+/gu, " ").trim();
const textOf = (node) => node.nodeName === "#text" ? node.value : (node.childNodes || []).map(textOf).join("");
const attribute = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const sentences = new Map();
const pages = {};
const errors = [];
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname).filter((route) => !route.startsWith("/en"));

for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  if (!response.ok) throw new Error(`${route}: HTTP ${response.status}`);
  const html = await response.text();
  const document = parse(html);
  const protectedContent = { title: "", description: "", canonical: "", prices: [] };
  let sentenceCount = 0;
  function visit(node, skip = false, insidePriceTable = false) {
    if (node.tagName === "title") protectedContent.title = normalize(textOf(node));
    if (node.tagName === "meta" && attribute(node, "name") === "description") protectedContent.description = attribute(node, "content");
    if (node.tagName === "link" && attribute(node, "rel") === "canonical") protectedContent.canonical = attribute(node, "href");
    if (node.tagName === "table") protectedContent.prices.push(normalize(textOf(node)));
    const priceTable = insidePriceTable || (node.tagName === "table" && normalize(textOf(node)).includes("الباقة") && normalize(textOf(node)).includes("التحميل"));
    const hidden = skip || excluded.has(node.tagName) || attribute(node, "hidden") !== undefined || attribute(node, "aria-hidden") === "true";
    if (!hidden && blocks.has(node.tagName) && !node.childNodes?.some((child) => blocks.has(child.tagName))) {
      const text = normalize(textOf(node));
      for (const part of text.split(/\.(?!\d)|(?<!\d)\.|[!؟?\n]+/u)) {
        const sentence = normalize(part);
        if (sentence === "موقع مستقل وغير تابع لأي مشغل" || !/[\u0600-\u06ff]/u.test(sentence) || sentence.split(/\s+/u).length < 8) continue;
        sentenceCount += 1;
        const occurrences = sentences.get(sentence) || [];
        occurrences.push({ route, element: node.tagName, protectedPriceCell: priceTable && ["td", "th"].includes(node.tagName) });
        sentences.set(sentence, occurrences);
      }
      return;
    }
    for (const child of node.childNodes || []) visit(child, hidden, priceTable);
  }
  visit(document);
  pages[route] = { sentenceCount, ...protectedContent };
  process.stdout.write(`Checked ${route}\n`);
}

const duplicates = [...sentences.entries()].filter(([, occurrences]) => occurrences.length > 1).map(([sentence, occurrences]) => ({ sentence, occurrences }));
const protectedPriceDuplicates = duplicates.filter((duplicate) => duplicate.occurrences.every((occurrence) => occurrence.protectedPriceCell));
const editableDuplicateSentenceCount = duplicates.length - protectedPriceDuplicates.length;
if (baseline) {
  const before = JSON.parse(await readFile(baseline, "utf8"));
  if (JSON.stringify(Object.keys(before.pages).sort()) !== JSON.stringify([...routes].sort())) errors.push("Arabic routes changed");
  for (const [route, page] of Object.entries(pages)) {
    for (const field of ["title", "description", "canonical", "prices"]) {
      if (JSON.stringify(page[field]) !== JSON.stringify(before.pages[route]?.[field])) errors.push(`${route}: ${field} changed`);
    }
  }
}
await mkdir(output.substring(0, output.lastIndexOf("/")) || ".", { recursive: true });
await writeFile(output, `${JSON.stringify({ pageCount: routes.length, duplicateSentenceCount: duplicates.length, editableDuplicateSentenceCount, protectedPriceDuplicateSentenceCount: protectedPriceDuplicates.length, extraOccurrences: duplicates.reduce((total, duplicate) => total + duplicate.occurrences.length - 1, 0), errors, pages, duplicates }, null, 2)}\n`);
console.log(JSON.stringify({ pages: routes.length, duplicateSentences: duplicates.length, editableDuplicateSentenceCount, protectedPriceDuplicateSentenceCount: protectedPriceDuplicates.length, errors }, null, 2));
if (errors.length || editableDuplicateSentenceCount) process.exitCode = 1;
