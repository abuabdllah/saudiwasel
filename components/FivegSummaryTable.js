import { prices, priceNote, latestPriceUpdate } from "../data/prices";
import { isEmptyPlan, isEmptyPriceCell } from "../lib/price-display";

export default function FivegSummaryTable() {
  const updatedISO = latestPriceUpdate("fiveg");
  const plans = Object.values(prices).map(operator => operator.fiveg[0]).filter(plan => plan && !isEmptyPriceCell(plan.price));
  const hasUpload = plans.some(plan => !isEmptyPriceCell(plan.up));
  return <>
    <p className="small-note">آخر تحديث: <time dateTime={updatedISO}>{updatedISO}</time></p>
    <div className="table-wrap"><table className="compare">
      <thead><tr><th scope="col">الشركة</th><th scope="col">الباقة</th><th scope="col">التحميل</th>{hasUpload && <th scope="col">الرفع</th>}<th scope="col">السعر</th><th scope="col">المميزات</th></tr></thead>
      <tbody>{["stc", "salam", "zain", "mobily"].map(slug => {
        const operator = prices[slug];
        const plan = operator.fiveg[0];
        if (!plan || isEmptyPlan(plan) || isEmptyPriceCell(plan.price)) return null;
        return <tr key={slug}><td><a href={`/5g/${slug}`}>{operator.name}</a></td><td>{plan.name}</td><td>{plan.down}</td>{hasUpload && <td>{isEmptyPriceCell(plan.up) ? "حسب الباقة" : plan.up}</td>}<td>{plan.price || <a href="https://wa.me/966564612017">اعرف أحدث سعر لعنوانك</a>}</td><td>{plan.perks}</td></tr>;
      })}</tbody>
    </table></div>
    <p className="small-note">{priceNote}</p>
  </>;
}
