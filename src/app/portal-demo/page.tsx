import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { Portal } from '@/features/portal/Portal';

export const metadata: Metadata = {
  title: 'Customer portal demo',
  description: 'Explore sample shipments, quotes, documents and activity in a connected customer workspace. A logistics portal concept by psametra.',
};

export default async function PortalPage({ searchParams }: { searchParams: Promise<{ tab?: string | string[] }> }) {
  const { tab } = await searchParams;
  const requestedTab = typeof tab === 'string' ? tab.trim().toLowerCase() : '';
  const initialTab = (['Shipments', 'Quotes', 'Documents', 'Activity'] as const).find((section) => section.toLowerCase() === requestedTab) ?? 'Shipments';
  return <div className="container page-body">
    <section className="portal-page-intro">
      <div><p className="eyebrow">CONNECTED CUSTOMER WORKSPACE / DEMO</p><h1>Customer portal</h1></div>
      <Link className="text-link" href="/quote">Plan a new inquiry <Icon name="diagonal" size={16} /></Link>
    </section>
    <Portal key={initialTab} initialTab={initialTab} />
  </div>;
}
