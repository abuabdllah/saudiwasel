import JsonLd, { breadcrumbSchema, faqSchema } from "./JsonLd";
import { absoluteUrl } from "../lib/seo";

export default function PageSchema({ metadata, name, article = false, faqs = [] }) {
  const path = new URL(metadata.alternates.canonical).pathname;
  const title = typeof metadata.title === "string" ? metadata.title : name;
  const items = [{ name: "الرئيسية", path: "/" }];
  if (article) items.push({ name: "المقالات", path: "/articles" });
  items.push({ name: name || title, path });
  const schemas = [breadcrumbSchema(items), {
    "@type": article ? "Article" : "WebPage",
    "@id": `${absoluteUrl(path)}#${article ? "article" : "webpage"}`,
    ...(article ? { headline: title, mainEntityOfPage: absoluteUrl(path), publisher: { "@id": `${absoluteUrl()}#organization` } } : { name: title, isPartOf: { "@id": `${absoluteUrl()}#website` } }),
    description: metadata.description,
    image: absoluteUrl("/opengraph-image.png"),
    url: absoluteUrl(path),
    inLanguage: "ar-SA",
  }];
  if (faqs.length) schemas.push(faqSchema(faqs.map((faq) => Array.isArray(faq) ? { q: faq[0], a: faq[1] } : faq)));
  return <JsonLd data={schemas} />;
}
