import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { operators } from "../lib/operators";
import { getHijazContent, getHijazDistricts, hijazCities } from "../lib/hijaz";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

function ContactBox({ operator }) {
  return <div className="contact-box">
    <p>أرسل موقع العقار لفحص الخيارات على العنوان{operator ? ` لدى ${operator.name}` : " لدى المشغلين"}، أو تواصل مباشرة لمراجعة طلبك.</p>
    <div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div>
  </div>;
}

function DistrictCards({ districts }) {
  return <div className="card faq">{districts.map((district) => <div key={district.name}><h3>حي {district.name}</h3><p>{district.text}</p></div>)}</div>;
}

function LocalLinks({ city, current }) {
  const content = hijazCities[city];
  return <div className="cities">
    {operators.filter((operator) => operator.slug !== current).map((operator) => <a key={operator.slug} href={`/${city}/${operator.slug}`}>مندوب فايبر {operator.name} {content.short}</a>)}
    <a href={`/${city}`}>مندوب فايبر {content.short}</a>
    {content.nearby.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
  </div>;
}

function ChoiceSection({ city, operator }) {
  const isMadinah = city === "madinah";
  return <><h2>فايبر أو 5G في {hijazCities[city].short}؟</h2>
    <p>{isMadinah
      ? "الفايبر مناسب عادة لمن يستقر في البيت أو الشقة ويحتاج اتصالاً ثابتاً، أما راوتر 5G فيمنح المستأجر أو ساكن الشقة المفروشة مرونة من دون تمديد دائم. افحص كل خيار على عنوانك، خصوصاً إذا كانت الإقامة قصيرة أو مرتبطة بموسم."
      : "الفايبر يخدم غالباً البيت المأهول طوال السنة، بينما يسهل راوتر 5G تجهيز الفيلا الصيفية أو الاستراحة والسكن الذي يُستخدم على فترات. راجع مدة الالتزام وإمكان النقل إلى جانب نتيجة فحص العقار."} اقرأ <a href="/fiber-vs-5g">دليل المقارنة بين الفايبر و5G</a>{operator ? <>، واطلع على <a href={`/5g/${operator.slug}`}>راوتر 5G {operator.name}</a></> : null}، أو راجع <a href="/5g">صفحة خيارات 5G</a> و<a href="/5g/stc">STC 5G</a> و<a href="/5g/mobily">موبايلي 5G</a> و<a href="/5g/salam">سلام 5G</a>.</p>
  </>;
}

function Faqs({ faqs, heading }) {
  return <><h2>{heading}</h2><div className="card faq">{faqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div></>;
}

export function HijazCityPage({ city }) {
  const content = hijazCities[city];
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: content.name, path: `/${city}` }]),
    serviceSchema({ name: `مندوب فايبر ${content.short}`, serviceType: "تركيب الألياف البصرية", city: content.name, path: `/${city}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div><h1>مندوب فايبر {content.short} وتركيب الألياف البصرية</h1><p className="hero-sub">افحص خدمة الإنترنت على عنوانك، وقارن الفايبر براوتر 5G وفق نوع السكن ومدة استخدامه قبل تقديم الطلب.</p><ul className="hero-points"><li>✔ فحص المبنى بدلاً من الاكتفاء باسم الحي</li><li>✔ روابط جميع مشغلي المدينة</li><li>✔ تواصل عبر الاتصال أو واتساب</li></ul></div><LeadForm defaultCity={content.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد في فحص الخيارات المتاحة ورفع طلب الاشتراك ومتابعته.</p>
      <h2>اختيار الإنترنت المنزلي في {content.short}</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <h2>رقم مندوب فايبر {content.short}</h2><ContactBox />
      <h2>مشغلو الفايبر في {content.short}</h2><LocalLinks city={city} />
      <h2>مندوب الفايبر في أحياء {content.short}</h2><DistrictCards districts={getHijazDistricts(city)} />
      <ChoiceSection city={city} />
      <Faqs faqs={content.faqs} heading={`أسئلة شائعة عن الإنترنت المنزلي في ${content.short}`} />
      <h2>صفحات مدن مرتبطة</h2><p>يمكنك الانتقال من هنا إلى الصفحات القريبة ومراجعة خيارات كل عنوان على حدة.</p><div className="cities">{content.nearby.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
      <JsonLd data={schemas} />
    </section>
  </main>;
}

export function HijazOperatorPage({ city, operator }) {
  const content = getHijazContent(city, operator);
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: content.name, path: `/${city}` }, { name: operator.name, path: `/${city}/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} ${content.short}`, serviceType: "تركيب الألياف البصرية", city: content.name, path: `/${city}/${operator.slug}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div><h1>مندوب فايبر {operator.name} في {content.short}</h1><p className="hero-sub">تحقق من فايبر {operator.name} في المبنى، وراجع الأسعار المنشورة، ثم قارن الخدمة بخيار 5G وفق طبيعة سكنك.</p><ul className="hero-points"><li>✔ فحص العنوان قبل رفع الطلب</li><li>✔ إبقاء تفاصيل الباقات واضحة</li><li>✔ اتصال وواتساب على رقم واحد</li></ul></div><LeadForm defaultCity={content.name} operator={operator.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعدك في فحص تغطية {operator.name} ورفع طلب الاشتراك ومتابعته.</p>
      <h2>فايبر {operator.name} في {content.short}</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <h2>رقم مندوب فايبر {operator.name} {content.short}</h2><ContactBox operator={operator} />
      <h2>أسعار باقات فايبر {operator.name} (آخر تحديث: {operator.updated})</h2>
      <div className="table-wrap"><table className="compare"><thead><tr><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead><tbody>{operator.packages.map((pack) => <tr key={pack.name}><td>{pack.name}</td><td>{pack.down}</td><td>{pack.up}</td><td>{pack.price}</td><td>{pack.perks}</td></tr>)}</tbody></table></div>
      <p className="small-note">الأسعار شاملة ضريبة القيمة المضافة ومنقولة من الموقع الرسمي لـ{operator.name} وقد تتغير. تواصل معنا لتأكيد السعر الحالي قبل الاشتراك.</p>
      <div className="contact-box"><h3>مراجعة السعر قبل الاشتراك</h3><p>قد تتغير العروض وشروطها، لذلك نؤكد تفاصيل الباقة المنشورة معك قبل رفع الطلب.</p><div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div></div>
      <h2>معلومات مهمة قبل تركيب فايبر {operator.name}</h2><ul className="req-list">{operator.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h2>مندوب {operator.name} في أحياء {content.short}</h2><DistrictCards districts={content.districts} />
      <ChoiceSection city={city} operator={operator} />
      <h2>خطوات طلب فايبر {operator.name}</h2><div className="steps"><div className="card"><span>1</span><h4>تحديد العقار</h4><p>أرسل الحي ورابط المبنى وبيانات الوحدة.</p></div><div className="card"><span>2</span><h4>قراءة النتيجة</h4><p>تُراجع الخدمة المتاحة على العنوان المحدد.</p></div><div className="card"><span>3</span><h4>اختيار الباقة</h4><p>طابق السعر والتفاصيل مع احتياج السكن.</p></div><div className="card"><span>4</span><h4>متابعة التركيب</h4><p>نسّق الموعد وتابع الطلب حتى التفعيل.</p></div></div>
      <h2>مشغلو {content.short} والصفحة الرئيسية</h2><LocalLinks city={city} current={operator.slug} />
      <Faqs faqs={content.faqs} heading={`أسئلة شائعة عن فايبر ${operator.name} في ${content.short}`} />
      <JsonLd data={schemas} />
    </section>
  </main>;
}
