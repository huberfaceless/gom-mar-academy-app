import React, { useState, useMemo } from 'react';
import { UserProfile, Stage, Lesson } from '../types';
import { ACADEMY_STAGES } from '../data/academyData';
import { LessonVideoPlayer } from './LessonVideoPlayer';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../i18n/translations';
import { localizeAllAcademyStages } from '../i18n/localizeAllAcademyStages';
import { authenticatedFetch } from '../services/authenticatedFetch';
import { 
  Play, 
  CheckCircle, 
  CheckCircle2, 
  Circle, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Lightbulb, 
  Wrench, 
  ChevronRight, 
  Video, 
  FileText, 
  ExternalLink,
  Zap,
  Award,
  BookOpen,
  Bot,
  HelpCircle,
  Clock,
  Check,
  Send,
  Loader2,
  GraduationCap,
  RotateCcw,
  List,
  Layers,
  Star,
  Download,
  Target,
  Anchor,
  MousePointer,
  Type,
  LayoutGrid,
  Mail,
  Gift,
  UserCheck,
  Search,
  Filter
} from 'lucide-react';

interface AcademyViewProps {
  user: UserProfile;
  stages?: Stage[];
  initialStageId?: number;
  initialLessonId?: string;
  onCompleteLesson: (lessonId: string, stageId: number) => void;
  onNavigateToToolbox: (category?: string) => void;
  onOpenFragGommar: (prompt?: string) => void;
  stageAccessLimit: number;
}

const academyCopy: Record<LanguageCode, Record<string, string>> = {
  de: {
    allModules: 'Alle 99 Module', foundation: 'Modul 1–10 (Fundament)', traffic: 'Modul 11–25 (Traffic & Funnels)', scale: 'Modul 26–50 (Skalierung & Copy)', systems: 'Modul 51–75 (High-Ticket & Systeme)', empire: 'Modul 76–99 (Konzern & Imperium)',
    aiUnavailable: 'Entschuldigung, der KI-Mentor konnte gerade nicht antworten.', aiConnection: 'Fehler bei der Verbindung zum KI-Mentor.', aiLanguage: 'Antworte vollständig auf Deutsch.', currentCourse: 'Aktueller Kurs', courseTitle: 'Die GOM-MAR Masterclass', totalProgress: 'Gesamtfortschritt', lessons: 'Lektionen',
    search: "Suche nach Modul, Thema oder Lektion (z. B. 'Landingpage', 'Traffic', '77')…", showing: 'Zeige', ofModules: 'von 99 Modulen', range: 'Bereich:', noModules: 'Keine Module gefunden', noModulesHint: 'Versuche einen anderen Suchbegriff oder setze die Filter zurück.', reset: 'Filter zurücksetzen', module: 'Modul', completed: 'Abgeschlossen', inProgress: 'In Bearbeitung', locked: 'Gesperrt', proRequired: 'PRO erforderlich',
    videoGuide: 'Video & Leitfaden', view: 'Ansehen', startNow: 'Jetzt starten 🚀', nextLesson: 'Nächste Lektion', lockedPrevious: 'Gesperrt • Erfordert vorherige Lektion', backCourse: '← Zurück zur Kurs-Übersicht', askMentor: '🤖 Frag GOM-MAR AI Mentor', stageLessons: 'Lektionen', stage: 'Etappe', lesson: 'Lektion', taskDone: 'Aufgabe erledigt', openTask: 'Offene Aufgabe', handbook: 'Handbuch', handbookLong: 'Lektions-Handbuch (Artikel)', video: 'Video', videoOverview: 'Video & Übersicht', aiTutor: 'KI-Tutor', aiTutorLong: 'KI-Lektions-Tutor', concepts: 'Kernkonzepte', practicalExample: 'Konkretes Praxisbeispiel:',
    takeaway: '💡 Merk-Satz für deinen Erfolg:', tutorFor: 'GOM-MAR KI-Tutor für Lektion', tutorIntro: 'Du hast eine Frage zu dieser Lektion oder brauchst ein konkretes Beispiel für deine Nische? Frage direkt deinen persönlichen KI-Mentor!', explain: '💡 Erkläre mir das noch einfacher', example: '🎯 Beispiel für meine Nische', mistakes: '⚠️ Häufigste Anfängerfehler', questionPlaceholder: 'Deine Frage zu dieser Lektion…', mentorAnswer: 'Antwort deines KI-Mentors:', lessonProgress: 'Lektionsfortschritt', resources: 'Ressourcen & Tools', toolboxHelp: 'Nutze die GOM-MAR Toolbox, um diese Aufgabe in wenigen Sekunden mit KI-Unterstützung zu lösen:', openToolboxNow: 'GOM-MAR Toolbox jetzt öffnen →', nextStep: 'Nächster Schritt', tryNow: 'Jetzt selbst ausprobieren', nextStepText: 'Nutze unsere vorgefertigten High-Converting Templates in der GOM-MAR Toolbox und setze das Gelernte direkt in die Praxis um.', openToolbox: 'GOM-MAR Toolbox öffnen', previous: 'Vorherige Lektion', markAgain: 'Aufgabe erneut als erledigt markieren', taskComplete: 'Aufgabe abgeschlossen! ✅', next: 'Weiter ➡️',
  },
  en: {
    allModules: 'All 99 modules', foundation: 'Modules 1–10 (Foundation)', traffic: 'Modules 11–25 (Traffic & Funnels)', scale: 'Modules 26–50 (Scaling & Copy)', systems: 'Modules 51–75 (High-Ticket & Systems)', empire: 'Modules 76–99 (Company & Empire)',
    aiUnavailable: 'Sorry, the AI mentor cannot answer right now.', aiConnection: 'Could not connect to the AI mentor.', aiLanguage: 'Answer entirely in English.', currentCourse: 'Current course', courseTitle: 'The GOM-MAR Masterclass', totalProgress: 'Overall progress', lessons: 'Lessons',
    search: "Search by module, topic, or lesson (e.g. 'Landing page', 'Traffic', '77')…", showing: 'Showing', ofModules: 'of 99 modules', range: 'Range:', noModules: 'No modules found', noModulesHint: 'Try another search term or reset the filters.', reset: 'Reset filters', module: 'Module', completed: 'Completed', inProgress: 'In progress', locked: 'Locked', proRequired: 'PRO required',
    videoGuide: 'Video & guide', view: 'View', startNow: 'Start now 🚀', nextLesson: 'Next lesson', lockedPrevious: 'Locked • Complete the previous lesson', backCourse: '← Back to course overview', askMentor: '🤖 Ask the GOM-MAR AI Mentor', stageLessons: 'lessons', stage: 'Stage', lesson: 'Lesson', taskDone: 'Task completed', openTask: 'Open task', handbook: 'Guide', handbookLong: 'Lesson guide (article)', video: 'Video', videoOverview: 'Video & overview', aiTutor: 'AI Tutor', aiTutorLong: 'AI lesson tutor', concepts: 'core concepts', practicalExample: 'Practical example:',
    takeaway: '💡 Key takeaway:', tutorFor: 'GOM-MAR AI tutor for lesson', tutorIntro: 'Have a question about this lesson or need an example for your niche? Ask your personal AI mentor directly!', explain: '💡 Explain it more simply', example: '🎯 Example for my niche', mistakes: '⚠️ Common beginner mistakes', questionPlaceholder: 'Your question about this lesson…', mentorAnswer: 'Your AI mentor’s answer:', lessonProgress: 'Lesson progress', resources: 'Resources & tools', toolboxHelp: 'Use the GOM-MAR Toolbox to complete this task in seconds with AI support:', openToolboxNow: 'Open the GOM-MAR Toolbox now →', nextStep: 'Next step', tryNow: 'Try it yourself now', nextStepText: 'Use our high-converting templates in the GOM-MAR Toolbox and put this lesson into practice.', openToolbox: 'Open the GOM-MAR Toolbox', previous: 'Previous lesson', markAgain: 'Mark task as completed again', taskComplete: 'Task completed! ✅', next: 'Continue ➡️',
  },
  pl: {
    allModules: 'Wszystkie 99 modułów', foundation: 'Moduły 1–10 (Podstawy)', traffic: 'Moduły 11–25 (Ruch i lejki)', scale: 'Moduły 26–50 (Skalowanie i copy)', systems: 'Moduły 51–75 (High-Ticket i systemy)', empire: 'Moduły 76–99 (Firma i imperium)',
    aiUnavailable: 'Przepraszamy, mentor AI nie może teraz odpowiedzieć.', aiConnection: 'Nie udało się połączyć z mentorem AI.', aiLanguage: 'Odpowiedz w całości po polsku.', currentCourse: 'Aktualny kurs', courseTitle: 'GOM-MAR Masterclass', totalProgress: 'Łączny postęp', lessons: 'Lekcje',
    search: "Szukaj modułu, tematu lub lekcji (np. 'Landing page', 'Ruch', '77')…", showing: 'Wyświetlono', ofModules: 'z 99 modułów', range: 'Zakres:', noModules: 'Nie znaleziono modułów', noModulesHint: 'Wpisz inne hasło lub zresetuj filtry.', reset: 'Resetuj filtry', module: 'Moduł', completed: 'Ukończono', inProgress: 'W trakcie', locked: 'Zablokowano', proRequired: 'Wymagany PRO',
    videoGuide: 'Wideo i przewodnik', view: 'Zobacz', startNow: 'Zacznij teraz 🚀', nextLesson: 'Następna lekcja', lockedPrevious: 'Zablokowano • Ukończ poprzednią lekcję', backCourse: '← Wróć do kursu', askMentor: '🤖 Zapytaj mentora AI GOM-MAR', stageLessons: 'lekcje', stage: 'Etap', lesson: 'Lekcja', taskDone: 'Zadanie wykonane', openTask: 'Otwarte zadanie', handbook: 'Poradnik', handbookLong: 'Poradnik lekcji (artykuł)', video: 'Wideo', videoOverview: 'Wideo i przegląd', aiTutor: 'Tutor AI', aiTutorLong: 'Tutor AI lekcji', concepts: 'główne koncepcje', practicalExample: 'Praktyczny przykład:',
    takeaway: '💡 Najważniejsza myśl:', tutorFor: 'Tutor AI GOM-MAR dla lekcji', tutorIntro: 'Masz pytanie o lekcję lub potrzebujesz przykładu dla swojej niszy? Zapytaj osobistego mentora AI!', explain: '💡 Wyjaśnij to prościej', example: '🎯 Przykład dla mojej niszy', mistakes: '⚠️ Typowe błędy początkujących', questionPlaceholder: 'Twoje pytanie o tę lekcję…', mentorAnswer: 'Odpowiedź mentora AI:', lessonProgress: 'Postęp lekcji', resources: 'Zasoby i narzędzia', toolboxHelp: 'Użyj GOM-MAR Toolbox, aby wykonać zadanie w kilka sekund ze wsparciem AI:', openToolboxNow: 'Otwórz teraz GOM-MAR Toolbox →', nextStep: 'Następny krok', tryNow: 'Wypróbuj to teraz', nextStepText: 'Użyj naszych skutecznych szablonów w GOM-MAR Toolbox i zastosuj wiedzę w praktyce.', openToolbox: 'Otwórz GOM-MAR Toolbox', previous: 'Poprzednia lekcja', markAgain: 'Ponownie oznacz jako wykonane', taskComplete: 'Zadanie wykonane! ✅', next: 'Dalej ➡️',
  },
};

const renderInlineLessonMarkdown = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

export const AcademyView: React.FC<AcademyViewProps> = ({
  user,
  stages = ACADEMY_STAGES,
  initialStageId,
  initialLessonId,
  onCompleteLesson,
  onNavigateToToolbox,
  onOpenFragGommar,
  stageAccessLimit,
}) => {
  const { language } = useLanguage();
  const copy = academyCopy[language];
  const localizedStages = useMemo(() => localizeAllAcademyStages(stages, language), [stages, language]);
  const completedTaskIdSet = useMemo(() => new Set(user.completedTaskIds), [user.completedTaskIds]);
  const unlockedStageIdSet = useMemo(() => new Set(user.unlockedStageIds), [user.unlockedStageIds]);
  const isLight = user.theme === 'clean-light' || !user.theme;

  // If an initial lesson ID was passed, open lesson mode directly; otherwise start in course overview
  const requestedInitialStageId = initialStageId || user.currentStageId || 1;
  const requestedStageIsAccessible = requestedInitialStageId <= stageAccessLimit
    && (requestedInitialStageId === 1 || unlockedStageIdSet.has(requestedInitialStageId));
  const safeInitialStageId = requestedStageIsAccessible ? requestedInitialStageId : 1;
  const [viewMode, setViewMode] = useState<'overview' | 'lesson'>(
    initialLessonId && requestedStageIsAccessible ? 'lesson' : 'overview'
  );
  const [selectedStageId, setSelectedStageId] = useState<number>(safeInitialStageId);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(initialLessonId || user.currentLessonId || '1.1');
  const [taskInputValue, setTaskInputValue] = useState<string>('');
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [activeLessonTab, setActiveLessonTab] = useState<'handbook' | 'video' | 'ai_tutor'>('handbook');

  // Inline AI Tutor state
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Search & Filter state for 99 Modules
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRangeFilter, setSelectedRangeFilter] = useState<string>('all');

  const rangeFilters = [
    { id: 'all', label: copy.allModules, range: [1, 99] },
    { id: '1-10', label: copy.foundation, range: [1, 10] },
    { id: '11-25', label: copy.traffic, range: [11, 25] },
    { id: '26-50', label: copy.scale, range: [26, 50] },
    { id: '51-75', label: copy.systems, range: [51, 75] },
    { id: '76-99', label: copy.empire, range: [76, 99] },
  ];

  const filteredStages = useMemo(() => {
    return localizedStages.filter((stage) => {
      // Range filter
      if (selectedRangeFilter !== 'all') {
        const foundFilter = rangeFilters.find((f) => f.id === selectedRangeFilter);
        if (foundFilter) {
          if (stage.id < foundFilter.range[0] || stage.id > foundFilter.range[1]) {
            return false;
          }
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const stageMatch = stage.title.toLowerCase().includes(q) || stage.description.toLowerCase().includes(q);
        const lessonMatch = stage.lessons.some((l) => 
          l.title.toLowerCase().includes(q) || 
          l.id.toLowerCase().includes(q) || 
          l.description.toLowerCase().includes(q)
        );
        return stageMatch || lessonMatch;
      }

      return true;
    });
  }, [searchQuery, selectedRangeFilter, localizedStages, language]);

  const currentStage = localizedStages.find((s) => s.id === selectedStageId) || localizedStages[0];
  const currentLesson = currentStage.lessons.find((l) => l.id === selectedLessonId) || currentStage.lessons[0];

  const isCompleted = currentLesson ? completedTaskIdSet.has(currentLesson.id) : false;

  // Overall statistics
  const allLessons = localizedStages.flatMap((s) => s.lessons);
  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = user.completedTaskIds.length;
  const progressPercent = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  // Helper for opening a specific lesson
  const handleOpenLesson = (stageId: number, lessonId: string) => {
    setSelectedStageId(stageId);
    setSelectedLessonId(lessonId);
    setAiAnswer('');
    setViewMode('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for navigating to next lesson
  const handleNextLesson = () => {
    const currentIndex = currentStage.lessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex < currentStage.lessons.length - 1) {
      setSelectedLessonId(currentStage.lessons[currentIndex + 1].id);
    } else if (
      selectedStageId < Math.min(localizedStages.length, stageAccessLimit)
      && unlockedStageIdSet.has(selectedStageId + 1)
    ) {
      const nextStage = localizedStages.find((s) => s.id === selectedStageId + 1);
      if (nextStage) {
        setSelectedStageId(nextStage.id);
        setSelectedLessonId(nextStage.lessons[0].id);
      }
    }
    setAiAnswer('');
  };

  const handlePrevLesson = () => {
    const currentIndex = currentStage.lessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setSelectedLessonId(currentStage.lessons[currentIndex - 1].id);
    } else if (selectedStageId > 1) {
      const prevStage = localizedStages.find((s) => s.id === selectedStageId - 1);
      if (prevStage) {
        setSelectedStageId(prevStage.id);
        setSelectedLessonId(prevStage.lessons[prevStage.lessons.length - 1].id);
      }
    }
    setAiAnswer('');
  };

  const handleTaskSubmit = () => {
    onCompleteLesson(currentLesson.id, currentStage.id);
  };

  const toggleChecklistItem = (item: string) => {
    setChecklistState((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleAskLessonAi = async (promptText?: string) => {
    const q = promptText || aiQuestion;
    if (!q.trim()) return;

    setIsAiLoading(true);
    setAiAnswer('');

    try {
      const res = await authenticatedFetch('/api/ask-gommar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${copy.aiLanguage}\n\n${q}`,
          language,
          currentStageTitle: currentStage.title,
          currentLessonTitle: `${currentLesson.id} ${currentLesson.title}`,
          niche: user.niche,
          targetAudience: user.targetAudience,
        }),
      });

      const data = await res.json();
      if (res.ok && data.answer) {
        setAiAnswer(data.answer);
      } else {
        setAiAnswer(data.error || copy.aiUnavailable);
      }
    } catch {
      setAiAnswer(copy.aiConnection);
    } finally {
      setIsAiLoading(false);
    }
  };

  // =========================================================================
  // VIEW MODE 1: COURSE OVERVIEW (GOM-MAR Masterclass Modules List)
  // =========================================================================
  if (viewMode === 'overview') {
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
            <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs uppercase tracking-wider font-extrabold">{copy.currentCourse}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            {copy.courseTitle}
          </h1>

          {/* Overall Progress Card (Momentum Engine Style) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm card-level-1 flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{copy.totalProgress}</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {completedLessonsCount}/{totalLessonsCount} {copy.lessons}
                </p>
              </div>
              <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                {progressPercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden progress-track-inner relative">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.max(progressPercent, 5)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full skeleton-shine animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Range Filter Section for 99 Modules */}
        <div className={`border rounded-2xl p-4 sm:p-5 space-y-4 transition-all ${
          isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.search}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                  isLight 
                    ? 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600' 
                    : 'bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:border-indigo-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick jump badge info */}
            <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-right shrink-0 border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              {copy.showing} <strong className="text-indigo-600 font-bold">{filteredStages.length}</strong> {copy.ofModules}
            </div>
          </div>

          {/* Module Range Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              {copy.range}
            </span>
            {rangeFilters.map((pill) => {
              const isSelected = selectedRangeFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedRangeFilter(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modules List */}
        <div className="flex flex-col gap-6">
          {filteredStages.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-400">
              <p className="font-bold text-white text-base">{copy.noModules}</p>
              <p className="text-xs text-slate-500 mt-1">{copy.noModulesHint}</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedRangeFilter('all'); }}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
              >
                {copy.reset}
              </button>
            </div>
          ) : (
            filteredStages.map((stage) => {
            const completedInStage = stage.lessons.filter((l) => completedTaskIdSet.has(l.id)).length;
            const isWithinTier = stage.id <= stageAccessLimit;
            const isStageComplete = isWithinTier && completedInStage === stage.lessons.length;
            const isStageInProgress = completedInStage > 0 && !isStageComplete;
            const isCurrentActiveStage = stage.id === (user.currentStageId || 1);
            const isStageUnlocked = isWithinTier && (stage.id === 1 || isCurrentActiveStage || unlockedStageIdSet.has(stage.id));

            // Determine status type for badge
            let statusType: 'completed' | 'in_progress' | 'locked' = 'locked';
            if (isStageComplete) {
              statusType = 'completed';
            } else if (isStageUnlocked && (isStageInProgress || isCurrentActiveStage || stage.id === 1)) {
              statusType = 'in_progress';
            }

            return (
              <div 
                key={stage.id} 
                className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border transition-all duration-200 card-level-1 ${
                  statusType === 'in_progress' 
                    ? 'border-l-4 border-indigo-600 dark:border-indigo-500 border-slate-200 dark:border-slate-800' 
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {copy.module} {stage.id}: {stage.title.replace(/^\d+\.\s*/, '')}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {stage.description}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {statusType === 'completed' && (
                      <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        {copy.completed}
                      </span>
                    )}

                    {statusType === 'in_progress' && (
                      <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                        {copy.inProgress}
                      </span>
                    )}

                    {statusType === 'locked' && (
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
                        <Lock className="w-4 h-4 text-slate-400" />
                        {isWithinTier ? copy.locked : copy.proRequired}
                      </span>
                    )}
                  </div>
                </div>

                {/* Lessons inside Module */}
                <div className="flex flex-col gap-3">
                  {stage.lessons.map((lesson, idx) => {
                    const isLessonDone = completedTaskIdSet.has(lesson.id);
                    // Determine if lesson is the next active lesson
                    const isNextActiveLesson = isStageUnlocked && !isLessonDone && (
                      idx === 0 || completedTaskIdSet.has(stage.lessons[idx - 1]?.id)
                    );

                    if (isStageUnlocked && isLessonDone) {
                      return (
                        <div 
                          key={lesson.id}
                          onClick={() => handleOpenLesson(stage.id, lesson.id)}
                          className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group cursor-pointer border border-slate-200/60 dark:border-slate-800"
                        >
                          <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {lesson.id} {lesson.title}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {copy.videoGuide} • {lesson.durationMinutes} Min
                            </p>
                          </div>

                          <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{copy.view}</span>
                          </button>
                        </div>
                      );
                    }

                    if (isNextActiveLesson) {
                      return (
                        <div 
                          key={lesson.id}
                          onClick={() => handleOpenLesson(stage.id, lesson.id)}
                          className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 border-2 border-indigo-500/50 hover:border-indigo-600 transition-all group cursor-pointer shadow-sm relative overflow-hidden"
                        >
                          <div className="absolute left-0 top-0 h-full w-1.5 bg-indigo-600" />

                          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                              {lesson.id} {lesson.title}
                            </h3>
                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5 flex items-center gap-1">
                              <ArrowRight className="w-3.5 h-3.5" /> {copy.nextLesson} • {lesson.durationMinutes} Min
                            </p>
                          </div>

                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md shadow-indigo-600/20">
                            {copy.startNow}
                          </button>
                        </div>
                      );
                    }

                    // Locked Lesson
                    return (
                      <div 
                        key={lesson.id}
                        className="flex items-center gap-4 p-4 rounded-xl bg-slate-100/60 dark:bg-slate-800/20 opacity-60 cursor-not-allowed border border-slate-200/40 dark:border-slate-800/40"
                      >
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                          <Lock className="w-4 h-4 text-slate-400" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {lesson.id} {lesson.title}
                          </h3>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            {copy.lockedPrevious}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE 2: ACTIVE LESSON READER (Detailed Interactive Lesson View)
  // =========================================================================
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls: Back to Course Overview & AI Assistant Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <button
          onClick={() => setViewMode('overview')}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>{copy.backCourse}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenFragGommar(`Ich bin bei Etappe ${selectedStageId} (${currentStage.title}), Lektion ${currentLesson.id} (${currentLesson.title}). Was ist hier der wichtigste Kernschritt?`)}
            className="px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{copy.askMentor}</span>
          </button>
        </div>
      </div>

      {/* Horizontal stage navigation */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {localizedStages.map((stage) => {
            const isStageActive = stage.id === selectedStageId;
            const completedCount = stage.lessons.filter((l) => completedTaskIdSet.has(l.id)).length;
            const isStageFullyDone = stage.id <= stageAccessLimit && completedCount === stage.lessons.length;
            const isStageUnlocked = stage.id <= stageAccessLimit && (stage.id === 1 || unlockedStageIdSet.has(stage.id));

            return (
              <button
                key={stage.id}
                disabled={!isStageUnlocked && !isStageFullyDone}
                onClick={() => {
                  setSelectedStageId(stage.id);
                  setSelectedLessonId(stage.lessons[0].id);
                  setAiAnswer('');
                }}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
                  isStageActive
                    ? 'bg-slate-900 dark:bg-slate-800 text-white border-indigo-600 dark:border-indigo-500 shadow-md scale-105 cursor-pointer'
                    : isStageFullyDone
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 cursor-pointer'
                    : isStageUnlocked
                    ? 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 cursor-pointer'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-60'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                  isStageFullyDone
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : isStageActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {isStageFullyDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : stage.id}
                </div>
                <span>{stage.title}</span>
                <span className="text-[10px] opacity-70">
                  ({completedCount}/{stage.lessons.length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Sidebar Lessons List (Left 4 cols) + Lesson Viewer (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Lessons Drawer Column (4 cols) */}
        <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-[80px] lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-thin">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>{copy.stage} {currentStage.id} {copy.stageLessons}</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                {currentStage.lessons.filter((l) => completedTaskIdSet.has(l.id)).length} / {currentStage.lessons.length}
              </span>
            </p>

            <div className="space-y-1.5">
              {currentStage.lessons.map((lesson) => {
                const isLessonDone = completedTaskIdSet.has(lesson.id);
                const isLessonSelected = lesson.id === selectedLessonId;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      setAiAnswer('');
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-150 flex items-start justify-between gap-3 cursor-pointer ${
                      isLessonSelected
                        ? 'bg-indigo-500/10 border-indigo-600 text-indigo-900 dark:text-white font-bold'
                        : isLessonDone
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {lesson.id} {lesson.title}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        <span>{lesson.durationMinutes} Min</span>
                        <span>•</span>
                        <span>{lesson.learnContent.fullArticleGuide ? 'Volltext Guide' : 'Anleitung'}</span>
                      </p>
                    </div>

                    <div className="shrink-0 mt-0.5">
                      {isLessonDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Standardized Interactive Lesson Viewer (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
            {/* Header: Title & Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {copy.stage} {currentStage.id}: {currentStage.title} • {copy.lesson} {currentLesson.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {currentLesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {currentLesson.description}
                </p>
              </div>

              {isCompleted ? (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{copy.taskDone}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold shrink-0">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>{copy.openTask}</span>
                </div>
              )}
            </div>

            {/* Lektionsansicht Tabs Switcher */}
            <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
              <button
                onClick={() => setActiveLessonTab('handbook')}
                className={`flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-center text-[10px] font-bold transition-all sm:flex-row sm:gap-2 sm:px-4 sm:text-xs ${
                  activeLessonTab === 'handbook'
                    ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="sm:hidden">{copy.handbook}</span>
                <span className="hidden sm:inline">{copy.handbookLong}</span>
              </button>

              <button
                onClick={() => setActiveLessonTab('video')}
                className={`flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-center text-[10px] font-bold transition-all sm:flex-row sm:gap-2 sm:px-4 sm:text-xs ${
                  activeLessonTab === 'video'
                    ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Video className="w-4 h-4" />
                <span className="sm:hidden">{copy.video}</span>
                <span className="hidden sm:inline">{copy.videoOverview}</span>
              </button>

              <button
                onClick={() => setActiveLessonTab('ai_tutor')}
                className={`flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-center text-[10px] font-bold transition-all sm:flex-row sm:gap-2 sm:px-4 sm:text-xs ${
                  activeLessonTab === 'ai_tutor'
                    ? 'bg-purple-600 text-white font-black shadow-md shadow-purple-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span className="sm:hidden">{copy.aiTutor}</span>
                <span className="hidden sm:inline">{copy.aiTutorLong}</span>
              </button>
            </div>

            {/* TAB 1: 📖 FULL HANDBOOK / ARTICLE GUIDE */}
            {activeLessonTab === 'handbook' && (
              <div className="space-y-6 animate-fadeIn">
                {/* 2. Bento Grid: Die Kernkonzepte (if present) */}
                {currentLesson.learnContent.coreConcepts && currentLesson.learnContent.coreConcepts.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <LayoutGrid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <span>{currentLesson.learnContent.coreConcepts.length} {copy.concepts}</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentLesson.learnContent.coreConcepts.map((concept, idx) => (
                        <div
                          key={idx}
                          className={`p-5 rounded-2xl transition-all ${
                            concept.highlight
                              ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600 border border-indigo-200 dark:border-indigo-800/60 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {concept.iconName === 'title' && <Type className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'anchor' && <Anchor className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                            {concept.iconName === 'stars' && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                            {concept.iconName === 'touch_app' && <MousePointer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'compare' && <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'thermostat' && <Zap className="w-4 h-4 text-amber-500" />}
                            {concept.iconName === 'zap' && <Zap className="w-4 h-4 text-amber-500" />}
                            {concept.iconName === 'target' && <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'gift' && <Gift className="w-4 h-4 text-emerald-500" />}
                            {concept.iconName === 'mail' && <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'user_check' && <UserCheck className="w-4 h-4 text-blue-500" />}
                            {!['title', 'anchor', 'stars', 'touch_app', 'compare', 'thermostat', 'zap', 'target', 'gift', 'mail', 'user_check'].includes(concept.iconName || '') && (
                              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            )}
                            <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                              {concept.title}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {concept.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Action Banner Card (e.g. AI Generator CTA) */}
                {currentLesson.learnContent.actionBanner && (
                  <div className="bg-slate-900 text-white dark:bg-indigo-950/70 border border-slate-800 dark:border-indigo-800/60 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
                    <div className="space-y-1 text-left">
                      <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        <span>{currentLesson.learnContent.actionBanner.title}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300">
                        {currentLesson.learnContent.actionBanner.description}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigateToToolbox(currentLesson.learnContent.actionBanner?.actionUrl || 'email')}
                      className="shrink-0 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{currentLesson.learnContent.actionBanner.buttonText}</span>
                    </button>
                  </div>
                )}

                {/* Full Article Text Guide */}
                {currentLesson.learnContent.fullArticleGuide ? (
                  <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed space-y-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
                    {currentLesson.learnContent.fullArticleGuide.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return <h3 key={idx} className="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                      }
                      if (paragraph.startsWith('#### ')) {
                        return <h4 key={idx} className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-3 mb-1">{paragraph.replace('#### ', '')}</h4>;
                      }
                      return (
                        <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {renderInlineLessonMarkdown(paragraph)}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {currentLesson.learnContent.summaryText}
                    </p>
                  </div>
                )}

                {/* Practical Examples Box */}
                {currentLesson.learnContent.practicalExamples && currentLesson.learnContent.practicalExamples.length > 0 && (
                  <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 rounded-2xl p-5 space-y-3">
                    <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {copy.practicalExample}
                    </p>
                    <div className="space-y-2">
                      {currentLesson.learnContent.practicalExamples.map((ex, i) => (
                        <p key={i} className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-100 font-medium leading-relaxed bg-white dark:bg-indigo-950/60 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                          {ex}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bullet Points */}
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 space-y-3">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Zusammenfassung der Kernpunkte:</p>
                  <div className="space-y-2">
                    {currentLesson.learnContent.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1 shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Takeaway Box */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">{copy.takeaway}</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    "{currentLesson.understandContent.coreTakeaway}"
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: 🎥 VIDEO & OVERVIEW */}
            {activeLessonTab === 'video' && (
              <div className="space-y-6 animate-fadeIn">
                <LessonVideoPlayer lesson={currentLesson} niche={user.niche} />

                {/* 2. Bento Grid: Die Kernkonzepte (also in Video tab) */}
                {currentLesson.learnContent.coreConcepts && currentLesson.learnContent.coreConcepts.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <LayoutGrid className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <span>{currentLesson.learnContent.coreConcepts.length} {copy.concepts}</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentLesson.learnContent.coreConcepts.map((concept, idx) => (
                        <div
                          key={idx}
                          className={`p-5 rounded-2xl transition-all ${
                            concept.highlight
                              ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600 border border-indigo-200 dark:border-indigo-800/60 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {concept.iconName === 'title' && <Type className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'anchor' && <Anchor className="w-4 h-4 text-slate-600 dark:text-slate-400" />}
                            {concept.iconName === 'stars' && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                            {concept.iconName === 'touch_app' && <MousePointer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'compare' && <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'thermostat' && <Zap className="w-4 h-4 text-amber-500" />}
                            {concept.iconName === 'zap' && <Zap className="w-4 h-4 text-amber-500" />}
                            {concept.iconName === 'target' && <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'gift' && <Gift className="w-4 h-4 text-emerald-500" />}
                            {concept.iconName === 'mail' && <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                            {concept.iconName === 'user_check' && <UserCheck className="w-4 h-4 text-blue-500" />}
                            {!['title', 'anchor', 'stars', 'touch_app', 'compare', 'thermostat', 'zap', 'target', 'gift', 'mail', 'user_check'].includes(concept.iconName || '') && (
                              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            )}
                            <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                              {concept.title}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {concept.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Action Banner Card (e.g. AI Generator CTA) */}
                {currentLesson.learnContent.actionBanner && (
                  <div className="bg-slate-900 text-white dark:bg-indigo-950/70 border border-slate-800 dark:border-indigo-800/60 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
                    <div className="space-y-1 text-left">
                      <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        <span>{currentLesson.learnContent.actionBanner.title}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300">
                        {currentLesson.learnContent.actionBanner.description}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigateToToolbox(currentLesson.learnContent.actionBanner?.actionUrl || 'email')}
                      className="shrink-0 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{currentLesson.learnContent.actionBanner.buttonText}</span>
                    </button>
                  </div>
                )}

                {/* Summary Text Box */}
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {currentLesson.learnContent.summaryText}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                    {currentLesson.learnContent.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: 🤖 INLINE AI LESSON TUTOR */}
            {activeLessonTab === 'ai_tutor' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-bold text-sm">
                    <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span>{copy.tutorFor} {currentLesson.id}</span>
                  </div>
                  <p className="text-xs text-purple-900/80 dark:text-purple-200/80 leading-relaxed">
                    {copy.tutorIntro}
                  </p>

                  {/* Preset Quick Chips */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const q = `Erkläre mir Lektion ${currentLesson.id} (${currentLesson.title}) noch einfacher mit Alltagssprache.`;
                        setAiQuestion(q);
                        handleAskLessonAi(q);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800/80 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-500/30 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      {copy.explain}
                    </button>

                    <button
                      onClick={() => {
                        const q = `Gib mir ein konkretes Praxisbeispiel für Lektion ${currentLesson.id} (${currentLesson.title}) speziell für meine Nische "${user.niche || 'Online-Business'}".`;
                        setAiQuestion(q);
                        handleAskLessonAi(q);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800/80 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-500/30 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      {copy.example}
                    </button>

                    <button
                      onClick={() => {
                        const q = `Was sind die häufigsten Fehler, die Anfänger bei Lektion ${currentLesson.id} (${currentLesson.title}) machen?`;
                        setAiQuestion(q);
                        handleAskLessonAi(q);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800/80 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-500/30 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      {copy.mistakes}
                    </button>
                  </div>

                  {/* Input Box */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskLessonAi()}
                      placeholder={copy.questionPlaceholder}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-500/40 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => handleAskLessonAi()}
                      disabled={isAiLoading || !aiQuestion.trim()}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      <span>Fragen</span>
                    </button>
                  </div>

                  {/* AI Response Box */}
                  {aiAnswer && (
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-900 dark:text-purple-100 space-y-2 leading-relaxed animate-fadeIn">
                      <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold">
                        <Sparkles className="w-4 h-4" />
                        <span>{copy.mentorAnswer}</span>
                      </div>
                      <div className="whitespace-pre-line text-slate-800 dark:text-slate-200">
                        {aiAnswer}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 🛠️ MACHE (Action Task Section) - ALWAYS VISIBLE */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>3. 🛠️ Mache – Deine Praxisaufgabe</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {currentLesson.actionTask.instruction}
                </p>

                {/* Input Type Renderings */}
                {currentLesson.actionTask.inputType === 'text' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={taskInputValue}
                      onChange={(e) => setTaskInputValue(e.target.value)}
                      placeholder={currentLesson.actionTask.placeholder || 'Deine Eingabe hier...'}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                )}

                {currentLesson.actionTask.inputType === 'checklist' && currentLesson.actionTask.checklistItems && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {currentLesson.actionTask.checklistItems.map((item, idx) => {
                        const checked = !!checklistState[item];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleChecklistItem(item)}
                            className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center gap-3 transition-colors ${
                              checked
                                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-500/40 text-indigo-900 dark:text-indigo-300 font-semibold'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                              checked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-400'
                            }`}>
                              {checked ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : <Circle className="w-3.5 h-3.5 text-slate-400" />}
                            </div>
                            <span className={checked ? 'line-through text-slate-500 dark:text-slate-400' : ''}>{item}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dynamic Checklist Progress Bar */}
                    {(() => {
                      const totalItems = currentLesson.actionTask.checklistItems.length;
                      const checkedCount = currentLesson.actionTask.checklistItems.filter(i => !!checklistState[i]).length;
                      const percentage = Math.round((checkedCount / totalItems) * 100);

                      return (
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-slate-500 dark:text-slate-400">{copy.lessonProgress}</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Optional Resources & Tools widget */}
                {currentLesson.learnContent.resources && currentLesson.learnContent.resources.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {copy.resources}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentLesson.learnContent.resources.map((res, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            if (res.actionUrl) onNavigateToToolbox(res.actionUrl);
                          }}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/40 transition-all cursor-pointer group"
                        >
                          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            {res.iconName === 'construction' && <Wrench className="w-4 h-4" />}
                            {res.iconName === 'picture_as_pdf' && <FileText className="w-4 h-4" />}
                            {res.iconName === 'calculate' && <Sparkles className="w-4 h-4" />}
                            {!['construction', 'picture_as_pdf', 'calculate'].includes(res.iconName || '') && <ExternalLink className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                              {res.title}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {res.subtitle}
                            </p>
                          </div>
                          {res.type === 'pdf' ? (
                            <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                          ) : (
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentLesson.actionTask.inputType === 'link_toolbox' && (
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 space-y-3">
                    <p className="text-xs text-purple-900 dark:text-purple-300 font-medium">
                      {copy.toolboxHelp}
                    </p>
                    <button
                      onClick={() => onNavigateToToolbox(currentLesson.actionTask.toolboxCategory)}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>{copy.openToolboxNow}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* High-Impact Action Card (Nächster Schritt) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-l-indigo-600 border border-slate-200 dark:border-slate-800 shadow-lg shadow-indigo-600/5 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-transparent dark:from-indigo-950/20 pointer-events-none" />
              <div className="flex-1 space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-extrabold border border-indigo-200 dark:border-indigo-800">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{copy.nextStep}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {copy.tryNow}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                  {copy.nextStepText}
                </p>
              </div>

              <div className="w-full md:w-auto relative z-10">
                <button
                  onClick={() => onNavigateToToolbox(currentLesson.actionTask.toolboxCategory || 'landingpage')}
                  className="w-full md:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 hover:scale-105 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>{copy.openToolbox}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4. ✅ ERLEDIGT & ➡️ WEITER (Task Completion & Navigation Footer) */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handlePrevLesson}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{copy.previous}</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Completion CTA */}
                <button
                  onClick={handleTaskSubmit}
                  className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 hover:scale-105'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isCompleted ? copy.markAgain : copy.taskComplete}</span>
                </button>

                {/* Next CTA */}
                <button
                  onClick={handleNextLesson}
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{copy.next}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
