import { GoogleAuth } from 'google-auth-library';

export type AcademyTier = 'FREE' | 'PRO' | 'PREMIUM';

type FirebaseAccount = {
  localId?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  disabled?: boolean;
  customAttributes?: string;
  createdAt?: string;
  lastLoginAt?: string;
};

type FirebaseAccountsResponse = {
  users?: FirebaseAccount[];
  nextPageToken?: string;
};

export type FirebaseMember = {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
  disabled: boolean;
  tier: AcademyTier;
  role: 'member' | 'admin';
  createdAt?: string;
  lastSignInAt?: string;
};

const IDENTITY_TOOLKIT_BASE_URL = 'https://identitytoolkit.googleapis.com/v1';
const googleAuth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

const normalizeTier = (value: unknown): AcademyTier => {
  if (value === 'PRO' || value === 'PREMIUM') return value;
  return 'FREE';
};

const parseClaims = (customAttributes?: string): Record<string, unknown> => {
  if (!customAttributes) return {};
  try {
    const parsed = JSON.parse(customAttributes) as unknown;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : {};
  } catch {
    return {};
  }
};

export const buildTierCustomAttributes = (
  customAttributes: string | undefined,
  tier: AcademyTier,
): { customAttributes: string; previousTier: AcademyTier } => {
  const existingClaims = parseClaims(customAttributes);
  return {
    customAttributes: JSON.stringify({ ...existingClaims, academyTier: tier }),
    previousTier: normalizeTier(existingClaims.academyTier),
  };
};

const getAccessToken = async (): Promise<string> => {
  const client = await googleAuth.getClient();
  const accessToken = await client.getAccessToken();
  if (!accessToken.token) {
    throw new Error('Google-Anmeldedaten für die Firebase-Verwaltung fehlen.');
  }
  return accessToken.token;
};

const firebaseAdminRequest = async <T>(
  projectId: string,
  endpoint: string,
  init: RequestInit = {},
): Promise<T> => {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${IDENTITY_TOOLKIT_BASE_URL}/projects/${encodeURIComponent(projectId)}/${endpoint}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...init.headers,
      },
    },
  );

  if (!response.ok) {
    const details = await response.text();
    console.error('Firebase-Admin-Anfrage fehlgeschlagen', {
      endpoint,
      status: response.status,
      details: details.slice(0, 500),
    });
    throw new Error('Firebase-Mitgliederverwaltung ist derzeit nicht verfügbar.');
  }

  return response.json() as Promise<T>;
};

const toFirebaseMember = (account: FirebaseAccount): FirebaseMember | null => {
  if (!account.localId) return null;
  const claims = parseClaims(account.customAttributes);
  const isAdmin = claims.academyRole === 'admin' || claims.admin === true;
  return {
    uid: account.localId,
    email: account.email || '',
    displayName: account.displayName || account.email?.split('@')[0] || 'Mitglied',
    emailVerified: account.emailVerified === true,
    disabled: account.disabled === true,
    tier: isAdmin ? 'PREMIUM' : normalizeTier(claims.academyTier),
    role: isAdmin ? 'admin' : 'member',
    createdAt: account.createdAt,
    lastSignInAt: account.lastLoginAt,
  };
};

export const listFirebaseMembers = async (
  projectId: string,
  pageToken?: string,
): Promise<{ members: FirebaseMember[]; nextPageToken?: string }> => {
  const params = new URLSearchParams({ maxResults: '1000' });
  if (pageToken) params.set('nextPageToken', pageToken);

  const response = await firebaseAdminRequest<FirebaseAccountsResponse>(
    projectId,
    `accounts:batchGet?${params.toString()}`,
  );

  return {
    members: (response.users || [])
      .map(toFirebaseMember)
      .filter((member): member is FirebaseMember => member !== null),
    nextPageToken: response.nextPageToken,
  };
};

export const updateFirebaseMemberTier = async (
  projectId: string,
  uid: string,
  tier: AcademyTier,
): Promise<{ member: FirebaseMember; previousTier: AcademyTier }> => {
  const lookup = await firebaseAdminRequest<FirebaseAccountsResponse>(
    projectId,
    'accounts:lookup',
    {
      method: 'POST',
      body: JSON.stringify({ localId: [uid] }),
    },
  );
  const account = lookup.users?.[0];
  if (!account?.localId) throw new Error('Firebase-Mitglied wurde nicht gefunden.');

  const { customAttributes, previousTier } = buildTierCustomAttributes(account.customAttributes, tier);

  const updated = await firebaseAdminRequest<FirebaseAccount>(
    projectId,
    'accounts:update',
    {
      method: 'POST',
      body: JSON.stringify({ localId: uid, customAttributes }),
    },
  );
  const member = toFirebaseMember({ ...account, ...updated, customAttributes });
  if (!member) throw new Error('Firebase-Mitglied konnte nicht aktualisiert werden.');

  return { member, previousTier };
};
