const BASE = "https://saudiwasel.com";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "سعودي واصل",
  url: `${BASE}/`,
  logo: `${BASE}/icon.png`,
  telephone: "+966564612017",
  description: "منصة مستقلة تساعد في مراجعة خيارات الإنترنت المنزلي، وليست تابعة لأي مشغل اتصالات.",
  contactPoint: { "@type": "ContactPoint", telephone: "+966564612017", contactType: "customer enquiries", availableLanguage: ["Arabic", "English"] },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  name: "SaudiWasel | سعودي واصل",
  url: `${BASE}/`,
  publisher: { "@id": `${BASE}/#organization` },
  inLanguage: ["ar-SA", "en-SA"],
};

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

export function serviceSchema({ name, serviceType, city, path }) {
  return {
    "@type": "WebPage",
    name,
    description: `مساعدة مستقلة في ${serviceType} حسب العنوان، وليست صفحة رسمية للمشغل.`,
    url: `${BASE}${path}`,
    inLanguage: "ar-SA",
    about: { "@type": city === "السعودية" ? "Country" : "City", name: city },
    isPartOf: { "@id": `${BASE}/#website` },
  };
}

export function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export default function JsonLd({ data }) {
  const graph = (Array.isArray(data) ? data : [data]).flat();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
