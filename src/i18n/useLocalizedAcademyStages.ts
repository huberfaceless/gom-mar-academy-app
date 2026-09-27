import type { Stage } from '../types';
import type { LanguageCode } from './translations';

// The API returns localized stages after validating the member's tier.
// Do not ship paid translation patches in the browser bundle.
export const useLocalizedAcademyStages = (
  stages: Stage[],
  _language: LanguageCode,
  _stageIds?: number[],
): Stage[] => stages;
