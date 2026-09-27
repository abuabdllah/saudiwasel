import LeadForm from "../components/LeadForm";
import InfoSections from "../components/InfoSections";
import { cities } from "../lib/cities";

export const metadata = {
  title: "مندوب فايبر في السعودية | تركيب ألياف بصرية وفحص التغطية - سعودي واصل",
  description:
    "مندوب فايبر في السعودية لفحص تغطية الألياف البصرية ومقارنة خيارات STC وموبايلي وزين وسلام، مع متابعة طلب الاشتراك والتركيب والتفعيل.",
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
            <h1>مندوب فايبر وتركيب ألياف بصرية في جميع مدن السعودية</h1>

            <p className="hero-sub">
              مندوب فايبر يساعدك في فحص تغطية الألياف البصرية على عنوانك،
              ومعرفة المشغلين المتاحين ومقارنة خيارات الإنترنت، ومتابعة طلبك
              حتى التركيب والتفعيل.
            </p>

            <ul className="hero-points">
              <li>✔ فحص تغطية الفايبر</li>
              <li>✔ STC وموبايلي وزين وسلام</li>
              <li>✔ متابعة طلب الاشتراك حتى التفعيل</li>
            </ul>
          </div>

          <LeadForm />
        </div>
      </section>

      <section className="container">
        <h2>مندوب فايبر في السعودية</h2>

        <p>
          سعودي واصل منصة مستقلة تساعدك في طلب خدمات الإنترنت المنزلي بسهولة.
          بدل التواصل مع كل شركة بشكل منفصل، ترسل طلبك مرة واحدة ونساعدك في
          معرفة خيارات الفايبر والألياف البصرية المتاحة على عنوانك، ثم متابعة
          إجراءات الاشتراك والتركيب والتفعيل.
          <a href="/about"> اعرف أكثر عنا</a>.
        </p>

        <h2>فايبر حسب الشركة</h2>

        <div className="cities">
          <a href="/jeddah/stc">مندوب فايبر STC جدة</a>
          <a href="/jeddah/mobily">مندوب فايبر موبايلي جدة</a>
        </div>

        <h2>فحص تغطية الألياف البصرية</h2>

        <p>
          تختلف تغطية الفايبر من حي إلى آخر ومن مبنى إلى آخر. أرسل عنوانك أو
          بيانات موقعك لنساعدك في معرفة توفر الألياف البصرية والخيارات المتاحة
          قبل رفع طلب الاشتراك.
        </p>

        <h2>مبناك مش مغطى بالفايبر؟</h2>

        <p>
          راوتر 5G خيار آخر للإنترنت المنزلي بدون تمديدات، ويمكنك مقارنة
          الباقات المتاحة ومعرفة الخيارات المناسبة لموقعك.
        </p>

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
            <a key={c.slug} href={`/${c.slug}`}>
              مندوب فايبر {c.name}
            </a>
          ))}
        </div>
      </section>

      <InfoSections place="المملكة" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteSchema),
        }}
      />
    </main>
  );
}