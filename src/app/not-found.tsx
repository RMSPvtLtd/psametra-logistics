import Link from "next/link";
export default function NotFound() {
  return <section className="container page-intro not-found"><p className="eyebrow">404 / OFF ROUTE</p><h1>Let’s get you<br />back on track.</h1><p>This page isn’t part of the journey.</p><Link href="/" className="btn btn-dark">Return home <span aria-hidden="true">→</span></Link></section>;
}
