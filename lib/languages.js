export const languagePairs = [
  { ar: "/", en: "/en" },
  { ar: "/jeddah/5g", en: "/en/5g-home-internet-jeddah" },
  { ar: "/riyadh/5g", en: "/en/5g-home-internet-riyadh" },
  { ar: "/khobar", en: "/en/5g-home-internet-khobar", switchOnly: true },
  { ar: "/jeddah", en: "/en/fiber-internet-jeddah" },
  { ar: "/fiber-vs-5g", en: "/en/fiber-vs-5g" },
];

export function languageAlternates(path) {
  const pathname = path === "/" ? "/" : path.replace(/\/+$/, "");
  // Only exact, published equivalents qualify; never infer an /en city URL.
  const pair = languagePairs.find((item) => item.ar === pathname || item.en === pathname);
  if (pair && !pair.switchOnly) {
    return { ar: pair.ar, en: pair.en, "x-default": pair.ar };
  }
  // A switch-only page is related content, not a translated equivalent.
  if (pathname === "/en" || pathname.startsWith("/en/")) return undefined;
  return { ar: pathname, "x-default": pathname };
}
