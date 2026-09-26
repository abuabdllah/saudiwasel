import { notFound } from "next/navigation";
import { cities } from "../../lib/cities";
import LeadForm from "../../components/LeadForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) return {};
  return {
    title: `تركيب فايبر ${c.name} | فحص تغطية الألياف البصرية - سعودي واصل`,
    description: `تركيب الألياف البصرية (الفايبر) في ${c.name}: فحص تغطية مجاني لمبناك، مقارنة بين جميع المشغلين، ومتابعة الطلب حتى التركيب. أحياء ${c.districts.slice(0, 3).join("، ")} وغيرها.`,
  };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const c = cities.find((x) => x.slug === city);
  if (!c) notFound();

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>تركيب الألياف البصرية (الفايبر) في {c.name}</h1>
            <p className="hero-sub">افحص تغطية الفايبر في مبناك بـ{c.name} — كل الشبكات في طلب واحد، ونساعدك تختار الباقة الأنسب.</p>
            <ul className="hero-points">
              <li>✔ فحص تغطية مجاني في جميع أحياء {c.name}</li>
              <li>✔ مقارنة بين جميع المشغلين</li>
              <li>✔ متابعة طلبك حتى التركيب والتفعيل</li>
            </ul>
          </div>
          <LeadForm defaultCity={c.name} />
        </div>
      </section>

      <section className="container">
        <h2>أحياء نغطيها في {c.name}</h2>
        <div className="cities">
          {c.districts.map((d) => <span key={d}>فايبر حي {d}</span>)}
        </div>
        <p style={{ marginTop: 12 }}>وغيرها من أحياء {c.name}. أرسل اسم حيك ونفحص لك التغطية فوراً.</p>

        <h2>أسئلة شائعة عن الفايبر في {c.name}</h2>
        <div className="card faq">
          <h4>كيف أعرف إن الفايبر متوفر في مبناي؟</h4>
          <p>أرسل مدينتك وحيك عبر النموذج أو واتساب، ونفحص التغطية لدى جميع المشغلين في {c.name}.</p>
          <h4>هل الفحص برسوم؟</h4>
          <p>لا، فحص التغطية مجاني بالكامل.</p>
          <h4>كم يستغرق التركيب؟</h4>
          <p>يختلف حسب المشغل والحي، ونتابع معك الطلب خطوة بخطوة حتى التفعيل.</p>
        </div>

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