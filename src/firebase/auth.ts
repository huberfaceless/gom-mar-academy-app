import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  reload,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from './config';
import { LanguageCode, TranslationKey, translations } from '../i18n/translations';

const tr = (language: LanguageCode, key: TranslationKey) => translations[language][key] || translations.de[key];

/**
 * Translates Firebase Auth error codes into clean, user-friendly German messages.
 */
export function getFirebaseAuthErrorMessage(error: unknown, language: LanguageCode = 'de'): string {
  if (!error) return tr(language, 'auth.error.unknown');

  const authError = error as AuthError;
  const code = authError.code || '';

  switch (code) {
    case 'auth/email-already-in-use':
      return tr(language, 'auth.error.emailInUse');
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return tr(language, 'auth.error.invalidCredential');
    case 'auth/user-not-found':
      return tr(language, 'auth.error.userNotFound');
    case 'auth/weak-password':
      return tr(language, 'auth.error.weakPassword');
    case 'auth/invalid-email':
      return tr(language, 'auth.validation.email');
    case 'auth/too-many-requests':
      return tr(language, 'auth.error.tooManyRequests');
    case 'auth/network-request-failed':
      return tr(language, 'auth.error.network');
    case 'auth/user-disabled':
      return tr(language, 'auth.error.userDisabled');
    case 'auth/operation-not-allowed':
      return tr(language, 'auth.error.operationNotAllowed');
    case 'auth/requires-recent-login':
      return tr(language, 'auth.error.recentLogin');
    default:
      if (authError.message) {
        return `${tr(language, 'auth.error.prefix')}: ${authError.message}`;
      }
      return tr(language, 'auth.error.generic');
  }
}

/**
 * Register a new user with email and password and set the display name.
 * Verification email delivery is handled by AuthContext after the user state is committed.
 */
export async function registerWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const user = userCredential.user;

  if (displayName && displayName.trim()) {
    try {
      await updateProfile(user, {
        displayName: displayName.trim()
      });
    } catch (profileErr) {
      console.warn('Could not set displayName on registration:', profileErr);
    }
  }


  return user;
}

/**
 * Log in an existing user with email and password.
 */
export async function loginWithEmail(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return userCredential.user;
}

/**
 * Log out the current Firebase user.
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * Send or re-send the Firebase email verification link to the currently signed in user.
 */
export async function sendVerificationEmail(userToVerify?: User | null, language: LanguageCode = 'de'): Promise<void> {
  const targetUser = userToVerify || auth.currentUser;
  if (!targetUser) {
    throw new Error(tr(language, 'auth.error.noUser'));
  }
  await sendEmailVerification(targetUser);
}

/**
 * Reload the current Firebase user from server and return the fresh emailVerified status.
 */
export async function reloadCurrentUser(): Promise<{ user: User | null; emailVerified: boolean }> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return { user: null, emailVerified: false };
  }
  await reload(currentUser);
  return {
    user: auth.currentUser,
    emailVerified: auth.currentUser ? auth.currentUser.emailVerified : false
  };
}

/**
 * Send password reset email.
 */
export async function sendPasswordReset(email: string, language: LanguageCode = 'de'): Promise<void> {
  if (!email || !email.trim()) {
    throw new Error(tr(language, 'auth.validation.email'));
  }
  await sendPasswordResetEmail(auth, email.trim());
}
