import { authenticatedFetch } from './authenticatedFetch';

export type YouTubeConnectionStatus = {
  connected: boolean;
  connectedAt: string | null;
};

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
};
