export const emptyQuote = { mode: '', origin: '', destination: '', incoterm: '', readyDate: '', cargo: '', weightKg: '', volumeM3: '', pieces: '', lengthCm: '', widthCm: '', heightCm: '', company: '', contactName: '', email: '', phone: '', notes: '' };
export type QuoteDraft = typeof emptyQuote;
export type QuoteErrors = Partial<Record<keyof QuoteDraft, string>>;
export const incoterms = ['EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF'];
export const stepFields: (keyof QuoteDraft)[][] = [
  ['mode', 'origin', 'destination', 'incoterm', 'readyDate'],
  ['cargo', 'weightKg', 'volumeM3', 'pieces', 'lengthCm', 'widthCm', 'heightCm'],
  ['company', 'contactName', 'email', 'phone', 'notes'],
];

export function localToday(): string {
  const now = new Date();
  return [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((part) => String(part).padStart(2, '0')).join('-');
}

export function validateQuote(draft: QuoteDraft, step?: number, today = localToday()): QuoteErrors {
  const errors: QuoteErrors = {};
  const required = (key: keyof QuoteDraft, message: string, max = 120) => {
    if (!draft[key].trim()) errors[key] = message;
    else if (draft[key].trim().length > max) errors[key] = `Use ${max} characters or fewer.`;
  };
  const positive = (key: keyof QuoteDraft, maximum: number, integer = false) => {
    const value = Number(draft[key]);
    if (!Number.isFinite(value) || value <= 0 || value > maximum || (integer && !Number.isInteger(value))) {
      errors[key] = `Enter ${integer ? 'a whole number' : 'a number'} greater than 0 and no more than ${maximum.toLocaleString('en-GB')}.`;
    }
  };
  if (step === undefined || step === 0) {
    if (!['Air', 'Sea', 'Road'].includes(draft.mode)) errors.mode = 'Choose a transport mode.';
    required('origin', 'Enter the origin city and country.');
    required('destination', 'Enter the destination city and country.');
    if (draft.origin.trim() && draft.origin.trim().toLowerCase() === draft.destination.trim().toLowerCase()) errors.destination = 'Choose a destination different from the origin.';
    if (!incoterms.includes(draft.incoterm)) errors.incoterm = 'Choose an Incoterm.';
    const timestamp = Date.parse(`${draft.readyDate}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.readyDate) || !Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== draft.readyDate || draft.readyDate < today) {
      errors.readyDate = 'Choose a valid cargo-ready date today or later.';
    }
  }
  if (step === undefined || step === 1) {
    required('cargo', 'Describe the goods you want to move.', 240);
    positive('weightKg', 1000000);
    if (draft.volumeM3.trim()) positive('volumeM3', 100000);
    positive('pieces', 100000, true);
    if ([draft.lengthCm, draft.widthCm, draft.heightCm].some((value) => value.trim())) {
      for (const key of ['lengthCm', 'widthCm', 'heightCm'] as const) positive(key, 10000);
    }
  }
  if (step === undefined || step === 2) {
    required('company', 'Enter your company name.');
    required('contactName', 'Enter a contact name.');
    required('email', 'Enter your email address.', 254);
    if (draft.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) errors.email = 'Enter a valid email address.';
    if (draft.phone.length > 40) errors.phone = 'Use 40 characters or fewer.';
    if (draft.notes.length > 2000) errors.notes = 'Use 2,000 characters or fewer.';
  }
  return errors;
}

export function inquirySummary(draft: QuoteDraft): string {
  return [
    'PSAMETRA / DEMO FREIGHT INQUIRY',
    'This inquiry has not been sent. No rate or booking has been created.',
    '',
    `Mode: ${draft.mode}`, `Origin: ${draft.origin.trim()}`, `Destination: ${draft.destination.trim()}`,
    `Incoterm: ${draft.incoterm}`, `Cargo ready: ${draft.readyDate}`, '',
    `Cargo: ${draft.cargo.trim()}`, `Gross weight: ${draft.weightKg} kg`, `Pieces: ${draft.pieces}`,
    `Volume: ${draft.volumeM3 ? `${draft.volumeM3} m³` : 'Not provided'}`,
    `Dimensions per piece: ${draft.lengthCm ? `${draft.lengthCm} × ${draft.widthCm} × ${draft.heightCm} cm` : 'Not provided'}`, '',
    `Company: ${draft.company.trim()}`, `Contact: ${draft.contactName.trim()}`, `Email: ${draft.email.trim()}`,
    `Phone: ${draft.phone.trim() || 'Not provided'}`, `Notes: ${draft.notes.trim() || 'None'}`,
  ].join('\n');
}
