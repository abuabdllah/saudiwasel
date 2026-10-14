import { parse } from "parse5";
import { readFile, writeFile } from "node:fs/promises";

const base = process.env.AUDIT_BASE_URL || "http://localhost:8889";
const output = process.env.AUDIT_OUTPUT || "/tmp/neighborhood-audit.json";
const baseline = process.env.AUDIT_BASELINE;
const normalize = (text) => text.normalize("NFC").replace(/[\u0640\u064b-\u065f\u0670]/gu, "").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/gu, " ").trim();
const textOf = (node) => node.nodeName === "#text" ? node.value : (node.childNodes || []).map(textOf).join("");
const attribute = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const descendants = (node) => [node, ...(node.childNodes || []).flatMap(descendants)];
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap: HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname).filter((route) => !route.startsWith("/en"));
const pages = {};
const paragraphs = [];
const errors = [];
const sequences = new Map();
const callToAction = "أرسل اسم حيك وموقع المبنى، ونتحقق لك من الخيارات المتاحة على عنوانك.";

for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  if (!response.ok) throw new Error(`${route}: HTTP ${response.status}`);
  const document = parse(await response.text());
  const nodes = descendants(document);
  const neighborhoodNodes = new Set();
  const pageParagraphs = [];
  for (const heading of nodes.filter((node) => node.tagName === "h2" && /أحياء/u.test(textOf(node)))) {
    const siblings = heading.parentNode.childNodes;
    for (let index = siblings.indexOf(heading) + 1; index < siblings.length && !["h1", "h2", "section"].includes(siblings[index].tagName); index += 1) {
      const sibling = siblings[index];
      const children = descendants(sibling);
      children.forEach((node) => neighborhoodNodes.add(node));
      for (const card of children.filter((node) => node.tagName === "div" && node.childNodes?.some((child) => child.tagName === "h3") && node.childNodes?.some((child) => child.tagName === "p"))) {
        const name = textOf(card.childNodes.find((child) => child.tagName === "h3"));
        for (const paragraph of card.childNodes.filter((child) => child.tagName === "p")) pageParagraphs.push({ route, name, text: textOf(paragraph).trim() });
      }
    }
  }
  paragraphs.push(...pageParagraphs);
  const arabicText = textOf(nodes.find((node) => node.tagName === "body") || {});
  if (baseline && /بـال/u.test(arabicText)) errors.push(`${route}: uncorrected بـال spelling`);
  const nonNeighborhoodText = nodes.filter((node) => node.nodeName === "#text" && !neighborhoodNodes.has(node) && !["script", "style"].includes(node.parentNode?.tagName)).map((node) => node.value).join("").replace(/\s+/gu, " ").trim();
  pages[route] = {
    title: textOf(nodes.find((node) => node.tagName === "title") || {}),
    description: attribute(nodes.find((node) => node.tagName === "meta" && attribute(node, "name") === "description") || {}, "content"),
    canonical: attribute(nodes.find((node) => node.tagName === "link" && attribute(node, "rel") === "canonical") || {}, "href"),
    prices: nodes.filter((node) => node.tagName === "table").map(textOf),
    nonNeighborhoodText,
    paragraphCount: pageParagraphs.length,
  };
  if (baseline && pageParagraphs.length) {
    const count = nodes.filter((node) => node.tagName === "p" && textOf(node).trim() === callToAction).length;
    if (count !== 1) errors.push(`${route}: expected one neighborhood CTA, found ${count}`);
  }
  process.stdout.write(`Checked ${route}: ${pageParagraphs.length} neighborhood paragraphs\n`);
}

for (const [paragraphIndex, paragraph] of paragraphs.entries()) {
  const words = normalize(paragraph.text).split(" ");
  if (baseline && (words.length < 20 || words.length > 40)) errors.push(`${paragraph.route}: ${paragraph.name}: ${words.length} words`);
  if (baseline && paragraph.text.split(/[.!؟]+/u).filter((sentence) => sentence.trim()).length > 2) errors.push(`${paragraph.route}: ${paragraph.name}: more than two sentences`);
  if (baseline && /تغطية|مغطى|مغطاة|راجع|اشتراك|راوتر|فايبر|تحقق|الشبكة|المشغل/u.test(paragraph.text)) errors.push(`${paragraph.route}: ${paragraph.name}: advice or coverage language`);
  for (let index = 0; index <= words.length - 6; index += 1) {
    const sequence = words.slice(index, index + 6).join(" ");
    if (!sequences.has(sequence)) sequences.set(sequence, new Set());
    sequences.get(sequence).add(paragraphIndex);
  }
}
const duplicates = [...sequences.entries()].filter(([, occurrences]) => occurrences.size > 1).map(([sequence, occurrences]) => ({ sequence, occurrences: [...occurrences].map((index) => ({ route: paragraphs[index].route, name: paragraphs[index].name })) }));
if (baseline) {
  const before = JSON.parse(await readFile(baseline, "utf8"));
  if (JSON.stringify(Object.keys(before.pages).sort()) !== JSON.stringify(Object.keys(pages).sort())) errors.push("Arabic routes changed");
  for (const [route, page] of Object.entries(pages)) {
    for (const field of ["title", "description", "canonical", "prices", "nonNeighborhoodText", "paragraphCount"]) {
      const previous = before.pages[route]?.[field];
      const expected = field === "nonNeighborhoodText" ? previous?.replaceAll("بـال", "بال") : previous;
      const actual = page[field];
      if (JSON.stringify(actual) !== JSON.stringify(expected)) errors.push(`${route}: ${field} changed`);
    }
  }
  if (duplicates.length) errors.push(`${duplicates.length} repeated six-word sequences`);
}
const report = { pageCount: routes.length, neighborhoodPageCount: Object.values(pages).filter((page) => page.paragraphCount).length, paragraphCount: paragraphs.length, repeatedSixWordSequences: duplicates.length, extraOccurrences: duplicates.reduce((total, duplicate) => total + duplicate.occurrences.length - 1, 0), errors, pages, paragraphs, duplicates };
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ...report, pages: undefined, paragraphs: undefined, duplicates: undefined }, null, 2));
if (errors.length) process.exitCode = 1;
