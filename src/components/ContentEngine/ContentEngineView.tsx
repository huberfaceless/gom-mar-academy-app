import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  FileText, 
  Pin, 
  Youtube, 
  Calendar, 
  Settings, 
  Plus, 
  ChevronRight, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  History,
  Trash2,
  ExternalLink,
  BookOpen,
  CloudCheck
} from 'lucide-react';
import { 
  ProjectSettings, 
  CentralContentProject, 
  ContentBrief, 
  BlogArticle, 
  PinterestPin, 
  YouTubeVideoData, 
  YouTubeShort 
} from '../../types/contentEngine';
import { 
  loadAllProjectSettings, 
  saveAllProjectSettings, 
  loadAllContentProjects, 
  saveOrUpdateContentProject, 
  deleteContentProject as deleteLocalContentProject, 
  DEFAULT_VITAL50_PROJECT 
} from '../../utils/contentStorage';
import { FirestoreContentService } from '../../services/firestoreContentService';
import { useAuth } from '../../context/AuthContext';
import { AIContentService } from '../../services/aiContentService';
import { ProjectSettingsModal } from './ProjectSettingsModal';
import { BriefEditorTab } from './BriefEditorTab';
import { BlogEditorTab } from './BlogEditorTab';
import { PinterestPinsTab } from './PinterestPinsTab';
import { YouTubeScriptTab } from './YouTubeScriptTab';
import { ContentCalendarTab } from './ContentCalendarTab';

const SUGGESTED_TOPICS_VITAL50 = [
  'Bauchfett verlieren ab 50: Warum Diäten scheitern und was wirklich hilft',
  'Gelenkschmerzen natürlich lindern: Die 5 besten Entzündungshemmer im Alltag',
  'Intervallfasten 16:8 für Frauen ab 50: Sanfter Einstieg ohne Heißhunger',
  'Kollagen Wirkung ab 50: Schöne Haut & starke Gelenke wissenschaftlich erklärt',
  'Stoffwechsel ankurbeln ab 50: 3 einfache Gewohnheiten für mehr Energie',
];

const SUGGESTED_TOPICS_ONLINE_BUSINESS = [
  'Online Geld verdienen ab 50: 5 seriöse Möglichkeiten für Anfänger',
  'Affiliate Marketing ohne eigenes Produkt: Einfacher Einstieg Schritt für Schritt',
  'Nebenbei ein digitales Einkommen aufbauen – ohne das eigene Gesicht zu zeigen',
  'Die 7 häufigsten Anfängerfehler beim Online-Geldverdienen',
  'Mit wenig Zeit ein automatisiertes Online-Business aufbauen',
];

const createOnlineBusinessProject = (): ProjectSettings => ({
  id: `proj_online_business_${Date.now()}`,
  name: 'GOM-MAR Online Business',
  websiteUrl: 'https://geldfluss.gomo-marketing.at/',
  targetAudience: 'Menschen über 50, die sich als Anfänger seriös ein zusätzliches Online-Einkommen aufbauen möchten',
  coreTopics: ['Online Geld verdienen', 'Affiliate Marketing', 'Digitale Produkte', 'Faceless Content', 'Automatisierung'],
  language: 'de',
  defaultCta: 'Entdecke jetzt den einfachen nächsten Schritt für dein Online-Einkommen.',
  defaultTargetUrl: 'https://geldfluss.gomo-marketing.at/',
  brandVoice: 'Einfach erklärt, ehrlich, motivierend, anfängerfreundlich und ohne unrealistische Einkommensversprechen',
  pinterestBoardDefault: 'Online Geld verdienen ab 50',
  youtubeChannelName: 'GOM-MAR Online Business',
  createdAt: new Date().toISOString(),
});

export const ContentEngineView: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.uid;

  const [projects, setProjects] = useState<ProjectSettings[]>(loadAllProjectSettings(userId));
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || DEFAULT_VITAL50_PROJECT.id);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [projectBeingEdited, setProjectBeingEdited] = useState<ProjectSettings | null>(null);

  // Content Projects (Historical & Active)
  const [contentProjects, setContentProjects] = useState<CentralContentProject[]>(loadAllContentProjects(userId));
  const [activeContentProject, setActiveContentProject] = useState<CentralContentProject | null>(() => {
    const list = loadAllContentProjects(userId);
    return list.length > 0 ? list[0] : null;
  });

  // Generator State
  const [topicInput, setTopicInput] = useState('');
  const [customAngleInput, setCustomAngleInput] = useState('');
  const [activeTab, setActiveTab] = useState<'brief' | 'blog' | 'pinterest' | 'youtube' | 'calendar'>('brief');

  // Loading States
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [isGeneratingPinterest, setIsGeneratingPinterest] = useState(false);
  const [isGeneratingYouTube, setIsGeneratingYouTube] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Load from Firestore on mount or when user changes
  useEffect(() => {
    async function loadData() {
      if (!userId) return;
      const localProjects = loadAllProjectSettings(userId);
      const localContent = loadAllContentProjects(userId);
      setProjects(localProjects);
      setSelectedProjectId(localProjects[0]?.id || DEFAULT_VITAL50_PROJECT.id);
      setContentProjects(localContent);
      setActiveContentProject(localContent[0] || null);
      try {
        await FirestoreContentService.syncLocalDataToFirestore(userId);
        const [firestoreProjects, firestoreContent] = await Promise.all([
          FirestoreContentService.getProjectSettings(userId),
          FirestoreContentService.getContentProjects(userId),
        ]);

        if (firestoreProjects && firestoreProjects.length > 0) {
          setProjects(firestoreProjects);
          if (!firestoreProjects.some((p) => p.id === selectedProjectId)) {
            setSelectedProjectId(firestoreProjects[0].id);
          }
        }

        setContentProjects(firestoreContent || []);
        setActiveContentProject(firestoreContent?.[0] || null);
      } catch (err) {
        console.warn('Could not load content from Firestore, keeping local fallback:', err);
      }
    }
    loadData();
  }, [userId]);

  const activeProjectSettings = projects.find((p) => p.id === selectedProjectId) || DEFAULT_VITAL50_PROJECT;

  // Persist whenever activeContentProject changes
  const handleUpdateActiveProject = async (updated: CentralContentProject): Promise<boolean> => {
    setActiveContentProject(updated);
    saveOrUpdateContentProject(updated, userId);
    setContentProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === updated.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [updated, ...prev];
    });

    if (userId) {
      try {
        await FirestoreContentService.saveContentProject(userId, updated);
      } catch (err) {
        console.error('Error saving updated content project to Firestore:', err);
        setErrorMsg(err instanceof Error ? err.message : 'Die Cloud-Speicherung konnte nicht bestätigt werden.');
        return false;
      }
    }
    return true;
  };

  const handleSaveProjectSettings = async (updatedSettings: ProjectSettings) => {
    setErrorMsg(null);
    setSaveNotice(null);
    const exists = projects.some((p) => p.id === updatedSettings.id);
    const nextProjects = exists
      ? projects.map((p) => (p.id === updatedSettings.id ? updatedSettings : p))
      : [...projects, updatedSettings];
    setProjects(nextProjects);
    setSelectedProjectId(updatedSettings.id);
    saveAllProjectSettings(nextProjects, userId);

    let settingsSaved = true;
    if (userId) {
      try {
        await FirestoreContentService.saveProjectSettings(userId, updatedSettings);
      } catch (err) {
        console.error('Error saving project settings to Firestore:', err);
        setErrorMsg(err instanceof Error ? err.message : 'Die Cloud-Speicherung konnte nicht bestätigt werden.');
        settingsSaved = false;
      }
    }

    let contentSaved = true;
    if (activeContentProject && activeContentProject.projectSettings.id === updatedSettings.id) {
      contentSaved = await handleUpdateActiveProject({
        ...activeContentProject,
        projectSettings: updatedSettings,
      });
    }

    if (settingsSaved && contentSaved) {
      setSaveNotice(`Projekt „${updatedSettings.name}“ wurde erfolgreich gespeichert.`);
    }
  };

  // 🚀 Start Workflow: 1. Generate Brief
  const handleStartBrief = async (topicToUse?: string) => {
    const finalTopic = topicToUse || topicInput;
    if (!finalTopic.trim()) {
      setErrorMsg('Bitte gib ein Thema ein.');
      return;
    }
    setErrorMsg(null);
    setIsGeneratingBrief(true);

    try {
      const { brief } = await AIContentService.generateContentBrief(
        finalTopic.trim(),
        activeProjectSettings,
        customAngleInput
      );

      const newProject: CentralContentProject = {
        id: `content_proj_${Date.now()}`,
        topic: finalTopic.trim(),
        projectSettings: activeProjectSettings,
        contentBrief: brief,
        pinterestPins: [],
        calendarItems: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      handleUpdateActiveProject(newProject);
      setActiveTab('brief');
    } catch (err: any) {
      setErrorMsg(err.message || 'Fehler beim Erstellen des Content Briefs.');
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  // 🚀 Generate Blog
  const handleGenerateBlog = async () => {
    if (!activeContentProject || !activeContentProject.contentBrief) return;
    setErrorMsg(null);
    setIsGeneratingBlog(true);

    try {
      const blogArticle = await AIContentService.generateBlogArticle(
        activeContentProject.topic,
        activeContentProject.contentBrief,
        activeContentProject.projectSettings
      );

      handleUpdateActiveProject({
        ...activeContentProject,
        blogArticle,
        updatedAt: new Date().toISOString(),
      });
      setActiveTab('blog');
    } catch (err: any) {
      setErrorMsg(err.message || 'Fehler beim Erstellen des Blogartikels.');
    } finally {
      setIsGeneratingBlog(false);
    }
  };

  // 🚀 Generate 5 Pinterest Pins
  const handleGeneratePinterest = async () => {
    if (!activeContentProject || !activeContentProject.contentBrief) return;
    setErrorMsg(null);
    setIsGeneratingPinterest(true);

    try {
      const pins = await AIContentService.generatePinterestPins(
        activeContentProject.topic,
        activeContentProject.contentBrief,
        activeContentProject.projectSettings
      );

      handleUpdateActiveProject({
        ...activeContentProject,
        pinterestPins: pins,
        updatedAt: new Date().toISOString(),
      });
      setActiveTab('pinterest');
    } catch (err: any) {
      setErrorMsg(err.message || 'Fehler beim Erstellen der Pinterest Pins.');
    } finally {
      setIsGeneratingPinterest(false);
    }
  };

  // 🚀 Generate YouTube Script & Shorts
  const handleGenerateYouTube = async () => {
    if (!activeContentProject || !activeContentProject.contentBrief) return;
    setErrorMsg(null);
    setIsGeneratingYouTube(true);

    try {
      const [video, shorts] = await Promise.all([
        AIContentService.generateYouTubeScript(
          activeContentProject.topic,
          activeContentProject.contentBrief,
          activeContentProject.projectSettings
        ),
        AIContentService.generateYouTubeShorts(
          activeContentProject.topic,
          activeContentProject.contentBrief,
          activeContentProject.projectSettings
        ),
      ]);

      handleUpdateActiveProject({
        ...activeContentProject,
        youtubeVideo: video,
        youtubeShorts: shorts,
        updatedAt: new Date().toISOString(),
      });
      setActiveTab('youtube');
    } catch (err: any) {
      setErrorMsg(err.message || 'Fehler beim Erstellen des YouTube Skripts.');
    } finally {
      setIsGeneratingYouTube(false);
    }
  };

  // ⚡ 1-Click Multi-Format Automation (Generates Brief + Blog + 5 Pins + YouTube + Shorts in Sequence)
  const handleGenerateAllInOneClick = async () => {
    if (!topicInput.trim()) {
      setErrorMsg('Bitte gib ein Thema ein.');
      return;
    }
    setErrorMsg(null);
    setIsGeneratingAll(true);

    try {
      // 1. Brief
      const { brief } = await AIContentService.generateContentBrief(
        topicInput.trim(),
        activeProjectSettings,
        customAngleInput
      );

      // 2. Parallel Generation of Blog, 5 Pins, and YouTube Scripts
      const [blogArticle, pinterestPins, youtubeVideo, youtubeShorts] = await Promise.all([
        AIContentService.generateBlogArticle(topicInput.trim(), brief, activeProjectSettings),
        AIContentService.generatePinterestPins(topicInput.trim(), brief, activeProjectSettings),
        AIContentService.generateYouTubeScript(topicInput.trim(), brief, activeProjectSettings),
        AIContentService.generateYouTubeShorts(topicInput.trim(), brief, activeProjectSettings),
      ]);

      const fullProject: CentralContentProject = {
        id: `content_proj_${Date.now()}`,
        topic: topicInput.trim(),
        projectSettings: activeProjectSettings,
        contentBrief: brief,
        blogArticle,
        pinterestPins,
        youtubeVideo,
        youtubeShorts,
        calendarItems: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      handleUpdateActiveProject(fullProject);
      setActiveTab('brief');
    } catch (err: any) {
      setErrorMsg(err.message || 'Fehler bei der 1-Click Generierung.');
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      if (userId) {
        await FirestoreContentService.deleteContentProject(userId, id);
      } else {
        deleteLocalContentProject(id, userId);
      }
      const remaining = loadAllContentProjects(userId);
      setContentProjects(remaining);
      if (activeContentProject?.id === id) {
        setActiveContentProject(remaining.length > 0 ? remaining[0] : null);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Das Projekt konnte nicht gelöscht werden.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Top Banner: Project Switcher & Brand Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                AI Content Engine Hub
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Phase 1 & 2 Aktiv
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              1 Thema → Content Brief → Blogartikel + 5 Pinterest Pins + YouTube Skript & Shorts → Kalender
            </p>
          </div>
        </div>

        {/* Project Selector & Settings */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.websiteUrl.replace('https://', '').replace('/', '')})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setProjectBeingEdited(activeProjectSettings);
              setIsSettingsModalOpen(true);
            }}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 text-xs font-bold"
            title="Projekt-Einstellungen bearbeiten"
          >
            <Settings className="w-4 h-4" />
            <span>Projekt bearbeiten</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setProjectBeingEdited(createOnlineBusinessProject());
              setIsSettingsModalOpen(true);
            }}
            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 rounded-xl shadow-xs transition-colors"
            title="Neues Content-Projekt anlegen"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {saveNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-semibold text-emerald-800 flex items-center gap-2">
          <CloudCheck className="w-4 h-4 shrink-0" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Main Topic Input & Generation Console */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              Neuer Content-Workflow
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Welches Thema möchtest du heute erobern?
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Aktiv: <strong className="text-emerald-400 font-bold">{activeProjectSettings.name}</strong> ({activeProjectSettings.targetAudience})
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="z.B. Bauchfett verlieren ab 50: Warum Diäten scheitern und was wirklich hilft..."
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              className="flex-1 px-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-white placeholder:text-slate-400 text-sm font-medium focus:outline-hidden focus:border-emerald-400 focus:bg-white/15 transition-all"
            />

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleStartBrief()}
                disabled={isGeneratingBrief || isGeneratingAll}
                className="px-4 sm:px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingBrief ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4 text-emerald-400" />}
                <span>Schritt 1: Briefing</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateAllInOneClick}
                disabled={isGeneratingAll || isGeneratingBrief}
                className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                <span>1-Klick Komplett-Set erzeugen</span>
              </button>
            </div>
          </div>

          {/* Inspiration Quick Pills */}
          <div className="pt-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Themen-Inspiration für {activeProjectSettings.name}:
            </p>
            <div className="flex flex-wrap gap-2">
              {(activeProjectSettings.id === DEFAULT_VITAL50_PROJECT.id
                ? SUGGESTED_TOPICS_VITAL50
                : SUGGESTED_TOPICS_ONLINE_BUSINESS).map((topic, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTopicInput(topic);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all text-left truncate max-w-md"
                >
                  ⚡ {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Progress & Navigation Tabs */}
      {!activeContentProject && (
        <YouTubeScriptTab
          onChangeVideo={() => undefined}
          onChangeShorts={() => undefined}
          onGoToCalendar={() => undefined}
          topic=""
          projectSettings={activeProjectSettings}
        />
      )}

      {activeContentProject && (
        <div className="space-y-4">
          <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('brief')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'brief'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Content Brief</span>
                {activeContentProject.contentBrief && <span className="text-[10px] opacity-80">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('blog')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'blog'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>2. Blogartikel</span>
                {activeContentProject.blogArticle && <span className="text-[10px] opacity-80">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pinterest')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'pinterest'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Pin className="w-4 h-4" />
                <span>3. Pinterest Pins (5)</span>
                {activeContentProject.pinterestPins?.length > 0 && <span className="text-[10px] opacity-80">({activeContentProject.pinterestPins.length})</span>}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('youtube')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'youtube'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Youtube className="w-4 h-4" />
                <span>4. YouTube & Shorts</span>
                {activeContentProject.youtubeVideo && <span className="text-[10px] opacity-80">✓</span>}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'calendar'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>5. Kalender & Freigabe</span>
              </button>
            </div>

            {/* Switch Topic Project Dropdown */}
            {contentProjects.length > 1 && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                <History className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={activeContentProject.id}
                  onChange={(e) => {
                    const found = contentProjects.find((p) => p.id === e.target.value);
                    if (found) setActiveContentProject(found);
                  }}
                  className="bg-transparent outline-hidden cursor-pointer max-w-[200px] truncate"
                >
                  {contentProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.topic}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Active Tab View */}
          {activeTab === 'brief' && activeContentProject.contentBrief && (
            <BriefEditorTab
              brief={activeContentProject.contentBrief}
              onChange={(updatedBrief) => {
                handleUpdateActiveProject({
                  ...activeContentProject,
                  contentBrief: updatedBrief,
                });
              }}
              onGenerateBlog={handleGenerateBlog}
              isGeneratingBlog={isGeneratingBlog}
            />
          )}

          {activeTab === 'blog' && (
            activeContentProject.blogArticle ? (
              <BlogEditorTab
                article={activeContentProject.blogArticle}
                onChange={(updatedArticle) => {
                  handleUpdateActiveProject({
                    ...activeContentProject,
                    blogArticle: updatedArticle,
                  });
                }}
                onGeneratePinterest={handleGeneratePinterest}
                isGeneratingPinterest={isGeneratingPinterest}
              />
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">Noch kein Blogartikel generiert</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Erstelle den vollständigen 1.500-Wörter-Artikel basierend auf dem Content Brief.</p>
                <button
                  type="button"
                  onClick={handleGenerateBlog}
                  disabled={isGeneratingBlog}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGeneratingBlog ? 'Generiere...' : 'Blogartikel jetzt generieren'}</span>
                </button>
              </div>
            )
          )}

          {activeTab === 'pinterest' && (
            <PinterestPinsTab
              pins={activeContentProject.pinterestPins || []}
              onChange={(updatedPins) => {
                handleUpdateActiveProject({
                  ...activeContentProject,
                  pinterestPins: updatedPins,
                });
              }}
              onGenerateYouTube={handleGenerateYouTube}
              isGeneratingYouTube={isGeneratingYouTube}
              topic={activeContentProject.topic}
              projectSettings={activeContentProject.projectSettings || activeProjectSettings}
            />
          )}

          {activeTab === 'youtube' && (
            <YouTubeScriptTab
              video={activeContentProject.youtubeVideo}
              shorts={activeContentProject.youtubeShorts}
              onChangeVideo={(updatedVideo) => {
                handleUpdateActiveProject({
                  ...activeContentProject,
                  youtubeVideo: updatedVideo,
                });
              }}
              onChangeShorts={(updatedShorts) => {
                handleUpdateActiveProject({
                  ...activeContentProject,
                  youtubeShorts: updatedShorts,
                });
              }}
              onGoToCalendar={() => setActiveTab('calendar')}
              topic={activeContentProject.topic}
              projectSettings={activeContentProject.projectSettings || activeProjectSettings}
            />
          )}

          {activeTab === 'calendar' && (
            <ContentCalendarTab
              project={activeContentProject}
              onUpdateProject={handleUpdateActiveProject}
            />
          )}
        </div>
      )}

      {/* Project Settings Modal */}
      <ProjectSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        project={projectBeingEdited || activeProjectSettings}
        onSave={handleSaveProjectSettings}
      />
    </div>
  );
};
