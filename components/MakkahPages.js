import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { operators } from "../lib/operators";
import { getMakkahDistricts, getMakkahOperatorContent, makkahGeneralFaqs } from "../lib/makkah";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

function ContactBox({ operator }) {
  return <div className="contact-box">
    <p>أرسل موقع المبنى لفحص الخيارات المتاحة{operator ? ` لدى ${operator.name}` : " لدى المشغلين"}، أو تواصل معنا مباشرة لمراجعة الطلب:</p>
    <div className="header-actions">
      <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
      <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
    </div>
  </div>;
}

function DistrictCards({ operator }) {
  const districts = operator ? getMakkahOperatorContent(operator).districts : getMakkahDistricts();
  return <div className="card faq">{districts.map((district) => <div key={district.name}><h3>حي {district.name}</h3><p>{district.text}</p></div>)}</div>;
}

function MakkahLinks({ current }) {
  return <div className="cities">
    {operators.filter((operator) => operator.slug !== current).map((operator) => <a key={operator.slug} href={`/makkah/${operator.slug}`}>مندوب فايبر {operator.name} مكة</a>)}
    <a href="/makkah">مندوب فايبر مكة</a>
    <a href="/jeddah">مندوب فايبر جدة</a>
    <a href="/taif">مندوب فايبر الطائف</a>
  </div>;
}

function ChoiceSection({ operator }) {
  return <>
    <h2>فايبر أو 5G في مكة؟</h2>
    <p>في مكة يناسب الفايبر غالباً من يسكن مدة طويلة في منزل أو شقة جاهزة للتمديد، خصوصاً مع العمل من المنزل والبث وكثرة الأجهزة. أما راوتر 5G فيفيد المستأجرين وسكان الشقق المفروشة والإقامات المؤقتة، أو الوحدات التي لا تسمح بتمديد ثابت. اقرأ <a href="/fiber-vs-5g">مقارنة الفايبر و5G</a>{operator ? <>، وراجع <a href={`/5g/${operator.slug}`}>راوتر 5G {operator.name}</a></> : null}، أو تصفح <a href="/5g">خيارات راوتر 5G</a> و<a href="/5g/stc">STC 5G</a> و<a href="/5g/salam">سلام 5G</a> و<a href="/5g/mobily">موبايلي 5G</a>.</p>
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
      <h1>مندوب فايبر مكة وتركيب الألياف البصرية</h1>
      <p className="hero-sub">افحص عنوان المبنى في مكة، وقارن بين الفايبر وراوتر 5G وفق نوع السكن ومدة إقامتك، ثم تابع طلبك عبر قناة واحدة.</p>
      <ul className="hero-points"><li>✔ فحص الموقع قبل اختيار الخدمة</li><li>✔ مقارنة مشغلي الفايبر في مكة</li><li>✔ اتصال وواتساب على الرقم نفسه</li></ul>
    </div><LeadForm defaultCity="مكة المكرمة" /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد في فحص الخيارات المتاحة ورفع طلب الاشتراك ومتابعته.</p>
      <h2>اختيار الإنترنت المنزلي في مكة المكرمة</h2>
      <p>يتغير شكل السكن في مكة من عمائر وشقق ضمن الأحياء المركزية والقريبة منها إلى مخططات أحدث ومساكن أوسع في الأطراف. ومع ارتفاع نسبة المستأجرين وانتشار الشقق المفروشة والسكن المؤقت، لا يكون الخيار المناسب واحداً لكل منزل.</p>
      <p>الفايبر يناسب عادة من يستقر طويلاً ويحتاج اتصالاً ثابتاً، بينما يمنح راوتر 5G مرونة لمن ينتقل أو يسكن في شقة بلا تمديدات. وقد تشهد الشبكات اللاسلكية ضغطاً عاماً في أوقات المواسم والازدحام، لذا يبدأ القرار بفحص العنوان وطبيعة الإقامة.</p>
      <h2>رقم مندوب فايبر مكة</h2><ContactBox />
      <h2>مشغلو الفايبر في مكة</h2><MakkahLinks />
      <h2>مندوب الفايبر في أحياء مكة</h2><DistrictCards />
      <ChoiceSection />
      <h2>أسئلة شائعة عن الإنترنت المنزلي في مكة</h2><div className="card faq">{makkahGeneralFaqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <h2>مدن قريبة من مكة</h2><p>للعناوين خارج مكة، راجع <a href="/jeddah">مندوب فايبر جدة</a> أو <a href="/taif">مندوب فايبر الطائف</a>.</p>
      <JsonLd data={schemas} />
    </section>
  </main>;
}

export function MakkahOperatorPage({ operator }) {
  const content = getMakkahOperatorContent(operator);
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "مكة المكرمة", path: "/makkah" }, { name: operator.name, path: `/makkah/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} مكة`, serviceType: "تركيب الألياف البصرية", city: "مكة المكرمة", path: `/makkah/${operator.slug}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>مندوب فايبر {operator.name} في مكة</h1>
      <p className="hero-sub">افحص فايبر {operator.name} على عنوانك في مكة، وراجع الباقات المنشورة ثم تابع طلب التركيب للسكن الدائم أو المستأجر.</p>
      <ul className="hero-points"><li>✔ فحص المبنى قبل رفع الطلب</li><li>✔ عرض الباقات دون تغيير الأسعار</li><li>✔ تواصل بالاتصال أو واتساب</li></ul>
    </div><LeadForm defaultCity="مكة المكرمة" operator={operator.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعدك في فحص تغطية {operator.name} ورفع طلب الاشتراك ومتابعته.</p>
      <h2>فايبر {operator.name} في مكة المكرمة</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <h2>رقم مندوب فايبر {operator.name} مكة</h2><ContactBox operator={operator} />
      <h2>أسعار باقات فايبر {operator.name} (آخر تحديث: {operator.updated})</h2>
      <div className="table-wrap"><table className="compare"><thead><tr><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead><tbody>{operator.packages.map((pack) => <tr key={pack.name}><td>{pack.name}</td><td>{pack.down}</td><td>{pack.up}</td><td>{pack.price}</td><td>{pack.perks}</td></tr>)}</tbody></table></div>
      <p className="small-note">الأسعار شاملة ضريبة القيمة المضافة ومنقولة من الموقع الرسمي لـ{operator.name} وقد تتغير. تواصل معنا لتأكيد السعر الحالي قبل الاشتراك.</p>
      <div className="contact-box"><h3>تأكيد الباقة قبل الطلب</h3><p>قد تتغير العروض أو شروطها، لذلك نراجع السعر المنشور وبيانات العنوان معك قبل بدء الإجراءات.</p><div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div></div>
      <h2>معلومات قبل تركيب فايبر {operator.name}</h2><ul className="req-list">{operator.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h2>مندوب {operator.name} في أحياء مكة</h2><DistrictCards operator={operator} />
      <ChoiceSection operator={operator} />
      <h2>خطوات طلب فايبر {operator.name} في مكة</h2><div className="steps"><div className="card"><span>1</span><h4>تحديد الوحدة</h4><p>أرسل الحي وموقع المبنى ورقم الشقة إن وجد.</p></div><div className="card"><span>2</span><h4>فحص العنوان</h4><p>تُراجع نتيجة المبنى قبل اختيار الخدمة.</p></div><div className="card"><span>3</span><h4>اعتماد الباقة</h4><p>راجع التفاصيل والسعر ثم وافق على رفع الطلب.</p></div><div className="card"><span>4</span><h4>تنسيق الموعد</h4><p>تابع حالة الطلب وموعد الفني حتى التفعيل.</p></div></div>
      <h2>مشغلو مكة والمدن القريبة</h2><MakkahLinks current={operator.slug} />
      <h2>أسئلة شائعة عن فايبر {operator.name} في مكة</h2><div className="card faq">{content.faqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <JsonLd data={schemas} />
    </section>
  </main>;
}
