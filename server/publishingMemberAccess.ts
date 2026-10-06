import { canUseContentProject } from '../src/utils/contentProjectAccess.js';
import { getFirebaseMember, type FirebaseMember } from './firebaseMembershipAdmin.js';

export class PublishingAccessDeniedError extends Error {
  constructor(message = 'Veröffentlichung gesperrt: Ein aktives, bestätigtes PRO-, PREMIUM- oder Administratorkonto ist erforderlich.') {
    super(message);
  }
}

export const requirePublishingMember = async (
  projectId: string,
  userId: string,
  lookup: (projectId: string, userId: string) => Promise<FirebaseMember | null> = getFirebaseMember,
  contentProject?: unknown,
): Promise<void> => {
  if (!userId) throw new PublishingAccessDeniedError();
  const member = await lookup(projectId, userId);
  const adminEmails = new Set((process.env.ACADEMY_ADMIN_EMAILS || 'admin@gom-mar.de')
    .split(',').map(email => email.trim().toLowerCase()).filter(Boolean));
  const isAdmin = member?.role === 'admin' || adminEmails.has(member?.email.toLowerCase() || '');
  if (!canUseContentProject(contentProject, isAdmin)) throw new PublishingAccessDeniedError('Vital50 steht ausschließlich Administratoren zur Verfügung.');
  if (!member || member.uid !== userId || member.disabled || !member.emailVerified
    || !(member.tier === 'PRO' || member.tier === 'PREMIUM' || member.role === 'admin'
      || adminEmails.has(member.email.toLowerCase()))) {
    throw new PublishingAccessDeniedError();
  }
};
