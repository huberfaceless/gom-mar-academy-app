import { authenticatedFetch } from './authenticatedFetch';

export type YouTubeConnectionStatus = {
  connected: boolean;
  connectedAt: string | null;
};

export type YouTubeUploadProgress = (percent: number) => void;

const YOUTUBE_UPLOAD_CHUNK_SIZE = 8 * 1024 * 1024;

const uploadYouTubeChunk = (
  uploadUrl: string,
  file: File,
  start: number,
  onProgress: YouTubeUploadProgress,
): Promise<{ videoId?: string; nextOffset: number }> => new Promise((resolve, reject) => {
  const end = Math.min(start + YOUTUBE_UPLOAD_CHUNK_SIZE, file.size) - 1;
  const request = new XMLHttpRequest();
  request.open('PUT', uploadUrl);
  request.setRequestHeader('Content-Type', file.type || 'video/mp4');
  request.setRequestHeader('Content-Range', `bytes ${start}-${end}/${file.size}`);
  request.upload.onprogress = (event) => {
    if (event.lengthComputable) onProgress(Math.min(99, Math.round(((start + event.loaded) / file.size) * 100)));
  };
  request.onerror = () => reject(new Error('Die direkte Verbindung zu YouTube wurde während des Uploads unterbrochen. Bitte den Upload erneut starten.'));
  request.onload = () => {
    if (request.status === 308) {
      const acknowledgedRange = request.getResponseHeader('Range');
      const acknowledgedEnd = acknowledgedRange?.match(/bytes=0-(\d+)/u)?.[1];
      resolve({ nextOffset: acknowledgedEnd ? Number(acknowledgedEnd) + 1 : end + 1 });
      return;
    }
    const data = JSON.parse(request.responseText || '{}') as { id?: string; error?: { message?: string } | string };
    if (request.status < 200 || request.status >= 300 || !data.id) {
      const message = typeof data.error === 'string' ? data.error : data.error?.message;
      reject(new Error(message || `YouTube hat den Upload abgelehnt (HTTP ${request.status}).`));
      return;
    }
    resolve({ videoId: data.id, nextOffset: file.size });
  };
  request.send(file.slice(start, end + 1, file.type || 'video/mp4'));
});

export const youtubeService = {
  async getConnectionStatus(): Promise<YouTubeConnectionStatus> {
    const response = await authenticatedFetch('/api/youtube/status');
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'YouTube-Status konnte nicht geladen werden.');
    return data;
  },

  async startConnection(): Promise<void> {
    const response = await authenticatedFetch('/api/youtube/oauth/start', { method: 'POST' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.authorizationUrl) {
      throw new Error(data.error || 'YouTube-Verbindung konnte nicht gestartet werden.');
    }
    window.location.assign(data.authorizationUrl);
  },

  async disconnect(): Promise<void> {
    const response = await authenticatedFetch('/api/youtube/connection', { method: 'DELETE' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'YouTube-Verbindung konnte nicht getrennt werden.');
  },

  async uploadUnlistedVideo(
    file: File,
    metadata: { title: string; description: string; tags: string[] },
    onProgress: YouTubeUploadProgress,
  ): Promise<{ videoId: string; videoUrl: string }> {
    if (file.size <= 0) throw new Error('Die Videodatei ist leer.');
    const sessionResponse = await authenticatedFetch('/api/youtube/uploads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...metadata,
        contentType: file.type || 'video/mp4',
        contentLength: file.size,
      }),
    });
    const session = await sessionResponse.json().catch(() => ({}));
    if (!sessionResponse.ok || !session.uploadUrl) {
      throw new Error(session.error || 'Der YouTube-Upload konnte nicht gestartet werden.');
    }

    let offset = 0;
    let videoId = '';
    while (offset < file.size) {
      const result = await uploadYouTubeChunk(session.uploadUrl, file, offset, onProgress);
      if (result.nextOffset <= offset) throw new Error('YouTube hat den Upload-Fortschritt nicht bestätigt.');
      offset = result.nextOffset;
      if (result.videoId) videoId = result.videoId;
    }
    if (!videoId) throw new Error('YouTube hat den Upload nicht mit einer Video-ID bestätigt.');
    onProgress(100);
    return { videoId, videoUrl: `https://www.youtube.com/watch?v=${videoId}` };
  },
};
