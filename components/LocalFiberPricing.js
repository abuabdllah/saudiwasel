import PricesTable from "./PricesTable";
import OperatorSources from "./OperatorSources";
import { localServiceContext } from "../lib/local-service-content";

export default function LocalFiberPricing({ city, operator }) {
  const local = localServiceContext(city, operator.name, operator.slug);
  return <>
    <h2>{local.pricingHeading}</h2>
    <OperatorSources operator={operator.slug} />
    <PricesTable operator={operator.slug} service="fiber" caption={local.pricingHeading} context={`فايبر ${operator.name} في ${local.city}`} />
    <section aria-label={`فحص ${operator.name} في أحياء ${local.city}`}>
      <h2>فحص فايبر {operator.name} في أحياء {local.city}</h2>
      {local.blocks.map((block) => <p key={block}>{block}</p>)}
    </section>
  </>;
}
