import React, { useEffect, useState } from 'react';
import { Campaign, EmailMessage } from '../types';
import { LeadDetailModal, LeadContact } from './LeadDetailModal';
import { sendEmail } from '../services/emailDeliveryService';
import { deleteCrmContact, loadCrmContacts, saveCrmContacts } from '../services/crmContactsService';
import { 
  Mail, 
  Plus, 
  Send, 
  Clock, 
  Lock, 
  CheckCircle2, 
  Edit, 
  Users, 
  Sparkles, 
  Eye, 
  MousePointerClick, 
  Play, 
  Pause,
  Copy,
  ChevronRight,
  Bot,
  Search,
  UserCheck,
  TrendingUp,
  Flame,
  Filter,
  PhoneCall,
  MoreVertical,
  Activity,
  Layers,
  ArrowUpRight,
  Trash2
} from 'lucide-react';

interface EmailAutomationViewProps {
  campaigns: Campaign[];
  onUpdateCampaigns: (campaigns: Campaign[]) => Promise<void>;
  onNavigateToToolbox: (category?: string) => void;
  onOpenFragGommar: (prompt?: string) => void;
  isAdmin: boolean;
  isLoadingCampaigns: boolean;
  campaignsError: string | null;
}

export const EmailAutomationView: React.FC<EmailAutomationViewProps> = ({
  campaigns,
  onUpdateCampaigns,
  onNavigateToToolbox,
  onOpenFragGommar,
  isAdmin,
  isLoadingCampaigns,
  campaignsError,
}) => {
  const activeCampaign = campaigns[0];
  const activeCampaignCount = campaigns.filter((campaign) => campaign.status === 'active').length;
  const plannedCampaignCount = campaigns.filter((campaign) => campaign.status === 'draft').length;
  const sentEmailCount = activeCampaign?.emails.filter((email) => email.status === 'sent').length || 0;
  const deliveredEmailCount = (activeCampaign?.leadsCount || 0) * sentEmailCount;
  const totalOpenCount = activeCampaign?.emails.reduce((total, email) => total + (email.opensCount || 0), 0) || 0;
  const totalClickCount = activeCampaign?.emails.reduce((total, email) => total + (email.clicksCount || 0), 0) || 0;
  const openRate = deliveredEmailCount > 0 ? Math.round((totalOpenCount / deliveredEmailCount) * 100) : 0;
  const clickRate = deliveredEmailCount > 0 ? Math.round((totalClickCount / deliveredEmailCount) * 100) : 0;
  const [mainTab, setMainTab] = useState<'marketing' | 'crm'>('marketing');
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editSubject, setEditSubject] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [editPreviewText, setEditPreviewText] = useState<string>('');
  const [editDayOffset, setEditDayOffset] = useState<number>(0);
  const [editContent, setEditContent] = useState<string>('');
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignTargetAudience, setCampaignTargetAudience] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [isAddingEmail, setIsAddingEmail] = useState(false);
  const [newEmailTitle, setNewEmailTitle] = useState('');
  const [newEmailSubject, setNewEmailSubject] = useState('');
  const [newEmailPreviewText, setNewEmailPreviewText] = useState('');
  const [newEmailContent, setNewEmailContent] = useState('');
  const [newEmailDayOffset, setNewEmailDayOffset] = useState(0);
  const [simulatedLeadSuccess, setSimulatedLeadSuccess] = useState<string | null>(null);
  const [campaignActionError, setCampaignActionError] = useState<string | null>(null);
  const [isSavingCampaign, setIsSavingCampaign] = useState(false);

  // CRM State
  const [contacts, setContacts] = useState<LeadContact[]>([]);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [isSavingContact, setIsSavingContact] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadContact | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'Alle' | 'Neu' | 'Kunden' | 'Warm' | 'Abgebrochen'>('Alle');
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadRole, setNewLeadRole] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setIsLoadingContacts(false);
      return;
    }
    let cancelled = false;
    void loadCrmContacts()
      .then((storedContacts) => {
        if (!cancelled) setContacts(storedContacts);
      })
      .catch((error: unknown) => {
        if (!cancelled) setContactsError(error instanceof Error ? error.message : 'CRM-Kontakte konnten nicht geladen werden.');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingContacts(false);
      });
    return () => { cancelled = true; };
  }, [isAdmin]);

  const handleSelectEmail = (email: EmailMessage) => {
    setSelectedEmail(email);
    setEditTitle(email.title);
    setEditSubject(email.subject);
    setEditPreviewText(email.previewText);
    setEditDayOffset(email.dayOffset);
    setEditContent(email.content);
    setIsEditing(false);
  };

  const handleSaveEmail = async () => {
    if (!selectedEmail) return;
    const updatedEmails = activeCampaign.emails.map((m) =>
      m.id === selectedEmail.id ? {
        ...m,
        title: editTitle.trim(),
        subject: editSubject.trim(),
        previewText: editPreviewText.trim(),
        dayOffset: editDayOffset,
        content: editContent.trim(),
      } : m
    );

    const updatedCampaigns = campaigns.map((c) =>
      c.id === activeCampaign.id ? { ...c, emails: updatedEmails } : c
    );

    setCampaignActionError(null);
    setIsSavingCampaign(true);
    try {
      await onUpdateCampaigns(updatedCampaigns);
      setSelectedEmail({
        ...selectedEmail,
        title: editTitle.trim(),
        subject: editSubject.trim(),
        previewText: editPreviewText.trim(),
        dayOffset: editDayOffset,
        content: editContent.trim(),
      });
      setIsEditing(false);
    } catch (error: unknown) {
      setCampaignActionError(error instanceof Error ? error.message : 'Die E-Mail-Änderungen konnten nicht gespeichert werden.');
    } finally {
      setIsSavingCampaign(false);
    }
  };

  // Open Lead Details
  const handleOpenLeadDetails = (lead: LeadContact) => {
    setSelectedLead(lead);
    setIsLeadModalOpen(true);
  };

  // Create new Lead in CRM
  const handleCreateNewLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) return;

    const newLead: LeadContact = {
      id: `lead_${Date.now()}`,
      name: newLeadName.trim(),
      role: newLeadRole.trim() || 'Interessent',
      company: newLeadCompany.trim() || 'Eigenes Business',
      avatarUrl: '',
      email: newLeadEmail.trim(),
      phone: '+49 170 000 00 00',
      location: 'Deutschland',
      badge: 'Neu (Lead)',
      badgeType: 'new',
      score: 50,
      scoreDescription: 'Neu manuell hinzugefügter Lead.',
      tags: ['Neu', 'Manuell'],
      lastInteraction: 'Gerade eben',
      timeline: [
        {
          id: `t_init_${Date.now()}`,
          type: 'note',
          title: 'Lead im CRM erfasst',
          timestamp: 'Gerade eben',
          noteDetails: {
            author: 'System',
            text: 'Manueller Eintrag ins GOM-MAR CRM.'
          }
        }
      ]
    };

    setContactsError(null);
    setIsSavingContact(true);
    try {
      const persistentContacts = contacts.filter((contact) => !contact.id.startsWith('lead_sim_'));
      const storedContacts = await saveCrmContacts([newLead, ...persistentContacts]);
      setContacts(storedContacts);
    } catch (error: unknown) {
      setContactsError(error instanceof Error ? error.message : 'Der Kontakt konnte nicht gespeichert werden.');
      return;
    } finally {
      setIsSavingContact(false);
    }
    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadRole('');
    setNewLeadCompany('');
    setShowAddLeadForm(false);
    setSimulatedLeadSuccess(`🎉 Neuer Lead "${newLead.name}" erfolgreich im CRM angelegt!`);
    setTimeout(() => setSimulatedLeadSuccess(null), 5000);
  };

  // Filtered Contacts
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterCategory === 'Alle') return true;
    if (filterCategory === 'Neu') return c.badgeType === 'new' || c.badge.includes('Neu');
    if (filterCategory === 'Kunden') return c.badgeType === 'active' || c.tags.includes('Kunde') || c.badge.includes('Kunde');
    if (filterCategory === 'Warm') return c.badgeType === 'hot' || c.badge.includes('Hot') || c.badge.includes('Warm');
    if (filterCategory === 'Abgebrochen') return c.badgeType === 'cold' || c.badge.includes('Abgebrochen');
    return true;
  });

  const handleCreateFirstCampaign = async () => {
    const campaignId = `camp_${Date.now()}`;
    const newCampaign: Campaign = {
      id: campaignId,
      title: 'Neue Kampagne',
      targetAudience: '',
      description: '',
      leadsCount: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      emails: [],
    };
    setCampaignActionError(null);
    setIsSavingCampaign(true);
    try {
      await onUpdateCampaigns([newCampaign]);
    } catch (error: unknown) {
      setCampaignActionError(error instanceof Error ? error.message : 'Die Kampagne konnte nicht gespeichert werden.');
    } finally {
      setIsSavingCampaign(false);
    }
  };

  const handleOpenCampaignEditor = () => {
    setCampaignTitle(activeCampaign.title);
    setCampaignTargetAudience(activeCampaign.targetAudience);
    setCampaignDescription(activeCampaign.description);
    setCampaignActionError(null);
    setIsEditingCampaign(true);
  };

  const handleSaveCampaign = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!campaignTitle.trim()) return;
    const updatedCampaigns = campaigns.map((campaign) => campaign.id === activeCampaign.id
      ? {
          ...campaign,
          title: campaignTitle.trim(),
          targetAudience: campaignTargetAudience.trim(),
          description: campaignDescription.trim(),
        }
      : campaign);
    setCampaignActionError(null);
    setIsSavingCampaign(true);
    try {
      await onUpdateCampaigns(updatedCampaigns);
      setIsEditingCampaign(false);
    } catch (error: unknown) {
      setCampaignActionError(error instanceof Error ? error.message : 'Die Kampagne konnte nicht gespeichert werden.');
    } finally {
      setIsSavingCampaign(false);
    }
  };

  const handleOpenEmailCreator = () => {
    setNewEmailTitle(`E-Mail ${activeCampaign.emails.length + 1}`);
    setNewEmailSubject('');
    setNewEmailPreviewText('');
    setNewEmailContent('');
    setNewEmailDayOffset(activeCampaign.emails.length === 0 ? 0 : activeCampaign.emails.length);
    setCampaignActionError(null);
    setIsAddingEmail(true);
  };

  const handleCreateEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newEmailTitle.trim() || !newEmailSubject.trim() || !newEmailContent.trim()) return;
    const newEmail: EmailMessage = {
      id: `mail_${Date.now()}`,
      campaignId: activeCampaign.id,
      dayOffset: newEmailDayOffset,
      title: newEmailTitle.trim(),
      subject: newEmailSubject.trim(),
      previewText: newEmailPreviewText.trim(),
      content: newEmailContent.trim(),
      status: 'draft',
    };
    const updatedCampaigns = campaigns.map((campaign) => campaign.id === activeCampaign.id
      ? { ...campaign, emails: [...campaign.emails, newEmail] }
      : campaign);
    setCampaignActionError(null);
    setIsSavingCampaign(true);
    try {
      await onUpdateCampaigns(updatedCampaigns);
      setIsAddingEmail(false);
      handleSelectEmail(newEmail);
    } catch (error: unknown) {
      setCampaignActionError(error instanceof Error ? error.message : 'Der E-Mail-Entwurf konnte nicht gespeichert werden.');
    } finally {
      setIsSavingCampaign(false);
    }
  };

  const handleDeleteCampaign = async () => {
    if (activeCampaign.status !== 'draft') {
      setCampaignActionError('Nur Kampagnenentwürfe können gelöscht werden.');
      return;
    }
    if (!window.confirm(`Kampagne „${activeCampaign.title}“ mit allen E-Mail-Entwürfen dauerhaft löschen?`)) return;
    setCampaignActionError(null);
    setIsSavingCampaign(true);
    try {
      await onUpdateCampaigns(campaigns.filter((campaign) => campaign.id !== activeCampaign.id));
      setSelectedEmail(null);
      setIsEditingCampaign(false);
    } catch (error: unknown) {
      setCampaignActionError(error instanceof Error ? error.message : 'Die Kampagne konnte nicht gelöscht werden.');
    } finally {
      setIsSavingCampaign(false);
    }
  };

  const handleDeleteEmail = async () => {
    if (!selectedEmail || selectedEmail.status !== 'draft') {
      setCampaignActionError('Nur E-Mail-Entwürfe können gelöscht werden.');
      return;
    }
    if (!window.confirm(`E-Mail-Entwurf „${selectedEmail.title}“ dauerhaft löschen?`)) return;
    const updatedCampaigns = campaigns.map((campaign) => campaign.id === activeCampaign.id
      ? { ...campaign, emails: campaign.emails.filter((email) => email.id !== selectedEmail.id) }
      : campaign);
    setCampaignActionError(null);
    setIsSavingCampaign(true);
    try {
      await onUpdateCampaigns(updatedCampaigns);
      setSelectedEmail(null);
      setIsEditing(false);
    } catch (error: unknown) {
      setCampaignActionError(error instanceof Error ? error.message : 'Der E-Mail-Entwurf konnte nicht gelöscht werden.');
    } finally {
      setIsSavingCampaign(false);
    }
  };

  const activeLeadCount = contacts.filter((contact) => contact.badgeType !== 'cold').length;
  const customerCount = contacts.filter((contact) => contact.badgeType === 'active' || contact.tags.includes('Kunde')).length;
  const conversionRate = contacts.length > 0 ? ((customerCount / contacts.length) * 100).toFixed(1) : '0';

  // Simulate new Lead Opt-In
  const handleSimulateLead = () => {
    const testLead: LeadContact = {
      id: `lead_sim_${Date.now()}`,
      name: 'Max Mustermann',
      role: 'Geschäftsführer',
      company: 'Mustermann Consulting',
      avatarUrl: '',
      email: `testlead_${Date.now().toString().slice(-4)}@example.com`,
      phone: '+49 170 111 22 33',
      location: 'Hamburg',
      badge: 'Neu (Lead)',
      badgeType: 'new',
      score: 60,
      scoreDescription: 'Hat sich über die Test-Funnel Landingpage eingetragen.',
      tags: ['Webinar-OptIn', 'Neu'],
      lastInteraction: 'Gerade eben',
      timeline: [
        {
          id: `t_sim_${Date.now()}`,
          type: 'webinar',
          title: 'Webinar-Anmeldung',
          timestamp: 'Gerade eben',
          description: 'Eingetragen über Opt-In Funnel.'
        }
      ]
    };
    setContacts([testLead, ...contacts]);

    setSimulatedLeadSuccess(`Neuer Test-Lead (${testLead.email}) lokal erfasst. Es wurde keine E-Mail versendet.`);
    setTimeout(() => setSimulatedLeadSuccess(null), 5000);
  };

  if (isLoadingCampaigns) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-600 shadow-sm">
        E-Mail-Kampagnen werden geladen…
      </div>
    );
  }

  if (!activeCampaign && mainTab === 'marketing') {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Mail className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-950">Noch keine Kampagne vorhanden</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
            {isAdmin
              ? 'Die Testkampagnen wurden entfernt. Erstelle eine neue leere Kampagne oder öffne dein noch leeres CRM.'
              : 'Die Testkampagnen wurden entfernt. Erstelle eine neue leere Kampagne.'}
          </p>
          {(campaignsError || campaignActionError) && (
            <p className="mx-auto mt-4 max-w-xl rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800" role="alert">
              {campaignActionError || campaignsError}
            </p>
          )}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCreateFirstCampaign}
              disabled={isSavingCampaign}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {isSavingCampaign ? 'Wird gespeichert…' : 'Erste Kampagne erstellen'}
            </button>
            {isAdmin && (
              <button
                type="button"
                onClick={() => setMainTab('crm')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Users className="h-4 w-4" />
                CRM öffnen
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top View Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <button
            onClick={() => setMainTab('marketing')}
            id="tab-marketing-overview"
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              mainTab === 'marketing'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>E-Mail Marketing & Sequenzen</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setMainTab('crm')}
              id="tab-crm-contacts"
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                mainTab === 'crm'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Kontakte verwalten (CRM)</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-indigo-700 text-[11px] font-black border border-indigo-200">
                {contacts.length}
              </span>
            </button>
          )}
        </div>

        {isAdmin && <div className="flex items-center gap-3">
          {mainTab === 'crm' ? (
            <button
              onClick={() => setShowAddLeadForm(!showAddLeadForm)}
              id="btn-add-lead-crm"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Neuer Lead</span>
            </button>
          ) : (
            <button
              onClick={handleSimulateLead}
              id="btn-simulate-lead"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Test-Lead eintragen</span>
            </button>
          )}
        </div>}
      </div>

      {/* Lead Simulation Toast Success */}
      {simulatedLeadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-fadeIn shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{simulatedLeadSuccess}</span>
        </div>
      )}

      {isAdmin && contactsError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold" role="alert">
          {contactsError}
        </div>
      )}

      {(campaignsError || campaignActionError) && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold" role="alert">
          {campaignActionError || campaignsError}
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 1: E-MAIL MARKETING & SEQUENZEN                     */}
      {/* ========================================================= */}
      {mainTab === 'marketing' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">E-Mail Marketing</h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Überblick und Steuerung deiner automatisierten Kampagnen & Sequenzen.
              </p>
            </div>
            <button
              onClick={() => onNavigateToToolbox('email')}
              className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer w-fit shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>KI-E-Mail Generator</span>
            </button>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>Gesamtkontakte</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-950">{activeCampaign.leadsCount}</p>
              <p className="text-xs text-indigo-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Aktueller Stand
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Aktive Kampagnen</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-950">{activeCampaignCount}</p>
              <p className="text-xs text-slate-500 font-medium">{plannedCampaignCount} geplant</p>
            </div>

            <div
              onClick={isAdmin ? () => setMainTab('crm') : undefined}
              className={`bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm col-span-2 relative overflow-hidden group transition-colors ${
                isAdmin ? 'cursor-pointer hover:border-indigo-400' : ''
              }`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-3">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <span>Durchschn. Öffnungsrate</span>
                  </div>
                  {isAdmin && (
                    <span className="text-indigo-600 text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      CRM öffnen <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-950">{openRate}%</p>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden border border-slate-200">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full"
                      style={{ width: `${openRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Contacts Preview */}
            {isAdmin && <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">Neueste Leads</h3>
                    <p className="text-xs text-slate-500">Direkt aus deinem CRM</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {contacts.length} Kontakte
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {contacts.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => handleOpenLeadDetails(lead)}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      {lead.avatarUrl ? (
                        <img
                          src={lead.avatarUrl}
                          alt={lead.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center border border-indigo-200">
                          {lead.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {lead.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{lead.tags[0] || 'Lead'}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{lead.lastInteraction}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setMainTab('crm')}
                id="btn-goto-crm"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Alle Kontakte verwalten (CRM) →
              </button>
            </div>}

            {/* Campaign Status */}
            <div className={`bg-white border-l-4 border-l-indigo-600 border-y border-r border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col space-y-4 ${isAdmin ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">{activeCampaign.status === 'active' ? 'Aktive Kampagne' : activeCampaign.status === 'paused' ? 'Pausierte Kampagne' : 'Kampagnenentwurf'}</h3>
                    <p className="text-xs text-slate-500">"{activeCampaign.title}"</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border ${activeCampaign.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${activeCampaign.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    {activeCampaign.status === 'active' ? 'Aktiv' : activeCampaign.status === 'paused' ? 'Pausiert' : 'Entwurf'}
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenCampaignEditor}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Kampagne bearbeiten
                  </button>
                </div>
              </div>

              {isEditingCampaign && (
                <form onSubmit={handleSaveCampaign} className="space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Kampagnenname *</label>
                    <input
                      required
                      maxLength={200}
                      value={campaignTitle}
                      onChange={(event) => setCampaignTitle(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Zielgruppe</label>
                    <input
                      maxLength={1000}
                      value={campaignTargetAudience}
                      onChange={(event) => setCampaignTargetAudience(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Beschreibung</label>
                    <textarea
                      rows={3}
                      maxLength={5000}
                      value={campaignDescription}
                      onChange={(event) => setCampaignDescription(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={handleDeleteCampaign}
                      disabled={isSavingCampaign || activeCampaign.status !== 'draft'}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-700 disabled:cursor-not-allowed disabled:opacity-50 sm:mr-auto"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Kampagne löschen
                    </button>
                    <button type="button" onClick={() => setIsEditingCampaign(false)} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700">
                      Abbrechen
                    </button>
                    <button disabled={isSavingCampaign} className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-60">
                      {isSavingCampaign ? 'Wird gespeichert…' : 'Kampagne speichern'}
                    </button>
                  </div>
                </form>
              )}

              <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 hover:border-slate-300 transition-colors space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-sm">{activeCampaign.description || activeCampaign.title}</h4>
                  <span className="text-xs text-slate-500 font-mono">Auto-Sequenz</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-slate-500 mb-0.5">Gesendet</p>
                    <p className="font-bold text-slate-900 text-sm sm:text-base">{deliveredEmailCount}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-0.5">Geöffnet</p>
                    <p className="font-bold text-indigo-600 text-sm sm:text-base">{openRate}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-0.5">Geklickt</p>
                    <p className="font-bold text-emerald-600 text-sm sm:text-base">{clickRate}%</p>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${openRate}%` }} />
                </div>
              </div>
            </div>

            {/* 5-Day Sequenzer Full Component */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm lg:col-span-3 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-600" />
                    E-Mail-Serie
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeCampaign.emails.length > 0
                      ? `${activeCampaign.emails.length} E-Mails • Auslöser bei Registrierung`
                      : 'Noch keine Automatisierung eingerichtet'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenEmailCreator}
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4" />
                  E-Mail hinzufügen
                </button>
              </div>

              {isAddingEmail && (
                <form onSubmit={handleCreateEmail} className="space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4 sm:p-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">Interner Name *</label>
                      <input required maxLength={200} value={newEmailTitle} onChange={(event) => setNewEmailTitle(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-600 focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-700">Versand nach Tagen</label>
                      <input type="number" min={0} max={3650} required value={newEmailDayOffset} onChange={(event) => setNewEmailDayOffset(Number(event.target.value))} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-600 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Betreff *</label>
                    <input required maxLength={300} value={newEmailSubject} onChange={(event) => setNewEmailSubject(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">Vorschautext</label>
                    <input maxLength={1000} value={newEmailPreviewText} onChange={(event) => setNewEmailPreviewText(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-700">E-Mail-Inhalt *</label>
                    <textarea required rows={8} maxLength={100000} value={newEmailContent} onChange={(event) => setNewEmailContent(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm leading-relaxed focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <p className="text-xs font-semibold text-amber-800">Die E-Mail wird als Entwurf gespeichert und nicht automatisch versendet.</p>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setIsAddingEmail(false)} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700">Abbrechen</button>
                    <button disabled={isSavingCampaign} className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-60">{isSavingCampaign ? 'Wird gespeichert…' : 'Entwurf speichern'}</button>
                  </div>
                </form>
              )}

              {/* Emails List */}
              <div className="grid grid-cols-1 gap-3">
                {activeCampaign.emails.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                    <p className="font-bold text-slate-900">Diese Kampagne enthält noch keine E-Mails.</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Erstelle mit dem KI-E-Mail-Generator den ersten Entwurf für deine Sequenz.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenEmailCreator}
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4" />
                      Erste E-Mail erstellen
                    </button>
                  </div>
                )}
                {activeCampaign.emails.map((email) => {
                  const isSelected = selectedEmail?.id === email.id;
                  return (
                    <div
                      key={email.id}
                      onClick={() => handleSelectEmail(email)}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-indigo-50/70 border-indigo-600 shadow-sm'
                          : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="shrink-0 mt-1 sm:mt-0">
                          {email.status === 'sent' && (
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}
                          {email.status === 'draft' && (
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-100 font-bold text-indigo-700">
                              <Edit className="h-5 w-5" />
                            </div>
                          )}
                          {email.status === 'scheduled' && (
                            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                              <Clock className="w-5 h-5" />
                            </div>
                          )}
                          {email.status === 'locked' && (
                            <div className="w-9 h-9 rounded-xl bg-slate-200 border border-slate-300 text-slate-500 flex items-center justify-center font-bold">
                              <Lock className="w-5 h-5" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                              {email.title}
                            </span>
                            {email.status === 'sent' && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                ✅ Versendet
                              </span>
                            )}
                            {email.status === 'draft' && (
                              <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800">
                                Entwurf
                              </span>
                            )}
                            {email.status === 'scheduled' && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-amber-100 text-amber-800">
                                🕐 Geplant
                              </span>
                            )}
                            {email.status === 'locked' && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-slate-200 text-slate-700">
                                🔒 Freischalten durch Lektion {email.requiredLessonId}
                              </span>
                            )}
                          </div>

                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{email.subject}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{email.previewText}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 text-xs">
                        {email.opensCount !== undefined && (
                          <div className="flex items-center gap-3 text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5 text-indigo-600" />
                              {email.opensCount} Öffnungen
                            </span>
                            <span className="flex items-center gap-1">
                              <MousePointerClick className="w-3.5 h-3.5 text-emerald-600" />
                              {email.clicksCount} Klicks
                            </span>
                          </div>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Email Editor / Viewer Drawer */}
          {selectedEmail && (
            <div className="bg-white border-2 border-indigo-600 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    GOM-MAR Mail Editor • {selectedEmail.title}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mt-0.5">{selectedEmail.subject}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedEmail.status === 'draft' && (
                    <button
                      type="button"
                      onClick={handleDeleteEmail}
                      disabled={isSavingCampaign}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Löschen
                    </button>
                  )}
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Abbrechen' : 'Inhalt Bearbeiten'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    ✕ Schließen
                  </button>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Interner Name:
                      </label>
                      <input
                        type="text"
                        maxLength={200}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Versand nach Tagen:
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={3650}
                        value={editDayOffset}
                        onChange={(e) => setEditDayOffset(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      E-Mail Betreffzeile:
                    </label>
                    <input
                      type="text"
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Vorschautext:
                    </label>
                    <input
                      type="text"
                      maxLength={1000}
                      value={editPreviewText}
                      onChange={(e) => setEditPreviewText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      E-Mail Textinhalte (mit Platzhaltern):
                    </label>
                    <textarea
                      rows={10}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:border-indigo-600 focus:bg-white leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={handleSaveEmail}
                      disabled={isSavingCampaign}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isSavingCampaign ? 'Wird gespeichert…' : 'Änderungen speichern'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="text-xs text-slate-600 space-y-1 font-mono pb-3 border-b border-slate-200">
                      <p><strong className="text-slate-900">Absender:</strong> GOM-MAR Mail Automation &lt;system@gommar-academy.de&gt;</p>
                      <p><strong className="text-slate-900">Betreff:</strong> {selectedEmail.subject}</p>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                      {selectedEmail.content}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => onNavigateToToolbox('email')}
                      className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Text mit KI Generator neu formulieren</span>
                    </button>

                    <button
                      onClick={() => onOpenFragGommar(`Wie kann ich die Betreffzeile "${selectedEmail.subject}" verbessern, um mehr Öffnungen zu bekommen?`)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                    >
                      <Bot className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Frag GOM-MAR nach Feedback</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: KONTAKTE VERWALTEN (CRM)                         */}
      {/* ========================================================= */}
      {isAdmin && mainTab === 'crm' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Kontakte verwalten (CRM)</h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Überblick und Steuerung aller Leads, Interessenten und Kunden.
              </p>
            </div>
            <button
              onClick={() => setShowAddLeadForm(true)}
              id="btn-crm-new-lead"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Neuer Lead</span>
            </button>
          </div>

          {/* New Lead Form Modal */}
          {showAddLeadForm && (
            <div className="bg-white border-2 border-indigo-600 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-950 text-base flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  Neuen Kontakt im CRM erfassen
                </h3>
                <button
                  onClick={() => setShowAddLeadForm(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm"
                >
                  ✕ Schließen
                </button>
              </div>

              <form onSubmit={handleCreateNewLead} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vollständiger Name *</label>
                    <input
                      type="text"
                      placeholder="z.B. Anna Müller"
                      required
                      value={newLeadName}
                      onChange={(e) => setNewLeadName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">E-Mail-Adresse *</label>
                    <input
                      type="email"
                      placeholder="anna.mueller@techflow.de"
                      required
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Position / Rolle</label>
                    <input
                      type="text"
                      placeholder="z.B. Marketing Director"
                      value={newLeadRole}
                      onChange={(e) => setNewLeadRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Unternehmen</label>
                    <input
                      type="text"
                      placeholder="z.B. TechFlow GmbH"
                      value={newLeadCompany}
                      onChange={(e) => setNewLeadCompany(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddLeadForm(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingContact}
                    className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isSavingContact ? 'Wird gespeichert…' : 'Kontakt speichern'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CRM Summary Stats Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border-l-4 border-l-indigo-600 border-y border-r border-slate-200 shadow-sm space-y-1">
              <p className="text-xs font-semibold text-slate-500">Gesamtkontakte</p>
              <p className="text-3xl font-black text-slate-950">{contacts.length}</p>
              <div className="mt-3 flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                <TrendingUp className="w-4 h-4" />
                <span>Aktueller Stand</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs font-semibold text-slate-500">Aktive Leads</p>
              <p className="text-3xl font-black text-slate-950">{activeLeadCount}</p>
              <div className="mt-3 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2.5 rounded-full" style={{ width: `${contacts.length > 0 ? Math.round((activeLeadCount / contacts.length) * 100) : 0}%` }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <p className="text-xs font-semibold text-slate-500">Conversion Rate</p>
              <p className="text-3xl font-black text-slate-950">{conversionRate}%</p>
              <div className="mt-3 flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Aktueller Stand</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Kontakte nach Name, E-Mail oder Tag durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex overflow-x-auto gap-2 scrollbar-none items-center">
              {(['Alle', 'Neu', 'Kunden', 'Warm', 'Abgebrochen'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Contact List Cards */}
          <div className="space-y-3">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleOpenLeadDetails(contact)}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  {contact.avatarUrl ? (
                    <img
                      src={contact.avatarUrl}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 bg-slate-100 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center border border-indigo-200">
                      {contact.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                      {contact.name}
                      {contact.badge === 'Hot Lead' && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          🔥 Hot Lead
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500">{contact.email} • {contact.role} ({contact.company})</p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 justify-between md:justify-end">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        contact.badgeType === 'hot'
                          ? 'bg-indigo-600 animate-ping'
                          : contact.badgeType === 'active'
                          ? 'bg-emerald-600'
                          : contact.badgeType === 'new'
                          ? 'bg-blue-600'
                          : 'bg-slate-400'
                      }`}
                    />
                    <span className="text-xs font-semibold text-slate-700">{contact.badge}</span>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Letzte Interaktion</p>
                    <p className="text-xs font-semibold text-slate-900">{contact.lastInteraction}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenLeadDetails(contact);
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {isLoadingContacts && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
                <p className="text-sm font-semibold">CRM-Kontakte werden geladen…</p>
              </div>
            )}

            {!isLoadingContacts && filteredContacts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                <Users className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold">Keine Kontakte gefunden.</p>
                <p className="text-xs text-slate-400">Versuche einen anderen Suchbegriff oder lege einen neuen Lead an.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEAD DETAILS FULL INTERACTIVE MODAL */}
      {isAdmin && selectedLead && isLeadModalOpen ? (
        <LeadDetailModal
          key={selectedLead.id}
          lead={selectedLead}
          onClose={() => setIsLeadModalOpen(false)}
          onSendEmail={async (lead, sub, body) => {
            await sendEmail({ to: lead.email, subject: sub, body });
            setSimulatedLeadSuccess(`📨 E-Mail "${sub}" an ${lead.name} (${lead.email}) versendet!`);
            setTimeout(() => setSimulatedLeadSuccess(null), 5000);
          }}
          onUpdateLead={async (updatedLead) => {
            const persistentContacts = contacts.filter((contact) => !contact.id.startsWith('lead_sim_'));
            const updatedContacts = persistentContacts.map((contact) => contact.id === updatedLead.id ? updatedLead : contact);
            const storedContacts = await saveCrmContacts(updatedContacts);
            setContacts(storedContacts);
            setSelectedLead(updatedLead);
          }}
          onDeleteLead={async (lead) => {
            if (lead.id.startsWith('lead_sim_')) {
              setContacts((currentContacts) => currentContacts.filter((contact) => contact.id !== lead.id));
              return;
            }
            const storedContacts = await deleteCrmContact(lead.id);
            setContacts(storedContacts);
            setSimulatedLeadSuccess(`Kontakt „${lead.name}“ wurde dauerhaft gelöscht.`);
            setTimeout(() => setSimulatedLeadSuccess(null), 5000);
          }}
          onAddNote={() => {
            setSimulatedLeadSuccess('📝 Neue Notiz im CRM-Verlauf gespeichert!');
            setTimeout(() => setSimulatedLeadSuccess(null), 5000);
          }}
        />
      ) : null}
    </div>
  );
};
