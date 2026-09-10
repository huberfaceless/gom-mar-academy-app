import assert from 'node:assert/strict';
import { ACADEMY_STAGES } from '../src/data/academyData';
import { isAcademyStageAccessible, resolvePreviousAcademyLocation } from '../src/utils/academyNavigation';
import { getAcademyStageLimit } from '../src/utils/membershipAccess';

const freeLimit = getAcademyStageLimit('FREE', 'member', ACADEMY_STAGES.length);
const proLimit = getAcademyStageLimit('PRO', 'member', ACADEMY_STAGES.length);

assert.equal(isAcademyStageAccessible(1, freeLimit), true, 'FREE muss Etappe 1 öffnen können.');
assert.equal(isAcademyStageAccessible(2, freeLimit), true, 'FREE muss Etappe 2 öffnen können.');
assert.equal(isAcademyStageAccessible(3, freeLimit), false, 'FREE darf Etappe 3 nicht öffnen können.');
assert.equal(isAcademyStageAccessible(ACADEMY_STAGES.length, proLimit), true, 'PRO muss alle Etappen öffnen können.');

const firstStage = ACADEMY_STAGES[0];
const secondStage = ACADEMY_STAGES[1];
assert.ok(firstStage.lessons.length > 1, 'Etappe 1 benötigt mindestens zwei Lektionen für den Navigationstest.');
assert.ok(secondStage.lessons.length > 0, 'Etappe 2 benötigt mindestens eine Lektion für den Navigationstest.');

assert.deepEqual(
  resolvePreviousAcademyLocation(ACADEMY_STAGES, firstStage.id, firstStage.lessons[0].id),
  { viewMode: 'overview' },
  'Vor Lektion 1.1 muss die Kursübersicht das Rückwärtsziel sein.',
);
assert.deepEqual(
  resolvePreviousAcademyLocation(ACADEMY_STAGES, firstStage.id, firstStage.lessons[1].id),
  { viewMode: 'lesson', stageId: firstStage.id, lessonId: firstStage.lessons[0].id },
  'Innerhalb einer Etappe muss die vorherige Lektion geöffnet werden.',
);
assert.deepEqual(
  resolvePreviousAcademyLocation(ACADEMY_STAGES, secondStage.id, secondStage.lessons[0].id),
  {
    viewMode: 'lesson',
    stageId: firstStage.id,
    lessonId: firstStage.lessons[firstStage.lessons.length - 1].id,
  },
  'Am Etappenanfang muss die letzte Lektion der vorherigen Etappe geöffnet werden.',
);

console.log('Academy-Navigation geprüft: Tarifgrenzen und Rückwärtsnavigation funktionieren.');
