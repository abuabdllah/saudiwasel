import LeadForm from "../../../components/LeadForm";

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

export const metadata = {
  title: "تواصل معنا | رقم مندوب فايبر وراوتر 5G - سعودي واصل",
  description: "رقم وواتساب سعودي واصل: مندوب فايبر وراوتر 5G لجميع الشركات في مدن المملكة. تواصل معنا للاستفسار أو طلب الاشتراك.",
  alternates: { canonical: "/contact" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "تواصل مع سعودي واصل",
  url: "https://saudiwasel.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "سعودي واصل",
    url: "https://saudiwasel.com/",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966564612017",
      contactType: "sales",
      areaServed: "SA",
      availableLanguage: ["ar"],
    },
  },
};

export default function ContactPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>تواصل معنا</h1>
            <p className="hero-sub">عندك استفسار عن الفايبر أو راوتر 5G، أو تبغى تشترك؟ راسلنا واتساب أو اتصل مباشرة، أو عبّي النموذج.</p>
            <div className="header-actions" style={{ marginTop: 16, flexWrap: "wrap" }}>
              <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
              <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">واتساب</a>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="container page">
        <h2>بيانات التواصل</h2>
        <ul className="req-list">
          <li>الجوال وواتساب: <a href={`tel:${PHONE_LOCAL}`}>{PHONE_LOCAL}</a></li>
          <li>نطاق الخدمة: جميع مدن المملكة العربية السعودية</li>
          <li>الخدمات: اشتراك الفايبر (الألياف البصرية) وراوتر 5G المنزلي لدى STC وسلام وزين وموبايلي</li>
        </ul>

        <h2>قبل أن تراسلنا</h2>
        <p>لنخدمك بصورة أسرع، أرسل المدينة والحي، ونوع السكن (فيلا، شقة، مكتب)، والشركة التي تفضلها إن وجدت.</p>

        <p className="notice">سعودي واصل جهة مستقلة. إذا كان لديك عطل أو مشكلة في خدمة قائمة أو فاتورة، فتواصل مع خدمة عملاء شركتك مباشرة، لأننا نخدم طلبات الاشتراك الجديدة فقط.</p>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </section>
    </main>
  );
}
