const BASE = "https://saudiwasel.com";

export const organizationSchema = {
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "سعودي واصل",
  url: `${BASE}/`,
  logo: `${BASE}/icon.png`,
  telephone: "+966564612017",
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
    "@type": "Service",
    name,
    serviceType,
    url: `${BASE}${path}`,
    areaServed: { "@type": "City", name: city },
    provider: { "@id": `${BASE}/#organization` },
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
  const graph = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
