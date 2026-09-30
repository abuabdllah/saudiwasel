import { operatorSources } from "../lib/operator-sources";

export default function OperatorSources({ operator = "" }) {
  const sources = operatorSources[operator] ? [[operator, operatorSources[operator]]] : Object.entries(operatorSources);
  return <div className="source-links">
    <h3>مصادر الباقات وتأكيد المعلومات</h3>
    <p>أسماء الباقات أدناه مرجع من المحتوى السابق، وليست عروضًا مؤكدة حاليًا. لم تُتحقق أسعار أو سرعات أو مزايا حديثة؛ راجع المصدر الرسمي واطلب تأكيد السعر بعد الخصم والضريبة وتكلفة الجهاز والتركيب ومدة الالتزام قبل الاشتراك.</p>
    <div className="cities">{sources.map(([slug, source]) => <a key={slug} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</div>
  </div>;
}
