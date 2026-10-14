import CityOperatorLinks from "./CityOperatorLinks";
import { publishedNeighborhoods } from "../lib/neighborhoods";
import { cities } from "../lib/cities";
import { prices } from "../data/prices";

export default function CityNextSteps({ city, operator = "" }) {
  const cityData = cities.find((entry) => entry.slug === city);
  const neighborhoods = publishedNeighborhoods().filter((page) => page.city === city);
  return <section className="container city-next-steps">
    <h2>{operator ? `تابع التحقق من ${prices[operator].name} في ${cityData.name}` : `ابدأ فحص عنوانك في ${cityData.name}`}</h2>
    <p>{operator ? `لمراجعة بدائل ${prices[operator].name} في ${cityData.name}، افتح صفحات المشغلين على أساس عنوان وحدتك؛ الروابط للتعريف وليست تأكيداً لأهلية المبنى، وتبقى شروط كل عرض بحاجة للمقارنة.` : `ابدأ المقارنة في ${cityData.name} بتحديد موقع السكن وعدد أجهزته، ثم راجع تكلفة العقد ومدته؛ هذه الصفحات تساعد على الاستفسار ولا تثبت توفر الألياف في حي بعينه.`}</p>
    <CityOperatorLinks city={city} current={operator} />
    {neighborhoods.length > 0 && <div className="cities">{neighborhoods.map((page) => <a key={page.slug} href={`/${city}/${page.slug}`}>حي {page.name}</a>)}</div>}
  </section>;
}
