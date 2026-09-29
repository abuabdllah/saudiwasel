import LeadForm from "../../components/LeadForm";
import { fivegOperators, fivegUpdated } from "../../lib/fiveg";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

const title = "راوتر 5G السعودية | STC وسلام وزين وموبايلي";
const description = "رقم مندوب راوتر 5G في السعودية لمقارنة خيارات STC وسلام وزين وموبايلي، ومعرفة المميزات والتغطية وطلب الخدمة.";
export const metadata = { title, description, openGraph: { title, description }, twitter: { title, description } };

const faqs = [
  { q: "ما راوتر 5G المنزلي؟", a: "جهاز يستقبل شبكة الجيل الخامس من أقرب برج ويحولها إلى شبكة واي فاي داخل المنزل، دون أسلاك أو تمديدات أو زيارة فني." },
  { q: "هل راوتر 5G أفضل من الفايبر؟", a: "الفايبر أكثر ثباتاً وأسرع في الرفع وأقل تأخيراً، لكن راوتر 5G أسرع في التركيب ومناسب إذا كان مبناك غير مغطى بالفايبر أو كنت تسكن في إيجار مؤقت. راجع صفحة المقارنة للتفاصيل." },
  { q: "هل يوجد التزام أو عقد؟", a: "غالباً تتضمن الباقات المفوترة مدة التزام (زين مثلاً 24 شهراً)، وتوجد باقات مسبقة الدفع دون التزام شهري لدى STC." },
  { q: "كيف أعرف أن 5G قوي في منزلي؟", a: "أرسل لنا مدينتك وحيك، ونتحقق من تغطية 5G لدى الشركات المتاحة قبل الاشتراك." },
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
            <p className="hero-sub">إنترنت منزلي 5G من STC وسلام وزين وموبايلي: يصلك الراوتر ويعمل دون تمديدات، ومندوب يتابع طلبك حتى التفعيل.</p>
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

        <h2>مقارنة سريعة لمميزات 5G عند كل شركة</h2>
        <div className="table-wrap">
          <table className="compare">
            <thead><tr><th>الشركة</th><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>المميزات</th></tr></thead>
            <tbody>
              {fivegOperators.map((o) => (
                <tr key={o.slug}>
                  <td><a href={`/5g/${o.slug}`}>{o.name}</a></td>
                  <td>{o.packages[0].name}</td>
                  <td>{o.packages[0].down}</td>
                  <td>{o.packages[0].up}</td>
                  <td>{o.packages[0].perks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small-note">آخر تحديث: {fivegUpdated}. المميزات حسب عروض المشغل الحالية وقد تتغير، تواصل معنا للتأكيد.</p>

        <h2>باقات راوتر 5G حسب الشركة</h2>
        <div className="cities">
          {fivegOperators.map((o) => (
            <a key={o.slug} href={`/5g/${o.slug}`}>راوتر 5G {o.name}</a>
          ))}
        </div>

        <h2>بديل الفايبر: إنترنت منزلي بدون تمديدات</h2>
        <p>إذا كانت عمارتك غير مغطاة بالفايبر، يمكنك اختيار راوتر 5G منزلي دون تمديدات من <a href="/5g/stc">STC</a> أو <a href="/5g/salam">سلام</a> أو <a href="/5g/zain">زين</a> أو <a href="/5g/mobily">موبايلي</a> حسب التغطية على عنوانك.</p>

        <h2>رقم مندوب راوتر 5G</h2>
        <div className="contact-box">
          <p>للاستفسار عن باقات 5G المنزلية المتاحة على عنوانك، تواصل مع المندوب مباشرة:</p>
          <div className="header-actions">
            <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
            <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
          </div>
        </div>

        <h2>لمن يناسب راوتر 5G؟</h2>
        <div className="steps">
          <div className="card"><h4>مبناك غير مغطى بالفايبر</h4><p>5G هو البديل الأسرع بدلاً من انتظار وصول الألياف.</p></div>
          <div className="card"><h4>تسكن في إيجار</h4><p>دون تمديدات أو موافقة المالك، ويمكن نقل الراوتر إذا انتقلت (حسب الباقة).</p></div>
          <div className="card"><h4>تحتاج الإنترنت سريعاً</h4><p>يصلك الراوتر ويمكنك تشغيله بنفسك بدلاً من انتظار موعد فني.</p></div>
          <div className="card"><h4>استراحة أو مكتب مؤقت</h4><p>حل مرن للأماكن التي لا تحتاج إلى اشتراك ثابت طويل.</p></div>
        </div>

        <h2>فايبر ولا راوتر 5G؟</h2>
        <p>إذا كان مبناك مغطى بالفايبر، فغالباً يكون الفايبر أكثر ثباتاً وأحياناً أقل سعراً. وإذا كان غير مغطى أو كنت تحتاج إلى المرونة، فقد يكون 5G هو الخيار. <a href="/fiber-vs-5g">اقرأ المقارنة الكاملة</a>، أو <a href="/">اطلب فايبر</a>.</p>

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
