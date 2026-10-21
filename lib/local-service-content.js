import { cities } from "./cities";

// Editorial overrides: neighborhoods are examples for address checks, not coverage claims.
// Blocks accept {city}, {provider}, and {neighborhoods}; providerBlocks can override
// a city's default blocks for a specific operator slug.
export const localServiceContent = {
  riyadh: {
    neighborhoods: ["الياسمين", "الملقا"],
    blocks: ["لطلب فايبر {provider} في {city}، حدّد عنوان الوحدة في أحياء مثل {neighborhoods}. في الفيلا أو الدوبلكس، جهّز عدد الأدوار ومواقع العمل والألعاب لمراجعة مسار الألياف وتوزيع الشبكة داخل المنزل."],
  },
  buraidah: {
    neighborhoods: ["الأفق", "الريان"],
    blocks: ["عند مراجعة فايبر {provider} في {city} لأحياء مثل {neighborhoods}، اذكر إن كان الاستخدام في دور واحد أو عدة أدوار. حدّد موقع المكتب وغرف الأسرة قبل اختيار الباقة، وافصل بين جاهزية توصيل المبنى وتغطية الواي فاي داخل الغرف."],
  },
  madinah: {
    neighborhoods: ["قباء", "شوران", "العزيزية"],
    blocks: ["لفحص فايبر {provider} في {city}، أرسل موقع المبنى في أحياء مثل {neighborhoods} مع المدخل والدور ورقم الشقة. وضّح مدة إقامتك وإمكانية دخول المرافق المشتركة قبل مراجعة الالتزام وتنسيق التركيب."],
  },
};

export function localServiceContext(city, provider, providerSlug) {
  const entry = cities.find((item) => item.slug === city);
  if (!entry) throw new Error(`Unknown service city: ${city}`);
  const config = localServiceContent[city] || {};
  const neighborhoods = config.neighborhoods || entry.districts.slice(0, 3);
  const values = { city: entry.name, provider, neighborhoods: neighborhoods.join("، ") };
  const templates = config.providerBlocks?.[providerSlug] || config.blocks || [
    "لفحص فايبر {provider} في {city} ضمن أحياء مثل {neighborhoods}، شارك موقع المبنى ورقم الوحدة ونوع السكن. تُراجع جاهزية عنوانك بشكل مستقل قبل اختيار الباقة؛ اسم الحي أو اشتراك الجار لا يثبت توفر الخدمة في منزلك.",
  ];
  return {
    ...values,
    blocks: templates.map((template) => template.replace(/\{(city|provider|neighborhoods)\}/g, (_, key) => values[key])),
    pricingHeading: `أسعار فايبر ${provider} في ${entry.name}`,
  };
}
