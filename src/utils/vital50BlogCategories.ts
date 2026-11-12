export const VITAL50_CATEGORIES = [
  { slug: 'abnehmen-ab-50', name: 'Abnehmen ab 50' },
  { slug: 'wasser-hydration', name: 'Wasser & Hydration' },
  { slug: 'gesunde-gewohnheiten', name: 'Gesunde Gewohnheiten' },
  { slug: 'energie-vitalitaet', name: 'Energie & Vitalität' },
  { slug: 'rezepte', name: 'Rezepte' },
] as const;
export type Vital50CategorySlug = typeof VITAL50_CATEGORIES[number]['slug'];
export type WordPressCategory = { id: number; slug: Vital50CategorySlug; name: string };
export const isVital50CategorySlug = (value: unknown): value is Vital50CategorySlug => VITAL50_CATEGORIES.some(c => c.slug === value);
// Titles take precedence: incidental mentions in article boilerplate must not decide its category.
export function suggestVital50Category(title: string, topic = '', keyword = ''): Vital50CategorySlug | null {
  for (const text of [title, keyword, topic]) {
    const t = text.toLocaleLowerCase('de');
    if (/rezept|zubereit|koch|backen|smoothie/.test(t)) return 'rezepte';
    if (/hydrat|wasser|trinken|flüssigkeit/.test(t)) return 'wasser-hydration';
    if (/abnehm|bauchfett|gewicht|diät|fettverl|stoffwechsel/.test(t)) return 'abnehmen-ab-50';
    if (/energie|vitalität|müdigkeit|erschöpf|leistungsfähig/.test(t)) return 'energie-vitalitaet';
    if (/gewohnheit|routine|schlaf|stress|achtsam|bewegung|spazier/.test(t)) return 'gesunde-gewohnheiten';
  }
  return null;
}
export function mapVital50Categories(value: unknown): WordPressCategory[] {
  if (!Array.isArray(value)) throw new Error('WordPress hat keine gültige Kategorienliste geliefert.');
  return VITAL50_CATEGORIES.flatMap(category => {
    const matches = value.filter(c => c && c.slug === category.slug && Number.isSafeInteger(c.id) && c.id > 0);
    return matches.length === 1 ? [{ ...category, id: matches[0].id }] : [];
  });
}
