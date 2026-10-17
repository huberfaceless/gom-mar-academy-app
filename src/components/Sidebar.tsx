import React, { useState } from 'react';
import { SidebarTooltip } from './SidebarTooltip';
import { LayoutDashboard, GraduationCap, Mail, Wrench, Trophy, User, Settings, MessageCircle, ChevronRight, Globe, ShieldCheck, Layers, Lock, PanelLeftClose, PanelLeftOpen, type LucideIcon } from 'lucide-react';
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
  const [collapsed, setCollapsed] = useState(() => {
    try { return window.localStorage.getItem('gommar-sidebar-collapsed') === 'true'; }
    catch { return false; }
  });
  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { window.localStorage.setItem('gommar-sidebar-collapsed', String(next)); }
    catch { /* Keep the menu usable when browser storage is unavailable. */ }
  };

  const menuItems: Array<{
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: string;
    highlight?: boolean;
  }> = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard, badge: 'Home' },
    { id: 'academy', label: t('nav.academy'), icon: GraduationCap, badge: `${completedTasksCount}/${totalTasksCount}` },
    { id: 'contentEngine', label: t('nav.contentHub'), icon: Layers, highlight: true, badge: 'PRO' },
    { id: 'email', label: t('nav.email'), icon: Mail },
    { id: 'toolbox', label: t('nav.toolbox'), icon: Wrench, badge: t('nav.ai') },
    { id: 'landing', label: t('nav.funnel'), icon: Globe, badge: 'Opt-In' },
    { id: 'progress', label: t('nav.progress'), icon: Trophy },
    { id: 'profile', label: t('nav.profile'), icon: User },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  if (userRole === 'admin') {
    menuItems.splice(
      1,
      0,
      {
        id: 'admin',
        label: t('nav.admin'),
        icon: ShieldCheck,
        badge: 'Admin'
      },
    );
  }

  return (
    <aside aria-label={t('nav.main')} className={`hidden md:flex ${collapsed ? 'md:w-20 p-2' : 'md:w-64 p-4'} bg-white border-r border-slate-200/90 text-slate-700 flex-col justify-between shrink-0 shadow-sm md:sticky md:top-[74px] md:self-start md:max-h-[calc(100dvh-74px)] md:overflow-y-auto scrollbar-thin`}>
      <div className="sticky top-0 z-10 bg-white pb-3">
        <SidebarTooltip enabled={collapsed} label={t('nav.expand')}>
        <button type="button" onClick={toggleSidebar} aria-expanded={!collapsed} aria-controls="academy-sidebar-navigation"
          aria-label={collapsed ? t('nav.expand') : t('nav.collapse')} title={collapsed ? undefined : t('nav.collapse')}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 p-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-indigo-600">
          {collapsed ? <PanelLeftOpen className="h-5 w-5 shrink-0" /> : <PanelLeftClose className="h-5 w-5 shrink-0" />}
          {!collapsed && <span>{t('nav.collapse')}</span>}
        </button>
        </SidebarTooltip>
      </div>
      <div className="space-y-5">
        {/* Brand Card in Sidebar */}
        <SidebarTooltip enabled={collapsed} label={t('nav.dashboard')}>
        <button type="button" aria-label={t('nav.dashboard')} title={collapsed ? undefined : t('nav.dashboard')}
          onClick={() => onNavigate('dashboard')}
          className={`${collapsed ? 'p-1 justify-center' : 'p-3'} w-full text-left hidden md:flex rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 items-center gap-3 transition-colors cursor-pointer`}
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-0.5 overflow-hidden shrink-0 shadow-xs">
            <img 
              src={gommarLogo} 
              alt="GOM-MAR" 
              className="w-full h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
          {!collapsed && <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm text-slate-950 truncate">GOM-MAR</span>
              <span className="bg-indigo-600 text-white font-extrabold text-[9px] px-1.5 py-0.2 rounded uppercase">{userTier}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium truncate">Academy Platform</p>
          </div>}
        </button>
        </SidebarTooltip>

        {/* 🤖 Quick Mentor Assistant Banner */}
        {collapsed ? <SidebarTooltip enabled label={t('mentor.ask')}><button type="button" onClick={onOpenFragGommar} aria-label={t('mentor.ask')}
          className="flex w-full justify-center rounded-xl bg-indigo-50 p-3 text-indigo-600 hover:bg-indigo-100"><MessageCircle className="h-5 w-5" /></button></SidebarTooltip> : <div className="bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 border border-indigo-100 rounded-2xl p-4 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs">
            <MessageCircle className="w-4 h-4 text-indigo-600" />
            <span>{t('mentor.title')}</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            {t('mentor.description')}
          </p>
          <button
            type="button"
            onClick={onOpenFragGommar}
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>{t('mentor.ask')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>}

        {/* Navigation Menu */}
        <div>
          {!collapsed && <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
            {t('nav.main')}
          </p>}
          <nav id="academy-sidebar-navigation" className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const hasAccess = canAccessView(item.id, userTier, userRole);
              return (
                <SidebarTooltip key={item.id} enabled={collapsed} label={!hasAccess ? `${item.label} – PRO` : item.label}>
                <button
                  type="button"
                  id={`nav-item-${item.id}`}
                  title={collapsed ? undefined : !hasAccess ? `${item.label} – PRO` : item.label}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => onNavigate(item.id)}
                  aria-label={!hasAccess ? `${item.label} – PRO` : item.label}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3.5'} py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-extrabold shadow-sm'
                      : !hasAccess
                      ? 'text-slate-400 hover:bg-slate-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && (!hasAccess ? (
                    <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                      <Lock className="h-3 w-3" /> PRO
                    </span>
                  ) : item.badge ? (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  ) : null)}
                  {!collapsed && hasAccess && item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  )}
                </button>
                </SidebarTooltip>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Progress Footer widget */}
      {!collapsed && <div className="pt-4 mt-6 border-t border-slate-100 space-y-2">
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
      </div>}
    </aside>
  );
};

