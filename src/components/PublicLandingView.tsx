import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Tv, 
  Play, 
  LogIn,
  AlertCircle
} from 'lucide-react';
import gommarLogo from '../assets/images/gommar_logo.jpg';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface PublicLandingViewProps {
  onCancelToMemberArea?: () => void;
  onOpenLegal?: (tab: 'imprint' | 'privacy' | 'terms' | 'disclaimer' | 'cookies') => void;
}

export const PublicLandingView: React.FC<PublicLandingViewProps> = ({
  onCancelToMemberArea,
  onOpenLegal,
}) => {
  const { register, login, error: authError, clearError } = useAuth();

  // Form inputs
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedNiche, setSelectedNiche] = useState<string>('Faceless Content & Reels');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>('');

  // VSL video playback state
  const [isPlayingVsl, setIsPlayingVsl] = useState<boolean>(false);

  // Auth modal toggle for direct login
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    const trimmedEmail = email.trim();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    if (!firstName.trim()) {
      setLocalError('Bitte gib deinen Vornamen ein.');
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setLocalError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!password || password.length < 6) {
      setLocalError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(trimmedEmail, password, fullName || undefined);
      // Firebase state will automatically switch to AUTHENTICATED_NOT_VERIFIED and prompt email verification
    } catch (err: any) {
      setLocalError(err?.message || 'Registrierung fehlgeschlagen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navigation for Visitors */}
      <header className="border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border border-slate-700/80 p-0.5 overflow-hidden flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/10">
              <img 
                src={gommarLogo} 
                alt="GOM-MAR Academy" 
                className="w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                GOM-MAR <span className="text-indigo-400">Academy</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium">Offizielle Anmeldeseite für Besucher</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bereits Mitglied? Anmelden</span>
            </button>

            {onCancelToMemberArea && (
              <button
                onClick={onCancelToMemberArea}
                className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Vorschau schließen
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 pt-8 sm:pt-12 space-y-12">
        {/* HERO SECTION & VSL */}
        <div className="space-y-10 animate-fadeIn">
          {/* Hero Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold tracking-wide uppercase">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Kostenfreie Mitglieder-Anmeldung</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              So baust du dir ohne Vorkenntnisse ein profitables <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Faceless Online-Business</span> auf
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
              Sichere dir deinen persönlichen Zugang zur <strong className="text-white">GOM-MAR Academy</strong>. Erhalte Schritt-für-Schritt Videos, automatisierte E-Mail-Funnel und die besten KI-Vorlagen für deinen Erfolg.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const elem = document.getElementById('register-form');
                  if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🚀 Direkt zum kostenlosen Anmeldeformular</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VSL Teaser Video Player Box */}
          <div className="relative aspect-video max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />

            <div className="relative z-20 flex items-center justify-between text-xs text-slate-300">
              <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 font-bold text-emerald-400 flex items-center gap-1.5">
                <Tv className="w-3.5 h-3.5" />
                GOM-MAR Masterclass VSL Video
              </span>
              <span className="font-mono text-slate-400">Dauer: 6:45 Min</span>
            </div>

            <div className="relative z-20 text-center my-auto space-y-3">
              {!isPlayingVsl ? (
                <button
                  onClick={() => setIsPlayingVsl(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-current" />
                </button>
              ) : (
                <div className="bg-slate-950/90 backdrop-blur p-4 rounded-2xl border border-slate-800 max-w-md mx-auto text-left space-y-2">
                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    VSL Vorschau aktiv (Sprachausgabe)
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "In dieser Academy mit 99 Etappen lernst du Schritt für Schritt, wie du eine automatisierte Kampagne mit E-Mail-Marketing aufbaust..."
                  </p>
                </div>
              )}

              <p className="text-sm font-bold text-white">
                Klicke auf Play, um das Einführungsvideo für die Academy zu sehen
              </p>
            </div>

            <div className="relative z-20 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>✅ 100% Kostenlos für Einsteiger</span>
              <span>🔥 Über 1.200 aktive Absolventen</span>
            </div>
          </div>

          {/* REAL FIREBASE REGISTRATION CARD */}
          <div id="register-form" className="max-w-xl mx-auto bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden scroll-mt-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>Kostenloses Konto erstellen</span>
              </h3>
              <p className="text-xs text-slate-300">
                Erstelle deinen sicheren Zugang zur GOM-MAR Academy. Wir senden dir anschließend eine Bestätigungs-E-Mail zur Freischaltung.
              </p>
            </div>

            {(localError || authError) && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{localError || authError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    Vorname *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="z.B. Sarah"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    Nachname
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="z.B. Lindemann"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  Deine E-Mail-Adresse *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="deine-email@domain.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  Passwort wählen * (mind. 6 Zeichen)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Mindestens 6 Zeichen"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  Deine Wunsch-Nische
                </label>
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 transition-colors"
                >
                  <option value="Faceless Content & Reels">Faceless Content & Social Media Reels</option>
                  <option value="Digital Products & E-Books">Digitale Produkte & E-Books</option>
                  <option value="High-Ticket Affiliate Marketing">High-Ticket Affiliate Marketing</option>
                  <option value="SaaS & KI Dienstleistungen">SaaS & KI Dienstleistungen</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Registrierung läuft...' : '🚀 Kostenlos registrieren & Bestätigungslink anfordern'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Sichere Firebase Authentifizierung • 100% DSGVO-konform
              </span>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer"
              >
                Du hast bereits ein Konto? Hier anmelden →
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>99-Etappen-Masterclass</span>
            </h4>
            <p className="text-xs text-slate-400">
              99 praxisnahe Etappen mit Lektionen, Videos, Vorlagen und umsetzbaren Strategien.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>E-Mail Automation</span>
            </h4>
            <p className="text-xs text-slate-400">
              Integrierter Kampagnen- und Autoresponder-Builder für maximale Conversion.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Frag GOM-MAR KI</span>
            </h4>
            <p className="text-xs text-slate-400">
              24/7 intelligenter Mentor für Content-Hooks, Skripte, Funnel-Optimierung und Copywriting.
            </p>
          </div>
        </div>

        {/* Footer Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-8 border-t border-slate-900">
          <button
            type="button"
            onClick={() => onOpenLegal?.('imprint')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            Impressum
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenLegal?.('privacy')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            Datenschutzerklärung
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenLegal?.('terms')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            AGB
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenLegal?.('disclaimer')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            Disclaimer
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onOpenLegal?.('cookies')}
            className="hover:text-slate-300 transition-colors cursor-pointer"
          >
            Cookie-Einstellungen
          </button>
        </div>
      </div>

      {/* Direct Login Modal */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        initialMode="login"
      />
    </div>
  );
};
