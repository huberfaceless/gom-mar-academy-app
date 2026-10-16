import { validateBlogAffiliateLink } from './blogAffiliateLink';

export const isEditablePinterestTarget = (status: unknown): boolean =>
  ['DRAFT', 'AI_GENERATED', 'APPROVED', 'NEEDS_REVIEW'].includes(String(status || '').toUpperCase());

export const resolvePinterestTargetUrl = (selected: unknown, projectDefault?: unknown): string => {
  const value = selected === undefined ? projectDefault : selected;
  if (value === undefined || value === null || value === '') return '';
  const link = validateBlogAffiliateLink(value) || '';
  if (link.length > 2048) throw new Error('Die Pinterest-Zieladresse darf höchstens 2048 Zeichen enthalten.');
  return link;
};

// Add tracking before a fragment; retain existing query bytes and tracking values.
export const pinterestTrackingUrl = (target: string, campaign: string, angle: string): string => {
  let link: string;
  try { link = resolvePinterestTargetUrl(target); } catch { return ''; }
  if (!link) return '';
  const url = new URL(link);
  const extra = new URLSearchParams();
  for (const [key, value] of Object.entries({ utm_source: 'pinterest', utm_medium: 'pin', utm_campaign: campaign, utm_content: `angle_${angle}` })) {
    if (!url.searchParams.has(key)) extra.set(key, value);
  }
  if (!extra.size) return link;
  const hashAt = link.indexOf('#');
  const base = hashAt < 0 ? link : link.slice(0, hashAt);
  const fragment = hashAt < 0 ? '' : link.slice(hashAt);
  const separator = base.includes('?') ? /[?&]$/.test(base) ? '' : '&' : '?';
  return `${base}${separator}${extra}${fragment}`;
};
