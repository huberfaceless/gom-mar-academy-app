import { useContentHubCopy } from '../../i18n/useContentHubCopy';
import React, { useState, useEffect } from 'react';
import { 
  Pin, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  ExternalLink, 
  FolderPlus, 
  Sparkles, 
  Loader2, 
  Calendar,
  Share2,
  Lock,
  Globe
} from 'lucide-react';
import { PinterestPin, PinterestBoard, PinterestAccountConfig, ProjectSettings } from '../../types/contentEngine';
import { type PinterestEnvironment } from '../../utils/pinterestEnvironment';
import { pinterestService } from '../../services/pinterestService';
import { renderPinToCanvas } from '../../utils/pinterestCanvasRenderer';

interface PinterestPublishModalProps {
  pin: PinterestPin;
  projectSettings: ProjectSettings;
  isOpen: boolean;
  onClose: () => void;
  onPinPublished: (updatedPin: Partial<PinterestPin>) => void;
}

export const PinterestPublishModal: React.FC<PinterestPublishModalProps> = ({
  pin,
  projectSettings,
  isOpen,
  onClose,
  onPinPublished,
}) => {
  const { language, hubText } = useContentHubCopy();
  const [environment, setEnvironment] = useState<PinterestEnvironment>(() => {
    try { return sessionStorage.getItem('gommar_pinterest_publish_environment') === 'sandbox' ? 'sandbox' : 'production'; }
    catch { return 'production'; }
  });
  const isSandbox = environment === 'sandbox';
  const [accountConfig, setAccountConfig] = useState<PinterestAccountConfig>({ accessToken: '', isConnected: false });
  const [isTestingToken, setIsTestingToken] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [boards, setBoards] = useState<PinterestBoard[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<string>('');
  const [isLoadingBoards, setIsLoadingBoards] = useState<boolean>(false);
  
  // New board inline creation
  const [isCreatingBoard, setIsCreatingBoard] = useState<boolean>(false);
  const [newBoardName, setNewBoardName] = useState<string>('');
  const [isSubmittingBoard, setIsSubmittingBoard] = useState<boolean>(false);

  // Publishing state
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<{ id: string; url: string } | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    const canvas = document.createElement('canvas');
    renderPinToCanvas(canvas, pin, projectSettings)
      .then(() => { if (active) setPreviewDataUrl(canvas.toDataURL('image/png', 0.9)); })
      .catch(() => { if (active) setPublishError(hubText("Die Pin-Vorschau konnte nicht erzeugt werden. Bitte erneut öffnen.")); });
    return () => { active = false; };
  }, [isOpen, pin, projectSettings]);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    setAccountConfig({ accessToken: '', isConnected: false });
    setBoards([]);
    setSelectedBoardId('');
    setConnectionError(null);
    setPublishError(null);
    setPublishSuccess(null);
    setIsCreatingBoard(false);
    setNewBoardName('');
    setIsTestingToken(true);
    setIsLoadingBoards(true);
    void (async () => {
      try {
        const status = await pinterestService.getConnectionStatus(environment);
        if (!active) return;
        setAccountConfig({ accessToken: '', isConnected: status.connected, lastConnectedAt: status.connectedAt || undefined });
        if (status.connected) {
          const result = await pinterestService.getBoards(environment);
          if (!active) return;
          if (!result.success) { setConnectionError(result.error || hubText("Pinnwände konnten nicht geladen werden.")); return; }
          setBoards(result.boards);
          const storedBoard = environment === 'production' ? result.boards.find(board => board.id === pin.pinterestBoardId) : undefined;
          setSelectedBoardId(storedBoard?.id || result.boards[0]?.id || '');
        }
      } catch {
        if (active) setConnectionError(hubText("Der Pinterest-Verbindungsstatus konnte nicht geladen werden."));
      } finally {
        if (active) { setIsTestingToken(false); setIsLoadingBoards(false); }
      }
    })();
    return () => { active = false; };
  }, [isOpen, environment, pin.id]);

  const handleConnectPinterest = async () => {
    setIsTestingToken(true);
    setConnectionError(null);
    try {
      await pinterestService.startOAuth(environment);
    } catch (error: unknown) {
      setIsTestingToken(false);
      setConnectionError(error instanceof Error ? error.message : hubText("Verbindung zu Pinterest fehlgeschlagen."));
    }
  };

  const handleDisconnectPinterest = async () => {
    if (!window.confirm(hubText("Pinterest-Verbindung wirklich trennen?"))) return;
    setIsTestingToken(true);
    setConnectionError(null);
    const success = await pinterestService.disconnect(environment);
    setIsTestingToken(false);
    if (!success) return void setConnectionError(hubText("Pinterest-Verbindung konnte nicht getrennt werden."));
    const safeConfig: PinterestAccountConfig = { accessToken: '', isConnected: false };
    setAccountConfig(safeConfig);
    if (!isSandbox) pinterestService.saveAccountConfig(safeConfig);
    setBoards([]);
    setSelectedBoardId('');
  };

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;
    setIsSubmittingBoard(true);
    const res = await pinterestService.createBoard(newBoardName.trim(), undefined, environment);
    setIsSubmittingBoard(false);

    if (res.success && res.board) {
      setBoards([res.board, ...boards]);
      setSelectedBoardId(res.board.id);
      setIsCreatingBoard(false);
      setNewBoardName('');
    } else {
      setConnectionError(res.error || hubText("Board konnte nicht erstellt werden."));
    }
  };

  const handlePublish = async () => {
    if (!selectedBoardId) {
      setPublishError(hubText("Bitte wähle ein Pinterest Board aus."));
      return;
    }

    setIsPublishing(true);
    setPublishError(null);
    setPublishSuccess(null);

    const res = await pinterestService.publishPin(
      pin,
      selectedBoardId,
      previewDataUrl || undefined,
      environment
    );

    setIsPublishing(false);

    if (res.success && res.publishedPin) {
      setPublishSuccess({
        id: res.publishedPin.id,
        url: res.publishedPin.pin_url,
      });
      if (!isSandbox && res.environment !== 'sandbox') onPinPublished({
        pinterestBoardId: selectedBoardId,
        board: boards.find(board => board.id === selectedBoardId)?.name || pin.board,
        status: 'published',
        publishedPinId: res.publishedPin.id,
        publishedUrl: res.publishedPin.pin_url,
      });
    } else {
      setPublishError(res.error || hubText("Fehler beim Veröffentlichen des Pins."));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-rose-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/15 backdrop-blur-xs rounded-xl">
              <Pin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">{isSandbox ? 'Pinterest-Sandbox-Test' : hubText("Pinterest-Veröffentlichung")}</h3>
              <p className="text-xs text-rose-100">{isSandbox ? hubText("Test-Pin erstellen – nur für dich sichtbar") : hubText("Pin #{0} direkt auf Pinterest veröffentlichen", pin.angle.toUpperCase())}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">{hubText("Pinterest-Umgebung")}<select value={environment} disabled={isPublishing || isSubmittingBoard || isTestingToken}
              onChange={event => {
                const selected = event.target.value as PinterestEnvironment;
                setEnvironment(selected);
                try { sessionStorage.setItem('gommar_pinterest_publish_environment', selected); } catch { /* Preference is optional. */ }
              }} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50">
              <option value="production">{hubText("Produktion – Standard-Zugriff erforderlich")}</option>
              <option value="sandbox">{hubText("Sandbox – privater Test mit Trial-Zugriff")}</option>
            </select>
          </label>
          {isSandbox && (
            <div role="note" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{hubText("Testmodus: Verbinde Pinterest für die Sandbox und erstelle dort eine eigene Test-Pinnwand. Test-Pins sind nur für dich sichtbar. Die öffentliche Planung im Kalender verwendet weiterhin die Produktion.")}</div>
          )}
          {/* Pinterest Account Connection State */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <Key className="w-4 h-4 text-rose-600" />{hubText("Pinterest API v5 Authentifizierung")}</span>
              {accountConfig.isConnected ? (
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />{hubText("Verbunden")}</span>
              ) : (
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">{hubText("Nicht verbunden")}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="flex-1 text-xs text-slate-600">{hubText("Die Verbindung wird sicher über Pinterest hergestellt und automatisch erneuert.")}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={accountConfig.isConnected ? handleDisconnectPinterest : handleConnectPinterest}
                  disabled={isTestingToken || isPublishing || isSubmittingBoard}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                >
                  {isTestingToken ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
                  <span>{accountConfig.isConnected ? hubText("Verbindung trennen") : isSandbox ? hubText("Sandbox mit Pinterest verbinden") : hubText("Mit Pinterest verbinden")}</span>
                </button>
              </div>
            </div>

            {connectionError && (
              <div className="p-3 bg-rose-50 text-rose-800 rounded-lg text-xs flex items-start gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{connectionError}</span>
              </div>
            )}
          </div>

          {/* Board Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase">{hubText("Ziel-Board auf Pinterest")}</label>
              <button
                type="button"
                onClick={() => setIsCreatingBoard(!isCreatingBoard)}
                disabled={!accountConfig.isConnected || isPublishing || isSubmittingBoard || isTestingToken}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>{hubText("Neues Board erstellen")}</span>
              </button>
            </div>

            {isCreatingBoard ? (
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder={hubText("Board Name (z.B. Vital50 - Gesunder Stoffwechsel)...")}
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleCreateBoard}
                  disabled={isSubmittingBoard || isPublishing || !newBoardName.trim() || !accountConfig.isConnected}
                  className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors shrink-0 disabled:opacity-50"
                >
                  {isSubmittingBoard ? 'Erstelle...' : hubText("Speichern")}
                </button>
              </div>
            ) : (
              <select
                aria-label={hubText("Ziel-Pinnwand auf Pinterest")}
                value={selectedBoardId}
                onChange={(e) => setSelectedBoardId(e.target.value)}
                disabled={isLoadingBoards || isPublishing || isSubmittingBoard}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-rose-500 outline-hidden"
              >
                {!boards.length && <option value="">{isSandbox ? hubText("Bitte eine Test-Pinnwand erstellen") : hubText("Keine Pinnwand vorhanden")}</option>}
                {boards.map((b) => (
                  <option key={b.id} value={b.id}>
                    📌 {b.name} ({b.privacy || 'PUBLIC'})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Pin Summary Review */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 items-center">
            {previewDataUrl && (
              <div className="sm:col-span-4 aspect-[2/3] w-28 mx-auto sm:mx-0 rounded-lg overflow-hidden border border-slate-300 shadow-xs">
                <img src={previewDataUrl} alt={hubText("Pin-Vorschau")} className="w-full h-full object-cover" />
              </div>
            )}
            <div className={previewDataUrl ? 'sm:col-span-8 space-y-1.5' : 'sm:col-span-12 space-y-1.5'}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                {pin.angleLabel}
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{pin.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{pin.description}</p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-600">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate max-w-[220px] font-medium">{pin.targetUrl}</span>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {publishSuccess && (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{isSandbox ? hubText("Sandbox-Test erfolgreich: Test-Pin erstellt!") : hubText("Pin erfolgreich auf Pinterest veröffentlicht! 🎉")}</span>
              </div>
              <p className="text-xs text-emerald-700">{isSandbox ? hubText("Der Test-Pin ist nur für dich sichtbar. Dein Inhalt bleibt für eine spätere öffentliche Veröffentlichung unverändert.") : hubText("Der Pin wurde auf der gewählten Pinterest-Pinnwand erstellt.")}</p>
              <a
                href={publishSuccess.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 underline"
              >
                <span>{isSandbox ? hubText("Test-Pin auf Pinterest ansehen") : hubText("Pin auf Pinterest ansehen")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Error Banner */}
          {publishError && (
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{publishError}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-xl"
          >{hubText("Schließen")}</button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing || isTestingToken || isLoadingBoards || isSubmittingBoard || !accountConfig.isConnected || !selectedBoardId || !previewDataUrl || Boolean(publishSuccess)}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-rose-600/20 flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isSandbox ? hubText("Erstelle Test-Pin …") : hubText("Veröffentliche auf Pinterest …")}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>{isSandbox ? hubText("Test-Pin in Sandbox erstellen") : hubText("Jetzt Pin live veröffentlichen 🚀")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
