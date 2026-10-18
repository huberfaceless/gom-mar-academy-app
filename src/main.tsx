import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { VerifyEmailAction } from './components/VerifyEmailAction.tsx';
import { ResetPasswordAction } from './components/ResetPasswordAction.tsx';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { auth } from './firebase/config';
import { createBrowserErrorReporter, installBrowserErrorMonitoring } from './services/browserErrorMonitoring';
import './index.css';

if (import.meta.env.PROD) {
  installBrowserErrorMonitoring(window, createBrowserErrorReporter({
    getToken: async () => {
      await auth.authStateReady();
      return auth.currentUser ? auth.currentUser.getIdToken() : null;
    },
    send: window.fetch.bind(window),
  }));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary view="root">
    {window.location.pathname === '/verify-email' ? <VerifyEmailAction /> : window.location.pathname === '/reset-password' ? <ResetPasswordAction /> : (
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    )}
    </AppErrorBoundary>
  </StrictMode>,
);
