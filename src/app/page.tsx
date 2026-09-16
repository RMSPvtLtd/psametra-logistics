import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/features/hero/Hero";
import { Journey } from "@/features/journey/Journey";
import { Icon } from "@/components/icon";
import { Conversion } from "@/components/footer";
import { RouteMap } from "@/components/route-map";
import { StatusBadge } from "@/components/shipment-detail";
import { services, shipments, formatDate } from "@/data/demo";

export default function Home() {
  const featured = shipments.find(shipment => shipment.status === "At risk")!;
  return <>
    <Hero><div className="container hero-reveal"><p className="eyebrow">FREIGHT IS ONLY PART OF THE JOURNEY.</p><h2>Everything moving.<br />Everything connected.</h2><p>A quote, a handover, a change of plan. Bring every step into one clear view.</p><div className="utility-strip"><Link href="/track"><span className="eyebrow">01 / STAY INFORMED</span><strong>Track a shipment</strong><Icon name="diagonal" size={23} /></Link><Link href="/quote"><span className="eyebrow">02 / PLAN AHEAD</span><strong>Get a freight quote</strong><Icon name="diagonal" size={23} /></Link><Link href="/portal-demo"><span className="eyebrow">03 / TAKE CONTROL</span><strong>Your customer portal</strong><Icon name="diagonal" size={23} /></Link></div></div></Hero>
    <section className="container home-freight" id="connected" aria-labelledby="freight-heading">
      <div className="home-freight-copy">
        <p className="eyebrow">Across air, sea and road</p>
        <h2 id="freight-heading">Freight beyond<br />the first mile.</h2>
        <p>From an urgent departure to the final handover. Explore the routes, services and information that connect a shipment.</p>
        <div className="home-modes">{services.map(service => <Link key={service.id} href={`/services#${service.id}`}>
          <div><h3>{service.name}</h3><p>{service.description}</p></div><Icon name="diagonal" size={22} />
        </Link>)}</div>
      </div>
      <figure className="home-freight-figure">
        <div className="home-freight-image"><Image src="/media/sea-freight.jpg" alt="Container ship crossing open water" fill sizes="(max-width:767px) 100vw, 50vw" /><span className="home-freight-image-label" aria-hidden="true">SEA FREIGHT / GLOBAL MOVEMENT</span></div>
        <figcaption>Every departure is part of a longer journey.</figcaption>
      </figure>
    </section>
    <section className="container home-journey" aria-labelledby="journey-heading">
      <div className="home-section-heading"><p className="eyebrow">The connected journey</p><div><h2 id="journey-heading">From the first inquiry<br />to the final document.</h2><p>Six connected steps. Explore the decisions and handovers behind each movement.</p></div></div>
      <Journey />
    </section>
    <section className="home-product" aria-labelledby="product-heading"><div className="container">
      <div className="home-section-heading"><p className="eyebrow">Physical freight. Digital control.</p><div><h2 id="product-heading">The whole picture.<br />One place to look.</h2><p>Follow a shipment, understand a change of plan, and find the next action. A connected view for customers and operations.</p></div></div>
      <div className="home-shipment">
        <div className="home-shipment-summary">
          <p className="eyebrow">Sample shipment · {featured.mode} freight</p>
          <h3>{featured.origin.city}<span aria-hidden="true">↓</span><span className="visually-hidden"> to </span>{featured.destination.city}</h3>
          <div className="home-shipment-reference"><span className="mono">{featured.id}</span><StatusBadge status={featured.status} /></div>
          <dl><div><dt>Current milestone</dt><dd>{featured.currentMilestone}</dd></div><div><dt>Estimated arrival</dt><dd>{formatDate(featured.eta)}</dd></div><div><dt>Next handover</dt><dd>{featured.nextMilestone}</dd></div></dl>
          <Link className="text-link" href={`/track?ref=${featured.id}`}>Follow this shipment <Icon name="arrow" /></Link>
        </div>
        <div className="home-shipment-map"><RouteMap shipment={featured} /><p className="page-note">Fictional shipment · {formatDate(featured.updatedAt)} snapshot</p></div>
      </div>
      <div className="home-shipment-update"><Icon name="alert" size={22} /><div><h3>{featured.exception!.title}</h3><p>{featured.exception!.message}</p><p><strong>Next action:</strong> {featured.exception!.nextAction}</p></div><Link className="text-link" href="/platform">Manage exceptions <Icon name="arrow" /></Link></div>
      <div className="home-workspace"><p>Keep the rest of the journey together.<span>Shipments, quotes, documents and invoices in one customer workspace.</span></p><Link className="text-link" href="/portal-demo">Open the customer portal <Icon name="arrow" /></Link></div>
    </div></section>
    <section className="experience-proof" aria-labelledby="experience-proof-heading">
      <div className="container experience-proof-inner">
        <div className="experience-proof-copy">
          <p className="eyebrow">A working experience</p>
          <h2 id="experience-proof-heading">See the system.<br />Not just the surface.</h2>
          <p>Track a shipment, build an inquiry, open the customer workspace and switch to the operations view. Each path belongs to the same fictional freight journey.</p>
        </div>
        <div className="experience-proof-links">
          <Link href={`/track?ref=${featured.id}`}><span className="mono">01</span><span><strong>Shipment tracking</strong><small>Status, milestones and exceptions.</small></span><Icon name="diagonal" size={20} /></Link>
          <Link href="/quote"><span className="mono">02</span><span><strong>Freight inquiry</strong><small>A complete route-to-review flow.</small></span><Icon name="diagonal" size={20} /></Link>
          <Link href="/portal-demo"><span className="mono">03</span><span><strong>Customer workspace</strong><small>Shipments, quotes and documents together.</small></span><Icon name="diagonal" size={20} /></Link>
          <Link href="/platform"><span className="mono">04</span><span><strong>Operations view</strong><small>Exceptions and next actions first.</small></span><Icon name="diagonal" size={20} /></Link>
        </div>
      </div>
    </section>
    <Conversion />
  </>;
}
