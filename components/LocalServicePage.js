import { pageMetadata } from "../lib/seo";
import LeadForm from "./LeadForm";
import PricesTable from "./PricesTable";
import JsonLd, { breadcrumbSchema, faqSchema } from "./JsonLd";
import { prices } from "../data/prices";
import { localServicePages } from "../lib/local-service-pages.mjs";

export function localServiceMetadata(key) {
  const page = localServicePages[key];
  const url = `https://saudiwasel.com/${key}`;
  const image = imageFor(key);
  const metadata = pageMetadata({ title: page.title, description: "", alternates: { canonical: url } });
  return {
    ...metadata,
    title: { absolute: metadata.title },
    openGraph: { ...metadata.openGraph, images: [{ url: `https://saudiwasel.com${image}`, width: 1200, height: 675, alt: altFor(key) }] },
    twitter: { ...metadata.twitter, images: [`https://saudiwasel.com${image}`] },
  };
}
function imageFor(key) { const [city, type] = key.split("/"); return `/images/${type === "zain" ? "fiber-zain" : "5g-router"}-${city}.webp`; }
function altFor(key) { const page = localServicePages[key]; return key.endsWith("zain") ? `مندوب فايبر زين في ${page.city}` : `راوتر 5G منزلي في ${page.city}`; }
function ContactButtons() {
  return <div className="intent-ctas"><a className="btn btn-call" href="tel:0564612017">اتصل الآن 0564612017</a><a className="btn btn-wa" href="https://wa.me/966564612017">واتساب 0564612017</a></div>;
}
export default function LocalServicePage({ pageKey }) {
  const page = localServicePages[pageKey];
  const [city, type] = pageKey.split("/");
  const isZain = type === "zain";
  const path = `/${pageKey}`;
  const operators = isZain ? ["zain"] : ["zain", "stc", "mobily"];
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: page.city, path: `/${city}` }, { name: isZain ? "فايبر زين" : "راوتر الجيل الخامس", path }]),
    faqSchema(page.faqs),
    { "@type": "Service", "@id": `https://saudiwasel.com${path}#service`, name: page.h1, serviceType: isZain ? "مساعدة في طلب الفايبر وفحص العنوان" : "مساعدة في طلب راوتر منزلي 5G", url: `https://saudiwasel.com${path}`, areaServed: { "@type": "City", name: page.city }, provider: { "@id": "https://saudiwasel.com/#organization" }, description: page.intro.split(".")[0] },
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>{page.h1}</h1><p className="hero-sub" data-editorial>{page.intro}</p><ContactButtons />
    </div><LeadForm defaultCity={page.city} operator={isZain ? "زين" : "راوتر 5G"} /></div></section>
    <article className="container" data-local-service={pageKey}>
      <figure style={{ margin: "2rem 0" }}><img src={imageFor(pageKey)} alt={altFor(pageKey)} width="1200" height="675" loading="eager" fetchPriority="high" style={{ width: "100%", height: "auto", borderRadius: "16px" }} /></figure>
      <h2>{isZain ? "مندوب زين" : "راوتر 5G"} في أحياء {page.city}</h2>
      <div className="card faq">{page.districts.map(district => <div key={district.name}><h3>حي {district.name}</h3><p data-editorial>{district.text}</p></div>)}</div>
      {isZain && <><h2>باقات فايبر زين في {page.city}</h2><PricesTable operator="zain" service="fiber" /></>}
      <h2>{isZain ? `باقات زين 5G للمقارنة في ${page.city}` : `باقات راوتر 5G المنزلية في ${page.city}`}</h2>
      <p data-editorial>{page.pricing}</p>
      {operators.map(operator => <div key={operator} data-price-source>
        <h3>باقات {prices[operator].name} — الجيل الخامس</h3>
        <PricesTable operator={operator} service="fiveg" note={`راجع عرض ${prices[operator].name} لعنوانك في ${page.city} قبل ${isZain ? "اعتماد البديل الخلوي" : "تسجيل اشتراك الراوتر"}، بما يشمل الجهاز والالتزام.`} context={`${prices[operator].name} ${page.city} ${isZain ? "للخيار البديل" : "للراوتر المنزلي"}`} />
        <p className="small-note">آخر تحديث لباقات {prices[operator].name}: <time dateTime={prices[operator].updatedISO}>{prices[operator].updatedISO}</time></p>
      </div>)}
      <h2>فايبر ولا 5G؟</h2>
      <div className="table-wrap" role="region" aria-label={`مقارنة الإنترنت في ${page.city}`} tabIndex={0}><table className="compare"><thead><tr>{["الاستخدام", isZain ? "الفايبر" : "من زاوية 5G", isZain ? "5G" : "مقابل الفايبر", "الخيار الأنسب"].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{page.comparison.map(row => <tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>
      <h2>خطوات الطلب</h2><ol className="req-list">{page.steps.map(step => <li data-editorial key={step}>{step}</li>)}</ol>
      <h2>جهّز قبل ما تتصل</h2><p data-editorial>{page.prepare}</p>
      <h2>أسئلة عن {isZain ? "فايبر زين" : "راوتر 5G"} في {page.city}</h2>
      <div className="card faq">{page.faqs.map(faq => <div key={faq.q}><h3>{faq.q}</h3><p data-editorial>{faq.a}</p></div>)}</div>
      <h2>خدمات وأدلة تساعدك على الاختيار</h2><nav className="cities" aria-label={`روابط خدمات ${page.city}`}>
        {[['stc','STC'],['salam','سلام'],['mobily','موبايلي']].map(([slug,name]) => <a key={slug} href={`/${city}/${slug}`}>فايبر {name} {page.city}</a>)}
        <a href="/coverage">فحص التغطية</a><a href="/fiber-installation">دليل تركيب الفايبر</a><a href="/salam">باقات سلام</a><a href="/stc">باقات STC</a><a href="/mobily">باقات موبايلي</a>
      </nav>
      <h2>{isZain ? `ابدأ مراجعة عنوانك في ${page.city}` : `اطلب اتصالاً يناسب سكنك في ${page.city}`}</h2><p data-editorial>{page.closing}</p><ContactButtons />
    </article><JsonLd data={schemas} />
  </main>;
}
