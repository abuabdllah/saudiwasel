import { notFound } from "next/navigation";
import { cities } from "../../lib/cities";
import { operators, operatorCities } from "../../lib/operators";
import LeadForm from "../../components/LeadForm";
import InfoSections from "../../components/InfoSections";

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

  return {
    title: `مندوب فايبر ${c.name} | تركيب ألياف بصرية وفحص التغطية - سعودي واصل`,
    description: `مندوب فايبر في ${c.name}. افحص تغطية الألياف البصرية لمبناك، تعرف على خيارات الفايبر والباقات المتاحة، واطلب الخدمة بسهولة.`,
    alternates: {
      canonical: `/${c.slug}`,
    },
  };
}
export default async function CityPage({ params }) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) notFound();
  const hasOperators = operatorCities.includes(c.slug);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>تركيب الألياف البصرية (الفايبر) في {c.name}</h1>
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
        <h2>الألياف البصرية في {c.name}</h2>
        <p>{c.intro}</p>

        <h2>مندوب فايبر {c.name}</h2>
        <div className="contact-box">
          <p>للاستفسار عن تغطية وباقات الفايبر في {c.name} لدى جميع المشغلين، تواصل مع المندوب مباشرة:</p>
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
            </div>
          </>
        )}

        <h2>أحياء نغطيها في {c.name}</h2>
        <div className="cities">
          {c.districts.map((d) => <span key={d}>فايبر حي {d}</span>)}
        </div>
        <p style={{ marginTop: 12 }}>وغيرها من أحياء {c.name} و{c.region}. أرسل اسم حيك ونفحص لك التغطية فوراً.</p>

        <h2>مبناك في {c.name} مش مغطى بالفايبر؟</h2>
        <p>راوتر 5G هو البديل الأسرع: من غير تمديدات ولا موعد فني، والراوتر مجاني مع الاشتراك. <a href="/5g">شوف باقات راوتر 5G</a> أو <a href="/fiber-vs-5g">قارن بين الفايبر و5G</a>.</p>
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
