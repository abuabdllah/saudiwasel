"use client";

import { usePathname } from "next/navigation";
import { languagePairs } from "../lib/languages";

export default function LanguageSwitcher({ language = "en" }) {
  const pathname = usePathname();
  const source = language === "en" ? "ar" : "en";
  const pair = languagePairs.find((item) => item[source] === pathname);
  if (!pair) return null;

  return (
    <a href={pair[language]} lang={language} dir={language === "en" ? "ltr" : "rtl"} hrefLang={language} style={language === "en" ? { fontSize: "0.85rem", alignSelf: "center" } : undefined}>
      {language === "en" ? "English" : "العربية"}
    </a>
  );
}
