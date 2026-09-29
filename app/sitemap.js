import { cities } from "../lib/cities";
import { operators, operatorCities, fiberUpdatedISO } from "../lib/operators";
import { fivegOperators, fivegUpdatedISO } from "../lib/fiveg";

// آخر تعديل حقيقي للصفحات العامة
const siteUpdatedISO = "2026-09-29";
const articlesUpdatedISO = "2026-09-27";
const riyadhUpdatedISO = "2026-09-29";

// اختيار أحدث تاريخ
const latest = (...dates) => dates.sort().at(-1);

export default function sitemap() {
  const base = "https://saudiwasel.com";

  // صفحات المدن
  const cityUrls = cities.map((city) => ({
    url: `${base}/${city.slug}`,
    lastModified: city.slug === "riyadh" ? riyadhUpdatedISO : fiberUpdatedISO,
    priority: 0.8,
  }));

  // صفحات الفايبر حسب المشغل والمدينة
  const fiberOperatorUrls = operatorCities.flatMap((city) =>
    operators.map((operator) => ({
      url: `${base}/${city}/${operator.slug}`,
      lastModified: city === "riyadh" ? riyadhUpdatedISO : operator.updatedISO,
      priority: 0.9,
    }))
  );

  // صفحات 5G
  const fivegUrls = fivegOperators.map((operator) => ({
    url: `${base}/5g/${operator.slug}`,
    lastModified: fivegUpdatedISO,
    priority: 0.8,
  }));

  return [
    // الرئيسية
    {
      url: base,
      lastModified: siteUpdatedISO,
      priority: 1,
    },

    // المدن
    ...cityUrls,

    // فايبر حسب المشغل
    ...fiberOperatorUrls,

    {
      url: `${base}/jeddah/5g`,
      lastModified: siteUpdatedISO,
      priority: 0.9,
    },
    {
      url: `${base}/jeddah/zain`,
      lastModified: siteUpdatedISO,
      priority: 0.9,
    },

    // صفحة 5G الرئيسية
    {
      url: `${base}/5g`,
      lastModified: fivegUpdatedISO,
      priority: 0.9,
    },

    // 5G حسب المشغل
    ...fivegUrls,

    // مقارنة الفايبر و5G
    {
      url: `${base}/fiber-vs-5g`,
      lastModified: latest(fiberUpdatedISO, fivegUpdatedISO),
      priority: 0.8,
    },

    // المقالات
    {
      url: `${base}/articles`,
      lastModified: articlesUpdatedISO,
      priority: 0.7,
    },
    ...["stc-fiber-request", "check-fiber-coverage", "mandoob-vs-technician"].map((slug) => ({
      url: `${base}/articles/${slug}`,
      lastModified: articlesUpdatedISO,
      priority: 0.7,
    })),

    // صفحات الموقع
    {
      url: `${base}/about`,
      lastModified: siteUpdatedISO,
      priority: 0.4,
    },
    {
      url: `${base}/contact`,
      lastModified: siteUpdatedISO,
      priority: 0.4,
    },
    {
      url: `${base}/privacy`,
      lastModified: siteUpdatedISO,
      priority: 0.2,
    },
  ];
}
