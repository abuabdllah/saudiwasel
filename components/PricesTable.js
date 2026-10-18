import { prices } from "../data/prices";
import { englishPriceText, isEmptyPlan, isEmptyPriceCell, pricingNote } from "../lib/price-display";

export default function PricesTable({ operator, service = "fiber", english = false, showOfferNote = true, plans, caption, context, note }) {
  const data = prices[operator];
  const packages = (plans || data[service]).filter(plan => !isEmptyPlan(plan) && !isEmptyPriceCell(plan.price));
  const hasUpload = service === "fiveg" || packages.some(plan => !isEmptyPriceCell(plan.up));
  const hasPrices = packages.some(plan => !isEmptyPriceCell(plan.price));
  const labels = english ? ["Plan", "Download", "Upload", "Price", "Included benefits"] : ["الباقة", "التحميل", "الرفع", "السعر", "المزايا"];
  const display = value => (english ? englishPriceText(value) : value) ?? "—";

  return <>
    <p className={english ? "en-price-note" : "small-note"}>{english ? "Last updated: " : "آخر تحديث: "}<time dateTime={data.updatedISO}>{data.updatedISO}</time></p>
    <div className={english ? "en-table-wrap" : "table-wrap"} role="region" aria-label={caption || data.name} tabIndex={0}>
      <table className={english ? undefined : "compare"}>
        {caption && <caption>{caption}</caption>}
        <thead><tr>{labels.filter((label, index) => (index !== 3 || hasPrices) && (index !== 2 || hasUpload)).map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
        <tbody>{packages.map(plan => <tr key={plan.name}>
          <th scope="row">{plan.name}</th><td>{display(plan.down)}</td>{hasUpload && <td>{isEmptyPriceCell(plan.up) ? (english ? "Varies by plan" : "حسب الباقة") : display(plan.up)}</td>}{hasPrices && <td>{isEmptyPriceCell(plan.price) ? "—" : display(plan.price)}</td>}<td>{display(plan.perks)}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className={english ? "en-price-note" : "small-note"} lang={english ? "en" : "ar"} dir={english ? "ltr" : "rtl"}>{note ?? (operator === "zain" && service === "fiber" && !english ? "الأسعار من الموقع الرسمي لزين – آخر تحديث أكتوبر 2026. السعر النهائي يتأكد حسب العنوان." : operator === "salam" && service === "fiber" && !english ? "الأسعار تقريبية – آخر تحديث أكتوبر 2026. السعر النهائي والعروض الحالية تتأكد مع المندوب حسب عنوانك." : english && service === "fiveg" && operator === "salam" && !hasPrices ? "Message us on WhatsApp for current Salam 5G prices at your address." : context && !english ? (hasPrices ? `أسعار ${context} تشمل الضريبة وهي من المصدر الرسمي للمشغل؛ لأن العروض تتغير، أكّد السعر المتاح لعنوانك وتفاصيل الباقة عبر واتساب قبل الطلب.` : `لأسعار ${context} وباقاته الحالية، شارك عنوان الوحدة عبر واتساب حتى تُراجع التفاصيل المتاحة قبل الاشتراك.`) : pricingNote(hasPrices, english, showOfferNote))}</p>
  </>;
}
