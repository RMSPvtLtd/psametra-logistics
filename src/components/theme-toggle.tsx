"use client";

import { useEffect, useRef } from "react";

export function ThemeToggle() {
  const choice = useRef<string | null>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("psametra-theme");
      if (saved === "light" || saved === "dark") choice.current = saved;
    } catch { /* Storage is optional; the current page still switches. */ }
    const system = matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      if (!choice.current) document.documentElement.dataset.theme = system.matches ? "dark" : "light";
    };
    followSystem();
    system.addEventListener("change", followSystem);
    return () => system.removeEventListener("change", followSystem);
  }, []);

  function toggle() {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    choice.current = theme;
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("psametra-theme", theme); } catch { /* Keep the in-page choice when storage is blocked. */ }
  }

  return <button className="theme-toggle" type="button" onClick={toggle}>
    <span className="theme-to-dark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></svg><span className="visually-hidden">Use dark theme</span></span>
    <span className="theme-to-light"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg><span className="visually-hidden">Use light theme</span></span>
  </button>;
}
