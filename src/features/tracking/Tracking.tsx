"use client";

import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { findShipment, shipments } from "@/data/demo";
import { ShipmentDetail } from "@/components/shipment-detail";
import { Icon } from "@/components/icon";

export function Tracking() {
  const references = useSearchParams().getAll("ref");
  const searched = references.length === 1 ? references[0].trim().slice(0, 80) : "";
  const [error, setError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const shipment = findShipment(searched);
  function lookup(value: string) {
    if (!value.trim()) { setError("Enter a shipment reference, or choose a demo shipment below."); input.current?.focus(); return; }
    setError("");
    if (input.current) input.current.value = value.trim();
    const url = new URL(window.location.href);
    url.searchParams.set("ref", value.trim());
    window.history.replaceState(null, "", url);
    requestAnimationFrame(() => result.current?.focus({ preventScroll: true }));
  }
  function submit(event: FormEvent) { event.preventDefault(); lookup(input.current?.value ?? ""); }
  return <div className="tracking-layout"><div className="tracking-search"><form onSubmit={submit} noValidate><label htmlFor="shipment-reference">Shipment or booking reference</label><div className="tracking-input-row"><div className="tracking-input-wrap"><Icon name="search" /><input key={searched} ref={input} id="shipment-reference" name="reference" defaultValue={searched} onChange={() => setError("")} maxLength={80} placeholder="e.g. PSX-260914-001" autoComplete="off" spellCheck={false} aria-invalid={!!error} aria-describedby={error ? "reference-error" : "reference-hint"} /></div><button className="btn btn-primary" type="submit">Track shipment <Icon name="arrow" /></button></div><p id="reference-hint" className="muted">Explore a sample journey. This demo isn’t connected to carrier systems.</p>{error && <p className="field-error" id="reference-error" role="alert">{error}</p>}</form><div className="demo-references"><span className="eyebrow">TRY A DEMO SHIPMENT</span>{shipments.slice(0, 3).map(item => <button className="sample-reference" key={item.id} type="button" onClick={() => lookup(item.id)} aria-pressed={shipment?.id === item.id}>{item.mode} <span>{item.origin.code} → {item.destination.code}</span><Icon name="diagonal" size={14} /></button>)}</div></div>
    <div ref={result} className="tracking-result" tabIndex={-1} aria-live="polite">{shipment ? <ShipmentDetail shipment={shipment} /> : searched ? <div className="empty-state"><Icon name="search" size={32} /><h2>We couldn’t find that reference.</h2><p>“{searched}” doesn’t match a sample shipment. Check the reference or try the air freight demo.</p><button className="btn btn-dark" onClick={() => lookup(shipments[0].id)}>Try demo shipment <Icon name="arrow" /></button></div> : <div className="tracking-welcome"><span className="tracking-cross" aria-hidden="true">+</span><p className="eyebrow">FROM DEPARTURE TO ARRIVAL</p><h2>One reference.<br />The whole journey.</h2><p>See milestones, arrival estimates and shipment documents together.</p><button className="text-link" onClick={() => lookup(shipments[0].id)}>Try demo shipment <Icon name="arrow" /></button></div>}</div>
  </div>;
}
