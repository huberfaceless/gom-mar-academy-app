import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Save, 
  X, 
  ChevronRight, 
  ArrowUpDown,
  Mail,
  UserCheck,
  Award,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { StudentRecord, Stage, Lesson, UserProfile } from '../types';

interface AdminDashboardViewProps {
  user: UserProfile;
  stages: Stage[];
  students: StudentRecord[];
  onUpdateStages: (stages: Stage[]) => void;
  onResetStages: () => void;
  onNavigate: (view: string, stageId?: number, lessonId?: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  user,
  stages,
  students,
  onUpdateStages,
  onResetStages,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'curriculum' | 'stats'>('students');
  
  // Search & Filter state for Students
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  // Curriculum Editor state
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isCreatingLesson, setIsCreatingLesson] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Form State for Lesson Editor
  const [lessonFormData, setLessonFormData] = useState<Partial<Lesson>>({
    id: '',
    stageId: 1,
    stageTitle: '1. Dein Start',
    title: '',
    durationMinutes: 15,
    description: '',
    learnContent: {
      videoTitle: '',
      videoDuration: '10:00',
      videoUrl: '',
      summaryText: '',
      bulletPoints: [''],
      fullArticleGuide: '',
      practicalExamples: [''],
    },
    understandContent: {
      coreTakeaway: '',
      keyPrinciples: ['']
    },
    actionTask: {
      instruction: '',
      inputType: 'text',
      placeholder: ''
    }
  });

  const selectedStage = stages.find(s => s.id === selectedStageId) || stages[0];

  // Filtered Students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.niche.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesTier = tierFilter === 'all' || student.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  // Calculate Metrics
  const totalStudents = students.length;
  const proStudents = students.filter(s => s.tier === 'PRO' || s.tier === 'PREMIUM').length;
  const freeStudents = students.filter(s => s.tier === 'FREE').length;
  const totalLessons = stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const avgProgress = totalStudents > 0 ? Math.round(students.reduce((acc, s) => acc + s.progressPercent, 0) / totalStudents) : 0;

  // Open Lesson in Editor
  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsCreatingLesson(false);
    setLessonFormData(JSON.parse(JSON.stringify(lesson)));
  };

  // Open Create New Lesson Modal
  const handleOpenCreateLesson = () => {
    const nextIndex = selectedStage.lessons.length + 1;
    const newId = `${selectedStage.id}.${nextIndex}`;
    
    setEditingLesson(null);
    setIsCreatingLesson(true);
    setLessonFormData({
      id: newId,
      stageId: selectedStage.id,
      stageTitle: selectedStage.title,
      title: '',
      durationMinutes: 15,
      description: '',
      learnContent: {
        videoTitle: '',
        videoDuration: '10:00',
        videoUrl: '',
        summaryText: '',
        bulletPoints: ['Wichtiges Kernkonzept', 'Praxisorientierter Schritt'],
        fullArticleGuide: '### Lektions-Anleitung\n\nSchreibe hier die ausführliche Anleitung für die Kursteilnehmer.',
        practicalExamples: ['Beispiel für die Umsetzung im Alltag'],
      },
      understandContent: {
        coreTakeaway: 'Das wichtigste Fazit dieser Lektion.',
        keyPrinciples: ['Schlüsselprinzip 1', 'Schlüsselprinzip 2']
      },
      actionTask: {
        instruction: 'Aufgabe für den Kursteilnehmer:',
        inputType: 'text',
        placeholder: 'Deine Antwort oder Notiz hier eingeben...'
      }
    });
  };

  // Save Lesson changes
  const handleSaveLesson = () => {
    if (!lessonFormData.title?.trim() || !lessonFormData.id?.trim()) {
      alert('Bitte Titel und Lektions-ID angeben.');
      return;
    }

    const updatedStages = stages.map(stage => {
      if (stage.id === selectedStageId) {
        let updatedLessons: Lesson[];
        if (isCreatingLesson) {
          // Check if ID already exists
          const exists = stage.lessons.some(l => l.id === lessonFormData.id);
          if (exists) {
            updatedLessons = stage.lessons.map(l => l.id === lessonFormData.id ? (lessonFormData as Lesson) : l);
          } else {
            updatedLessons = [...stage.lessons, lessonFormData as Lesson];
          }
        } else {
          updatedLessons = stage.lessons.map(l => l.id === editingLesson?.id ? (lessonFormData as Lesson) : l);
        }
        return {
          ...stage,
          lessons: updatedLessons
        };
      }
      return stage;
    });

    onUpdateStages(updatedStages);
    setEditingLesson(null);
    setIsCreatingLesson(false);
    setSaveSuccessMsg('Lektion erfolgreich im System gespeichert!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Delete Lesson
  const handleDeleteLesson = (lessonId: string) => {
    if (!window.confirm(`Möchtest du Lektion ${lessonId} wirklich unwiderruflich löschen?`)) {
      return;
    }
    const updatedStages = stages.map(stage => {
      if (stage.id === selectedStageId) {
        return {
          ...stage,
          lessons: stage.lessons.filter(l => l.id !== lessonId)
        };
      }
      return stage;
    });
    onUpdateStages(updatedStages);
    setSaveSuccessMsg(`Lektion ${lessonId} gelöscht.`);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Administrator-Zentrale
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                Voller Systemzugriff
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              GOM-MAR Academy Management
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Verwalte alle Kursteilnehmer, bearbeite bestehende Lektionen, füge neue Inhalte hinzu und behalte den Lernfortschritt im Blick.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-indigo-500/20 shrink-0">
            <div className="text-center px-2">
              <p className="text-xs text-slate-400 font-semibold">Teilnehmer</p>
              <p className="text-xl font-black text-white">{totalStudents}</p>
            </div>
            <div className="text-center px-2 border-x border-slate-800">
              <p className="text-xs text-slate-400 font-semibold">Lektionen</p>
              <p className="text-xl font-black text-indigo-400">{totalLessons}</p>
            </div>
            <div className="text-center px-2">
              <p className="text-xs text-slate-400 font-semibold">Ø Fortschritt</p>
              <p className="text-xl font-black text-emerald-400">{avgProgress}%</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kursteilnehmer ({totalStudents})</span>
          </button>

          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum & Lektionen-Editor ({totalLessons})</span>
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm flex items-center gap-2 animate-fadeIn shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* ================= TAB 1: KURSTEILNEHMER ÜBERSICHT ================= */}
      {activeTab === 'students' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filters & Actions Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Teilnehmer nach Name, E-Mail oder Nische suchen..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <button
                onClick={() => setTierFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tierFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Alle ({totalStudents})
              </button>
              <button
                onClick={() => setTierFilter('FREE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tierFilter === 'FREE' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                FREE ({freeStudents})
              </button>
              <button
                onClick={() => setTierFilter('PRO')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tierFilter === 'PRO' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                PRO ({students.filter(s => s.tier === 'PRO').length})
              </button>
              <button
                onClick={() => setTierFilter('PREMIUM')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  tierFilter === 'PREMIUM' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                VIP ({students.filter(s => s.tier === 'PREMIUM').length})
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <p>
              Tarife werden aus verifizierten Firebase-Claims gelesen. Diese Übersicht zeigt den synchronisierten Status; lokale Tabellenänderungen vergeben keinen Mitgliederzugang.
            </p>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Teilnehmer</th>
                    <th className="py-3.5 px-4">Status / Tier</th>
                    <th className="py-3.5 px-4">Lernfortschritt</th>
                    <th className="py-3.5 px-4">Aktuelle Lektion</th>
                    <th className="py-3.5 px-4">Nische & Fokus</th>
                    <th className="py-3.5 px-4">Registriert</th>
                    <th className="py-3.5 px-4 text-right">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        Keine Kursteilnehmer für diesen Filter gefunden.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Name & Email */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs shrink-0">
                              {student.name.substring(0, 1)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{student.name}</p>
                              <p className="text-[11px] text-slate-400 font-normal">{student.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Tier */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-lg font-black text-[11px] border ${
                              student.tier === 'FREE'
                                ? 'bg-slate-100 text-slate-700 border-slate-300'
                                : student.tier === 'PRO'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-purple-50 text-purple-800 border-purple-300'
                            }`}
                          >
                            {student.tier} Member
                          </span>
                        </td>

                        {/* Progress */}
                        <td className="py-3.5 px-4">
                          <div className="w-36 space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                              <span>{student.completedLessonsCount} / {student.totalLessonsCount}</span>
                              <span className="text-indigo-600 font-extrabold">{student.progressPercent}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${student.progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Current Lesson */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono font-bold text-[11px] border border-indigo-200">
                            Lektion {student.currentLessonId}
                          </span>
                        </td>

                        {/* Niche */}
                        <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                          {student.niche}
                        </td>

                        {/* Registered Date */}
                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                          {student.registeredAt}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: CURRICULUM & LEKTIONEN-EDITOR ================= */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Stage Selector */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {stages.map((stage) => {
                const isSelected = stage.id === selectedStageId;
                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setSelectedStageId(stage.id);
                      setEditingLesson(null);
                      setIsCreatingLesson(false);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Etappe {stage.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {stage.lessons.length} Lektionen
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleOpenCreateLesson}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Neue Lektion erstellen</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Möchtest du alle Lektionen auf den ursprünglichen Standard zurücksetzen?')) {
                    onResetStages();
                    setSaveSuccessMsg('Curriculum auf Standard zurückgesetzt.');
                  }
                }}
                title="Auf Werkseinstellung zurücksetzen"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Stage Info */}
          <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">
                Aktive Etappe {selectedStage.id}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-1">{selectedStage.title}</h3>
              <p className="text-xs text-slate-600">{selectedStage.description}</p>
            </div>
            <div className="text-right text-xs font-bold text-slate-500">
              {selectedStage.lessons.length} Lektionen in dieser Etappe
            </div>
          </div>

          {/* Lessons List in Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedStage.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-mono font-black text-xs border border-indigo-200">
                      Lektion {lesson.id}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.durationMinutes} Min
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-slate-900 leading-snug">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {lesson.description || lesson.learnContent?.summaryText}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('academy', selectedStage.id, lesson.id)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Vorschau</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditLesson(lesson)}
                      className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Bearbeiten</span>
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Löschen</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= MODAL: LEKTIONEN-EDITOR (Erstellen / Modifizieren) ================= */}
      {(editingLesson || isCreatingLesson) && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-black text-xs uppercase tracking-wider">
                  {isCreatingLesson ? '✨ Neue Lektion anlegen' : `✏️ Lektion ${editingLesson?.id} bearbeiten`}
                </span>
                <h3 className="text-xl font-black">
                  {isCreatingLesson ? 'Lektion erstellen' : lessonFormData.title || 'Lektion bearbeiten'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditingLesson(null);
                  setIsCreatingLesson(false);
                }}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Form Fields */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lektions-ID (z.B. 1.15)</label>
                  <input
                    type="text"
                    value={lessonFormData.id || ''}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, id: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold focus:outline-none focus:border-indigo-500"
                    placeholder="1.1"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lektions-Titel</label>
                  <input
                    type="text"
                    value={lessonFormData.title || ''}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold focus:outline-none focus:border-indigo-500"
                    placeholder="z.B. High-Converting E-Mail Sequenzen"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dauer (Minuten)</label>
                  <input
                    type="number"
                    value={lessonFormData.durationMinutes || 15}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, durationMinutes: parseInt(e.target.value) || 15 })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-bold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Video Titel (optional)</label>
                  <input
                    type="text"
                    value={lessonFormData.learnContent?.videoTitle || ''}
                    onChange={(e) => setLessonFormData({
                      ...lessonFormData,
                      learnContent: { ...lessonFormData.learnContent!, videoTitle: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="z.B. Praxis-Walkthrough & Aufbau"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kurzbeschreibung (Vorschau)</label>
                <textarea
                  rows={2}
                  value={lessonFormData.description || ''}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                  placeholder="Beschreibe kurz, worum es in dieser Lektion geht..."
                />
              </div>

              {/* Summary Text & Full Article */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-black uppercase text-indigo-600 tracking-wider">
                  📖 Schritt 1: LERNEN - Ausführlicher Leitfaden
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Zusammenfassung (Kernbotschaft)</label>
                  <textarea
                    rows={3}
                    value={lessonFormData.learnContent?.summaryText || ''}
                    onChange={(e) => setLessonFormData({
                      ...lessonFormData,
                      learnContent: { ...lessonFormData.learnContent!, summaryText: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vollständiger Artikel & Schritt-für-Schritt Anleitung (Markdown)</label>
                  <textarea
                    rows={6}
                    value={lessonFormData.learnContent?.fullArticleGuide || ''}
                    onChange={(e) => setLessonFormData({
                      ...lessonFormData,
                      learnContent: { ...lessonFormData.learnContent!, fullArticleGuide: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
                    placeholder="### Überschrift..."
                  />
                </div>
              </div>

              {/* Step 2: Understand */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-black uppercase text-indigo-600 tracking-wider">
                  💡 Schritt 2: VERSTEHEN - Das Wichtigste auf den Punkt
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kern-Erkenntnis (Takeaway)</label>
                  <input
                    type="text"
                    value={lessonFormData.understandContent?.coreTakeaway || ''}
                    onChange={(e) => setLessonFormData({
                      ...lessonFormData,
                      understandContent: { ...lessonFormData.understandContent!, coreTakeaway: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Das wichtigste Learning..."
                  />
                </div>
              </div>

              {/* Step 3: Action Task */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-black uppercase text-indigo-600 tracking-wider">
                  🚀 Schritt 3: UMSETZEN - Die Aufgabe für den Kursteilnehmer
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Aufgaben-Anweisung</label>
                  <textarea
                    rows={2}
                    value={lessonFormData.actionTask?.instruction || ''}
                    onChange={(e) => setLessonFormData({
                      ...lessonFormData,
                      actionTask: { ...lessonFormData.actionTask!, instruction: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Was genau soll der Teilnehmer tun oder notieren?"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  setEditingLesson(null);
                  setIsCreatingLesson(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Abbrechen
              </button>

              <button
                onClick={handleSaveLesson}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lektion speichern</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: TEILNEHMER-DETAILS ================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-6 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-black text-lg flex items-center justify-center">
                  {selectedStudent.name.substring(0, 1)}
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStudent.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Mitgliedschaft:</span>
                <span className="font-black text-indigo-600">{selectedStudent.tier} Member</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Fortschritt:</span>
                <span className="font-bold text-slate-900">{selectedStudent.progressPercent}% ({selectedStudent.completedLessonsCount} / {selectedStudent.totalLessonsCount} Lektionen)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Aktueller Stand:</span>
                <span className="font-bold text-slate-900">Lektion {selectedStudent.currentLessonId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Gewählte Nische:</span>
                <span className="font-bold text-slate-900">{selectedStudent.niche}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Registrierungsdatum:</span>
                <span className="font-mono text-slate-700">{selectedStudent.registeredAt}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Zuletzt aktiv:</span>
                <span className="font-mono text-slate-700">{selectedStudent.lastActiveAt}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
