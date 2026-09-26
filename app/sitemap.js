import { cities } from "../lib/cities";

export default function sitemap() {
  const base = "https://saudiwasel.com";
  return [
    { url: base, priority: 1 },
    ...cities.map((c) => ({ url: `${base}/${c.slug}`, priority: 0.8 })),
  ];
}