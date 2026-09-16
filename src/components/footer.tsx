import Link from "next/link";
import { company } from "@/data/demo";
import { BrandMark, Icon } from "./icon";

export function Conversion() {
  return <section className="conversion"><div className="container conversion-inner"><div><p className="eyebrow">YOUR OPERATION. YOUR BRAND. YOUR CUSTOMER JOURNEY.</p><h2>Imagine this built<br />around your business.</h2></div><div className="conversion-aside"><p>A premium public website. Customer tools that actually work. One connected experience shaped around your logistics operation.</p><Link className="btn btn-white" href="/contact">Talk to psametra <Icon name="diagonal" /></Link></div></div></section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><Link className="brand" href="/"><BrandMark /><span>psametra<small>LOGISTICS</small></span></Link><p>Physical freight.<br /><span>Digital control.</span></p><nav aria-label="Footer navigation"><Link href="/services">Services</Link><Link href="/track">Track shipment</Link><Link href="/quote">Get a quote</Link><Link href="/platform">Our platform</Link><Link href="/portal-demo">Customer portal</Link><Link href="/contact">Contact</Link></nav></div><div className="footer-bottom"><p>A logistics experience by <a href={company.website}>psametra <span aria-hidden="true">↗</span></a>. Concept website; all shipment data is fictional.</p><Link href="/about">About this experience <Icon name="diagonal" size={12} /></Link><span>© 2026 psametra</span></div></div></footer>;
}
