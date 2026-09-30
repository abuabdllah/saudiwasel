import IntentCtas from "./IntentCtas";
import { publishedNeighborhoods } from "../lib/neighborhoods";
import { operators } from "../lib/operators";
import { cities } from "../lib/cities";

export default function CityNextSteps({ city, operator = "" }) {
  const cityData = cities.find((entry) => entry.slug === city);
  const neighborhoods = publishedNeighborhoods().filter((page) => page.city === city);
  return <section className="container city-next-steps">
    <h2>{operator ? `تابع التحقق من ${operator} في ${cityData.name}` : `ابدأ فحص عنوانك في ${cityData.name}`}</h2>
    <p>قارن المشغلين الذين يمكن التحقق من خدماتهم، ولا تعتبر هذه الروابط إثباتًا لتغطية مبناك. ابدأ بالعنوان، ثم راجع العقد والتكلفة واحتياجك للألعاب أو العمل.</p>
    <IntentCtas city={city} operator={operator} />
    <div className="cities"><a href="/">الرئيسية</a><a href={`/${city}`}>خيارات {cityData.name}</a>{operators.map((entry) => <a key={entry.slug} href={`/${city}/${entry.slug}`}>{entry.name} في {cityData.name}</a>)}
      {city === "jeddah" && <a href="/jeddah/zain">زين في جدة</a>}
      {neighborhoods.map((page) => <a key={page.slug} href={`/${city}/${page.slug}`}>حي {page.name}</a>)}
    </div>
  </section>;
}
