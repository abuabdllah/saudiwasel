import assert from 'node:assert/strict';
import { stat } from 'node:fs/promises';
import { parse } from 'parse5';
import { localServicePages } from '../lib/local-service-pages.mjs';

// Run against a development server or a preview URL. Shared navigation and the
// request form are excluded. Price cells are shared structured data, not prose;
// their source values remain unchanged. Editorial paragraphs and comparisons count.
const base = process.env.AUDIT_BASE_URL || 'http://localhost:8889';
const attrs = node => Object.fromEntries((node.attrs || []).map(a => [a.name,a.value]));
function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes || []) { const match = find(child,predicate); if (match) return match; }
}
function text(node) {
  if (['script','style','form'].includes(node.tagName)) return '';
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(' ');
}
function blocks(node, result = []) {
  if (['script','style','form'].includes(node.tagName)) return result;
  if (attrs(node)['data-price-source'] !== undefined) {
    for (const child of node.childNodes || []) if (child.tagName !== 'div') blocks(child,result);
    return result;
  }
  if (/^(p|li|h[1-6]|td|th)$/.test(node.tagName || '')) result.push(text(node));
  else for (const child of node.childNodes || []) blocks(child,result);
  return result;
}
const normalize = value => value.normalize('NFKC').replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
function sentences(items) {
  return items.flatMap(block => block.split(/[.!؟?؛\n]+/)).map(normalize).filter(s => s.split(' ').length >= 10);
}
async function load(path) {
  const response = await fetch(`${base}/${path}`); assert.equal(response.status,200,path);
  const doc = parse(await response.text());
  const main = find(doc,n => n.tagName === 'main'); assert.ok(main,path);
  return { doc, main, sentences: new Set(sentences(blocks(main))) };
}
const keys = Object.keys(localServicePages);
const loaded = Object.fromEntries(await Promise.all([...keys,'jeddah/zain','jeddah/5g'].map(async key => [key,await load(key)])));
const questions = new Set(); let duplicateCount = 0;
for (const key of keys) {
  const page = localServicePages[key], { doc, main } = loaded[key];
  const article = find(main,n => attrs(n)['data-local-service'] === key);
  const intro = find(main,n => attrs(n).class === 'hero-sub');
  const content = `${text(intro)} ${text(article)}`;
  const count = content.trim().split(/\s+/).length;
  console.log(`${key}: ${count} visible words`);
  assert.ok(count >= 1300 && count <= 1600,`${key}: word count ${count}`);
  const headings = [];
  function collectHeadings(n) { if (n.tagName === 'h1') headings.push(text(n).trim()); for (const child of n.childNodes || []) collectHeadings(child); }
  collectHeadings(main); assert.deepEqual(headings,[page.h1]);
  assert.equal(text(find(doc,n => n.tagName === 'title')).trim(),page.title);
  assert.ok(find(doc,n => n.tagName === 'link' && attrs(n).rel === 'canonical' && attrs(n).href === `https://saudiwasel.com/${key}`));
  for (const district of page.districts) {
    const size = district.text.trim().split(/\s+/).length;
    assert.ok(size >= 50 && size <= 70,`${key}/${district.name}: ${size} words`);
  }
  assert.equal(page.faqs.length,8);
  for (const faq of page.faqs) { assert.ok(!questions.has(normalize(faq.q)),faq.q); questions.add(normalize(faq.q)); }
  assert.ok(!content.includes('معتمد') && !content.includes('غير مؤكد'));
  if (key.startsWith('riyadh')) {
    const mentions = (content.match(/ألياف بصرية/g) || []).length;
    assert.ok(mentions >= 10 && mentions <= 15,`${key}: ${mentions} keyword mentions`);
  }
  for (const suffix of ['stc','salam','mobily']) assert.ok(find(article,n => attrs(n).href === `/${key.split('/')[0]}/${suffix}`));
  for (const path of ['/coverage','/fiber-installation','/salam','/stc','/mobily']) assert.ok(find(article,n => attrs(n).href === path));
  const scripts=[];
  function collect(n) { if(n.tagName==='script' && attrs(n).type==='application/ld+json') scripts.push(JSON.parse(n.childNodes[0].value)); for(const c of n.childNodes||[]) collect(c); } collect(main);
  for (const type of ['BreadcrumbList','FAQPage','Service']) assert.ok(scripts.some(s=>s['@graph']?.some(entry=>entry['@type']===type)),`${key}: ${type}`);
  const image = find(article,n => n.tagName === 'img');
  assert.equal(attrs(image).width,'1200'); assert.equal(attrs(image).height,'675');
  const imagePath = `public${attrs(image).src}`;
  assert.ok((await stat(imagePath)).size < 120 * 1024,imagePath);
  const sharp = (await import('sharp')).default;
  const meta = await sharp(imagePath).metadata();
  assert.equal(meta.width,1200); assert.equal(meta.height,675); assert.equal(meta.format,'webp');
  const counterparts = [`jeddah/${key.split('/')[1]}`,...keys.filter(k=>k!==key)];
  for (const other of counterparts) {
    for (const sentence of loaded[key].sentences) if (loaded[other].sentences.has(sentence)) { duplicateCount++; console.error(`Duplicate ${key} / ${other}: ${sentence}`); }
  }
}
console.log(`Matching sentences of 10+ words: ${duplicateCount}`);
assert.equal(duplicateCount,0);
console.log('Local service pages: all checks passed.');
