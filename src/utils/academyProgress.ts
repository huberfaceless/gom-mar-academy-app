import type { Stage } from '../types';

export const unlockNextAcademyStage = (
  unlockedStageIds: number[],
  completedStageId: number,
  totalStages: number,
): number[] => {
  if (completedStageId < 1 || completedStageId >= totalStages) return [...unlockedStageIds];

  const nextStageId = completedStageId + 1;
  if (unlockedStageIds.includes(nextStageId)) return [...unlockedStageIds];

  return [...unlockedStageIds, nextStageId].sort((first, second) => first - second);
};

export const migrateLegacyAcademyUnlocks = (
  currentStageId: number,
  completedTaskIds: string[],
  stages: Stage[],
): number[] => {
  const completedTaskIdSet = new Set(completedTaskIds);
  const highestCompletedStageId = stages.reduce((highestStageId, stage) => (
    stage.lessons.length > 0 && stage.lessons.every(lesson => completedTaskIdSet.has(lesson.id))
      ? Math.max(highestStageId, stage.id)
      : highestStageId
  ), 0);
  const stageAfterHighestCompleted = Math.min(stages.length, highestCompletedStageId + 1);
  const highestUnlockedStageId = Math.max(
    1,
    Math.min(stages.length, Number(currentStageId) || 1),
    stageAfterHighestCompleted,
  );

  return Array.from({ length: highestUnlockedStageId }, (_, index) => index + 1);
};
