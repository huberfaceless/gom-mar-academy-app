import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Phone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import gommarLogo from '../assets/images/gommar_logo.jpg';

export type AuthModalMode = 'login' | 'register' | 'forgot_password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthModalMode;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess
}) => {
  const { login, register, resetPassword, error, clearError } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [mode, setMode] = useState<AuthModalMode>(initialMode);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [whatsappConsent, setWhatsappConsent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string>('');

  // Sync mode whenever initialMode or isOpen changes
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormError('');
      setResetSuccessMsg('');
      clearError();
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSwitchMode = (newMode: AuthModalMode) => {
    setMode(newMode);
    setFormError('');
    setResetSuccessMsg('');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setResetSuccessMsg('');
    clearError();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setFormError(t('auth.validation.email'));
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setFormError(t('auth.validation.name'));
        return;
      }
      if (!password || password.length < 6) {
        setFormError(t('auth.validation.password'));
        return;
      }
      if (phoneNumber.trim()) {
        const phoneDigits = phoneNumber.replace(/\D/g, '').replace(/^00/, '');
        if ((!phoneNumber.trim().startsWith('+') && !phoneNumber.trim().startsWith('00')) || phoneDigits.length < 8 || phoneDigits.length > 15) {
          setFormError(language === 'de' ? 'Bitte gib die Telefonnummer mit Ländervorwahl ein, zum Beispiel +43.' : language === 'pl' ? 'Podaj numer telefonu z kodem kraju, na przykład +48.' : 'Enter the phone number with country code, for example +43.');
          return;
        }
      }

      setIsSubmitting(true);
      try {
        await register(trimmedEmail, password, name.trim(), phoneNumber.trim(), whatsappConsent);
        if (onSuccess) onSuccess();
        onClose();
      } catch (err: unknown) {
        setFormError(err instanceof Error ? err.message : t('auth.failure.register'));
      } finally {
        setIsSubmitting(false);
      }
    } else if (mode === 'login') {
      if (!password) {
        setFormError(t('auth.validation.passwordRequired'));
        return;
      }

      setIsSubmitting(true);
      try {
        await login(trimmedEmail, password);
        if (onSuccess) onSuccess();
        onClose();
      } catch (err: unknown) {
        setFormError(err instanceof Error ? err.message : t('auth.failure.login'));
      } finally {
        setIsSubmitting(false);
      }
    } else if (mode === 'forgot_password') {
      setIsSubmitting(true);
      try {
        await resetPassword(trimmedEmail);
        setResetSuccessMsg(t('auth.resetSent', { email: trimmedEmail }));
      } catch (err: unknown) {
        setFormError(err instanceof Error ? err.message : t('auth.failure.reset'));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t('auth.close')}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-0.5 shadow-xs mx-auto overflow-hidden flex items-center justify-center">
            <img 
              src={gommarLogo} 
              alt="GOM-MAR Academy" 
              className="w-full h-full object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            {mode === 'login' && t('auth.loginTitle')}
            {mode === 'register' && t('auth.registerTitle')}
            {mode === 'forgot_password' && t('auth.resetTitle')}
          </h2>

          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {mode === 'login' && t('auth.loginSubtitle')}
            {mode === 'register' && t('auth.registerSubtitle')}
            {mode === 'forgot_password' && t('auth.resetSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2" aria-label="Sprache / Language / Język">
          {([
            ['de', 'Deutsch'],
            ['en', 'English'],
            ['pl', 'Polski'],
          ] as const).map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              aria-pressed={language === code}
              className={`rounded-xl border px-2 py-2 text-xs font-bold transition-colors ${
                language === code
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mode Switcher Tabs (Login / Register) */}
        {mode !== 'forgot_password' && (
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                mode === 'login' 
                  ? 'bg-white text-slate-950 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('auth.loginTab')}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('register')}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer ${
                mode === 'register' 
                  ? 'bg-white text-slate-950 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t('auth.registerTab')}
            </button>
          </div>
        )}

        {/* Error or Success Messages */}
        {(formError || error) && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{formError || error}</span>
          </div>
        )}

        {resetSuccessMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{resetSuccessMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {mode === 'register' && (
            <>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.name')}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('auth.namePlaceholder')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'de' ? 'Telefonnummer (freiwillig)' : language === 'pl' ? 'Numer telefonu (opcjonalnie)' : 'Phone number (optional)'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (!e.target.value.trim()) setWhatsappConsent(false);
                  }}
                  placeholder="+43 660 1234567"
                  autoComplete="tel"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                {language === 'de' ? 'Damit eingehende WhatsApp-Nachrichten deinem Academy-Konto zugeordnet werden können.' : language === 'pl' ? 'Umożliwia przypisanie przychodzących wiadomości WhatsApp do konta Academy.' : 'Used to assign incoming WhatsApp messages to your Academy account.'}
              </p>
            </div>
            <label className={`flex items-start gap-2 rounded-xl border p-3 text-xs ${phoneNumber.trim() ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
              <input
                type="checkbox"
                checked={whatsappConsent}
                disabled={!phoneNumber.trim()}
                onChange={(e) => setWhatsappConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600"
              />
              <span>
                {language === 'de' ? 'Ich möchte freiwillig wichtige Academy-Informationen und Angebote per WhatsApp erhalten. Die Einwilligung kann jederzeit widerrufen werden.' : language === 'pl' ? 'Dobrowolnie zgadzam się na otrzymywanie przez WhatsApp ważnych informacji i ofert Academy. Zgodę można w każdej chwili wycofać.' : 'I voluntarily agree to receive important Academy information and offers via WhatsApp. I can withdraw consent at any time.'}
              </span>
            </label>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          {mode !== 'forgot_password' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  {t('auth.password')}
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('forgot_password')}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                  >
                    {t('auth.forgot')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.passwordPlaceholder')}
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
          >
            <span>
              {isSubmitting ? (
                t('auth.processing')
              ) : mode === 'login' ? (
                t('auth.loginAction')
              ) : mode === 'register' ? (
                t('auth.registerAction')
              ) : (
                t('auth.resetAction')
              )}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back to Login link when in forgot password */}
        {mode === 'forgot_password' && (
          <button
            type="button"
            onClick={() => handleSwitchMode('login')}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
          >
            {t('auth.back')}
          </button>
        )}

        <div className="pt-2 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t('auth.security')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
