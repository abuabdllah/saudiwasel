import { cities } from "./cities";

export const routeLabels = {
  about: "من نحن", contact: "تواصل معنا", privacy: "سياسة الخصوصية",
  coverage: "فحص التغطية", articles: "المقالات", "5g": "إنترنت 5G",
  "fiber-installation": "تركيب ألياف بصرية",
  "fiber-vs-5g": "فايبر أم 5G؟", stc: "إس تي سي", salam: "سلام", mobily: "موبايلي", zain: "زين",
  "check-fiber-coverage": "كيف تفحص تغطية الفايبر؟",
  "stc-fiber-request": "طريقة طلب فايبر STC",
  "salam-fiber-coverage": "كيف تعرف تغطية فايبر سلام في حيك",
  "stc-fiber-coverage": "كيف تعرف تغطية فايبر STC وخريطة الألياف",
  "mobily-fiber-coverage": "كيف تعرف تغطية فايبر موبايلي",
  "mandoob-vs-technician": "المندوب أم فني التركيب؟",
  "fiber-in-apartments": "فايبر الشقق",
  "building-not-covered": "بدائل الفايبر",
  ...Object.fromEntries(cities.map((city) => [city.slug, city.name])),
};
