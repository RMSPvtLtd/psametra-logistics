"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { shipments } from "@/data/demo";

const steps = [
  { name: "Quote", title: "The right questions. A clearer start.", text: "Define your route, cargo and ready date. Give the next step the information it needs.", href: "/quote", action: "Start a freight inquiry" },
  { name: "Plan", title: "A plan everyone can follow.", text: "Review a quote, agree the next step and keep the booking details together.", href: "/portal-demo?tab=quotes", action: "Review a sample quote" },
  { name: "Move", title: "Cargo in motion. Context intact.", text: "Pickup, clearance and departure become meaningful checkpoints along the route.", href: "/services", action: "Explore freight modes" },
  { name: "Track", title: "Know where the journey stands.", text: "Follow the latest milestone and the next handover, without piecing together updates.", href: `/track?ref=${shipments[0].id}`, action: "Follow a sample journey" },
  { name: "Resolve", title: "An exception deserves a next step.", text: "See what changed, what it means and the action needed to keep a shipment moving.", href: "/platform", action: "Explore the control tower" },
  { name: "Close", title: "Every document. In its place.", text: "Bring shipment records, handover documents and invoices into one customer workspace.", href: "/portal-demo?tab=documents", action: "Open sample documents" },
];

export function Journey() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  return <div className="journey"><div className="journey-steps" role="group" aria-label="Explore the freight journey">{steps.map((step, i) => <button className={i === active ? "journey-step active" : "journey-step"} key={step.name} onClick={() => setActive(i)} aria-pressed={i === active} aria-controls="journey-detail"><span className="journey-node">{String(i + 1).padStart(2, "0")}</span><span>{step.name}</span></button>)}</div><div className="journey-detail" id="journey-detail" aria-live="polite"><span className="journey-large-number" aria-hidden="true">0{active + 1}</span><div><h3>{current.title}</h3><p>{current.text}</p><Link className="text-link" href={current.href}>{current.action}<Icon name="arrow" /></Link></div></div></div>;
}
