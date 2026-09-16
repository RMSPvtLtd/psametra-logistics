"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { shipments, quotes, documents, formatDate } from "@/data/demo";

const steps = [
  { name: "Quote", title: "The right questions. A clearer start.", text: "Define your route, cargo and ready date. Give the next step the information it needs.", href: "/quote", action: "Start a freight inquiry" },
  { name: "Plan", title: "A plan everyone can follow.", text: "Review a quote, agree the next step and keep the booking details together.", href: "/portal-demo?tab=quotes", action: "Review a sample quote" },
  { name: "Move", title: "Cargo in motion. Context intact.", text: "Pickup, clearance and departure become meaningful checkpoints along the route.", href: "/services", action: "Explore freight modes" },
  { name: "Track", title: "Know where the journey stands.", text: "Follow the latest milestone and the next handover, without piecing together updates.", href: `/track?ref=${shipments[0].id}`, action: "Follow a sample journey" },
  { name: "Resolve", title: "An exception deserves a next step.", text: "See what changed, what it means and the action needed to keep a shipment moving.", href: "/platform", action: "Explore the control tower" },
  { name: "Close", title: "Every document. In its place.", text: "Bring shipment records, handover documents and invoices into one customer workspace.", href: "/portal-demo?tab=documents", action: "Open sample documents" },
];

const sample = shipments[1];
const handoffs = [
  [['Cargo brief', sample.cargo], ['Route', `${sample.origin.city} → ${sample.destination.city}`]],
  [['Sample quote', quotes[1].id], ['Quote status', quotes[1].status]],
  [['Current milestone', sample.currentMilestone], ['Next handover', sample.nextMilestone]],
  [['Shipment status', sample.status], ['Estimated arrival', formatDate(sample.eta)]],
  [['Exception', sample.exception!.title], ['Next action', sample.exception!.nextAction]],
  [['Shipping record', documents.find(document => document.id === sample.documentIds[0])!.name], ['Shipment reference', sample.id]],
];

export function Journey() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  return <div className="journey"><div className="journey-steps" role="group" aria-label="Explore the freight journey">{steps.map((step, i) => <button className={`journey-step${i === active ? " active" : i < active ? " is-past" : ""}`} key={step.name} onClick={() => setActive(i)} aria-pressed={i === active} aria-controls="journey-detail"><span className="journey-node">{String(i + 1).padStart(2, "0")}</span><span>{step.name}</span></button>)}</div><div className="journey-detail" id="journey-detail" aria-live="polite"><aside className="journey-record"><p className="eyebrow">ILLUSTRATIVE JOURNEY / SEA FREIGHT</p><strong>{sample.origin.code}<span aria-hidden="true">→</span>{sample.destination.code}</strong><dl>{handoffs[active].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></aside><div><p className="eyebrow">{String(active + 1).padStart(2, '0')} / {current.name}</p><h3>{current.title}</h3><p>{current.text}</p><Link className="text-link" href={active === 3 ? `/track?ref=${sample.id}` : current.href}>{current.action}<Icon name="arrow" /></Link></div></div></div>;
}
