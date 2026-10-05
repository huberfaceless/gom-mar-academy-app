import { getFirebaseMember, type FirebaseMember } from './firebaseMembershipAdmin.js';

export class PublishingAccessDeniedError extends Error {
  constructor() {
    super('Veröffentlichung gesperrt: Ein aktives, bestätigtes PRO-, PREMIUM- oder Administratorkonto ist erforderlich.');
  }
}

export const requirePublishingMember = async (
  projectId: string,
  userId: string,
  lookup: (projectId: string, userId: string) => Promise<FirebaseMember | null> = getFirebaseMember,
): Promise<void> => {
  if (!userId) throw new PublishingAccessDeniedError();
  const member = await lookup(projectId, userId);
  const adminEmails = new Set((process.env.ACADEMY_ADMIN_EMAILS || 'admin@gom-mar.de')
    .split(',').map(email => email.trim().toLowerCase()).filter(Boolean));
  if (!member || member.uid !== userId || member.disabled || !member.emailVerified
    || !(member.tier === 'PRO' || member.tier === 'PREMIUM' || member.role === 'admin'
      || adminEmails.has(member.email.toLowerCase()))) {
    throw new PublishingAccessDeniedError();
  }
};
