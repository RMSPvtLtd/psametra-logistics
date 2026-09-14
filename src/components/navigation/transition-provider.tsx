"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { shouldTransition, normalizePath } from "@/lib/navigation";
import { useScrollController } from "./scroll-provider";
import { runTransition } from "@/lib/transition-sequence";
import "./transition.css";

const MOTION = {
  appear: 80,
  rotate: 220,
  reveal: 320,
  fade: 100,
  routeTimeout: 8000,
  easing: "cubic-bezier(.76, 0, .24, 1)",
} as const;
type RouteBarrier = {
  path: string;
  resolve: () => void;
  reject: (reason: Error) => void;
};

/** Owns click exclusion, motion resources, and routing recovery; ordinary links and native history remain intact. */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { suspend } = useScrollController();
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const routeBarrier = useRef<RouteBarrier | null>(null);

  useEffect(() => {
    const barrier = routeBarrier.current;
    if (barrier && normalizePath(pathname) === normalizePath(barrier.path))
      barrier.resolve();
  }, [pathname]);

  useEffect(() => {
    const layer = overlay.current;
    const page = shell.current;
    if (!layer || !page) return;
    let busy = false;
    let disposed = false;
    let historyInterrupted = false;
    let releaseScroll: (() => void) | undefined;
    const animations = new Set<Animation>();
    let watchdog: ReturnType<typeof setTimeout> | undefined;

    const animate = async (
      element: Element,
      frames: Keyframe[],
      duration: number,
    ) => {
      const animation = element.animate(frames, {
        duration,
        easing: MOTION.easing,
        fill: "forwards",
      });
      animations.add(animation);
      await animation.finished;
    };

    const navigate = async (url: URL | null) => {
      if (busy) return;
      busy = true;
      historyInterrupted = false;
      const reducedMotion = matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      releaseScroll = suspend();
      page.inert = true;
      layer.hidden = false;
      try {
        await runTransition({
          reducedMotion,
          cover: () =>
            animate(
              layer,
              [{ opacity: 0 }, { opacity: 1 }],
              reducedMotion ? MOTION.fade : MOTION.appear,
            ),
          rotate: async () => {
            await Promise.all(
              Array.from(layer.querySelectorAll(".transition-mark"), (mark) =>
                animate(
                  mark,
                  [
                    { transform: "rotate(0deg)" },
                    { transform: "rotate(90deg)" },
                  ],
                  MOTION.rotate,
                ),
              ),
            );
          },
          commit: async () => {
            if (!url) return; // Browser history owns its own commit and scroll restoration.
            await new Promise<void>((resolve, reject) => {
              routeBarrier.current = { path: url.pathname, resolve, reject };
              watchdog = setTimeout(
                () => reject(new Error("Navigation did not complete in time")),
                MOTION.routeTimeout,
              );
              router.push(url.pathname + url.search + url.hash, {
                scroll: false,
              });
            });
            clearTimeout(watchdog);
            if (url.hash)
              document
                .getElementById(decodeURIComponent(url.hash.slice(1)))
                ?.scrollIntoView({ behavior: "instant" });
            else window.scrollTo({ top: 0, behavior: "instant" });
          },
          reveal: async () => {
            if (reducedMotion)
              await animate(
                layer,
                [{ opacity: 1 }, { opacity: 0 }],
                MOTION.fade,
              );
            else
              await Promise.all(
                Array.from(
                  layer.querySelectorAll(".transition-panel"),
                  (panel, index) =>
                    animate(
                      panel,
                      [
                        { transform: "translateY(0)" },
                        {
                          transform: `translateY(${index === 0 ? "-100%" : "100%"})`,
                        },
                      ],
                      MOTION.reveal,
                    ),
                ),
              );
          },
        });
        if (url) {
          page.inert = false;
          const main = document.querySelector<HTMLElement>("main");
          main?.focus({ preventScroll: true });
        }
      } catch (error) {
        // Native back/forward supersedes a pending click; never force the abandoned destination back into history.
        if (!disposed && !historyInterrupted) {
          console.error(
            "Page transition failed; recovering navigation.",
            error,
          );
          if (url) window.location.assign(url.href);
        }
      } finally {
        clearTimeout(watchdog);
        routeBarrier.current = null;
        animations.forEach((animation) => animation.cancel());
        animations.clear();
        layer.hidden = true;
        page.inert = false;
        releaseScroll?.();
        busy = false;
      }
    };

    function onClick(event: MouseEvent) {
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href, window.location.href);
      if (!shouldTransition(new URL(window.location.href), url)) return;
      event.preventDefault();
      event.stopPropagation();
      anchor.closest("dialog")?.close();
      // The routine owns all rejections and sets its exclusion flag before its first await.
      void navigate(url);
    }
    function onPopState() {
      if (busy) {
        historyInterrupted = true;
        routeBarrier.current?.reject(
          new Error("Superseded by browser history"),
        );
        animations.forEach((animation) => animation.cancel());
      }
    }
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      disposed = true;
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      clearTimeout(watchdog);
      routeBarrier.current?.reject(new Error("Transition owner unmounted"));
      animations.forEach((animation) => animation.cancel());
      page.inert = false;
      layer.hidden = true;
      releaseScroll?.();
    };
  }, [router, suspend]);

  return (
    <>
      <div ref={shell}>{children}</div>
      <div ref={overlay} className="transition-layer" aria-hidden="true" hidden>
        {["upper", "lower"].map((half) => (
          <div className={`transition-panel ${half}`} key={half}>
            <div className="transition-center">
              <svg
                className="transition-mark"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M43 10a41 41 0 0 0 0 80V76a27 27 0 0 1 0-52ZM57 10a41 41 0 0 1 0 80V76a27 27 0 0 0 0-52Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
