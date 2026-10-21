export const contentGenerationLanguage = (value: unknown): 'de' | 'en' | 'pl' =>
  value === 'en' || value === 'pl' ? value : 'de';

export const contentLanguageInstruction = (value: unknown): string => {
  const language = { de: 'German', en: 'English', pl: 'Polish' }[contentGenerationLanguage(value)];
  return `Output language: ${language}. Write all reader-facing text, headings, narration, descriptions, labels, calls to action and hashtags in ${language}, even when the topic, brief, brand settings or JSON examples use another language. Keep JSON property names, enum values, URLs, IDs and brand names unchanged. Return valid JSON only.`;
};

export const recommendationLabel = (value: unknown): string =>
  ({ de: 'Zur Empfehlung', en: 'View recommendation', pl: 'Zobacz rekomendację' })[contentGenerationLanguage(value)];
