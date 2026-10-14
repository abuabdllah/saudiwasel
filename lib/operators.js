import { prices, latestPriceUpdate } from "../data/prices";
const operatorsReferences = [
  {
    slug: "stc", name: "STC", updated: "سبتمبر 2026", updatedISO: "2026-09-30",
    about: "تُراجع الخيارات المتاحة على العنوان من المشغل.",
    facts: [],
  },
  {
    slug: "salam", name: "سلام", updated: "سبتمبر 2026", updatedISO: "2026-09-30",
    about: "تُراجع الخيارات المتاحة على العنوان من المشغل.",
    facts: [],
  },
  {
    slug: "mobily", name: "موبايلي", updated: "سبتمبر 2026", updatedISO: "2026-09-30",
    about: "تُراجع الخيارات المتاحة على العنوان من المشغل.",
    facts: [],
  },
];

export const fiberUpdatedISO = latestPriceUpdate("fiber");
export const operatorCities = ["jeddah", "riyadh", "makkah", "madinah", "taif", "dammam", "khobar", "abha", "tabuk", "buraidah", "hail", "jazan"];

export const operators = operatorsReferences.map((operator) => ({
  ...operator,
  about: `تُراجع خيارات ${operator.name} للإنترنت المنزلي حسب العنوان، ثم تؤكد تفاصيل الباقة الحالية من المصدر الرسمي قبل الطلب.`,
  updatedISO: prices[operator.slug].updatedISO,
  updated: prices[operator.slug].updatedISO,
  packages: prices[operator.slug].fiber,
  facts: ["تأكد من توفر الخدمة على عنوان المبنى، وليس اسم الحي وحده.", "راجع سعر الباقة والضريبة وتكلفة الجهاز والتركيب ومدة الالتزام في عرض المشغل.", "مدة التركيب ونقل الخدمة تخضع لجاهزية العنوان وشروط المشغل؛ لا نعطي موعدًا مضمونًا."],
}));
