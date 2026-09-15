"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark, Icon } from "./icon";

const links = [{ href: "/services", label: "Services" }, { href: "/platform", label: "Our platform" }, { href: "/about", label: "About" }];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return <header className="site-header">
    <div className="header-inner">
      <Link className="brand" href="/" aria-label="Psametra Logistics home" onClick={() => setOpen(false)}><BrandMark /><span>PSAMETRA{" "}<small>LOGISTICS</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
      <div className="header-actions"><Link className="header-track" href="/track">Track shipment <Icon name="diagonal" size={14} /></Link><Link className="header-portal" href="/portal-demo">Customer portal <Icon name="arrow" size={16} /></Link></div>
      <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
    </div>
    <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {[...links, { href: "/track", label: "Track shipment" }, { href: "/quote", label: "Get a quote" }, { href: "/portal-demo", label: "Customer portal" }, { href: "/contact", label: "Contact Psametra" }].map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.label}<Icon name="arrow" /></Link>)}
    </nav>
  </header>;
}
