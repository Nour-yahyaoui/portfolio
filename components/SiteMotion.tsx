"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.06 });
    const elements = document.querySelectorAll("main section > div, .project-entry");
    elements.forEach((element) => { element.classList.add("reveal-ready"); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach((el) => el.classList.remove("reveal-ready", "is-visible")); };
  }, [pathname]);
  return null;
}
