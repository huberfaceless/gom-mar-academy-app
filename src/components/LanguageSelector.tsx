import React from 'react';
import { Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';

interface LanguageSelectorProps {
  compact?: boolean;
}

const languageOptions: Array<{ value: LanguageCode; shortLabel: string; translationKey: 'language.de' | 'language.en' | 'language.pl' }> = [
  { value: 'de', shortLabel: 'DE', translationKey: 'language.de' },
  { value: 'en', shortLabel: 'EN', translationKey: 'language.en' },
  { value: 'pl', shortLabel: 'PL', translationKey: 'language.pl' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className={`inline-flex items-center gap-2 ${compact ? '' : 'w-full sm:w-auto'}`}>
      <span className="sr-only">{t('language.label')}</span>
      {!compact && <Globe2 className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />}
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as LanguageCode)}
        aria-label={t('language.label')}
        className={`rounded-xl border border-slate-200 bg-white font-bold text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${
          compact ? 'max-w-[70px] px-2 py-1.5 text-xs' : 'min-w-44 px-3 py-2.5 text-sm'
        }`}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {compact ? option.shortLabel : t(option.translationKey)}
          </option>
        ))}
      </select>
    </label>
  );
};
