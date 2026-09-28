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

  const conversations = Array.from(messages.reduce((groups, message) => {
    const phone = message.senderPhone;
    groups.set(phone, [...(groups.get(phone) || []), message]);
    return groups;
  }, new Map<string, WhatsAppInboxMessage[]>())).map(([phone, items]) => ({
    phone,
    messages: items.sort((a, b) => messageDate(a.timestamp).getTime() - messageDate(b.timestamp).getTime()),
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
      const result = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Die WhatsApp-Antwort konnte nicht gesendet werden.');
      setReplyText((current) => ({ ...current, [message.messageId]: '' }));
      setReplyResult((current) => ({ ...current, [message.messageId]: 'Antwort erfolgreich gesendet.' }));
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
    <section className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-xs" aria-labelledby="whatsapp-inbox-heading">
      <div className="flex flex-col gap-3 border-b border-emerald-100 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 id="whatsapp-inbox-heading" className="flex items-center gap-2 text-sm font-black text-slate-900">
            <MessageCircle className="h-5 w-5 text-emerald-600" />
            WhatsApp-Posteingang
          </h2>
          <p className="mt-1 text-xs text-slate-600">Die letzten 100 eingehenden Nachrichten, nach Kontakt sortiert.</p>
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
              return (
                <button key={conversation.phone} type="button" onClick={() => setSelectedPhone(conversation.phone)}
                  aria-current={activeConversation?.phone === conversation.phone ? 'true' : undefined}
                  className={`w-full border-b border-slate-100 p-4 text-left hover:bg-emerald-50 ${activeConversation?.phone === conversation.phone ? 'bg-emerald-50' : ''}`}>
                  <span className="block truncate text-sm font-bold text-slate-900">{latest.member?.displayName || latest.senderName?.trim() || 'Unbekannter Kontakt'}</span>
                  <span className="block text-xs text-slate-500">+{conversation.phone} · {conversation.messages.length} Nachricht{conversation.messages.length === 1 ? '' : 'en'}</span>
                  <span className="mt-1 block truncate text-xs text-slate-600">{latest.text || `[${latest.type}]`}</span>
                  <time className="mt-1 block text-[11px] text-slate-500" dateTime={messageDate(latest.timestamp).toISOString()}>{formatMessageDate(latest.timestamp)}</time>
                </button>
              );
            })}
          </nav>
          {activeConversation && (() => {
            const latest = activeConversation.messages[activeConversation.messages.length - 1];
            const member = [...activeConversation.messages].reverse().find((message) => message.member)?.member;
            return <div className="min-w-0 p-4 sm:p-5">
              <div className="font-bold text-slate-900">{member?.displayName || latest.senderName?.trim() || 'Unbekannter Kontakt'} <span className="font-medium text-slate-500">+{activeConversation.phone}</span></div>
              {member && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-bold text-indigo-700">Academy-Mitglied</span>
                  <span className="font-medium text-slate-600">{member.email}</span>
                  <span className={`rounded-full border px-2.5 py-1 font-bold ${member.whatsappConsentGranted ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                    {member.whatsappConsentGranted ? 'WhatsApp-Einwilligung aktiv' : 'Keine Versand-Einwilligung'}
                  </span>
                </div>
              )}
              <div className="mt-4 max-h-[32rem] space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-3" aria-label="Eingehende Nachrichten">
                {activeConversation.messages.map((message) => (
                  <article key={message.messageId} className="rounded-xl border border-slate-200 bg-white p-3">
                    <time className="block text-xs text-slate-500" dateTime={messageDate(message.timestamp).toISOString()}>{formatMessageDate(message.timestamp)}</time>
                    <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-800">{message.text || `[${message.type}]`}</p>
                  </article>
                ))}
              </div>
              <div className="mt-4 space-y-2 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                <label className="block text-xs font-bold text-slate-700" htmlFor={`reply-${latest.messageId}`}>Antworten</label>
                <textarea
                  id={`reply-${latest.messageId}`}
                  value={replyText[latest.messageId] || ''}
                  onChange={(event) => setReplyText((current) => ({ ...current, [latest.messageId]: event.target.value }))}
                  maxLength={4096}
                  rows={3}
                  disabled={!isReplyWindowOpen(latest.timestamp)}
                  placeholder={isReplyWindowOpen(latest.timestamp) ? 'WhatsApp-Antwort eingeben …' : 'Das 24-Stunden-Antwortfenster ist abgelaufen.'}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => void sendReply(latest)}
                  disabled={!isReplyWindowOpen(latest.timestamp) || replyingTo === latest.messageId || !(replyText[latest.messageId]?.trim())}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {replyingTo === latest.messageId ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Antwort senden
                </button>
                {replyResult[latest.messageId] && (
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
  );
};
