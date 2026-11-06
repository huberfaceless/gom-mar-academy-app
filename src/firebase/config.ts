import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, Firestore, setLogLevel } from 'firebase/firestore';

// Silence noisy internal gRPC stream error dumps to console
try {
  setLogLevel('silent');
} catch {
  // Ignore in environments where setLogLevel might not be permitted
}

const getEnvVar = (key: string, defaultValue: string): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env as any)[key]) {
    return (import.meta.env as any)[key];
  }
  return defaultValue;
};

/**
 * Firebase Client & Server Configuration using provided project credentials
 */
export const firebaseConfig = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY", "AIzaSyAobCxRbzvnqDaUXVpoV489M5pG1_yc5nQ"),
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN", "gom-mar-akademie.firebaseapp.com"),
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID", "gom-mar-akademie"),
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET", "gom-mar-akademie.firebasestorage.app"),
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID", "705013800205"),
  appId: getEnvVar("VITE_FIREBASE_APP_ID", "1:705013800205:web:1ca69ad13929a25f222444"),
  databaseId: getEnvVar("VITE_FIREBASE_DATABASE_ID", "(default)"),
};

// Check if Firebase is properly configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey.length > 5
);

// Initialize Firebase app safely
export const app = getApps().length > 0 
  ? getApp() 
  : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
auth.languageCode = 'de';

// Initialize Firestore
export const db: Firestore = firebaseConfig.databaseId && firebaseConfig.databaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.databaseId)
  : getFirestore(app);

// A configured client may attempt its first request. Only transport failures throttle retries.
let firestoreApiAvailable = true;
let lastAvailabilityCheck = 0;
const CHECK_COOLDOWN_MS = 15 * 1000; // Retry transient transport failures after 15 seconds

export function isFirestoreOperational(): boolean {
  if (!isFirebaseConfigured) return false;
  if (!firestoreApiAvailable) {
    if (Date.now() - lastAvailabilityCheck > CHECK_COOLDOWN_MS) {
      // Cooldown expired, allow one probe
      lastAvailabilityCheck = Date.now();
      return true;
    }
    return false;
  }
  return firestoreApiAvailable;
}

export function setFirestoreOperational(available: boolean): void {
  firestoreApiAvailable = available;
  lastAvailabilityCheck = Date.now();
}

export function handleFirestoreError(err: unknown): void {
  const errMsg = err instanceof Error ? err.message : String(err);
  if (
    errMsg.includes('has not been used in project') ||
    errMsg.includes('disabled') ||
    errMsg.includes('unavailable') ||
    errMsg.includes('offline') ||
    errMsg.includes('timed out')
  ) {
    firestoreApiAvailable = false;
    lastAvailabilityCheck = Date.now();
  }
}



