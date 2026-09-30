import CityNextSteps from "./CityNextSteps";
import OperatorSources from "./OperatorSources";
import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { operators } from "../lib/operators";
import { getRegionalCity, getRegionalOperator } from "../lib/regional";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

function ContactBox({ city, operator }) {
  return <div className="contact-box">
    <p>{operator ? `أرسل عنوان العقار لمراجعة فايبر ${operator.name} في ${city}` : `شارك موقع العقار لمقارنة مشغلي الفايبر في ${city}`}، أو تواصل مباشرة عبر الرقم التالي:</p>
    <div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div>
  </div>;
}

function DistrictCards({ districts }) {
  return <div className="card faq">{districts.map((district) => {
    const name = Array.isArray(district) ? district[0] : district.name;
    const text = Array.isArray(district) ? district[1] : district.text;
    return <div key={name}><h3>حي {name}</h3><p>{text}</p></div>;
  })}</div>;
}

function Links({ content, current }) {
  return <div className="cities">
    {operators.filter((operator) => operator.slug !== current).map((operator) => <a key={operator.slug} href={`/${content.slug}/${operator.slug}`}>مندوب فايبر {operator.name} {content.name}</a>)}
    <a href={`/${content.slug}`}>الصفحة الرئيسية لفايبر {content.name}</a>
    {content.nearby.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
  </div>;
}

function Choice({ content, operator }) {
  const cityCopy = {
    abha: "في أبها يرتبط القرار بمدة إشغال المنزل وتضاريس موقعه؛ فالألياف تخدم السكن الدائم عادة، بينما تساعد قابلية نقل الراوتر في الشقق والمنازل الصيفية.",
    tabuk: "في تبوك تفيد الألياف الأسرة المستقرة أو منزل الموظف طويل الإقامة، وقد يكون الراوتر اللاسلكي عملياً لعقد قصير أو عقار حديث لم يجهز للتمديد.",
    buraidah: "في بريدة يناسب الفايبر غالباً الفيلا العائلية كثيرة الأجهزة، أما 5G فيستحق المقارنة عند الانتقال إلى مخطط جديد أو الحاجة إلى تشغيل الخدمة بمرونة.",
    hail: "في حائل يخدم الاتصال الثابت البيوت والفلل المأهولة باستمرار، بينما يتيح 5G حلاً لا يتطلب مسار كابل في المسكن المستأجر أو غير المجهز.",
    jazan: "في جازان تميل الأسرة المستقرة إلى فحص الفايبر أولاً، في حين قد يفضّل الموظف في سكن مؤقت راوتر 5G يمكن التعامل معه عند الانتقال.",
  };
  return <><h2>فايبر أو 5G في {content.name}؟</h2><p>{cityCopy[content.slug]} لا تعتمد على وصف عام للحي؛ افحص العقار واقرأ <a href="/fiber-vs-5g">المقارنة الكاملة بين الفايبر و5G</a>{operator ? <> وراجع <a href={`/5g/${operator.slug}`}>راوتر 5G {operator.name}</a></> : <>، ثم تصفح <a href="/5g">خيارات 5G المنزلية</a> وصفحات <a href="/5g/stc">STC 5G</a> و<a href="/5g/mobily">موبايلي 5G</a> و<a href="/5g/salam">سلام 5G</a></>}.</p></>;
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
    <section className="hero"><div className="container hero-grid"><div><h1>مندوب فايبر {content.name} لفحص التغطية وطلب الألياف البصرية</h1><p className="hero-sub">افحص عنوانك في {content.name}، وقارن بين مشغلي الفايبر وراوتر 5G وفق نوع السكن ومدة استخدامه.</p><ul className="hero-points"><li>✔ فحص المبنى والوحدة قبل تقديم الطلب</li><li>✔ مقارنة الفايبر بالخيار اللاسلكي</li><li>✔ اتصال وواتساب على رقم واحد</li></ul></div><LeadForm defaultCity={content.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد في فحص الخيارات المتاحة ورفع طلب الاشتراك ومتابعته.</p>
      <h2>اختيار الإنترنت المنزلي في {content.name}</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <h2>رقم مندوب فايبر {content.name}</h2><ContactBox city={content.name} />
      <h2>مشغلو الفايبر في {content.name}</h2><Links content={content} />
      <h2>مندوب الفايبر في أحياء {content.name}</h2><DistrictCards districts={content.districts.map(([name, text], index) => ({ name, text: `${text} ${index % 2 ? "وازن بين الفايبر للسكن المستقر و5G للمرونة، ثم أرسل العنوان للفحص." : "ابدأ بفحص الألياف للعقار الدائم وقارن 5G للاستخدام المتغير؛ شارك موقع المبنى للتحقق."}` }))} />
      <Choice content={content} />
      <Faqs content={content} />
      <h2>مدن مرتبطة بـ{content.name}</h2><p>راجع الصفحة القريبة التي تناسب موقعك، مع إجراء فحص مستقل لكل عقار لأن نتيجة مدينة أو مبنى لا تنطبق على غيره.</p><div className="cities">{content.nearby.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city={city} />
  </main>;
}

export function RegionalOperatorPage({ city, operator }) {
  const content = getRegionalOperator(city, operator);
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: content.name, path: `/${city}` }, { name: operator.name, path: `/${city}/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} ${content.name}`, serviceType: "تركيب الألياف البصرية", city: content.name, path: `/${city}/${operator.slug}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div><h1>فايبر {operator.name} {content.name} وفحص التغطية</h1><p className="hero-sub">راجع فايبر {operator.name} على عنوانك في {content.name}، وطابق الباقة مع السكن قبل متابعة طلب التركيب.</p><ul className="hero-points"><li>✔ التحقق من المبنى المحدد</li><li>✔ مراجعة شروط الباقة قبل الطلب</li><li>✔ متابعة عبر الاتصال وواتساب</li></ul></div><LeadForm defaultCity={content.name} operator={operator.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعدك في فحص خدمة {operator.name} ورفع طلب الاشتراك ومتابعته.</p>
      <h2>فايبر {operator.name} في {content.name}</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <h2>رقم مندوب فايبر {operator.name} {content.name}</h2><ContactBox city={content.name} operator={operator} />
      <h2>خيارات باقات فايبر {operator.name} (أسماء مرجعية؛ أكد التفاصيل الحالية)</h2>
      <OperatorSources operator={operator.slug} /><div className="table-wrap"><table className="compare"><thead><tr><th>اسم مرجعي للباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead><tbody>{operator.packages.map((pack) => <tr key={pack.name}><td>{pack.name}</td><td>{pack.down}</td><td>{pack.up}</td><td>{pack.price}</td><td>{pack.perks}</td></tr>)}</tbody></table></div>
      <p className="small-note">راجع المصدر الرسمي لـ{operator.name} للسعر والضريبة وشروط الباقة المتاحة لعنوانك في {content.name}.</p>
      <div className="contact-box"><h3>تأكيد تفاصيل باقة {operator.name}</h3><p>راجع سعر العرض ومدة الالتزام لعنوانك في {content.name} قبل رفع الطلب، لأن التفاصيل المنشورة قد تتبدل بمرور الوقت.</p><div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div></div>
      <h2>معلومات مهمة قبل تركيب فايبر {operator.name}</h2><ul className="req-list">{operator.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h2>مندوب {operator.name} في أحياء {content.name}</h2><DistrictCards districts={content.districts} />
      <Choice content={content} operator={operator} />
      <h2>خطوات طلب فايبر {operator.name} في {content.name}</h2><div className="steps"><div className="card"><span>1</span><h4>وصف الوحدة</h4><p>أرسل حيّك في {content.name} ورابط العقار وحدد شقة أم فيلا.</p></div><div className="card"><span>2</span><h4>فحص العنوان</h4><p>تُراجع خدمة {operator.name} المرتبطة بالمبنى المحدد.</p></div><div className="card"><span>3</span><h4>مراجعة الباقة</h4><p>طابق سعر {operator.name} والتزامه مع استخدام المنزل.</p></div><div className="card"><span>4</span><h4>تنسيق الطلب</h4><p>تابع تركيب الخدمة في {content.name} حتى اكتمال التفعيل.</p></div></div>
      <h2>مشغلو {content.name} والصفحة الرئيسية</h2><Links content={content} current={operator.slug} />
      <Faqs content={content} operator={operator} />
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city={city} operator={operator.slug} />
  </main>;
}
