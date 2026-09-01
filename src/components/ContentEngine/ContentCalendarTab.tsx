import React, { useState, useEffect } from 'react';
import { authenticatedFetch } from '../../services/authenticatedFetch';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Pin, 
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
  SchedulerJob, 
  toCanonicalStatus 
} from '../../types/contentEngine';
import { FirestoreContentService } from '../../services/firestoreContentService';
import { PublishingService } from '../../services/publishingService';
import { useAuth } from '../../context/AuthContext';
import { pinterestService } from '../../services/pinterestService';

interface ContentCalendarTabProps {
  project: CentralContentProject;
  onUpdateProject: (updated: CentralContentProject) => void;
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
  SCHEDULED: { label: 'In Queue 📅', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  scheduled: { label: 'In Queue 📅', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  PUBLISHING: { label: 'Wird veröffentlicht...', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  publishing: { label: 'Wird veröffentlicht...', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  PUBLISHED: { label: 'Veröffentlicht 🚀', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  published: { label: 'Veröffentlicht 🚀', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  FAILED: { label: 'Fehlgeschlagen ⚠️', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  failed: { label: 'Fehlgeschlagen ⚠️', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  CANCELLED: { label: 'Abgebrochen', bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-300' },
};

export const ContentCalendarTab: React.FC<ContentCalendarTabProps> = ({
  project,
  onUpdateProject,
}) => {
  const { user } = useAuth();
  const userId = user?.uid || 'local_user';

  const [platformFilter, setPlatformFilter] = useState<'all' | 'blog' | 'pinterest' | 'youtube'>('all');
  const [publishingJobs, setPublishingJobs] = useState<PublishingJob[]>([]);
  const [schedulerJobs, setSchedulerJobs] = useState<SchedulerJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(false);
  const [activeJobRunningId, setActiveJobRunningId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ text: string; type: 'info' | 'success' | 'warning' } | null>(null);
  const [schedulerServerStatus, setSchedulerServerStatus] = useState<{ active?: boolean; systemTime?: string; lastExecution?: any } | null>(null);
  const [isTriggeringSweep, setIsTriggeringSweep] = useState<boolean>(false);
  const [selectedLogJob, setSelectedLogJob] = useState<PublishingJob | null>(null);

  // Load Publishing & Scheduler jobs from Firestore and fetch backend scheduler status
  const loadJobs = async () => {
    if (!user?.uid) return;
    setIsLoadingJobs(true);
    try {
      const [pJobs, sJobs] = await Promise.all([
        FirestoreContentService.getPublishingJobs(user.uid, project.id),
        FirestoreContentService.getSchedulerJobs(user.uid),
      ]);
      setPublishingJobs(pJobs);
      setSchedulerJobs(sJobs);

      // Fetch server background scheduler status
      authenticatedFetch('/api/scheduler/status')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSchedulerServerStatus(data);
          }
        })
        .catch(() => {});
    } catch (err) {
      console.warn('Error loading publishing jobs:', err);
    } finally {
      setIsLoadingJobs(false);
    }
  };

  // Trigger server background sweep manually
  const handleTriggerServerSweep = async () => {
    setIsTriggeringSweep(true);
    setActionNotice(null);
    try {
      const res = await fetch('/api/scheduler/run-tick', { method: 'POST' });
      const data = await res.json();
      await loadJobs();
      if (data.success && data.outcome) {
        const out = data.outcome;
        setActionNotice({
          text: `Server-Scheduler Durchlauf abgeschlossen: ${out.jobsChecked} geprüft, ${out.jobsProcessed} verarbeitet, ${out.publishedCount} erfolgreich, ${out.failedCount} fehlgeschlagen, ${out.skippedCount} übersprungen/wartend.`,
          type: 'success',
        });
      } else {
        setActionNotice({
          text: 'Server-Scheduler Sweep wurde ausgeführt.',
          type: 'info',
        });
      }
    } catch (err: any) {
      setActionNotice({
        text: `Fehler beim Auslösen des Server-Scheduler Sweeps: ${err.message}`,
        type: 'warning',
      });
    } finally {
      setIsTriggeringSweep(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [project.id, user?.uid]);

  // Unified items list
  const items: Array<{
    id: string;
    type: 'blog' | 'pinterest' | 'youtube_video' | 'youtube_short';
    platform: 'BLOG' | 'PINTEREST' | 'YOUTUBE';
    contentType: 'ARTICLE' | 'PIN' | 'VIDEO' | 'SHORT';
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
      scheduledDate: project.calendarItems.find((c) => c.channel === 'blog')?.scheduledDate || new Date().toISOString().split('T')[0],
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
      scheduledDate: pin.scheduledDate || new Date(Date.now() + (idx + 1) * 86400000).toISOString().split('T')[0],
      platformLabel: `Pinterest (${pin.board || 'Default'})`,
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

  if (project.youtubeVideo) {
    items.push({
      id: 'yt_video_main',
      type: 'youtube_video',
      platform: 'YOUTUBE',
      contentType: 'VIDEO',
      title: `YouTube Video: ${project.youtubeVideo.title}`,
      targetUrl: project.projectSettings.websiteUrl,
      status: project.youtubeVideo.status || 'ai_generated',
      scheduledDate: project.youtubeVideo.scheduledDate || new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      platformLabel: 'YouTube Longform',
      icon: Youtube,
      color: 'text-red-600 bg-red-50 border-red-200',
      payloadData: {
        title: project.youtubeVideo.title,
        description: project.youtubeVideo.description,
        tags: project.youtubeVideo.keywords,
      },
    });
  }

  (project.youtubeShorts || []).forEach((short, idx) => {
    items.push({
      id: short.id || `short_${idx}`,
      type: 'youtube_short',
      platform: 'YOUTUBE',
      contentType: 'SHORT',
      title: `Short #${short.shortNumber || idx + 1}: ${short.title}`,
      targetUrl: project.projectSettings.websiteUrl,
      status: short.status || 'ai_generated',
      scheduledDate: short.scheduledDate || new Date(Date.now() + (idx + 3) * 86400000).toISOString().split('T')[0],
      platformLabel: 'YouTube Shorts (9:16)',
      icon: Smartphone,
      color: 'text-red-500 bg-red-50 border-red-200',
      payloadData: {
        title: short.title,
        description: short.description,
      },
    });
  });

  const filteredItems = items.filter((item) => {
    if (platformFilter === 'blog') return item.type === 'blog';
    if (platformFilter === 'pinterest') return item.type === 'pinterest';
    if (platformFilter === 'youtube') return item.type.startsWith('youtube');
    return true;
  });

  // Enqueue a specific item into the Firestore publishing queue
  const handleEnqueueItem = async (item: typeof items[0]) => {
    if (!user?.uid) {
      setActionNotice({
        text: 'Bitte melde dich an, um Inhalte in der Firestore Publishing Queue zu planen.',
        type: 'warning',
      });
      return;
    }

    try {
      const { publishingJob } = await PublishingService.enqueueJob(user.uid, {
        projectId: project.projectSettings.id,
        contentProjectId: project.id,
        contentId: item.id,
        platform: item.platform,
        contentType: item.contentType,
        scheduledAt: item.scheduledDate ? `${item.scheduledDate}T09:00:00.000Z` : new Date().toISOString(),
        payload: item.payloadData,
      });

      handleStatusChange(item.id, 'scheduled');
      await loadJobs();

      setActionNotice({
        text: `Job für "${item.title}" erfolgreich in Firestore Publishing Queue eingereiht (Job ID: ${publishingJob.id.slice(-6)}).`,
        type: 'success',
      });
    } catch (err: any) {
      setActionNotice({
        text: `Fehler beim Einreihen in die Queue: ${err.message}`,
        type: 'warning',
      });
    }
  };

  // Approve all & enqueue all
  const handleApproveAndEnqueueAll = async () => {
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
      for (const item of items) {
        try {
          await PublishingService.enqueueJob(user.uid, {
            projectId: project.projectSettings.id,
            contentProjectId: project.id,
            contentId: item.id,
            platform: item.platform,
            contentType: item.contentType,
            scheduledAt: item.scheduledDate ? `${item.scheduledDate}T09:00:00.000Z` : new Date().toISOString(),
            payload: item.payloadData,
          });
        } catch (e) {
          console.warn('Batch enqueue item error:', e);
        }
      }
      await loadJobs();
      setActionNotice({
        text: `Alle ${items.length} Inhalte freigegeben und in die Firestore Publishing Queue eingereiht!`,
        type: 'success',
      });
    }
  };

  const handleDateChange = (itemId: string, newDate: string) => {
    const updated = { ...project };
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
    onUpdateProject(updated);
  };

  const handleStatusChange = async (itemId: string, newStatus: ContentStatus) => {
    const updated = { ...project };
    if (itemId === 'blog_main' && updated.blogArticle) {
      updated.blogArticle.status = newStatus;
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

  // Trigger manual publish execution for a job
  const handleExecuteJob = async (job: PublishingJob) => {
    if (!user?.uid) return;
    setActiveJobRunningId(job.id);
    setActionNotice(null);

    try {
      const { job: updatedJob, result } = await PublishingService.processJob(user.uid, job);
      await loadJobs();

      if (result.success) {
        setActionNotice({
          text: `Erfolgreich veröffentlicht auf ${job.platform}! (ID: ${result.externalId || 'OK'})`,
          type: 'success',
        });
      } else {
        setActionNotice({
          text: `Ergebnis: ${result.status} – ${result.error || 'Nicht erfolgreich'}`,
          type: result.status === 'NOT_IMPLEMENTED' ? 'info' : 'warning',
        });
      }
    } catch (err: any) {
      setActionNotice({
        text: `Fehler bei der Job-Ausführung: ${err.message}`,
        type: 'warning',
      });
    } finally {
      setActiveJobRunningId(null);
    }
  };

  // Retry job
  const handleRetryJob = async (job: PublishingJob) => {
    if (!user?.uid) return;
    setActiveJobRunningId(job.id);
    setActionNotice(null);

    try {
      const { result } = await PublishingService.retryJob(user.uid, job);
      await loadJobs();
      setActionNotice({
        text: `Retry ausgeführt: ${result.status} – ${result.error || 'Erfolgreich'}`,
        type: result.success ? 'success' : 'info',
      });
    } catch (err: any) {
      setActionNotice({
        text: `Fehler beim Retry: ${err.message}`,
        type: 'warning',
      });
    } finally {
      setActiveJobRunningId(null);
    }
  };

  // Delete job from queue
  const handleDeleteJob = async (jobId: string) => {
    if (!user?.uid) return;
    await FirestoreContentService.deletePublishingJob(user.uid, jobId);
    await loadJobs();
    setActionNotice({
      text: 'Job aus der Publishing Queue entfernt.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              Content-Planung & Publishing Queue
            </span>
            <span className="text-xs text-slate-500">Gesamtes Set ({items.length} Assets)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Veröffentlichungsplan: "{project.topic}"</h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleApproveAndEnqueueAll}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Alle freigeben & in Queue einreihen</span>
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
          >
            Schließen
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPlatformFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            platformFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Alle Assets ({items.length})
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
          onClick={() => setPlatformFilter('youtube')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            platformFilter === 'youtube' ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          YouTube ({1 + (project.youtubeShorts?.length || 0)})
        </button>
      </div>

      {/* Content Assets List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const rawStatus = toCanonicalStatus(item.status);
          const statusConf = STATUS_CONFIG[rawStatus] || STATUS_CONFIG.GENERATING;
          const Icon = item.icon;
          const matchingJob = publishingJobs.find((j) => j.contentId === item.id);

          return (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all hover:border-slate-300"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {item.platformLabel}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}>
                      {statusConf.label}
                    </span>
                    {matchingJob && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" />
                        Queue Job: #{matchingJob.id.slice(-5)} ({matchingJob.status})
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5 max-w-xl">
                    {item.title}
                  </h4>
                  {item.targetUrl && (
                    <p className="text-[11px] text-slate-400 truncate max-w-md mt-0.5">
                      Ziel-URL: {item.targetUrl}
                    </p>
                  )}
                </div>
              </div>

              {/* Status & Date Controls */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end lg:self-center">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="date"
                    value={item.scheduledDate}
                    onChange={(e) => handleDateChange(item.id, e.target.value)}
                    className="bg-transparent text-xs font-semibold text-slate-700 outline-hidden cursor-pointer"
                  />
                </div>

                <select
                  value={toCanonicalStatus(item.status)}
                  onChange={(e) => handleStatusChange(item.id, e.target.value as ContentStatus)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
                >
                  <option value="DRAFT">Entwurf</option>
                  <option value="GENERATING">KI Generiert</option>
                  <option value="NEEDS_REVIEW">Prüfung nötig</option>
                  <option value="APPROVED">Freigegeben ✅</option>
                  <option value="SCHEDULED">In Queue 📅</option>
                  <option value="PUBLISHED">Veröffentlicht 🚀</option>
                </select>

                {!matchingJob ? (
                  <button
                    type="button"
                    onClick={() => handleEnqueueItem(item)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="In Firestore Publishing Queue einreihen"
                  >
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Queue</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={activeJobRunningId === matchingJob.id}
                    onClick={() => handleExecuteJob(matchingJob)}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Jetzt manuell testen / publishen"
                  >
                    {activeJobRunningId === matchingJob.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                    <span>Ausführen</span>
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
                  <span>Firestore Publishing Queue & Server Scheduler</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {publishingJobs.length} Jobs
                  </span>
                </h3>
                {schedulerServerStatus?.active ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Autopilot aktiv (60s)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Hintergrund-Worker bereit
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Server-seitige Hintergrund-Ausführung ohne geöffneten Browser (Idempotent, Retry mit Backoff, Audit-Logs)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleTriggerServerSweep}
              disabled={isTriggeringSweep}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-900/30 cursor-pointer disabled:opacity-50"
              title="Führt sofort einen Server-Scheduler Check aus"
            >
              {isTriggeringSweep ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-amber-300" />}
              <span>Scheduler Sweep auslösen</span>
            </button>

            <button
              type="button"
              onClick={loadJobs}
              disabled={isLoadingJobs}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoadingJobs ? 'animate-spin' : ''}`} />
              <span>Aktualisieren</span>
            </button>
          </div>
        </div>

        {publishingJobs.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <Clock className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="font-semibold text-slate-300">Aktuell befinden sich keine Jobs in der Publishing Queue.</p>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              Klicke oben bei einem Asset auf <strong>„Queue“</strong> oder auf <strong>„Alle freigeben & in Queue einreihen“</strong>, um Veröffentlichungs- und Scheduler-Jobs in Firestore zu erstellen.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                  <th className="pb-2">Plattform</th>
                  <th className="pb-2">Typ & Titel</th>
                  <th className="pb-2">Geplant für</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Versuche</th>
                  <th className="pb-2 text-right">Aktionen</th>
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
                              ({job.executionLogs?.length} Audit-Logs)
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-2 whitespace-nowrap text-slate-300">
                        {new Date(job.scheduledAt).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 pr-2 whitespace-nowrap">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}>
                          {job.status}
                        </span>
                        {job.lastError && (
                          <div className="text-[10px] text-rose-400 truncate max-w-xs mt-0.5" title={job.lastError}>
                            Fehler: {job.lastError}
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
                              <span>Öffnen</span>
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
                          <div className="text-[9px] text-amber-400">
                            Retry: {new Date(job.nextAttemptAt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pl-2 text-right space-x-1.5 whitespace-nowrap">
                        {job.status === 'FAILED' ? (
                          <button
                            type="button"
                            disabled={isRunning}
                            onClick={() => handleRetryJob(job)}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                            title="Retry mit Zurücksetzen der Zähler"
                          >
                            {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                            <span>Retry</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isRunning || job.status === 'PUBLISHED'}
                            onClick={() => handleExecuteJob(job)}
                            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                            title="Jetzt ausführen"
                          >
                            {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                            <span>Ausführen</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors inline-flex cursor-pointer"
                          title="Löschen"
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
            <strong className="text-slate-200">Server-Autopilot aktiv:</strong> Der Backend-Scheduler prüft minütlich alle fälligen Firestore-Jobs (<code className="text-purple-300">status == 'SCHEDULED' && scheduledAt &lt;= now()</code>). Er läuft unabhängig vom Browser und beachtet Idempotency &amp; exponentielles Backoff.
          </div>
        </div>
      </div>

      {/* 📜 AUDIT LOG MODAL / DRAWER */}
      {selectedLogJob && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Ausführungs-Protokoll</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {selectedLogJob.platform}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Job: {selectedLogJob.payload?.title || selectedLogJob.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLogJob(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Schließen
              </button>
            </div>

            <div className="space-y-2.5">
              {(!selectedLogJob.executionLogs || selectedLogJob.executionLogs.length === 0) ? (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-950 rounded-xl">
                  Noch keine Ausführungsprotokolle für diesen Job vorhanden.
                </div>
              ) : (
                selectedLogJob.executionLogs.map((log, idx) => (
                  <div key={log.id || idx} className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                        log.status === 'PUBLISHED' ? 'bg-teal-500/20 text-teal-300' :
                        log.status === 'FAILED' ? 'bg-rose-500/20 text-rose-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {log.status} (Versuch {log.attempts}/{log.maxAttempts})
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Trigger: {log.triggeredBy} • {new Date(log.completedAt).toLocaleString('de-DE')}
                      </span>
                    </div>

                    {log.externalId && (
                      <div className="text-[11px] text-teal-400">
                        External ID: <span className="font-mono">{log.externalId}</span>
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
