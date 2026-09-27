import type { Stage } from '../src/types.js';
import type { CurriculumOverride } from './academyCurriculumAdmin.js';

export const visibleAcademyStages = (
  source: Stage[],
  overrides: CurriculumOverride[],
  tier: 'FREE' | 'PRO' | 'PREMIUM',
  isAdmin: boolean,
): Stage[] => {
  const limit = tier === 'FREE' && !isAdmin ? 2 : 99;
  const stages = structuredClone(source.filter((stage) => stage.id <= limit));
  for (const override of overrides) {
    const stage = stages.find((item) => item.id === override.stageId);
    if (!stage) continue;
    const index = stage.lessons.findIndex((lesson) => lesson.id === override.lessonId);
    if (override.deleted || (!isAdmin && override.lesson?.publicationStatus === 'draft')) {
      if (index >= 0) stage.lessons.splice(index, 1);
    } else if (override.lesson) {
      if (index >= 0) stage.lessons[index] = override.lesson;
      else stage.lessons.push(override.lesson);
      stage.lessons.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    }
  }
  return stages;
};
