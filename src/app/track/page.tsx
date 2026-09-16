import type { Metadata } from 'next';
import { connection } from 'next/server';
import { Tracking } from '@/features/tracking/Tracking';

export const metadata: Metadata = {
  title: 'Track a shipment',
  description: 'Follow a sample shipment from departure to arrival, with milestones, documents and clear customer updates in the Psametra logistics demo.',
};

export default async function TrackPage() {
  await connection();
  return <div className="container page-body">
    <section className="page-intro page-intro-split utility-intro">
      <div><p className="eyebrow">SHIPMENT VISIBILITY</p><h1>Every step. In full view.</h1></div>
      <p>From the latest milestone to the next handover. Enter a sample reference to explore the journey.</p>
    </section>
    <Tracking />
    <p className="page-note">Sample shipment data · This tracking experience is a demonstration by Psametra.</p>
  </div>;
}
