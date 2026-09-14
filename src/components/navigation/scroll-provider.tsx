"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";

type ScrollController = { suspend: () => () => void };
const ScrollContext = createContext<ScrollController | null>(null);

/** One scroll owner. Modal and route locks compose; the last release restores scrolling. */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const engine = useRef<Lenis | null>(null);
  const locks = useRef(new Set<symbol>());
  const previousOverflow = useRef("");
  const suspend = useCallback(() => {
    const key = Symbol("scroll-lock");
    if (locks.current.size === 0) {
      previousOverflow.current = document.documentElement.style.overflow;
      engine.current?.stop();
      document.documentElement.style.overflow = "hidden";
    }
    locks.current.add(key);
    return () => {
      if (!locks.current.delete(key) || locks.current.size) return;
      document.documentElement.style.overflow = previousOverflow.current;
      engine.current?.resize();
      engine.current?.start();
    };
  }, []);

  useEffect(() => {
    const eligible = matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let revision = 0;
    const configure = async () => {
      const current = ++revision;
      engine.current?.destroy();
      engine.current = null;
      if (!eligible.matches) return;
      const { default: Lenis } = await import("lenis");
      if (current !== revision) return;
      engine.current = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        syncTouch: false,
        anchors: false,
        stopInertiaOnNavigate: true,
        prevent: (node) =>
          /^(INPUT|TEXTAREA|SELECT|DIALOG)$/.test(node.tagName),
      });
      if (locks.current.size) engine.current.stop();
    };
    const cancelInertia = () => {
      engine.current?.scrollTo(window.scrollY, {
        immediate: true,
        force: true,
      });
    };
    const onNativeAction = (event: Event) => {
      if (
        event.type !== "click" ||
        (event.target instanceof Element && event.target.closest("a[href]"))
      )
        cancelInertia();
    };
    void configure();
    eligible.addEventListener("change", configure);
    window.addEventListener("popstate", cancelInertia);
    document.addEventListener("click", onNativeAction, true);
    document.addEventListener("keydown", onNativeAction, true);
    return () => {
      revision++;
      eligible.removeEventListener("change", configure);
      window.removeEventListener("popstate", cancelInertia);
      document.removeEventListener("click", onNativeAction, true);
      document.removeEventListener("keydown", onNativeAction, true);
      engine.current?.destroy();
      engine.current = null;
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ suspend }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollController() {
  const controller = useContext(ScrollContext);
  if (!controller) throw new Error("Scroll controls require ScrollProvider");
  return controller;
}
