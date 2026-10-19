export type PinterestEnvironment = 'production' | 'sandbox';

export function parsePinterestEnvironment(value: unknown): PinterestEnvironment {
  if (value === undefined || value === 'production') return 'production';
  if (value === 'sandbox') return 'sandbox';
  throw new Error('Bitte wähle Produktion oder Sandbox als Pinterest-Umgebung.');
}

export function pinterestApiBase(environment: PinterestEnvironment): string {
  return parsePinterestEnvironment(environment) === 'sandbox'
    ? 'https://api-sandbox.pinterest.com/v5'
    : 'https://api.pinterest.com/v5';
}
