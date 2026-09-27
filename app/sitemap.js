import { cities } from "../lib/cities";
import { operators, operatorCities, fiberUpdatedISO } from "../lib/operators";
import { fivegOperators, fivegUpdatedISO } from "../lib/fiveg";

// آخر تعديل حقيقي للصفحات العامة (الرئيسية، من نحن، تواصل، الخصوصية) — حدّثه يدوياً لما محتواها يتغير
const siteUpdatedISO = "2026-09-27";

// الصفحة اللي بتعرض أسعار الفايبر والـ5G مع بعض تاخد الأحدث فيهم
const latest = (...dates) => dates.sort().at(-1);

export default function sitemap() {
  const base = "https://saudiwasel.com";
  return [
    { url: base, lastModified: siteUpdatedISO, priority: 1 },
    ...cities.map((c) => ({ url: `${base}/${c.slug}`, lastModified: fiberUpdatedISO, priority: 0.8 })),
    ...operatorCities.flatMap((city) =>
      operators.map((o) => ({ url: `${base}/${city}/${o.slug}`, lastModified: o.updatedISO, priority: 0.9 }))
    ),
    { url: `${base}/5g`, lastModified: fivegUpdatedISO, priority: 0.9 },
    ...fivegOperators.map((o) => ({ url: `${base}/5g/${o.slug}`, lastModified: fivegUpdatedISO, priority: 0.8 })),
    { url: `${base}/fiber-vs-5g`, lastModified: latest(fiberUpdatedISO, fivegUpdatedISO), priority: 0.8 },
    { url: `${base}/about`, lastModified: siteUpdatedISO, priority: 0.4 },
    { url: `${base}/contact`, lastModified: siteUpdatedISO, priority: 0.4 },
    { url: `${base}/privacy`, lastModified: siteUpdatedISO, priority: 0.2 },
  ];
}
