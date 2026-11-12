/** Editorial sources: deliberately separate from paid/affiliate recommendations. */
export const BLOG_REFERENCES = [
  { id: 'at-adipositas', title: 'Übergewicht und Adipositas bei Erwachsenen', publisher: 'Österreichisches Gesundheitsportal', url: 'https://www.gesundheit.gv.at/krankheiten/stoffwechsel/adipositas.html', keywords: 'abnehmen bauchfett gewicht adipositas diät stoffwechsel kalorien' },
  { id: 'at-bewegung', title: 'Abnehmen mit Bewegung', publisher: 'Österreichisches Gesundheitsportal', url: 'https://www.gesundheit.gv.at/leben/bewegung/sport-ernaehrung/abnehmen.html', keywords: 'bewegung muskel krafttraining abnehmen bauchfett sport' },
  { id: 'dge-ernaehrung', title: 'Gut essen und trinken – DGE-Empfehlungen', publisher: 'Deutsche Gesellschaft für Ernährung', url: 'https://www.dge.de/gesunde-ernaehrung/gut-essen-und-trinken/dge-empfehlungen/', keywords: 'ernährung essen rezept protein abnehmen gewicht frühstück' },
  { id: 'dge-wasser', title: 'Am besten Wasser trinken', publisher: 'Deutsche Gesellschaft für Ernährung', url: 'https://www.dge.de/gesunde-ernaehrung/gut-essen-und-trinken/dge-empfehlungen/am-besten-wasser-trinken/', keywords: 'wasser trinken hydration flüssigkeit elektrolyte' },
  { id: 'iqwig-schlaf', title: 'Was tun bei Schlafproblemen?', publisher: 'IQWiG · Gesundheitsinformation.de', url: 'https://www.gesundheitsinformation.de/was-tun-bei-schlafproblemen.html', keywords: 'schlaf schlafen müde müdigkeit erholung gewohnheiten' },
  { id: 'at-stress', title: 'Stress bewältigen', publisher: 'Österreichisches Gesundheitsportal', url: 'https://www.gesundheit.gv.at/leben/stress/entspannt-bleiben.html', keywords: 'stress entspannung cortisol gewohnheiten' },
] as const;
export type BlogReference = typeof BLOG_REFERENCES[number];
export function selectedBlogReferences(ids?: string[]): BlogReference[] {
  return BLOG_REFERENCES.filter(item => ids?.includes(item.id));
}
export function isEditorialReference(href?: string): boolean {
  return BLOG_REFERENCES.some(item => item.url === href);
}
export function isWordPressImageUrl(value: unknown): value is string {
  try { const url = new URL(String(value)); return url.origin === 'https://vital50.gomo-marketing.at' && url.pathname.startsWith('/wp-content/uploads/') && !url.username && !url.password; } catch { return false; }
}
