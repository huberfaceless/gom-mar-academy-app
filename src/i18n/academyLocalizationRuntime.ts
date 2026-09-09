import type { Lesson, Stage } from '../types';
import type { LanguageCode } from './translations';
import { preserveAcademyTechnicalFields } from './academyLocalizationIntegrity';

export type AcademyLessonPatch = Partial<Lesson>;
export type AcademyStagePatch = Omit<Partial<Stage>, 'lessons'> & {
  lessons?: Record<string, AcademyLessonPatch>;
};

const withoutEmptyStrings = <T extends object>(value: T | undefined): Partial<T> => Object.fromEntries(
  Object.entries(value || {}).filter(([, item]) => item !== ''),
) as Partial<T>;

const mergeLesson = (lesson: Lesson, patch?: AcademyLessonPatch): Lesson => {
  if (!patch) return lesson;
  return {
    ...lesson,
    ...patch,
    learnContent: { ...lesson.learnContent, ...patch.learnContent },
    understandContent: { ...lesson.understandContent, ...patch.understandContent },
    actionTask: { ...lesson.actionTask, ...patch.actionTask },
  };
};

export const localizeAcademyStagesFromPatches = (
  stages: Stage[],
  language: Exclude<LanguageCode, 'de'>,
  patches: Record<number, AcademyStagePatch>,
): Stage[] => {
  const localizedStages = preserveAcademyTechnicalFields(
    stages,
    stages.map((stage) => {
      const patch = patches[stage.id];
      if (!patch) return stage;
      return {
        ...stage,
        ...patch,
        lessons: stage.lessons.map((lesson) => mergeLesson(lesson, patch.lessons?.[lesson.id])),
      };
    }),
  );

  return localizedStages.map((stage) => ({
    ...stage,
    lessons: stage.lessons.map((lesson) => {
      const translation = lesson.translations?.[language];
      if (!translation) return lesson;
      return {
        ...lesson,
        ...withoutEmptyStrings(translation),
        learnContent: { ...lesson.learnContent, ...withoutEmptyStrings(translation.learnContent) },
        understandContent: { ...lesson.understandContent, ...withoutEmptyStrings(translation.understandContent) },
        actionTask: { ...lesson.actionTask, ...withoutEmptyStrings(translation.actionTask) },
      };
    }),
  }));
};
