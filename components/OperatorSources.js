import { operatorSources } from "../lib/operator-sources";

export default function OperatorSources({ operator = "" }) {
  const sources = operatorSources[operator] ? [[operator, operatorSources[operator]]] : Object.entries(operatorSources);
  return <div className="source-links">
    <h3>مصادر الباقات وتأكيد المعلومات</h3>
    <div className="cities">{sources.map(([slug, source]) => <span key={slug}>{source.label}</span>)}</div>
  </div>;
}
