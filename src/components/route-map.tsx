import { useId } from "react";
import type { Shipment } from "@/data/demo";

const project = ([lon, lat]: [number, number]) => [(lon + 180) / 360 * 1000, (90 - lat) / 180 * 500];

export function RouteMap({ shipment }: { shipment: Shipment }) {
  const gridId = useId();
  const [x1, y1] = project(shipment.origin.coordinates);
  const [x2, y2] = project(shipment.destination.coordinates);
  const cy = Math.min(y1, y2) - Math.abs(x2 - x1) * .25;
  const points = shipment.routeWaypoints?.map(project) ?? (shipment.mode === 'Air'
    ? Array.from({ length: 33 }, (_, i) => {
      const t = i / 32;
      return [(1 - t) * x1 + t * x2, (1 - t) ** 2 * y1 + 2 * (1 - t) * t * cy + t ** 2 * y2];
    }) : [[x1, y1], [x2, y2]]);
  const path = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  const lengths = points.slice(1).map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]));
  const p = shipment.progress;
  let remaining = lengths.reduce((sum, length) => sum + length, 0) * p;
  let current = points[0];
  for (let i = 0; i < lengths.length; i++) {
    const t = lengths[i] ? Math.min(1, remaining / lengths[i]) : 0;
    current = points[i].map((value, axis) => value + (points[i + 1][axis] - value) * t);
    if (remaining <= lengths[i]) break;
    remaining -= lengths[i];
  }
  const xs = points.map(point => point[0]);
  const ys = points.map(point => point[1]);
  const width = Math.max(12, (Math.max(...xs) - Math.min(...xs)) * 1.45, (Math.max(...ys) - Math.min(...ys)) * 2.1 * 1.6);
  const height = width / 2.1;
  const left = (Math.min(...xs) + Math.max(...xs) - width) / 2;
  const top = (Math.min(...ys) + Math.max(...ys) - height) / 2;
  const unit = width / 220;
  return <div className="route-map"><div className="map-topline"><span className="eyebrow">{shipment.mode.toUpperCase()} FREIGHT / ROUTE OVERVIEW</span><span className="map-north">N ↑</span></div><svg viewBox={`${left} ${top} ${width} ${height}`} role="img" aria-label={`Illustrative ${shipment.mode.toLowerCase()} route from ${shipment.origin.city} to ${shipment.destination.city}; ${shipment.status.toLowerCase()}. Not real-time GPS.`}>
    <defs><pattern id={gridId} width={20 * unit} height={20 * unit} patternUnits="userSpaceOnUse"><path d={`M${20 * unit} 0H0V${20 * unit}`} fill="none" stroke="#c6cdc4" strokeWidth={.3 * unit} /></pattern></defs>
    <rect x={left} y={top} width={width} height={height} fill="#e9ece5" /><rect x={left} y={top} width={width} height={height} fill={`url(#${gridId})`} />
    <image href="/media/world.svg" x="0" y="0" width="1000" height="500" />
    <path d={path} fill="none" stroke="#5a6e9c" strokeWidth={.65 * unit} strokeDasharray={`${2 * unit} ${2 * unit}`} />
    <path d={path} fill="none" stroke="#254dff" strokeWidth={1.2 * unit} pathLength="100" strokeDasharray={`${p * 100} 100`} />
    {[[x1, y1], [x2, y2]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={3 * unit} fill="#f7f8f4" stroke="#254dff" strokeWidth={unit} /><text x={x} y={y + 9 * unit} textAnchor="middle" fontSize={5 * unit} fontWeight="600" fill="#252d2d">{i === 0 ? shipment.origin.code : shipment.destination.code}</text></g>)}
    {p > 0 && p < 1 && <g><circle cx={current[0]} cy={current[1]} r={6 * unit} fill="#254dff" fillOpacity=".13" /><circle cx={current[0]} cy={current[1]} r={2.7 * unit} fill="#254dff" stroke="white" strokeWidth={unit} /></g>}
  </svg><div className="map-bottomline"><span>{shipment.origin.city} <span aria-hidden="true">→</span> {shipment.destination.city}</span><span>ILLUSTRATIVE ROUTE · SAMPLE DATA</span></div></div>;
}
