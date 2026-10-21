import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { authenticatedFetch } from '../../services/authenticatedFetch';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Pin, 
  Instagram,
  Youtube, 
  Smartphone, 
  Filter, 
  Check, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Share2,
  Play,
  RotateCcw,
  Trash2,
  Layers,
  AlertTriangle,
  Loader2,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  CentralContentProject, 
  ContentStatus, 
  PublishingJob, 
  PinterestBoard,
  SchedulerJob, 
  toCanonicalStatus 
} from '../../types/contentEngine';
import { FirestoreContentService } from '../../services/firestoreContentService';
import { PublishingService } from '../../services/publishingService';
import { useAuth } from '../../context/AuthContext';
import { pinterestService } from '../../services/pinterestService';
import { renderPinToCanvas } from '../../utils/pinterestCanvasRenderer';

const buildInstagramCaption = (description?: string, keywords: string[] = []): string => {
  const hashtags = keywords
    .map((keyword) => keyword.replace(/[^\p{L}\p{N}_]/gu, ''))
    .filter(Boolean)
    .map((keyword) => `#${keyword}`)
    .join(' ');
  return [description?.trim(), hashtags].filter(Boolean).join('\n\n').slice(0, 2200);
};

const renderInstagramImage = async (
  pin: CentralContentProject['pinterestPins'][number],
  projectSettings: CentralContentProject['projectSettings'],
): Promise<string> => {
  const canvas = document.createElement('canvas');
  await renderPinToCanvas(canvas, pin, projectSettings, { width: 1080, height: 1350 });
  return canvas.toDataURL('image/jpeg', 0.82);
};

const formatLocalDateTime = (value?: string, fallbackDays = 0): string => {
  if (value && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value) && !/[zZ]|[+-]\d{2}:\d{2}$/.test(value)) {
    return value.slice(0, 16);
  }

  const date = value ? new Date(value) : new Date(Date.now() + fallbackDays * 86400000);
  if (Number.isNaN(date.getTime())) return '';

  if (!value || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    date.setHours(9, 0, 0, 0);
  }

  const pad = (part: number) => String(part).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const toScheduledIso = (localDateTime?: string): string => {
  if (!localDateTime) return new Date().toISOString();
  const date = new Date(localDateTime);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Bitte wähle ein gültiges Datum und eine gültige Uhrzeit.');
  }
  return date.toISOString();
};

interface ContentCalendarTabProps {
  project: CentralContentProject;
  onUpdateProject: (updated: CentralContentProject) => void | boolean | Promise<void | boolean>;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  DRAFT: { label: 'Entwurf', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  draft: { label: 'Entwurf', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
  GENERATING: { label: 'KI Generiert', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  ai_generated: { label: 'KI Generiert', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  brief_generated: { label: 'Briefing fertig', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  NEEDS_REVIEW: { label: 'Prüfung nötig', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  needs_review: { label: 'Prüfung nötig', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  APPROVED: { label: 'Freigegeben ✅', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  approved: { label: 'Freigegeben ✅', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  SCHEDULED: { label: 'In Warteschlange 📅', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  scheduled: { label: 'In Warteschlange 📅', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  PUBLISHING: { label: 'Wird veröffentlicht...', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  publishing: { label: 'Wird veröffentlicht...', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  PUBLISHED: { label: 'Veröffentlicht 🚀', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  published: { label: 'Veröffentlicht 🚀', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  FAILED: { label: 'Fehlgeschlagen ⚠️', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  failed: { label: 'Fehlgeschlagen ⚠️', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  CANCELLED: { label: 'Abgebrochen', bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-300' },
};

const getStatusLabel = (status: string): string => {
  const normalizedStatus = status.toUpperCase();
  const configuredStatus = STATUS_CONFIG[status] || STATUS_CONFIG[normalizedStatus];
  if (configuredStatus) return configuredStatus.label;

  const additionalLabels: Record<string, string> = {
    NOT_IMPLEMENTED: 'Nicht unterstützt',
    SUCCESS: 'Erfolgreich',
    PENDING: 'Ausstehend',
    PROCESSING: 'In Bearbeitung',
  };
  return additionalLabels[normalizedStatus] || 'Unbekannter Status';
};

const getTriggerLabel = (trigger: string): string => {
  const labels: Record<string, string> = {
    manual: 'Manuell',
    scheduler: 'Automatischer Scheduler',
    retry: 'Erneuter Versuch',
  };
  return labels[trigger.toLowerCase()] || 'System';
};

export const ContentCalendarTab: React.FC<ContentCalendarTabProps> = ({
  project,
  onUpdateProject,
}) => {
  const { language, hubText } = useContentHubCopy();
  const { user } = useAuth();
  const userId = user?.uid || 'local_user';

  const [platformFilter, setPlatformFilter] = useState<'all' | 'blog' | 'pinterest' | 'instagram' | 'youtube'>('all');
  const [publishingJobs, setPublishingJobs] = useState<PublishingJob[]>([]);
  const [dateDrafts, setDateDrafts] = useState<Record<string, string>>({});
  const [savingDateId, setSavingDateId] = useState<string | null>(null);
  const [schedulerJobs, setSchedulerJobs] = useState<SchedulerJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(false);
  const [activeJobRunningId, setActiveJobRunningId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ text: string; type: 'info' | 'success' | 'warning' } | null>(null);
  const [schedulerServerStatus, setSchedulerServerStatus] = useState<{ active?: boolean; systemTime?: string; lastExecution?: any } | null>(null);
  const [isTriggeringSweep, setIsTriggeringSweep] = useState<boolean>(false);
  const [selectedLogJob, setSelectedLogJob] = useState<PublishingJob | null>(null);

  const [pinterestBoards, setPinterestBoards] = useState<PinterestBoard[]>([]);
  const [loadingPinterestBoards, setLoadingPinterestBoards] = useState(false);
  const [savingBoardId, setSavingBoardId] = useState<string | null>(null);

  const loadPinterestBoards = async () => {
    setLoadingPinterestBoards(true);
    const result = await pinterestService.getBoards();
    setLoadingPinterestBoards(false);
    if (!result.success) {
      setActionNotice({ text: result.error || hubText("Pinterest-Pinnwände konnten nicht geladen werden. Bitte verbinde Pinterest im Bereich Pinterest-Pins."), type: 'warning' });
      return;
    }
    setPinterestBoards(result.boards);
    if (!result.boards.length) {
      setActionNotice({ text: hubText("Keine Pinterest-Pinnwand gefunden. Erstelle zuerst eine Pinnwand auf Pinterest und lade die Liste erneut."), type: 'info' });
    }
  };

  const handlePinterestBoardChange = async (itemId: string, boardId: string) => {
    const board = pinterestBoards.find(candidate => candidate.id === boardId);
    if (!board || savingBoardId) return;
    setSavingBoardId(itemId);
    try {
      const waitingJobs = publishingJobs.filter(job => job.contentId === itemId && ['DRAFT', 'SCHEDULED', 'NEEDS_REVIEW'].includes(job.status));
      for (const job of waitingJobs) {
        await FirestoreContentService.updatePinterestJobBoard(userId, job.id, board.id, board.name);
      }
      const saved = await onUpdateProject({
        ...project,
        pinterestPins: project.pinterestPins.map((pin, index) => (pin.id || `pin_${index}`) === itemId
          ? { ...pin, pinterestBoardId: board.id, board: board.name } : pin),
      });
      await loadJobs();
      if (saved === false) throw new Error(hubText("Die Pinnwand konnte im Inhaltsprojekt nicht gespeichert werden. Bitte erneut versuchen."));
      const failedJob = publishingJobs.some(job => job.contentId === itemId && job.status === 'FAILED');
      setActionNotice({ text: failedJob && !waitingJobs.length
        ? hubText("Pinnwand gespeichert. Entferne den fehlgeschlagenen Auftrag unten mit dem Papierkorb und reihe den Pin anschließend erneut ein.")
        : hubText("Pinnwand gespeichert") + (waitingJobs.length ? hubText(" und im wartenden Auftrag aktualisiert.") : hubText(". Der Pin kann jetzt eingeplant werden.")), type: 'success' });
    } catch (error) {
      setActionNotice({ text: error instanceof Error ? error.message : hubText("Die Pinnwand konnte nicht gespeichert werden."), type: 'warning' });
      await loadJobs();
    } finally {
      setSavingBoardId(null);
    }
  };

  const jobsRequestId = useRef(0);

  // Load Publishing & Scheduler jobs from Firestore and fetch backend scheduler status
  const loadJobs = useCallback(async (silent = false) => {
    if (!user?.uid) return;
    const requestId = ++jobsRequestId.current;
    if (!silent) setIsLoadingJobs(true);
    try {
      const [pJobs, sJobs] = await Promise.all([
        FirestoreContentService.getPublishingJobs(user.uid, project.id),
        FirestoreContentService.getSchedulerJobs(user.uid),
      ]);
      if (requestId !== jobsRequestId.current) return;
      setPublishingJobs(pJobs);
      setSchedulerJobs(sJobs);

      // Fetch server background scheduler status
      authenticatedFetch('/api/scheduler/status')
        .then(res => res.json())
        .then(data => {
          if (data.success && requestId === jobsRequestId.current) {
            setSchedulerServerStatus(data);
          }
        })
        .catch(() => {});
    } catch (err) {
      console.warn('Error loading publishing jobs:', err);
    } finally {
      if (requestId === jobsRequestId.current) setIsLoadingJobs(false);
    }
  }, [project.id, user?.uid]);

  // Trigger server background sweep manually
  const handleTriggerServerSweep = async () => {
    setIsTriggeringSweep(true);
    setActionNotice(null);
    try {
      const res = await authenticatedFetch('/api/admin/scheduler/run-tick', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Der Server antwortete mit HTTP ${res.status}.`);
      }
      await loadJobs();
      if (data.success && data.outcome) {
        const out = data.outcome;
        setActionNotice({
          text: hubText("Durchlauf der Server-Zeitsteuerung abgeschlossen: {0} geprüft, {1} verarbeitet, {2} erfolgreich, {3} fehlgeschlagen, {4} übersprungen/wartend.", out.jobsChecked, out.jobsProcessed, out.publishedCount, out.failedCount, out.skippedCount),
          type: 'success',
        });
      } else {
        setActionNotice({
          text: data.error || hubText("Der Server-Scheduler konnte nicht ausgeführt werden."),
          type: 'warning',
        });
      }
    } catch (err: any) {
      setActionNotice({
        text: hubText("Fehler beim Auslösen des Durchlaufs der Server-Zeitsteuerung: {0}", err.message),
        type: 'warning',
      });
    } finally {
      setIsTriggeringSweep(false);
    }
  };

  useEffect(() => {
    void loadJobs();
    const refreshVisibleJobs = () => {
      if (document.visibilityState === 'visible') void loadJobs(true);
    };
    const refreshTimer = window.setInterval(refreshVisibleJobs, 30_000);
    document.addEventListener('visibilitychange', refreshVisibleJobs);
    window.addEventListener('focus', refreshVisibleJobs);
    return () => {
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', refreshVisibleJobs);
      window.removeEventListener('focus', refreshVisibleJobs);
      ++jobsRequestId.current;
    };
  }, [loadJobs]);

  // Unified items list
  const items: Array<{
    id: string;
    type: 'blog' | 'pinterest' | 'instagram' | 'youtube_video' | 'youtube_short';
    platform: 'BLOG' | 'PINTEREST' | 'INSTAGRAM' | 'YOUTUBE';
    contentType: 'ARTICLE' | 'PIN' | 'INSTAGRAM_POST' | 'VIDEO' | 'SHORT';
    title: string;
    targetUrl?: string;
    status: ContentStatus;
    scheduledDate?: string;
    platformLabel: string;
    icon: any;
    color: string;
    payloadData?: any;
  }> = [];

  if (project.blogArticle) {
    items.push({
      id: 'blog_main',
      type: 'blog',
      platform: 'BLOG',
      contentType: 'ARTICLE',
      title: `Blog: ${project.blogArticle.title}`,
      targetUrl: project.projectSettings.websiteUrl,
      status: project.blogArticle.status || 'ai_generated',
      scheduledDate: formatLocalDateTime(project.calendarItems.find((c) => c.channel === 'blog')?.scheduledDate),
      platformLabel: 'WordPress / Blog',
      icon: FileText,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      payloadData: {
        title: project.blogArticle.title,
        contentMarkdown: project.blogArticle.contentMarkdown,
        targetUrl: project.projectSettings.websiteUrl,
      },
    });
  }

  (project.pinterestPins || []).forEach((pin, idx) => {
    items.push({
      id: pin.id || `pin_${idx}`,
      type: 'pinterest',
      platform: 'PINTEREST',
      contentType: 'PIN',
      title: `Pin #${idx + 1} (${pin.angle.toUpperCase()}): ${pin.title}`,
      targetUrl: pin.targetUrl,
      status: pin.status || 'ai_generated',
      scheduledDate: formatLocalDateTime(pin.scheduledDate, idx + 1),
      platformLabel: `Pinterest (${pin.board || 'Standard'})`,
      icon: Pin,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      payloadData: {
        title: pin.title,
        description: pin.description,
        targetUrl: pin.targetUrl,
        boardId: pin.pinterestBoardId,
        boardName: pin.board,
        imageUrl: pin.imageUrl,
        imageBase64: pin.imageBase64,
        tags: pin.keywords,
      },
    });
  });

  (project.pinterestPins || []).forEach((pin, idx) => {
    const sourceId = pin.id || `pin_${idx}`;
    const instagramId = `instagram_${sourceId}`;
    const calendarItem = project.calendarItems.find((item) => item.id === instagramId);
    items.push({
      id: instagramId,
      type: 'instagram',
      platform: 'INSTAGRAM',
      contentType: 'INSTAGRAM_POST',
      title: hubText('Instagram-Beitrag #{0}: {1}', idx + 1, pin.title),
      targetUrl: pin.targetUrl,
      status: calendarItem?.status || 'ai_generated',
      scheduledDate: formatLocalDateTime(calendarItem?.scheduledDate, idx + 1),
      platformLabel: 'Instagram Feed (4:5)',
      icon: Instagram,
      color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
      payloadData: {
        title: pin.title,
        description: buildInstagramCaption(pin.description, pin.keywords),
        targetUrl: pin.targetUrl,
        tags: pin.keywords,
        metadata: { sourcePinId: sourceId, sourcePinIndex: idx },
      },
    });
  });

  if (project.youtubeVideo) {
    items.push({
      id: 'yt_video_main',
      type: 'youtube_video',
      platform: 'YOUTUBE',
      contentType: 'VIDEO',
      title: `YouTube Video: ${project.youtubeVideo.title}`,
      targetUrl: project.projectSettings.websiteUrl,
      status: project.youtubeVideo.status || 'ai_generated',
      scheduledDate: formatLocalDateTime(project.youtubeVideo.scheduledDate, 2),
      platformLabel: 'YouTube-Langvideo',
      icon: Youtube,
      color: 'text-red-600 bg-red-50 border-red-200',
      payloadData: {
        title: project.youtubeVideo.title,
        description: project.youtubeVideo.description,
        tags: project.youtubeVideo.keywords,
        metadata: {
          videoId: project.youtubeVideo.videoId || getYouTubeVideoId(project.youtubeVideo.videoUrl),
        },
      },
    });
  }

  (project.youtubeShorts || []).forEach((short, idx) => {
    items.push({
      id: short.id || `short_${idx}`,
      type: 'youtube_short',
      platform: 'YOUTUBE',
      contentType: 'SHORT',
      title: hubText('Kurzvideo #{0}: {1}', short.shortNumber || idx + 1, short.title),
      targetUrl: project.projectSettings.websiteUrl,
      status: short.status || 'ai_generated',
      scheduledDate: formatLocalDateTime(short.scheduledDate, idx + 3),
      platformLabel: 'YouTube Shorts (9:16)',
      icon: Smartphone,
      color: 'text-red-500 bg-red-50 border-red-200',
      payloadData: {
        title: short.title,
        description: short.description,
        metadata: {
          videoId: short.videoId || getYouTubeVideoId(short.videoUrl),
        },
      },
    });
  });

  const filteredItems = items.filter((item) => {
    if (platformFilter === 'blog') return item.type === 'blog';
    if (platformFilter === 'pinterest') return item.type === 'pinterest';
    if (platformFilter === 'instagram') return item.type === 'instagram';
    if (platformFilter === 'youtube') return item.type.startsWith('youtube');
    return true;
  });

  function getYouTubeVideoId(url?: string): string | undefined {
    if (!url) return undefined;
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1) || undefined;
      return parsed.searchParams.get('v') || undefined;
    } catch {
      return undefined;
    }
  }

  const supportsPublishingQueue = (item: typeof items[0]): boolean => {
    if (item.platform === 'PINTEREST' && item.contentType === 'PIN') return true;
    if (item.platform === 'INSTAGRAM' && item.contentType === 'INSTAGRAM_POST') return true;
    return item.platform === 'YOUTUBE'
      && (item.contentType === 'VIDEO' || item.contentType === 'SHORT')
      && typeof item.payloadData?.metadata?.videoId === 'string';
  };

  const preparePayload = async (item: typeof items[0]): Promise<PublishingJob['payload']> => {
    if (item.platform === 'PINTEREST' && !item.payloadData?.boardId?.trim()) {
      throw new Error(hubText("Bitte wähle vor dem Einplanen die Ziel-Pinnwand für diesen Pinterest-Pin aus."));
    }
    if (item.platform !== 'INSTAGRAM') return item.payloadData;
    const sourceIndex = item.payloadData?.metadata?.sourcePinIndex;
    const sourcePin = typeof sourceIndex === 'number' ? project.pinterestPins[sourceIndex] : undefined;
    if (!sourcePin) throw new Error(hubText("Die zugehörige Instagram-Grafik wurde nicht gefunden."));
    return {
      ...item.payloadData,
      imageBase64: await renderInstagramImage(sourcePin, project.projectSettings),
    };
  };

  // Enqueue a specific item into the Firestore publishing queue
  const handleEnqueueItem = async (item: typeof items[0]) => {
    if (!user?.uid) {
      setActionNotice({
        text: hubText("Bitte melde dich an, um Inhalte in der Firestore-Veröffentlichungswarteschlange zu planen."),
        type: 'warning',
      });
      return;
    }
    if (!supportsPublishingQueue(item)) {
      setActionNotice({
        text: hubText("{0} kann bereits vorbereitet und freigegeben, aber noch nicht automatisch veröffentlicht werden.", item.platformLabel),
        type: 'info',
      });
      return;
    }

    if (savingBoardId) return;

    try {
      const { publishingJob } = await PublishingService.enqueueJob(user.uid, {
        projectId: project.projectSettings.id,
        contentProjectId: project.id,
        contentId: item.id,
        platform: item.platform,
        contentType: item.contentType,
        scheduledAt: toScheduledIso(item.scheduledDate),
        payload: await preparePayload(item),
      });

      const updatedCalendarItems = project.calendarItems.some(calendarItem => calendarItem.id === item.id)
        ? project.calendarItems.map(calendarItem => calendarItem.id === item.id ? { ...calendarItem, status: 'scheduled' as ContentStatus } : calendarItem)
        : [...project.calendarItems, {
            id: item.id,
            channel: item.platform === 'INSTAGRAM' ? 'instagram' as const : item.type === 'blog' ? 'blog' as const : item.type === 'pinterest' ? 'pinterest' as const : item.type === 'youtube_short' ? 'shorts' as const : 'youtube' as const,
            title: item.title,
            scheduledDate: item.scheduledDate || formatLocalDateTime(),
            status: 'scheduled' as ContentStatus,
            publishingJobId: publishingJob.id,
          }];
      onUpdateProject({
        ...project,
        calendarItems: updatedCalendarItems,
        pinterestPins: project.pinterestPins.map(pin => pin.id === item.id ? { ...pin, status: 'scheduled' } : pin),
        youtubeVideo: item.id === 'yt_video_main' && project.youtubeVideo
          ? { ...project.youtubeVideo, status: 'scheduled' }
          : project.youtubeVideo,
        youtubeShorts: project.youtubeShorts?.map((short, idx) => (
          (short.id || `short_${idx}`) === item.id ? { ...short, status: 'scheduled' } : short
        )),
      });
      await loadJobs();

      setActionNotice({
        text: hubText("Auftrag für \"{0}\" erfolgreich in die Firestore-Veröffentlichungswarteschlange eingereiht (Auftrags-ID: {1}).", item.title, publishingJob.id.slice(-6)),
        type: 'success',
      });
    } catch (err: any) {
      setActionNotice({
        text: `Fehler beim Einreihen in die Warteschlange: ${err.message}`,
        type: 'warning',
      });
    }
  };

  // Approve all & enqueue all
  const handleApproveAndEnqueueAll = async () => {
    if (savingBoardId || items.some(item => item.platform === 'PINTEREST' && !item.payloadData?.boardId?.trim())) {
      setActionNotice({ text: hubText("Bitte wähle zuerst für jeden Pinterest-Pin eine Ziel-Pinnwand und warte, bis sie gespeichert ist."), type: 'warning' });
      return;
    }
    const updated = { ...project };
    if (updated.blogArticle) updated.blogArticle.status = 'approved';
    if (updated.pinterestPins) {
      updated.pinterestPins = updated.pinterestPins.map((p) => ({ ...p, status: 'approved' }));
    }
    if (updated.youtubeVideo) updated.youtubeVideo.status = 'approved';
    if (updated.youtubeShorts) {
      updated.youtubeShorts = updated.youtubeShorts.map((s) => ({ ...s, status: 'approved' }));
    }
    onUpdateProject(updated);

    if (user?.uid) {
      const supportedItems = items.filter(supportsPublishingQueue);
      let queuedCount = 0;
      let failedCount = 0;
      for (const item of supportedItems) {
        try {
          await PublishingService.enqueueJob(user.uid, {
            projectId: project.projectSettings.id,
            contentProjectId: project.id,
            contentId: item.id,
            platform: item.platform,
            contentType: item.contentType,
            scheduledAt: toScheduledIso(item.scheduledDate),
            payload: await preparePayload(item),
          });
          queuedCount++;
        } catch (e) {
          failedCount++;
          console.warn('Batch enqueue item error:', e);
        }
      }
      await loadJobs();
      setActionNotice({
        text: hubText("{0} Inhalte freigegeben: {1} unterstützte Inhalte eingereiht, {2} noch nicht automatisierbare Inhalte nicht eingereiht{3}.", items.length, queuedCount, items.length - supportedItems.length, failedCount > 0 ? hubText(', {0} Aufträge fehlgeschlagen', failedCount) : ''),
        type: failedCount > 0 ? 'warning' : 'success',
      });
    }
  };

  const handleDateChange = async (itemId: string, newDate: string) => {
    if (savingDateId) return;
    const matchingJob = publishingJobs.find(job => job.contentId === itemId);
    setSavingDateId(itemId);
    try {
      const scheduledAt = toScheduledIso(newDate);
      if (!newDate) throw new Error(hubText("Bitte wähle ein Datum und eine Uhrzeit."));
      if (matchingJob) {
        if (!user?.uid) throw new Error(hubText("Bitte melde dich an, um den Auftrag zu verschieben."));
        await FirestoreContentService.reschedulePublishingJob(user.uid, matchingJob.id, scheduledAt);
        setPublishingJobs(jobs => jobs.map(job => job.id === matchingJob.id ? { ...job, scheduledAt } : job));
        setSchedulerJobs(jobs => jobs.map(job => job.publishingJobId === matchingJob.id ? { ...job, scheduledAt } : job));
      }
      const projectSaved = await updateProjectDate(itemId, newDate);
      if (projectSaved === false) {
        throw new Error(matchingJob
          ? hubText("Der Auftragstermin wurde gespeichert, aber der Inhaltskalender konnte nicht aktualisiert werden. Bitte lade die Ansicht neu.")
          : hubText("Der Inhaltskalender konnte nicht gespeichert werden. Bitte versuche es erneut."));
      }
      setActionNotice({
        text: matchingJob ? hubText("Der Veröffentlichungstermin wurde in der Warteschlange gespeichert.") : hubText("Der Termin wurde im Inhaltskalender geändert."),
        type: 'success',
      });
    } catch (error) {
      setActionNotice({ text: error instanceof Error ? error.message : hubText("Der Veröffentlichungstermin konnte nicht gespeichert werden."), type: 'warning' });
    } finally {
      setDateDrafts(drafts => {
        const next = { ...drafts };
        delete next[itemId];
        return next;
      });
      setSavingDateId(null);
    }
  };

  const updateProjectDate = (itemId: string, newDate: string) => {
    const updated = { ...project, calendarItems: project.calendarItems.map(item => ({ ...item })),
      blogArticle: project.blogArticle ? { ...project.blogArticle } : undefined,
      youtubeVideo: project.youtubeVideo ? { ...project.youtubeVideo } : undefined };
    if (itemId === 'blog_main' && updated.blogArticle) {
      const calIdx = updated.calendarItems.findIndex((c) => c.channel === 'blog');
      if (calIdx >= 0) {
        updated.calendarItems[calIdx].scheduledDate = newDate;
      } else {
        updated.calendarItems.push({
          id: 'blog_main',
          channel: 'blog',
          title: updated.blogArticle.title,
          scheduledDate: newDate,
          status: updated.blogArticle.status || 'ai_generated',
        });
      }
    } else if (itemId.startsWith('instagram_')) {
      const existingIndex = updated.calendarItems.findIndex((item) => item.id === itemId);
      if (existingIndex >= 0) {
        updated.calendarItems[existingIndex].scheduledDate = newDate;
      } else {
        const selectedItem = items.find((item) => item.id === itemId);
        updated.calendarItems.push({
          id: itemId,
          channel: 'instagram',
          title: selectedItem?.title || 'Instagram-Beitrag',
          scheduledDate: newDate,
          status: selectedItem?.status || 'ai_generated',
        });
      }
    } else if (itemId === 'yt_video_main' && updated.youtubeVideo) {
      updated.youtubeVideo.scheduledDate = newDate;
    } else if (itemId.startsWith('pin_') || updated.pinterestPins.some((p) => p.id === itemId)) {
      updated.pinterestPins = updated.pinterestPins.map((p, idx) =>
        p.id === itemId || `pin_${idx}` === itemId ? { ...p, scheduledDate: newDate } : p
      );
    } else if (itemId.startsWith('short_') || (updated.youtubeShorts && updated.youtubeShorts.some((s) => s.id === itemId))) {
      if (updated.youtubeShorts) {
        updated.youtubeShorts = updated.youtubeShorts.map((s, idx) =>
          s.id === itemId || `short_${idx}` === itemId ? { ...s, scheduledDate: newDate } : s
        );
      }
    }
    return onUpdateProject(updated);
  };

  const handleStatusChange = async (itemId: string, newStatus: ContentStatus) => {
    const selectedItem = items.find(item => item.id === itemId);
    if (selectedItem && toCanonicalStatus(newStatus) === 'SCHEDULED' && !supportsPublishingQueue(selectedItem)) {
      setActionNotice({
        text: hubText("{0} kann noch nicht automatisch eingeplant werden.", selectedItem.platformLabel),
        type: 'info',
      });
      return;
    }
    if (selectedItem?.platform === 'PINTEREST'
      && ['APPROVED', 'SCHEDULED'].includes(toCanonicalStatus(newStatus))
      && !selectedItem.payloadData?.boardId?.trim()) {
      setActionNotice({ text: hubText("Bitte wähle zuerst eine Ziel-Pinnwand für diesen Pinterest-Pin."), type: 'warning' });
      return;
    }
    const updated = { ...project };
    if (itemId === 'blog_main' && updated.blogArticle) {
      updated.blogArticle.status = newStatus;
    } else if (itemId.startsWith('instagram_')) {
      const existingIndex = updated.calendarItems.findIndex((item) => item.id === itemId);
      if (existingIndex >= 0) {
        updated.calendarItems[existingIndex].status = newStatus;
      } else {
        const selectedItem = items.find((item) => item.id === itemId);
        updated.calendarItems.push({
          id: itemId,
          channel: 'instagram',
          title: selectedItem?.title || 'Instagram-Beitrag',
          scheduledDate: selectedItem?.scheduledDate || formatLocalDateTime(),
          status: newStatus,
        });
      }
    } else if (itemId === 'yt_video_main' && updated.youtubeVideo) {
      updated.youtubeVideo.status = newStatus;
    } else if (itemId.startsWith('pin_') || updated.pinterestPins.some((p) => p.id === itemId)) {
      updated.pinterestPins = updated.pinterestPins.map((p) =>
        p.id === itemId || `pin_${project.pinterestPins.indexOf(p)}` === itemId ? { ...p, status: newStatus } : p
      );
    } else if (itemId.startsWith('short_') || (updated.youtubeShorts && updated.youtubeShorts.some((s) => s.id === itemId))) {
      if (updated.youtubeShorts) {
        updated.youtubeShorts = updated.youtubeShorts.map((s) =>
          s.id === itemId || `short_${project.youtubeShorts?.indexOf(s)}` === itemId ? { ...s, status: newStatus } : s
        );
      }
    }
    onUpdateProject(updated);

    // If approved or scheduled, automatically enqueue if not yet in queue
    if (user?.uid && (newStatus === 'approved' || newStatus === 'scheduled' || newStatus === 'APPROVED' || newStatus === 'SCHEDULED')) {
      const match = items.find((i) => i.id === itemId);
      if (match) {
        await handleEnqueueItem(match);
      }
    }
  };

  // All platform publishing and retry counters are owned by the server worker.
  const handleExecuteJob = async (job: PublishingJob) => {
    if (!user?.uid) return;
    setActiveJobRunningId(job.id);
    setActionNotice(null);
    try {
      await FirestoreContentService.reschedulePublishingJob(user.uid, job.id, new Date().toISOString());
      await loadJobs();
      setActionNotice({ text: hubText("Der Server veröffentlicht den Auftrag im nächsten Durchlauf. Eine laufende Wiederholungssperre bleibt erhalten."), type: 'info' });
    } catch (err) {
      setActionNotice({ text: err instanceof Error ? err.message : hubText("Der Auftrag konnte nicht eingeplant werden."), type: 'warning' });
    } finally {
      setActiveJobRunningId(null);
    }
  };

  const handleRetryJob = async (job: PublishingJob) => {
    if (!user?.uid) return;
    setActiveJobRunningId(job.id);
    setActionNotice(null);
    try {
      const response = await authenticatedFetch(`/api/publishing/jobs/${encodeURIComponent(job.id)}/retry`, { method: 'POST' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || hubText("Der Auftrag konnte nicht erneut eingeplant werden."));
      await loadJobs();
      setActionNotice({ text: hubText("Der Server prüft den Auftrag im nächsten Durchlauf erneut."), type: 'info' });
    } catch (err) {
      setActionNotice({ text: err instanceof Error ? err.message : hubText("Der erneute Versuch konnte nicht eingeplant werden."), type: 'warning' });
    } finally {
      setActiveJobRunningId(null);
    }
  };

  // Delete job from queue
  const handleDeleteJob = async (jobId: string) => {
    if (!user?.uid) return;
    try {
      await FirestoreContentService.deletePublishingJob(user.uid, jobId);
      await loadJobs();
      setActionNotice({
        text: hubText("Auftrag aus der Veröffentlichungswarteschlange entfernt."),
        type: 'info',
      });
    } catch (err) {
      setActionNotice({
        text: err instanceof Error ? err.message : hubText("Der Auftrag konnte nicht gelöscht werden."),
        type: 'warning',
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />{hubText("Content-Planung & Veröffentlichungswarteschlange")}</span>
            <span className="text-xs text-slate-500">{hubText("Gesamtes Set (")}{items.length} Assets)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{hubText("Veröffentlichungsplan: \"")}{project.topic}"</h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleApproveAndEnqueueAll}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{hubText("Alle freigeben & in Warteschlange einreihen")}</span>
          </button>
        </div>
      </div>

      {/* Action Notice Alert */}
      {actionNotice && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${
          actionNotice.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          actionNotice.type === 'info' ? 'bg-blue-50 text-blue-800 border-blue-200' :
          'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{actionNotice.text}</div>
          <button 
            type="button" 
            onClick={() => setActionNotice(null)}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold underline cursor-pointer"
          >{hubText("Schließen")}</button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setPlatformFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            platformFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >{hubText("Alle Assets (")}{items.length})
        </button>
        <button
          type="button"
          onClick={() => setPlatformFilter('blog')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            platformFilter === 'blog' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Blog (1)
        </button>
        <button
          type="button"
          onClick={() => setPlatformFilter('pinterest')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            platformFilter === 'pinterest' ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Pinterest ({project.pinterestPins?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setPlatformFilter('instagram')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            platformFilter === 'instagram' ? 'bg-fuchsia-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Instagram ({project.pinterestPins?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setPlatformFilter('youtube')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            platformFilter === 'youtube' ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          YouTube ({1 + (project.youtubeShorts?.length || 0)})
        </button>
      </div>

      {project.pinterestPins?.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <p className="flex-1 text-sm text-slate-700">{hubText("Wähle bei jedem Pinterest-Pin die Ziel-Pinnwand, bevor du ihn einplanst.")}</p>
          <button type="button" onClick={() => void loadPinterestBoards()} disabled={loadingPinterestBoards || Boolean(savingBoardId)}
            className="rounded-xl border border-rose-300 bg-white px-3 py-2 text-sm font-bold text-rose-700 disabled:opacity-50">
            {loadingPinterestBoards ? hubText("Pinnwände werden geladen …") : hubText("Pinterest-Pinnwände laden")}
          </button>
        </div>
      )}

      {/* Content Assets List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const rawStatus = toCanonicalStatus(item.status);
          const statusConf = STATUS_CONFIG[rawStatus] || STATUS_CONFIG.GENERATING;
          const Icon = item.icon;
          const matchingJob = publishingJobs.find((j) => j.contentId === item.id);
          const queueSupported = supportsPublishingQueue(item);

          return (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-stretch gap-4 transition-all hover:border-slate-300"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {item.platformLabel}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}>
                      {hubText(statusConf.label)}
                    </span>
                    {matchingJob && (
                      <span className="max-w-full text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5 shrink-0" />
                        <span className="min-w-0 break-words">{hubText("Warteschlangenauftrag: #")}{matchingJob.id.slice(-5)} ({hubText(getStatusLabel(matchingJob.status))})</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 break-words mt-0.5">
                    {item.title}
                  </h4>
                  {item.targetUrl && (
                    <p className="text-[11px] text-slate-400 break-all mt-0.5">{hubText("Ziel-URL:")}{' '}{item.targetUrl}
                    </p>
                  )}
                </div>
              </div>

              {item.platform === 'PINTEREST' && (
                <label className="flex flex-col gap-1 text-xs font-semibold text-slate-700">{hubText("Ziel-Pinnwand auf Pinterest")}<select
                    value={item.payloadData.boardId || ''}
                    disabled={loadingPinterestBoards || Boolean(savingBoardId) || Boolean(matchingJob && (matchingJob.status === 'PUBLISHING' || matchingJob.status === 'PUBLISHED' || matchingJob.publicationUncertain))}
                    onChange={event => void handlePinterestBoardChange(item.id, event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
                  >
                    <option value="" disabled>{hubText("Bitte Pinnwände laden und auswählen")}</option>
                    {item.payloadData.boardId && !pinterestBoards.some(board => board.id === item.payloadData.boardId) && (
                      <option value={item.payloadData.boardId}>{item.payloadData.boardName || hubText("Gespeicherte Pinnwand")}</option>
                    )}
                    {pinterestBoards.map(board => <option key={board.id} value={board.id}>{board.name}</option>)}
                  </select>
                  {savingBoardId === item.id && <span role="status">{hubText("Pinnwand wird gespeichert …")}</span>}
                </label>
              )}

              {/* Status & Date Controls */}
              <div className="flex min-w-0 flex-wrap items-center justify-end gap-2.5 border-t border-slate-100 pt-3">
                <div className="flex min-w-0 max-w-full items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="datetime-local"
                    aria-label={hubText("Veröffentlichungstermin: {0}", item.title)}
                    title={hubText("Ändere Datum und Uhrzeit und klicke danach außerhalb des Feldes, um zu speichern.")}
                    step="60"
                    value={dateDrafts[item.id] ?? (matchingJob ? formatLocalDateTime(matchingJob.scheduledAt) : item.scheduledDate)}
                    disabled={Boolean(savingDateId) || Boolean(matchingJob && matchingJob.status !== 'SCHEDULED')}
                    onChange={(e) => setDateDrafts(drafts => ({ ...drafts, [item.id]: e.target.value }))}
                    onBlur={(e) => {
                      if (dateDrafts[item.id] !== undefined) void handleDateChange(item.id, e.target.value);
                    }}
                    className="min-w-0 max-w-full bg-transparent text-xs font-semibold text-slate-700 outline-hidden cursor-pointer"
                  />
                </div>

                <select
                  value={toCanonicalStatus(item.status)}
                  onChange={(e) => handleStatusChange(item.id, e.target.value as ContentStatus)}
                  className="max-w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
                >
                  <option value="DRAFT">{hubText("Entwurf")}</option>
                  <option value="GENERATING">{hubText("KI Generiert")}</option>
                  <option value="NEEDS_REVIEW">{hubText("Prüfung nötig")}</option>
                  <option value="APPROVED">{hubText("Freigegeben ✅")}</option>
                  <option value="SCHEDULED" disabled={!queueSupported}>{hubText("In Warteschlange 📅")}</option>
                  <option value="PUBLISHED">{hubText("Veröffentlicht 🚀")}</option>
                </select>

                {!queueSupported ? (
                  <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-xl border border-slate-200">
                    {item.platform === 'YOUTUBE' ? hubText("Zuerst Video hochladen") : hubText("Automatisierung folgt")}
                  </span>
                ) : !matchingJob ? (
                  <button
                    type="button"
                    onClick={() => handleEnqueueItem(item)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title={hubText("In die Firestore-Veröffentlichungswarteschlange einreihen")}
                  >
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>{hubText("Warteschlange")}</span>
                  </button>
                ) : item.platform === 'YOUTUBE' || item.platform === 'INSTAGRAM' ? (
                  <span className="max-w-full px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-xl border border-purple-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{hubText("Automatische Veröffentlichung geplant")}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={activeJobRunningId === matchingJob.id}
                    onClick={() => handleExecuteJob(matchingJob)}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title={hubText("Jetzt manuell testen / publishen")}
                  >
                    {activeJobRunningId === matchingJob.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                    <span>{hubText("Ausführen")}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 CENTRAL PUBLISHING QUEUE & SCHEDULER MONITOR */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                  <span>{hubText("Firestore-Veröffentlichungswarteschlange und Server-Zeitsteuerung")}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {publishingJobs.length} Jobs
                  </span>
                </h3>
                {schedulerServerStatus?.active ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{hubText("Autopilot aktiv (60s)")}</span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">{hubText("Hintergrund-Worker bereit")}</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">{hubText("Server-seitige Hintergrund-Ausführung ohne geöffneten Browser (Idempotent, Retry mit Backoff, Audit-Logs)")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleTriggerServerSweep}
              disabled={isTriggeringSweep}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-900/30 cursor-pointer disabled:opacity-50"
              title={hubText("Führt sofort eine Prüfung der Server-Zeitsteuerung aus")}
            >
              {isTriggeringSweep ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-amber-300" />}
              <span>{hubText("Scheduler-Durchlauf auslösen")}</span>
            </button>

            <button
              type="button"
              onClick={() => void loadJobs()}
              disabled={isLoadingJobs}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoadingJobs ? 'animate-spin' : ''}`} />
              <span>{hubText("Aktualisieren")}</span>
            </button>
          </div>
        </div>

        {publishingJobs.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <Clock className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="font-semibold text-slate-300">{hubText("Aktuell befinden sich keine Aufträge in der Veröffentlichungswarteschlange.")}</p>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">{hubText("Klicke oben bei einem Inhalt auf")}{' '}<strong>{hubText("„Warteschlange“")}</strong>{' '}{hubText("oder auf")}{' '}<strong>{hubText("„Alle freigeben & in Warteschlange einreihen“")}</strong>{hubText(", um Veröffentlichungs- und Scheduler-Aufträge in Firestore zu erstellen.")}</p>
          </div>
        ) : (
          <div className="space-y-2.5 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                  <th className="pb-2">{hubText("Plattform")}</th>
                  <th className="pb-2">{hubText("Typ & Titel")}</th>
                  <th className="pb-2">{hubText("Geplant für")}</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">{hubText("Versuche")}</th>
                  <th className="pb-2 text-right">{hubText("Aktionen")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {publishingJobs.map((job) => {
                  const statusConf = STATUS_CONFIG[job.status] || STATUS_CONFIG.SCHEDULED;
                  const isRunning = activeJobRunningId === job.id;
                  const hasLogs = job.executionLogs && job.executionLogs.length > 0;

                  return (
                    <tr key={job.id} className="hover:bg-slate-800/30">
                      <td className="py-3 pr-2">
                        <span className="font-bold text-white px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                          {job.platform}
                        </span>
                      </td>
                      <td className="py-3 pr-2 max-w-xs truncate">
                        <div className="text-white font-semibold truncate">{job.payload?.title || job.contentId}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <span>ID: {job.id}</span>
                          {hasLogs && (
                            <button
                              type="button"
                              onClick={() => setSelectedLogJob(job)}
                              className="text-[10px] text-purple-400 hover:text-purple-300 underline cursor-pointer"
                            >
                              ({job.executionLogs?.length}{' '}{hubText("Ausführungsprotokolle)")}</button>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-2 whitespace-nowrap text-slate-300">
                        {new Date(job.scheduledAt).toLocaleDateString(language, {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 pr-2 whitespace-nowrap">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}>
                          {hubText(getStatusLabel(job.status))}
                        </span>
                        {job.lastError && (
                          <div className="text-[10px] text-rose-400 truncate max-w-xs mt-0.5" title={job.lastError}>{hubText("Fehler:")}{' '}{job.lastError}
                          </div>
                        )}
                        {job.publishedUrl && (
                          <div className="mt-0.5">
                            <a
                              href={job.publishedUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-teal-400 hover:text-teal-300 inline-flex items-center gap-0.5 underline"
                            >
                              <span>{hubText("Öffnen")}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="py-3 pr-2 whitespace-nowrap">
                        <span className="text-slate-300 font-bold">
                          {job.attempts} / {job.maxAttempts}
                        </span>
                        {job.nextAttemptAt && job.status !== 'PUBLISHED' && (
                          <div className="text-[9px] text-amber-400">{hubText("Nächster Versuch:")}{' '}{new Date(job.nextAttemptAt).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pl-2 text-right space-x-1.5 whitespace-nowrap">
                        {job.publicationUncertain ? (
                          <span className="text-[10px] font-bold text-amber-300" title={job.lastError}>{hubText("Plattformprofil prüfen")}</span>
                        ) : job.platform === 'INSTAGRAM' && job.status !== 'FAILED' ? (
                          <span className="text-[10px] font-bold text-fuchsia-300">{hubText("Automatisch geplant")}</span>
                        ) : job.platform === 'YOUTUBE' && job.status !== 'FAILED' && (job.contentType === 'VIDEO' || job.contentType === 'SHORT') ? (
                          <span className="text-[10px] font-bold text-red-300">{hubText("Automatisch geplant")}</span>
                        ) : !(
                          (job.platform === 'PINTEREST' && job.contentType === 'PIN')
                          || (job.platform === 'INSTAGRAM' && job.contentType === 'INSTAGRAM_POST')
                          || (job.platform === 'YOUTUBE' && (job.contentType === 'VIDEO' || job.contentType === 'SHORT'))
                        ) ? (
                          <span className="text-[10px] font-bold text-slate-400">{hubText("Nicht unterstützt")}</span>
                        ) : job.status === 'FAILED' ? (
                          <button
                            type="button"
                            disabled={isRunning}
                            onClick={() => handleRetryJob(job)}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                            title={hubText("Erneut versuchen und Zähler zurücksetzen")}
                          >
                            {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                            <span>{hubText("Erneut versuchen")}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isRunning || job.status !== 'SCHEDULED'}
                            onClick={() => handleExecuteJob(job)}
                            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                            title={hubText("Jetzt ausführen")}
                          >
                            {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                            <span>{hubText("Ausführen")}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={job.status === 'PUBLISHING' || job.publicationUncertain === true}
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors inline-flex cursor-pointer"
                          title={hubText("Löschen")}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Informative note regarding Cloud background automation */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 flex items-start gap-2.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200">{hubText("Server-Autopilot aktiv:")}</strong>{' '}{hubText("Die serverseitige Zeitsteuerung prüft minütlich alle fälligen Firestore-Aufträge mit dem Status „In Warteschlange“. Er läuft unabhängig vom Browser, verhindert Doppelverarbeitung und verlängert die Wartezeit nach Fehlern schrittweise.")}</div>
        </div>
      </div>

      {/* 📜 AUDIT LOG MODAL / DRAWER */}
      {selectedLogJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{hubText("Ausführungs-Protokoll")}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {selectedLogJob.platform}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">{hubText("Auftrag:")}{' '}{selectedLogJob.payload?.title || selectedLogJob.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLogJob(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >{hubText("Schließen")}</button>
            </div>

            <div className="space-y-2.5">
              {(!selectedLogJob.executionLogs || selectedLogJob.executionLogs.length === 0) ? (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-950 rounded-xl">{hubText("Noch keine Ausführungsprotokolle für diesen Job vorhanden.")}</div>
              ) : (
                selectedLogJob.executionLogs.map((log, idx) => (
                  <div key={log.id || idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        log.status === 'PUBLISHED' ? 'bg-teal-500/20 text-teal-300' :
                        log.status === 'FAILED' ? 'bg-rose-500/20 text-rose-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {hubText(getStatusLabel(log.status))}{' '}{hubText("(Versuch")}{' '}{log.attempts}/{log.maxAttempts})
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{hubText("Ausgelöst durch:")}{' '}{hubText(getTriggerLabel(log.triggeredBy))} • {new Date(log.completedAt).toLocaleString(language)}
                      </span>
                    </div>

                    {log.externalId && (
                      <div className="text-[11px] text-teal-400">{hubText("Externe ID:")}{' '}<span className="font-mono">{log.externalId}</span>
                      </div>
                    )}

                    {log.publishedUrl && (
                      <div className="text-[11px] text-teal-400 truncate">
                        URL: <a href={log.publishedUrl} target="_blank" rel="noreferrer" className="underline">{log.publishedUrl}</a>
                      </div>
                    )}

                    {log.lastError && (
                      <div className="text-[11px] text-rose-400 bg-rose-950/40 p-2 rounded-xl border border-rose-900/50">
                        {log.lastError}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
