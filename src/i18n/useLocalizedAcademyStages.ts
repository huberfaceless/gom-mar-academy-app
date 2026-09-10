import { useEffect, useState } from 'react';
import type { Stage } from '../types';
import { localizeAcademyStagesFromPatches } from './academyLocalizationRuntime';
import type { AcademyStagePatch } from './academyLocalizationRuntime';
import type { LanguageCode } from './translations';

type AcademyLocalizer = (stages: Stage[]) => Stage[];
type AcademyPatchModule = { default: Record<number, unknown> };

const localizationGroups = [
  {
    from: 1,
    to: 20,
    en: () => import('virtual:academy-localization-en-1-20'),
    pl: () => import('virtual:academy-localization-pl-1-20'),
  },
  {
    from: 21,
    to: 40,
    en: () => import('virtual:academy-localization-en-21-40'),
    pl: () => import('virtual:academy-localization-pl-21-40'),
  },
  {
    from: 41,
    to: 60,
    en: () => import('virtual:academy-localization-en-41-60'),
    pl: () => import('virtual:academy-localization-pl-41-60'),
  },
  {
    from: 61,
    to: 80,
    en: () => import('virtual:academy-localization-en-61-80'),
    pl: () => import('virtual:academy-localization-pl-61-80'),
  },
  {
    from: 81,
    to: 99,
    en: () => import('virtual:academy-localization-en-81-99'),
    pl: () => import('virtual:academy-localization-pl-81-99'),
  },
] satisfies Array<{
  from: number;
  to: number;
  en: () => Promise<AcademyPatchModule>;
  pl: () => Promise<AcademyPatchModule>;
}>;

const allAcademyStageIds = Array.from({ length: 99 }, (_, index) => index + 1);

const resolveLocalizationGroups = (stageIds: number[]) => localizationGroups.filter((group) => (
  stageIds.some((stageId) => stageId >= group.from && stageId <= group.to)
));

export const loadAcademyLocalizer = async (
  language: Exclude<LanguageCode, 'de'>,
  stageIds: number[] = allAcademyStageIds,
): Promise<AcademyLocalizer> => {
  const patchModules = await Promise.all(
    resolveLocalizationGroups(stageIds).map((group) => group[language]()),
  );
  const patches = Object.assign({}, ...patchModules.map((module) => module.default)) as Record<number, AcademyStagePatch>;

  return (stages) => localizeAcademyStagesFromPatches(stages, language, patches);
};

export const useLocalizedAcademyStages = (
  stages: Stage[],
  language: LanguageCode,
  stageIds: number[] = allAcademyStageIds,
): Stage[] => {
  const [localizedStages, setLocalizedStages] = useState<Stage[]>(stages);
  const localizationGroupKey = resolveLocalizationGroups(stageIds)
    .map((group) => `${group.from}-${group.to}`)
    .join(',');

  useEffect(() => {
    let cancelled = false;
    setLocalizedStages(stages);

    if (language === 'de') return () => { cancelled = true; };

    void loadAcademyLocalizer(language, stageIds)
      .then((localize) => {
        if (!cancelled) setLocalizedStages(localize(stages));
      })
      .catch(() => {
        if (!cancelled) setLocalizedStages(stages);
      });

    return () => { cancelled = true; };
  }, [stages, language, localizationGroupKey]);

  return localizedStages;
};
