"use client";
import { useState } from "react";
import { cities } from "../lib/cities";

const PHONE = "966564612017";

export default function LeadForm({ defaultCity = "", operator = "" }) {
  const [form, setForm] = useState({ name: "", city: defaultCity, district: "", type: "منزل" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const send = (e) => {
    e.preventDefault();
    const msg = `السلام عليكم، أرغب في فحص تغطية الفايبر${operator ? ` (${operator})` : ""}
الاسم: ${form.name}
المدينة: ${form.city}
الحي: ${form.district}
نوع المبنى: ${form.type}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <form className="lead-form" onSubmit={send}>
      <h3>{operator ? `افحص تغطية ${operator} الآن` : "افحص التغطية الآن"}</h3>
      <input name="name" placeholder="الاسم" required onChange={update} />
      <select name="city" required value={form.city} onChange={update}>
        <option value="" disabled>اختر المدينة</option>
        {cities.map((c) => <option key={c.slug}>{c.name}</option>)}
      </select>
      <input name="district" placeholder="الحي" required onChange={update} />
      <select name="type" onChange={update}>
        <option>منزل</option>
        <option>شقة</option>
        <option>مكتب / منشأة</option>
      </select>
      <button type="submit" className="btn btn-wa">أرسل الطلب عبر واتساب</button>
    </form>
  );
}