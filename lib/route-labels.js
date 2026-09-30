import { cities } from "./cities";

export const routeLabels = {
  about: "من نحن", contact: "تواصل معنا", privacy: "سياسة الخصوصية",
  coverage: "فحص التغطية", articles: "المقالات", "5g": "إنترنت 5G",
  "fiber-vs-5g": "فايبر أم 5G؟", stc: "STC", salam: "سلام", mobily: "موبايلي", zain: "زين",
  "check-fiber-coverage": "كيف تفحص تغطية الفايبر؟",
  "stc-fiber-request": "طريقة طلب فايبر STC",
  "mandoob-vs-technician": "المندوب أم فني التركيب؟",
  ...Object.fromEntries(cities.map((city) => [city.slug, city.name])),
};
