"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { heroPhase } from "./phase";

export function Hero({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const destination = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = section.current;
    const film = video.current;
    const next = destination.current;
    if (!root || !film || !next) return;
    const sticky = root.querySelector<HTMLElement>(".hero-sticky")!;
    const header = document.querySelector<HTMLElement>(".site-header");
    const content = next.firstElementChild as HTMLElement | null;
    const capable = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: Partial<EventTarget> & { saveData?: boolean } }).connection;
    let frame = 0;
    let videoFrame = 0;
    let visible = true;
    let enabled = false;
    let geometryDirty = true;
    let top = 80;
    let range = 1;
    let width = 0;
    let height = 0;
    let progress = 0;
    let presentedTime = -1;
    let stalledMs = 0;
    let lastCheck = performance.now();
    const hasFrameCallback = typeof film.requestVideoFrameCallback === "function";
    const measure = () => {
      top = header?.getBoundingClientRect().height ?? 80;
      root.style.setProperty("--hero-top", `${top}px`);
      root.style.setProperty("--hero-content-height", `${content?.scrollHeight ?? 0}px`);
      range = Math.max(1, root.offsetHeight - sticky.offsetHeight);
      width = film.clientWidth;
      height = film.clientHeight;
      geometryDirty = false;
    };
    const cancelVideoFrame = () => {
      if (videoFrame) film.cancelVideoFrameCallback(videoFrame);
      videoFrame = 0;
    };
    const update = () => {
      frame = 0;
      if (!enabled || !visible || document.hidden) return;
      if (geometryDirty) measure();
      progress = Math.max(0, Math.min(1, (top - root.getBoundingClientRect().top) / range));
      const target = heroPhase(progress);
      if (film.readyState >= 1 && Number.isFinite(film.duration) && !film.seeking) {
        const time = Math.max(0, Math.min(film.duration - .045, target.film * film.duration));
        if (Math.abs(film.currentTime - time) > .045) {
          // One seek at a time; seeked schedules the newest scroll target.
          presentedTime = -1;
          cancelVideoFrame();
          if (hasFrameCallback) videoFrame = film.requestVideoFrameCallback((_now, metadata) => {
            videoFrame = 0;
            presentedTime = metadata.mediaTime;
            stalledMs = 0;
            queue();
          });
          film.currentTime = time;
        }
      }
      const atEnd = film.readyState >= 2 && !film.seeking && film.currentTime >= film.duration - .1;
      const settled = atEnd && (!hasFrameCallback || presentedTime >= film.duration - .1);
      const phase = heroPhase(settled ? progress : Math.min(progress, .7));
      root.style.setProperty("--intro-opacity", String(Math.max(0, 1 - progress * 3)));
      root.style.setProperty("--scene-opacity", phase.cover === 1 ? "0" : "1");
      root.style.setProperty("--cover", String(phase.cover));
      root.style.setProperty("--mark-rotation", `${phase.rotate}deg`);
      root.style.setProperty("--split-up", `${-phase.split * 100}%`);
      root.style.setProperty("--split-down", `${phase.split * 100}%`);
      root.dataset.phase = phase.split > 0 ? "split" : phase.rotate > 0 ? "rotate" : phase.cover > 0 ? "cover" : "film";
      next.inert = phase.split < .98;
      if (actions.current) actions.current.inert = progress > .4;
      if (scene.current) scene.current.inert = phase.cover === 1;
      if (counter.current) counter.current.textContent = String(Math.round(progress * 100)).padStart(3, "0");
      // Match the grille, then bring the covered mark into view before rotation.
      const sourceWidth = film.videoWidth || 1920;
      const sourceHeight = film.videoHeight || 1080;
      const scale = Math.max(width / sourceWidth, height / sourceHeight);
      const filmedY = sourceHeight * (350 / 1080) * scale + (height - sourceHeight * scale) * .55;
      const filmedSize = sourceWidth * (490 / 1920) * scale;
      const fittedSize = Math.min(filmedSize, height * .64, width * .64);
      root.style.setProperty("--mark-y", `${filmedY + (height / 2 - filmedY) * phase.cover}px`);
      root.style.setProperty("--mark-size", `${filmedSize + (fittedSize - filmedSize) * phase.cover}px`);
    };
    const queue = () => { if (!frame && enabled && visible && !document.hidden) frame = requestAnimationFrame(update); };
    const resize = () => { geometryDirty = true; queue(); };
    const fallback = () => {
      const wasEnabled = enabled;
      const bounds = root.getBoundingClientRect();
      const currentProgress = (top - bounds.top) / Math.max(1, root.offsetHeight - sticky.offsetHeight);
      const anchor = bounds.bottom <= top ? root.nextElementSibling : currentProgress >= .7 ? content ?? next : scene.current;
      const before = anchor?.getBoundingClientRect().top;
      enabled = false;
      cancelAnimationFrame(frame);
      frame = 0;
      cancelVideoFrame();
      root.dataset.scrub = "false";
      delete root.dataset.phase;
      root.removeAttribute("style");
      next.inert = false;
      if (actions.current) actions.current.inert = false;
      if (scene.current) scene.current.inert = false;
      film.removeAttribute("src");
      film.load();
      // Preserve the visible section when the enhanced scroll distance collapses.
      if (wasEnabled && bounds.top < top && anchor && before !== undefined) {
        window.scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: "instant" });
      }
    };
    const configure = () => {
      if (!capable.matches || connection?.saveData || !film.canPlayType('video/mp4; codecs="avc1.42E01E"')) { fallback(); return; }
      if (enabled) { resize(); return; }
      const wasFallback = root.dataset.scrub === "false";
      const headerBottom = header?.getBoundingClientRect().bottom ?? top;
      const pastHero = root.getBoundingClientRect().bottom <= headerBottom;
      const following = pastHero ? root.nextElementSibling : null;
      const followingTop = following?.getBoundingClientRect().top;
      const revealOffset = headerBottom - (content ?? next).getBoundingClientRect().top;
      enabled = true;
      geometryDirty = true;
      stalledMs = 0;
      lastCheck = performance.now();
      presentedTime = -1;
      root.dataset.scrub = "true";
      next.inert = true;
      measure();
      if (wasFallback && following && followingTop !== undefined) {
        window.scrollBy({ top: following.getBoundingClientRect().top - followingTop, behavior: "instant" });
      } else if (wasFallback && revealOffset >= 0) {
        const contentInset = (content ?? next).getBoundingClientRect().top - next.getBoundingClientRect().top;
        window.scrollTo({ top: window.scrollY + root.getBoundingClientRect().top - top + range + contentInset + revealOffset, behavior: "instant" });
      }
      // Buffer ahead only after motion, data-saving and codec checks pass.
      film.preload = "auto";
      film.src = "/media/freight-film.mp4";
      film.load();
      queue();
    };
    const mediaReady = () => { stalledMs = 0; resize(); };
    const seeked = () => { stalledMs = 0; queue(); };
    const resume = () => { lastCheck = performance.now(); resize(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; lastCheck = performance.now(); if (visible) queue(); });
    const sizes = new ResizeObserver(resize);
    observer.observe(root);
    if (header) sizes.observe(header);
    if (content) sizes.observe(content);
    sizes.observe(sticky);
    // Count only visible foreground time, never background throttling.
    const watchdog = window.setInterval(() => {
      const now = performance.now();
      const elapsed = Math.min(now - lastCheck, 500);
      lastCheck = now;
      if (!enabled || !visible || document.hidden) return;
      const awaitingEnd = progress >= .7 && hasFrameCallback && presentedTime < film.duration - .1;
      const loading = film.readyState < 2;
      if (loading || film.seeking || awaitingEnd) {
        stalledMs += elapsed;
        if (stalledMs >= (loading ? 8000 : 2000)) fallback();
      } else stalledMs = 0;
    }, 250);
    film.addEventListener("loadedmetadata", mediaReady);
    film.addEventListener("seeked", seeked);
    film.addEventListener("loadeddata", mediaReady);
    film.addEventListener("error", fallback);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pageshow", resume);
    document.addEventListener("visibilitychange", resume);
    capable.addEventListener("change", configure);
    connection?.addEventListener?.("change", configure);
    configure();
    return () => {
      enabled = false;
      cancelAnimationFrame(frame);
      cancelVideoFrame();
      clearInterval(watchdog);
      observer.disconnect();
      sizes.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", resume);
      document.removeEventListener("visibilitychange", resume);
      capable.removeEventListener("change", configure);
      connection?.removeEventListener?.("change", configure);
      film.removeEventListener("loadedmetadata", mediaReady);
      film.removeEventListener("seeked", seeked);
      film.removeEventListener("loadeddata", mediaReady);
      film.removeEventListener("error", fallback);
    };
  }, []);

  return <section className="hero" ref={section} aria-label="Physical freight, digital control">
    <div className="hero-sticky">
      <div ref={scene} className="hero-scene">
        <Image className="hero-poster" src="/media/freight-poster.jpg" alt="psametra concept truck approaching across a rain-soaked logistics yard" fill priority fetchPriority="high" sizes="100vw" />
        <video ref={video} className="hero-video" muted playsInline preload="none" poster="/media/freight-poster.jpg" aria-hidden="true" tabIndex={-1} />
        <div className="hero-shade" />
        <div className="container hero-content"><div className="hero-intro"><p className="eyebrow"><span className="small-cross">+</span> PHYSICAL FREIGHT. DIGITAL CONTROL.</p><h1>Freight,<br />in full view.</h1><p className="hero-description">From first mile to final handover.<br />A clear path for your cargo.</p><div ref={actions} className="hero-actions"><Link className="btn btn-white" href="/quote">Get a quote <Icon name="diagonal" size={18} /></Link><Link className="hero-secondary" href="/track">Track shipment <Icon name="arrow" size={18} /></Link></div></div>
          <div className="hero-bottom"><a href="#connected" className="hero-scroll"><Icon name="down" size={17} /><span>EXPLORE THE JOURNEY</span></a><div className="hero-caption"><span>ROAD / AIR / SEA</span><span className="hero-meter"><i /><span ref={counter}>000</span> / 100</span></div></div>
        </div>
      </div>
      <div ref={destination} className="hero-destination">{children}</div>
      <div className="hero-transition" aria-hidden="true">{["upper", "lower"].map(half => <div key={half} className={`hero-panel hero-panel-${half}`}><div className="hero-mark-anchor"><svg className="hero-transition-mark" viewBox="0 0 100 100" fill="none"><path d="M43 10a41 41 0 0 0 0 80V76a27 27 0 0 1 0-52ZM57 10a41 41 0 0 1 0 80V76a27 27 0 0 0 0-52Z" fill="currentColor" /></svg></div></div>)}</div>
    </div>
  </section>;
}
