import { prices, latestPriceUpdate } from "../data/prices";
export const fivegUpdatedISO = latestPriceUpdate("fiveg");
export const fivegUpdated = fivegUpdatedISO;

const fivegOperatorsReferences = [
  {
    slug: "stc", name: "STC", brand: "بيتي 5G",
    about: "تُراجع الخيارات المتاحة على العنوان من المشغل.",
    facts: [],
  },
  {
    slug: "salam", name: "سلام", brand: "سلام 5G HomeFi Max",
    about: "تُراجع الخيارات المتاحة على العنوان من المشغل.",
    facts: [],
  },
  {
    slug: "zain", name: "زين", brand: "زين 5G+ المنزلية",
    about: "تُراجع الخيارات المتاحة على العنوان من المشغل.",
    facts: [],
  },
  {
    slug: "mobily", name: "موبايلي", brand: "موبايلي هوم 5G",
    about: "تُراجع الخيارات المتاحة على العنوان من المشغل.",
    facts: [],
  },
];

export const fivegOperators = fivegOperatorsReferences.map((operator) => ({
  ...operator,
  about: `تُراجع خيارات ${operator.name} للإنترنت المنزلي حسب العنوان، ثم تؤكد تفاصيل الباقة الحالية من المصدر الرسمي قبل الطلب.`,
  updatedISO: prices[operator.slug].updatedISO,
  updated: prices[operator.slug].updatedISO,
  packages: prices[operator.slug].fiveg,
  facts: [`لاختيار ${operator.name} 5G، تحقق من الاستقبال في الغرفة المقصودة؛ الخريطة الخارجية لا تضمن جودة الاتصال داخل البيت.`, `قبل اعتماد راوتر ${operator.name}، اقرأ سياسة البيانات وتكلفة الجهاز ومدة العقد وإجراء تغيير الموقع في العرض الحالي.`, `راجع أداء ${operator.name} وقت استخدامك المعتاد إن أمكن الاختبار، واستفسر عن شروط التجربة أو الإلغاء بدلاً من افتراض توفرها.`],
}));
