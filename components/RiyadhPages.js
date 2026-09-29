import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { operators } from "../lib/operators";
import { getRiyadhOperatorContent, riyadhDistricts, riyadhGeneralFaqs } from "../lib/riyadh";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

function ContactBox({ operator }) {
  return <div className="contact-box">
    <p>أرسل موقع المبنى لفحص الخيارات المتاحة{operator ? ` لدى ${operator.name}` : " لدى المشغلين"}، أو تواصل مباشرة للاستفسار ومتابعة الطلب:</p>
    <div className="header-actions">
      <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
      <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
    </div>
  </div>;
}

function DistrictCards({ operator }) {
  const content = operator ? getRiyadhOperatorContent(operator).districts : riyadhDistricts.map((name) => ({
    name,
    text: ({
      "الملقا": "الملقا شمال الرياض ويميل طابعه إلى الفلل والمجمعات والمباني الحديثة. أرسل موقع العقار لفحص التغطية.",
      "النرجس": "النرجس ضمن التوسع الشمالي، ويضم مخططات جديدة وفللاً وعمائر سكنية. شارك العنوان للتحقق من التغطية.",
      "الياسمين": "الياسمين من أحياء شمال العاصمة، وتتنوع مساكنه بين الفلل والعمائر. اطلب فحص التغطية لمبناك.",
      "حطين": "حطين شمال غرب الرياض، وفيه فلل ومشروعات سكنية حديثة. زودنا بالموقع لفحص التغطية.",
      "العارض": "العارض في الامتداد الشمالي وتنتشر فيه المخططات والفلل الجديدة. أرسل العنوان للتأكد من التغطية.",
      "الروضة": "الروضة شرق الرياض، ويجمع نسيجها السكني بين الفلل والعمائر. شارك موقع المبنى لفحص التغطية.",
      "النسيم": "النسيم في شرق المدينة، ويضم عمائر وفللاً في نطاق سكني واسع. اطلب التحقق من التغطية على عنوانك.",
      "السويدي": "السويدي جنوب غرب الرياض، وهو من الأحياء القائمة ذات الفلل والعمائر المتنوعة. أرسل الموقع لفحص التغطية.",
    })[name],
  }));
  return <div className="card faq">{content.map((district) => <div key={district.name}><h3>حي {district.name}</h3><p>{district.text}</p></div>)}</div>;
}

function OperatorLinks({ current }) {
  return <div className="cities">
    {operators.filter((operator) => operator.slug !== current).map((operator) => <a key={operator.slug} href={`/riyadh/${operator.slug}`}>مندوب فايبر {operator.name} الرياض</a>)}
    <a href="/riyadh">دليل الفايبر في الرياض</a>
    <a href="/buraidah">خيارات تركيب الفايبر في بريدة</a>
  </div>;
}

export function RiyadhCityPage() {
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "الرياض", path: "/riyadh" }]),
    serviceSchema({ name: "مندوب فايبر الرياض", serviceType: "تركيب الألياف البصرية", city: "الرياض", path: "/riyadh" }),
    faqSchema(riyadhGeneralFaqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>مندوب فايبر الرياض وتركيب الألياف البصرية</h1>
      <p className="hero-sub">افحص عنوانك في الرياض، وقارن مشغلي الفايبر المتاحين للمبنى، ثم تابع طلب التركيب عبر قناة تواصل واحدة.</p>
      <ul className="hero-points"><li>✔ فحص العنوان قبل اختيار الباقة</li><li>✔ روابط مباشرة إلى مشغلي الرياض</li><li>✔ تواصل عبر الاتصال أو واتساب</li></ul>
    </div><LeadForm defaultCity="الرياض" /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد في فحص الخيارات المتاحة ورفع طلب الاشتراك ومتابعته.</p>
      <h2>اختيار الإنترنت المنزلي في مدينة الرياض</h2>
      <p>الرياض مدينة كبيرة ومترامية؛ تتسارع فيها المخططات السكنية الحديثة شمالاً، بينما تضم مناطق الوسط والجنوب أحياء أقدم تتجاور فيها الفلل والعمائر. لذلك يختلف قرار الإنترنت من مبنى إلى آخر، حتى داخل الحي الواحد.</p>
      <p>ومع وجود نسبة كبيرة من الموظفين والعائلات والمستأجرين، يصبح نمط السكن مهماً: الفايبر يناسب الاستقرار والاستخدام المرتفع، وراوتر 5G يمنح مرونة للشقق غير المهيأة للتمديد ولمن ينتقل بين المساكن.</p>
      <h2>رقم مندوب فايبر الرياض</h2><ContactBox />
      <h2>مشغلو الفايبر في الرياض</h2><OperatorLinks />
      <h2>مندوب الفايبر في أحياء الرياض</h2><DistrictCards />
      <h2>فايبر أو 5G في الرياض؟</h2>
      <p>الفايبر خيار مناسب للفلل والمباني الجديدة الجاهزة للتمديد، وللمنازل ذات الاستخدام العالي في الألعاب والبث والعمل. أما راوتر 5G فيناسب مستأجري الشقق التي لا تتوفر فيها تمديدات، أو من ينتقلون بصورة متكررة. راجع <a href="/fiber-vs-5g">مقارنة الفايبر و5G</a>، أو تصفح <a href="/5g">باقات 5G المنزلية</a> وصفحات <a href="/5g/stc">STC 5G</a> و<a href="/5g/salam">سلام 5G</a> و<a href="/5g/mobily">موبايلي 5G</a>.</p>
      <h2>أسئلة شائعة عن الفايبر في الرياض</h2><div className="card faq">{riyadhGeneralFaqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <h2>خيار قريب من الرياض</h2><p>إذا كان طلبك خارج العاصمة باتجاه القصيم، راجع <a href="/buraidah">دليل تركيب الفايبر في بريدة</a>.</p>
      <JsonLd data={schemas} />
    </section>
  </main>;
}

export function RiyadhOperatorPage({ operator }) {
  const content = getRiyadhOperatorContent(operator);
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "الرياض", path: "/riyadh" }, { name: operator.name, path: `/riyadh/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} الرياض`, serviceType: "تركيب الألياف البصرية", city: "الرياض", path: `/riyadh/${operator.slug}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>مندوب فايبر {operator.name} في الرياض</h1>
      <p className="hero-sub">افحص توفر فايبر {operator.name} على عنوان مبناك في الرياض، واطلع على الباقات ثم تابع طلبك حتى تحديد التركيب.</p>
      <ul className="hero-points"><li>✔ فحص المبنى قبل رفع الطلب</li><li>✔ شرح الباقات المنشورة بوضوح</li><li>✔ تواصل مباشر بالاتصال أو واتساب</li></ul>
    </div><LeadForm defaultCity="الرياض" operator={operator.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعدك في فحص تغطية {operator.name} ورفع طلب الاشتراك ومتابعته.</p>
      <h2>فايبر {operator.name} في مدينة الرياض</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <h2>رقم مندوب فايبر {operator.name} الرياض</h2><ContactBox operator={operator} />
      <h2>أسعار باقات فايبر {operator.name} (آخر تحديث: {operator.updated})</h2>
      <div className="table-wrap"><table className="compare"><thead><tr><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead><tbody>{operator.packages.map((pack) => <tr key={pack.name}><td>{pack.name}</td><td>{pack.down}</td><td>{pack.up}</td><td>{pack.price}</td><td>{pack.perks}</td></tr>)}</tbody></table></div>
      <p className="small-note">الأسعار شاملة ضريبة القيمة المضافة ومنقولة من الموقع الرسمي لـ{operator.name} وقد تتغير. تواصل معنا لتأكيد السعر الحالي قبل الاشتراك.</p>
      <div className="contact-box"><h3>تأكيد السعر قبل رفع الطلب</h3><p>قد تتغير العروض أو شروطها، لذلك نراجع معك الباقة المختارة والعنوان قبل بدء الإجراءات.</p><div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div></div>
      <h2>معلومات قبل تركيب فايبر {operator.name}</h2><ul className="req-list">{operator.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h2>مندوب {operator.name} في أحياء الرياض</h2><DistrictCards operator={operator} />
      <h2>فايبر أو 5G في الرياض؟</h2><p>يناسب الفايبر الفلل والمباني الجديدة الجاهزة، خصوصاً مع الألعاب والبث وكثرة الأجهزة. ويكون راوتر 5G عملياً للمستأجرين، أو للشقق التي لا تسمح بتمديدات، أو عند الانتقال المتكرر. اقرأ <a href="/fiber-vs-5g">الفرق بين الفايبر و5G</a> وقارن مع <a href={`/5g/${operator.slug}`}>راوتر 5G من {operator.name}</a>، كما يمكنك مشاهدة <a href="/5g">جميع خيارات 5G</a>.</p>
      <h2>خطوات طلب فايبر {operator.name} في الرياض</h2><div className="steps"><div className="card"><span>1</span><h4>تحديد المبنى</h4><p>أرسل الحي والموقع الدقيق ورقم الوحدة عند توفره.</p></div><div className="card"><span>2</span><h4>مراجعة النتيجة</h4><p>نتحقق من خيارات العنوان قبل اختيار الباقة.</p></div><div className="card"><span>3</span><h4>رفع الطلب</h4><p>تُسجل البيانات بعد موافقتك على التفاصيل.</p></div><div className="card"><span>4</span><h4>تنسيق التركيب</h4><p>تتابع حالة الطلب وموعد الفني حتى التفعيل.</p></div></div>
      <h2>مشغلو الرياض ومدن قريبة</h2><OperatorLinks current={operator.slug} />
      <h2>أسئلة شائعة عن فايبر {operator.name} في الرياض</h2><div className="card faq">{content.faqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <JsonLd data={schemas} />
    </section>
  </main>;
}
