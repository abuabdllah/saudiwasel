import { cities } from "../lib/cities";
import { operators, operatorCities } from "../lib/operators";
import { fivegOperators } from "../lib/fiveg";

export default function sitemap() {
  const base = "https://saudiwasel.com";
  return [
    { url: base, priority: 1 },
    ...cities.map((c) => ({ url: `${base}/${c.slug}`, priority: 0.8 })),
    ...operatorCities.flatMap((city) =>
      operators.map((o) => ({ url: `${base}/${city}/${o.slug}`, priority: 0.9 }))
    ),
    { url: `${base}/5g`, priority: 0.9 },
    ...fivegOperators.map((o) => ({ url: `${base}/5g/${o.slug}`, priority: 0.8 })),
    { url: `${base}/fiber-vs-5g`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.4 },
    { url: `${base}/contact`, priority: 0.4 },
    { url: `${base}/privacy`, priority: 0.2 },
  ];
}
