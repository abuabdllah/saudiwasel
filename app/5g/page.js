import LeadForm from "../../components/LeadForm";
import { fivegOperators, fivegUpdated } from "../../lib/fiveg";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

export const metadata = {
  title: "مندوب راوتر 5G | اشتراك انترنت 5G منزلي STC وموبايلي وزين وسلام - سعودي واصل",
  description: "مندوب راوتر 5G في جميع مدن المملكة: قارن باقات الإنترنت المنزلي 5G من STC وموبايلي وزين وسلام بالأسعار الرسمية، واطلب الراوتر ونتابع معك حتى التفعيل.",
  alternates: { canonical: "/5g" },
};

const faqs = [
  { q: "إيش هو راوتر 5G المنزلي؟", a: "جهاز يستقبل شبكة الجيل الخامس من أقرب برج ويحولها لشبكة واي فاي داخل البيت، من غير أسلاك أو تمديدات أو زيارة فني." },
  { q: "هل راوتر 5G أحسن من الفايبر؟", a: "الفايبر أثبت وأسرع في الرفع وأقل تأخيراً، لكن راوتر 5G أسرع في التركيب ومناسب لو مبناك مش مغطى بالفايبر أو ساكن إيجار مؤقت. شوف صفحة المقارنة للتفاصيل." },
  { q: "كم سعر راوتر 5G؟", a: "الراوتر مجاني مع الاشتراك عند كل الشركات، والباقات الشهرية تبدأ من حوالي 239 ريال حسب الشركة والسرعة." },
  { q: "هل في التزام أو عقد؟", a: "الباقات المفوترة غالباً فيها مدة التزام (زين مثلاً 24 شهر)، وفي باقات مسبقة الدفع من غير التزام شهري عند STC." },
  { q: "كيف أعرف إن 5G قوي في بيتي؟", a: "أرسل لنا مدينتك وحيك، ونتأكد لك من تغطية 5G لدى الشركات المتاحة قبل ما تشترك." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FiveGPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>مندوب راوتر 5G لجميع الشركات</h1>
            <p className="hero-sub">إنترنت منزلي 5G من STC وموبايلي وزين وسلام: الراوتر يوصلك مجاناً ويشتغل من غير تمديدات، ومندوب يتابع طلبك حتى التفعيل.</p>
            <ul className="hero-points">
              <li>✔ الراوتر مجاني مع الاشتراك</li>
              <li>✔ بدون تمديدات أو فني</li>
              <li>✔ نقارن لك الشركات المتاحة على عنوانك</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="container">
        <p className="notice">سعودي واصل جهة مستقلة وليست الموقع الرسمي لأي مشغل. نساعدك كمندوب مبيعات في اختيار الباقة ورفع الطلب ومتابعته.</p>

        <h2>مقارنة سريعة: أرخص باقة 5G عند كل شركة</h2>
        <div className="table-wrap">
          <table className="compare">
            <thead><tr><th>الشركة</th><th>الباقة</th><th>السرعة</th><th>السعر</th></tr></thead>
            <tbody>
              {fivegOperators.map((o) => (
                <tr key={o.slug}>
                  <td><a href={`/5g/${o.slug}`}>{o.name}</a></td>
                  <td>{o.packages[0].name}</td>
                  <td>{o.packages[0].down}</td>
                  <td>{o.packages[0].price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small-note">الأسعار شاملة الضريبة ومنقولة من المواقع الرسمية للشركات (آخر تحديث: {fivegUpdated}). العروض تتغير باستمرار.</p>

        <h2>باقات راوتر 5G حسب الشركة</h2>
        <div className="cities">
          {fivegOperators.map((o) => (
            <a key={o.slug} href={`/5g/${o.slug}`}>راوتر 5G {o.name}</a>
          ))}
        </div>

        <h2>رقم مندوب راوتر 5G</h2>
        <div className="contact-box">
          <p>للاستفسار عن باقات 5G المنزلية المتاحة على عنوانك، تواصل مع المندوب مباشرة:</p>
          <div className="header-actions">
            <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
            <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
          </div>
        </div>

        <h2>مناسب لمين راوتر 5G؟</h2>
        <div className="steps">
          <div className="card"><h4>مبناك مش مغطى بالفايبر</h4><p>5G هو البديل الأسرع بدل ما تستنى وصول الألياف.</p></div>
          <div className="card"><h4>ساكن إيجار</h4><p>من غير تمديدات أو موافقة مالك، والراوتر معاك لو انتقلت (حسب الباقة).</p></div>
          <div className="card"><h4>محتاج نت بسرعة</h4><p>الراوتر يوصلك وتشغله بنفسك بدل انتظار موعد فني.</p></div>
          <div className="card"><h4>استراحة أو مكتب مؤقت</h4><p>حل مرن للأماكن اللي مش محتاجة اشتراك ثابت طويل.</p></div>
        </div>

        <h2>فايبر ولا راوتر 5G؟</h2>
        <p>لو مبناك مغطى بالفايبر، غالباً الفايبر أثبت وأحياناً أرخص. ولو مش مغطى أو محتاج مرونة، 5G هو الخيار. <a href="/fiber-vs-5g">اقرأ المقارنة الكاملة</a>، أو <a href="/">اطلب فايبر</a>.</p>

        <h2>أسئلة شائعة عن راوتر 5G</h2>
        <div className="card faq">
          {faqs.map((f) => (
            <div key={f.q}><h4>{f.q}</h4><p>{f.a}</p></div>
          ))}
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </section>
    </main>
  );
}
