import assert from 'node:assert/strict';
import { loadAcademyAudioStatuses } from '../src/services/academyAudioStatusService';

let active = 0;
let peak = 0;
const received: number[] = [];
const failures = await loadAcademyAudioStatuses([1, 2, 3, 4, 5, 1], async stageId => {
  active += 1;
  peak = Math.max(peak, active);
  await new Promise(resolve => setTimeout(resolve, 1));
  active -= 1;
  if (stageId === 2) throw new Error('Storage unavailable');
  if (stageId === 3) return { stageId, lessons: [{ id: 'other.1', cached: false }] };
  return { stageId, lessons: [{ id: `${stageId}.1`, cached: stageId === 1 }] };
}, result => { received.push(result.stageId); }, () => false);
assert.equal(failures, 2);
assert.equal(peak, 3);
assert.deepEqual(received.sort(), [1, 4, 5]);

let cancelled = false;
let requests = 0;
const stale: number[] = [];
await loadAcademyAudioStatuses([1, 2, 3, 4, 5], async stageId => {
  requests += 1;
  cancelled = true;
  return { stageId, lessons: [{ id: `${stageId}.1`, cached: true }] };
}, result => { stale.push(result.stageId); }, () => cancelled);
assert.equal(requests, 1);
assert.deepEqual(stale, []);
assert.equal(await loadAcademyAudioStatuses([], async () => { throw new Error('No requests expected'); }, () => assert.fail(), () => false), 0);
console.log('Audio-Übersicht geprüft: höchstens drei parallele Etappen, keine doppelten Abfragen, Fehler bleiben ungeprüft, keine veralteten Antworten nach Wechsel.');
