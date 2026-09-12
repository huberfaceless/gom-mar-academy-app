import { authenticatedFetch } from './authenticatedFetch';

export type YouTubeConnectionStatus = {
  connected: boolean;
  connectedAt: string | null;
};

export type YouTubeUploadProgress = (percent: number) => void;

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

    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('PUT', session.uploadUrl);
      request.setRequestHeader('Content-Type', file.type || 'video/mp4');
      request.upload.onprogress = (event) => {
        if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
      };
      request.onerror = () => reject(new Error('Die Verbindung zu YouTube wurde während des Uploads unterbrochen.'));
      request.onload = () => {
        const data = JSON.parse(request.responseText || '{}') as { id?: string; error?: { message?: string } };
        if (request.status < 200 || request.status >= 300 || !data.id) {
          reject(new Error(data.error?.message || `YouTube hat den Upload abgelehnt (HTTP ${request.status}).`));
          return;
        }
        resolve({ videoId: data.id, videoUrl: `https://www.youtube.com/watch?v=${data.id}` });
      };
      request.send(file);
    });
  },
};
