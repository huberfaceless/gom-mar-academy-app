import React, { useEffect } from 'react';
import { Crown, Lock, X } from 'lucide-react';
import type { AcademyTier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import type { LanguageCode } from '../i18n/translations';

const modalCopy: Record<LanguageCode, Record<string, string>> = {
  de: {
    badge: 'Geschützter Tarifzugang',
    accessTitle: '{tier}-Zugang erforderlich',
    changeTitle: 'Tarifwechsel anfragen',
    accessText: 'Diese Funktion gehört zum {tier}-Tarif. Dein aktueller Tarif bleibt unverändert.',
    changeText: 'Tarife werden nur nach bestätigter Freigabe durch die Academy-Verwaltung geändert. Eine Auswahl im Profil schaltet keine kostenpflichtigen Funktionen frei.',
    current: 'Aktueller Tarif',
    required: 'Benötigter Tarif',
    profile: 'Tarife im Profil ansehen',
    close: 'Schließen',
  },
  en: {
    badge: 'Protected plan access',
    accessTitle: '{tier} access required',
    changeTitle: 'Request a plan change',
    accessText: 'This feature belongs to the {tier} plan. Your current plan remains unchanged.',
    changeText: 'Plans change only after confirmed approval by Academy administration. Selecting a plan in the profile does not unlock paid features.',
    current: 'Current plan',
    required: 'Required plan',
    profile: 'View plans in profile',
    close: 'Close',
  },
  pl: {
    badge: 'Chroniony dostęp taryfowy',
    accessTitle: 'Wymagany dostęp {tier}',
    changeTitle: 'Poproś o zmianę taryfy',
    accessText: 'Ta funkcja należy do taryfy {tier}. Twoja obecna taryfa pozostaje bez zmian.',
    changeText: 'Taryfa zmienia się dopiero po zatwierdzeniu przez administrację Academy. Wybór w profilu nie odblokowuje płatnych funkcji.',
    current: 'Obecna taryfa',
    required: 'Wymagana taryfa',
    profile: 'Zobacz taryfy w profilu',
    close: 'Zamknij',
  },
};

interface MembershipAccessModalProps {
  isOpen: boolean;
  mode: 'access' | 'change';
  currentTier: AcademyTier;
  requestedTier: AcademyTier;
  onClose: () => void;
  onOpenProfile: () => void;
}

export const MembershipAccessModal: React.FC<MembershipAccessModalProps> = ({
  isOpen,
  mode,
  currentTier,
  requestedTier,
  onClose,
  onOpenProfile,
}) => {
  const { language } = useLanguage();
  const copy = modalCopy[language];

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="membership-access-title"
        className="relative w-full max-w-md space-y-5 rounded-3xl border border-indigo-400/40 bg-white p-6 text-slate-900 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
          {mode === 'access' ? <Lock className="h-7 w-7" /> : <Crown className="h-7 w-7" />}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">{copy.badge}</p>
          <h2 id="membership-access-title" className="text-2xl font-black">
            {(mode === 'access' ? copy.accessTitle : copy.changeTitle).replace('{tier}', requestedTier)}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            {(mode === 'access' ? copy.accessText : copy.changeText).replace('{tier}', requestedTier)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 text-center">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">{copy.current}</p>
            <p className="mt-1 font-black text-slate-800">{currentTier}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">{copy.required}</p>
            <p className="mt-1 font-black text-indigo-700">{requestedTier}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white hover:bg-indigo-700"
          >
            {copy.profile}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            {copy.close}
          </button>
        </div>
      </div>
    </div>
  );
};
