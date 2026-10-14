import { cities } from "./cities";

const cityNames = Object.fromEntries(cities.map(city => [city.slug, city.name]));
const operatorNames = { stc: "STC", salam: "سلام", mobily: "موبايلي", zain: "زين" };
const phone = "0564612017";

export function contactTitle(path) {
  if (path === "/") return `مندوب فايبر في السعودية ${phone} | سعودي واصل`;
  if (path === "/5g") return `رقم مندوب راوتر 5G في السعودية ${phone}`;
  const [, first, second, extra] = path.split("/");
  if (extra !== undefined) return null;
  if (first === "5g" && operatorNames[second]) {
    return second === "zain" ? `راوتر زين 5G المنزلي | الأسعار ورقم المندوب ${phone}` : `رقم مندوب راوتر 5G ${operatorNames[second]} ${phone}`;
  }
  if (!cityNames[first]) return null;
  if (!second) return `رقم مندوب فايبر ${cityNames[first]} ${phone} | سعودي واصل`;
  if (second === "5g") return `رقم مندوب راوتر 5G ${cityNames[first]} ${phone}`;
  if (operatorNames[second]) return `رقم مندوب فايبر ${operatorNames[second]} ${cityNames[first]} ${phone}`;
  return null;
}

export function contactDescription(path, description = "") {
  const title = contactTitle(path);
  if (!title) return description;
  const prefix = path === "/" ? `رقم مندوب فايبر في السعودية ${phone}` : path === "/5g/zain" ? `رقم مندوب راوتر 5G زين ${phone}` : title.split(" | ")[0];
  const combined = `${prefix}. ${description}`;
  if (combined.length <= 155) return combined;
  const shortened = combined.slice(0, 154);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace >= prefix.length ? lastSpace : 154).trimEnd()}…`;
}
