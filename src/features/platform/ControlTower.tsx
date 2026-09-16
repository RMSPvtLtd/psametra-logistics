"use client";

import Link from "next/link";
import { useState } from "react";
import { shipments, formatDate, demoDate } from "@/data/demo";
import { StatusBadge } from "@/components/shipment-detail";
import { RouteMap } from "@/components/route-map";
import { BrandMark, Icon } from "@/components/icon";

const filters = ["Needs attention", "At risk", "On hold", "In transit"] as const;
type Filter = typeof filters[number];
const matching = (filter: Filter) => shipments.filter(shipment => filter === "Needs attention" ? !!shipment.exception : shipment.status === filter);

export function ControlTower() {
  const [filter, setFilter] = useState<Filter>("Needs attention");
  const [selectedId, setSelectedId] = useState("");
  const visible = matching(filter);
  const selected = visible.find(shipment => shipment.id === selectedId) ?? visible[0];
  return <div className="control-tower"><div className="tower-top"><div><BrandMark /><span>psametra / CONTROL TOWER</span></div><span className="eyebrow">DEMO SNAPSHOT · {formatDate(demoDate)}</span></div><div className="tower-heading"><div><h2>The next action comes first.</h2><p>Illustrative operations view · all shipment data is fictional.</p></div><Link href="/portal-demo" className="text-link">Switch to customer view <Icon name="arrow" size={17} /></Link></div><div className="tower-filters" role="group" aria-label="Filter operations queue">{filters.map(item => <button key={item} className="tower-filter" aria-pressed={filter === item} onClick={() => { setFilter(item); setSelectedId(""); }}>{item}<span>{matching(item).length}</span></button>)}</div><div className="tower-workspace"><div className="tower-queue" role="group" aria-label="Shipment work queue">{visible.map(shipment => <button className="tower-shipment" key={shipment.id} aria-pressed={selected?.id === shipment.id} onClick={() => setSelectedId(shipment.id)}><span><span className="mono">{shipment.id}</span><StatusBadge status={shipment.status} /></span><strong>{shipment.origin.city} → {shipment.destination.city}</strong><small>{shipment.exception?.title ?? shipment.currentMilestone}</small><small className="queue-action">{shipment.exception?.nextAction ?? `Next: ${shipment.nextMilestone}`}</small><small className="queue-eta">{shipment.mode.toUpperCase()} / EST. ARRIVAL {formatDate(shipment.eta)}</small></button>)}</div>{selected && <section className="tower-detail" aria-live="polite"><p className="eyebrow">{selected.mode} FREIGHT / NEXT ACTION</p><h3>{selected.exception?.title ?? selected.nextMilestone}</h3>{selected.exception ? <aside className="exception-notice"><Icon name="alert" /><div><p>{selected.exception.message}</p><p><strong>Next action:</strong> {selected.exception.nextAction}</p></div></aside> : <p className="page-note">Current: {selected.currentMilestone}. Next: {selected.nextMilestone}.</p>}<dl className="tower-context"><div><dt>Current milestone</dt><dd>{selected.currentMilestone}</dd></div><div><dt>Estimated arrival</dt><dd>{formatDate(selected.eta)}</dd></div></dl><RouteMap shipment={selected} /><Link className="text-link" href={`/track?ref=${selected.id}`}>View customer-safe update <Icon name="arrow" /></Link></section>}</div></div>;
}
