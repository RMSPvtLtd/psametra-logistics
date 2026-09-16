import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { services, shipments } from '@/data/demo';

export const metadata: Metadata = {
  title: 'Freight services',
  description: 'Explore air, sea and road freight journeys in a connected logistics website concept by Psametra.',
};

const imagery = {
  air: { src: '/media/air-freight.webp', alt: 'Cargo aircraft on an airport apron' },
  sea: { src: '/media/sea-freight.jpg', alt: 'Container vessel carrying freight at sea' },
  road: { src: '/media/freight-poster.jpg', alt: 'Psametra concept truck in a warehouse yard' },
};

export default function ServicesPage() {
  return <div className="container page-body services-page">
    <section className="services-intro">
      <p className="eyebrow">Freight services</p>
      <div className="services-intro-copy">
        <h1>Air. Sea. Road.</h1>
        <p>Explore how each freight mode connects cargo, handovers and information. Example service experiences for a logistics business.</p>
      </div>
      <nav className="services-nav" aria-label="Freight modes">
        {services.map((service) => <a key={service.id} href={`#${service.id}`}>{service.name}</a>)}
      </nav>
    </section>
    <div className="services-page-list">
      {services.map((service, index) => {
        const sample = shipments.find((shipment) => shipment.mode.toLowerCase() === service.id);
        return <section id={service.id} className="service-detail" key={service.id} aria-labelledby={`${service.id}-heading`}>
          <div className="service-detail-heading">
            <h2 id={`${service.id}-heading`}>{service.name}</h2>
            <p className="eyebrow">{service.eyebrow}</p>
          </div>
          <div className="service-detail-image">
            <Image src={imagery[service.id].src} alt={imagery[service.id].alt} fill loading={index === 0 ? 'eager' : 'lazy'} sizes="(max-width: 488px) calc(100vw - 44px), (max-width: 1600px) 91vw, 1456px" />
            <span className="service-image-meta" aria-hidden="true"><span>0{index + 1}</span><span>{service.id.toUpperCase()} / FREIGHT EXPERIENCE</span></span>
          </div>
          <div className="service-detail-body">
            <div className="service-detail-copy">
              <p className="service-detail-lead">{service.description}</p>
              <p>{service.detail}</p>
              <Link className="text-link" href="/quote">Plan your {service.id} shipment <Icon name="diagonal" size={18} /></Link>
            </div>
            <div className="service-detail-facts">
              <ul>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              {sample && <Link className="service-route-caption" href={`/track?ref=${sample.id}`}>
                <span><span className="eyebrow">Sample movement</span><strong>{sample.origin.city} → {sample.destination.city}</strong></span>
                <Icon name="diagonal" size={20} />
              </Link>}
            </div>
          </div>
        </section>;
      })}
    </div>
    <div className="supporting-services">
      <section><h3>Clearance has a place in the journey.</h3><p>Required documents, clearance milestones and outstanding actions can sit alongside the shipment they belong to.</p></section>
      <section><h3>Make every handover visible.</h3><p>Collection readiness, warehouse receipt and final delivery can become clear checkpoints for the customer and the operations team.</p></section>
    </div>
    <p className="page-note">This is a logistics concept by Psametra. The freight services and journeys shown are demonstration content.</p>
  </div>;
}
