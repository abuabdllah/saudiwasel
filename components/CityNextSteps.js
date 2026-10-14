import CityOperatorLinks from "./CityOperatorLinks";
import { publishedNeighborhoods } from "../lib/neighborhoods";
import { cities } from "../lib/cities";
import { prices } from "../data/prices";

export default function CityNextSteps({ city, operator = "" }) {
  const cityData = cities.find((entry) => entry.slug === city);
  const neighborhoods = publishedNeighborhoods().filter((page) => page.city === city);
  return <section className="container city-next-steps">
    <h2>{operator ? `تابع التحقق من ${prices[operator].name} في ${cityData.name}` : `ابدأ فحص عنوانك في ${cityData.name}`}</h2>
    <p>قارن المشغلين الذين يمكن التحقق من خدماتهم، ولا تعتبر هذه الروابط إثباتًا لتغطية مبناك. ابدأ بالعنوان، ثم راجع العقد والتكلفة واحتياجك للألعاب أو العمل.</p>
    <CityOperatorLinks city={city} current={operator} />
    {neighborhoods.length > 0 && <div className="cities">{neighborhoods.map((page) => <a key={page.slug} href={`/${city}/${page.slug}`}>حي {page.name}</a>)}</div>}
  </section>;
}
