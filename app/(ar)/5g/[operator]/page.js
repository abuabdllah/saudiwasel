import OperatorSources from "../../../../components/OperatorSources";
import { pageMetadata } from "../../../../lib/seo";
﻿import { notFound } from "next/navigation";
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
  return pageMetadata({
    title,
    description,
    openGraph: { title, description, images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image.png"] },
    alternates: {
      canonical: `/5g/${o.slug}`,
    },
  });
}

export default async function FiveGOperatorPage({ params }) {
  const { operator } = await params;
  const o = fivegOperators.find((x) => x.slug === operator);
  if (!o) notFound();
  const others = fivegOperators.filter((x) => x.slug !== o.slug);

  const faqs = [
    { q: o.slug === "mobily" ? "كيف أطلب راوتر موبايلي 5G؟" : `كيف أشترك في راوتر 5G ${o.name}؟`, a: `عبّي النموذج أو راسلنا واتساب على ${PHONE_LOCAL}، ونتأكد من تغطية ${o.name} 5G على عنوانك ونرفع لك الطلب ونتابعه حتى يوصلك الراوتر.` },
    { q: o.slug === "mobily" ? "كم سعر راوتر موبايلي 5G؟" : o.slug === "salam" ? "ما أسعار باقات سلام 5G؟" : `هل راوتر ${o.name} 5G مجاني؟`, a: ["mobily", "salam"].includes(o.slug) ? "راجع جدول الباقات في الصفحة لمعرفة التفاصيل المنشورة، ثم تواصل معنا لتأكيد السعر وتكلفة الراوتر وشروط العرض قبل الطلب. قد تختلف الأسعار حسب الباقة والعرض المتاح وقت الاشتراك." : "تُراجع تكلفة الجهاز وشروط ملكيته في عرض المشغل الحالي؛ لا نفترض أنه مجاني." },
    { q: "هل الطلب عن طريق المندوب عليه رسوم إضافية؟", a: "لا، تدفع قيمة الباقة فقط حسب عرض الشركة." },
    { q: `ما الأفضل: ${o.name} 5G أم الفايبر؟`, a: "إذا كان مبناك مغطى بالفايبر، فالفايبر أكثر ثباتاً وأحياناً أقل سعراً. وإذا كان غير مغطى أو كنت تحتاج إلى تركيب سريع ومرونة، فقد يكون 5G هو الخيار الأنسب." },
  ];

  if (["mobily", "salam"].includes(o.slug)) {
    faqs.push({ q: `كيف أعرف تغطية ${o.name} 5G في موقعي؟`, a: "أرسل المدينة والحي وموقع المنزل على الخريطة أو العنوان الوطني عبر النموذج أو واتساب، لنساعدك في التحقق من توفر الخدمة قبل الاشتراك." });
  }
  if (o.slug === "mobily") {
    faqs.push({ q: "ما الفرق بين راوتر موبايلي 5G والراوتر المتنقل؟", a: "الخدمة المنزلية مخصصة لاستخدام البيت وفق تغطية العنوان وشروط الباقة، بينما يُختار الراوتر المتنقل للاستخدام أثناء التنقل. لا تفترض أن الباقة المنزلية تسمح بالتنقل؛ تأكد من شروطها ومواصفات الجهاز قبل الطلب." });
  }

  const schemas = [breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: "راوتر 5G", path: "/5g" }, { name: o.name, path: `/5g/${o.slug}` }]), serviceSchema({ name: `راوتر 5G ${o.name}`, serviceType: "راوتر 5G منزلي", city: "السعودية", path: `/5g/${o.slug}` }), faqSchema(faqs)];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>مندوب راوتر 5G {o.name}</h1>
            <p className="hero-sub">اشتراك {o.brand} للإنترنت المنزلي: الراوتر يعمل دون تمديدات ألياف وتخضع تكلفته لشروط الباقة، ومندوب يرفع طلبك ويتابعه حتى التفعيل.</p>
            <ul className="hero-points">
              <li>✔ راجع تكلفة الجهاز وشروطه</li>
              <li>✔ راجع سياسة البيانات في الباقة</li>
              <li>✔ بدون رسوم إضافية على خدمتنا</li>
            </ul>
          </div>
          <LeadForm operator={`${o.name} 5G`} />
        </div>
      </section>

      <section className="container">
        <p className="notice">سعودي واصل جهة مستقلة وليست الموقع الرسمي لـ{o.name}. نساعدك كمندوب مبيعات في اختيار الباقة ورفع الطلب ومتابعته.</p>

        <h2>{o.slug === "mobily" ? "سعر راوتر موبايلي 5G والباقات" : o.slug === "salam" ? "أسعار باقات سلام 5G" : `أسعار باقات ${o.brand} (آخر تحديث: ${fivegUpdated})`}</h2>
        <OperatorSources operator={o.slug} />
        {o.slug === "mobily" && <p>يعرض الجدول باقات موبايلي 5G المنزلية بحسب المعلومات المتاحة في الموقع، وآخر تحديث لها: {fivegUpdated}. عند مقارنة سعر راوتر 5G موبايلي، ميّز بين اشتراك الباقة وتكلفة الجهاز وشروط الحصول عليه؛ لا تفترض أن السعر الشهري هو سعر شراء الراوتر منفرداً.</p>}
        {o.slug === "salam" && <p>تختلف أسعار باقات سلام والعروض بحسب الباقة المتاحة وقت الاشتراك. يعرض الجدول خيارات إنترنت سلام 5G الواردة في بيانات الموقع، وآخر تحديث لها: {fivegUpdated}؛ تواصل معنا لمعرفة السعر الحالي وتفاصيل راوتر سلام 5G قبل الطلب.</p>}
        <div className="table-wrap">
          <table className="compare">
            <thead><tr><th>اسم مرجعي للباقة</th><th>التحميل</th><th>الرفع</th><th>السعر</th><th>المزايا</th></tr></thead>
            <tbody>
              {o.packages.map((p) => (
                <tr key={p.name}><td>{p.name}</td><td>{p.down}</td><td>{p.up}</td><td>{p.price}</td><td>{p.perks}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small-note">راجع المصدر الرسمي لـ{o.name} لتأكيد السعر والضريبة وتكلفة الجهاز والالتزام قبل الاشتراك.</p>
        {["mobily", "salam"].includes(o.slug) && <p className="small-note">قد تختلف الأسعار والعروض والمزايا حسب الباقة والعرض المتاح وقت الاشتراك، لذلك يُفضّل تأكيد السعر والتفاصيل قبل الطلب.</p>}

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

        {["mobily", "salam"].includes(o.slug) && <>
          <h2>{o.slug === "mobily" ? "تغطية راوتر موبايلي 5G" : "تغطية سلام 5G"}</h2>
          <p>{o.slug === "mobily"
            ? "توفر راوتر موبايلي 5G منزلي يعتمد على تغطية الشبكة في موقعك. قد يختلف أداء مودم موبايلي 5G حسب الإشارة داخل المنزل ومكان الجهاز، لذلك أرسل عنوانك للتحقق من توفر الخدمة قبل اختيار الباقة."
            : "تغطية سلام 5G تختلف بحسب الموقع والمبنى؛ وجود الخدمة في المدينة لا يعني توفرها في كل منزل. أرسل موقعك للتحقق من الخيارات المتاحة ومراجعة متطلبات الخدمة قبل الاشتراك."}</p>
        </>}
        <p>للمقارنة على مستوى العنوان، راجع خيارات الفايبر في <a href="/jeddah">جدة</a> و<a href="/dammam">الدمام</a> و<a href="/madinah">المدينة المنورة</a>، أو <a href={`/jeddah/${o.slug}`}>خدمات {o.name} في جدة</a>.</p>

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
