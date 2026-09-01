import React from 'react';
import { UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { Trophy, Award, Star, CheckCircle2, Lock, Shield, Zap, Flame } from 'lucide-react';

const progressCopy: Record<LanguageCode, Record<string, string>> = {
  de: {
    badge: 'Gamification & Meilensteine', title: '🏆 Dein Fortschritt & Level', intro: 'Sichtbare Erfolge ohne Kinderkram. Jede absolvierte Lektion schaltet dein nächstes Level und neue Meilenstein-Badges frei.', current: 'Aktueller Status:', levels: 'Die 5 Level der GOM-MAR Academy', awards: 'Erreichte Auszeichnungen', unlocked: '✓ Freigeschaltet', required: 'Benötigt Level {level}',
    l1: 'Erste Schritte, Grundlagen & Ausrichtung', l2: 'Nische bestimmt, Zielgruppe & Angebot gewählt', l3: 'Landingpage, Domain & E-Mail-System aufgebaut', l4: 'Traffic aufgebaut, Leads gewinnen & E-Mails senden', l5: 'Automatisierung, Skalierung & dauerhafte Einnahmen',
    b1: '🚀 Erste Schritte', bd1: 'Etappe 1 vollständig abgeschlossen', b2: '🎯 Nischen-Meister', bd2: 'Nische & Zielgruppe erfolgreich definiert', b3: '🛠️ System-Bauer', bd3: 'Landingpage & Domain verknüpft', b4: '📩 Mail-Pionier', bd4: 'E-Mail-Kampagne & Autoresponder aktiviert', b5: '⚡ Traffic-Maschine', bd5: 'Organische Traffic-Quellen aufgebaut', b6: '🏆 Online Entrepreneur', bd6: 'Mindestens 80 % des 99-Etappen-Lernpfads abgeschlossen'
  },
  en: {
    badge: 'Gamification & milestones', title: '🏆 Your progress & level', intro: 'Visible achievements without gimmicks. Every completed lesson unlocks your next level and new milestone badges.', current: 'Current status:', levels: 'The 5 GOM-MAR Academy levels', awards: 'Achievements earned', unlocked: '✓ Unlocked', required: 'Requires level {level}',
    l1: 'First steps, foundations & direction', l2: 'Niche defined, target audience & offer selected', l3: 'Landing page, domain & email system built', l4: 'Build traffic, gain leads & send emails', l5: 'Automation, scaling & lasting income',
    b1: '🚀 First steps', bd1: 'Stage 1 fully completed', b2: '🎯 Niche master', bd2: 'Niche & target audience successfully defined', b3: '🛠️ System builder', bd3: 'Landing page & domain connected', b4: '📩 Email pioneer', bd4: 'Email campaign & autoresponder activated', b5: '⚡ Traffic machine', bd5: 'Organic traffic sources built', b6: '🏆 Online Entrepreneur', bd6: 'At least 80% of the 99-stage learning path completed'
  },
  pl: {
    badge: 'Grywalizacja i kamienie milowe', title: '🏆 Twój postęp i poziom', intro: 'Widoczne osiągnięcia bez zbędnych dodatków. Każda ukończona lekcja odblokowuje kolejny poziom i nowe odznaki.', current: 'Aktualny status:', levels: '5 poziomów GOM-MAR Academy', awards: 'Zdobyte odznaki', unlocked: '✓ Odblokowano', required: 'Wymagany poziom {level}',
    l1: 'Pierwsze kroki, podstawy i kierunek', l2: 'Określona nisza, grupa docelowa i oferta', l3: 'Gotowa strona docelowa, domena i system e-mail', l4: 'Budowanie ruchu, pozyskiwanie leadów i wysyłka e-maili', l5: 'Automatyzacja, skalowanie i stałe dochody',
    b1: '🚀 Pierwsze kroki', bd1: 'Etap 1 ukończony w całości', b2: '🎯 Mistrz niszy', bd2: 'Nisza i grupa docelowa zostały określone', b3: '🛠️ Budowniczy systemu', bd3: 'Strona docelowa i domena połączone', b4: '📩 Pionier e-mail', bd4: 'Kampania e-mail i autoresponder aktywowane', b5: '⚡ Maszyna ruchu', bd5: 'Zbudowano organiczne źródła ruchu', b6: '🏆 Przedsiębiorca online', bd6: 'Ukończono co najmniej 80% ścieżki obejmującej 99 etapów'
  }
};

interface ProgressViewProps {
  user: UserProfile;
  completedTasksCount: number;
  totalTasksCount: number;
  progressPercent: number;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  user,
  completedTasksCount,
  totalTasksCount,
  progressPercent,
}) => {
  const { language } = useLanguage();
  const copy = progressCopy[language];
  const levelsInfo = [
    { level: 1, title: 'Starter', range: '0–20%', desc: copy.l1 },
    { level: 2, title: 'Explorer', range: '20–40%', desc: copy.l2 },
    { level: 3, title: 'Builder', range: '40–60%', desc: copy.l3 },
    { level: 4, title: 'Creator', range: '60–80%', desc: copy.l4 },
    { level: 5, title: 'Online Entrepreneur', range: '80–100%', desc: copy.l5 },
  ];

  const badgesList = [
    { title: copy.b1, desc: copy.bd1, reqLevel: 1 }, { title: copy.b2, desc: copy.bd2, reqLevel: 2 },
    { title: copy.b3, desc: copy.bd3, reqLevel: 3 }, { title: copy.b4, desc: copy.bd4, reqLevel: 3 },
    { title: copy.b5, desc: copy.bd5, reqLevel: 4 }, { title: copy.b6, desc: copy.bd6, reqLevel: 5 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            {copy.badge}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">{copy.title}</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            {copy.intro}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
          <Award className="w-8 h-8 text-amber-500" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{copy.current}</p>
            <p className="text-lg font-black text-slate-950">Level {user.level} • {progressPercent}%</p>
          </div>
        </div>
      </div>

      {/* Level Roadmap Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          {copy.levels}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {levelsInfo.map((lvl) => {
            const isReached = user.level >= lvl.level;
            const isCurrent = user.level === lvl.level;

            return (
              <div
                key={lvl.level}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                    : isReached
                    ? 'bg-indigo-50/40 border-indigo-200 text-slate-800'
                    : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCurrent ? 'bg-amber-200/60 text-amber-900' : isReached ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {lvl.range}
                    </span>
                    {isReached && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <h4 className="font-bold text-sm text-slate-950 mt-1">Level {lvl.level}</h4>
                  <p className="text-xs font-semibold text-amber-600">{lvl.title}</p>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">{lvl.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          {copy.awards} ({user.earnedBadges.length} / {badgesList.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badgesList.map((badge, idx) => {
            const isUnlocked = user.earnedBadges.some((b) => b.includes(badge.title.replace(/[^a-zA-ZäöüÄÖÜß\s]/g, '').trim())) || user.level >= badge.reqLevel;

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 text-xl ${
                  isUnlocked ? 'bg-emerald-100 border border-emerald-200 text-emerald-700' : 'bg-slate-100 border border-slate-200 text-slate-400'
                }`}>
                  {isUnlocked ? badge.title.substring(0, 2) : <Lock className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-950">{badge.title}</h4>
                  <p className="text-xs text-slate-600">{badge.desc}</p>
                  <span className={`inline-block text-[10px] font-semibold mt-1 ${
                    isUnlocked ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    {isUnlocked ? copy.unlocked : copy.required.replace('{level}', String(badge.reqLevel))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
