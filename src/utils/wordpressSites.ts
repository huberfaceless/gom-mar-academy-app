import type { ProjectSettings } from '../types/contentEngine';
export const VITAL50_WORDPRESS_ORIGIN = 'https://vital50.gomo-marketing.at';
export const GOMO_WORDPRESS_ORIGIN = 'https://gomo-marketing.at';
export function wordpressSiteOrigin(value: unknown): string | null {
  try {
    if (typeof value !== 'string') return null;
    const url = new URL(value);
    return !url.username && !url.password && !url.search && !url.hash && [VITAL50_WORDPRESS_ORIGIN, GOMO_WORDPRESS_ORIGIN].includes(url.origin) ? url.origin : null;
  } catch { return null; }
}
export const automaticWordPressPublication = (settings?: Pick<ProjectSettings, 'websiteUrl' | 'wordpressAutoPublish'>): boolean =>
  wordpressSiteOrigin(settings?.websiteUrl) === GOMO_WORDPRESS_ORIGIN && settings?.wordpressAutoPublish !== false;
