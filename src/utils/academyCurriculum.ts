import { ACADEMY_STAGES } from '../data/academyData';
import { Lesson, Stage } from '../types';

export type CurriculumOverride = { lessonId: string; stageId: number; deleted: boolean; lesson?: Lesson };

export const applyCurriculumOverrides = (overrides: CurriculumOverride[]): Stage[] => {
  const stages = structuredClone(ACADEMY_STAGES);
  for (const override of overrides) {
    const stage = stages.find((item) => item.id === override.stageId);
    if (!stage) continue;
    const index = stage.lessons.findIndex((lesson) => lesson.id === override.lessonId);
    if (override.deleted) {
      if (index >= 0) stage.lessons.splice(index, 1);
    } else if (override.lesson) {
      if (index >= 0) stage.lessons[index] = override.lesson;
      else stage.lessons.push(override.lesson);
      stage.lessons.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    }
  }
  return stages;
};
