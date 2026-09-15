import type { Metadata } from 'next';
import QuoteForm from '@/features/quote/QuoteForm';

export const metadata: Metadata = {
  title: 'Plan a freight inquiry',
  description: 'Try a four-step freight inquiry: route, cargo, contact and review. Prepare a local sample inquiry in the Psametra logistics demo.',
};

export default function QuotePage() {
  return <div className="container page-body">
    <section className="page-intro page-intro-split">
      <div><p className="eyebrow">GET A QUOTE / DEMO INQUIRY</p><h1>A better move<br />starts here.</h1></div>
      <p>Define the route and the cargo. This demo helps you prepare an inquiry summary; it does not send a request or calculate a freight rate.</p>
    </section>
    <QuoteForm />
  </div>;
}
