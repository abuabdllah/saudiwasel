import { operatorBody, operatorFaqs, choiceCopy, operatorFacts, operatorAbout, cityIntroductions, operatorIntroduction, localDistricts } from "../lib/local-content";
import PricesTable from "./PricesTable";
import CityOperatorLinks from "./CityOperatorLinks";
import IntentCtas from "./IntentCtas";
import CityNextSteps from "./CityNextSteps";
import OperatorSources from "./OperatorSources";
import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { getMakkahDistricts, getMakkahOperatorContent, makkahGeneralFaqs } from "../lib/makkah";

function ContactBox({ operator }) {
  return <div className="contact-box">
    <p>أرسل موقع المبنى لفحص الخيارات المتاحة{operator ? ` لدى ${operator.name}` : " لدى المشغلين"}، أو تواصل معنا مباشرة لمراجعة الطلب:</p>
    <IntentCtas city="makkah" />
  </div>;
}

function DistrictCards({ operator }) {
  const content = localDistricts("makkah", operator?.slug || "city");
  return <><div className="card faq">{content.map((district) => <div key={district.name}><h3>حي {district.name}</h3><p>{district.text}</p></div>)}</div><p>أرسل اسم حيك وموقع المبنى، ونتحقق لك من الخيارات المتاحة على عنوانك.</p></>;
}

function MakkahLinks({ current }) {
  return <CityOperatorLinks city="makkah" current={current} />;
}

function ChoiceSection({ operator }) {
  return <>
    <h2>فايبر أو 5G في مكة؟</h2>
    <p>{choiceCopy("makkah", operator?.slug)} اقرأ <a href="/fiber-vs-5g">مقارنة الفايبر و5G</a>{operator ? <>، وراجع <a href={`/5g/${operator.slug}`}>راوتر 5G {operator.name}</a></> : null}، أو تصفح <a href="/5g">خيارات راوتر 5G</a> و<a href="/5g/stc">STC 5G</a> و<a href="/5g/salam">سلام 5G</a> و<a href="/5g/mobily">موبايلي 5G</a>.</p>
  </>;
}

export function MakkahCityPage() {
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "مكة المكرمة", path: "/makkah" }]),
    serviceSchema({ name: "مندوب فايبر مكة", serviceType: "تركيب الألياف البصرية", city: "مكة المكرمة", path: "/makkah" }),
    faqSchema(makkahGeneralFaqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>مندوب فايبر مكة وفحص التغطية</h1>
      <p className="hero-sub">{cityIntroductions.makkah}</p>
      <ul className="hero-points"><li>✔ فحص الموقع قبل اختيار الخدمة</li><li>✔ مقارنة مشغلي الفايبر في مكة</li><li>✔ اتصال وواتساب على الرقم نفسه</li></ul>
    </div><LeadForm defaultCity="مكة المكرمة" /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد سكان مكة على تحديد العقار ومراجعة خيارات الإنترنت قبل رفع الطلب ومتابعة التنفيذ.</p>
      <h2>اختيار الإنترنت المنزلي في مكة المكرمة</h2>
      <p>يتغير شكل السكن في مكة من عمائر وشقق ضمن الأحياء المركزية والقريبة منها إلى مخططات أحدث ومساكن أوسع في الأطراف. ومع ارتفاع نسبة المستأجرين وانتشار الشقق المفروشة والسكن المؤقت، لا يكون الخيار المناسب واحداً لكل منزل.</p>
      <p>الفايبر يناسب عادة من يستقر طويلاً ويحتاج اتصالاً ثابتاً، بينما يمنح راوتر 5G مرونة لمن ينتقل أو يسكن في شقة بلا تمديدات. وقد تشهد الشبكات اللاسلكية ضغطاً عاماً في أوقات المواسم والازدحام، لذا يبدأ القرار بفحص العنوان وطبيعة الإقامة.</p>
      <h2>مشغلو الفايبر في مكة</h2><MakkahLinks />
      <h2>مندوب الفايبر في أحياء مكة</h2><DistrictCards />
      <h2>رقم مندوب فايبر مكة</h2><ContactBox />
      <ChoiceSection />
      <h2>أسئلة شائعة عن الإنترنت المنزلي في مكة</h2><div className="card faq">{makkahGeneralFaqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <h2>مدن قريبة</h2><p>للعناوين خارج مكة، راجع <a href="/jeddah">مندوب فايبر جدة</a> أو <a href="/taif">مندوب فايبر الطائف</a>.</p>
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city="makkah" />
  </main>;
}

export function MakkahOperatorPage({ operator }) {
  const content = { intro: operatorBody("makkah", operator.slug), faqs: operatorFaqs("makkah", operator.slug) };
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "مكة المكرمة", path: "/makkah" }, { name: operator.name, path: `/makkah/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} مكة`, serviceType: "تركيب الألياف البصرية", city: "مكة المكرمة", path: `/makkah/${operator.slug}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>فايبر {operator.name} مكة وفحص التغطية</h1>
      <p className="hero-sub">{operatorIntroduction("makkah", operator.slug)}</p>
      <ul className="hero-points"><li>✔ فحص المبنى قبل رفع الطلب</li><li>✔ عرض الباقات دون تغيير الأسعار</li><li>✔ تواصل بالاتصال أو واتساب</li></ul>
    </div><LeadForm defaultCity="مكة المكرمة" operator={operator.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نرتب مراجعة ألياف {operator.name} لمسكنك في {"مكة"} ونساعد في متابعة إجراء الاشتراك بعد اعتماد التفاصيل.</p>
      <h2>فايبر {operator.name} في مكة المكرمة</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <h2>خيارات باقات فايبر {operator.name}</h2>
      <OperatorSources operator={operator.slug} /><PricesTable operator={operator.slug} service="fiber" context={`فايبر ${operator.name} في ${"مكة"}`} />
      <h2>رقم مندوب فايبر {operator.name} مكة</h2>
      <IntentCtas city="makkah" operator={operator.slug} />
      <h2>معلومات قبل تركيب فايبر {operator.name}</h2><ul className="req-list">{operatorFacts("makkah", operator.slug).map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h2>مندوب {operator.name} في أحياء مكة</h2><DistrictCards operator={operator} />
      <ChoiceSection operator={operator} />
      <h2>خطوات طلب فايبر {operator.name} في مكة</h2><div className="steps"><div className="card"><span>1</span><h4>تحديد الوحدة</h4><p>حدد حي مكة ومدخل المبنى ورقم الشقة لفحص {operator.name} قبل ترتيب التوصيل.</p></div><div className="card"><span>2</span><h4>فحص العنوان</h4><p>تُراجع نتيجة المبنى قبل اختيار الخدمة.</p></div><div className="card"><span>3</span><h4>اعتماد الباقة</h4><p>اقرأ سعر {operator.name} وشروطه لمسكن مكة، ثم {operator.slug === "salam" ? "اعتمد الباقة التي يلائم التزامها إقامتك" : "اختر الباقة التي تناسب مدة التزامها مدة إقامتك"}.</p></div><div className="card"><span>4</span><h4>تنسيق الموعد</h4><p>تابع حالة الطلب وموعد الفني حتى التفعيل.</p></div></div>
      <h2>مشغلو الفايبر في مكة</h2><MakkahLinks current={operator.slug} />
      <h2>أسئلة شائعة عن فايبر {operator.name} في مكة</h2><div className="card faq">{content.faqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city="makkah" operator={operator.slug} />
  </main>;
}
