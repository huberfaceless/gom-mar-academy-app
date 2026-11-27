import type { ProjectSettings } from '../types/contentEngine';

export const WEAREREAL_REFERRAL_URL = 'https://wearereal.com/de/tribe/wearereal?real=2002708';
export const WEAREREAL_SOURCE_URL = 'https://www.forbes.at/artikel/we-are-real-wie-marvin-steinberg-und-paul-kliks-das-vertrauen-im-digitalen-zeitalter-neu-denken-2';
export const WEAREREAL_TOPICS = [
  'Viele Kontakte, wenig Verbindung: Was ich mir von einer Community wünsche',
  'Eine Frage stellen, statt allein weiterzusuchen: Wissensaustausch in einer Community',
  'Vom stillen Mitlesen zum ersten Gespräch: Gemeinschaft entdecken',
  'Wer steckt hinter dem Profil? Vertrauen und verifizierte Identitäten',
  'Aus einer gemeinsamen Idee kann Zusammenarbeit entstehen',
];

/** Opt-in admin template; never inserted into member projects or existing campaigns. */
export function createWeAreRealProject(userId: string): ProjectSettings {
  return {
    id: `proj_wearereal_${userId}`, userId, name: 'WeAreReal Community', websiteUrl: '',
    promotionPreset: 'wearereal', storytelling: true, pinterestTextPosition: 'bottom-left',
    targetAudience: 'Erwachsene, die sich echten Austausch, Zugehörigkeit, gemeinsame Interessen und Zusammenarbeit wünschen',
    coreTopics: ['WeAreReal Community', 'Zugehörigkeit', 'Vertrauen', 'Wissensaustausch', 'Zusammenarbeit'],
    language: 'de', defaultTargetUrl: WEAREREAL_REFERRAL_URL,
    defaultCta: 'Entdecke WeAreReal über meinen Empfehlungslink.',
    brandVoice: 'Warm, bodenständig, persönlich und konkret. Ich bin Stefan und empfehle die Community als Mitglied über meinen Empfehlungslink; ich spreche nicht als Betreiber von WeAreReal. Keine erfundenen eigenen Erlebnisse oder Mitgliederstimmen. Keine Einkommens- oder Erfolgsversprechen.',
    pinterestBoardDefault: 'Mindset & Money', youtubeChannelName: '', wordpressAutoPublish: false,
    createdAt: new Date().toISOString(),
  };
}

export function promotionStoryPrompt(settings?: Partial<ProjectSettings>): string {
  const source = settings?.promotionPreset === 'wearereal' ? `
WeAreReal-Projektgrundlage (Stand 27.11.2026):
Quelle: ${WEAREREAL_SOURCE_URL}, veröffentlicht am 05.11.2026, auf Forbes.at ausdrücklich als Advertorial gekennzeichnet. Unternehmensdarstellung, keine unabhängige Empfehlung, Prüfung oder Auszeichnung durch Forbes.
Begrenzte Quellenzusammenfassung: Die Plattform stellt verifizierte Identitäten und persönliche Beziehungen in den Mittelpunkt. Beschriebene Nutzungsmotive sind Gemeinschaft, Wissensaustausch und Zusammenarbeit. Diese Ziele sind keine zugesicherten individuellen Ergebnisse. Verifizierung ist keine Garantie für Sicherheit oder Vertrauenswürdigkeit.
Keine Preise, Mitgliederzahlen, Paketleistungen oder Provisionen aus dieser Grundlage ableiten. Quelle nur paraphrasieren. Keine weiteren angeblichen Forbes-Aussagen oder Quellen erfinden. Stefan ist empfehlendes Mitglied, nicht Betreiber der Community. Empfohlene Rollen transparent darstellen. Die ausdrücklich bestätigte Zieladresse hat Vorrang vor jeder Vorlage; Quellenadresse nicht als Werbeziel einsetzen.
` : '';
  const stories = settings?.storytelling === true ? `
Mini-Storytelling als verbindliche Erzählvorgabe:
Baue eine konkrete, leicht vorstellbare Alltagsszene auf: Szene → Wunsch oder kleine Spannung → glaubwürdiger Wendepunkt → praktischer Nutzen → freiwillige Einladung.
Erzeuge Wiedererkennen, Neugier, Zugehörigkeit und Selbstwirksamkeit durch konkrete Details und verständliche Sprache. Keine Angst-, Scham- oder Drucktricks, künstliche Verknappung oder erfundenen Erfolgsbelege.
Keine erfundenen Ich-Erlebnisse, Kundenstimmen, Zitate oder real wirkenden Mitgliedergeschichten. Ohne belegtes Erlebnis mit einer ausdrücklich hypothetischen Szene beginnen, z. B. „Stell dir vor …“. Keine fiktive Szene als Beweis für Plattformwirkungen verwenden.
Für kurze Posts, Pin-Beschreibungen, Shorts und E-Mails je eine eigenständige Mini-Story. Für Blog und längere Videos eine kurze Einstiegsszene und passende spätere Rückbezüge. Kanalgrenzen und Zeichenlimits bleiben verbindlich.
Pin-Bildtext: kurze emotionale Headline plus höchstens eine kurze ergänzende Zeile; die eigentliche Mini-Story in die Beschreibung. Bildmotiv zum Moment passend, ohne Schrift oder eingebettete Logos; im unteren Bildbereich ruhige Fläche für linksbündigen Text lassen.
` : '';
  return source + stories;
}
