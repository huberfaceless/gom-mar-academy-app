import React, { useState, useEffect } from 'react';
import { Settings, Key, RefreshCw, CheckCircle2, AlertCircle, Palette, Moon, Sun, Sparkles, Languages } from 'lucide-react';
import { UserProfile } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onResetProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser, onResetProgress }) => {
  const { t } = useLanguage();
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHasApiKey(data.hasKey))
      .catch(() => setHasApiKey(false));
  }, []);

  const themeOptions: Array<{
    id: NonNullable<UserProfile['theme']>;
    name: string;
    desc: string;
    previewBg: string;
    badgeColor: string;
    icon: typeof Moon;
  }> = [
    {
      id: 'dark-emerald',
      name: 'GOM-MAR Emerald Dark',
      desc: t('settings.theme.emeraldDescription'),
      previewBg: 'bg-slate-950 border-emerald-500',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      icon: Moon,
    },
    {
      id: 'cyber-slate',
      name: 'Cyber Slate & Cyan',
      desc: t('settings.theme.cyberDescription'),
      previewBg: 'bg-slate-900 border-cyan-500',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      icon: Sparkles,
    },
    {
      id: 'deep-indigo',
      name: 'Midnight Violet',
      desc: t('settings.theme.violetDescription'),
      previewBg: 'bg-zinc-950 border-purple-500',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: Palette,
    },
    {
      id: 'clean-light',
      name: 'Clean Light Layout',
      desc: t('settings.theme.lightDescription'),
      previewBg: 'bg-slate-100 border-slate-400',
      badgeColor: 'bg-emerald-600/10 text-emerald-700 border-emerald-600/30',
      icon: Sun,
    },
  ];

  const currentTheme = user.theme || 'dark-emerald';

  const handleSelectTheme = (themeId: 'dark-emerald' | 'cyber-slate' | 'deep-indigo' | 'clean-light') => {
    onUpdateUser({ ...user, theme: themeId });
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
          <Settings className="w-3.5 h-3.5 text-slate-600" />
          {t('settings.badge')}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{t('settings.title')}</h2>
        <p className="text-xs sm:text-sm text-slate-600">{t('settings.description')}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
            <Languages className="w-5 h-5 text-indigo-600" />
            {t('settings.languageTitle')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{t('language.description')}</p>
        </div>
        <LanguageSelector />
      </div>

      {/* Erscheinungsbild / Theme Switcher Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600" />
            {t('settings.appearanceTitle')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {t('settings.appearanceDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themeOptions.map((opt) => {
            const isSelected = currentTheme === opt.id;
            const IconComp = opt.icon;

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectTheme(opt.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-600/20 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider flex items-center gap-1 ${
                      isSelected ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 'bg-white text-slate-700 border-slate-200'
                    }`}>
                      <IconComp className="w-3 h-3" />
                      {opt.name}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" /> {t('settings.active')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{opt.desc}</p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                    <span className="w-3 h-3 rounded-full bg-indigo-600" />
                    <span className="w-3 h-3 rounded-full bg-sky-500" />
                  </div>
                  <button
                    type="button"
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isSelected ? t('settings.selected') : t('settings.activate')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* API Key Status */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
          <Key className="w-5 h-5 text-indigo-600" />
          {t('settings.apiTitle')}
        </h3>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {hasApiKey ? (
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold border border-amber-200">
                <AlertCircle className="w-6 h-6" />
              </div>
            )}

            <div>
              <p className="text-sm font-bold text-slate-950">
                {hasApiKey ? t('settings.apiConnected') : t('settings.apiManaged')}
              </p>
              <p className="text-xs text-slate-500">
                {t('settings.apiSecurity')}
              </p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            hasApiKey ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {hasApiKey ? t('settings.active') : hasApiKey === null ? t('settings.apiChecking') : t('settings.apiReady')}
          </span>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="bg-white border border-rose-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-rose-700 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-rose-600" />
          {t('settings.resetTitle')}
        </h3>

        <p className="text-xs text-slate-600">
          {t('settings.resetDescription')}
        </p>

        <button
          onClick={() => {
            if (window.confirm(t('settings.resetConfirm'))) {
              onResetProgress();
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
        >
          {t('settings.resetAction')}
        </button>
      </div>
    </div>
  );
};
