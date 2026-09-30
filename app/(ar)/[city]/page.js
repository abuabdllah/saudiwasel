import { notFound } from "next/navigation";
import { cities } from "../../../lib/cities";
import { operators, operatorCities } from "../../../lib/operators";
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

const PHONE_LOCAL = "0564612017";
const PHONE_WA = "966564612017";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);

  if (!c) return {};

  const title = c.slug === "makkah" ? "مندوب فايبر مكة | تركيب الألياف البصرية" : `مندوب فايبر ${c.name} | تركيب الألياف البصرية`;
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
  return {
    title,
    description,
    openGraph: { title, description, images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title, description, images: ["/twitter-image.png"] },
    alternates: {
      canonical: `/${c.slug}`,
      languages: languageAlternates(`/${c.slug}`),
    },
  };
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
            <h1>تركيب فايبر في {c.name} وفحص تغطية الألياف البصرية</h1>
            <p className="hero-sub">مندوب فايبر في {c.name}: نفحص تغطية مبناك لدى كل الشبكات في طلب واحد، ونساعدك تختار الباقة الأنسب ونتابع طلبك حتى التركيب.</p>
            <ul className="hero-points">
              <li>✔ فحص تغطية مجاني في جميع أحياء {c.name}</li>
              <li>✔ مقارنة بين جميع المشغلين</li>
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
<h2>مندوب الياف بصرية في {c.name}</h2>
        <div className="contact-box">
          <p>للاستفسار عن تغطية وباقات الفايبر في {c.name} لدى جميع المشغلين، تواصل مع مندوب الياف بصرية مستقل يساعدك في فحص الخيارات ومتابعة الطلب:</p>
          <div className="header-actions">
            <a href={`tel:${PHONE_LOCAL}`} className="btn btn-call">📞 {PHONE_LOCAL}</a>
            <a href={`https://wa.me/${PHONE_WA}`} className="btn btn-wa">راسلنا واتساب</a>
          </div>
        </div>

        {hasOperators && (
          <>
            <h2>فايبر حسب المشغل في {c.name}</h2>
            <div className="cities">
              {operators.map((o) => (
                <a key={o.slug} href={`/${c.slug}/${o.slug}`}>مندوب فايبر {o.name} {c.name}</a>
              ))}
              {c.slug === "jeddah" && <a href="/jeddah/zain">مندوب زين جدة</a>}
              {c.slug === "jeddah" && <a href="/jeddah/5g">مندوب راوتر 5G جدة</a>}
              {c.slug === "jeddah" && <a href="/makkah">مندوب فايبر مكة</a>}
            </div>
          </>
        )}

        <h2>أحياء نغطيها في {c.name}</h2>
        <div className="cities">
          {c.districts.map((d) => <span key={d}>فايبر حي {d}</span>)}
        </div>
        <p style={{ marginTop: 12 }}>وغيرها من أحياء {c.name} و{c.region}. أرسل اسم حيك ونفحص لك التغطية فوراً.</p>

        <h2>مبناك في {c.name} غير مغطى بالفايبر؟</h2>
        <p>راوتر 5G هو البديل الأسرع: دون تمديدات أو موعد فني، والراوتر مجاني مع الاشتراك. <a href="/5g">تعرّف على باقات راوتر 5G</a> أو <a href="/fiber-vs-5g">قارن بين الفايبر و5G</a>.</p>
        <JsonLd data={schemas} />
      </section>

      <InfoSections place={c.name} />

      <section className="container">
        <h2>مدن أخرى</h2>
        <div className="cities">
          {cities.filter((x) => x.slug !== c.slug).map((x) => (
            <a key={x.slug} href={`/${x.slug}`}>تركيب فايبر {x.name}</a>
          ))}
        </div>
      </section>
    </main>
  );
}
