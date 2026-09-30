export const languagePairs = [
  { ar: "/", en: "/en" },
  { ar: "/jeddah/5g", en: "/en/5g-home-internet-jeddah" },
  { ar: "/riyadh", en: "/en/5g-home-internet-riyadh", switchOnly: true },
  { ar: "/khobar", en: "/en/5g-home-internet-khobar", switchOnly: true },
  { ar: "/jeddah/stc", en: "/en/fiber-internet-jeddah", switchOnly: true },
  { ar: "/fiber-vs-5g", en: "/en/fiber-vs-5g" },
];

export function languageAlternates(arabicPath) {
  const pair = languagePairs.find((item) => item.ar === arabicPath);
  return pair && !pair.switchOnly ? { "ar-SA": pair.ar, "en-SA": pair.en, "x-default": pair.ar } : undefined;
}
