import type { Stage } from '../src/types.js';
import type { CurriculumOverride } from './academyCurriculumAdmin.js';
import type { FirebaseMember } from './firebaseMembershipAdmin.js';

export const resolveAcademyContentAccess = (
  member: FirebaseMember | null,
  token: { email?: string; email_verified?: boolean },
  adminEmails: ReadonlySet<string>,
): { tier: 'FREE' | 'PRO' | 'PREMIUM'; isAdmin: boolean } => {
  if (!member || member.disabled || !member.emailVerified) return { tier: 'FREE', isAdmin: false };
  const verifiedAdminEmail = token.email_verified === true
    && token.email?.toLowerCase() === member.email.toLowerCase()
    && adminEmails.has(member.email.toLowerCase());
  const isAdmin = member.role === 'admin' || verifiedAdminEmail;
  return { tier: isAdmin ? 'PREMIUM' : member.tier, isAdmin };
};

export const visibleAcademyStages = (
  source: Stage[],
  overrides: CurriculumOverride[],
  tier: 'FREE' | 'PRO' | 'PREMIUM',
  isAdmin: boolean,
): Stage[] => {
  const limit = tier === 'FREE' && !isAdmin ? 2 : 99;
  const stages = structuredClone(source.filter((stage) => stage.id <= limit));
  for (const override of overrides) {
    const stage = stages.find((item) => item.id === override.stageId);
    if (!stage) continue;
    const index = stage.lessons.findIndex((lesson) => lesson.id === override.lessonId);
    if (override.deleted || (!isAdmin && override.lesson?.publicationStatus === 'draft')) {
      if (index >= 0) stage.lessons.splice(index, 1);
    } else if (override.lesson) {
      if (index >= 0) stage.lessons[index] = override.lesson;
      else stage.lessons.push(override.lesson);
      stage.lessons.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    }
  }
  return stages;
};
