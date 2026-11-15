const hashtagWord = (value: string): string => value.normalize('NFKC').replace(/[^\p{L}\p{N}_]/gu, '');
const hashtagKey = (value: string): string => hashtagWord(value).toLocaleLowerCase('de');

// Keep prose and hashtags in separate fields, including legacy model output.
// URL fragments and Markdown anchors must remain part of the description.
export function splitSocialCaption(description = '', keywords: string[] = []): { description: string; keywords: string[] } {
  const extracted: string[] = [];
  const prose = description.replace(/(^|\s)#([\p{L}\p{M}\p{N}_]+)/gu, (_match, prefix, word) => {
    extracted.push(word);
    return prefix;
  }).replace(/[ \t]+\n/g, '\n').replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  const seen = new Set<string>();
  const combined = [...keywords, ...extracted].map(word => word.trim().replace(/^#+/, '')).filter(word => {
    const key = hashtagKey(word);
    if (!key || seen.has(key)) return false;
    seen.add(key); return true;
  });
  return { description: prose, keywords: combined };
}

export function buildSocialCaption(description = '', keywords: string[] = []): string {
  const content = splitSocialCaption(description, keywords);
  const tags = content.keywords.map(word => `#${hashtagWord(word)}`).join(' ');
  return [content.description, tags].filter(Boolean).join('\n\n');
}
