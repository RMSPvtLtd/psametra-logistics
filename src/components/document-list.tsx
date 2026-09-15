"use client";

import { useEffect, useId, useRef, useState } from "react";
import { customers, documents, formatDate, formatMoney, shipments } from "../data/demo";
import "../features/portal/portal.css";

type SampleDocument = (typeof documents)[number];

export function DocumentList({ ids, publicOnly = false }: { ids: string[]; publicOnly?: boolean }) {
  const [selected, setSelected] = useState<SampleDocument | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const visibleDocuments = documents.filter((item) => ids.includes(item.id) && (!publicOnly || item.public));
  const shipment = selected ? shipments.find((item) => item.id === selected.shipmentId) : undefined;
  const customer = shipment && !publicOnly ? customers.find((item) => item.id === shipment.customerId) : undefined;

  useEffect(() => {
    if (selected && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);

  function downloadSample() {
    if (!selected || !shipment) return;
    const contents = [
      "PSAMETRA LOGISTICS — SAMPLE DOCUMENT",
      "Fictional demonstration data. Not valid for shipping, payment or customs clearance.",
      "",
      selected.name,
      `Reference: ${selected.reference}`,
      `Issued: ${formatDate(selected.issuedAt)}`,
      `Shipment: ${shipment.id}`,
      `Route: ${shipment.origin.city} → ${shipment.destination.city}`,
      ...(customer ? [`Customer: ${customer.name}`] : []),
      "",
      ...(selected.lines?.map((line) => `${line.description}: ${formatMoney(line.amount, selected.currency ?? "USD")}`) ?? []),
      ...(selected.amount !== undefined ? [`Total: ${formatMoney(selected.amount, selected.currency ?? "USD")}`] : []),
      "",
      "SAMPLE — FOR DEMONSTRATION ONLY",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([contents], { type: "text/plain;charset=utf-8" }));
    const link = window.document.createElement("a");
    link.href = url;
    link.download = `SAMPLE-${selected.reference}.txt`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="document-list">
      {visibleDocuments.length ? (
        <ul>
          {visibleDocuments.map((item) => (
            <li key={item.id} className="document-row">
              <span className="document-glyph" aria-hidden="true">↗</span>
              <div className="document-label">
                <strong>{item.name}</strong>
                <span>{item.reference} · {item.type}</span>
                {item.status === "Pending" && <small>Available after the next shipment milestone.</small>}
              </div>
              <button className="document-action" type="button" disabled={item.status !== "Ready"} onClick={() => setSelected(item)} aria-label={item.status === "Ready" ? `View ${item.name}, ${item.reference}` : `${item.name} is pending`}>
                {item.status === "Ready" ? "View ↗" : "Pending"}
              </button>
            </li>
          ))}
        </ul>
      ) : <p className="portal-empty">No documents available for this shipment yet.</p>}

      <dialog ref={dialog} className="sample-dialog" aria-labelledby={titleId} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        {selected && shipment && (
          <div className="sample-document">
            <div className="sample-dialog-top">
              <span className="eyebrow">PSAMETRA / LOGISTICS</span>
              <button className="dialog-close" type="button" aria-label="Close document" onClick={() => dialog.current?.close()}>×</button>
            </div>
            <p className="document-sample-stamp">Sample document</p>
            <h2 id={titleId}>{selected.name}</h2>
            <p className="sample-document-reference">{selected.reference}</p>
            <dl className="sample-document-meta">
              <div><dt>Shipment</dt><dd>{shipment.id}</dd></div>
              <div><dt>Issued</dt><dd>{formatDate(selected.issuedAt)}</dd></div>
              <div><dt>Route</dt><dd>{shipment.origin.city} → {shipment.destination.city}</dd></div>
              {customer && <div><dt>Customer</dt><dd>{customer.name}</dd></div>}
            </dl>
            {!!selected.lines?.length && (
              <table className="invoice-lines">
                <caption>Sample invoice charges</caption>
                <thead><tr><th scope="col">Description</th><th scope="col">Amount</th></tr></thead>
                <tbody>{selected.lines.map((line, index) => <tr key={index}><td>{line.description}</td><td>{formatMoney(line.amount, selected.currency ?? "USD")}</td></tr>)}</tbody>
                {selected.amount !== undefined && <tfoot><tr><th scope="row">Total</th><td>{formatMoney(selected.amount, selected.currency ?? "USD")}</td></tr></tfoot>}
              </table>
            )}
            <p className="sample-document-notice">Fictional demonstration data. This sample is not valid for shipping, payment or customs clearance.</p>
            <button className="btn btn-dark" type="button" onClick={downloadSample}>Download sample .txt <span aria-hidden="true">↓</span></button>
          </div>
        )}
      </dialog>
    </div>
  );
}
