import assert from 'node:assert/strict';
import { ACADEMY_STAGES } from '../src/data/academyData';
import { localizeAcademyStages } from '../src/i18n/academyLocalization';
import { localizeAcademyStage81 } from '../src/i18n/academyLocalization81';
import { localizeAcademyStage82 } from '../src/i18n/academyLocalization82';
import { localizeAcademyStage83 } from '../src/i18n/academyLocalization83';
import { localizeAcademyStage84 } from '../src/i18n/academyLocalization84';
import { localizeAcademyStage85 } from '../src/i18n/academyLocalization85';
import { localizeAcademyStage86 } from '../src/i18n/academyLocalization86';
import { localizeAcademyStage87 } from '../src/i18n/academyLocalization87';
import { localizeAcademyStage88 } from '../src/i18n/academyLocalization88';
import { localizeAcademyStage89 } from '../src/i18n/academyLocalization89';
import { localizeAcademyStage90 } from '../src/i18n/academyLocalization90';
import { localizeAcademyStage91 } from '../src/i18n/academyLocalization91';
import { localizeAcademyStage92 } from '../src/i18n/academyLocalization92';
import { localizeAcademyStage93 } from '../src/i18n/academyLocalization93';
import { localizeAcademyStage94 } from '../src/i18n/academyLocalization94';
import { localizeAcademyStage95 } from '../src/i18n/academyLocalization95';
import { localizeAcademyStage96 } from '../src/i18n/academyLocalization96';
import { localizeAcademyStage97 } from '../src/i18n/academyLocalization97';
import { localizeAcademyStage98 } from '../src/i18n/academyLocalization98';
import { localizeAcademyStage99 } from '../src/i18n/academyLocalization99';
import { preserveAcademyTechnicalFields } from '../src/i18n/academyLocalizationIntegrity';
import { LanguageCode } from '../src/i18n/translations';
import { Lesson, Stage } from '../src/types';
import { DEFAULT_USER_PROFILE, TOTAL_ACADEMY_LESSONS, createFreshUserProfile } from '../src/utils/storage';
import { migrateLegacyAcademyUnlocks, unlockNextAcademyStage } from '../src/utils/academyProgress';
import { canAccessView, getAcademyStageLimit, resolveMembershipClaims } from '../src/utils/membershipAccess';

type Localizer = (stages: Stage[], language: LanguageCode) => Stage[];

const localizers: Localizer[] = [
  localizeAcademyStages,
  localizeAcademyStage81,
  localizeAcademyStage82,
  localizeAcademyStage83,
  localizeAcademyStage84,
  localizeAcademyStage85,
  localizeAcademyStage86,
  localizeAcademyStage87,
  localizeAcademyStage88,
  localizeAcademyStage89,
  localizeAcademyStage90,
  localizeAcademyStage91,
  localizeAcademyStage92,
  localizeAcademyStage93,
  localizeAcademyStage94,
  localizeAcademyStage95,
  localizeAcademyStage96,
  localizeAcademyStage97,
  localizeAcademyStage98,
  localizeAcademyStage99,
];

const localize = (language: LanguageCode): Stage[] =>
  preserveAcademyTechnicalFields(
    ACADEMY_STAGES,
    localizers.reduce((stages, apply) => apply(stages, language), ACADEMY_STAGES),
  );

const requireText = (value: unknown, path: string): void => {
  assert.equal(typeof value, 'string', `${path} muss Text sein`);
  assert.ok((value as string).trim().length > 0, `${path} darf nicht leer sein`);
  assert.doesNotMatch(value as string, /\b(?:TODO|TBD|TRANSLATE THIS|ÜBERSETZEN)\b/i, `${path} enthält einen Platzhalter`);
};

const requireTextArray = (value: unknown, path: string): void => {
  assert.ok(Array.isArray(value), `${path} muss eine Liste sein`);
  assert.ok(value.length > 0, `${path} darf nicht leer sein`);
  value.forEach((entry, index) => requireText(entry, `${path}[${index}]`));
};

const looksGerman = (value: string): boolean => {
  if (/[äöüß]/i.test(value)) return true;
  const markers = value.match(/\b(?:aber|alle|als|auch|auf|aus|bei|dein(?:e[mnrs]?)?|der|die|das|den|dem|des|durch|ein(?:e[mnrs]?)?|für|gegen|immer|ist|kein(?:e[mnrs]?)?|kann|mit|nicht|noch|oder|ohne|sich|sind|und|vom|von|vor|warum|wenn|werden|wie|zu|zum|zur)\b/gi) ?? [];
  return new Set(markers.map(marker => marker.toLowerCase())).size >= 2;
};

const assertTranslated = (source: string, translated: string, path: string): void => {
  requireText(translated, path);
  if (translated.trim() === source.trim() && looksGerman(source)) {
    assert.fail(`${path} blieb unverändert auf Deutsch`);
  }
};

const assertLessonContent = (source: Lesson, translated: Lesson, language: LanguageCode): void => {
  const path = `${language}.${source.id}`;

  assert.equal(translated.id, source.id, `${path}.id wurde verändert`);
  assert.equal(translated.stageId, source.stageId, `${path}.stageId wurde verändert`);
  assert.equal(translated.durationMinutes, source.durationMinutes, `${path}.durationMinutes wurde verändert`);
  assert.equal(translated.learnContent.videoDuration, source.learnContent.videoDuration, `${path}.videoDuration wurde verändert`);
  assert.equal(translated.learnContent.videoUrl, source.learnContent.videoUrl, `${path}.videoUrl wurde verändert`);
  assert.equal(translated.actionTask.inputType, source.actionTask.inputType, `${path}.inputType wurde verändert`);
  assert.equal(translated.actionTask.toolboxCategory, source.actionTask.toolboxCategory, `${path}.toolboxCategory wurde verändert`);

  assertTranslated(source.stageTitle, translated.stageTitle, `${path}.stageTitle`);
  assertTranslated(source.title, translated.title, `${path}.title`);
  assertTranslated(source.description, translated.description, `${path}.description`);
  assertTranslated(source.learnContent.summaryText, translated.learnContent.summaryText, `${path}.summaryText`);
  assertTranslated(source.understandContent.coreTakeaway, translated.understandContent.coreTakeaway, `${path}.coreTakeaway`);
  assertTranslated(source.actionTask.instruction, translated.actionTask.instruction, `${path}.instruction`);

  if (source.learnContent.videoTitle) {
    assertTranslated(source.learnContent.videoTitle, translated.learnContent.videoTitle ?? '', `${path}.videoTitle`);
  }
  if (source.learnContent.fullArticleGuide) {
    assertTranslated(source.learnContent.fullArticleGuide, translated.learnContent.fullArticleGuide ?? '', `${path}.fullArticleGuide`);
  }

  requireTextArray(translated.learnContent.bulletPoints, `${path}.bulletPoints`);
  assert.ok(translated.learnContent.bulletPoints.length >= source.learnContent.bulletPoints.length, `${path}.bulletPoints ist unvollständig`);
  requireTextArray(translated.understandContent.keyPrinciples, `${path}.keyPrinciples`);
  assert.ok(translated.understandContent.keyPrinciples.length >= source.understandContent.keyPrinciples.length, `${path}.keyPrinciples ist unvollständig`);

  if (source.actionTask.checklistItems) {
    requireTextArray(translated.actionTask.checklistItems, `${path}.checklistItems`);
    assert.ok((translated.actionTask.checklistItems?.length ?? 0) >= source.actionTask.checklistItems.length, `${path}.checklistItems ist unvollständig`);
  }
  if (source.learnContent.practicalExamples) {
    requireTextArray(translated.learnContent.practicalExamples, `${path}.practicalExamples`);
    assert.ok((translated.learnContent.practicalExamples?.length ?? 0) >= source.learnContent.practicalExamples.length, `${path}.practicalExamples ist unvollständig`);
  }
  if (source.learnContent.videoChapters) {
    assert.ok((translated.learnContent.videoChapters?.length ?? 0) >= source.learnContent.videoChapters.length, `${path}.videoChapters ist unvollständig`);
    source.learnContent.videoChapters.forEach((sourceChapter, index) => {
      const chapter = translated.learnContent.videoChapters?.[index];
      assert.equal(chapter?.time, sourceChapter.time, `${path}.videoChapters[${index}].time wurde verändert`);
      requireText(chapter?.title, `${path}.videoChapters[${index}].title`);
    });
  }
  if (source.learnContent.coreConcepts) {
    assert.ok((translated.learnContent.coreConcepts?.length ?? 0) >= source.learnContent.coreConcepts.length, `${path}.coreConcepts ist unvollständig`);
    source.learnContent.coreConcepts.forEach((original, index) => {
      const concept = translated.learnContent.coreConcepts?.[index];
      assert.equal(concept?.iconName, original.iconName, `${path}.coreConcepts[${index}].iconName wurde verändert`);
      assert.equal(concept?.highlight, original.highlight, `${path}.coreConcepts[${index}].highlight wurde verändert`);
      requireText(concept?.title, `${path}.coreConcepts[${index}].title`);
      requireText(concept?.description, `${path}.coreConcepts[${index}].description`);
    });
  }
  if (source.learnContent.resources) {
    assert.ok((translated.learnContent.resources?.length ?? 0) >= source.learnContent.resources.length, `${path}.resources ist unvollständig`);
    source.learnContent.resources.forEach((original, index) => {
      const resource = translated.learnContent.resources?.[index];
      assert.equal(resource?.type, original.type, `${path}.resources[${index}].type wurde verändert`);
      assert.equal(resource?.iconName, original.iconName, `${path}.resources[${index}].iconName wurde verändert`);
      assert.equal(resource?.actionUrl, original.actionUrl, `${path}.resources[${index}].actionUrl wurde verändert`);
      requireText(resource?.title, `${path}.resources[${index}].title`);
      requireText(resource?.subtitle, `${path}.resources[${index}].subtitle`);
    });
  }
};

assert.equal(ACADEMY_STAGES.length, 99, 'Die Academy muss genau 99 Etappen enthalten');
assert.deepEqual(ACADEMY_STAGES.map(stage => stage.id), Array.from({ length: 99 }, (_, index) => index + 1), 'Etappen-IDs müssen lückenlos von 1 bis 99 laufen');
assert.equal(TOTAL_ACADEMY_LESSONS, ACADEMY_STAGES.reduce((total, stage) => total + stage.lessons.length, 0), 'Die Gesamtzahl der Lektionen muss aus allen 99 Etappen berechnet werden');
assert.deepEqual(DEFAULT_USER_PROFILE.unlockedStageIds, [1], 'Neue Profile dürfen nur mit Etappe 1 starten');
assert.deepEqual(createFreshUserProfile('Test', 'test@example.com').unlockedStageIds, [1], 'Frisch registrierte Profile dürfen nur mit Etappe 1 starten');
assert.deepEqual(unlockNextAcademyStage([1, 2, 3, 4, 5, 6, 7], 7, 99), [1, 2, 3, 4, 5, 6, 7, 8], 'Etappe 7 muss Etappe 8 freischalten');
assert.deepEqual(unlockNextAcademyStage([98], 98, 99), [98, 99], 'Etappe 98 muss Etappe 99 freischalten');
assert.deepEqual(unlockNextAcademyStage([99], 99, 99), [99], 'Nach Etappe 99 darf keine weitere Etappe freigeschaltet werden');
assert.deepEqual(migrateLegacyAcademyUnlocks(7, ACADEMY_STAGES[6].lessons.map(lesson => lesson.id), ACADEMY_STAGES), [1, 2, 3, 4, 5, 6, 7, 8], 'Ein Altprofil mit abgeschlossener Etappe 7 muss Etappe 8 erhalten');
assert.equal(getAcademyStageLimit('FREE', 'member', 99), 2, 'FREE darf nur die ersten zwei Etappen öffnen');
assert.equal(getAcademyStageLimit('PRO', 'member', 99), 99, 'PRO muss den vollständigen Lernpfad nutzen können');
assert.equal(canAccessView('toolbox', 'FREE', 'member'), false, 'FREE darf die PRO-Toolbox nicht öffnen');
assert.equal(canAccessView('toolbox', 'PRO', 'member'), true, 'PRO muss die Toolbox öffnen können');
assert.equal(canAccessView('admin', 'PREMIUM', 'member'), false, 'PREMIUM allein darf keinen Adminzugang erhalten');
assert.deepEqual(resolveMembershipClaims({}, 'member@example.com'), { tier: 'FREE', role: 'member' }, 'Fehlende Claims müssen sicher auf FREE zurückfallen');
assert.deepEqual(resolveMembershipClaims({ academyTier: 'PRO' }, 'member@example.com'), { tier: 'PRO', role: 'member' }, 'Ein bestätigter PRO-Claim muss erkannt werden');

const technicalErrors: string[] = [];
const compareTechnical = (actual: unknown, expected: unknown, path: string): void => {
  if (actual !== expected) technicalErrors.push(`${path}: ${JSON.stringify(expected)} -> ${JSON.stringify(actual)}`);
};

for (const language of ['en', 'pl'] as const) {
  const translatedStages = localize(language);
  translatedStages.forEach((translated, stageIndex) => {
    const source = ACADEMY_STAGES[stageIndex];
    compareTechnical(translated.id, source.id, `${language}.${source.id}.id`);
    compareTechnical(translated.color, source.color, `${language}.${source.id}.color`);
    compareTechnical(translated.badgeIcon, source.badgeIcon, `${language}.${source.id}.badgeIcon`);
    translated.lessons.forEach((lesson, lessonIndex) => {
      const original = source.lessons[lessonIndex];
      const path = `${language}.${original.id}`;
      compareTechnical(lesson.id, original.id, `${path}.id`);
      compareTechnical(lesson.stageId, original.stageId, `${path}.stageId`);
      compareTechnical(lesson.durationMinutes, original.durationMinutes, `${path}.durationMinutes`);
      compareTechnical(lesson.learnContent.videoDuration, original.learnContent.videoDuration, `${path}.videoDuration`);
      compareTechnical(lesson.learnContent.videoUrl, original.learnContent.videoUrl, `${path}.videoUrl`);
      compareTechnical(lesson.actionTask.inputType, original.actionTask.inputType, `${path}.inputType`);
      compareTechnical(lesson.actionTask.toolboxCategory, original.actionTask.toolboxCategory, `${path}.toolboxCategory`);
      original.learnContent.videoChapters?.forEach((chapter, index) => compareTechnical(lesson.learnContent.videoChapters?.[index]?.time, chapter.time, `${path}.videoChapters[${index}].time`));
      original.learnContent.coreConcepts?.forEach((concept, index) => {
        compareTechnical(lesson.learnContent.coreConcepts?.[index]?.iconName, concept.iconName, `${path}.coreConcepts[${index}].iconName`);
        compareTechnical(lesson.learnContent.coreConcepts?.[index]?.highlight, concept.highlight, `${path}.coreConcepts[${index}].highlight`);
      });
      original.learnContent.resources?.forEach((resource, index) => {
        compareTechnical(lesson.learnContent.resources?.[index]?.type, resource.type, `${path}.resources[${index}].type`);
        compareTechnical(lesson.learnContent.resources?.[index]?.iconName, resource.iconName, `${path}.resources[${index}].iconName`);
        compareTechnical(lesson.learnContent.resources?.[index]?.actionUrl, resource.actionUrl, `${path}.resources[${index}].actionUrl`);
      });
    });
  });
}

assert.equal(technicalErrors.length, 0, `Technische Felder wurden verändert:\n${technicalErrors.join('\n')}`);

for (const language of ['en', 'pl'] as const) {
  const translatedStages = localize(language);
  assert.equal(translatedStages.length, ACADEMY_STAGES.length, `${language}: Etappenanzahl wurde verändert`);

  translatedStages.forEach((translated, stageIndex) => {
    const source = ACADEMY_STAGES[stageIndex];
    const path = `${language}.${source.id}`;
    assert.equal(translated.id, source.id, `${path}.id wurde verändert`);
    assert.equal(translated.color, source.color, `${path}.color wurde verändert`);
    assert.equal(translated.badgeIcon, source.badgeIcon, `${path}.badgeIcon wurde verändert`);
    assertTranslated(source.title, translated.title, `${path}.title`);
    assertTranslated(source.description, translated.description, `${path}.description`);
    requireText(translated.subtitle, `${path}.subtitle`);
    assert.equal(translated.lessons.length, source.lessons.length, `${path}.lessons ist unvollständig`);
    translated.lessons.forEach((lesson, lessonIndex) => assertLessonContent(source.lessons[lessonIndex], lesson, language));
  });
}

console.log('Academy-Lokalisierung geprüft: 99 Etappen, Englisch und Polnisch, Inhalte und technische Felder vollständig.');
