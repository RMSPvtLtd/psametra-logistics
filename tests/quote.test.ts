import assert from 'node:assert/strict';
import test from 'node:test';
import { emptyQuote, inquirySummary, validateQuote } from '../src/features/quote/validation.ts';

const today = '2026-09-14';
const valid = { ...emptyQuote, mode: 'Air', origin: 'Lahore, Pakistan', destination: 'Dubai, UAE', incoterm: 'FCA', readyDate: '2026-09-18', cargo: 'Precision components', weightKg: '250', pieces: '5', company: 'Meridian Components', contactName: 'Sam Taylor', email: 'sam@example.com' };

test('each quote step validates only its fields, and final review validates everything', () => {
  assert.deepEqual(Object.keys(validateQuote(emptyQuote, 0, today)), ['mode', 'origin', 'destination', 'incoterm', 'readyDate']);
  assert.deepEqual(Object.keys(validateQuote(emptyQuote, 1, today)), ['cargo', 'weightKg', 'pieces']);
  assert.deepEqual(Object.keys(validateQuote(emptyQuote, 2, today)), ['company', 'contactName', 'email']);
  assert.deepEqual(validateQuote(valid, undefined, today), {});
  assert.ok(Object.keys(validateQuote(emptyQuote, undefined, today)).length >= 11);
});

test('route validation rejects invalid dates, modes, incoterms and identical destinations', () => {
  assert.ok(validateQuote({ ...valid, destination: ' lahore, PAKISTAN ' }, 0, today).destination);
  assert.ok(validateQuote({ ...valid, mode: 'Drone' }, 0, today).mode);
  assert.ok(validateQuote({ ...valid, incoterm: 'XYZ' }, 0, today).incoterm);
  for (const readyDate of ['2026-02-30', '2026-09-13', 'tomorrow', '2026-9-18']) {
    assert.ok(validateQuote({ ...valid, readyDate }, 0, today).readyDate, readyDate);
  }
  assert.deepEqual(validateQuote({ ...valid, readyDate: today }, 0, today), {});
});

test('ready-date validation follows the local calendar on either side of UTC midnight', (context) => {
  const originalTimezone = process.env.TZ;
  context.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-09-14T20:30:00Z') });
  try {
    for (const [timezone, now, localToday, yesterday] of [
      ['Asia/Karachi', '2026-09-14T20:30:00Z', '2026-09-15', '2026-09-14'],
      ['America/Los_Angeles', '2026-09-15T01:30:00Z', '2026-09-14', '2026-09-13'],
    ]) {
      process.env.TZ = timezone;
      context.mock.timers.setTime(Date.parse(now));
      assert.deepEqual(validateQuote({ ...valid, readyDate: localToday }, 0), {}, timezone);
      assert.ok(validateQuote({ ...valid, readyDate: yesterday }, 0).readyDate, timezone);
    }
  } finally {
    if (originalTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimezone;
  }
});

test('cargo validation rejects nonpositive values, partial dimensions and fractional pieces', () => {
  for (const weightKg of ['0', '-1', 'Infinity', '1e99']) {
    assert.ok(validateQuote({ ...valid, weightKg }, 1, today).weightKg, weightKg);
  }
  assert.ok(validateQuote({ ...valid, pieces: '1.5' }, 1, today).pieces);
  assert.ok(validateQuote({ ...valid, volumeM3: '-3' }, 1, today).volumeM3);
  assert.ok(validateQuote({ ...valid, lengthCm: '50' }, 1, today).widthCm);
  assert.deepEqual(validateQuote({ ...valid, lengthCm: '50', widthCm: '40', heightCm: '30', volumeM3: '0.3' }, 1, today), {});
});

test('contact validation handles whitespace, invalid email and field limits', () => {
  assert.ok(validateQuote({ ...valid, company: '   ' }, 2, today).company);
  for (const email of ['hello', 'a@', '@b.com', 'a b@example.com']) {
    assert.ok(validateQuote({ ...valid, email }, 2, today).email, email);
  }
  assert.ok(validateQuote({ ...valid, notes: 'x'.repeat(2001) }, 2, today).notes);
  assert.deepEqual(validateQuote({ ...valid, email: ' sam@example.com ', phone: '+92 300 1234567' }, 2, today), {});
});

test('download summary preserves the inquiry and states it was not sent or priced', () => {
  const summary = inquirySummary(valid);
  assert.match(summary, /Lahore, Pakistan/);
  assert.match(summary, /Dubai, UAE/);
  assert.match(summary, /250 kg/);
  assert.match(summary, /sam@example.com/);
  assert.match(summary, /not been sent/i);
  assert.match(summary, /No rate or booking/i);
});
