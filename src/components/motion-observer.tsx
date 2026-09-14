"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is visible without JS; only approaching groups animate once. */
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          element.dataset.inView = String(entry.isIntersecting);
          if (!entry.isIntersecting || seen.has(element)) continue;
          seen.add(element);
          if (!preference.matches && element.hasAttribute("data-reveal")) {
            const animation = element.animate(
              [
                { opacity: 0, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 450, easing: "cubic-bezier(.2,.7,.3,1)" },
            );
            animations.add(animation);
            void animation.finished.then(
              () => animations.delete(animation),
              () => animations.delete(animation),
            );
          }
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal], [data-ambient]")
      .forEach((element) => observer.observe(element));
    const stopMotion = () => {
      if (preference.matches)
        animations.forEach((animation) => animation.cancel());
    };
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);
  return null;
}
