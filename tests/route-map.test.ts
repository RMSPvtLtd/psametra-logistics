import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RouteMap } from '../src/components/route-map.tsx';
import { shipments } from '../src/data/demo.ts';

test('maps follow sea waypoints and zoom short routes without invalid geometry', () => {
  const maps = shipments.map(shipment => renderToStaticMarkup(createElement(RouteMap, { shipment })));
  assert.ok((maps[1].match(/ L/g) ?? []).length >= 15, 'Sea map must follow its ocean waypoints');
  const widths = maps.map(map => Number(map.match(/viewBox="[\d. -]+ ([\d.]+) [\d.]+"/)?.[1]));
  assert.ok(widths[3] < widths[0] / 4, 'Nearby road endpoints need a closer view');
  for (const map of maps) assert.doesNotMatch(map, /NaN|Infinity/);
});
