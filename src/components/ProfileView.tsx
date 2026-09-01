import React, { useState } from 'react';
import { UserProfile, AcademyTier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { User, Crown, Check, ShieldCheck, Mail, Sparkles, BookOpen, Layers, Edit2, Save } from 'lucide-react';

const profileCopy: Record<LanguageCode, Record<string, string>> = {
  de: {
    academy: '{name}s Academy', member: 'Mitglied', niche: 'Nische', cancel: 'Abbrechen', edit: 'Profil bearbeiten', details: 'Profil-Details anpassen', name: 'Dein Name:', nicheLabel: 'Deine Nische:', audience: 'Deine Zielgruppe:', save: 'Profil speichern', overview: 'Mitglieder-Übersicht & Kennzahlen', progress: 'Fortschritt', course: 'Aktueller Kurs', stage: 'Etappe', tasks: 'Aufgaben', milestones: 'Meilensteine', campaigns: 'Kampagnen', leads: 'Leads', memberships: 'GOM-MAR Academy Mitgliedschafts-Ebenen', choose: 'Tarifübersicht: Änderungen werden erst nach bestätigter Freigabe wirksam.', active: 'Aktiver Plan', recommended: 'Empfohlen',
    freeDesc: 'Grundlagen & einfache Einstiegstools zum Kennenlernen.', free1: '✓ Lektionen der Etappen 1 und 2', free2: '✓ Begrenzter KI-Zugang', free3: '✓ Grundlegende Checklisten', freeAction: 'FREE-Wechsel anfragen', proDesc: 'Komplette Academy, E-Mail-Automation & volle KI-Toolbox.', pro1: '✓ Vollständiger Lernpfad mit 99 Etappen', pro2: '✓ GOM-MAR E-Mail-Automation', pro3: '✓ Frag GOM-MAR KI-Mentor', pro4: '✓ Alle KI-Toolbox-Generatoren', proAction: 'PRO-Freischaltung anfragen', premiumDesc: 'Für individuelle Begleitung, VIP-Trainings & VIP-Support.', premium1: '✓ Alles aus PRO enthalten', premium2: '✓ Persönliche System-Audits', premium3: '✓ VIP 1-zu-1 KI-Prompts', premiumAction: 'PREMIUM-Freischaltung anfragen'
  },
  en: {
    academy: "{name}'s Academy", member: 'Member', niche: 'Niche', cancel: 'Cancel', edit: 'Edit profile', details: 'Edit profile details', name: 'Your name:', nicheLabel: 'Your niche:', audience: 'Your target audience:', save: 'Save profile', overview: 'Member overview & metrics', progress: 'Progress', course: 'Current course', stage: 'Stage', tasks: 'Tasks', milestones: 'Milestones', campaigns: 'Campaigns', leads: 'Leads', memberships: 'GOM-MAR Academy membership levels', choose: 'Plan overview: changes take effect only after confirmed approval.', active: 'Active plan', recommended: 'Recommended',
    freeDesc: 'Foundations & simple starter tools to explore.', free1: '✓ Lessons from Stages 1 and 2', free2: '✓ Limited AI access', free3: '✓ Basic checklists', freeAction: 'Request FREE plan', proDesc: 'Complete Academy, email automation & full AI toolbox.', pro1: '✓ Complete 99-stage learning path', pro2: '✓ GOM-MAR email automation', pro3: '✓ Ask GOM-MAR AI Mentor', pro4: '✓ All AI toolbox generators', proAction: 'Request PRO access', premiumDesc: 'For personal guidance, VIP training & VIP support.', premium1: '✓ Everything in PRO', premium2: '✓ Personal system audits', premium3: '✓ VIP one-to-one AI prompts', premiumAction: 'Request PREMIUM access'
  },
  pl: {
    academy: 'Academy użytkownika {name}', member: 'Członek', niche: 'Nisza', cancel: 'Anuluj', edit: 'Edytuj profil', details: 'Edytuj dane profilu', name: 'Twoje imię:', nicheLabel: 'Twoja nisza:', audience: 'Twoja grupa docelowa:', save: 'Zapisz profil', overview: 'Przegląd i wyniki użytkownika', progress: 'Postęp', course: 'Aktualny kurs', stage: 'Etap', tasks: 'Zadania', milestones: 'Kamienie milowe', campaigns: 'Kampanie', leads: 'Leady', memberships: 'Poziomy członkostwa GOM-MAR Academy', choose: 'Przegląd taryf: zmiany obowiązują dopiero po zatwierdzeniu.', active: 'Aktywny plan', recommended: 'Polecany',
    freeDesc: 'Podstawy i proste narzędzia na dobry początek.', free1: '✓ Lekcje etapów 1 i 2', free2: '✓ Ograniczony dostęp do AI', free3: '✓ Podstawowe listy kontrolne', freeAction: 'Poproś o taryfę FREE', proDesc: 'Pełna Academy, automatyzacja e-mail i wszystkie narzędzia AI.', pro1: '✓ Pełna ścieżka nauki obejmująca 99 etapów', pro2: '✓ Automatyzacja e-mail GOM-MAR', pro3: '✓ Mentor GOM-MAR AI', pro4: '✓ Wszystkie generatory AI', proAction: 'Poproś o dostęp PRO', premiumDesc: 'Indywidualne wsparcie, szkolenia VIP i pomoc VIP.', premium1: '✓ Wszystko z planu PRO', premium2: '✓ Indywidualne audyty systemu', premium3: '✓ Indywidualne prompty AI VIP', premiumAction: 'Poproś o dostęp PREMIUM'
  }
};

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  progressPercent: number;
  completedTasksCount: number;
  onRequestTierChange: (tier: AcademyTier) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  progressPercent,
  completedTasksCount,
  onRequestTierChange,
}) => {
  const { language } = useLanguage();
  const copy = profileCopy[language];
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(user.name);
  const [editNiche, setEditNiche] = useState<string>(user.niche);
  const [editAudience, setEditAudience] = useState<string>(user.targetAudience);

  const handleSaveProfile = () => {
    onUpdateUser({
      ...user,
      name: editName,
      niche: editNiche,
      targetAudience: editAudience,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Profile Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/20" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-700 font-black text-2xl flex items-center justify-center border border-indigo-200">
                  {user.name.substring(0, 1)}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[10px]">
                Lvl {user.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-950">{copy.academy.replace('{name}', user.name)}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  {user.tier} {copy.member}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {copy.niche}: <strong className="text-slate-800">{user.niche}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            <span>{isEditing ? copy.cancel : copy.edit}</span>
          </button>
        </div>
      </div>

      {/* Profile Edit Form */}
      {isEditing && (
        <div className="bg-white border border-indigo-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-indigo-700 uppercase tracking-wider">
            {copy.details}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{copy.name}</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{copy.nicheLabel}</label>
              <input
                type="text"
                value={editNiche}
                onChange={(e) => setEditNiche(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{copy.audience}</label>
            <input
              type="text"
              value={editAudience}
              onChange={(e) => setEditAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <button
            onClick={handleSaveProfile}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{copy.save}</span>
          </button>
        </div>
      )}

      {/* Member Key Metrics Summary */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          {copy.overview}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">{copy.progress}</span>
            <p className="text-xl font-black text-indigo-600">{progressPercent} %</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">{copy.course}</span>
            <p className="text-sm font-extrabold text-slate-900 truncate">{copy.stage} {user.currentStageId}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">{copy.tasks}</span>
            <p className="text-xl font-black text-slate-900">{completedTasksCount}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">{copy.milestones}</span>
            <p className="text-xl font-black text-amber-600">{user.earnedBadges.length}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">{copy.campaigns}</span>
            <p className="text-xl font-black text-sky-600">{user.activeCampaignsCount}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="text-xs text-slate-500 font-semibold">{copy.leads}</span>
            <p className="text-xl font-black text-indigo-600">{user.leadsCount}</p>
          </div>
        </div>
      </div>

      {/* Plan Tier Switcher */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            {copy.memberships}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {copy.choose}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE Tier */}
          <div className={`p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
            user.tier === 'FREE'
              ? 'bg-slate-50 border-slate-300 ring-2 ring-slate-400/20'
              : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                🆓 FREE
              </span>
              <h4 className="text-xl font-black text-slate-950">GOM-MAR FREE</h4>
              <p className="text-xs text-slate-600">{copy.freeDesc}</p>

              <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">{copy.free1}</li><li className="flex items-center gap-2">{copy.free2}</li><li className="flex items-center gap-2">{copy.free3}</li>
              </ul>
            </div>

            <button
              type="button"
              disabled={user.tier === 'FREE'}
              onClick={() => onRequestTierChange('FREE')}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                user.tier === 'FREE'
                  ? 'bg-slate-900 text-white cursor-default'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer'
              }`}
            >
              {user.tier === 'FREE' ? copy.active : copy.freeAction}
            </button>
          </div>

          {/* PRO Tier */}
          <div className={`p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between relative overflow-hidden ${
            user.tier === 'PRO'
              ? 'bg-indigo-50/50 border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
              : 'bg-white border-slate-200'
          }`}>
            <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[9px] uppercase tracking-wider">
              {copy.recommended}
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                ⭐ PRO
              </span>
              <h4 className="text-xl font-black text-slate-950">GOM-MAR PRO</h4>
              <p className="text-xs text-slate-600">{copy.proDesc}</p>

              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2 text-indigo-700 font-medium">{copy.pro1}</li><li className="flex items-center gap-2 text-indigo-700 font-medium">{copy.pro2}</li><li className="flex items-center gap-2 text-indigo-700 font-medium">{copy.pro3}</li><li className="flex items-center gap-2 text-indigo-700 font-medium">{copy.pro4}</li>
              </ul>
            </div>

            <button
              type="button"
              disabled={user.tier === 'PRO'}
              onClick={() => onRequestTierChange('PRO')}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                user.tier === 'PRO'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 cursor-default'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 cursor-pointer'
              }`}
            >
              {user.tier === 'PRO' ? copy.active : copy.proAction}
            </button>
          </div>

          {/* PREMIUM Tier */}
          <div className={`p-6 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
            user.tier === 'PREMIUM'
              ? 'bg-amber-50/50 border-amber-400 ring-2 ring-amber-400/20 shadow-md'
              : 'bg-white border-slate-200'
          }`}>
            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                🚀 PREMIUM
              </span>
              <h4 className="text-xl font-black text-slate-950">GOM-MAR PREMIUM</h4>
              <p className="text-xs text-slate-600">{copy.premiumDesc}</p>

              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2 text-amber-800 font-medium">{copy.premium1}</li><li className="flex items-center gap-2 text-amber-800 font-medium">{copy.premium2}</li><li className="flex items-center gap-2 text-amber-800 font-medium">{copy.premium3}</li>
              </ul>
            </div>

            <button
              type="button"
              disabled={user.tier === 'PREMIUM'}
              onClick={() => onRequestTierChange('PREMIUM')}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                user.tier === 'PREMIUM'
                  ? 'bg-amber-500 text-white cursor-default'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 cursor-pointer'
              }`}
            >
              {user.tier === 'PREMIUM' ? copy.active : copy.premiumAction}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
