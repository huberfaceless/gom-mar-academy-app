import React, { useMemo } from 'react';
import { UserProfile, Lesson } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { ACADEMY_STAGES } from '../data/academyData';
import { localizeAllAcademyStages } from '../i18n/localizeAllAcademyStages';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Lock, 
  Sparkles, 
  Mail, 
  Wrench, 
  GraduationCap, 
  Trophy, 
  Users, 
  Zap, 
  Bot,
  CircleDot
} from 'lucide-react';

const dashboardCopy: Record<LanguageCode, Record<string, string>> = {
  de: {
    greeting: 'Willkommen zurück, {name}!', intro: 'Dein System läuft. Lass uns heute den nächsten entscheidenden Schritt für dein Business machen.', next: '🎯 Dein nächster Schritt', lesson: 'Lektion', start: 'Lektion {id} starten', continue: 'Lektion fortsetzen', approx: 'Ca. {minutes} Min', learningProgress: 'Dein Lernfortschritt', phase: 'Phase {stage}: {title} • {completed} von {total} Lektionen', stage1: 'Etappe 1 (Start)', stage2: 'Etappe 2 (Funnels)', stage3: 'Etappe 3 (Traffic)', stage47: 'Etappen 4–99 (Aufbau & Vertiefung)', clearPath: 'Dein klarer Weg', allModules: 'Alle Module in der Academy ansehen', current: 'Aktuell', course: 'Gesamter Kurs', modules: '99 Module verfügbar', level: 'Level', status: 'Status', emailSystem: 'E-Mail-System', mails: '5 E-Mails', active: 'Aktiv geschaltet', toolbox: 'Toolbox', aiTools: 'KI-Tools', ready: 'Bereit zum Einsatz',
    road1: 'Schritt 1: Grundlagen & Wertschöpfung', road2: 'Schritt 2: Nischen- & Zielgruppenwahl', road3: 'Schritt 3: High-Converting Landingpage', road4: 'Schritt 4: Automatisierte E-Mail-Sequenz', road5: 'Schritt 5: Organische Traffic-Generierung', fallbackTitle: 'Wie funktioniert Online-Einkommen?', fallbackDescription: 'Starte mit den Grundlagen des GOM-MAR Systems und lerne, wie du automatisiert digitalen Mehrwert aufbaust.', memberName: 'GOM-MAR Mitglied'
  },
  en: {
    greeting: 'Welcome back, {name}!', intro: 'Your system is running. Let’s take the next decisive step for your business today.', next: '🎯 Your next step', lesson: 'Lesson', start: 'Start lesson {id}', continue: 'Continue lesson', approx: 'Approx. {minutes} min', learningProgress: 'Your learning progress', phase: 'Stage {stage}: {title} • {completed} of {total} lessons', stage1: 'Stage 1 (Start)', stage2: 'Stage 2 (Funnels)', stage3: 'Stage 3 (Traffic)', stage47: 'Stages 4–99 (Build & deepen)', clearPath: 'Your clear path', allModules: 'View all Academy modules', current: 'Current', course: 'Entire course', modules: '99 modules available', level: 'Level', status: 'Status', emailSystem: 'Email system', mails: '5 emails', active: 'Activated', toolbox: 'Toolbox', aiTools: 'AI tools', ready: 'Ready to use',
    road1: 'Step 1: Foundations & value creation', road2: 'Step 2: Choose niche & target audience', road3: 'Step 3: High-converting landing page', road4: 'Step 4: Automated email sequence', road5: 'Step 5: Organic traffic generation', fallbackTitle: 'How does online income work?', fallbackDescription: 'Start with the foundations of the GOM-MAR system and learn how to build digital value automatically.', memberName: 'GOM-MAR member'
  },
  pl: {
    greeting: 'Witaj ponownie, {name}!', intro: 'Twój system działa. Zróbmy dziś kolejny decydujący krok dla Twojego biznesu.', next: '🎯 Twój następny krok', lesson: 'Lekcja', start: 'Rozpocznij lekcję {id}', continue: 'Kontynuuj lekcję', approx: 'Około {minutes} min', learningProgress: 'Twój postęp w nauce', phase: 'Etap {stage}: {title} • {completed} z {total} lekcji', stage1: 'Etap 1 (Start)', stage2: 'Etap 2 (Lejki)', stage3: 'Etap 3 (Ruch)', stage47: 'Etapy 4–99 (Rozwój i pogłębianie)', clearPath: 'Twoja jasna droga', allModules: 'Zobacz wszystkie moduły Academy', current: 'Aktualnie', course: 'Cały kurs', modules: 'Dostępnych 99 modułów', level: 'Poziom', status: 'Status', emailSystem: 'System e-mail', mails: '5 wiadomości', active: 'Aktywny', toolbox: 'Narzędzia', aiTools: 'Narzędzia AI', ready: 'Gotowe do użycia',
    road1: 'Krok 1: Podstawy i tworzenie wartości', road2: 'Krok 2: Wybór niszy i grupy docelowej', road3: 'Krok 3: Skuteczna strona docelowa', road4: 'Krok 4: Automatyczna sekwencja e-mail', road5: 'Krok 5: Organiczne pozyskiwanie ruchu', fallbackTitle: 'Jak działa dochód online?', fallbackDescription: 'Zacznij od podstaw systemu GOM-MAR i naucz się automatycznie tworzyć wartość cyfrową.', memberName: 'Użytkowniku GOM-MAR'
  }
};

const formatCopy = (template: string, values: Record<string, string | number>) => Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), template);

interface DashboardViewProps {
  user: UserProfile;
  progressPercent: number;
  completedTasksCount: number;
  totalTasksCount: number;
  onNavigate: (view: string, stageId?: number, lessonId?: string) => void;
  onOpenFragGommar: (prompt?: string) => void;
  stageAccessLimit: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  progressPercent,
  completedTasksCount,
  totalTasksCount,
  onNavigate,
  onOpenFragGommar,
  stageAccessLimit,
}) => {
  const { language } = useLanguage();
  const copy = dashboardCopy[language];
  const isLight = user.theme === 'clean-light' || !user.theme;
  const completedTaskIdSet = useMemo(() => new Set(user.completedTaskIds), [user.completedTaskIds]);
  const localizedStages = useMemo(() => localizeAllAcademyStages(ACADEMY_STAGES, language), [language]);
  const displayName = user.name === 'GOM-MAR Mitglied' ? copy.memberName : user.name;

  // Find current stage & next incomplete lesson
  const accessibleStages = localizedStages.filter((stage) => stage.id <= stageAccessLimit);
  const currentStage = accessibleStages.find((s) => s.id === user.currentStageId) || accessibleStages[0];
  
  let nextLesson: Lesson | undefined;
  for (const stage of accessibleStages) {
    const incomplete = stage.lessons.find((l) => !completedTaskIdSet.has(l.id));
    if (incomplete) {
      nextLesson = incomplete;
      break;
    }
  }

  // Fallback to last lesson if all completed
  if (!nextLesson) {
    nextLesson = currentStage.lessons[currentStage.lessons.length - 1];
  }

  // Stage completion percentage for current active stage
  const stageCompletedCount = currentStage.lessons.filter((l) => completedTaskIdSet.has(l.id)).length;
  const stageProgressPercent = Math.round((stageCompletedCount / currentStage.lessons.length) * 100);

  // Dynamic roadmap steps for "Dein klarer Weg"
  const baseRoadmapMilestones = [
    { step: 1, title: copy.road1, lessonId: '1.1', stageId: 1 },
    { step: 2, title: copy.road2, lessonId: '1.2', stageId: 1 },
    { step: 3, title: copy.road3, lessonId: '1.3', stageId: 1 },
    { step: 4, title: copy.road4, lessonId: '2.1', stageId: 2 },
    { step: 5, title: copy.road5, lessonId: '2.2', stageId: 2 }
  ];

  const firstIncompleteIdx = baseRoadmapMilestones.findIndex((r) => !completedTaskIdSet.has(r.lessonId));

  const roadmapSteps = baseRoadmapMilestones.map((item, idx) => {
    const isCompleted = completedTaskIdSet.has(item.lessonId);
    const isCurrent = firstIncompleteIdx === -1 ? (idx === baseRoadmapMilestones.length - 1) : (idx === firstIncompleteIdx);
    return {
      ...item,
      title: isCurrent ? `${item.title} (${copy.current})` : item.title,
      isCompleted,
      isCurrent,
    };
  });

  const isFreshStart = user.completedTaskIds.length === 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-4xl mx-auto pb-20 md:pb-8">
      {/* 1. Header Greeting (As in Screen 3) */}
      <div className="space-y-2">
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
          {formatCopy(copy.greeting, { name: displayName })}
        </h1>
        <p className={`text-sm sm:text-base font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'} max-w-2xl leading-relaxed`}>
          {copy.intro}
        </p>
      </div>

      {/* 2. 🎯 DEIN NÄCHSTER SCHRITT Card (Exact match to Screen 3) */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all ${
        isLight 
          ? 'bg-gradient-to-br from-indigo-50/60 via-white to-indigo-50/20 border-2 border-indigo-200/90 shadow-md shadow-indigo-600/5' 
          : 'bg-slate-900 border-2 border-indigo-500/40 shadow-xl'
      }`}>
        <div className="space-y-5">
          {/* Eyebrow badge with Rocket */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
              {copy.next}
            </span>
          </div>

          {/* Lesson Title */}
          <div className="space-y-2">
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {copy.lesson} {nextLesson?.id || '1.1'}: {nextLesson?.title || copy.fallbackTitle}
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {nextLesson?.description || copy.fallbackDescription}
            </p>
          </div>

          {/* CTA & Duration Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('academy', nextLesson?.stageId || 1, nextLesson?.id || '1.1')}
              id="btn-resume-next-lesson"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              <span>{isFreshStart ? formatCopy(copy.start, { id: nextLesson?.id || '1.1' }) : copy.continue}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl ${isLight ? 'text-slate-500 bg-slate-100/80' : 'text-slate-400 bg-slate-800'}`}>
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{formatCopy(copy.approx, { minutes: nextLesson?.durationMinutes || 15 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Dein Lernfortschritt Card (As in Screen 3) */}
      <div className={`rounded-3xl p-6 sm:p-7 border transition-all ${
        isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
      }`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {copy.learningProgress}
              </h3>
              <p className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {formatCopy(copy.phase, { stage: currentStage.id, title: currentStage.title, completed: completedTasksCount, total: totalTasksCount })}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600">
              {progressPercent}%
            </div>
          </div>

          {/* Smooth Indigo Progress Bar */}
          <div className="w-full h-3.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 transition-all duration-700 shadow-sm"
              style={{ width: `${Math.max(progressPercent, isFreshStart ? 0 : 4)}%` }}
            />
          </div>

          {/* Phase Markers */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 pt-1">
            <span className={user.currentStageId === 1 ? 'font-extrabold text-indigo-600' : completedTasksCount > 0 ? 'text-slate-500' : 'text-slate-400'}>
              {copy.stage1}
            </span>
            <span className={user.currentStageId === 2 ? 'font-extrabold text-indigo-600' : 'text-slate-400'}>
              {copy.stage2}
            </span>
            <span className={user.currentStageId === 3 ? 'font-extrabold text-indigo-600' : 'text-slate-400'}>
              {copy.stage3}
            </span>
            <span className={user.currentStageId >= 4 ? 'font-extrabold text-indigo-600' : 'text-slate-400'}>
              {copy.stage47}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Dein klarer Weg Card (As in Screen 3) */}
      <div className={`rounded-3xl p-6 sm:p-7 border transition-all ${
        isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-lg'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {copy.clearPath}
            </h3>
            <button
              onClick={() => onNavigate('academy')}
              className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
              title={copy.allModules}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Vertical Connected Stepper */}
          <div className="space-y-0 relative pl-2">
            {roadmapSteps.map((stepItem, idx) => {
              const isLast = idx === roadmapSteps.length - 1;

              return (
                <div key={stepItem.step} className="flex items-start gap-4 relative pb-7 last:pb-0">
                  {/* Connecting Line */}
                  {!isLast && (
                    <div className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                      stepItem.isCompleted ? 'bg-indigo-600' : 'bg-slate-200'
                    }`} />
                  )}

                  {/* Icon Node */}
                  <div className="relative z-10 shrink-0">
                    {stepItem.isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    ) : stepItem.isCurrent ? (
                      <div className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-indigo-600 text-indigo-600 flex items-center justify-center font-black shadow-md shadow-indigo-600/20">
                        <CircleDot className="w-5 h-5 text-indigo-600 animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div 
                    onClick={() => {
                      if (!stepItem.isCompleted && !stepItem.isCurrent) return;
                      onNavigate('academy', stepItem.stageId, stepItem.lessonId);
                    }}
                    className={`pt-1 cursor-pointer select-none ${
                      stepItem.isCompleted 
                        ? 'opacity-80 line-through text-slate-500' 
                        : stepItem.isCurrent 
                        ? 'font-black text-slate-950' 
                        : 'text-slate-400'
                    }`}
                  >
                    <p className={`text-sm ${stepItem.isCurrent ? 'font-black text-slate-900 text-base' : 'font-semibold'}`}>
                      {stepItem.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Key Metrics / Schnellzugriff Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
        <div className={`p-4 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>{copy.course}</span>
            <GraduationCap className="w-4 h-4 text-indigo-600" />
          </div>
          <div className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {progressPercent}%
          </div>
          <p className="text-[10px] text-slate-400 mt-1">{copy.modules}</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>{copy.level}</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-500">
            {copy.level} {user.level}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">{user.tier} {copy.status}</p>
        </div>

        <div 
          onClick={() => onNavigate('email')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-indigo-400 ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>{copy.emailSystem}</span>
            <Mail className="w-4 h-4 text-indigo-600" />
          </div>
          <div className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {copy.mails}
          </div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">{copy.active}</p>
        </div>

        <div 
          onClick={() => onNavigate('toolbox')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-indigo-400 ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
            <span>{copy.toolbox}</span>
            <Wrench className="w-4 h-4 text-indigo-600" />
          </div>
          <div className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {copy.aiTools}
          </div>
          <p className="text-[10px] text-indigo-600 font-bold mt-1">{copy.ready}</p>
        </div>
      </div>
    </div>
  );
};
