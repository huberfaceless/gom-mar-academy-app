import { useEffect, useRef, useState } from 'react';
import { applyActionCode } from 'firebase/auth';
import { auth } from '../firebase/config';
import gommarLogo from '../assets/images/gommar_logo.jpg';

type Language = 'de' | 'en' | 'pl';
type State = 'loading' | 'success' | 'error';

const copy = {
  de: { loading: 'E-Mail-Adresse wird bestätigt …', success: 'Deine E-Mail-Adresse wurde bestätigt', description: 'Du kannst dich jetzt bei der GOM-MAR Academy anmelden.', error: 'Dieser Bestätigungslink ist ungültig oder wurde bereits verwendet.', retry: 'Fordere nach der Anmeldung eine neue Bestätigungs-E-Mail an.', continue: 'Zur Academy' },
  en: { loading: 'Verifying your email address …', success: 'Your email address has been verified', description: 'You can now sign in to GOM-MAR Academy.', error: 'This verification link is invalid or has already been used.', retry: 'Sign in to request a new verification email.', continue: 'Continue to Academy' },
  pl: { loading: 'Potwierdzanie adresu e-mail …', success: 'Twój adres e-mail został potwierdzony', description: 'Możesz teraz zalogować się do GOM-MAR Academy.', error: 'Ten link potwierdzający jest nieprawidłowy lub został już użyty.', retry: 'Zaloguj się, aby poprosić o nową wiadomość potwierdzającą.', continue: 'Przejdź do Academy' },
};

export function VerifyEmailAction() {
  const params = new URLSearchParams(window.location.search);
  const language: Language = params.get('lang') === 'en' || params.get('lang') === 'pl' ? params.get('lang') as Language : 'de';
  const code = params.get('oobCode');
  const started = useRef(false);
  const [state, setState] = useState<State>(code ? 'loading' : 'error');
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${t.success} | GOM-MAR Academy`;
    if (!code || started.current) return;
    started.current = true;
    window.history.replaceState(null, '', '/verify-email');
    void applyActionCode(auth, code)
      .then(() => setState('success'))
      .catch(() => setState('error'));
  }, [code, language, t.success]);

  return (
    <main className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <img src={gommarLogo} alt="GOM-MAR Academy" className="mx-auto mb-6 h-16 w-16 rounded-2xl object-contain" />
        <h1 className="mb-4 text-2xl font-bold text-slate-900" role="status">
          {state === 'loading' ? t.loading : state === 'success' ? t.success : t.error}
        </h1>
        {state !== 'loading' && <p className="mb-6 text-slate-600">{state === 'success' ? t.description : t.retry}</p>}
        {state !== 'loading' && <a href="/" className="inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">{t.continue}</a>}
      </div>
    </main>
  );
}
