type StageAudioStatus = { stageId: number; lessons: { id: string; cached: boolean }[] };

// Read-only status requests, limited to three concurrent stages.
export const loadAcademyAudioStatuses = async (
  stageIds: number[],
  request: (stageId: number) => Promise<StageAudioStatus>,
  receive: (status: StageAudioStatus) => void,
  cancelled: () => boolean,
): Promise<number> => {
  const queue = [...new Set(stageIds)];
  let failures = 0;
  const worker = async () => {
    while (!cancelled() && queue.length) {
      const stageId = queue.shift()!;
      try {
        const result = await request(stageId);
        if (result.stageId !== stageId || !Array.isArray(result.lessons)
          || result.lessons.some(lesson => typeof lesson.id !== 'string'
            || !lesson.id.startsWith(`${stageId}.`) || typeof lesson.cached !== 'boolean')) {
          throw new Error('Ungültiger Audio-Status.');
        }
        if (!cancelled()) receive(result);
      } catch {
        failures += 1;
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(3, queue.length) }, worker));
  return failures;
};
