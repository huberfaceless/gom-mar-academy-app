import { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { contentHubText } from './contentHubCopy';

export const useContentHubCopy = () => {
  const { language } = useLanguage();
  const hubText = useCallback((source: string, ...values: unknown[]) => contentHubText(language, source, ...values), [language]);
  return { language, hubText };
};
