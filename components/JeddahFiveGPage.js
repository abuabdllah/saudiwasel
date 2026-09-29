import LeadForm from "./LeadForm";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "./JsonLd";
import { fivegOperators } from "../lib/fiveg";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

export default function JeddahFiveGPage({ zainOnly = false }) {
  const title = zainOnly ? "مندوب زين جدة (فايبر وراوتر 5G)" : "مندوب راوتر 5G جدة";
  const path = zainOnly ? "/jeddah/zain" : "/jeddah/5g";
  const options = zainOnly ? fivegOperators.filter((o) => o.slug === "zain") : fivegOperators;
  const faqs = zainOnly ? [
    { q: "كيف أتواصل مع مندوب زين جدة؟", a: `اتصل على ${PHONE_LOCAL} أو راسلنا عبر واتساب، أو عبّي النموذج في أعلى الصفحة.` },
    { q: "هل يتوفر راوتر 5G زين في كل أحياء جدة؟", a: "يعتمد توفر الخدمة وجودة الإشارة على العنوان. أرسل موقعك لنتحقق من الخيارات المتاحة قبل الطلب." },
    { q: "هل يمكن طلب فايبر زين في جدة؟", a: "يعتمد فايبر زين على توفر التغطية في المبنى، لذلك نتحقق من العنوان أولاً." },
    { q: "كيف أطلب الخدمة؟", a: "أرسل المدينة والحي وموقع المبنى، ثم نتحقق من التغطية ونوضح الخيارات المتاحة ونتابع الطلب." },
    { q: "هل أحتاج إلى تمديدات لراوتر 5G؟", a: "راوتر 5G لا يحتاج إلى تمديدات ألياف داخل المنزل، لكن الخدمة تعتمد على تغطية الشبكة في موقعك." },
    { q: "كيف أعرف الباقات والأسعار المتاحة؟", a: "تواصل معنا لتأكيد الباقات والأسعار المتاحة لعنوانك." },
  ] : [
    { q: "كيف أتواصل مع مندوب راوتر 5G في جدة؟", a: `اتصل على ${PHONE_LOCAL} أو راسلنا عبر واتساب، أو عبّي النموذج في أعلى الصفحة.` },
    { q: "ما الشركات المتاحة لراوتر 5G في جدة؟", a: "نعرض خيارات STC وزين وسلام وموبايلي، ويعتمد المتاح فعلياً على عنوانك." },
    { q: "هل يحتاج راوتر 5G إلى تمديدات؟", a: "لا يحتاج راوتر 5G إلى تمديدات ألياف أو موعد لتركيب الأسلاك داخل المنزل." },
    { q: "كيف أتأكد من تغطية 5G في منزلي؟", a: "أرسل الحي وموقع المبنى لنتحقق من الخيارات المتاحة على عنوانك قبل تقديم الطلب." },
    { q: "هل 5G بديل مناسب للفايبر؟", a: "قد يكون مناسباً عندما لا يتوفر الفايبر أو عند الحاجة إلى حل دون تمديدات، وتختلف الجودة حسب الإشارة والاستخدام." },
    { q: "كيف أعرف الباقات والأسعار المتاحة؟", a: "تواصل معنا لتأكيد الباقات والأسعار المتاحة لعنوانك." },
  ];
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "جدة", path: "/jeddah" }, { name: zainOnly ? "زين" : "5G", path }]),
    serviceSchema({ name: title, serviceType: zainOnly ? "راوتر 5G وفحص تغطية الفايبر" : "راوتر 5G منزلي", city: "جدة", path }),
    faqSchema(faqs),
  ];

  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <h1>{title}</h1>
      <p className="hero-sub">{zainOnly ? "نساعدك في التحقق من خيارات راوتر 5G زين في جدة، وفحص توفر الفايبر حسب عنوان المبنى، ومتابعة طلبك حتى التفعيل." : "قارن خيارات راوتر 5G من STC وزين وسلام وموبايلي في جدة، وتحقق من المتاح على عنوانك قبل الطلب."}</p>
      <ul className="hero-points"><li>✔ فحص الخيارات حسب العنوان</li><li>✔ تواصل مباشر عبر واتساب</li><li>✔ متابعة الطلب حتى التفعيل</li></ul>
    </div><LeadForm defaultCity="جدة" operator={zainOnly ? "زين" : "راوتر 5G"} /></div></section>

    <section className="container">
      <p className="notice">سعودي واصل جهة مستقلة وليست الموقع الرسمي لأي مشغل. نساعدك في اختيار الخدمة ورفع الطلب ومتابعته.</p>
      <h2>رقم مندوب {zainOnly ? "زين" : "راوتر 5G"} جدة</h2>
      <div className="contact-box"><p>للاستفسار عن الخيارات المتاحة لعنوانك في جدة، تواصل مع المندوب مباشرة:</p><div className="header-actions"><a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a><a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a></div></div>

      <h2>{zainOnly ? "راوتر 5G زين وفايبر زين في جدة" : "خيارات راوتر 5G في جدة"}</h2>
      {zainOnly && <p>نركّز على راوتر 5G زين المنزلي، أما توفر فايبر زين فيعتمد على تغطية المبنى. أرسل عنوانك للتحقق من الخيارات المتاحة.</p>}
      <div className="cities">{options.map((o) => <a key={o.slug} href={`/5g/${o.slug}`}>راوتر 5G {o.name}</a>)}</div>
      <p className="notice">تواصل معنا لتأكيد الباقات والأسعار المتاحة لعنوانك.</p>

      <h2>خطوات الطلب</h2><div className="steps">
        <div className="card"><span>1</span><h4>أرسل عنوانك</h4><p>عبّي النموذج أو أرسل الحي وموقع المبنى عبر واتساب.</p></div>
        <div className="card"><span>2</span><h4>التحقق من التغطية</h4><p>نتحقق من الخيارات المتاحة على عنوانك في جدة.</p></div>
        <div className="card"><span>3</span><h4>اختيار الخدمة</h4><p>نوضح لك الباقات المتاحة لتختار ما يناسب استخدامك.</p></div>
        <div className="card"><span>4</span><h4>متابعة الطلب</h4><p>نرفع الطلب ونتابعه معك حتى التفعيل.</p></div>
      </div>
      <h2>صفحات خدمات جدة</h2><div className="cities"><a href="/jeddah/stc">مندوب فايبر STC جدة</a><a href="/jeddah/salam">مندوب فايبر سلام جدة</a><a href="/jeddah/mobily">مندوب فايبر موبايلي جدة</a><a href="/jeddah/zain">مندوب زين جدة</a><a href="/jeddah/5g">مندوب راوتر 5G جدة</a></div>
      <h2>أسئلة شائعة عن {title}</h2><div className="card faq">{faqs.map((f) => <div key={f.q}><h4>{f.q}</h4><p>{f.a}</p></div>)}</div>
      <JsonLd data={schemas} />
    </section>
  </main>;
}
