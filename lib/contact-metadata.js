import { cities } from "./cities";

const cityNames = Object.fromEntries(cities.map(city => [city.slug, city.name]));
const operatorNames = { stc: "STC", salam: "سلام", mobily: "موبايلي", zain: "زين" };
const phone = "0564612017";

export function contactTitle(path) {
  if (path === "/") return `مندوب فايبر في السعودية ${phone} | سعودي واصل`;
  if (path === "/5g") return `رقم مندوب راوتر 5G في السعودية ${phone}`;
  const [, first, second, extra] = path.split("/");
  if (extra !== undefined) return null;
  if (first === "5g" && operatorNames[second]) {
    return second === "zain" ? `راوتر زين 5G المنزلي | الأسعار ورقم المندوب ${phone}` : `رقم مندوب راوتر 5G ${operatorNames[second]} ${phone}`;
  }
  if (!cityNames[first]) return null;
  if (!second) return `رقم مندوب فايبر ${cityNames[first]} ${phone} | سعودي واصل`;
  if (second === "5g") return `رقم مندوب راوتر 5G ${cityNames[first]} ${phone}`;
  if (operatorNames[second]) return `رقم مندوب فايبر ${operatorNames[second]} ${cityNames[first]} ${phone}`;
  return null;
}

// Purpose-written search copy, independent of visible page introductions.
const providerBenefits = {
  stc: "راجع باقات STC ورسوم التركيب ومدة الالتزام",
  salam: "قارن باقات سلام وراجع رسوم التأسيس وشروط العقد",
  mobily: "اكتشف خيارات موبايلي وراجع تكلفة الباقة والجهاز",
  zain: "تحقق من نوع خدمة زين المتاحة وراجع الباقة وشروطها",
};

export function contactDescription(path, description = "") {
  const [, citySlug, service, extra] = path.split("/");
  const city = cities.find((item) => item.slug === citySlug);
  if (city && extra === undefined && (!service || service === "5g" || operatorNames[service])) {
    const district = city.districts[0];
    if (service === "5g") {
      return `راوتر 5G في ${city.name}؟ افحص عنوانك في ${district} أو حيك، وقارن باقات المشغلين وشروط الجهاز. أرسل موقعك عبر واتساب قبل الاشتراك.`;
    }
    if (service) {
      return `فايبر ${operatorNames[service]} في ${city.name}؟ ${providerBenefits[service]}. أرسل عنوانك في ${district} أو حيك عبر واتساب لفحص توفر الخدمة قبل الطلب.`;
    }
    return `تبحث عن فايبر في ${city.name}؟ افحص عنوانك في ${district} أو حيك، وقارن المشغلين المتاحين. تواصل عبر واتساب لمراجعة الباقات وخطوات التركيب.`;
  }
  if (path === "/") return "ابحث عن فايبر يناسب منزلك في السعودية. أرسل عنوان المبنى عبر واتساب لفحص التغطية ومقارنة المشغلين والباقات المتاحة قبل طلب التركيب.";
  if (path === "/5g") return "تبحث عن راوتر 5G منزلي؟ قارن المشغلين والباقات وشروط الجهاز، واطلب فحص عنوانك عبر واتساب لاختيار الخدمة المناسبة قبل الاشتراك.";
  if (citySlug === "5g" && operatorNames[service] && extra === undefined) {
    return `راوتر ${operatorNames[service]} 5G لمنزلك؟ ${providerBenefits[service]}. أرسل موقعك عبر واتساب للتحقق من خيارات الإنترنت المنزلي قبل الاشتراك.`;
  }
  return description;
}
