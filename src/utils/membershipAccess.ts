import type { AcademyTier, UserRole } from '../types';

const TIER_RANK: Record<AcademyTier, number> = {
  FREE: 0,
  PRO: 1,
  PREMIUM: 2,
};

const PRO_VIEWS = new Set(['contentEngine', 'email', 'toolbox']);

export const normalizeAcademyTier = (value: unknown): AcademyTier => (
  value === 'PRO' || value === 'PREMIUM' ? value : 'FREE'
);

export const resolveMembershipClaims = (
  claims: Record<string, unknown>,
  email?: string | null,
): { tier: AcademyTier; role: UserRole } => {
  const isAdmin = claims.academyRole === 'admin'
    || claims.admin === true
    || email?.toLowerCase() === 'admin@gom-mar.de';

  return {
    tier: isAdmin ? 'PREMIUM' : normalizeAcademyTier(claims.academyTier),
    role: isAdmin ? 'admin' : 'member',
  };
};

export const canAccessView = (
  view: string,
  tier: AcademyTier,
  role: UserRole = 'member',
): boolean => {
  if (role === 'admin') return true;
  if (view === 'admin') return false;
  if (PRO_VIEWS.has(view)) return TIER_RANK[tier] >= TIER_RANK.PRO;
  return true;
};

export const requiredTierForView = (view: string): AcademyTier | null => (
  PRO_VIEWS.has(view) ? 'PRO' : null
);

export const getAcademyStageLimit = (
  tier: AcademyTier,
  role: UserRole = 'member',
  totalStages = 99,
): number => (role === 'admin' || TIER_RANK[tier] >= TIER_RANK.PRO
  ? totalStages
  : Math.min(2, totalStages));
