import Image from "next/image";
import PricesTable from "./PricesTable";
import JsonLd, { breadcrumbSchema, faqSchema } from "./JsonLd";
import { cities } from "../lib/cities";
import { operatorCities } from "../lib/operators";
import { prices } from "../data/prices";

function ContactButtons() {
  return <div className="intent-ctas">
    <a className="btn btn-call" href="tel:0564612017">اتصل الآن 0564612017</a>
    <a className="btn btn-wa" href="https://wa.me/966564612017">تواصل عبر واتساب</a>
  </div>;
}

// Images are enabled only after the requested Unsplash download succeeds.
export default function NationalFiberPage({ page }) {
  const url = `https://saudiwasel.com/${page.slug}`;
  return <main className="container article-shell">
    <JsonLd data={[
      breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: page.h1, path: `/${page.slug}` }]),
      faqSchema(page.faqs),
      { "@type": "Service", "@id": `${url}#service`, name: page.h1, serviceType: page.operator ? "المساعدة في فحص تغطية الفايبر وطلب الاشتراك" : "المساعدة في طلب تركيب الألياف البصرية", url,
        description: page.description, provider: { "@id": "https://saudiwasel.com/#organization" },
        areaServed: { "@type": "Country", name: "المملكة العربية السعودية" },
        availableChannel: { "@type": "ServiceChannel", servicePhone: { "@type": "ContactPoint", telephone: "+966564612017", contactType: "customer service", availableLanguage: "ar" } } },
    ]} />
    <header className="article-header">
      <h1>{page.h1}</h1>
      {page.image && <Image src={`/images/${page.image}`} alt={page.alt} width={1200} height={675} priority sizes="(max-width: 1100px) 100vw, 1060px" style={{ width: "100%", height: "auto", borderRadius: 16 }} />}
      <p>{page.intro}</p>
      <ContactButtons />
    </header>
    <article className="article-body">
      {page.sections.map((section) => <section key={section.heading}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.pricing && (prices[page.operator].fiber.length
          ? <PricesTable operator={page.operator} context={`فايبر ${page.name}`} />
          : <p className="small-note">لا توجد باقات سلام فايبر مدرجة حاليًا في ملف الأسعار الموحد بالموقع. تتأكد تفاصيل الباقات والأسعار والرسوم مع المندوب حسب العنوان قبل تقديم الطلب.</p>)}
        {section.cities && <ul className="city-links">{cities.filter(city => operatorCities.includes(city.slug)).map(city => <li key={city.slug}><a href={`/${city.slug}/${page.operator}`}>فايبر {page.name} في {city.name}</a></li>)}</ul>}
        {section.links && <ul>{section.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>}
        {section.faq && page.faqs.map(faq => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}
      </section>)}
    </article>
    <aside className="article-cta" aria-label="التواصل لطلب الخدمة">
      <p>لترتيب الخطوة التالية، تواصل على 0564612017 مع عنوان المبنى ونوع السكن، وراجع التفاصيل المتاحة قبل اعتماد الطلب.</p>
      <ContactButtons />
    </aside>
  </main>;
}
