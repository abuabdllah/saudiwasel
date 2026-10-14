import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const { parse } = createRequire(import.meta.url)("parse5");
const fiveg = ["/5g", ...["stc", "salam", "mobily", "zain"].map(slug => `/5g/${slug}`), ...["jeddah", "taif", "abha", "tabuk", "madinah"].map(city => `/${city}/5g`)];
const english = ["/en", "/en/5g-home-internet-jeddah", "/en/5g-home-internet-riyadh", "/en/5g-home-internet-khobar", "/en/fiber-internet-jeddah", "/en/fiber-vs-5g"];
const common = ["official website", "stc.com.sa", "mobily.com.sa", "salam.sa", "zain.com"];
const count = (text, term) => text.split(term).length - 1;
const visibleText = node => ["script", "style"].includes(node.tagName) ? "" : node.nodeName === "#text" ? node.value : (node.childNodes || []).map(visibleText).join(" ");
const report = { pages: {}, totals: {}, errors: [] };

for (const route of [...fiveg, ...english]) {
  const isEnglish = english.includes(route);
  // Static App Router output retains route groups in the server/app directory.
  const relative = isEnglish ? route : `/(ar)${route}`;
  let html;
  for (const path of [...new Set([relative, route])]) {
    try {
      html = await readFile(`.next/server/app${path}.html`, "utf8");
      break;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  if (html === undefined) {
    report.errors.push(`${route}: generated HTML missing`);
    continue;
  }
  const terms = [...common, ...(isEnglish ? ["مندوب فايبر الرياض"] : ["افحص تغطية الفايبر", "تواصل مع مندوب فايبر", "تركيب فايبر", "اطلب فايبر"])];
  const results = Object.fromEntries(terms.map(term => [term, count(html, term)]));
  for (const [term, matches] of Object.entries(results)) {
    report.totals[term] = (report.totals[term] || 0) + matches;
    if (matches) report.errors.push(`${route}: ${term}: ${matches}`);
  }
  if (isEnglish) {
    const matches = count(visibleText(parse(html)), "Offers change frequently");
    results["Offers change frequently (visible)"] = matches;
    if (matches !== 1) report.errors.push(`${route}: Offers change frequently: expected 1, found ${matches}`);
  }
  report.pages[route] = results;
}

await mkdir(".netlify", { recursive: true });
await writeFile(".netlify/requested-pages-audit.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
