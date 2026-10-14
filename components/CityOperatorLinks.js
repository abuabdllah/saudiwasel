import { cities } from "../lib/cities";
import { operators } from "../lib/operators";
import { cityFivegPages } from "../lib/city-fiveg";

export default function CityOperatorLinks({ city, current = "" }) {
  const cityData = cities.find(entry => entry.slug === city);
  const localOperators = city === "jeddah" ? [...operators, { slug: "zain", name: "زين" }] : operators;
  return <div className="cities">
    {localOperators.filter(operator => operator.slug !== current).map(operator => <a key={operator.slug} href={`/${city}/${operator.slug}`}>مندوب فايبر {operator.name} {cityData.name}</a>)}
    {(city === "jeddah" || cityFivegPages[city]) && current !== "5g" && <a href={`/${city}/5g`}>مندوب راوتر 5G {cityData.name}</a>}
  </div>;
}
