import { useEffect, useRef, useState, type FormEvent } from 'react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebase/config';
import gommarLogo from '../assets/images/gommar_logo.jpg';

type Language = 'de' | 'en' | 'pl';
type State = 'checking' | 'form' | 'saving' | 'success' | 'error';

const copy = {
  de: { title: 'Passwort zurücksetzen', checking: 'Link wird geprüft …', label: 'Neues Passwort', hint: 'Mindestens 8 Zeichen', button: 'Neues Passwort speichern', success: 'Dein Passwort wurde geändert.', error: 'Dieser Link ist ungültig oder abgelaufen. Fordere eine neue E-Mail an.', weak: 'Wähle ein Passwort mit mindestens 8 Zeichen.', failed: 'Das Passwort konnte nicht gespeichert werden. Bitte versuche es erneut.', continue: 'Zur Academy' },
  en: { title: 'Reset password', checking: 'Checking your link …', label: 'New password', hint: 'At least 8 characters', button: 'Save new password', success: 'Your password has been changed.', error: 'This link is invalid or has expired. Request a new email.', weak: 'Choose a password with at least 8 characters.', failed: 'Could not save the password. Please try again.', continue: 'Continue to Academy' },
  pl: { title: 'Zresetuj hasło', checking: 'Sprawdzanie linku …', label: 'Nowe hasło', hint: 'Co najmniej 8 znaków', button: 'Zapisz nowe hasło', success: 'Twoje hasło zostało zmienione.', error: 'Ten link jest nieprawidłowy lub wygasł. Poproś o nową wiadomość.', weak: 'Wybierz hasło zawierające co najmniej 8 znaków.', failed: 'Nie udało się zapisać hasła. Spróbuj ponownie.', continue: 'Przejdź do Academy' },
};

export function ResetPasswordAction() {
  const params = new URLSearchParams(window.location.search);
  const language: Language = params.get('lang') === 'en' || params.get('lang') === 'pl' ? params.get('lang') as Language : 'de';
  const code = params.get('oobCode');
  const started = useRef(false);
  const [state, setState] = useState<State>(code ? 'checking' : 'error');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${t.title} | GOM-MAR Academy`;
    if (!code || started.current) return;
    started.current = true;
    window.history.replaceState(null, '', '/reset-password');
    void verifyPasswordResetCode(auth, code)
      .then(() => setState('form'))
      .catch(() => setState('error'));
  }, [code, language, t.title]);

  const savePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!code || state !== 'form') return;
    if (password.length < 8) { setFeedback(t.weak); return; }
    setFeedback('');
    setState('saving');
    try {
      await confirmPasswordReset(auth, code, password);
      setPassword('');
      setState('success');
    } catch {
      setFeedback(t.failed);
      setState('form');
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <img src={gommarLogo} alt="GOM-MAR Academy" className="mx-auto mb-6 h-16 w-16 rounded-2xl object-contain" />
        <h1 className="mb-4 text-2xl font-bold text-slate-900">{t.title}</h1>
        {(state === 'checking' || state === 'saving') && <p className="text-slate-600" role="status">{t.checking}</p>}
        {state === 'form' && <form onSubmit={(event) => { void savePassword(event); }} className="space-y-4 text-left">
          <label className="block text-sm font-semibold text-slate-700" htmlFor="new-password">{t.label}</label>
          <input id="new-password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-300 p-3" />
          <p className="text-sm text-slate-500">{t.hint}</p>
          {feedback && <p role="alert" className="text-sm text-rose-700">{feedback}</p>}
          <button type="submit" className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">{t.button}</button>
        </form>}
        {state === 'success' && <p className="mb-6 text-slate-600" role="status">{t.success}</p>}
        {state === 'error' && <p className="mb-6 text-rose-700" role="alert">{t.error}</p>}
        {(state === 'success' || state === 'error') && <a href="/" className="inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">{t.continue}</a>}
      </div>
    </main>
  );
}
