import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useLanguage } from './LanguageContext';
import {
  registerWithEmail,
  loginWithEmail,
  logout as firebaseLogout,
  sendVerificationEmail as firebaseSendVerification,
  reloadCurrentUser,
  sendPasswordReset,
  getFirebaseAuthErrorMessage
} from '../firebase/auth';

export type AuthStateType = 
  | 'LOADING' 
  | 'NOT_AUTHENTICATED' 
  | 'AUTHENTICATED_NOT_VERIFIED' 
  | 'AUTHENTICATED_VERIFIED';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  emailVerified: boolean;
  authState: AuthStateType;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  refreshVerificationStatus: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authenticated = Boolean(user);
  const emailVerified = Boolean(user && user.emailVerified);

  let authState: AuthStateType = 'LOADING';
  if (loading) {
    authState = 'LOADING';
  } else if (!user) {
    authState = 'NOT_AUTHENTICATED';
  } else if (!user.emailVerified) {
    authState = 'AUTHENTICATED_NOT_VERIFIED';
  } else {
    authState = 'AUTHENTICATED_VERIFIED';
  }

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const signedInUser = await loginWithEmail(email, password);
      setUser(signedInUser);
    } catch (err) {
      const msg = getFirebaseAuthErrorMessage(err, language);
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName?: string): Promise<void> => {
    setError(null);
    setLoading(true);
    try {
      const registeredUser = await registerWithEmail(email, password, displayName);

      // Commit the authenticated user before sending email. This guarantees that
      // registration always advances to the verification screen, even if email
      // delivery is temporarily unavailable.
      setUser(registeredUser);

      try {
        await firebaseSendVerification(registeredUser, language);
      } catch (verificationError) {
        setError(getFirebaseAuthErrorMessage(verificationError, language));
      }
    } catch (err) {
      const msg = getFirebaseAuthErrorMessage(err, language);
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setError(null);
    try {
      await firebaseLogout();
      setUser(null);
    } catch (err) {
      const msg = getFirebaseAuthErrorMessage(err, language);
      setError(msg);
      throw new Error(msg);
    }
  };

  const sendVerificationEmail = async (): Promise<void> => {
    setError(null);
    try {
      await firebaseSendVerification(user, language);
    } catch (err) {
      const msg = getFirebaseAuthErrorMessage(err, language);
      setError(msg);
      throw new Error(msg);
    }
  };

  const refreshVerificationStatus = async (): Promise<boolean> => {
    setError(null);
    try {
      const result = await reloadCurrentUser();
      setUser(result.user);
      return result.emailVerified;
    } catch (err) {
      const msg = getFirebaseAuthErrorMessage(err, language);
      setError(msg);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setError(null);
    try {
      await sendPasswordReset(email, language);
    } catch (err) {
      const msg = getFirebaseAuthErrorMessage(err, language);
      setError(msg);
      throw new Error(msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated,
        emailVerified,
        authState,
        error,
        login,
        register,
        logout,
        sendVerificationEmail,
        refreshVerificationStatus,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
