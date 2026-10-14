import { operatorBody, operatorFaqs, choiceCopy, operatorFacts, operatorAbout, cityIntroductions, operatorIntroduction, localDistricts } from "../lib/local-content";
import PricesTable from "./PricesTable";
import CityOperatorLinks from "./CityOperatorLinks";
import IntentCtas from "./IntentCtas";
import CityNextSteps from "./CityNextSteps";
import OperatorSources from "./OperatorSources";
import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { riyadhGeneralFaqs } from "../lib/riyadh";

function ContactBox({ operator }) {
  return <div className="contact-box">
    <p>أرسل موقع المبنى لفحص الخيارات المتاحة{operator ? ` لدى ${operator.name}` : " لدى المشغلين"}، أو تواصل مباشرة للاستفسار ومتابعة الطلب:</p>
    <IntentCtas city="riyadh" />
  </div>;
}

function DistrictCards({ operator }) {
  const content = localDistricts("riyadh", operator?.slug || "city");
  return <><div className="card faq">{content.map((district) => <div key={district.name}><h3>حي {district.name}</h3><p>{district.text}</p></div>)}</div><p>أرسل اسم حيك وموقع المبنى، ونتحقق لك من الخيارات المتاحة على عنوانك.</p></>;
}

function OperatorLinks({ current }) {
  return <CityOperatorLinks city="riyadh" current={current} />;
}

export function RiyadhCityPage() {
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "الرياض", path: "/riyadh" }]),
    serviceSchema({ name: "مندوب فايبر الرياض", serviceType: "تركيب الألياف البصرية", city: "الرياض", path: "/riyadh" }),
    faqSchema(riyadhGeneralFaqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>مندوب فايبر الرياض وفحص التغطية</h1>
      <p className="hero-sub">{cityIntroductions.riyadh}</p>
      <ul className="hero-points"><li>✔ فحص العنوان قبل اختيار الباقة</li><li>✔ روابط مباشرة إلى مشغلي الرياض</li><li>✔ تواصل عبر الاتصال أو واتساب</li></ul>
    </div><LeadForm defaultCity="الرياض" /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نساعد سكان الرياض على تحديد العقار ومراجعة خيارات الإنترنت قبل رفع الطلب ومتابعة التنفيذ.</p>
      <h2>اختيار الإنترنت المنزلي في مدينة الرياض</h2>
      <p>الرياض مدينة كبيرة ومترامية؛ تتسارع فيها المخططات السكنية الحديثة شمالاً، بينما تضم مناطق الوسط والجنوب أحياء أقدم تتجاور فيها الفلل والعمائر. لذلك يختلف قرار الإنترنت من مبنى إلى آخر، حتى داخل الحي الواحد.</p>
      <p>ومع وجود نسبة كبيرة من الموظفين والعائلات والمستأجرين، يصبح نمط السكن مهماً: الفايبر يناسب الاستقرار والاستخدام المرتفع، وراوتر 5G يمنح مرونة للشقق غير المهيأة للتمديد ولمن ينتقل بين المساكن.</p>
      <h2>مشغلو الفايبر في الرياض</h2><OperatorLinks />
      <h2>مندوب الفايبر في أحياء الرياض</h2><DistrictCards />
      <h2>رقم مندوب فايبر الرياض</h2><ContactBox />
      <h2>فايبر أو 5G في الرياض؟</h2>
      <p>الفايبر خيار مناسب للفلل والمباني الجديدة الجاهزة للتمديد، وللمنازل ذات الاستخدام العالي في الألعاب والبث والعمل. أما راوتر 5G فيناسب مستأجري الشقق التي لا تتوفر فيها تمديدات، أو من ينتقلون بصورة متكررة. راجع <a href="/fiber-vs-5g">مقارنة الفايبر و5G</a>، أو تصفح <a href="/5g">باقات 5G المنزلية</a> وصفحات <a href="/5g/stc">STC 5G</a> و<a href="/5g/salam">سلام 5G</a> و<a href="/5g/mobily">موبايلي 5G</a>.</p>
      <h2>أسئلة شائعة عن الفايبر في الرياض</h2><div className="card faq">{riyadhGeneralFaqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <section aria-labelledby="riyadh-fiber-5g-neighborhoods">
        <h2 id="riyadh-fiber-5g-neighborhoods">الفايبر وراوتر 5G بين أحياء شمال الرياض الجديدة والأحياء القديمة</h2>
        <p>عند اختيار الإنترنت في الأحياء الشمالية الجديدة، مثل النرجس والعارض والملقا، ابدأ بفحص عنوان المبنى وجاهزية مسار تمديد الألياف داخل العقار؛ حداثة الحي أو المبنى لا تعني توفر الفايبر. إذا أكد المشغل إمكانية التركيب، فقارن الفايبر للاستخدام المستقر والعمل والألعاب مع راوتر 5G الذي لا يحتاج تمديد ألياف إلى المنزل. قبل اختيار الراوتر، تحقق من الإشارة في مكان استخدامه وراجع شروط الباقة والجهاز؛ اسم الحي وحده لا يضمن جودة الاتصال.</p>
        <p>وفي الأحياء القديمة أو القائمة، مثل السويدي والنسيم، راجع التمديدات الموجودة وإمكانية إدخال الألياف إلى الشقة أو الفيلا وموافقة المالك عند الحاجة، بدل افتراض أن عمر الحي يمنع الفايبر. قد يكون راوتر 5G خيارًا للمستأجر أو لمن يصعب عليه تنفيذ تمديدات، لكن الجدران وموقع الراوتر والإشارة داخل المسكن تؤثر في تجربته. في الحالتين، يعتمد الاختيار على التحقق من المبنى وتجربة الاتصال المناسبة، ولا يشكل هذا الوصف تأكيدًا لتغطية الفايبر أو 5G في أي حي.</p>
      </section>
      <h2>مدن قريبة</h2><p>إذا كان طلبك خارج العاصمة باتجاه القصيم، راجع <a href="/buraidah">دليل تركيب الفايبر في بريدة</a>.</p>
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city="riyadh" />
  </main>;
}

export function RiyadhOperatorPage({ operator }) {
  const content = { intro: operatorBody("riyadh", operator.slug), faqs: operatorFaqs("riyadh", operator.slug) };
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "الرياض", path: "/riyadh" }, { name: operator.name, path: `/riyadh/${operator.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${operator.name} الرياض`, serviceType: "تركيب الألياف البصرية", city: "الرياض", path: `/riyadh/${operator.slug}` }),
    faqSchema(content.faqs),
  ];
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>فايبر {operator.name} الرياض وفحص التغطية</h1>
      <p className="hero-sub">{operatorIntroduction("riyadh", operator.slug)}</p>
      <ul className="hero-points"><li>✔ فحص المبنى قبل رفع الطلب</li><li>✔ شرح الباقات المنشورة بوضوح</li><li>✔ تواصل مباشر بالاتصال أو واتساب</li></ul>
    </div><LeadForm defaultCity="الرياض" operator={operator.name} /></div></section>
    <section className="container">
      <p className="notice">موقع مستقل وغير تابع لأي مشغل. نرتب مراجعة ألياف {operator.name} لمسكنك في {"الرياض"} ونساعد في متابعة إجراء الاشتراك بعد اعتماد التفاصيل.</p>
      <h2>فايبر {operator.name} في مدينة الرياض</h2><p>{content.intro[0]}</p><p>{content.intro[1]}</p>
      <p>لمراجعة بدائل {operator.name} على عنوانك ومقارنة خدمات المبنى، راجع <a href="/riyadh">مندوب فايبر الرياض</a>.</p>
      <h2>خيارات باقات فايبر {operator.name}</h2>
      <OperatorSources operator={operator.slug} /><PricesTable operator={operator.slug} service="fiber" context={`فايبر ${operator.name} في ${"الرياض"}`} />
      <h2>رقم مندوب فايبر {operator.name} الرياض</h2>
      <IntentCtas city="riyadh" operator={operator.slug} />
      <h2>معلومات قبل تركيب فايبر {operator.name}</h2><ul className="req-list">{operatorFacts("riyadh", operator.slug).map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <h2>مندوب {operator.name} في أحياء الرياض</h2><DistrictCards operator={operator} />
      <h2>فايبر أو 5G في الرياض؟</h2><p>{choiceCopy("riyadh", operator.slug)} اقرأ <a href="/fiber-vs-5g">الفرق بين الفايبر و5G</a> وقارن مع <a href={`/5g/${operator.slug}`}>راوتر 5G من {operator.name}</a>، كما يمكنك مشاهدة <a href="/5g">جميع خيارات 5G</a>.</p>
      <h2>خطوات طلب فايبر {operator.name} في الرياض</h2><div className="steps"><div className="card"><span>1</span><h4>تحديد المبنى</h4><p>{operator.slug === "salam" ? `لطلب ${operator.name} في الرياض، أرسل اسم الحي وموقع العقار ورقم وحدتك` : `أرسل لطلب ${operator.name} بالرياض الحي وموقع العقار ورقم وحدتك`} حتى يبدأ التحقق من عنوان واضح.</p></div><div className="card"><span>2</span><h4>مراجعة النتيجة</h4><p>نتحقق من خيارات العنوان قبل اختيار الباقة.</p></div><div className="card"><span>3</span><h4>رفع الطلب</h4><p>تُسجل البيانات بعد موافقتك على التفاصيل.</p></div><div className="card"><span>4</span><h4>تنسيق التركيب</h4><p>تتابع حالة الطلب وموعد الفني حتى التفعيل.</p></div></div>
      <h2>مشغلو الفايبر في الرياض</h2><OperatorLinks current={operator.slug} />
      <h2>أسئلة شائعة عن فايبر {operator.name} في الرياض</h2><div className="card faq">{content.faqs.map((faq) => <div key={faq.q}><h4>{faq.q}</h4><p>{faq.a}</p></div>)}</div>
      <JsonLd data={schemas} />
    </section>
  <CityNextSteps city="riyadh" operator={operator.slug} />
  </main>;
}
