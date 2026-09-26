import { cities } from "../lib/cities";
import { operators, operatorCities } from "../lib/operators";

export default function sitemap() {
  const base = "https://saudiwasel.com";
  return [
    { url: base, priority: 1 },
    ...cities.map((c) => ({ url: `${base}/${c.slug}`, priority: 0.8 })),
    ...operatorCities.flatMap((city) =>
      operators.map((o) => ({ url: `${base}/${city}/${o.slug}`, priority: 0.9 }))
    ),
  ];
}