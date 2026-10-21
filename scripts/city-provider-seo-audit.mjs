import assert from 'node:assert/strict';
import { parse } from 'parse5';

const base = process.argv[2] || 'http://localhost:8889';
const cities = { riyadh: 'الرياض', jeddah: 'جدة', makkah: 'مكة المكرمة', madinah: 'المدينة المنورة', taif: 'الطائف', dammam: 'الدمام', khobar: 'الخبر', abha: 'أبها', tabuk: 'تبوك', buraidah: 'بريدة', hail: 'حائل', jazan: 'جازان' };
const providers = { stc: 'STC', salam: 'سلام', mobily: 'موبايلي' };
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const text = node => node?.value || (node?.childNodes || []).map(text).join('');
function findAll(node, predicate) {
  return [...(predicate(node) ? [node] : []), ...(node.childNodes || []).flatMap(child => findAll(child, predicate))];
}
async function load(path) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const doc = parse(await response.text());
  const head = findAll(doc, n => n.tagName === 'head')[0];
  const canonicals = findAll(doc, n => n.tagName === 'link' && attr(n, 'rel') === 'canonical');
  assert.equal(canonicals.length, 1, `${path}: exactly one canonical`);
  assert.ok(findAll(head, n => n === canonicals[0]).length, `${path}: canonical in head`);
  assert.equal(attr(canonicals[0], 'href'), `https://saudiwasel.com${path === '/' ? '' : path}`);
  return doc;
}
await load('/');
const seenFaqs = new Set();
const seenContent = new Set();
for (const [city, cityName] of Object.entries(cities)) {
  for (const [provider, providerName] of Object.entries(providers)) {
    const path = `/${city}/${provider}`;
    const doc = await load(path);
    const main = findAll(doc, n => n.tagName === 'main')[0];
    const content = text(main);
    assert.ok(!seenContent.has(content), `${path}: distinct page content`);
    seenContent.add(content);
    const heading = `أسعار فايبر ${providerName} في ${cityName}`;
    assert.ok(findAll(main, n => n.tagName === 'h2' && text(n) === heading).length, `${path}: local pricing heading`);
    assert.ok(findAll(main, n => n.tagName === 'caption' && text(n) === heading).length, `${path}: local table caption`);
    const question = `كيف أتحقق من توفر ${providerName} في حيي في ${cityName}؟`;
    const faqHeading = findAll(main, n => /^h[2-6]$/.test(n.tagName) && text(n) === question)[0];
    assert.ok(faqHeading, `${path}: visible local FAQ`);
    const graph = findAll(doc, n => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json').flatMap(n => {
      const data = JSON.parse(text(n));
      return data['@graph'] || [data];
    });
    const faq = graph.find(n => n['@type'] === 'FAQPage');
    assert.ok(faq, `${path}: FAQ schema`);
    for (const entry of faq.mainEntity) {
      assert.ok(!seenFaqs.has(entry.name), `${path}: unique question`);
      seenFaqs.add(entry.name);
      assert.ok(content.includes(entry.name) && content.includes(entry.acceptedAnswer.text), `${path}: schema matches visible FAQ`);
    }
    for (const neighborhood of ({ riyadh: ['الياسمين', 'الملقا'], buraidah: ['الأفق', 'الريان'] }[city] || [])) {
      assert.ok(content.includes(neighborhood), `${path}: ${neighborhood}`);
    }
    console.log(`Passed ${path}`);
  }
}
console.log('Homepage and all 36 city-provider pages passed canonical, pricing, local content, and FAQ checks.');
