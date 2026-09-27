import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { VerifyEmailAction } from './components/VerifyEmailAction.tsx';
import { ResetPasswordAction } from './components/ResetPasswordAction.tsx';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.pathname === '/verify-email' ? <VerifyEmailAction /> : window.location.pathname === '/reset-password' ? <ResetPasswordAction /> : (
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    )}
  </StrictMode>,
);
