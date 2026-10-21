import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
// Load the same metadata helpers without requiring Next's extension resolver.
async function moduleUrl(path) {
  let source = await readFile(new URL(path, root), "utf8");
  for (const match of [...source.matchAll(/from "(\.\/[^"\n]+)"/g)]) {
    const dependency = new URL(`${match[1]}.js`, new URL(path, root));
    const url = await moduleUrl(dependency.href);
    source = source.replace(match[0], `from "${url}"`);
  }
  return `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
}

const { languagePairs, languageAlternates } = await import(await moduleUrl("lib/languages.js"));
const { pageMetadata, SITE_URL } = await import(await moduleUrl("lib/seo.js"));

for (const pair of languagePairs) {
  // Guard the published-route registry against links to missing English pages.
  await access(new URL(`app${pair.en}/page.js`, root));
  if (pair.switchOnly) continue;
  const expected = { ar: pair.ar, en: pair.en, "x-default": pair.ar };
  assert.deepEqual(languageAlternates(pair.ar), expected);
  assert.deepEqual(languageAlternates(pair.en), expected);
}

for (const path of ["/buraidah", "/abha", "/abha/5g", "/riyadh", "/riyadh/stc", "/khobar"]) {
  const expected = { ar: `${SITE_URL}${path}`, "x-default": `${SITE_URL}${path}` };
  const metadata = pageMetadata({
    title: "City",
    description: "City landing page",
    alternates: { canonical: path, languages: { en: "/en/nonexistent" } },
  });
  assert.deepEqual(metadata.alternates.languages, expected);
}

for (const path of ["/jeddah", "/riyadh/5g", "/en/fiber-internet-jeddah"]) {
  const metadata = pageMetadata({ title: "City", description: "City" }, path);
  assert.ok(metadata.alternates.languages.en);
  assert.equal(metadata.alternates.languages["x-default"], metadata.alternates.languages.ar);
}
assert.deepEqual(languageAlternates("/abha/"), { ar: "/abha", "x-default": "/abha" });
assert.equal(languageAlternates("/en/5g-home-internet-khobar"), undefined);
console.log("Hreflang checks passed: published English routes, reciprocal pairs, Arabic-only fallbacks, and stale override protection.");
