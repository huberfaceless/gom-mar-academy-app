import { Stage } from '../types';
import { LanguageCode } from './translations';
import { localizeAcademyStages } from './academyLocalization';
import { localizeAcademyStage81 } from './academyLocalization81';
import { localizeAcademyStage82 } from './academyLocalization82';
import { localizeAcademyStage83 } from './academyLocalization83';
import { localizeAcademyStage84 } from './academyLocalization84';
import { localizeAcademyStage85 } from './academyLocalization85';
import { localizeAcademyStage86 } from './academyLocalization86';
import { localizeAcademyStage87 } from './academyLocalization87';
import { localizeAcademyStage88 } from './academyLocalization88';
import { localizeAcademyStage89 } from './academyLocalization89';
import { localizeAcademyStage90 } from './academyLocalization90';
import { localizeAcademyStage91 } from './academyLocalization91';
import { localizeAcademyStage92 } from './academyLocalization92';
import { localizeAcademyStage93 } from './academyLocalization93';
import { localizeAcademyStage94 } from './academyLocalization94';
import { localizeAcademyStage95 } from './academyLocalization95';
import { localizeAcademyStage96 } from './academyLocalization96';
import { localizeAcademyStage97 } from './academyLocalization97';
import { localizeAcademyStage98 } from './academyLocalization98';
import { localizeAcademyStage99 } from './academyLocalization99';
import { preserveAcademyTechnicalFields } from './academyLocalizationIntegrity';

const withoutEmptyStrings = <T extends object>(value: T | undefined): Partial<T> => Object.fromEntries(
  Object.entries(value || {}).filter(([, item]) => item !== ''),
) as Partial<T>;

export const localizeAllAcademyStages = (
  stages: Stage[],
  language: LanguageCode,
): Stage[] => {
  const localizedStages = preserveAcademyTechnicalFields(
  stages,
  localizeAcademyStage99(
    localizeAcademyStage98(
      localizeAcademyStage97(
        localizeAcademyStage96(
          localizeAcademyStage95(
            localizeAcademyStage94(
              localizeAcademyStage93(
                localizeAcademyStage92(
                  localizeAcademyStage91(
                    localizeAcademyStage90(
                      localizeAcademyStage89(
                        localizeAcademyStage88(
                          localizeAcademyStage87(
                            localizeAcademyStage86(
                              localizeAcademyStage85(
                                localizeAcademyStage84(
                                  localizeAcademyStage83(
                                    localizeAcademyStage82(
                                      localizeAcademyStage81(
                                        localizeAcademyStages(stages, language),
                                        language,
                                      ),
                                      language,
                                    ),
                                    language,
                                  ),
                                  language,
                                ),
                                language,
                              ),
                              language,
                            ),
                            language,
                          ),
                          language,
                        ),
                        language,
                      ),
                      language,
                    ),
                    language,
                  ),
                  language,
                ),
                language,
              ),
              language,
            ),
            language,
          ),
          language,
        ),
        language,
      ),
      language,
    ),
    language,
  ),
  );

  if (language === 'de') return localizedStages;
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
