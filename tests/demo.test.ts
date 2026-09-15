import assert from 'node:assert/strict';
import test from 'node:test';
import { customers, documents, findShipment, formatDate, formatMoney, formatTimestamp, quotes, shipments } from '../src/data/demo.ts';

test('shipment references resolve exactly, regardless of case or surrounding whitespace', () => {
  const shipment = findShipment('  psx-260914-001  ');
  assert.equal(shipment?.origin.code, 'LHE');
  assert.equal(shipment?.destination.code, 'DXB');
  assert.equal(shipment?.currentMilestone, 'Airborne');
  assert.equal(findShipment('PSX-260914'), undefined);
  assert.equal(findShipment(''), undefined);
  assert.equal(findShipment('not-a-reference'), undefined);
  for (const shipment of shipments) {
    for (const reference of shipment.references) {
      assert.equal(findShipment(` ${reference.value.toLowerCase()} `)?.id, shipment.id);
    }
  }
});

test('sample journeys, documents and quotes remain consistent across all views', () => {
  assert.equal(shipments.length, 4);
  assert.deepEqual(new Set(shipments.map((shipment) => shipment.status)), new Set(['In transit', 'At risk', 'Delivered', 'On hold']));
  assert.equal(new Set(shipments.map((shipment) => shipment.id)).size, shipments.length);
  for (const shipment of shipments) {
    assert.ok(customers.some((customer) => customer.id === shipment.customerId));
    assert.ok(shipment.progress >= 0 && shipment.progress <= 1);
    assert.ok(Number.isFinite(Date.parse(shipment.eta)));
    assert.ok(Number.isFinite(Date.parse(shipment.updatedAt)));
    for (const location of [shipment.origin, shipment.destination]) {
      assert.ok(Math.abs(location.coordinates[0]) <= 180);
      assert.ok(Math.abs(location.coordinates[1]) <= 90);
    }
    assert.ok(shipment.milestones.some((milestone) => milestone.label === shipment.currentMilestone));
    assert.ok(shipment.milestones.every((milestone) => !milestone.at || Number.isFinite(Date.parse(milestone.at))));
    for (const id of shipment.documentIds) {
      assert.equal(documents.find((document) => document.id === id)?.shipmentId, shipment.id);
    }
  }
  for (const document of documents) {
    assert.ok(shipments.some((shipment) => shipment.id === document.shipmentId));
    assert.ok(Number.isFinite(Date.parse(document.issuedAt)));
    if (document.type === 'Invoice') {
      assert.equal(document.public, false);
      assert.equal(document.lines?.reduce((sum, line) => sum + line.amount, 0), document.amount);
    }
  }
  assert.ok(quotes.length > 0);
  for (const quote of quotes) {
    assert.ok(customers.some((customer) => customer.id === quote.customerId));
    assert.ok(quote.amount > 0);
    assert.ok(Number.isFinite(Date.parse(quote.validUntil)));
  }
});

test('date and currency formatting are deterministic', () => {
  assert.equal(formatDate('2026-09-14T23:30:00Z'), '14 Sept 2026');
  assert.equal(formatMoney(1250, 'USD'), 'US$1,250');
});

test('ocean route uses waypoints with consistent shipment endpoints', () => {
  const sea = shipments.find((shipment) => shipment.mode === 'Sea');
  assert.ok(sea?.routeWaypoints && sea.routeWaypoints.length > 2, 'Sea freight needs an illustrative ocean route');
  for (const shipment of shipments.filter((shipment) => shipment.routeWaypoints)) {
    const points = shipment.routeWaypoints!;
    assert.deepEqual(points[0], shipment.origin.coordinates);
    assert.deepEqual(points.at(-1), shipment.destination.coordinates);
    for (const [longitude, latitude] of points) {
      assert.ok(Number.isFinite(longitude) && Math.abs(longitude) <= 180);
      assert.ok(Number.isFinite(latitude) && Math.abs(latitude) <= 90);
    }
  }
});

test('event timestamps preserve same-day times and normalize timezone offsets to UTC', () => {
  assert.equal(formatTimestamp('2026-09-14T05:15:00Z'), '14 Sept 2026, 05:15 UTC');
  assert.equal(formatTimestamp('2026-09-14T09:40:00Z'), '14 Sept 2026, 09:40 UTC');
  assert.equal(formatTimestamp('2026-09-15T00:30:00+05:00'), '14 Sept 2026, 19:30 UTC');
});
