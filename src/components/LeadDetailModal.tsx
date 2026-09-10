import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Edit3,
  MapPin,
  Send,
  PhoneCall,
  FileText,
  Plus,
  X,
  History,
  Filter,
  Calendar,
  Globe,
  Inbox,
  CheckCheck,
  ChevronDown,
  Sparkles,
  Flame,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  ArrowUpRight,
  ArrowUp,
  MousePointer,
  Clock,
  Check,
  Play,
  Share2,
  Layers,
  Trash2
} from 'lucide-react';

export interface TimelineItem {
  id: string;
  type: 'webinar' | 'pageview' | 'email' | 'note';
  title: string;
  timestamp: string;
  description?: string;
  emailDetails?: {
    subject: string;
    snippet: string;
    opens: number;
  };
  noteDetails?: {
    author: string;
    text: string;
  };
}

export interface MaraInsightsData {
  leadIdNumber: string;
  conversionProbability: number;
  probabilityDescription: string;
  nextRecommendedAction: {
    type: string;
    draftText: string;
    subject?: string;
  };
  behaviorAnalysis: {
    emailsOpened: string;
    websiteVisits: string;
    bestContactTime: string;
  };
  followUpSchedule: {
    time: string;
    title: string;
    active?: boolean;
  }[];
}

export interface LeadContact {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  badge: string;
  badgeType: 'hot' | 'active' | 'new' | 'cold';
  score: number;
  scoreDescription: string;
  tags: string[];
  lastInteraction: string;
  timeline: TimelineItem[];
  leadIdNumber?: string;
  maraInsights?: MaraInsightsData;
}

interface LeadDetailModalProps {
  lead: LeadContact;
  onClose: () => void;
  onSendEmail: (lead: LeadContact, subject: string, body: string) => Promise<void>;
  onUpdateLead: (lead: LeadContact) => Promise<void>;
  onDeleteLead: (lead: LeadContact) => Promise<void>;
  onAddNote?: (leadId: string, noteText: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onSendEmail,
  onUpdateLead,
  onDeleteLead,
  onAddNote
}) => {
  const [activeTab, setActiveTab] = useState<'maraInsights' | 'details' | 'writeEmail' | 'addNote'>(
    lead.maraInsights ? 'maraInsights' : 'details'
  );
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [newNoteText, setNewNoteText] = useState('');
  const [tags, setTags] = useState<string[]>(lead.tags);
  const [timeline, setTimeline] = useState<TimelineItem[]>(lead.timeline);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [isDeletingLead, setIsDeletingLead] = useState(false);
  const [campaignStarted, setCampaignStarted] = useState(false);
  const [leadDeclined, setLeadDeclined] = useState(false);

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagText.trim() && !tags.includes(newTagText.trim())) {
      setTags([...tags, newTagText.trim()]);
      setNewTagText('');
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSaveNote = async () => {
    if (!newNoteText.trim()) return;
    const newEntry: TimelineItem = {
      id: `note_${Date.now()}`,
      type: 'note',
      title: 'Notiz hinzugefügt von Max Mustermann',
      timestamp: 'Gerade eben',
      noteDetails: {
        author: 'Max Mustermann',
        text: newNoteText.trim()
      }
    };
    const nextTimeline = [newEntry, ...timeline];
    setActionErrorMessage(null);
    setIsSavingLead(true);
    try {
      await onUpdateLead({ ...lead, timeline: nextTimeline, lastInteraction: 'Gerade eben' });
      setTimeline(nextTimeline);
      if (onAddNote) onAddNote(lead.id, newNoteText.trim());
      setNewNoteText('');
      setActiveTab(lead.maraInsights ? 'maraInsights' : 'details');
      setActionSuccessMessage('✅ Notiz erfolgreich im Interaktionsverlauf gespeichert!');
      setTimeout(() => setActionSuccessMessage(null), 4000);
    } catch (error: unknown) {
      setActionErrorMessage(error instanceof Error ? error.message : 'Die CRM-Notiz konnte nicht gespeichert werden.');
    } finally {
      setIsSavingLead(false);
    }
  };

  const deliverEmail = async (subject: string, body: string, title: string, successMessage: string) => {
    const wasConfirmed = window.confirm(`E-Mail mit dem Betreff „${subject}“ jetzt an ${lead.email} senden?`);
    if (!wasConfirmed) return false;
    setActionErrorMessage(null);
    setActionSuccessMessage(null);
    setIsSendingEmail(true);
    try {
      await onSendEmail(lead, subject, body);
      const newEntry: TimelineItem = {
        id: `email_${Date.now()}`,
        type: 'email',
        title,
        timestamp: 'Gerade eben',
        emailDetails: {
          subject,
          snippet: `${body.substring(0, 80)}${body.length > 80 ? '...' : ''}`,
          opens: 0
        }
      };
      const nextTimeline = [newEntry, ...timeline];
      setTimeline(nextTimeline);
      try {
        await onUpdateLead({ ...lead, timeline: nextTimeline, lastInteraction: 'Gerade eben' });
      } catch {
        setActionErrorMessage('Die E-Mail wurde versendet, aber der CRM-Verlauf konnte nicht gespeichert werden.');
      }
      setActionSuccessMessage(successMessage);
      setTimeout(() => setActionSuccessMessage(null), 4000);
      return true;
    } catch (error: unknown) {
      setActionErrorMessage(error instanceof Error ? error.message : 'Die E-Mail konnte nicht versendet werden.');
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSendEmailSubmit = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) return;
    const subject = emailSubject.trim();
    const body = emailBody.trim();
    const wasSent = await deliverEmail(
      subject,
      body,
      'E-Mail gesendet (Manuell)',
      `📨 E-Mail erfolgreich an ${lead.email} versendet!`,
    );
    if (!wasSent) return;
    setEmailSubject('');
    setEmailBody('');
    setActiveTab(lead.maraInsights ? 'maraInsights' : 'details');
  };

  const handleUseDraftDirectly = async () => {
    if (!lead.maraInsights) return;
    const draft = lead.maraInsights.nextRecommendedAction;
    const subject = draft.subject || `Austausch zu Wachstumsstrategien & Skalierung – ${lead.company}`;
    const body = draft.draftText;
    
    await deliverEmail(
      subject,
      body,
      'KI-Empfohlene E-Mail gesendet',
      `🚀 Personalisierter Mara KI-Entwurf erfolgreich an ${lead.email} versendet!`,
    );
  };

  const handleEditDraft = () => {
    if (!lead.maraInsights) return;
    const draft = lead.maraInsights.nextRecommendedAction;
    setEmailSubject(draft.subject || `Austausch zu Skalierungsstrategien – ${lead.company}`);
    setEmailBody(draft.draftText);
    setActiveTab('writeEmail');
  };

  const handleStartCampaign = () => {
    setCampaignStarted(true);
    setActionSuccessMessage(`🎯 Kampagne für ${lead.name} gestartet! Automatische Follow-up Sequenz aktiv.`);
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  const handleDeclineLead = () => {
    setLeadDeclined(true);
    setActionSuccessMessage(`Lead ${lead.name} als nicht qualifiziert archiviert.`);
    setTimeout(() => {
      setActionSuccessMessage(null);
      onClose();
    }, 2000);
  };

  const handleDeleteLead = async () => {
    const wasConfirmed = window.confirm(
      `Kontakt „${lead.name}“ (${lead.email}) wirklich dauerhaft löschen? Der gesamte CRM-Verlauf wird entfernt.`,
    );
    if (!wasConfirmed) return;
    setActionErrorMessage(null);
    setIsDeletingLead(true);
    try {
      await onDeleteLead(lead);
      onClose();
    } catch (error: unknown) {
      setActionErrorMessage(error instanceof Error ? error.message : 'Der CRM-Kontakt konnte nicht gelöscht werden.');
      setIsDeletingLead(false);
    }
  };

  return (
    <div
      id="modal-lead-details"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl text-slate-100 flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  MARA INSIGHTS
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  • Lead ID: {lead.leadIdNumber || `#${lead.id.replace('lead_', '')}`}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                {lead.name} <span className="text-slate-400 font-normal text-xs sm:text-sm">• {lead.role} @ {lead.company}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {lead.maraInsights && (
              <div className="hidden sm:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setActiveTab('maraInsights')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'maraInsights'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mara KI Insights
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'details'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CRM Kontaktprofil
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              id="btn-close-lead-modal"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Success Toast */}
        {actionSuccessMessage && (
          <div className="m-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {actionErrorMessage && (
          <div className="m-4 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn" role="alert">
            <span>{actionErrorMessage}</span>
          </div>
        )}

        {/* MARA INSIGHTS DEDICATED VIEW */}
        {activeTab === 'maraInsights' && lead.maraInsights && (
          <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
            {/* Header Action Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500/40 shrink-0">
                  <img src={lead.avatarUrl} alt={lead.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{lead.name}</h3>
                  <p className="text-xs text-slate-400">{lead.role} @ {lead.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDeclineLead}
                  disabled={leadDeclined}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  {leadDeclined ? 'Abgelehnt' : 'Ablehnen'}
                </button>
                <button
                  onClick={handleStartCampaign}
                  disabled={campaignStarted}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{campaignStarted ? 'Kampagne Aktiv' : 'Kampagne Starten'}</span>
                </button>
              </div>
            </div>

            {/* Bento Grid 2x2 Layout matching prompt exact specs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Confidence Score (Span 1) */}
              <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    ABSCHLUSS-WAHRSCHEINLICHKEIT
                  </h4>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {lead.maraInsights.conversionProbability}%
                    </span>
                    <ArrowUp className="w-6 h-6 text-emerald-400 mb-1.5 stroke-[3]" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-700"
                      style={{ width: `${lead.maraInsights.conversionProbability}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lead.maraInsights.probabilityDescription}
                  </p>
                </div>
              </div>

              {/* Card 2: Next Recommended Action (Span 2) */}
              <div className="bg-slate-950/70 rounded-2xl p-6 border-l-4 border-blue-500 border-y border-r border-slate-800 md:col-span-2 shadow-lg flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>Nächste Empfohlene Aktion</span>
                  </h4>
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 relative group hover:border-indigo-500/50 transition-colors">
                  <p className="text-[11px] font-black uppercase tracking-wider text-indigo-400">
                    {lead.maraInsights.nextRecommendedAction.type}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "{lead.maraInsights.nextRecommendedAction.draftText}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleUseDraftDirectly}
                    disabled={isSendingEmail}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSendingEmail ? 'Wird gesendet…' : 'Entwurf jetzt senden'}</span>
                  </button>
                  <button
                    onClick={handleEditDraft}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-slate-400" />
                    <span>Anpassen</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Behavior Analysis (Span 2) */}
              <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 md:col-span-2 shadow-lg space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Verhaltensanalyse</span>
                </h4>

                <div className="space-y-3 divide-y divide-slate-800/80 text-xs sm:text-sm">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Inbox className="w-4 h-4 text-slate-400" />
                      <span>E-Mails Geöffnet</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                      {lead.maraInsights.behaviorAnalysis.emailsOpened}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <MousePointer className="w-4 h-4 text-slate-400" />
                      <span>Webseiten Besuche</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                      {lead.maraInsights.behaviorAnalysis.websiteVisits}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Beste Kontaktzeit (Mara KI)</span>
                    </div>
                    <span className="font-bold text-white bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                      {lead.maraInsights.behaviorAnalysis.bestContactTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 4: Follow-up Schedule (Span 1) */}
              <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 shadow-lg flex flex-col">
                <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-4">
                  AUTOMATISCHER FOLLOW-UP
                </h4>

                <div className="relative pl-5 space-y-6 flex-1 text-xs">
                  {/* Timeline Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-800" />

                  {lead.maraInsights.followUpSchedule.map((item, idx) => (
                    <div key={idx} className="relative z-10 flex items-start gap-3">
                      <div
                        className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${
                          item.active || idx === 0
                            ? 'bg-indigo-500 ring-4 ring-slate-950'
                            : 'bg-slate-700 ring-4 ring-slate-950'
                        }`}
                      />
                      <div>
                        <p className={`font-bold ${idx === 0 ? 'text-white' : 'text-slate-400'}`}>
                          {item.time}
                        </p>
                        <p className="text-slate-400">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Main Content: CRM Details */}
        {(activeTab !== 'maraInsights' || !lead.maraInsights) && (
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
            {/* Left Column: Profile & Quick Actions */}
            <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 flex flex-col gap-5">
              {/* Profile Card */}
              <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 flex flex-col items-center text-center shadow-lg">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-800 shadow-md">
                  <img
                    src={lead.avatarUrl}
                    alt={lead.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-extrabold text-white mb-0.5">{lead.name}</h3>
                <p className="text-xs text-slate-400 mb-3">{lead.role} bei {lead.company}</p>

                <div className="flex items-center gap-2 mb-5">
                  <span className="px-3 py-1 bg-indigo-500/15 text-indigo-300 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-indigo-500/30">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    {lead.badge}
                  </span>
                </div>

                <div className="w-full flex flex-col gap-2.5 text-left border-t border-slate-800 pt-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`mailto:${lead.email}`} className="text-indigo-400 hover:underline truncate">
                      {lead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <a href={`tel:${lead.phone}`} className="hover:text-white transition-colors">
                      {lead.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{lead.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-slate-950/70 rounded-2xl p-5 border border-slate-800 space-y-3 shadow-lg">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Schnellaktionen
                </h4>
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setActiveTab(activeTab === 'writeEmail' ? 'details' : 'writeEmail')}
                    id="btn-quick-email"
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'writeEmail'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>E-Mail schreiben</span>
                  </button>

                  <a
                    href={`tel:${lead.phone}`}
                    className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>Anruf starten</span>
                  </a>

                  <button
                    onClick={() => setActiveTab(activeTab === 'addNote' ? 'details' : 'addNote')}
                    id="btn-quick-note"
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      activeTab === 'addNote'
                        ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Notiz hinzufügen</span>
                  </button>

                  <button
                    onClick={handleDeleteLead}
                    disabled={isDeletingLead}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 disabled:cursor-not-allowed disabled:opacity-60 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{isDeletingLead ? 'Wird gelöscht…' : 'Kontakt dauerhaft löschen'}</span>
                  </button>
                </div>
              </div>

              {/* Tags / Segmente */}
              <div className="bg-slate-950/70 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Tags / Segmente
                  </h4>
                  <button
                    onClick={() => setShowTagInput(!showTagInput)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {showTagInput && (
                  <form onSubmit={handleAddTag} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Neuer Tag (z.B. VIP)..."
                      value={newTagText}
                      onChange={(e) => setNewTagText(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg font-bold"
                    >
                      +
                    </button>
                  </form>
                )}

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 group"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-500 hover:text-red-400 opacity-60 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Form (Email/Note) or Lead Score & Timeline */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Inline Action View: Write Email */}
              {activeTab === 'writeEmail' && (
                <div className="bg-slate-950/80 border border-indigo-500/50 rounded-2xl p-6 shadow-xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Send className="w-4 h-4 text-indigo-400" />
                      E-Mail verfassen an {lead.name} ({lead.email})
                    </h4>
                    <button
                      onClick={() => setActiveTab(lead.maraInsights ? 'maraInsights' : 'details')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Abbrechen
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Betreff:</label>
                      <input
                        type="text"
                        placeholder="z.B. Einladung zu deiner persönlichen Strategie-Session"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nachrichtentext:</label>
                      <textarea
                        rows={6}
                        placeholder={`Hallo ${lead.name.split(' ')[0]},\n\nich habe gesehen, dass du dich für unser Webinar angemeldet hast. Lass uns gerne kurz sprechen...`}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        className="w-full p-4 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setActiveTab(lead.maraInsights ? 'maraInsights' : 'details')}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                      >
                        Abbrechen
                      </button>
                      <button
                        onClick={handleSendEmailSubmit}
                        disabled={isSendingEmail || !emailSubject.trim() || !emailBody.trim()}
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSendingEmail ? 'Wird gesendet…' : 'E-Mail jetzt senden'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Inline Action View: Add Note */}
              {activeTab === 'addNote' && (
                <div className="bg-slate-950/80 border border-amber-500/50 rounded-2xl p-6 shadow-xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-amber-400" />
                      Neue CRM-Notiz für {lead.name} erfassen
                    </h4>
                    <button
                      onClick={() => setActiveTab(lead.maraInsights ? 'maraInsights' : 'details')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Abbrechen
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Gesprächs- / Beobachtungsnotiz:
                      </label>
                      <textarea
                        rows={5}
                        placeholder={`Z.B. „${lead.name} hat im Webinar nach Agentur-Rabatten gefragt. Budget liegt bei ca. 5.000€. Folgetermin am Montag vereinbart.“`}
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="w-full p-4 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setActiveTab(lead.maraInsights ? 'maraInsights' : 'details')}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                      >
                        Abbrechen
                      </button>
                      <button
                        onClick={handleSaveNote}
                        disabled={isSavingLead || !newNoteText.trim()}
                        className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isSavingLead ? 'Wird gespeichert…' : 'Notiz im Verlauf speichern'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lead Score Widget */}
              <div className="bg-slate-950/70 rounded-2xl p-6 border-l-4 border-indigo-500 border-y border-r border-slate-800 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-lg font-extrabold text-white">Lead Score: {lead.score}/100</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                    {lead.scoreDescription}
                  </p>
                </div>

                <div className="shrink-0 w-full sm:w-44 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Abschluss-Chance</span>
                    <span className="text-indigo-400 font-bold">{lead.score}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Interaktionsverlauf Timeline */}
              <div className="bg-slate-950/70 rounded-2xl p-6 border border-slate-800 shadow-lg flex-1 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-400" />
                    Interaktionsverlauf & Chronik
                  </h4>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Timeline List */}
                <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                  {timeline.map((item) => (
                    <div key={item.id} className="relative group">
                      {/* Bullet Icon */}
                      <div className="absolute -left-[35px] top-0.5 rounded-full p-1.5 border-4 border-slate-950 shadow-md z-10 flex items-center justify-center">
                        {item.type === 'webinar' && (
                          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {item.type === 'pageview' && (
                          <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center">
                            <Globe className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {item.type === 'email' && (
                          <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                            <Inbox className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {item.type === 'note' && (
                          <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Timeline Card */}
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors space-y-2">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-white text-xs sm:text-sm">{item.title}</h5>
                          <span className="text-[11px] text-slate-400 font-medium shrink-0 ml-2">{item.timestamp}</span>
                        </div>

                        {item.description && (
                          <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                        )}

                        {item.emailDetails && (
                          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-1 text-xs">
                            <p className="text-slate-400 font-medium">
                              <span className="text-slate-200 font-semibold">Betreff:</span> {item.emailDetails.subject}
                            </p>
                            <p className="text-slate-300 italic">"{item.emailDetails.snippet}"</p>
                            {item.emailDetails.opens > 0 && (
                              <p className="text-indigo-400 font-semibold flex items-center gap-1 text-[11px] pt-1">
                                <CheckCheck className="w-3.5 h-3.5" /> Geöffnet ({item.emailDetails.opens}x)
                              </p>
                            )}
                          </div>
                        )}

                        {item.noteDetails && (
                          <div className="bg-slate-950/90 border-l-2 border-amber-500 rounded p-3 text-xs text-amber-200/90 italic leading-relaxed">
                            "{item.noteDetails.text}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2">
                  <button className="text-xs text-slate-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-1 cursor-pointer">
                    <ChevronDown className="w-4 h-4" />
                    <span>Alle historischen Ereignisse anzeigen</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
