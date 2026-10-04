import assert from 'node:assert/strict';
import { ACADEMY_STAGES } from '../server/academyData';
import { selectAudioLessons, audioSelectionFingerprint, generateSelectedAudio } from '../server/lessonAudioSelection';

const lessons = ACADEMY_STAGES.flatMap(stage => stage.lessons);
for (const invalid of [undefined, [], ['1.1', '1.2', '1.3'], ['1.1', '1.1'], ['missing'], [1], '1.1']) {
  assert.throws(() => selectAudioLessons(lessons, invalid));
}
assert.deepEqual(selectAudioLessons(lessons, ['48.2', '1.1']).map(lesson => lesson.id), ['48.2', '1.1']);
assert.notEqual(audioSelectionFingerprint(['old']), audioSelectionFingerprint(['new']));
assert.notEqual(audioSelectionFingerprint(['a', 'b']), audioSelectionFingerprint(['b', 'a']));

const items = [{ id: 'cached', characters: 100 }, { id: 'missing', characters: 240 }];
const generated: string[] = [];
const generate = async (item: typeof items[number]) => { generated.push(item.id); };
assert.deepEqual(await generateSelectedAudio(items, 240, async item => item.id === 'cached', generate), { generated: 1, cached: 1, characters: 240 });
assert.deepEqual(generated, ['missing']);
generated.length = 0;
assert.deepEqual(await generateSelectedAudio(items, 0, async () => true, generate), { generated: 0, cached: 2, characters: 0 });
assert.equal(generated.length, 0);
// A missing cached file or a failed read must stop the whole plan before billing.
await assert.rejects(() => generateSelectedAudio(items, 240, async () => false, generate));
await assert.rejects(() => generateSelectedAudio(items, 340, async item => {
  if (item.id === 'missing') throw new Error('Storage unavailable');
  return false;
}, generate));
for (const invalid of [undefined, -1, '240', 1.5, Infinity]) {
  await assert.rejects(() => generateSelectedAudio(items, invalid, async () => false, generate));
}
assert.equal(generated.length, 0);
// Do not continue to the second selected lesson after a generation/write failure.
let attempts = 0;
await assert.rejects(() => generateSelectedAudio(items, 340, async () => false, async () => {
  attempts += 1;
  throw new Error('Provider or storage write failed');
}));
assert.equal(attempts, 1);
console.log('Audio-Auswahl geprüft: maximal zwei Lektionen, Cache-Wiederverwendung, Zeichengrenze und Abbruch vor Erzeugung bei Lesefehlern.');
