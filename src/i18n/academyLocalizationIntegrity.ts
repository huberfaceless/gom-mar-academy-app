import { Stage } from '../types';

export const preserveAcademyTechnicalFields = (sourceStages: Stage[], localizedStages: Stage[]): Stage[] =>
  localizedStages.map((stage, stageIndex) => {
    const sourceStage = sourceStages.find(source => source.id === stage.id) ?? sourceStages[stageIndex];
    if (!sourceStage) return stage;

    return {
      ...stage,
      id: sourceStage.id,
      color: sourceStage.color,
      badgeIcon: sourceStage.badgeIcon,
      lessons: stage.lessons.map((lesson, lessonIndex) => {
        const sourceLesson = sourceStage.lessons.find(source => source.id === lesson.id) ?? sourceStage.lessons[lessonIndex];
        if (!sourceLesson) return lesson;

        return {
          ...lesson,
          id: sourceLesson.id,
          stageId: sourceLesson.stageId,
          durationMinutes: sourceLesson.durationMinutes,
          learnContent: {
            ...lesson.learnContent,
            videoDuration: sourceLesson.learnContent.videoDuration,
            videoUrl: sourceLesson.learnContent.videoUrl,
            videoChapters: lesson.learnContent.videoChapters?.map((chapter, index) => ({
              ...chapter,
              time: sourceLesson.learnContent.videoChapters?.[index]?.time ?? chapter.time,
            })),
            coreConcepts: lesson.learnContent.coreConcepts?.map((concept, index) => {
              const sourceConcept = sourceLesson.learnContent.coreConcepts?.[index];
              return sourceConcept ? {
                ...concept,
                iconName: sourceConcept.iconName,
                highlight: sourceConcept.highlight,
              } : concept;
            }),
            resources: lesson.learnContent.resources?.map((resource, index) => {
              const sourceResource = sourceLesson.learnContent.resources?.[index];
              return sourceResource ? {
                ...resource,
                type: sourceResource.type,
                iconName: sourceResource.iconName,
                actionUrl: sourceResource.actionUrl,
              } : resource;
            }),
            actionBanner: lesson.learnContent.actionBanner && sourceLesson.learnContent.actionBanner ? {
              ...lesson.learnContent.actionBanner,
              actionUrl: sourceLesson.learnContent.actionBanner.actionUrl,
              iconName: sourceLesson.learnContent.actionBanner.iconName,
            } : lesson.learnContent.actionBanner,
          },
          actionTask: {
            ...lesson.actionTask,
            inputType: sourceLesson.actionTask.inputType,
            toolboxCategory: sourceLesson.actionTask.toolboxCategory,
          },
        };
      }),
    };
  });
