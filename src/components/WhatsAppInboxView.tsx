import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Loader2, MessageCircle, RefreshCw, Send } from 'lucide-react';
import { auth } from '../firebase/config';

type WhatsAppInboxMessage = {
  messageId: string;
  senderPhone: string;
  senderName?: string;
  timestamp: string;
  type: string;
  text: string;
  receivedAt: string;
  direction?: 'inbound' | 'outbound';
  member?: {
    userId: string;
    displayName: string;
    email: string;
    whatsappConsentGranted: boolean;
  };
};

const messageDate = (timestamp: string): Date => {
  const seconds = Number(timestamp);
  return Number.isFinite(seconds) && seconds > 0
    ? new Date(seconds * 1_000)
    : new Date(0);
};

const formatMessageDate = (timestamp: string): string =>
  new Intl.DateTimeFormat('de-AT', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Vienna',
  }).format(messageDate(timestamp));

const isReplyWindowOpen = (timestamp: string): boolean =>
  Date.now() - messageDate(timestamp).getTime() < 24 * 60 * 60 * 1000;

export const WhatsAppInboxView: React.FC = () => {
  const [messages, setMessages] = useState<WhatsAppInboxMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState('');
  const [replyResult, setReplyResult] = useState<Record<string, string>>({});
  const [selectedPhone, setSelectedPhone] = useState('');
  const [recipients, setRecipients] = useState<Array<{ userId: string; displayName: string; email: string; phoneNumber: string }>>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [languageCode, setLanguageCode] = useState('de');
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkSending, setBulkSending] = useState(false);
  const [campaignId, setCampaignId] = useState(() => crypto.randomUUID());

  const loadRecipients = async () => {
    setBulkLoading(true);
    setBulkStatus('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Bitte erneut anmelden.');
      const response = await fetch('/api/admin/whatsapp/bulk/recipients', {
        headers: { Authorization: `Bearer ${await currentUser.getIdToken()}` },
      });
      const result = await response.json() as { recipients?: typeof recipients; error?: string };
      if (!response.ok) throw new Error(result.error || 'Empfänger konnten nicht geladen werden.');
      setRecipients(result.recipients || []);
      setSelectedRecipients((current) => current.filter(id => result.recipients?.some(person => person.userId === id)));
    } catch (error: unknown) { setBulkStatus(error instanceof Error ? error.message : 'Empfänger konnten nicht geladen werden.'); }
    finally { setBulkLoading(false); }
  };

  const sendBulk = async () => {
    const chosen = recipients.filter(person => selectedRecipients.includes(person.userId));
    if (chosen.length < 1 || chosen.length > 20 || !templateName.trim()) return;
    if (!window.confirm(`${chosen.length} Mitgliedern die genehmigte WhatsApp-Vorlage „${templateName}“ (${languageCode}) senden? Meta kann dafür Gebühren berechnen. Die Empfänger werden vor jedem Versand erneut geprüft.`)) return;
    setBulkSending(true);
    setBulkStatus('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Bitte erneut anmelden.');
      const response = await fetch('/api/admin/whatsapp/bulk/send', {
        method: 'POST', headers: { Authorization: `Bearer ${await currentUser.getIdToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, userIds: chosen.map(person => person.userId), templateName: templateName.trim(), languageCode }),
      });
      const result = await response.json() as { error?: string; results?: Array<{ userId: string; status: 'accepted' | 'skipped' | 'error'; error?: string; warning?: string }> };
      if (!response.ok) throw new Error(result.error || 'WhatsApp-Versand fehlgeschlagen.');
      const accepted = result.results?.filter(item => item.status === 'accepted').length || 0;
      const skipped = result.results?.filter(item => item.status === 'skipped').length || 0;
      const failed = result.results?.find(item => item.status === 'error');
      const warning = result.results?.find(item => item.warning)?.warning;
      setBulkStatus(`${accepted} von WhatsApp angenommen, ${skipped} bereits für diesen Auftrag reserviert.${failed ? ` Abbruch: ${failed.error}` : ''}${warning ? ` Abbruch: ${warning}` : ''} Annahme bestätigt noch keine Zustellung.`);
      if (!failed && !warning) { setSelectedRecipients([]); setCampaignId(crypto.randomUUID()); }
      void loadMessages();
    } catch (error: unknown) { setBulkStatus(error instanceof Error ? error.message : 'WhatsApp-Versand fehlgeschlagen.'); }
    finally { setBulkSending(false); }
  };

  const conversations = Array.from(messages.reduce((groups, message) => {
    const phone = message.senderPhone;
    groups.set(phone, [...(groups.get(phone) || []), message]);
    return groups;
  }, new Map<string, WhatsAppInboxMessage[]>())).map(([phone, items]) => ({
    phone,
    messages: items.sort((a, b) => messageDate(a.timestamp).getTime() - messageDate(b.timestamp).getTime() || Date.parse(a.receivedAt) - Date.parse(b.receivedAt)),
  })).sort((a, b) => messageDate(b.messages[b.messages.length - 1].timestamp).getTime() - messageDate(a.messages[a.messages.length - 1].timestamp).getTime());
  const activeConversation = conversations.find((conversation) => conversation.phone === selectedPhone) || conversations[0];

  const sendReply = async (message: WhatsAppInboxMessage) => {
    const text = replyText[message.messageId]?.trim() || '';
    if (!text) return;
    setReplyingTo(message.messageId);
    setReplyResult((current) => ({ ...current, [message.messageId]: '' }));
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Die Firebase-Anmeldung ist abgelaufen. Bitte erneut anmelden.');
      const response = await fetch('/api/admin/whatsapp/reply', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await currentUser.getIdToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageId: message.messageId, text }),
      });
      const result = await response.json().catch(() => ({})) as { error?: string; historySaved?: boolean };
      if (!response.ok) throw new Error(result.error || 'Die WhatsApp-Antwort konnte nicht gesendet werden.');
      setReplyText((current) => ({ ...current, [message.messageId]: '' }));
      setReplyResult((current) => ({ ...current, [message.messageId]: result.historySaved === false
        ? 'WhatsApp hat die Antwort angenommen. Der Verlauf konnte nicht gespeichert werden. Bitte nicht erneut senden.'
        : 'Antwort erfolgreich gesendet.' }));
      await loadMessages();
    } catch (replyError: unknown) {
      setReplyResult((current) => ({
        ...current,
        [message.messageId]: replyError instanceof Error ? replyError.message : 'Die WhatsApp-Antwort konnte nicht gesendet werden.',
      }));
    } finally {
      setReplyingTo('');
    }
  };

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Die Firebase-Anmeldung ist abgelaufen. Bitte erneut anmelden.');
      const idToken = await currentUser.getIdToken();
      const response = await fetch('/api/admin/whatsapp/messages?limit=100', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const result = await response.json() as {
        error?: string;
        messages?: WhatsAppInboxMessage[];
      };
      if (!response.ok) throw new Error(result.error || 'WhatsApp-Nachrichten konnten nicht geladen werden.');
      setMessages(result.messages || []);
    } catch (loadError: unknown) {
      setError(loadError instanceof Error ? loadError.message : 'WhatsApp-Nachrichten konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  return (
    <div className="space-y-5">
    <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-xs" aria-labelledby="whatsapp-inbox-heading">
      <div className="flex flex-col gap-3 border-b border-emerald-100 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 id="whatsapp-inbox-heading" className="flex items-center gap-2 text-sm font-black text-slate-900">
            <MessageCircle className="h-5 w-5 text-emerald-600" />
            WhatsApp-Posteingang
          </h2>
          <p className="mt-1 text-xs text-slate-600">Die letzten 100 gespeicherten Nachrichten, nach Kontakt sortiert.</p>
        </div>
        <button
          type="button"
          onClick={() => void loadMessages()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Aktualisieren
        </button>
      </div>

      {error && (
        <div className="m-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!error && loading && messages.length === 0 && (
        <div className="flex items-center justify-center gap-2 p-10 text-sm font-semibold text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Nachrichten werden geladen …
        </div>
      )}

      {!error && !loading && messages.length === 0 && (
        <div className="p-10 text-center text-sm text-slate-500">
          Noch keine gespeicherten WhatsApp-Nachrichten vorhanden.
        </div>
      )}

      {messages.length > 0 && (
        <div className="grid min-h-96 md:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
          <nav aria-label="WhatsApp-Kontakte" className="border-b border-slate-100 md:border-b-0 md:border-r">
            {conversations.map((conversation) => {
              const latest = conversation.messages[conversation.messages.length - 1];
              const knownMember = [...conversation.messages].reverse().find(message => message.member)?.member;
              const inboundContact = [...conversation.messages].reverse().find(message => message.direction !== 'outbound');
              return (
                <button key={conversation.phone} type="button" onClick={() => setSelectedPhone(conversation.phone)}
                  aria-current={activeConversation?.phone === conversation.phone ? 'true' : undefined}
                  className={`w-full border-b border-slate-100 p-4 text-left hover:bg-emerald-50 ${activeConversation?.phone === conversation.phone ? 'bg-emerald-50' : ''}`}>
                  <span className="block truncate text-sm font-bold text-slate-900">{knownMember?.displayName || inboundContact?.senderName?.trim() || 'Unbekannter Kontakt'}</span>
                  <span className="block text-xs text-slate-500">+{conversation.phone} · {conversation.messages.length} Nachricht{conversation.messages.length === 1 ? '' : 'en'}</span>
                  <span className="mt-1 block truncate text-xs text-slate-600">{latest.direction === 'outbound' ? 'Du: ' : ''}{latest.text || `[${latest.type}]`}</span>
                  <time className="mt-1 block text-[11px] text-slate-500" dateTime={messageDate(latest.timestamp).toISOString()}>{formatMessageDate(latest.timestamp)}</time>
                </button>
              );
            })}
          </nav>
          {activeConversation && (() => {
            const latest = [...activeConversation.messages].reverse().find((message) => message.direction !== 'outbound');
            const lastMessage = activeConversation.messages[activeConversation.messages.length - 1];
            const member = [...activeConversation.messages].reverse().find((message) => message.member)?.member;
            return <div className="min-w-0 p-4 sm:p-5">
              <div className="font-bold text-slate-900">{member?.displayName || latest?.senderName?.trim() || lastMessage.senderName?.trim() || 'Unbekannter Kontakt'} <span className="font-medium text-slate-500">+{activeConversation.phone}</span></div>
              {member && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-bold text-indigo-700">Academy-Mitglied</span>
                  <span className="font-medium text-slate-600">{member.email}</span>
                  <span className={`rounded-full border px-2.5 py-1 font-bold ${member.whatsappConsentGranted ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                    {member.whatsappConsentGranted ? 'WhatsApp-Einwilligung aktiv' : 'Keine Versand-Einwilligung'}
                  </span>
                </div>
              )}
              <div className="mt-4 max-h-[32rem] space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-3" aria-label="Gesprächsverlauf">
                {activeConversation.messages.map((message) => (
                  <article key={message.messageId} className={`max-w-[88%] rounded-xl border p-3 ${message.direction === 'outbound' ? 'ml-auto border-emerald-200 bg-emerald-50' : 'mr-auto border-slate-200 bg-white'}`}>
                    <span className="text-xs font-bold text-slate-600">{message.direction === 'outbound' ? 'Gesendet · von WhatsApp angenommen' : 'Empfangen'}</span>
                    <time className="block text-xs text-slate-500" dateTime={messageDate(message.timestamp).toISOString()}>{formatMessageDate(message.timestamp)}</time>
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">{message.text || `[${message.type}]`}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 space-y-2 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                <label className="block text-xs font-bold text-slate-700" htmlFor={`reply-${latest?.messageId || 'none'}`}>Antworten</label>
                <textarea
                  id={`reply-${latest?.messageId || 'none'}`}
                  value={latest ? replyText[latest.messageId] || '' : ''}
                  onChange={(event) => latest && setReplyText((current) => ({ ...current, [latest.messageId]: event.target.value }))}
                  maxLength={4096}
                  rows={3}
                  disabled={!latest || !isReplyWindowOpen(latest.timestamp)}
                  placeholder={latest && isReplyWindowOpen(latest.timestamp) ? 'WhatsApp-Antwort eingeben …' : 'Das 24-Stunden-Antwortfenster ist abgelaufen.'}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => latest && void sendReply(latest)}
                  disabled={!latest || !isReplyWindowOpen(latest.timestamp) || replyingTo === latest.messageId || !(replyText[latest.messageId]?.trim())}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {replyingTo === latest?.messageId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Antwort senden
                </button>
                {latest && replyResult[latest.messageId] && (
                  <p className={`text-xs font-semibold ${replyResult[latest.messageId] === 'Antwort erfolgreich gesendet.' ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {replyResult[latest.messageId]}
                  </p>
                )}
              </div>
            </div>;
          })()}
        </div>
      )}
    </section>
    <section className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-xs sm:p-5" aria-labelledby="whatsapp-bulk-heading">
      <h2 id="whatsapp-bulk-heading" className="text-sm font-black text-slate-900">WhatsApp-Nachricht an Mitglieder</h2>
      <p className="mt-1 text-xs text-slate-600">Nur aktive Mitglieder mit hinterlegter Nummer und WhatsApp-Einwilligung. Für diesen Versand ist eine bei Meta genehmigte Vorlage ohne Platzhalter erforderlich. Höchstens 20 Empfänger je Auftrag.</p>
      <button type="button" onClick={() => void loadRecipients()} disabled={bulkLoading || bulkSending}
        className="mt-3 rounded-xl border border-emerald-300 px-4 py-2 text-xs font-bold text-emerald-800 disabled:opacity-50">{bulkLoading ? 'Lade …' : 'Empfänger prüfen'}</button>
      {recipients.length > 0 && <div className="mt-3 max-h-60 space-y-2 overflow-y-auto" role="group" aria-label="Empfänger auswählen">
        {recipients.map(person => <label key={person.userId} className="flex items-center gap-2 rounded-lg border border-slate-100 p-2 text-xs text-slate-800">
          <input type="checkbox" checked={selectedRecipients.includes(person.userId)} disabled={bulkSending || (!selectedRecipients.includes(person.userId) && selectedRecipients.length >= 20)}
            onChange={event => setSelectedRecipients(current => event.target.checked ? [...current, person.userId] : current.filter(id => id !== person.userId))} />
          <span className="min-w-0 break-words"><strong>{person.displayName || person.email}</strong> · {person.phoneNumber}</span>
        </label>)}
      </div>}
      {recipients.length > 0 && <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="text-xs font-bold text-slate-700">Genehmigter Vorlagenname
          <input value={templateName} onChange={event => { setTemplateName(event.target.value); setCampaignId(crypto.randomUUID()); }} placeholder="z. B. academy_update" maxLength={512} className="mt-1 block rounded-lg border border-slate-300 p-2 text-sm" />
        </label>
        <label className="text-xs font-bold text-slate-700">Sprache der Vorlage
          <select value={languageCode} onChange={event => { setLanguageCode(event.target.value); setCampaignId(crypto.randomUUID()); }} className="mt-1 block rounded-lg border border-slate-300 p-2 text-sm">
            {['de', 'de_DE', 'en', 'en_US', 'en_GB', 'pl', 'pl_PL'].map(code => <option key={code} value={code}>{code}</option>)}
          </select>
        </label>
        <button type="button" onClick={() => void sendBulk()} disabled={bulkSending || selectedRecipients.length === 0 || !/^[a-z0-9_]+$/.test(templateName.trim())}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-50">{bulkSending ? 'Sende …' : `Vorlage an ${selectedRecipients.length} Mitglieder senden`}</button>
      </div>}
      {bulkStatus && <p role="status" className="mt-3 text-xs font-semibold text-slate-700">{bulkStatus}</p>}
    </section>
    </div>
  );
};
