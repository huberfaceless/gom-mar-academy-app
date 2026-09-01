import React from 'react';
import { LayoutDashboard, GraduationCap, Mail, Wrench, Trophy, User, Settings, Bot, ChevronRight, Globe, ShieldCheck, Layers, Lock } from 'lucide-react';
import gommarLogo from '../assets/images/gommar_logo.jpg';
import type { AcademyTier, UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { canAccessView } from '../utils/membershipAccess';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  progressPercent: number;
  completedTasksCount: number;
  totalTasksCount: number;
  onOpenFragGommar: () => void;
  userRole: UserRole;
  userTier: AcademyTier;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onNavigate,
  progressPercent,
  completedTasksCount,
  totalTasksCount,
  onOpenFragGommar,
  userRole,
  userTier,
}) => {
  const { t } = useLanguage();
  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard, badge: 'Home' },
    { id: 'contentEngine', label: t('nav.contentHub'), icon: Layers, highlight: true, badge: 'Vital50' },
    { id: 'academy', label: t('nav.academy'), icon: GraduationCap, badge: `${completedTasksCount}/${totalTasksCount}` },
    { id: 'email', label: t('nav.email'), icon: Mail },
    { id: 'toolbox', label: t('nav.toolbox'), icon: Wrench, badge: t('nav.ai') },
    { id: 'landing', label: t('nav.funnel'), icon: Globe, badge: 'Opt-In' },
    { id: 'progress', label: t('nav.progress'), icon: Trophy },
    { id: 'profile', label: t('nav.profile'), icon: User },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  if (userRole === 'admin') {
    menuItems.splice(4, 0, {
      id: 'admin',
      label: t('nav.admin'),
      icon: ShieldCheck,
      badge: 'Admin'
    });
  }

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200/90 text-slate-700 p-4 flex flex-col justify-between shrink-0 shadow-sm md:sticky md:top-[74px] md:self-start md:max-h-[calc(100vh-74px)] md:overflow-y-auto scrollbar-thin">
      <div className="space-y-5">
        {/* Brand Card in Sidebar */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center gap-3 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-0.5 overflow-hidden shrink-0 shadow-xs">
            <img 
              src={gommarLogo} 
              alt="GOM-MAR" 
              className="w-full h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm text-slate-950 truncate">GOM-MAR</span>
              <span className="bg-indigo-600 text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase">{userTier}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium truncate">Academy Platform</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
            {t('nav.main')}
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const hasAccess = canAccessView(item.id, userTier, userRole);
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  aria-label={!hasAccess ? `${item.label} – PRO` : item.label}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-extrabold shadow-sm'
                      : !hasAccess
                      ? 'text-slate-400 hover:bg-slate-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {!hasAccess ? (
                    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      <Lock className="h-3 w-3" /> PRO
                    </span>
                  ) : item.badge ? (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null}
                  {hasAccess && item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 🤖 Quick Mentor Assistant Banner */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-100 rounded-2xl p-4 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs">
            <Bot className="w-4 h-4 text-indigo-600" />
            <span>{t('mentor.title')}</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            {t('mentor.description')}
          </p>
          <button
            onClick={onOpenFragGommar}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>{t('mentor.ask')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Footer widget */}
      <div className="pt-4 mt-6 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-500">{t('progress.total')}</span>
          <span className="text-indigo-600 font-extrabold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 text-center font-medium">
          {t('progress.tasks', { completed: completedTasksCount, total: totalTasksCount })}
        </p>
      </div>
    </aside>
  );
};
