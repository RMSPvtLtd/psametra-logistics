import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';

export const metadata: Metadata = {
  title: 'About this experience',
  description: 'A logistics website and software concept by Psametra, connecting the public freight experience with shipment visibility and customer workflows.',
};

export default function AboutPage() {
  return <div className="container">
    <section className="page-intro about-hero">
      <p className="eyebrow">A LOGISTICS EXPERIENCE BY PSAMETRA</p>
      <h1>Built around<br />the whole journey.</h1>
      <p>Physical freight and digital clarity, brought together in one connected experience.</p>
    </section>
    <figure className="about-figure"><div className="about-photo"><Image src="/media/sea-freight.jpg" alt="Container vessel at sea, illustrating the physical freight journey" fill loading="eager" sizes="100vw" /></div><figcaption><span className="eyebrow">PHYSICAL FREIGHT / DIGITAL CONTINUITY</span><span>One experience, from public website to customer workspace.</span></figcaption></figure>
    <section className="about-story">
      <div><p className="eyebrow">THE IDEA BEHIND THE EXPERIENCE</p><h2>A clearer view.<br />From first inquiry<br />to final handover.</h2></div>
      <div>
        <p>A logistics website can do more than introduce a service. It can help a customer prepare an inquiry, follow a shipment, understand an exception and find the right document.</p>
        <p>Psametra created this concept to show those moments working together. Customer records, shipment journeys, quotes and freight documents in the demo are fictional. Psametra builds the website and software experience for a logistics business.</p>
        <Link className="text-link" href="/contact">Build this around your business <Icon name="diagonal" size={18} /></Link>
      </div>
    </section>
    <div className="about-facts">
      <div><h3>A useful front door.</h3><p>Services, inquiry and tracking give customers a clear place to begin.</p></div>
      <div><h3>A connected workspace.</h3><p>Shipments, milestones, quotes and documents share the same journey.</p></div>
      <div><h3>Made for your operation.</h3><p>The next conversation is about your business, your customers and the work you need to support.</p></div>
    </div>
  </div>;
}
