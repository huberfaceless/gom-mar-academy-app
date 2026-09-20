import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Instagram, Loader2, Lock, Share2, X } from 'lucide-react';
import { PinterestPin, ProjectSettings } from '../../types/contentEngine';
import { instagramService, InstagramConnectionStatus } from '../../services/instagramService';
import { renderPinToCanvas } from '../../utils/pinterestCanvasRenderer';

interface InstagramPublishModalProps {
  pin: PinterestPin;
  projectSettings: ProjectSettings;
  isOpen: boolean;
  onClose: () => void;
}

const buildCaption = (pin: PinterestPin) => {
  const hashtags = pin.keywords
    .map((keyword) => `#${keyword.replace(/[^\p{L}\p{N}_]/gu, '')}`)
    .filter((tag) => tag.length > 1)
    .join(' ');
  return `${pin.description.trim()}\n\n${hashtags}`.trim().slice(0, 2200);
};

export const InstagramPublishModal: React.FC<InstagramPublishModalProps> = ({
  pin,
  projectSettings,
  isOpen,
  onClose,
}) => {
  const [connection, setConnection] = useState<InstagramConnectionStatus | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [published, setPublished] = useState<{ id: string; url: string } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setCaption(buildCaption(pin));
    setError(null);
    setPublished(null);
    const canvas = document.createElement('canvas');
    void renderPinToCanvas(canvas, pin, projectSettings, { width: 1080, height: 1350 })
      .then(() => setPreviewDataUrl(canvas.toDataURL('image/png', 0.92)))
      .catch(() => setError('Die Instagram-Grafik konnte nicht erstellt werden.'));
    void instagramService.getConnectionStatus()
      .then(setConnection)
      .catch((reason: unknown) => {
        setConnection({ connected: false });
        setError(reason instanceof Error ? reason.message : 'Instagram-Status konnte nicht geladen werden.');
      });
  }, [isOpen, pin, projectSettings]);

  if (!isOpen) return null;

  const connect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await instagramService.startOAuth();
    } catch (reason: unknown) {
      setIsLoading(false);
      setError(reason instanceof Error ? reason.message : 'Instagram-Verbindung konnte nicht gestartet werden.');
    }
  };

  const disconnect = async () => {
    if (!window.confirm('Instagram-Verbindung wirklich trennen?')) return;
    setIsLoading(true);
    setError(null);
    try {
      await instagramService.disconnect();
      setConnection({ connected: false });
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Instagram-Verbindung konnte nicht getrennt werden.');
    } finally {
      setIsLoading(false);
    }
  };

  const publish = async () => {
    if (!previewDataUrl || !caption.trim()) return;
    setIsPublishing(true);
    setError(null);
    try {
      setPublished(await instagramService.publishImage({ caption: caption.trim(), imageBase64: previewDataUrl }));
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Instagram-Beitrag konnte nicht veröffentlicht werden.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200">
        <header className="sticky top-0 z-10 bg-linear-to-r from-fuchsia-600 via-rose-600 to-amber-500 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Instagram className="w-7 h-7" />
            <div>
              <h2 className="text-xl font-black">Auf Instagram veröffentlichen</h2>
              <p className="text-sm text-white/85">Grafik und Text vor der Veröffentlichung prüfen</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Schließen" className="p-2 rounded-xl hover:bg-white/15">
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="p-6 grid md:grid-cols-[280px_1fr] gap-6">
          <div>
            {previewDataUrl ? (
              <img src={previewDataUrl} alt="Instagram-Beitragsvorschau" className="w-full rounded-2xl border border-slate-200 shadow-md" />
            ) : (
              <div className="aspect-[4/5] rounded-2xl bg-slate-100 flex items-center justify-center">
                <Loader2 className="w-7 h-7 animate-spin text-slate-400" />
              </div>
            )}
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">Instagram Business-Verbindung</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {connection?.connected
                      ? `Verbunden${connection.username ? ` als @${connection.username}` : ''}`
                      : 'Noch nicht verbunden'}
                  </p>
                </div>
                {connection?.connected ? (
                  <button type="button" onClick={disconnect} disabled={isLoading} className="px-4 py-2 rounded-xl border border-slate-300 text-sm font-bold hover:bg-white disabled:opacity-50">
                    Verbindung trennen
                  </button>
                ) : (
                  <button type="button" onClick={connect} disabled={isLoading} className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white text-sm font-bold hover:bg-fuchsia-700 disabled:opacity-50 flex items-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Instagram className="w-4 h-4" />}
                    Instagram verbinden
                  </button>
                )}
              </div>
            </section>

            <label className="block">
              <span className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-2">Caption und Hashtags</span>
              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value.slice(0, 2200))}
                rows={10}
                className="w-full rounded-2xl border border-slate-300 p-4 text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-fuchsia-500"
              />
              <span className="block text-right text-xs text-slate-400 mt-1">{caption.length}/2200</span>
            </label>

            {error && (
              <div className="flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                <AlertCircle className="w-5 h-5 shrink-0" />{error}
              </div>
            )}
            {published && (
              <div className="flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="w-5 h-5 shrink-0" />Der Beitrag wurde auf Instagram veröffentlicht.
              </div>
            )}

            <button
              type="button"
              onClick={publish}
              disabled={!connection?.connected || !previewDataUrl || !caption.trim() || isPublishing || Boolean(published)}
              className="w-full px-5 py-3.5 rounded-2xl bg-linear-to-r from-fuchsia-600 to-rose-600 text-white font-black shadow-lg disabled:opacity-45 flex items-center justify-center gap-2"
            >
              {isPublishing ? <Loader2 className="w-5 h-5 animate-spin" /> : published ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
              {isPublishing ? 'Wird veröffentlicht…' : published ? 'Veröffentlicht' : 'Jetzt auf Instagram veröffentlichen'}
            </button>
            <p className="flex items-start gap-2 text-xs text-slate-500">
              <Lock className="w-4 h-4 shrink-0" />Der Zugriffstoken wird verschlüsselt auf dem Server gespeichert und nie an den Browser übertragen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
