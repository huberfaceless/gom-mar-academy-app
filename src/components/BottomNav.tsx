import React from 'react';
import { LayoutGrid, GraduationCap, Mail, Wrench, Bot, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { AcademyTier, UserRole } from '../types';
import { canAccessView } from '../utils/membershipAccess';

interface BottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenFragGommar: () => void;
  userRole: UserRole;
  userTier: AcademyTier;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeView,
  onNavigate,
  onOpenFragGommar,
  userRole,
  userTier,
}) => {
  const { t } = useLanguage();
  const tabs = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutGrid },
    { id: 'academy', label: t('nav.academy'), icon: GraduationCap },
    { id: 'email', label: t('nav.marketing'), icon: Mail },
    { id: 'toolbox', label: t('nav.toolbox'), icon: Wrench },
    { id: 'ki', label: t('nav.ai'), icon: Bot, isAction: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-3 py-2 shadow-lg shadow-slate-900/5">
      <nav className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          const hasAccess = tab.isAction || canAccessView(tab.id, userTier, userRole);

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.isAction) {
                  onOpenFragGommar();
                } else {
                  onNavigate(tab.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-150 relative ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label={!hasAccess ? `${tab.label} – PRO` : tab.label}
            >
              <Icon
                className={`w-5 h-5 mb-1 transition-transform ${
                  isActive ? 'text-indigo-600 scale-105' : 'text-slate-500'
                }`}
                strokeWidth={isActive ? 2.3 : 1.8}
              />
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-extrabold text-indigo-600' : 'font-medium'}`}>
                {tab.label}
              </span>
              {!hasAccess && (
                <span className="absolute right-1 top-0 rounded-full bg-slate-200 p-0.5 text-slate-500">
                  <Lock className="h-2.5 w-2.5" />
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
