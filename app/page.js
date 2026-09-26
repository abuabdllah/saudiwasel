"use client";
import { useState } from "react";

const PHONE = "966564612017";
const cities = ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "الطائف", "أبها", "تبوك", "بريدة", "حائل", "جازان"];

export default function Home() {
  const [form, setForm] = useState({ name: "", city: "", district: "", type: "منزل" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const send = (e) => {
    e.preventDefault();
    const msg = `السلام عليكم، أرغب في فحص تغطية الفايبر
الاسم: ${form.name}
المدينة: ${form.city}
الحي: ${form.district}
نوع المبنى: ${form.type}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
  };

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

          <form className="lead-form" onSubmit={send}>
            <h3>افحص التغطية الآن</h3>
            <input name="name" placeholder="الاسم" required onChange={update} />
            <select name="city" required defaultValue="" onChange={update}>
              <option value="" disabled>اختر المدينة</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input name="district" placeholder="الحي" required onChange={update} />
            <select name="type" onChange={update}>
              <option>منزل</option>
              <option>شقة</option>
              <option>مكتب / منشأة</option>
            </select>
            <button type="submit" className="btn btn-wa">أرسل الطلب عبر واتساب</button>
          </form>
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
          {cities.map((c) => <span key={c}>تركيب فايبر {c}</span>)}
        </div>
      </section>
    </main>
  );
}