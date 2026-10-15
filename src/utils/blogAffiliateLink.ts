// Preserve tracking query strings exactly; accept only explicit web links or an explicit opt-out.
export const validateBlogAffiliateLink = (value: unknown): string | null => {
  if (value === null) return null;
  if (typeof value !== 'string' || !value.trim()) throw new Error('Bitte bestätige vor der Blogerstellung deinen Affiliate-/Empfehlungslink oder wähle „Ohne Link erstellen“.');
  const link = value.trim();
  try {
    const url = new URL(link);
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname || url.username || url.password || /[\s<>]/.test(link) || link.length > 4096) throw new Error();
  } catch { throw new Error('Bitte gib einen vollständigen Affiliate-/Empfehlungslink mit https:// oder http:// ein.'); }
  return link;
};
