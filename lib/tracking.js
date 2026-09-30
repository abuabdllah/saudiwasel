export function trackEvent(event, detail = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...detail };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("saudiwasel:conversion", { detail: payload }));
}
