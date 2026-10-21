import { operatorBody, operatorFaqs, choiceCopy, operatorFacts, operatorAbout, cityIntroductions, operatorIntroduction, localDistricts, housingDetails } from "../lib/local-content";
import LocalFiberPricing from "./LocalFiberPricing";
import CityOperatorLinks from "./CityOperatorLinks";
import IntentCtas from "./IntentCtas";
import CityNextSteps from "./CityNextSteps";
import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { getRegionalCity } from "../lib/regional";

function ContactBox({ city, citySlug, operator }) {
  return <div className="contact-box">
    <p>{operator ? `أرسل عنوان العقار لمراجعة فايبر ${operator.name} في ${city}` : `شارك موقع العقار لمقارنة مشغلي الفايبر في ${city}`}، أو تواصل مباشرة عبر الرقم التالي:</p>
    <IntentCtas city={citySlug} />
  </div>;
}

function DistrictCards({ districts }) {
  return <><div className="card faq">{districts.map((district) => {
    const name = Array.isArray(district) ? district[0] : district.name;
    const text = Array.isArray(district) ? district[1] : district.text;
    return <div key={name}><h3>حي {name}</h3><p>{text}</p></div>;
  })}</div><p>أرسل اسم حيك وموقع المبنى، ونتحقق لك من الخيارات المتاحة على عنوانك.</p></>;
}

function Links({ content, current }) {
  return <CityOperatorLinks city={content.slug} current={current} />;
}

function Choice({ content, operator }) {
  return <><h2>فايبر أو 5G في {content.name}؟</h2><p>{choiceCopy(content.slug, operator?.slug)} لتقييم خيارات {content.name}، اقرأ <a href="/fiber-vs-5g">المقارنة الكاملة بين الفايبر و5G</a>{operator ? <> وراجع <a href={`/5g/${operator.slug}`}>راوتر 5G {operator.name}</a></> : <>، ثم تصفح <a href="/5g">خيارات 5G المنزلية</a> وصفحات <a href="/5g/stc">STC 5G</a> و<a href="/5g/mobily">موبايلي 5G</a> و<a href="/5g/salam">سلام 5G</a></>}.</p></>;
}

function Faqs({ content, operator }) {
  return <><h2>أسئلة شائعة عن {operator ? `فايبر ${operator.name}` : "الإنترنت المنزلي"} في {content.name}</h2><div className="card faq">{content.faqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div></>;
}

export function RegionalCityPage({ city }) {
  const content = getRegionalCity(city);
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: content.name, path: `/${city}` }]),
    serviceSchema({ name: `مندوب فايبر ${content.name}`, serviceType: "تركيب الألياف البصرية", city: content.name, path: `/${city}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div><h1>مندوب فايبر {content.name} وفحص التغطية</h1><p className="hero-sub">{cityIntroductions[city]}</p><ul className="hero-points"><li>✔ فحص المبنى والوحدة قبل تقديم الطلب</li><li>✔ مقارنة الفايبر بالخيار اللاسلكي</li><li>✔ اتصال وواتساب على رقم واحد</li></ul></div><LeadForm defaultCity={content.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد سكان {content.name} على تحديد العقار ومراجعة خيارات الإنترنت قبل رفع الطلب ومتابعة التنفيذ.</p>
      <h2>اختيار الإنترنت المنزلي في {content.name}</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      {housingDetails[city] && <><h2>تفاصيل السكن المنزلي في {content.name}</h2>{housingDetails[city].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</>}
      <h2>مشغلو الفايبر في {content.name}</h2><Links content={content} />
      <h2>مندوب الفايبر في أحياء {content.name}</h2><DistrictCards districts={localDistricts(city)} />
      <h2>رقم مندوب فايبر {content.name}</h2><ContactBox city={content.name} citySlug={city} />
      <Choice content={content} />
      <Faqs content={content} />
      <h2>مدن قريبة</h2><p>إذا كان سكنك خارج {content.name}، استخدم صفحة المدينة الأقرب لعقارك وجهز موقع الوحدة لفحص جديد.</p><div className="cities">{content.nearby.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city={city} />
  </main>;
}

export function RegionalOperatorPage({ city, operator }) {
  const content = { ...getRegionalCity(city), intro: operatorBody(city, operator.slug), faqs: operatorFaqs(city, operator.slug) };
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: content.name, path: `/${city}` }, { name: operator.name, path: `/${city}/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} ${content.name}`, serviceType: "تركيب الألياف البصرية", city: content.name, path: `/${city}/${operator.slug}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div><h1>فايبر {operator.name} {content.name} وفحص التغطية</h1><p className="hero-sub">{operatorIntroduction(city, operator.slug)}</p><ul className="hero-points"><li>✔ التحقق من المبنى المحدد</li><li>✔ مراجعة شروط الباقة قبل الطلب</li><li>✔ متابعة عبر الاتصال وواتساب</li></ul></div><LeadForm defaultCity={content.name} operator={operator.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نرتب مراجعة ألياف {operator.name} لمسكنك في {content.name} ونساعد في متابعة إجراء الاشتراك بعد اعتماد التفاصيل.</p>
      <h2>فايبر {operator.name} في {content.name}</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <LocalFiberPricing city={city} operator={operator} />
      <h2>رقم مندوب فايبر {operator.name} {content.name}</h2>
      <IntentCtas city={city} operator={operator.slug} />
      <h2>معلومات مهمة قبل تركيب فايبر {operator.name}</h2><ul className="req-list">{operatorFacts(city, operator.slug).map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h2>مندوب {operator.name} في أحياء {content.name}</h2><DistrictCards districts={localDistricts(city, operator.slug)} />
      <Choice content={content} operator={operator} />
      <h2>خطوات طلب فايبر {operator.name} في {content.name}</h2><div className="steps"><div className="card"><span>1</span><h4>وصف الوحدة</h4><p>جهز لطلب {operator.name} في {content.name} موقع المبنى والحي وحدد شقة أم منزلاً مستقلاً.</p></div><div className="card"><span>2</span><h4>فحص العنوان</h4><p>تُراجع خدمة {operator.name} المرتبطة بالمبنى المحدد.</p></div><div className="card"><span>3</span><h4>مراجعة الباقة</h4><p>{city === "abha" && operator.slug === "mobily" ? `قارن سعر باقة ${operator.name} ومدة الالتزام بها مع احتياجات المنزل.` : `طابق سعر ${operator.name} والتزامه مع استخدام المنزل.`}</p></div><div className="card"><span>4</span><h4>تنسيق الطلب</h4><p>احتفظ بمرجع {operator.name} لمسكن {content.name} وتابع تنسيق زيارة الفني إلى حين اكتمال إجراء التفعيل.</p></div></div>
      <h2>مشغلو الفايبر في {content.name}</h2><Links content={content} current={operator.slug} />
      <Faqs content={content} operator={operator} />
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city={city} operator={operator.slug} />
  </main>;
}
