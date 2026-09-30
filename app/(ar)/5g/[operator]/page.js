import { notFound } from "next/navigation";
import LeadForm from "../../../../components/LeadForm";
import { fivegOperators, fivegUpdated } from "../../../../lib/fiveg";
import JsonLd, { breadcrumbSchema, faqSchema, serviceSchema } from "../../../../components/JsonLd";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

export const dynamicParams = false;

export function generateStaticParams() {
  return fivegOperators.map((o) => ({ operator: o.slug }));
}

export async function generateMetadata({ params }) {
  const { operator } = await params;
  const o = fivegOperators.find((x) => x.slug === operator);

  if (!o) return {};

  const title = `راوتر 5G ${o.name} | الباقات والتغطية`;
  const description = `رقم مندوب راوتر 5G ${o.name} في السعودية لمعرفة الباقات والمميزات المتاحة والتحقق من التغطية وطلب الاشتراك.`;
  return {
    title,
    description,
    openGraph: { title, description, images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image.png"] },
    alternates: {
      canonical: `/5g/${o.slug}`,
    },
  };
}

export default async function FiveGOperatorPage({ params }) {
  const { operator } = await params;
  const o = fivegOperators.find((x) => x.slug === operator);
  if (!o) notFound();
  const others = fivegOperators.filter((x) => x.slug !== o.slug);

  const faqs = [
    { q: `كيف أشترك في راوتر 5G ${o.name}؟`, a: `عبّي النموذج أو راسلنا واتساب على ${PHONE_LOCAL}، ونتأكد من تغطية ${o.name} 5G على عنوانك ونرفع لك الطلب ونتابعه حتى يوصلك الراوتر.` },
    { q: `هل راوتر ${o.name} 5G مجاني؟`, a: "نعم، الراوتر مجاني مع الاشتراك في الباقات الحالية." },
    { q: "هل الطلب عن طريق المندوب عليه رسوم إضافية؟", a: "لا، تدفع قيمة الباقة فقط حسب عرض الشركة." },
    { q: `ما الأفضل: ${o.name} 5G أم الفايبر؟`, a: "إذا كان مبناك مغطى بالفايبر، فالفايبر أكثر ثباتاً وأحياناً أقل سعراً. وإذا كان غير مغطى أو كنت تحتاج إلى تركيب سريع ومرونة، فقد يكون 5G هو الخيار الأنسب." },
  ];

  const schemas = [breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "راوتر 5G", path: "/5g" }, { name: o.name, path: `/5g/${o.slug}` }]), serviceSchema({ name: `راوتر 5G ${o.name}`, serviceType: "راوتر 5G منزلي", city: "السعودية", path: `/5g/${o.slug}` }), faqSchema(faqs)];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>مندوب راوتر 5G {o.name}</h1>
            <p className="hero-sub">اشتراك {o.brand} للإنترنت المنزلي: الراوتر مجاني ويعمل دون تمديدات، ومندوب يرفع طلبك ويتابعه حتى التفعيل.</p>
            <ul className="hero-points">
              <li>✔ راوتر 5G مجاني</li>
              <li>✔ إنترنت منزلي لا محدود</li>
              <li>✔ بدون رسوم إضافية على خدمتنا</li>
            </ul>
          </div>
          <LeadForm operator={`${o.name} 5G`} />
        </div>
      </section>

      <section className="container">
        <p className="notice">سعودي واصل جهة مستقلة وليست الموقع الرسمي لـ{o.name}. نساعدك كمندوب مبيعات في اختيار الباقة ورفع الطلب ومتابعته.</p>

        <h2>أسعار باقات {o.brand} (آخر تحديث: {fivegUpdated})</h2>
        <div className="table-wrap">
          <table className="compare">
            <thead><tr><th>الباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead>
            <tbody>
              {o.packages.map((p) => (
                <tr key={p.name}><td>{p.name}</td><td>{p.down}</td><td>{p.up}</td><td>{p.price}</td><td>{p.perks}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small-note">الأسعار شاملة ضريبة القيمة المضافة ومنقولة من الموقع الرسمي لـ{o.name} وقد تتغير. تواصل معنا لتأكيد السعر الحالي.</p>

        <div className="contact-box">
          <h3>تأكيد أسعار باقات {o.name}</h3>
          <p>تتغير الأسعار والعروض من وقت إلى آخر، وقد تتوفر خصومات للأشهر الأولى. راسلنا عبر واتساب لتأكيد أحدث سعر وعرض متاح لعنوانك.</p>
          <div className="header-actions">
            <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
          </div>
        </div>

        <h2>رقم مندوب راوتر 5G {o.name}</h2>
        <div className="contact-box">
          <p>للاشتراك في راوتر {o.name} 5G أو الاستفسار عن التغطية على عنوانك:</p>
          <div className="header-actions">
            <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
            <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
          </div>
        </div>

        <h2>عن {o.brand}</h2>
        <p>{o.about}</p>

        <h2>معلومات مهمة قبل الاشتراك</h2>
        <ul className="req-list">
          {o.facts.map((f) => <li key={f}>{f}</li>)}
        </ul>

        <h2>خطوات الاشتراك عن طريق المندوب</h2>
        <div className="steps">
          <div className="card"><span>1</span><h4>أرسل طلبك</h4><p>اسمك ومدينتك وحيك عبر النموذج أو واتساب.</p></div>
          <div className="card"><span>2</span><h4>نتأكد من التغطية</h4><p>نتحقق من قوة 5G على عنوانك.</p></div>
          <div className="card"><span>3</span><h4>تختار الباقة</h4><p>نرسل لك العروض المتاحة وتقرر.</p></div>
          <div className="card"><span>4</span><h4>يصلك الراوتر</h4><p>نتابع الطلب حتى يصل الراوتر ويعمل.</p></div>
        </div>

        <h2>ماذا تحتاج للاشتراك؟</h2>
        <ul className="req-list">
          <li>الهوية الوطنية أو الإقامة سارية المفعول</li>
          <li>العنوان الوطني أو موقع البيت على الخريطة</li>
          <li>رقم جوال للتواصل والتوصيل</li>
        </ul>

        <h2>قارن مع شركات أخرى</h2>
        <div className="cities">
          {others.map((x) => (
            <a key={x.slug} href={`/5g/${x.slug}`}>راوتر 5G {x.name}</a>
          ))}
          <a href="/5g">كل باقات 5G</a>
          <a href="/fiber-vs-5g">فايبر ولا 5G؟</a>
        </div>

        <h2>أسئلة شائعة عن راوتر 5G {o.name}</h2>
        <div className="card faq">
          {faqs.map((f) => (
            <div key={f.q}><h4>{f.q}</h4><p>{f.a}</p></div>
          ))}
        </div>

        <JsonLd data={schemas} />
      </section>
    </main>
  );
}
