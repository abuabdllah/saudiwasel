import LeadForm from "../components/LeadForm";
import InfoSections from "../components/InfoSections";
import { cities } from "../lib/cities";

export const metadata = {
  title: "تركيب فايبر ومندوب فايبر في السعودية | STC وموبايلي وزين وسلام - سعودي واصل",
  description: "مندوب فايبر وراوتر 5G لجميع الشركات في مدن المملكة: فحص تغطية مجاني، مقارنة باقات STC وموبايلي وزين وسلام، ومتابعة طلبك حتى التركيب والتفعيل.",
  alternates: { canonical: "/" },
};

const siteSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "سعودي واصل",
    alternateName: ["Saudi Wasel", "saudiwasel.com"],
    url: "https://saudiwasel.com/",
    inLanguage: "ar",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "سعودي واصل",
    url: "https://saudiwasel.com/",
    logo: "https://saudiwasel.com/icon.png",
    telephone: "+966564612017",
    areaServed: "SA",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>تركيب الألياف البصرية (الفايبر) في جميع مدن المملكة</h1>
            <p className="hero-sub">مندوب فايبر لكل الشركات: نفحص تغطية مبناك، نقارن لك الباقات، ونتابع طلبك حتى التركيب والتفعيل.</p>
            <ul className="hero-points">
              <li>✔ فحص تغطية مجاني</li>
              <li>✔ STC وموبايلي وزين وسلام في طلب واحد</li>
              <li>✔ بدون رسوم إضافية على خدمتنا</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="container">
        <h2>عن سعودي واصل</h2>
        <p>سعودي واصل منصة مستقلة تساعدك تشترك في الإنترنت المنزلي بأسهل طريقة. بدل ما تتواصل مع كل شركة لوحدها، ترسل طلب واحد، ونشوف لك المتاح على عنوانك من فايبر أو راوتر 5G عند كل الشركات، ونتابع طلبك حتى التفعيل. <a href="/about">اعرف أكثر عنا</a>.</p>

        <h2>فايبر حسب الشركة</h2>
        <div className="cities">
          <a href="/jeddah/stc">مندوب فايبر STC جدة</a>
          <a href="/jeddah/mobily">مندوب فايبر موبايلي جدة</a>
        </div>

        <h2>مبناك مش مغطى بالفايبر؟</h2>
        <p>راوتر 5G هو البديل الأسرع: من غير تمديدات، والراوتر مجاني مع الاشتراك.</p>
        <div className="cities">
          <a href="/5g">مندوب راوتر 5G</a>
          <a href="/5g/stc">راوتر 5G STC</a>
          <a href="/5g/mobily">راوتر 5G موبايلي</a>
          <a href="/5g/zain">راوتر 5G زين</a>
          <a href="/5g/salam">راوتر 5G سلام</a>
          <a href="/fiber-vs-5g">فايبر ولا راوتر 5G؟</a>
        </div>

        <h2>نغطي مدن المملكة</h2>
        <div className="cities">
          {cities.map((c) => (
            <a key={c.slug} href={`/${c.slug}`}>تركيب فايبر {c.name}</a>
          ))}
        </div>
      </section>

      <InfoSections place="المملكة" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
    </main>
  );
}
