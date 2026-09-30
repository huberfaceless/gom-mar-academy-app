import type { Stage } from '../src/types.js';
import type { AcademyTier } from './firebaseMembershipAdmin.js';
import type { CurriculumOverride } from './academyCurriculumAdmin.js';
import { visibleAcademyStages } from './academyContentAccess.js';
import { localizeAllAcademyStages } from '../src/i18n/localizeAllAcademyStages.js';

export class MentorLessonError extends Error {
  constructor(public status: 400 | 403) { super('MENTOR_LESSON_UNAVAILABLE'); }
}

export const resolveMentorLessonContext = (
  source: Stage[], overrides: CurriculumOverride[], access: { tier: AcademyTier; isAdmin: boolean },
  stageId: unknown, lessonId: unknown, language: 'de' | 'en' | 'pl',
) => {
  if (stageId === undefined && lessonId === undefined) return null;
  if (!Number.isInteger(stageId) || (stageId as number) < 1 || (stageId as number) > 99 || typeof lessonId !== 'string' || !/^\d{1,2}\.\d{1,3}$/.test(lessonId)) throw new MentorLessonError(400);
  const visible = visibleAcademyStages(source, overrides, access.tier, access.isAdmin);
  const stages = localizeAllAcademyStages(visible, language);
  const stage = stages.find(item => item.id === stageId);
  const lesson = stage?.lessons.find(item => item.id === lessonId);
  if (!stage || !lesson || (!access.isAdmin && lesson.publicationStatus === 'draft')) throw new MentorLessonError(403);
  const content = {
    stageId: stage.id, stageTitle: stage.title, lessonId: lesson.id, lessonTitle: lesson.title,
    description: lesson.description, summary: lesson.learnContent.summaryText,
    keyPoints: lesson.learnContent.bulletPoints, takeaway: lesson.understandContent.coreTakeaway,
    principles: lesson.understandContent.keyPrinciples, task: lesson.actionTask.instruction,
    checklist: lesson.actionTask.checklistItems || [], examples: lesson.learnContent.practicalExamples || [],
    guide: lesson.learnContent.fullArticleGuide || '',
  };
  // Bound every field, keeping the practical task and summary before the longer guide.
  const bounded = Object.fromEntries(Object.entries(content).map(([key, value]) => [key,
    typeof value === 'string' ? value.slice(0, key === 'guide' ? 6000 : 1200)
      : Array.isArray(value) ? value.slice(0, 8).map(item => item.slice(0, 300)) : value,
  ]));
  while (JSON.stringify(bounded).length > 16000) {
    for (const key of Object.keys(bounded)) {
      const value = bounded[key];
      if (typeof value === 'string') bounded[key] = value.slice(0, Math.floor(value.length / 2));
      else if (Array.isArray(value)) bounded[key] = value.slice(0, Math.floor(value.length / 2));
    }
  }
  return { stageId: stage.id, lessonId: lesson.id, stageTitle: stage.title, lessonTitle: lesson.title,
    knowledge: JSON.stringify(bounded) };
};
