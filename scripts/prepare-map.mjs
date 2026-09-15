// Natural Earth 1:110m land, public domain. Source and license are recorded in BUILD_BRIEF.md.
import { readFileSync, writeFileSync } from 'node:fs';
const geo = JSON.parse(readFileSync('test-results/land.geojson', 'utf8'));
const point = ([lon, lat]) => `${((lon + 180) / 360 * 1000).toFixed(1)},${((90 - lat) / 180 * 500).toFixed(1)}`;
const path = geo.features.flatMap(f => f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates).map(polygon => polygon.map(ring => 'M' + ring.map(point).join('L') + 'Z').join('')).join('');
writeFileSync('public/media/world.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><path d="${path}" fill="#dce0d8" stroke="#c6cdc4" stroke-width=".35"/></svg>`);
