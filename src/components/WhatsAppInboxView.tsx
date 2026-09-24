import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Loader2, MessageCircle, RefreshCw } from 'lucide-react';
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

export const WhatsAppInboxView: React.FC = () => {
  const [messages, setMessages] = useState<WhatsAppInboxMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          <p className="mt-1 text-xs text-slate-600">Die letzten 100 eingehenden Nachrichten der Cloud API.</p>
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
        <div className="divide-y divide-slate-100">
          {messages.map((message) => (
            <article key={message.messageId} className="p-4 sm:p-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="font-bold text-slate-900">
                  {message.member?.displayName || message.senderName?.trim() || 'Unbekannter Kontakt'}
                  <span className="ml-2 font-medium text-slate-500">+{message.senderPhone}</span>
                </div>
                <time className="text-xs font-medium text-slate-500" dateTime={messageDate(message.timestamp).toISOString()}>
                  {formatMessageDate(message.timestamp)}
                </time>
              </div>
              {message.member && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 font-bold text-indigo-700">Academy-Mitglied</span>
                  <span className="font-medium text-slate-600">{message.member.email}</span>
                  <span className={`rounded-full border px-2.5 py-1 font-bold ${message.member.whatsappConsentGranted ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                    {message.member.whatsappConsentGranted ? 'WhatsApp-Einwilligung aktiv' : 'Keine Versand-Einwilligung'}
                  </span>
                </div>
              )}
              <p className="mt-3 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-800">
                {message.text || `[${message.type}]`}
              </p>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {message.type}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
