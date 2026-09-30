import { cities } from "./cities";

export const neighborhoodPages = [];

export function publishedNeighborhoods() {
  const pages = neighborhoodPages.filter((page) => page.status === "published");
  const seen = new Set();
  for (const page of pages) {
    const route = `${page.city}/${page.slug}`;
    const valid = cities.some((city) => city.slug === page.city)
      && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug || "")
      && !["stc", "salam", "mobily", "zain", "5g"].includes(page.slug)
      && page.name && page.description && page.demandEvidence
      && /^\d{4}-\d{2}-\d{2}$/.test(page.editorialReviewDate || "")
      && page.introduction && page.addressAdvice
      && page.faqs?.length >= 3 && page.faqs.every((faq) => faq.q && faq.a)
      && page.sources?.length > 0 && page.sources.every((source) => source.label && /^https:\/\//.test(source.url));
    if (!valid || seen.has(route)) throw new Error(`Neighborhood publishing requirements not met: ${route}`);
    seen.add(route);
  }
  return pages;
}

export function getNeighborhood(city, slug) {
  return publishedNeighborhoods().find((page) => page.city === city && page.slug === slug);
}
