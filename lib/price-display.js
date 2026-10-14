import { priceNote } from "../data/prices";

export function isEmptyPriceCell(value) {
  return value == null || ["", "—"].includes(String(value).trim());
}

export function isEmptyPlan(plan) {
  return [plan.name, plan.down, plan.up, plan.price, plan.perks].every(isEmptyPriceCell);
}

export function pricingNote(hasPrices, english = false, showOfferNote = true) {
  if (english) return hasPrices
    ? `Prices include VAT and are taken from the operator’s published prices.${showOfferNote ? " Offers change frequently; contact us on WhatsApp to confirm the current price for your address." : ""}`
    : "Contact us on WhatsApp for the latest plans and prices available at your address.";
  return hasPrices ? priceNote : "راسلنا على واتساب لمعرفة أحدث الباقات والأسعار المتاحة لعنوانك.";
}

const englishPriceTerms = [
  ["الراوتر حسب عرض الباقة", "Router per plan offer"],
  ["حسب الباقة", "Varies by plan"],
  ["أقصى سرعة تدعمها الشبكة", "Maximum speed supported by the network"],
  ["غير محدودة", "Unlimited"],
  ["تنقل حر", "Free roaming"],
  ["أولوية شبكة", "network priority"],
  ["مودم وتركيب مجاني", "Free modem and installation"],
  ["تركيب ومودم مجاني", "Free installation and modem"],
  ["راوتر وتركيب مجاني", "Free router and installation"],
  ["توصيل وراوتر مجاني", "Free delivery and router"],
  ["3 اشتراكات", "3 subscriptions"],
  ["اشتراكين", "2 subscriptions"],
  ["اشتراك ترفيه", "entertainment subscription"],
  ["اشتراك ثمانية", "Thmanyah subscription"],
  ["منصة بث واحدة", "1 streaming service"],
  ["منصتين بث", "2 streaming services"],
  ["شهرين مجاناً", "2 free months"],
  ["تنقل بالراوتر في أي مكان", "router portability anywhere"],
  ["إنترنت لا محدود", "unlimited internet"],
  ["للمشتركين الجدد لمدة", "for new subscribers for"],
  ["لأول 3 شهور", "for the first 3 months"],
  ["عرض خاص", "special offer"],
  ["راوتر ألعاب", "gaming router"],
  ["راوتر 5G مجاني", "Free 5G router"],
  ["راوتر مجاني", "Free router"],
  ["مقوي واي فاي", "Wi-Fi extender"],
  ["IP مخصص", "dedicated IP"],
  ["قسيمة 50 ريال شهرياً", "SAR 50 monthly voucher"],
  ["تقنية شبكة", "network technology"],
  ["مخصصة للألعاب", "Designed for gaming"],
  ["ألياف لأكثر من غرفة", "Fiber for multiple rooms"],
  ["ميجابت", "Mbps"],
  ["ميجا", "Mbps"],
  ["جيجا", "Gbps"],
  ["حتى", "Up to"],
  ["ريال/شهر", "SAR/month"],
  ["ريال/سنة", "SAR/year"],
  ["ريال", "SAR"],
  ["عرض", "offer"],
  ["شهر", "months"],
  ["راوتر", "router"],
];

export function englishPriceText(value) {
  if (isEmptyPriceCell(value)) return value;
  return englishPriceTerms.reduce((text, [arabic, english]) => text.replaceAll(arabic, english), String(value));
}
