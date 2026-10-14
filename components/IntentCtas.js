export default function IntentCtas({ city = "", operator = "" }) {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (operator) params.set("operator", operator);
  const coverage = `/coverage${params.size ? `?${params}` : ""}`;
  return <div className="intent-ctas" aria-label="ابدأ حسب احتياجك">
    <a href={coverage} className="btn btn-coverage">افحص تغطية الفايبر</a>
    <a href="https://wa.me/966564612017" className="btn btn-wa">تواصل مع مندوب فايبر</a>
    <a href="tel:0564612017" className="btn btn-call">اتصل الآن</a>
  </div>;
}
