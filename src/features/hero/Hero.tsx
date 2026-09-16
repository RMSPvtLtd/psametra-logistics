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
    const capable = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let frame = 0;
    let visible = true;
    let enabled = false;
    const update = () => {
      frame = 0;
      if (!enabled || !visible) return;
      const bounds = root.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (80 - bounds.top) / (root.offsetHeight - film.clientHeight)));
      const target = heroPhase(progress);
      if (film.readyState >= 1 && Number.isFinite(film.duration) && !film.seeking) {
        const time = Math.min(film.duration - .045, target.film * film.duration);
        if (Math.abs(film.currentTime - time) > .045) film.currentTime = time;
      }
      // Keep the grille visible until the final frame has actually decoded.
      const settled = film.readyState >= 2 && !film.seeking && film.currentTime >= film.duration - .1;
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
      const scale = Math.max(film.clientWidth / 1920, film.clientHeight / 1080);
      const filmedY = 350 * scale + (film.clientHeight - 1080 * scale) * .55;
      const filmedSize = 490 * scale;
      const fittedSize = Math.min(filmedSize, film.clientHeight * .64, film.clientWidth * .64);
      root.style.setProperty("--mark-y", `${filmedY + (film.clientHeight / 2 - filmedY) * phase.cover}px`);
      root.style.setProperty("--mark-size", `${filmedSize + (fittedSize - filmedSize) * phase.cover}px`);
    };
    const queue = () => { if (!frame && enabled) frame = requestAnimationFrame(update); };
    const fallback = () => {
      enabled = false;
      root.dataset.scrub = "false";
      root.removeAttribute("style");
      next.inert = false;
      if (actions.current) actions.current.inert = false;
      if (scene.current) scene.current.inert = false;
      film.removeAttribute("src");
    };
    const configure = () => {
      if (!capable.matches || connection?.saveData) { fallback(); film.load(); return; }
      enabled = true;
      root.dataset.scrub = "true";
      next.inert = true;
      film.src = "/media/freight-film.mp4";
      film.load();
      queue();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) queue(); });
    observer.observe(root);
    film.addEventListener("loadedmetadata", queue);
    film.addEventListener("seeked", queue);
    film.addEventListener("loadeddata", queue);
    film.addEventListener("error", fallback);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    capable.addEventListener("change", configure);
    configure();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); capable.removeEventListener("change", configure); film.removeEventListener("loadedmetadata", queue); film.removeEventListener("seeked", queue); film.removeEventListener("loadeddata", queue); film.removeEventListener("error", fallback); };
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
