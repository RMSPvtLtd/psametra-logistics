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
  return <div className="container page-body">
    <section className="page-intro page-intro-split">
      <div><p className="eyebrow">AIR / SEA / ROAD</p><h1>Different routes.<br />One clear journey.</h1></div>
      <p>Explore how each freight mode connects cargo, handovers and information. Example service experiences for a logistics business.</p>
    </section>
    <div className="services-page-list">
      {services.map((service, index) => <section id={service.id} className="service-detail" key={service.id}>
        <div className="service-detail-visual"><div className="service-detail-image"><Image src={imagery[service.id].src} alt={imagery[service.id].alt} fill loading={index === 0 ? 'eager' : 'lazy'} sizes="(max-width: 767px) 100vw, 50vw" /><span className="service-image-index" aria-hidden="true">0{index + 1} / {service.id.toUpperCase()}</span></div><Link className="service-route-caption" href={`/track?ref=${shipments[index].id}`}><span><span className="eyebrow">EXPLORE A SAMPLE MOVEMENT</span><strong>{shipments[index].origin.city} → {shipments[index].destination.city}</strong></span><Icon name="diagonal" size={20} /></Link></div>
        <div className="service-detail-copy">
          <p className="eyebrow">{service.eyebrow}</p>
          <h2>{service.name}</h2>
          <p>{service.description} {service.detail}</p>
          <ul>{service.features.map((feature) => <li key={feature}><Icon name="check" size={16} />{feature}</li>)}</ul>
          <Link className="text-link" href="/quote">Plan a {service.id} freight inquiry <Icon name="diagonal" size={18} /></Link>
        </div>
      </section>)}
    </div>
    <div className="supporting-services">
      <section><h3>Clearance has a place in the journey.</h3><p>Required documents, clearance milestones and outstanding actions can sit alongside the shipment they belong to.</p></section>
      <section><h3>Make every handover visible.</h3><p>Collection readiness, warehouse receipt and final delivery can become clear checkpoints for the customer and the operations team.</p></section>
    </div>
    <p className="page-note">This is a logistics concept by Psametra. The freight services and journeys shown are demonstration content.</p>
  </div>;
}
