import { prices, priceNote } from "../data/prices";

export default function PricesTable({ operator, service = "fiber", english = false, plans, caption }) {
  const data = prices[operator];
  const packages = plans || data[service];
  const hasPrices = packages.some(plan => plan.price !== null);
  const labels = english ? ["Plan", "Download", "Upload", "Price", "Included benefits"] : ["اسم مرجعي للباقة", "التحميل", "الرفع", "السعر", "المزايا"];

  return <>
    <p className={english ? "en-price-note" : "small-note"}>آخر تحديث: <time dateTime={data.updatedISO}>{data.updatedISO}</time></p>
    <div className={english ? "en-table-wrap" : "table-wrap"} role="region" aria-label={caption || data.name} tabIndex={0}>
      <table className={english ? undefined : "compare"}>
        {caption && <caption>{caption}</caption>}
        <thead><tr>{labels.filter((label, index) => index !== 3 || hasPrices).map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
        <tbody>{packages.map(plan => <tr key={plan.name}>
          <th scope="row">{plan.name}</th><td>{plan.down}</td><td>{plan.up}</td>{hasPrices && <td>{plan.price || "—"}</td>}<td>{plan.perks}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className={english ? "en-price-note" : "small-note"} lang="ar" dir="rtl">{priceNote}</p>
    {(!hasPrices || packages.some(plan => plan.price === null)) && <a href="https://wa.me/966564612017" className={english ? "en-button en-button-wa" : "btn btn-wa"} lang="ar" dir="rtl">اعرف أحدث سعر لعنوانك</a>}
  </>;
}
