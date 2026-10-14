import { prices, priceNote, latestPriceUpdate } from "../data/prices";

export default function FivegSummaryTable() {
  const updatedISO = latestPriceUpdate("fiveg");
  return <>
    <p className="small-note">آخر تحديث: <time dateTime={updatedISO}>{updatedISO}</time></p>
    <div className="table-wrap"><table className="compare">
      <thead><tr><th scope="col">الشركة</th><th scope="col">اسم مرجعي للباقة</th><th scope="col">التحميل</th><th scope="col">الرفع</th><th scope="col">السعر</th><th scope="col">المميزات</th></tr></thead>
      <tbody>{["stc", "salam", "zain", "mobily"].map(slug => {
        const operator = prices[slug];
        const plan = operator.fiveg[0];
        return <tr key={slug}><td><a href={`/5g/${slug}`}>{operator.name}</a></td><td>{plan.name}</td><td>{plan.down}</td><td>{plan.up}</td><td>{plan.price || <a href="https://wa.me/966564612017">اعرف أحدث سعر لعنوانك</a>}</td><td>{plan.perks}</td></tr>;
      })}</tbody>
    </table></div>
    <p className="small-note">{priceNote}</p>
  </>;
}
