import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { company } from '@/data/demo';

export const metadata: Metadata = {
  title: 'Talk to Psametra',
  description: 'Talk to Psametra about a website and customer-facing software for your logistics business. Contact the team behind this demonstration experience.',
};

export default function ContactPage() {
  const emailLink = `mailto:${company.email}?subject=${encodeURIComponent('A logistics experience for my business')}`;
  return <div className="container contact-layout">
    <section className="contact-copy">
      <p className="eyebrow">YOUR BUSINESS / THE NEXT CONVERSATION</p>
      <h1>Let’s bring<br />your journey<br />into view.</h1>
      <p>Discuss a website and customer-facing software built around your logistics operation.</p>
      <p>This contact reaches Psametra for website and software projects. Freight inquiries on this site are local demonstrations only.</p>
      <ul className="contact-agenda" aria-label="Useful starting points for the conversation"><li><span>01</span>Your freight modes and customer journeys</li><li><span>02</span>The tasks your customers need to complete</li><li><span>03</span>The tools your operation already uses</li></ul>
    </section>
    <div className="contact-options">
      <section>
        <p className="eyebrow">CONTACT PSAMETRA</p>
        <h2>Start with a conversation.</h2>
        <p>Tell us about your business, the customer journey and the work you want to make clearer.</p>
        <a className="btn btn-primary" href={emailLink}>Email Psametra <Icon name="diagonal" size={18} /></a>
        <a className="contact-email" href={emailLink}>{company.email}</a>
        <a className="text-link" href={company.website}>Visit the Psametra website <Icon name="diagonal" size={17} /></a>
      </section>
      <section>
        <h2>Explore the experience first.</h2>
        <p>Try the sample freight inquiry to see how a route and cargo brief can come together. No freight request is submitted.</p>
        <Link className="text-link" href="/quote">Try the inquiry demo <Icon name="arrow" size={17} /></Link>
      </section>
    </div>
  </div>;
}
