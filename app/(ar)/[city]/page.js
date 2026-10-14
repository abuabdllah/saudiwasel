import { cityIntroductions, localDistricts } from "../../../lib/local-content";
import CityOperatorLinks from "../../../components/CityOperatorLinks";
import IntentCtas from "../../../components/IntentCtas";
import CityNextSteps from "../../../components/CityNextSteps";
import { pageMetadata } from "../../../lib/seo";
import { notFound } from "next/navigation";
import { cities } from "../../../lib/cities";
import { operatorCities } from "../../../lib/operators";
import LeadForm from "../../../components/LeadForm";
import InfoSections from "../../../components/InfoSections";
import JsonLd, { breadcrumbSchema, serviceSchema } from "../../../components/JsonLd";
import { RiyadhCityPage } from "../../../components/RiyadhPages";
import { MakkahCityPage } from "../../../components/MakkahPages";
import { EasternCityPage } from "../../../components/EasternPages";
import { HijazCityPage } from "../../../components/HijazPages";
import { RegionalCityPage } from "../../../components/RegionalPages";
import { regionalSlugs } from "../../../lib/regional";
import { languageAlternates } from "../../../lib/languages";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);

  if (!c) return {};

  const title = `مندوب فايبر ${c.name} | فحص التغطية وطلب الألياف البصرية`;
  const regionalDescriptions = {
    abha: "رقم مندوب فايبر أبها لفحص المنزل الدائم أو الصيفي ومقارنة الألياف براوتر 5G قبل طلب التركيب.",
    tabuk: "رقم مندوب فايبر تبوك لفحص الشقق والفلل والمخططات الحديثة ومقارنة الفايبر و5G على عنوانك.",
    buraidah: "رقم مندوب فايبر بريدة لفحص الفيلا أو المنزل العائلي ومراجعة الألياف و5G قبل الاشتراك.",
    hail: "رقم مندوب فايبر حائل لفحص الفلل والمساكن العائلية ومقارنة خدمة الألياف براوتر 5G.",
    jazan: "رقم مندوب فايبر جازان لفحص العمائر والفلل والسكن المؤقت ومقارنة الفايبر وخيارات 5G.",
  };
  const description = regionalDescriptions[c.slug] || (c.slug === "madinah"
    ? "رقم مندوب فايبر المدينة المنورة لفحص المبنى ومقارنة الألياف براوتر 5G للسكن الدائم أو المؤقت ومتابعة طلب التركيب."
    : c.slug === "taif"
      ? "رقم مندوب فايبر الطائف لفحص الفيلا أو الشقة أو الاستراحة ومقارنة الفايبر و5G قبل متابعة طلب التركيب."
  : c.slug === "makkah"
    ? "رقم مندوب فايبر مكة لفحص عنوان السكن، مقارنة خيارات الألياف و5G، ومتابعة طلب التركيب عبر الاتصال أو واتساب."
    : c.slug === "dammam"
      ? "رقم مندوب فايبر الدمام لفحص المبنى، مقارنة الألياف براوتر 5G، ومتابعة طلب التركيب في الأحياء والمخططات الجديدة."
      : c.slug === "khobar"
        ? "رقم مندوب فايبر الخبر لفحص الشقق والمجمعات، مقارنة الفايبر و5G، ومتابعة طلب التركيب عبر الاتصال أو واتساب."
    : `رقم مندوب فايبر ${c.name} لفحص تغطية الألياف البصرية، معرفة الخيارات المتاحة، ومتابعة طلب التركيب والتفعيل.`);
  return pageMetadata({
    title,
    description,
    openGraph: { title, description, images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image.png"] },
    alternates: {
      canonical: `/${c.slug}`,
      languages: languageAlternates(`/${c.slug}`),
    },
  });
}
export default async function CityPage({ params }) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) notFound();
  if (c.slug === "riyadh") return <RiyadhCityPage />;
  if (c.slug === "makkah") return <MakkahCityPage />;
  if (["madinah", "taif"].includes(c.slug)) return <HijazCityPage city={c.slug} />;
  if (["dammam", "khobar"].includes(c.slug)) return <EasternCityPage city={c.slug} />;
  if (regionalSlugs.includes(c.slug)) return <RegionalCityPage city={c.slug} />;
  const hasOperators = operatorCities.includes(c.slug);
  const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/" }, { name: c.name, path: `/${c.slug}` }]),
    serviceSchema({ name: `مندوب فايبر ${c.name}`, serviceType: "تركيب الألياف البصرية", city: c.name, path: `/${c.slug}` }),
  ];

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>مندوب فايبر {c.name} وفحص التغطية</h1>
            <p className="hero-sub">{cityIntroductions[c.slug]}</p>
            <ul className="hero-points">
              <li>✔ التحقق من عنوان المبنى قبل الاشتراك</li>
              <li>✔ مقارنة الخيارات التي تتوفر على العنوان</li>
              <li>✔ تواصل مباشر مع المندوب واتساب</li>
            </ul>
          </div>
          <LeadForm defaultCity={c.name} />
        </div>
      </section>

      <section className="container">
        <h2>خدمات الفايبر في {c.name}</h2>
<p>{c.intro}</p>

{c.localSeo && (
  <>
    <h2>تركيب الفايبر وفحص التغطية في {c.name}</h2>
    <p>{c.localSeo}</p>
  </>
)}

        {hasOperators && (
          <>
            <h2>فايبر حسب المشغل في {c.name}</h2>
            <CityOperatorLinks city={c.slug} />
          </>
        )}

        <h2>أحياء {c.name}: ابدأ بالعنوان داخل الحي</h2>
        <div className="cities">
          {c.districts.map((district) => <span key={district}>حي {district}</span>)}
        </div>
        <p style={{ marginTop: 12 }}>هذه أمثلة للأحياء وليست قائمة مناطق مغطاة. اكتب حيّك حتى إن لم يظهر هنا، ثم شارك موقع المبنى أثناء المتابعة. في الصفا أو السلامة أو أبحر الشمالية، لا تنطبق نتيجة عقار على العقار المجاور.</p>

        <div className="card faq">{localDistricts(c.slug).map((district) => <div key={district.name}><h3>حي {district.name}</h3><p>{district.text}</p></div>)}</div>

        <h2>مندوب الياف بصرية في {c.name}</h2>
        <div className="contact-box">
          <p>للاستفسار عن تغطية وباقات الفايبر في {c.name} لدى جميع المشغلين، تواصل مع مندوب الياف بصرية مستقل يساعدك في فحص الخيارات ومتابعة الطلب:</p>
          <IntentCtas city={c.slug} />
        </div>

        <h2>مبناك في {c.name} غير مغطى بالفايبر؟</h2>
        <p>راجع العنوان لدى مشغل آخر أولًا، أو قارن راوتر 5G إذا كانت الإشارة داخل المنزل مناسبة. لا يحتاج 5G تمديد ألياف، وتخضع تكلفة الجهاز وإمكانية نقله لشروط الباقة. <a href="/5g">اعرف خيارات 5G</a> أو <a href="/fiber-vs-5g">قارن بين الفايبر و5G</a>.</p>
        <JsonLd data={schemas} />
      </section>

      <InfoSections place={c.name} />

      <section className="container">
        <h2>مدن قريبة</h2>
        <div className="cities">
          {cities.filter((x) => x.slug !== c.slug).map((x) => (
            <a key={x.slug} href={`/${x.slug}`}>تركيب فايبر {x.name}</a>
          ))}
        </div>
      </section>
    <CityNextSteps city={c.slug} />
    </main>
  );
}
