"use client";

import { useId, useRef, useState } from "react";
import { cities } from "../lib/cities";
import { trackEvent } from "../lib/tracking";
import { normalizeSaudiPhone } from "../lib/phone";
import { COVERAGE_FORM_NAME, COVERAGE_FORM_PATH, createReference, coverageWhatsAppUrl, saveCoverageRequest } from "../lib/coverage-request";

const operatorOptions = [["stc", "STC"], ["salam", "سلام"], ["mobily", "موبايلي"], ["zain", "زين"]];

export default function LeadForm({ defaultCity = "", defaultDistrict = "", operator = "", intent = "coverage" }) {
  const identifier = useId();
  const initialCity = cities.find((city) => city.name === defaultCity || city.slug === defaultCity)?.slug || "";
  const initialOperator = operatorOptions.find(([slug, name]) => operator === slug || operator.includes(name))?.[0] || "any";
  const [form, setForm] = useState({ city: initialCity, otherCity: "", district: defaultDistrict, operator: initialOperator, buildingType: "home", service: operator.includes("5G") ? "5g" : "fiber", name: "", phone: "", notes: "", buildingLocation: "", consent: false, website: "" });
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const started = useRef(false);
  const submissionId = useRef("");
  const pendingReference = useRef("");
  const sending = useRef(false);
  const selectedCity = cities.find((city) => city.slug === form.city);
  const cityName = form.city === "other" ? form.otherCity.trim() : selectedCity?.name || "";
  const context = () => ({ page_path: window.location.pathname, city: form.city, operator: form.operator, service: form.service });

  function start() {
    if (started.current) return;
    started.current = true;
    trackEvent("coverage_check_start", context());
  }

  function update(event) {
    start();
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value, ...(name === "city" && { district: "", otherCity: "" }) }));
    setError("");
    if (name !== "website") {
      submissionId.current = "";
      pendingReference.current = "";
    }
  }

  const whatsappUrl = reference ? coverageWhatsAppUrl(form, reference, cityName) : "";

  async function send(event) {
    event.preventDefault();
    start();
    if (!cityName || (form.city === "other" && (cityName.length < 2 || cityName.length > 100))) {
      setError("اكتب اسم المدينة أو المحافظة (من حرفين إلى ١٠٠ حرف).");
      return;
    }
    if (step === 1) {
      if (form.district.trim().length < 2) { setError("اكتب اسم الحي للتحقق من عنوانك."); return; }
      setStep(2);
      return;
    }
    if (sending.current || status === "success") return;
    if (!/^(?:05\d{8}|\+?9665\d{8})$/.test(normalizeSaudiPhone(form.phone))) {
      setError("أدخل رقم جوال سعودي صحيحًا، مثل 05xxxxxxxx.");
      return;
    }
    setStatus("sending");
    sending.current = true;
    setError("");
    trackEvent("coverage_check_submit", context());
    try {
      if (form.website || !form.consent) throw new Error("Invalid request");
      submissionId.current ||= crypto.randomUUID();
      pendingReference.current ||= createReference();
      await saveCoverageRequest(form, {
        sourcePath: window.location.pathname,
        cityName,
        submissionId: submissionId.current,
        reference: pendingReference.current,
      });
    } catch {
      setStatus("error");
      setError("تعذر تسجيل الطلب حاليًا. يرجى المحاولة مرة أخرى.");
      sending.current = false;
      return;
    }
    setReference(pendingReference.current);
    setStatus("success");
    trackEvent("lead_submit", context());
    trackEvent("lead_success", context());
    sending.current = false;
    try {
      window.open(coverageWhatsAppUrl(form, pendingReference.current, cityName), "_blank", "noopener,noreferrer");
    } catch {
      return;
    }
  }

  return <form name={COVERAGE_FORM_NAME} method="POST" action={COVERAGE_FORM_PATH} data-netlify="true" netlify-honeypot="website" className="lead-form" onSubmit={send} onFocus={start} aria-busy={status === "sending"}>
    <input type="hidden" name="form-name" value={COVERAGE_FORM_NAME} />
    <h3>{intent === "order" ? "اطلب فايبر بعد فحص عنوانك" : operator ? `افحص تغطية ${operator}` : "افحص تغطية الفايبر"}</h3>
    <p className="coverage-note">التغطية قد تختلف حسب المبنى والعنوان، لذلك يلزم التحقق قبل تأكيد توفر الخدمة. هذا طلب تحقق، وليس نتيجة تغطية آلية.</p>
    {status === "success" ? <div role="status" className="lead-success">
      <h4>تم تسجيل طلب التحقق بنجاح ✅</h4>
      <p>طلبك الآن بانتظار مراجعة توفر الخدمة.</p>
      <p className="lead-reference">مرجع الطلب: <bdi>{reference}</bdi></p>
      <p>هذا المرجع خاص بمتابعة طلبك لدى SaudiWasel، وليس رقم اشتراك أو موافقة من مشغل الاتصالات.</p>
      <p>سيتم فتح WhatsApp لإرسال تفاصيل الطلب والمتابعة.</p>
      <a className="btn btn-wa" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("coverage_check_whatsapp", context())}>إرسال الطلب عبر WhatsApp</a>
    </div> : <>
      <p className="form-step" aria-live="polite">{step === 1 ? "١ · موقعك واحتياجك" : "٢ · بيانات التواصل"}</p>
      {step === 1 ? <>
        <label htmlFor={`${identifier}-city`}>المدينة</label>
        <select id={`${identifier}-city`} name="city" required value={form.city} onChange={update}>
          <option value="" disabled>اختر المدينة</option>
          {cities.map((city) => <option key={city.slug} value={city.slug}>{city.name}</option>)}
          <option value="other">مدينة أو محافظة أخرى</option>
        </select>
        {form.city === "other" && <>
          <label htmlFor={`${identifier}-other-city`}>اسم المدينة أو المحافظة</label>
          <input id={`${identifier}-other-city`} name="otherCity" value={form.otherCity} onChange={update} autoComplete="address-level2" required minLength={2} maxLength={100} />
        </>}
        <label htmlFor={`${identifier}-district`}>الحي</label>
        <input id={`${identifier}-district`} name="district" value={form.district} placeholder="اختر من الاقتراحات أو اكتب اسم الحي" list={`${identifier}-districts`} required minLength={2} maxLength={150} onChange={update} autoComplete="address-level3" />
        <datalist id={`${identifier}-districts`}>{selectedCity?.districts.map((district) => <option key={district} value={district} />)}</datalist>
        <label htmlFor={`${identifier}-operator`}>المشغل المفضل (اختياري)</label>
        <select id={`${identifier}-operator`} name="operator" value={form.operator} onChange={update}>
          <option value="any">قارن المشغلين المتاحين على عنواني</option>
          {operatorOptions.map(([slug, name]) => <option value={slug} key={slug}>{name}</option>)}
        </select>
        <label htmlFor={`${identifier}-service`}>نوع الخدمة</label>
        <select id={`${identifier}-service`} name="service" value={form.service} onChange={update}>
          <option value="fiber">الألياف البصرية Fiber</option><option value="5g">إنترنت منزلي 5G</option><option value="compare">قارن Fiber و5G</option>
        </select>
        <label htmlFor={`${identifier}-building`}>نوع المبنى</label>
        <select id={`${identifier}-building`} name="buildingType" value={form.buildingType} onChange={update}>
          <option value="home">منزل / فيلا</option><option value="apartment">شقة</option><option value="office">مكتب / منشأة</option>
        </select>
        <button type="submit" className="btn btn-coverage">متابعة فحص التغطية</button>
      </> : <>
        <p>طلب تحقق في {cityName}، حي {form.district}. نحتاج رقمك للتواصل بشأن نتيجة التحقق، دون رفع هوية أو دفع في الموقع.</p>
        <label htmlFor={`${identifier}-name`}>الاسم</label>
        <input id={`${identifier}-name`} name="name" value={form.name} autoComplete="name" minLength={2} maxLength={100} required onChange={update} disabled={status === "sending"} />
        <label htmlFor={`${identifier}-phone`}>رقم الجوال</label>
        <input id={`${identifier}-phone`} name="phone" type="tel" inputMode="tel" dir="ltr" value={form.phone} autoComplete="tel" maxLength={20} placeholder="05xxxxxxxx" required onChange={update} disabled={status === "sending"} />
        <label htmlFor={`${identifier}-notes`}>الملاحظات (اختياري)</label>
        <textarea id={`${identifier}-notes`} name="notes" value={form.notes} maxLength={2000} onChange={update} disabled={status === "sending"} />
        <label htmlFor={`${identifier}-location`}>موقع المبنى أو العنوان الوطني (اختياري)</label>
        <input id={`${identifier}-location`} name="buildingLocation" value={form.buildingLocation} maxLength={500} placeholder="رابط موقع المبنى أو وصف العنوان" onChange={update} disabled={status === "sending"} />
        <label className="consent-label"><input name="consent" type="checkbox" checked={form.consent} required onChange={update} disabled={status === "sending"} /><span>أوافق على حفظ بيانات الطلب والتواصل معي بخصوص التغطية وفق <a href="/privacy">سياسة الخصوصية</a>.</span></label>
        <div className="form-honeypot" aria-hidden="true"><label htmlFor={`${identifier}-website`}>Website</label><input id={`${identifier}-website`} name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} /></div>
        <button type="submit" className="btn btn-coverage" disabled={status === "sending"}>{status === "sending" ? "جاري تسجيل طلبك…" : "أرسل طلب التحقق"}</button>
        <button className="form-back" type="button" onClick={() => setStep(1)} disabled={status === "sending"}>تعديل الموقع</button>
      </>}
      {error && <p role="alert" className="form-error">{error}</p>}
      <p className="coverage-note">طلب التحقق بانتظار مراجعة توفر الخدمة. يُتاح إرسال تفاصيل الطلب عبر WhatsApp بعد نجاح تسجيله.</p>
      <a href="tel:0564612017" className="form-phone">أو اتصل على <bdi>0564612017</bdi></a>
    </>}
  </form>;
}
