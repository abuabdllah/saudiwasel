import LeadForm from "../components/LeadForm";
import { cities } from "../lib/cities";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>تركيب الألياف البصرية (الفايبر) في جميع مدن المملكة</h1>
            <p className="hero-sub">افحص تغطية الفايبر في مبناك — كل الشبكات في طلب واحد، ونساعدك تختار الباقة الأنسب.</p>
            <ul className="hero-points">
              <li>✔ فحص تغطية مجاني</li>
              <li>✔ مقارنة بين جميع المشغلين</li>
              <li>✔ متابعة طلبك حتى التركيب</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      <section className="container">
        <h2>كيف تتم الخدمة؟</h2>
        <div className="steps">
          <div className="card"><span>1</span><h4>أرسل موقعك</h4><p>اكتب مدينتك وحيك في النموذج أو راسلنا واتساب.</p></div>
          <div className="card"><span>2</span><h4>نفحص التغطية</h4><p>نتحقق من توفر الفايبر في مبناك لدى كل الشبكات.</p></div>
          <div className="card"><span>3</span><h4>نرفع الطلب</h4><p>نختار معك الباقة الأنسب ونرفع طلب التركيب.</p></div>
          <div className="card"><span>4</span><h4>التركيب</h4><p>نتابع طلبك حتى يتم التركيب والتفعيل.</p></div>
        </div>

        <h2>نغطي مدن المملكة</h2>
        <div className="cities">
          {cities.map((c) => (
            <a key={c.slug} href={`/${c.slug}`}>تركيب فايبر {c.name}</a>
          ))}
        </div>
      </section>
    </main>
  );
}