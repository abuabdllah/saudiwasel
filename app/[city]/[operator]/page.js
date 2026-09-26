import { notFound } from "next/navigation";
import { cities } from "../../../lib/cities";
import { operators, operatorCities } from "../../../lib/operators";
import LeadForm from "../../../components/LeadForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return operatorCities.flatMap((city) => operators.map((o) => ({ city, operator: o.slug })));
}

function getData(city, operator) {
  return {
    c: cities.find((x) => x.slug === city),
    o: operators.find((x) => x.slug === operator),
  };
}

export async function generateMetadata({ params }) {
  const { city, operator } = await params;
  const { c, o } = getData(city, operator);
  if (!c || !o) return {};
  return {
    title: `تركيب فايبر ${o.name} ${c.name} | فحص التغطية وطلب الاشتراك - سعودي واصل`,
    description: `تبغى فايبر ${o.name} في ${c.name}؟ نفحص لك تغطية ${o.name} في مبناك مجاناً، نوضح لك الباقات المتاحة، ونرفع طلبك ونتابعه حتى التركيب. أحياء ${c.districts.slice(0, 3).join("، ")} وغيرها.`,
  };
}

export default async function OperatorPage({ params }) {
  const { city, operator } = await params;
  const { c, o } = getData(city, operator);
  if (!c || !o) notFound();
  const others = operators.filter((x) => x.slug !== o.slug);

  const faqs = [
    { q: `هل فايبر ${o.name} متوفر في حيي في ${c.name}؟`, a: `التغطية تختلف من حي لحي ومن مبنى لمبنى. أرسل حيك عبر النموذج أو واتساب ونفحص لك توفر فايبر ${o.name} في مبناك تحديداً.` },
    { q: `كم أسعار باقات فايبر ${o.name}؟`, a: `الأسعار والعروض تتغير باستمرار، راسلنا ونرسل لك باقات ${o.name} والعروض الحالية المتاحة لمبناك.` },
    { q: "هل يوجد رسوم تركيب؟", a: "تختلف حسب العرض ونوع المبنى، ونوضح لك كل التفاصيل قبل رفع الطلب." },
    { q: `هل أقدر أنتقل من مشغل آخر إلى ${o.name}؟`, a: `نعم إذا كان مبناك مغطى من ${o.name}. ننصحك تتأكد من أي التزام أو مدة عقد على اشتراكك الحالي قبل الانتقال.` },
    { q: "كم يستغرق التركيب؟", a: "يختلف حسب جاهزية المبنى ومواعيد الفنيين، ونتابع معك الطلب خطوة بخطوة حتى التفعيل." },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>تركيب فايبر {o.name} في {c.name}</h1>
            <p className="hero-sub">افحص تغطية ألياف {o.name} البصرية في مبناك بـ{c.name}، واعرف الباقات المتاحة، ونرفع طلبك ونتابعه حتى التركيب.</p>
            <ul className="hero-points">
              <li>✔ فحص تغطية {o.name} مجاناً</li>
              <li>✔ توضيح الباقات والعروض الحالية</li>
              <li>✔ متابعة الطلب حتى التفعيل</li>
            </ul>
          </div>
          <LeadForm defaultCity={c.name} operator={o.name} />
        </div>
      </section>

      <section className="container">
        <p className="notice">سعودي واصل جهة مستقلة وليست الموقع الرسمي لـ{o.name}. نساعدك في فحص التغطية ورفع طلب الاشتراك ومتابعته.</p>

        <h2>عن فايبر {o.name}</h2>
        <p>{o.about}</p>

        <h2>فايبر {o.name} في {c.name}</h2>
        <p>{c.intro}</p>
        <p>تغطية {o.name} بالألياف البصرية في {c.name} ممتدة في أحياء كثيرة لكنها تختلف من مبنى لآخر، لذلك أول خطوة دائماً هي فحص عنوانك. أرسل اسم حيك وموقع مبناك ونرد عليك بالنتيجة والخيارات المتاحة.</p>

        <h2>أحياء {c.name}</h2>
        <div className="cities">
          {c.districts.map((d) => <span key={d}>فايبر {o.name} حي {d}</span>)}
        </div>

        <h2>خطوات طلب فايبر {o.name} عن طريقنا</h2>
        <div className="steps">
          <div className="card"><span>1</span><h4>أرسل عنوانك</h4><p>المدينة والحي وموقع المبنى عبر النموذج أو واتساب.</p></div>
          <div className="card"><span>2</span><h4>فحص التغطية</h4><p>نتحقق من توفر فايبر {o.name} في مبناك.</p></div>
          <div className="card"><span>3</span><h4>اختيار الباقة</h4><p>نرسل لك الباقات والعروض المتاحة وتختار الأنسب.</p></div>
          <div className="card"><span>4</span><h4>التركيب</h4><p>نرفع الطلب ونتابعه معك حتى التركيب والتفعيل.</p></div>
        </div>

        <h2>ماذا تحتاج للطلب؟</h2>
        <ul className="req-list">
          <li>الهوية الوطنية أو الإقامة سارية المفعول</li>
          <li>العنوان الوطني أو موقع المبنى على الخريطة</li>
          <li>رقم جوال للتواصل وتنسيق موعد التركيب</li>
        </ul>

        <h2>{o.name} أو {others.map((x) => x.name).join(" أو ")}؟</h2>
        <p>لو مبناك مغطى من أكثر من مشغل، نقارن لك بين الباقات المتاحة من حيث السرعة والسعر ومدة الالتزام، وتختار الأنسب لاستخدامك.</p>
        <div className="cities">
          {others.map((x) => (
            <a key={x.slug} href={`/${c.slug}/${x.slug}`}>تركيب فايبر {x.name} {c.name}</a>
          ))}
          <a href={`/${c.slug}`}>كل خيارات الفايبر في {c.name}</a>
        </div>

        <h2>أسئلة شائعة عن فايبر {o.name} في {c.name}</h2>
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