import { cities } from "../lib/cities";
import LeadForm from "./LeadForm";
import IntentCtas from "./IntentCtas";
import JsonLd, { breadcrumbSchema, faqSchema } from "./JsonLd";

export default function NeighborhoodPage({ page }) {
  const city = cities.find((entry) => entry.slug === page.city);
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>فايبر حي {page.name} {city.name} وفحص التغطية</h1><p className="hero-sub">{page.introduction}</p>
      <IntentCtas city={city.slug} />
    </div><LeadForm defaultCity={city.slug} defaultDistrict={page.name} /></div></section>
    <section className="container"><h2>التحقق من عنوانك في حي {page.name}</h2>
      <p className="notice">التغطية تختلف حسب المبنى والعنوان؛ وجود الخدمة لدى جار أو في جزء من الحي لا يثبت توفرها في منزلك.</p>
      <p>{page.addressAdvice}</p><a href={`/coverage?city=${city.slug}`}>اطلب فحص عنوان المبنى</a>
      {page.operatorLinks?.length > 0 && <><h2>خيارات موثقة للمراجعة</h2><div className="cities">{page.operatorLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div></>}
      <h2>طريقة الطلب</h2><p>أرسل موقع المبنى، وانتظر التحقق من المشغل قبل مراجعة الباقة وتكاليفها. جهز بيانات الاشتراك فقط في قناة موثوقة، واحتفظ بمرجع الطلب للمتابعة.</p>
      <h2>إذا لم تتوفر الألياف</h2><p>راجع <a href="/5g">خيارات 5G</a> حسب الإشارة داخل المنزل، واقرأ <a href="/fiber-vs-5g">مقارنة الفايبر و5G</a> قبل اختيار البديل.</p>
      <h2>أسئلة خاصة بحي {page.name}</h2><div className="card faq">{page.faqs.map((faq) => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</div>
      <h2>المصادر والمراجعة</h2><ul>{page.sources.map((source) => <li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.label}</a></li>)}</ul>
      <p>المراجعة التحريرية: <time dateTime={page.editorialReviewDate}>{page.editorialReviewDate}</time></p><a href={`/${city.slug}`}>كل خيارات الإنترنت في {city.name}</a>
      <JsonLd data={[breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: city.name, path: `/${city.slug}` }, { name: `حي ${page.name}`, path: `/${city.slug}/${page.slug}` }]), faqSchema(page.faqs), { "@type": "WebPage", name: `فايبر حي ${page.name} ${city.name}`, url: `https://saudiwasel.com/${city.slug}/${page.slug}`, inLanguage: "ar-SA" }]} />
    </section>
  </main>;
}
