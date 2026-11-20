// 01.01.2027, 00:00 Europe/Vienna. Server time determines every new checkout.
export const PRO_PRICE_CHANGE_AT = '2026-12-31T23:00:00.000Z';
export const PRO_2026_CONTRACT = 'pro-six-months-2026-10';
export const PRO_2027_CONTRACT = 'pro-six-months-2027-01';
export const PRO_CHECKOUT_QUOTE_SECONDS = 31 * 60;
export type ProOffer = {
  contractVersion: string;
  monthlyCents: number;
  minimumMonths: number;
  minimumTotalCents: number;
  currency: 'eur';
  introductory: boolean;
  changesAt: string;
  quotedAt: string;
};
export const proOfferAt = (now = Date.now()): ProOffer => {
  if (!Number.isFinite(now)) throw new Error('Ungültiger Preiszeitpunkt.');
  const introductory = now < Date.parse(PRO_PRICE_CHANGE_AT);
  const monthlyCents = introductory ? 2990 : 4990;
  return { contractVersion: introductory ? PRO_2026_CONTRACT : PRO_2027_CONTRACT,
    monthlyCents, minimumMonths: 6, minimumTotalCents: monthlyCents * 6,
    currency: 'eur', introductory, changesAt: PRO_PRICE_CHANGE_AT, quotedAt: new Date(now).toISOString() };
};
export const isSixMonthContractVersion = (version: unknown): boolean =>
  version === PRO_2026_CONTRACT || version === PRO_2027_CONTRACT;
export const proPrice = (cents: number, language: 'de' | 'en' | 'pl') =>
  new Intl.NumberFormat({ de: 'de-AT', en: 'en-IE', pl: 'pl-PL' }[language], { style: 'currency', currency: 'EUR' }).format(cents / 100);
