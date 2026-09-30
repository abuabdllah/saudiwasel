"use client";

import { useEffect } from "react";
import { cities } from "../lib/cities";
import { trackEvent } from "../lib/tracking";

export default function ConversionTracking() {
  useEffect(() => {
    function handleClick(event) {
      const link = event.target.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      const context = { page_path: window.location.pathname };
      if (href.startsWith("tel:")) trackEvent("click_phone", context);
      else if (href.startsWith("https://wa.me/")) trackEvent("click_whatsapp", context);
      else {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin && url.origin !== "https://saudiwasel.com") return;
        const segments = url.pathname.split("/").filter(Boolean);
        if (cities.some((city) => city.slug === segments[0])) {
          if (segments.length === 1) trackEvent("city_click", { ...context, destination: url.pathname });
          else if (segments.length === 2 && ["stc", "salam", "mobily", "zain"].includes(segments[1])) trackEvent("operator_click", { ...context, destination: url.pathname });
        } else if (segments[0] === "5g" && segments.length === 2) {
          trackEvent("operator_click", { ...context, destination: url.pathname });
        }
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return null;
}
