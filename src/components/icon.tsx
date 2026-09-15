import type { CSSProperties } from "react";

const paths = {
  arrow: "M4 12h15m-6-6 6 6-6 6",
  diagonal: "M5 19 19 5M5 5h14v14",
  down: "M12 4v16m-6-6 6 6 6-6",
  search: "M21 21l-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  air: "m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2",
  sea: "M4 11V5h16v6M8 5V2h8v3M2 12l10-3 10 3-4 7H6l-4-7ZM2 22c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2",
  road: "M1 5h13v12H1V5Zm13 4h5l4 5v3h-9M7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0m14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  check: "m5 12 4 4L19 6",
  plus: "M12 4v16M4 12h16",
  close: "m6 6 12 12M6 18 18 6",
  menu: "M3 6h18M3 12h18M3 18h18",
  document: "M14 2H4v20h16V8l-6-6Zm0 0v6h6M8 12h8M8 16h8",
  clock: "M12 7v5l3 2m7-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  alert: "m12 3 10 18H2L12 3Zm0 5v6m0 3v1",
} as const;

export function Icon({ name, size = 20, style }: { name: keyof typeof paths; size?: number; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name]} /></svg>;
}

export function BrandMark() {
  return <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M20 5a19.4 19.4 0 0 0 0 38v-7a12.5 12.5 0 0 1 0-24V5ZM28 5a19.4 19.4 0 0 1 0 38v-7a12.5 12.5 0 0 0 0-24V5Z" fill="currentColor" /></svg>;
}
