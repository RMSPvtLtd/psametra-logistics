import assert from 'node:assert/strict';
import test from 'node:test';
import { heroPhase } from '../src/features/hero/phase.ts';

test('the full film precedes rotation, and the 90-degree rotation precedes the split', () => {
  assert.deepEqual(heroPhase(-1), { film: 0, cover: 0, rotate: 0, split: 0 });
  assert.equal(heroPhase(.7).film, 1);
  assert.equal(heroPhase(.7).cover, 0);
  assert.equal(heroPhase(.76).rotate, 0);
  assert.equal(heroPhase(.8).split, 0);
  assert.equal(heroPhase(.9).rotate, 90);
  assert.ok(heroPhase(.93).split > 0 && heroPhase(.93).split < 1);
  assert.deepEqual(heroPhase(2), { film: 1, cover: 1, rotate: 90, split: 1 });
});
