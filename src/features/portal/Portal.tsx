"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { DocumentList } from "../../components/document-list";
import { ShipmentDetail, StatusBadge } from "../../components/shipment-detail";
import { customers, demoDate, documents, formatDate, formatTimestamp, formatMoney, quotes, shipments, type Quote } from "../../data/demo";
import "./portal.css";

const sections = ["Shipments", "Quotes", "Documents", "Activity"] as const;
type Section = (typeof sections)[number];

export function Portal({ initialTab = "Shipments" }: { initialTab?: Section } = {}) {
  const customer = customers[0];
  const customerShipments = shipments.filter((shipment) => shipment.customerId === customer.id);
  const customerQuotes = quotes.filter((quote) => quote.customerId === customer.id);
  const customerDocuments = documents.filter((document) => customerShipments.some((shipment) => shipment.documentIds.includes(document.id)));
  const activity = customerShipments.flatMap((shipment) => shipment.activity.map((event) => ({ ...event, shipment }))).sort((a, b) => b.at.localeCompare(a.at));
  const [section, setSection] = useState<Section>(initialTab);
  const [filter, setFilter] = useState<"active" | "completed">("active");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(customerShipments[0]?.id);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const quoteDialog = useRef<HTMLDialogElement>(null);
  const sectionId = useId();
  const quoteTitleId = useId();
  const activeCount = customerShipments.filter((shipment) => shipment.status !== "Delivered").length;
  const completedCount = customerShipments.length - activeCount;
  const query = search.trim().toLowerCase();
  const visibleShipments = customerShipments.filter((shipment) =>
    (filter === "completed" ? shipment.status === "Delivered" : shipment.status !== "Delivered") &&
    [shipment.id, shipment.origin.city, shipment.destination.city, shipment.mode, ...shipment.references.map((reference) => reference.value)].some((value) => value.toLowerCase().includes(query)),
  );
  const selectedShipment = visibleShipments.find((shipment) => shipment.id === selectedId) ?? visibleShipments[0];
  const sectionCounts = [customerShipments.length, customerQuotes.length, customerDocuments.length, activity.length];

  useEffect(() => {
    if (selectedQuote && !quoteDialog.current?.open) quoteDialog.current?.showModal();
  }, [selectedQuote]);

  function quoteStatus(quote: Quote): Quote["status"] {
    if (acceptedIds.includes(quote.id) || quote.status === "Accepted") return "Accepted";
    if (quote.status === "Expired" || quote.validUntil.slice(0, 10) < demoDate) return "Expired";
    return "Awaiting acceptance";
  }

  function changeTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % sections.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + sections.length) % sections.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sections.length - 1;
    else return;
    event.preventDefault();
    setSection(sections[next]);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <section className="portal-workspace" aria-label="Customer portal preview">
      <aside className="portal-sidebar">
        <div className="portal-account">
          <span className="portal-avatar" aria-hidden="true">{customer.initials}</span>
          <div><strong>{customer.name}</strong><span>Sample customer workspace</span></div>
        </div>
        <div className="portal-tabs" role="tablist" aria-label="Customer workspace sections">
          {sections.map((item, index) => (
            <button key={item} id={`${sectionId}-${item}`} className="portal-tab" type="button" role="tab" aria-selected={section === item} aria-controls={`${sectionId}-panel`} tabIndex={section === item ? 0 : -1} onClick={() => setSection(item)} onKeyDown={(event) => changeTab(event, index)}>
              {item}<span className="portal-tab-count">{String(sectionCounts[index]).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <p className="portal-sidebar-note">Your freight.<br />One connected view.</p>
      </aside>

      <div className="portal-main">
        <div className="portal-heading">
          <div><p className="eyebrow">Customer workspace</p><h2>Your freight, in view.</h2></div>
          <p className="portal-snapshot">DEMO SNAPSHOT<br /><time dateTime={demoDate}>{formatDate(demoDate)}</time></p>
        </div>
        <p className="portal-demo-notice">Open preview · All customer, shipment and price data is fictional. No sign-in is required. Changes stay in this preview and reset when you leave or reload.</p>
        <div id={`${sectionId}-panel`} role="tabpanel" aria-labelledby={`${sectionId}-${section}`} tabIndex={0}>
          {section === "Shipments" && (
            <>
              <div className="portal-toolbar">
                <div className="portal-filters" aria-label="Shipment status filters">
                  <button className="portal-filter" type="button" aria-pressed={filter === "active"} onClick={() => setFilter("active")}>Active <span>({activeCount})</span></button>
                  <button className="portal-filter" type="button" aria-pressed={filter === "completed"} onClick={() => setFilter("completed")}>Completed <span>({completedCount})</span></button>
                </div>
                <input className="portal-search" type="search" aria-label="Search shipments by reference, city or mode" placeholder="Search reference, city or mode" value={search} onChange={(event) => setSearch(event.target.value)} />
              </div>
              {visibleShipments.length ? (
                <>
                  <div className="portal-list-heading" aria-hidden="true"><span>Shipment / mode</span><span>Route</span><span>Status</span><span className="portal-arrival">{filter === "completed" ? "Delivered" : "Est. arrival"}</span></div>
                  <ul className="portal-shipment-list" aria-label={`${filter === "active" ? "Active" : "Completed"} shipments`}>
                    {visibleShipments.map((shipment) => (
                      <li key={shipment.id}>
                        <button className="portal-shipment-row" type="button" aria-pressed={shipment.id === selectedShipment?.id} aria-label={`View ${shipment.id}, ${shipment.origin.city} to ${shipment.destination.city}, ${shipment.status}`} onClick={() => setSelectedId(shipment.id)}>
                          <span><strong>{shipment.id}</strong><small>{shipment.mode} freight</small></span>
                          <span className="portal-route">{shipment.origin.city} <span aria-hidden="true">→</span> {shipment.destination.city}</span>
                          <span className="portal-status"><StatusBadge status={shipment.status} /></span>
                          <span className="portal-arrival">{formatDate(shipment.eta)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="portal-empty" role="status">
                  <p>No {filter} shipments{query ? ` match “${search.trim()}”` : " to show"}.</p>
                  {query && <button className="btn btn-outline" type="button" onClick={() => setSearch("")}>Clear search</button>}
                </div>
              )}
              {selectedShipment && (
                <div className="portal-detail">
                  <div className="portal-detail-label"><h3>Shipment detail</h3><span>{selectedShipment.id}</span></div>
                  <ShipmentDetail shipment={selectedShipment} compact showDocuments={false} />
                  <div className="portal-document-heading"><h3>Shipment documents</h3><span>Sample records</span></div>
                  <DocumentList ids={selectedShipment.documentIds} />
                </div>
              )}
            </>
          )}

          {section === "Quotes" && (
            <>
              {!!acceptedIds.length && <p className="portal-accepted-notice" role="status">{acceptedIds[acceptedIds.length - 1]} marked Accepted in this preview. No booking or payment was created.</p>}
              <ul className="portal-quote-list" aria-label="Sample quotes">
                {customerQuotes.map((quote) => (
                  <li className="portal-quote-row" key={quote.id}>
                    <div>
                      <div className="portal-quote-meta"><span className="portal-quote-reference">{quote.id}</span><StatusBadge status={quoteStatus(quote)} /></div>
                      <h3>{quote.origin} → {quote.destination}</h3>
                      <p>{quote.mode} freight · {quote.cargo}</p>
                      <p>Valid until {formatDate(quote.validUntil)}</p>
                    </div>
                    <div className="portal-quote-side">
                      <div className="portal-quote-price">{formatMoney(quote.amount, quote.currency)}<small>Sample price · {quote.currency}</small></div>
                      <button className="btn btn-outline" type="button" aria-label={`View quote ${quote.id}`} onClick={() => setSelectedQuote(quote)}>View quote <span aria-hidden="true">↗</span></button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {section === "Documents" && (
            <div>
              <p className="muted portal-section-description">Shipment paperwork and example invoices, organized by journey.</p>
              {customerShipments.map((shipment) => (
                <section key={shipment.id} aria-label={`Documents for ${shipment.id}`}>
                  <div className="portal-document-heading"><h3>{shipment.origin.city} → {shipment.destination.city}</h3><span>{shipment.id}</span></div>
                  <DocumentList ids={shipment.documentIds} />
                </section>
              ))}
            </div>
          )}

          {section === "Activity" && (
            <ol className="portal-activity" aria-label="Shipment updates, newest first">
              {activity.map((event) => (
                <li key={`${event.shipment.id}-${event.at}`}>
                  <time dateTime={event.at}>{formatTimestamp(event.at)}</time>
                  <div><h3>{event.shipment.origin.city} → {event.shipment.destination.city} · {event.shipment.mode}</h3><p>{event.message}</p><p>{event.shipment.id}</p></div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <dialog ref={quoteDialog} className="sample-dialog" aria-labelledby={quoteTitleId} onClose={() => setSelectedQuote(null)} onClick={(event) => { if (event.target === event.currentTarget) quoteDialog.current?.close(); }}>
        {selectedQuote && (
          <div className="sample-document">
            <div className="sample-dialog-top"><span className="eyebrow">PSAMETRA / LOGISTICS</span><button className="dialog-close" type="button" aria-label="Close quote" onClick={() => quoteDialog.current?.close()}>×</button></div>
            <p className="document-sample-stamp">Sample quote · {selectedQuote.id}</p>
            <h2 id={quoteTitleId}>{selectedQuote.origin} → {selectedQuote.destination}</h2>
            <p className="sample-document-reference">{selectedQuote.mode} freight · {customer.name}</p>
            <dl className="sample-document-meta">
              <div><dt>Cargo</dt><dd>{selectedQuote.cargo}</dd></div>
              <div><dt>Ready date</dt><dd>{formatDate(selectedQuote.readyDate)}</dd></div>
              <div><dt>Valid until</dt><dd>{formatDate(selectedQuote.validUntil)}</dd></div>
              <div><dt>Sample price</dt><dd>{formatMoney(selectedQuote.amount, selectedQuote.currency)} {selectedQuote.currency}</dd></div>
            </dl>
            <div className="quote-confirmation">
              {quoteStatus(selectedQuote) === "Awaiting acceptance" ? (
                <>
                  <p>Accept this sample quote? This marks it Accepted only in this preview. No shipment is booked, no payment is taken, and the change resets when you leave or reload.</p>
                  <button className="btn btn-primary" type="button" onClick={() => { if (quoteStatus(selectedQuote) === "Awaiting acceptance") setAcceptedIds((ids) => [...ids, selectedQuote.id]); }}>Confirm sample acceptance <span aria-hidden="true">↗</span></button>
                </>
              ) : (
                <>
                  <p role="status">{quoteStatus(selectedQuote) === "Accepted" ? acceptedIds.includes(selectedQuote.id) ? "Accepted in this preview. No booking or payment was created." : "This sample quote is already marked Accepted." : "This sample quote has expired and cannot be accepted."}</p>
                  <button className="btn btn-outline" type="button" disabled>{quoteStatus(selectedQuote)}</button>
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
