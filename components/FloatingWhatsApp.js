"use client";

import { useEffect, useRef, useState } from "react";

export default function FloatingWhatsApp() {
  const linkRef = useRef(null);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 640px)");
    let observer;

    function watchContent() {
      observer?.disconnect();
      setClear(false);
      if (!mobile.matches) return;

      const bounds = linkRef.current.getBoundingClientRect();
      const overlapping = new Set();
      const top = Math.max(0, bounds.top - 6);
      const right = Math.max(0, document.documentElement.clientWidth - bounds.right - 6);
      const bottom = Math.max(0, document.documentElement.clientHeight - bounds.bottom - 6);
      const left = Math.max(0, bounds.left - 6);

      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) overlapping.add(entry.target);
          else overlapping.delete(entry.target);
        }
        setClear(overlapping.size === 0);
      }, { rootMargin: `-${top}px -${right}px -${bottom}px -${left}px` });

      const elements = document.querySelectorAll("p, li, h1, h2, h3, h4, h5, h6, a, button, input, select, textarea, label, th, td, form, .site-header, .breadcrumbs");
      for (const element of elements) {
        if (element !== linkRef.current) observer.observe(element);
      }
    }

    watchContent();
    window.addEventListener("resize", watchContent);
    mobile.addEventListener("change", watchContent);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", watchContent);
      mobile.removeEventListener("change", watchContent);
    };
  }, []);

  return <a ref={linkRef} href="https://wa.me/966564612017" className="wa-float" data-clear={clear} aria-label="تواصل مع سعودي واصل عبر واتساب">💬</a>;
}
