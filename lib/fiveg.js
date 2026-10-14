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
  facts: ["راجع إشارة 5G داخل المنزل قبل اختيار الخدمة، ولا تعتبر التغطية الخارجية ضمانًا للأداء.", "تأكد من تكلفة الراوتر وسياسة البيانات وشروط نقل الخدمة من عرض المشغل الحالي.", "قارن الأداء وقت استخدامك الفعلي وتحقق من شروط تجربة الخدمة أو إلغائها إن وجدت."],
}));
