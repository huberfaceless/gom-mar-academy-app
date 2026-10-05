import { getFirebaseMember, type FirebaseMember } from './firebaseMembershipAdmin.js';

export class MemberSessionDeniedError extends Error {
  constructor() { super('Das Konto oder die Sitzung ist nicht mehr gültig.'); }
}

type SessionToken = {
  sub: string;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  academyTier?: unknown;
  academyRole?: unknown;
  admin?: unknown;
};

// Erst nach der kryptografischen Tokenprüfung aufrufen. Keine Rechte aus alten Claims übernehmen.
export const resolveCurrentMemberSession = async <T extends SessionToken>(
  projectId: string,
  token: T,
  lookup: (projectId: string, uid: string) => Promise<FirebaseMember | null> = getFirebaseMember,
): Promise<T> => {
  const member = await lookup(projectId, token.sub);
  const validAfter = member?.tokensValidAfterSeconds;
  if (!member || member.uid !== token.sub || member.disabled
    || !Number.isFinite(token.auth_time)
    || (validAfter !== undefined && (!Number.isFinite(validAfter) || validAfter < 0 || token.auth_time < validAfter))) {
    throw new MemberSessionDeniedError();
  }
  return {
    ...token,
    email: member.email,
    email_verified: member.emailVerified,
    academyTier: member.tier,
    academyRole: member.role,
    admin: member.role === 'admin',
  };
};
