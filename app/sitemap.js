import { cities } from "../lib/cities";
import { operators, operatorCities, fiberUpdatedISO } from "../lib/operators";
import { fivegOperators, fivegUpdatedISO } from "../lib/fiveg";
import { languagePairs } from "../lib/languages";
import { publishedNeighborhoods } from "../lib/neighborhoods";

// آخر تعديل حقيقي للصفحات العامة
const siteUpdatedISO = "2026-09-30";
const articlesUpdatedISO = "2026-09-30";
const riyadhUpdatedISO = "2026-09-30";
const makkahUpdatedISO = "2026-09-30";
const easternUpdatedISO = "2026-09-30";
const hijazUpdatedISO = "2026-09-30";
const regionalUpdatedISO = "2026-09-30";

// اختيار أحدث تاريخ
const latest = (...dates) => dates.sort().at(-1);

export default function sitemap() {
  const base = "https://saudiwasel.com";

  // صفحات المدن
  const cityUrls = cities.map((city) => ({
    url: `${base}/${city.slug}`,
    lastModified: ["abha", "tabuk", "buraidah", "hail", "jazan"].includes(city.slug) ? regionalUpdatedISO : city.slug === "riyadh" ? riyadhUpdatedISO : city.slug === "makkah" ? makkahUpdatedISO : ["madinah", "taif"].includes(city.slug) ? hijazUpdatedISO : ["dammam", "khobar"].includes(city.slug) ? easternUpdatedISO : fiberUpdatedISO,
    priority: 0.8,
  }));

  // صفحات الفايبر حسب المشغل والمدينة
  const fiberOperatorUrls = operatorCities.flatMap((city) =>
    operators.map((operator) => ({
      url: `${base}/${city}/${operator.slug}`,
      lastModified: ["abha", "tabuk", "buraidah", "hail", "jazan"].includes(city) ? regionalUpdatedISO : city === "riyadh" ? riyadhUpdatedISO : city === "makkah" ? makkahUpdatedISO : ["madinah", "taif"].includes(city) ? hijazUpdatedISO : ["dammam", "khobar"].includes(city) ? easternUpdatedISO : operator.updatedISO,
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
    ...languagePairs.map((pair) => ({
      url: `${base}${pair.en}`,
      lastModified: "2026-09-30",
      priority: pair.en === "/en" ? 0.9 : 0.8,
      ...(!pair.switchOnly && { alternates: { languages: { "ar-SA": `${base}${pair.ar}`, "en-SA": `${base}${pair.en}`, "x-default": `${base}${pair.ar}` } } }),
    })),
    // الرئيسية
    {
      url: base,
      lastModified: siteUpdatedISO,
      priority: 1,
      alternates: { languages: { "ar-SA": `${base}/`, "en-SA": `${base}/en`, "x-default": `${base}/` } },
    },

    // المدن
    ...cityUrls,
    ...publishedNeighborhoods().map((page) => ({ url: `${base}/${page.city}/${page.slug}`, lastModified: page.editorialReviewDate, priority: 0.7 })),

    // فايبر حسب المشغل
    ...fiberOperatorUrls,

    {
      url: `${base}/jeddah/5g`,
      lastModified: siteUpdatedISO,
      priority: 0.9,
      alternates: { languages: { "ar-SA": `${base}/jeddah/5g`, "en-SA": `${base}/en/5g-home-internet-jeddah`, "x-default": `${base}/jeddah/5g` } },
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
      alternates: { languages: { "ar-SA": `${base}/fiber-vs-5g`, "en-SA": `${base}/en/fiber-vs-5g`, "x-default": `${base}/fiber-vs-5g` } },
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
    { url: `${base}/coverage`, lastModified: siteUpdatedISO, priority: 0.9 },
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
