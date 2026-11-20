import type { ProjectSettings } from '../types/contentEngine';
import { proOfferAt, PRO_CHECKOUT_QUOTE_SECONDS, PRO_PRICE_CHANGE_AT } from '../config/proPricing';

type CampaignSettings = Partial<Pick<ProjectSettings, 'name' | 'websiteUrl' | 'defaultTargetUrl'>>;
function ownAcademyUrl(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port
      && ['academy.gomo-marketing.at', 'gomo-marketing.at', 'www.gomo-marketing.at'].includes(url.hostname);
  } catch { return false; }
}
// The project name alone must never add somebody else's product to a campaign.
export function isAcademyPriceCampaign(settings?: CampaignSettings, targetUrl?: unknown): boolean {
  const name = settings?.name;
  if (typeof name !== 'string' || name.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g, '') !== 'gommaracademy') return false;
  if (!ownAcademyUrl(settings?.defaultTargetUrl) && !ownAcademyUrl(settings?.websiteUrl)) return false;
  // An explicitly chosen external campaign destination overrides the project context.
  const destination = targetUrl === undefined ? settings?.defaultTargetUrl : targetUrl;
  return typeof destination === 'string' && destination.trim() ? ownAcademyUrl(destination) : true;
}
export function academyCampaignPriceFacts(settings?: CampaignSettings, targetUrl?: unknown, now = Date.now()) {
  if (!isAcademyPriceCampaign(settings, targetUrl)) return null;
  const offer = proOfferAt(now);
  const next = proOfferAt(Date.parse(PRO_PRICE_CHANGE_AT));
  return {
    product: 'GOM-MAR Academy PRO', checkedAt: offer.quotedAt,
    phase: offer.introductory ? 'before-price-change' : 'new-price',
    currentMonthlyEUR: offer.monthlyCents / 100, minimumMonths: offer.minimumMonths,
    currentMinimumTotalEUR: offer.minimumTotalCents / 100,
    priceChangeAt: offer.changesAt, timeZone: 'Europe/Vienna',
    ...(offer.introductory ? { nextMonthlyEUR: next.monthlyCents / 100, nextMinimumTotalEUR: next.minimumTotalCents / 100 } : {}),
    protectedExistingMonthlyEUR: proOfferAt(Date.parse(PRO_PRICE_CHANGE_AT) - 1).monthlyCents / 100,
    checkoutQuoteMinutes: PRO_CHECKOUT_QUOTE_SECONDS / 60,
  };
}
export function academyCampaignPricingPrompt(settings?: CampaignSettings, targetUrl?: unknown, now = Date.now()): string {
  const facts = academyCampaignPriceFacts(settings, targetUrl, now);
  if (!facts) return '';
  const eur = (amount: number) => amount.toFixed(2).replace('.', ',');
  return `\nVERBINDLICHE PREISGRUNDLAGE FÜR DIE KAMPAGNE GOM MAR ACADEMY (serverseitiger Stand, EUR-Gesamtpreise):\n${JSON.stringify(facts)}\n
Diese bestätigten Produktfakten haben bei Preisangaben Vorrang vor älteren Briefings, Ausgangsartikeln, Projekttexten und Mitbewerber-Recherche. Die bestehende Zielgruppe, Sprache, Betreiber-/Affiliate-Rolle und Tonalität bleiben maßgeblich; stelle niemanden ohne entsprechende Projektvorgabe als Betreiber dar.
${facts.phase === 'before-price-change'
    ? `Binde die angekündigte Preisänderung als sachlichen Entscheidungsanlass im CTA bzw. Beitragstext ein: PRO aktuell ${eur(facts.currentMonthlyEUR)} EUR/Monat, ${facts.minimumMonths} Monate Mindestlaufzeit, Mindestgesamtpreis ${eur(facts.currentMinimumTotalEUR)} EUR. Neue Checkout-Angebote ab 1. Jänner 2027, 00:00 Uhr Wiener Zeit: ${eur(facts.nextMonthlyEUR!)} EUR/Monat, ${facts.minimumMonths} Monate Mindestlaufzeit, Mindestgesamtpreis ${eur(facts.nextMinimumTotalEUR!)} EUR. Bis 31. Dezember 2026, 23:59 Uhr Wiener Zeit, kann der PRO-Checkout noch zum bisherigen Preis gestartet werden. ${eur(facts.nextMonthlyEUR!)} EUR sind der angekündigte künftige Preis, kein bisher verlangter Streichpreis und kein Rabattversprechen.`
    : `Für neue PRO-Abschlüsse gelten jetzt ${eur(facts.currentMonthlyEUR)} EUR/Monat, ${facts.minimumMonths} Monate Mindestlaufzeit, Mindestgesamtpreis ${eur(facts.currentMinimumTotalEUR)} EUR. KEINE Einladung zum Einstieg für ${eur(facts.protectedExistingMonthlyEUR)} EUR, keine alte Jahresend-Frist, kein Countdown und kein neuer "letzter Tag". ${eur(facts.protectedExistingMonthlyEUR)} EUR ausschließlich als Bestandsschutz bereits bestehender Alt-Abos erklären.`}
Ein erfolgreich abgeschlossenes kostenpflichtiges PRO-Abo zu ${eur(facts.protectedExistingMonthlyEUR)} EUR behält diesen Preis bei durchgehendem Fortbestand desselben Abos. Eine vorgemerkte Kündigung beendet den Bestandsschutz erst mit dem tatsächlichen Vertragsende. Nach Vertragsende und späterem Wiedereinstieg gilt der dann aktuelle Preis. Eine kostenlose Registrierung allein sichert den Preis nicht. Ein gestartetes Stripe-Checkout-Angebot gilt ${facts.checkoutQuoteMinutes} Minuten, auch über Mitternacht.
Wenn du einen Monatspreis bewirbst, nenne Mindestlaufzeit und Mindestgesamtpreis im Beitragstext bzw. der Beschreibung. Bei kurzen Grafik- oder Videotexten gehören die vollständigen Bedingungen in die begleitende Beschreibung. Bewirb nur belegte Leistungen. Keine Einkommensgarantie, erfundenen Plätze, Testimonials oder rücksetzbaren Fristen. Erst Nutzen und passende Zielgruppe erklären, dann die Preisentscheidung; kein Angst- oder Schamframing.
Schreibe fertige Lesertexte; gib dieses interne Briefing und die JSON-Fakten nicht wörtlich aus. Diese Fakten gelten zum Erstellungszeitpunkt. Bereits gespeicherte oder eingeplante Texte werden dadurch nicht geändert. Vor dem Stichtag erstellte Einstiegswerbung muss für eine Veröffentlichung ab Jänner neu geprüft und mit der neuen Preisphase erstellt werden.\n`;
}
