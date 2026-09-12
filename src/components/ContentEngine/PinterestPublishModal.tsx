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
  const [accountConfig, setAccountConfig] = useState<PinterestAccountConfig>(pinterestService.loadAccountConfig());
  const [tokenInput, setTokenInput] = useState<string>(accountConfig.accessToken || '');
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

    // Generate preview image from canvas
    const canvas = document.createElement('canvas');
    renderPinToCanvas(canvas, pin, projectSettings)
      .then(() => {
        setPreviewDataUrl(canvas.toDataURL('image/png', 0.9));
      })
      .catch((e) => console.error('Preview canvas error:', e));

    // Load boards
    loadBoards(tokenInput);
  }, [isOpen, pin, projectSettings]);

  const loadBoards = async (token: string) => {
    setIsLoadingBoards(true);
    const res = await pinterestService.getBoards(token);
    setIsLoadingBoards(false);
    if (res.success && res.boards.length > 0) {
      setBoards(res.boards);
      // Auto select matching board or first
      const match = res.boards.find((b) => b.name.toLowerCase().includes('gesundheit') || b.name.toLowerCase().includes('vital'));
      setSelectedBoardId(match ? match.id : res.boards[0].id);
    }
  };

  const handleConnectToken = async (useDemo: boolean = false) => {
    const tokenToUse = useDemo ? 'demo_vital50' : tokenInput;
    setIsTestingToken(true);
    setConnectionError(null);

    const res = await pinterestService.testConnection(tokenToUse);
    setIsTestingToken(false);

    if (res.success && res.user) {
      const updatedConfig: PinterestAccountConfig = {
        accessToken: tokenToUse,
        isConnected: true,
        username: (res.user.username as string) || 'vital50_official',
        accountType: (res.user.account_type as string) || 'BUSINESS',
        profileImage: (res.user.profile_image as string) || '',
        lastConnectedAt: new Date().toISOString(),
      };
      setAccountConfig(updatedConfig);
      pinterestService.saveAccountConfig(updatedConfig);
      loadBoards(tokenToUse);
    } else {
      setConnectionError(res.error || 'Verbindung zu Pinterest fehlgeschlagen.');
    }
  };

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return;
    setIsSubmittingBoard(true);
    const res = await pinterestService.createBoard(tokenInput, newBoardName.trim());
    setIsSubmittingBoard(false);

    if (res.success && res.board) {
      setBoards([res.board, ...boards]);
      setSelectedBoardId(res.board.id);
      setIsCreatingBoard(false);
      setNewBoardName('');
    } else {
      setConnectionError(res.error || 'Board konnte nicht erstellt werden.');
    }
  };

  const handlePublish = async () => {
    if (!selectedBoardId) {
      setPublishError('Bitte wähle ein Pinterest Board aus.');
      return;
    }

    setIsPublishing(true);
    setPublishError(null);
    setPublishSuccess(null);

    const res = await pinterestService.publishPin(
      tokenInput,
      pin,
      selectedBoardId,
      previewDataUrl || undefined
    );

    setIsPublishing(false);

    if (res.success && res.publishedPin) {
      setPublishSuccess({
        id: res.publishedPin.id,
        url: res.publishedPin.pin_url,
      });
      onPinPublished({
        status: 'published',
        publishedPinId: res.publishedPin.id,
        publishedUrl: res.publishedPin.pin_url,
      });
    } else {
      setPublishError(res.error || 'Fehler beim Veröffentlichen des Pins.');
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
              <h3 className="text-base font-bold">Pinterest-Veröffentlichung</h3>
              <p className="text-xs text-rose-100">Pin #{pin.angle.toUpperCase()} direkt auf Pinterest veröffentlichen</p>
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
          {/* Pinterest Account Connection State */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <Key className="w-4 h-4 text-rose-600" />
                Pinterest API v5 Authentifizierung
              </span>
              {accountConfig.isConnected ? (
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verbunden (@{accountConfig.username || 'vital50'})
                </span>
              ) : (
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                  Nicht verbunden
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Pinterest Personal Access Token eingeben..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:border-rose-500 outline-hidden"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => handleConnectToken(false)}
                  disabled={isTestingToken || !tokenInput}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                >
                  {isTestingToken ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />}
                  <span>Verbinden</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleConnectToken(true)}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors shrink-0"
                  title="Testet den Ablauf ohne echten API-Schlüssel"
                >
                  Demo-Modus
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
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Ziel-Board auf Pinterest
              </label>
              <button
                type="button"
                onClick={() => setIsCreatingBoard(!isCreatingBoard)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Neues Board erstellen</span>
              </button>
            </div>

            {isCreatingBoard ? (
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Board Name (z.B. Vital50 - Gesunder Stoffwechsel)..."
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleCreateBoard}
                  disabled={isSubmittingBoard || !newBoardName}
                  className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 transition-colors shrink-0 disabled:opacity-50"
                >
                  {isSubmittingBoard ? 'Erstelle...' : 'Speichern'}
                </button>
              </div>
            ) : (
              <select
                value={selectedBoardId}
                onChange={(e) => setSelectedBoardId(e.target.value)}
                disabled={isLoadingBoards}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-rose-500 outline-hidden"
              >
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
                <img src={previewDataUrl} alt="Pin-Vorschau" className="w-full h-full object-cover" />
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
                <span>Pin erfolgreich auf Pinterest veröffentlicht! 🎉</span>
              </div>
              <p className="text-xs text-emerald-700">Der Pin ist jetzt auf deinem Board sichtbar und generiert Traffic für Vital50.</p>
              <a
                href={publishSuccess.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-900 underline"
              >
                <span>Pin auf Pinterest ansehen</span>
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
          >
            Schließen
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-rose-600/20 flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Veröffentliche auf Pinterest...</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Jetzt Pin live veröffentlichen 🚀</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
