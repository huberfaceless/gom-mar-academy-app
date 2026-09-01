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
