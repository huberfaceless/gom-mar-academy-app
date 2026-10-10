export const PRO_SALES_COUNTRIES = ['AT', 'DE', 'PL'] as const;
export type ProSalesCountry = typeof PRO_SALES_COUNTRIES[number];

export const isProSalesCountry = (value: unknown): value is ProSalesCountry =>
  typeof value === 'string' && PRO_SALES_COUNTRIES.some(country => country === value);
