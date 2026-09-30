"use client";

import { usePathname } from "next/navigation";
import { routeLabels } from "../lib/route-labels";
import { getNeighborhood } from "../lib/neighborhoods";

const englishLabels = {
  "fiber-vs-5g": "Fiber vs 5G", "5g-home-internet-jeddah": "5G in Jeddah",
  "5g-home-internet-riyadh": "5G in Riyadh", "5g-home-internet-khobar": "5G in Khobar",
  "fiber-internet-jeddah": "Fiber in Jeddah",
};

export default function Breadcrumbs({ english = false }) {
  const pathname = usePathname();
  const root = english ? "/en" : "/";
  if (!pathname || pathname === root) return null;
  const segments = pathname.split("/").filter(Boolean).slice(english ? 1 : 0);
  const items = [{ name: english ? "Home" : "الرئيسية", href: root }, ...segments.map((segment, index) => ({
    name: english ? englishLabels[segment] || segment : routeLabels[segment] || (getNeighborhood(segments[0], segment) ? `حي ${getNeighborhood(segments[0], segment).name}` : segment),
    href: `${english ? "/en" : ""}/${segments.slice(0, index + 1).join("/")}`,
  }))];
  return <nav className={english ? "en-container breadcrumbs" : "container breadcrumbs"} aria-label={english ? "Breadcrumb" : "مسار التنقل"}>
    <ol>{items.map((item, index) => <li key={item.href}>
      {index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <a href={item.href}>{item.name}</a>}
    </li>)}</ol>
  </nav>;
}
