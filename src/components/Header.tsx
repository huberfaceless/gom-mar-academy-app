import React, { useState } from 'react';
import { LogIn, LogOut, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import gommarLogo from '../assets/images/gommar_logo.jpg';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  user: UserProfile;
  onOpenFragGommar?: (prompt?: string) => void;
  onNavigate: (view: string) => void;
  activeView?: string;
  onToggleRegistrationStatus?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onNavigate, 
  activeView
}) => {
  const { user: firebaseUser, authState, logout } = useAuth();
  const { t } = useLanguage();
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | null>(null);

  const isLight = user.theme === 'clean-light' || !user.theme;
  const isAdmin = user.role === 'admin';
  const isAuthenticated = Boolean(firebaseUser);
  const isEmailVerified = Boolean(firebaseUser?.emailVerified);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-30 ${
        isLight 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900' 
          : 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100'
      } px-4 lg:px-8 py-3.5 shadow-xs transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LEFT: Branding/Badge on desktop */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  isEmailVerified 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {isEmailVerified ? (
                    <>
                      <UserCheck className="w-3 h-3 text-emerald-600" />
                      <span>{t('header.verified')}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                      <span>{t('header.unverified')}</span>
                    </>
                  )}
                </span>
                <span className="text-slate-400 text-xs truncate max-w-[140px]">
                  {firebaseUser?.email}
                </span>
              </div>
            ) : (
              <span className="text-slate-400 text-xs">
                {t('header.visitor')}
              </span>
            )}
          </div>

          {/* CENTER: GOM-MAR Academy Headline & Logo */}
          <div 
            className="flex flex-col items-center justify-center text-center cursor-pointer group flex-1"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200/90 p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden flex items-center justify-center shrink-0">
                <img 
                  src={gommarLogo} 
                  alt="GOM-MAR Academy Logo" 
                  className="w-full h-full object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <h1 className={`font-black text-xl sm:text-2xl md:text-3xl tracking-tight leading-none ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  GOM-MAR Academy
                </h1>
                <span className="bg-indigo-600 text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm shadow-indigo-600/30">
                  {user.tier}
                </span>
              </div>
            </div>
            <p className={`text-xs sm:text-sm font-medium tracking-wide mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {t('header.tagline')}
            </p>
          </div>

          {/* RIGHT: Actions (Admin / Auth) */}
          <div className="w-auto flex items-center justify-end gap-2.5">
            {isAdmin && (
              <button
                onClick={() => onNavigate('admin')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border ${
                  activeView === 'admin'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border-amber-500/30'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">{t('header.admin')}</span>
                <span className="sm:hidden">Admin</span>
              </button>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                title={t('header.logoutTitle')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 border border-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">{t('header.logout')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAuthModalMode('login')}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('header.login')}</span>
                </button>
              </div>
            )}
            <LanguageSelector compact />
          </div>
        </div>
      </header>

      {/* Auth Modal for Login / Register */}
      {authModalMode && (
        <AuthModal
          isOpen={Boolean(authModalMode)}
          onClose={() => setAuthModalMode(null)}
          initialMode={authModalMode}
        />
      )}
    </>
  );
};
