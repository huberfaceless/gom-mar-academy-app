import type { Stage } from '../types';

export type PreviousAcademyLocation =
  | { viewMode: 'overview' }
  | { viewMode: 'lesson'; stageId: number; lessonId: string };

export const isAcademyStageAccessible = (stageId: number, stageAccessLimit: number): boolean => (
  Number.isInteger(stageId) && stageId > 0 && stageId <= stageAccessLimit
);

export const resolvePreviousAcademyLocation = (
  stages: Stage[],
  selectedStageId: number,
  selectedLessonId: string,
): PreviousAcademyLocation => {
  const stageIndex = stages.findIndex((stage) => stage.id === selectedStageId);
  if (stageIndex < 0) return { viewMode: 'overview' };

  const currentStage = stages[stageIndex];
  const lessonIndex = currentStage.lessons.findIndex((lesson) => lesson.id === selectedLessonId);
  if (lessonIndex > 0) {
    return {
      viewMode: 'lesson',
      stageId: currentStage.id,
      lessonId: currentStage.lessons[lessonIndex - 1].id,
    };
  }

  const previousStage = stages[stageIndex - 1];
  const previousLesson = previousStage?.lessons.at(-1);
  if (previousStage && previousLesson) {
    return {
      viewMode: 'lesson',
      stageId: previousStage.id,
      lessonId: previousLesson.id,
    };
  }

  return { viewMode: 'overview' };
};
