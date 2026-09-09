import { useEffect, useState } from 'react';
import type { Stage } from '../types';
import { localizeAcademyStagesFromPatches } from './academyLocalizationRuntime';
import type { AcademyStagePatch } from './academyLocalizationRuntime';
import type { LanguageCode } from './translations';

type AcademyLocalizer = (stages: Stage[]) => Stage[];

export const loadAcademyLocalizer = async (language: Exclude<LanguageCode, 'de'>): Promise<AcademyLocalizer> => {
  if (language === 'en') {
    return import('virtual:academy-localization-en').then(({ default: patches }) => (
      (stages) => localizeAcademyStagesFromPatches(
        stages,
        language,
        patches as Record<number, AcademyStagePatch>,
      )
    ));
  }
  return import('virtual:academy-localization-pl').then(({ default: patches }) => (
    (stages) => localizeAcademyStagesFromPatches(
      stages,
      language,
      patches as Record<number, AcademyStagePatch>,
    )
  ));
};

export const useLocalizedAcademyStages = (stages: Stage[], language: LanguageCode): Stage[] => {
  const [localizedStages, setLocalizedStages] = useState<Stage[]>(stages);

  useEffect(() => {
    let cancelled = false;
    setLocalizedStages(stages);

    if (language === 'de') return () => { cancelled = true; };

    void loadAcademyLocalizer(language)
      .then((localize) => {
        if (!cancelled) setLocalizedStages(localize(stages));
      })
      .catch(() => {
        if (!cancelled) setLocalizedStages(stages);
      });

    return () => { cancelled = true; };
  }, [stages, language]);

  return localizedStages;
};
