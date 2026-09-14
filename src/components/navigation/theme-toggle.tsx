"use client";
import { useSyncExternalStore } from "react";
import { themeStorageKey } from "./theme-config";

const EVENT = "psametra-theme-change";
type Theme = "system" | "light" | "dark";
const themes: readonly Theme[] = ["system", "light", "dark"];

function subscribe(notify: () => void) {
  const query = matchMedia("(prefers-color-scheme: dark)");
  function update() {
    const preference = snapshot();
    document.documentElement.dataset.theme =
      preference === "system" ? (query.matches ? "dark" : "light") : preference;
    notify();
  }
  query.addEventListener("change", update);
  window.addEventListener(EVENT, update);
  return () => {
    query.removeEventListener("change", update);
    window.removeEventListener(EVENT, update);
  };
}
function snapshot(): Theme {
  const value = document.documentElement.dataset.preference;
  return value === "light" || value === "dark" ? value : "system";
}

/** Cycles through system, light, and dark; manual choices survive a reload when storage is available. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "system" as const,
  );
  function cycle() {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    document.documentElement.dataset.preference = next;
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* The choice still applies for this visit when persistence is unavailable. */
    }
    window.dispatchEvent(new Event(EVENT));
  }
  return (
    <button
      className="icon-button theme-toggle"
      onClick={cycle}
      aria-label={`Theme: ${theme}. Switch to ${themes[(themes.indexOf(theme) + 1) % themes.length]}.`}
      title={`Theme: ${theme}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        {theme === "dark" ? (
          <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" />
        ) : theme === "light" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" />
          </>
        ) : (
          <>
            <rect x="3" y="4" width="18" height="13" rx="2" />
            <path d="M8 21h8m-4-4v4" />
          </>
        )}
      </svg>
    </button>
  );
}
