import { formatTimestamp, type Shipment } from "@/data/demo";
import { DocumentList } from "./document-list";
import { RouteMap } from "./route-map";
import { Icon } from "./icon";

export function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status.toLowerCase().replaceAll(" ", "-")}`}><span />{status}</span>;
}

export function MilestoneRail({ shipment }: { shipment: Shipment }) {
  return <ol className="milestone-rail" aria-label="Shipment milestones">{shipment.milestones.map((milestone, i) => <li key={milestone.label} className={`milestone milestone-${milestone.state}`} aria-current={milestone.state === "current" ? "step" : undefined}><span className="milestone-dot">{milestone.state === "complete" ? <Icon name="check" size={12} /> : String(i + 1).padStart(2, "0")}</span><strong>{milestone.label}</strong><span>{milestone.location}</span><small>{milestone.at ? formatTimestamp(milestone.at) : "Upcoming"}</small></li>)}</ol>;
}

export function ShipmentDetail({ shipment, compact = false, showDocuments = true }: { shipment: Shipment; compact?: boolean; showDocuments?: boolean }) {
  return <article className={`shipment-detail${compact ? " shipment-compact" : ""}`}>
    <div className="shipment-heading"><div><p className="eyebrow">SHIPMENT REFERENCE</p><h2 className="shipment-id">{shipment.id}</h2></div><StatusBadge status={shipment.status} /></div>
    <div className="shipment-overview"><div className="shipment-summary">
    <div className="shipment-route"><div><span className="eyebrow">ORIGIN</span><strong>{shipment.origin.code}</strong><span>{shipment.origin.city}, {shipment.origin.country}</span></div><div className="route-mode"><Icon name={shipment.mode.toLowerCase() as "air" | "sea" | "road"} size={26} /><span>{shipment.mode} freight</span><span className="route-mode-line" /></div><div><span className="eyebrow">DESTINATION</span><strong>{shipment.destination.code}</strong><span>{shipment.destination.city}, {shipment.destination.country}</span></div></div>
    <dl className="shipment-facts"><div><dt>Current milestone</dt><dd>{shipment.currentMilestone}</dd></div><div><dt>Next milestone</dt><dd>{shipment.nextMilestone}</dd></div><div><dt>{shipment.status === "Delivered" ? "Delivered" : "Estimated arrival"}</dt><dd>{formatTimestamp(shipment.eta)}</dd></div><div><dt>Last update</dt><dd>{formatTimestamp(shipment.updatedAt)}</dd></div></dl>
    {shipment.exception && <aside className="exception-notice"><Icon name="alert" /><div><h3>{shipment.exception.title}</h3><p>{shipment.exception.message}</p><p><strong>Next action:</strong> {shipment.exception.nextAction}</p></div></aside>}
    </div><RouteMap shipment={shipment} /></div>
    <MilestoneRail shipment={shipment} />
    {!compact && <div className="shipment-support"><section><h3 className="panel-title">Shipment activity</h3><ol className="activity-list">{shipment.activity.map(item => <li key={item.at}><time dateTime={item.at}>{formatTimestamp(item.at)}</time><p>{item.message}</p></li>)}</ol></section><section><h3 className="panel-title">Cargo & references</h3><dl className="reference-list"><div><dt>Cargo</dt><dd>{shipment.cargo}</dd></div><div><dt>Gross weight</dt><dd>{shipment.weightKg.toLocaleString("en-GB")} kg</dd></div><div><dt>Pieces</dt><dd>{shipment.pieces}</dd></div>{shipment.references.map(ref => <div key={ref.label}><dt>{ref.label}</dt><dd className="mono">{ref.value}</dd></div>)}</dl></section></div>}
    {showDocuments && <section className="shipment-documents"><h3 className="panel-title">Shipment documents</h3><DocumentList ids={shipment.documentIds} publicOnly /></section>}
  </article>;
}
