"use client";

import { usePathname } from "next/navigation";
export default function IntentCtas({ city = "", operator = "" }) {
  const isFiveg = /^(?:\/5g(?:\/|$)|\/(?:jeddah|taif|abha|tabuk|madinah)\/5g$)/.test(usePathname() || "");
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (operator) params.set("operator", operator);
  const coverage = `/coverage${params.size ? `?${params}` : ""}`;
  return <div className="intent-ctas" aria-label="ابدأ حسب احتياجك">
    <a href={coverage} className="btn btn-coverage">{isFiveg ? "افحص تغطية 5G" : "افحص تغطية الفايبر"}</a>
    <a href="https://wa.me/966564612017" className="btn btn-wa">{isFiveg ? "تواصل مع مندوب راوتر 5G" : "تواصل مع مندوب فايبر"}</a>
    <a href="tel:0564612017" className="btn btn-call">اتصل الآن</a>
  </div>;
}
