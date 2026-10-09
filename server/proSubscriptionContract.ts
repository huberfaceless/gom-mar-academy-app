export const PRO_CONTRACT_VERSION = 'pro-six-months-2026-10';
export const PRO_MONTHLY_CENTS = 2990;
export const PRO_MINIMUM_MONTHS = 6;

// Keep the billing anchor's day; clamp only in the destination month.
export const addCalendarMonths = (seconds: number, months: number): number => {
  if (!Number.isSafeInteger(seconds) || seconds <= 0 || !Number.isSafeInteger(months) || months < 0) throw new Error('Ungültiges Vertragsdatum.');
  const date = new Date(seconds * 1000);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return Math.floor(date.getTime() / 1000);
};

export const ordinaryCancellationAt = (start: number, periodEnd: number): number => {
  if (!Number.isSafeInteger(periodEnd) || periodEnd <= start) throw new Error('Ungültiger Abrechnungszeitraum.');
  return Math.max(addCalendarMonths(start, PRO_MINIMUM_MONTHS), periodEnd);
};

export const sixMonthCheckoutEnabled = (): boolean => process.env.STRIPE_PRO_SIX_MONTH_ENABLED === 'true';
