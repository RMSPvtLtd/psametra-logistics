export type Mode = 'Air' | 'Sea' | 'Road';
type Location = { city: string; code: string; country: string; coordinates: [number, number] };
export type Shipment = {
  id: string;
  customerId: string;
  origin: Location;
  destination: Location;
  routeWaypoints?: [number, number][];
  mode: Mode;
  status: 'In transit' | 'At risk' | 'On hold' | 'Delivered';
  cargo: string;
  weightKg: number;
  pieces: number;
  eta: string;
  updatedAt: string;
  currentMilestone: string;
  nextMilestone: string;
  progress: number;
  references: { label: string; value: string }[];
  milestones: { label: string; location: string; at?: string; state: 'complete' | 'current' | 'upcoming' }[];
  activity: { at: string; message: string }[];
  exception?: { title: string; message: string; nextAction: string };
  documentIds: string[];
};
export type Customer = { id: string; name: string; initials: string };
export type Document = {
  id: string; shipmentId: string; name: string; type: 'Shipping' | 'Invoice' | 'Customs';
  reference: string; issuedAt: string; status: 'Ready' | 'Pending'; public: boolean;
  amount?: number; currency?: string; lines?: { description: string; amount: number }[];
};
export type Quote = {
  id: string; customerId: string; origin: string; destination: string; mode: Mode;
  amount: number; currency: string; status: 'Awaiting acceptance' | 'Accepted' | 'Expired';
  validUntil: string; cargo: string; readyDate: string;
};

export const demoDate = '2026-09-14';
export const company = { name: 'psametra', email: 'rmspvtltd.software@gmail.com', website: 'https://psametra-website.vercel.app/' };
export const customers: Customer[] = [{ id: 'customer-meridian', name: 'Meridian Components', initials: 'MC' }];

const lahore: Location = { city: 'Lahore', code: 'LHE', country: 'Pakistan', coordinates: [74.36, 31.52] };
const dubai: Location = { city: 'Dubai', code: 'DXB', country: 'United Arab Emirates', coordinates: [55.36, 25.25] };
const karachi: Location = { city: 'Karachi', code: 'KHI', country: 'Pakistan', coordinates: [67.01, 24.86] };
const rotterdam: Location = { city: 'Rotterdam', code: 'RTM', country: 'Netherlands', coordinates: [4.48, 51.92] };
const sialkot: Location = { city: 'Sialkot', code: 'SKT', country: 'Pakistan', coordinates: [74.53, 32.49] };

export const shipments: Shipment[] = [
  {
    id: 'PSX-260914-001', customerId: 'customer-meridian', origin: lahore, destination: dubai,
    mode: 'Air', status: 'In transit', cargo: 'Precision components · 12 cartons', weightKg: 340, pieces: 12,
    eta: '2026-09-14T12:20:00Z', updatedAt: '2026-09-14T09:40:00Z',
    currentMilestone: 'Airborne', nextMilestone: 'Arrival at DXB', progress: 0.62,
    references: [{ label: 'Air waybill', value: 'PSX-AWB-0914-01' }, { label: 'Purchase order', value: 'MC-PO-2084' }],
    milestones: [
      { label: 'Collected', location: 'Lahore', at: '2026-09-13T08:00:00Z', state: 'complete' },
      { label: 'Export cleared', location: 'LHE cargo terminal', at: '2026-09-14T05:15:00Z', state: 'complete' },
      { label: 'Airborne', location: 'LHE → DXB', at: '2026-09-14T09:40:00Z', state: 'current' },
      { label: 'Arrival at DXB', location: 'Dubai', state: 'upcoming' },
      { label: 'Delivery', location: 'Consignee in Dubai', state: 'upcoming' },
    ],
    activity: [
      { at: '2026-09-14T09:40:00Z', message: 'Shipment departed Lahore. Arrival at DXB is the next milestone.' },
      { at: '2026-09-14T05:15:00Z', message: 'Export clearance completed; shipment released for departure.' },
      { at: '2026-09-13T08:00:00Z', message: '12 cartons collected and received into the origin journey.' },
    ],
    documentIds: ['doc-air-waybill', 'doc-air-packing', 'doc-air-invoice'],
  },
  {
    id: 'PSX-260907-002', customerId: 'customer-meridian', origin: karachi, destination: rotterdam,
    routeWaypoints: [karachi.coordinates, [63, 19], [52, 12], [43.4, 12.5], [38.5, 19], [38, 21], [36.8, 23], [35.5, 25], [34.2, 27], [33.6, 28], [33, 29], [32.55, 29.94], [32.3, 31.25], [26, 34], [15, 34.8], [11, 37.5], [8, 38], [1, 38], [0, 36.8], [-2, 36.2], [-4, 36], [-5.2, 35.9], [-6.5, 36], [-10, 36], [-11, 42], [-10, 45], [-6, 49], [-3, 50], [0, 50.3], [1.5, 50.7], [2, 51.6], [3.5, 52], [4.1, 52], rotterdam.coordinates],
    mode: 'Sea', status: 'At risk', cargo: 'Industrial assemblies · 1 × 20 ft container', weightKg: 4200, pieces: 18,
    eta: '2026-10-02T08:00:00Z', updatedAt: '2026-09-14T07:20:00Z',
    currentMilestone: 'At sea', nextMilestone: 'Arrival at Rotterdam', progress: 0.4,
    references: [{ label: 'Bill of lading', value: 'PSX-BL-0907-02' }, { label: 'Purchase order', value: 'MC-PO-2061' }],
    milestones: [
      { label: 'Cargo received', location: 'Karachi', at: '2026-09-06T09:00:00Z', state: 'complete' },
      { label: 'Departed origin', location: 'Port of Karachi', at: '2026-09-07T16:00:00Z', state: 'complete' },
      { label: 'At sea', location: 'Karachi → Rotterdam', at: '2026-09-14T07:20:00Z', state: 'current' },
      { label: 'Arrival at Rotterdam', location: 'Rotterdam', state: 'upcoming' },
      { label: 'Delivery', location: 'Consignee in Rotterdam', state: 'upcoming' },
    ],
    activity: [
      { at: '2026-09-14T07:20:00Z', message: 'The estimated arrival window has been revised to 2 October. Delivery planning is being updated.' },
      { at: '2026-09-07T16:00:00Z', message: 'Container departed Karachi and is moving to Rotterdam.' },
    ],
    exception: {
      title: 'Arrival window revised',
      message: 'The estimated arrival has moved from 30 September to 2 October. Final delivery timing will be confirmed after arrival.',
      nextAction: 'Review the revised arrival window and coordinate the receiving schedule.',
    },
    documentIds: ['doc-sea-lading', 'doc-sea-customs', 'doc-sea-invoice'],
  },
  {
    id: 'PSX-260910-003', customerId: 'customer-meridian', origin: lahore, destination: karachi,
    mode: 'Road', status: 'Delivered', cargo: 'Machine parts · 8 pallets', weightKg: 860, pieces: 8,
    eta: '2026-09-12T10:15:00Z', updatedAt: '2026-09-12T10:15:00Z',
    currentMilestone: 'Delivered', nextMilestone: 'Journey complete', progress: 1,
    references: [{ label: 'Consignment note', value: 'PSX-CN-0910-03' }, { label: 'Purchase order', value: 'MC-PO-2070' }],
    milestones: [
      { label: 'Collected', location: 'Lahore', at: '2026-09-10T06:00:00Z', state: 'complete' },
      { label: 'On the road', location: 'Lahore → Karachi', at: '2026-09-10T08:00:00Z', state: 'complete' },
      { label: 'Arrived at destination', location: 'Karachi', at: '2026-09-12T07:30:00Z', state: 'complete' },
      { label: 'Delivered', location: 'Consignee in Karachi', at: '2026-09-12T10:15:00Z', state: 'complete' },
    ],
    activity: [
      { at: '2026-09-12T10:15:00Z', message: 'Delivery completed. Proof of delivery is ready to view.' },
      { at: '2026-09-12T07:30:00Z', message: 'Shipment arrived in Karachi for final delivery.' },
    ],
    documentIds: ['doc-road-delivery'],
  },
  {
    id: 'PSX-260914-004', customerId: 'customer-meridian', origin: sialkot, destination: lahore,
    mode: 'Road', status: 'On hold', cargo: 'Machined fittings · 6 crates', weightKg: 540, pieces: 6,
    eta: '2026-09-16T10:00:00Z', updatedAt: '2026-09-14T06:30:00Z',
    currentMilestone: 'Documents pending', nextMilestone: 'Collection scheduled', progress: 0.12,
    references: [{ label: 'Consignment note', value: 'PSX-CN-0914-04' }, { label: 'Purchase order', value: 'MC-PO-2092' }],
    milestones: [
      { label: 'Inquiry confirmed', location: 'Sialkot', at: '2026-09-13T11:00:00Z', state: 'complete' },
      { label: 'Documents pending', location: 'Sialkot', at: '2026-09-14T06:30:00Z', state: 'current' },
      { label: 'Collection scheduled', location: 'Sialkot', state: 'upcoming' },
      { label: 'On the road', location: 'Sialkot → Lahore', state: 'upcoming' },
      { label: 'Delivery', location: 'Consignee in Lahore', state: 'upcoming' },
    ],
    activity: [
      { at: '2026-09-14T06:30:00Z', message: 'Collection is on hold while the packing list is completed.' },
      { at: '2026-09-13T11:00:00Z', message: 'Route and cargo details confirmed for the planned movement.' },
    ],
    exception: {
      title: 'Packing list required',
      message: 'A completed packing list is needed before collection can be scheduled. The delivery estimate is provisional.',
      nextAction: 'Provide the packing list with crate counts, weights and cargo description.',
    },
    documentIds: ['doc-road-packing'],
  },
];

export const documents: Document[] = [
  { id: 'doc-air-waybill', shipmentId: 'PSX-260914-001', name: 'Air waybill', type: 'Shipping', reference: 'PSX-AWB-0914-01', issuedAt: '2026-09-14T04:00:00Z', status: 'Ready', public: true },
  { id: 'doc-air-packing', shipmentId: 'PSX-260914-001', name: 'Packing list', type: 'Shipping', reference: 'PL-2084', issuedAt: '2026-09-13T07:30:00Z', status: 'Ready', public: true },
  { id: 'doc-air-invoice', shipmentId: 'PSX-260914-001', name: 'Freight invoice', type: 'Invoice', reference: 'INV-2026-0148', issuedAt: '2026-09-14T05:30:00Z', status: 'Ready', public: false, amount: 1840, currency: 'USD', lines: [{ description: 'Air freight · 340 kg (example)', amount: 1460 }, { description: 'Origin handling (example)', amount: 230 }, { description: 'Documentation (example)', amount: 150 }] },
  { id: 'doc-sea-lading', shipmentId: 'PSX-260907-002', name: 'Bill of lading', type: 'Shipping', reference: 'PSX-BL-0907-02', issuedAt: '2026-09-07T16:30:00Z', status: 'Ready', public: true },
  { id: 'doc-sea-customs', shipmentId: 'PSX-260907-002', name: 'Export declaration', type: 'Customs', reference: 'DEC-2026-0082', issuedAt: '2026-09-07T09:00:00Z', status: 'Ready', public: true },
  { id: 'doc-sea-invoice', shipmentId: 'PSX-260907-002', name: 'Freight invoice', type: 'Invoice', reference: 'INV-2026-0135', issuedAt: '2026-09-08T09:00:00Z', status: 'Ready', public: false, amount: 3260, currency: 'USD', lines: [{ description: 'Ocean freight · 20 ft container (example)', amount: 2750 }, { description: 'Origin handling (example)', amount: 360 }, { description: 'Documentation (example)', amount: 150 }] },
  { id: 'doc-road-delivery', shipmentId: 'PSX-260910-003', name: 'Proof of delivery', type: 'Shipping', reference: 'POD-2026-0093', issuedAt: '2026-09-12T10:15:00Z', status: 'Ready', public: true },
  { id: 'doc-road-packing', shipmentId: 'PSX-260914-004', name: 'Packing list', type: 'Shipping', reference: 'PL-2092', issuedAt: '2026-09-14T06:30:00Z', status: 'Pending', public: false },
];

export const quotes: Quote[] = [
  { id: 'QT-2026-0086', customerId: 'customer-meridian', origin: 'Lahore', destination: 'Dubai', mode: 'Air', amount: 2160, currency: 'USD', status: 'Awaiting acceptance', validUntil: '2026-09-18T23:59:59Z', cargo: 'Precision components · 400 kg', readyDate: '2026-09-20' },
  { id: 'QT-2026-0079', customerId: 'customer-meridian', origin: 'Karachi', destination: 'Rotterdam', mode: 'Sea', amount: 3260, currency: 'USD', status: 'Accepted', validUntil: '2026-09-08T23:59:59Z', cargo: 'Industrial assemblies · 20 ft container', readyDate: '2026-09-06' },
  { id: 'QT-2026-0072', customerId: 'customer-meridian', origin: 'Sialkot', destination: 'Lahore', mode: 'Road', amount: 380, currency: 'USD', status: 'Expired', validUntil: '2026-09-10T23:59:59Z', cargo: 'Machined fittings · 540 kg', readyDate: '2026-09-12' },
];

export const services: { id: 'air' | 'sea' | 'road'; name: string; eyebrow: string; description: string; detail: string; features: string[] }[] = [
  { id: 'air', name: 'Air freight', eyebrow: '01 / TIME-SENSITIVE', description: 'For cargo with a tighter clock.', detail: 'A clear path from origin handling to destination arrival, with the milestones and documents that keep urgent cargo in view.', features: ['Airport-to-airport journey', 'Export and arrival milestones', 'Air waybill visibility', 'Priority exception updates'] },
  { id: 'sea', name: 'Sea freight', eyebrow: '02 / OCEAN MOVEMENTS', description: 'Longer journeys. The same clarity.', detail: 'Follow container movements from port to port, keep revised arrival windows visible and bring shipment documents into one place.', features: ['Container journey visibility', 'Port and vessel milestones', 'Arrival-window updates', 'Bill of lading access'] },
  { id: 'road', name: 'Road freight', eyebrow: '03 / GROUND CONNECTIONS', description: 'Every mile has a next step.', detail: 'Connect pickup, linehaul and delivery with clear handovers, collection requirements and proof of delivery at the end of the journey.', features: ['Collection-to-delivery timeline', 'Pickup readiness checks', 'Consignment references', 'Proof of delivery'] },
];

export function findShipment(reference: string): Shipment | undefined {
  const normalized = reference.trim().toUpperCase();
  return shipments.find((shipment) => shipment.id === normalized || shipment.references.some((item) => item.value.toUpperCase() === normalized));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));
}

export function formatTimestamp(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC', timeZoneName: 'short' }).format(new Date(iso));
}

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}
