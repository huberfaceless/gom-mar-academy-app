import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ACADEMY_STAGES } from '../server/academyData';
import { visibleAcademyStages } from '../server/academyContentAccess';
import { localizeAllAcademyStages } from '../src/i18n/localizeAllAcademyStages';

const paidLesson = ACADEMY_STAGES[2].lessons[0];
const override = { lessonId: paidLesson.id, stageId: 3, deleted: false, lesson: { ...paidLesson, title: 'Unveröffentlichter Inhalt', publicationStatus: 'draft' as const } };
const free = visibleAcademyStages(ACADEMY_STAGES, [override], 'FREE', false);
assert.deepEqual(free.map(stage => stage.id), [1, 2]);
assert.equal(free.some(stage => stage.lessons.some(lesson => lesson.id === paidLesson.id)), false);
const pro = visibleAcademyStages(ACADEMY_STAGES, [override], 'PRO', false);
assert.equal(pro.length, 99);
assert.equal(pro[2].lessons.some(lesson => lesson.id === paidLesson.id), false);
const admin = visibleAcademyStages(ACADEMY_STAGES, [override], 'FREE', true);
assert.equal(admin.length, 99);
assert.equal(admin[2].lessons.find(lesson => lesson.id === paidLesson.id)?.title, 'Unveröffentlichter Inhalt');

const publicRoot = join('dist', 'public');
assert.ok(existsSync(join(publicRoot, 'index.html')), 'Öffentlicher Build fehlt.');
assert.equal(existsSync(join(publicRoot, 'server.js')), false, 'Servercode darf nicht öffentlich ausgeliefert werden.');
assert.equal(existsSync(join(publicRoot, 'server.js.map')), false, 'Server-Source-Map darf nicht öffentlich ausgeliefert werden.');
const assets = readdirSync(join(publicRoot, 'assets')).filter(file => file.endsWith('.js'));
const combinedAssets = assets.map(file => readFileSync(join(publicRoot, 'assets', file), 'utf8')).join('\n');
assert.equal(combinedAssets.includes(ACADEMY_STAGES[2].description), false, 'PRO-Lektion ist im Browser-Bundle enthalten.');
assert.equal(combinedAssets.includes(paidLesson.learnContent.fullArticleGuide), false, 'PRO-Lektionsartikel ist im Browser-Bundle enthalten.');
for (const language of ['en', 'pl'] as const) {
  const translated = localizeAllAcademyStages(ACADEMY_STAGES.slice(2, 3), language)[0];
  assert.equal(combinedAssets.includes(translated.description), false, `${language}: PRO-Übersetzung ist im Browser-Bundle enthalten.`);
}
assert.equal(combinedAssets.includes('Unveröffentlichter Inhalt'), false, 'Entwurf ist im Browser-Bundle enthalten.');
console.log('Academy-Zugriff geprüft: FREE 2 Etappen, PRO 99 Etappen, Entwürfe nur für Admin und kein Servercode im öffentlichen Build.');
