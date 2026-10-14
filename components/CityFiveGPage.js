import { localDistricts } from "../lib/local-content";
import IntentCtas from "./IntentCtas";
import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema } from "./JsonLd";
import { cityFivegPages } from "../lib/city-fiveg";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

export default function CityFiveGPage({ city }) {
  const content = cityFivegPages[city];
  const title = `مندوب راوتر 5G ${content.name}`;
  const path = `/${content.slug}/5g`;
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: content.name, path: `/${content.slug}` }, { name: "راوتر 5G", path }]),
    {
      "@type": "Service",
      "@id": `https://saudiwasel.com${path}#service`,
      name: title,
      serviceType: "مساعدة مستقلة في طلب راوتر 5G والتحقق من التغطية حسب العنوان",
      description: content.description,
      url: `https://saudiwasel.com${path}`,
      areaServed: { "@type": "City", name: content.name },
      provider: { "@id": "https://saudiwasel.com/#organization" },
    },
    faqSchema(content.faqs),
  ];

  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>{title}</h1>
      {content.introduction.map((paragraph) => <p className="hero-sub" key={paragraph}>{paragraph}</p>)}
      <ul className="hero-points">{content.points.map((point) => <li key={point}>{point}</li>)}</ul>
    </div><LeadForm defaultCity={content.slug} operator="راوتر 5G" /></div></section>

    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل</p>

      <h2>خيارات المشغلين لراوتر 5G في {content.name}</h2>
      <p>{content.operatorIntroduction}</p>
      <div className="card faq">{content.operatorOptions.map((operator) => <div key={operator.slug}>
        <h3><a href={`/5g/${operator.slug}`}>راوتر 5G {operator.name}</a></h3>
        <p>{operator.text}</p>
      </div>)}</div>
      <p className="notice">لمراجعة باقات راوتر {content.name} وأسعارها الحالية، أرسل موقع الوحدة عبر واتساب قبل اعتماد الاشتراك. <a href={`https://wa.me/${PHONE_WA}`}>واتساب {PHONE_LOCAL}</a></p>

      <h2>مندوب راوتر 5G في أحياء {content.name}</h2>
      <div className="card faq">{localDistricts(city, "5g").filter((district) => content.neighborhoods.some((neighborhood) => neighborhood.name === district.name)).map((neighborhood) => <div key={neighborhood.name}>
        <h3>{neighborhood.name}</h3><p>{neighborhood.text}</p>
      </div>)}</div>

      <p>أرسل اسم حيك وموقع المبنى، ونتحقق لك من الخيارات المتاحة على عنوانك.</p>

      {content.provinces && <>
        <h2>راوتر 5G في محافظات منطقة تبوك</h2>
        <div className="card faq">{content.provinces.map((province) => <div key={province.name}>
          <h3>{province.name}</h3><p>{province.text}</p>
        </div>)}</div>
      </>}

      <h2>رقم مندوب راوتر 5G {content.name}</h2>
      <IntentCtas city={city} />

      <h2>ماذا تحتاج للطلب</h2>
      <ul className="req-list">{content.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>

      <h2>خطوات الطلب</h2>
      <div className="steps">{content.steps.map((step, index) => <div className="card" key={step.title}>
        <span>{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p>
      </div>)}</div>

      <h2>أسئلة شائعة عن راوتر 5G في {content.name}</h2>
      <div className="card faq">{content.faqs.map((faq) => <div key={faq.q}>
        <h3>{faq.q}</h3><p>{faq.a}</p>
      </div>)}</div>
      <JsonLd data={schemas} />
    </section>
  </main>;
}
