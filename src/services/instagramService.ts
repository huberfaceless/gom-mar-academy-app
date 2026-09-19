import { authenticatedFetch } from './authenticatedFetch';

export type InstagramConnectionStatus = {
  connected: boolean;
  connectedAt?: string | null;
  username?: string | null;
};

export const instagramService = {
  async startOAuth(): Promise<void> {
    const response = await authenticatedFetch('/api/instagram/oauth/start', { method: 'POST' });
    const data = await response.json();
    if (!response.ok || !data.authorizationUrl) {
      throw new Error(data.error || 'Instagram-Verbindung konnte nicht gestartet werden.');
    }
    window.location.assign(data.authorizationUrl);
  },

  async getConnectionStatus(): Promise<InstagramConnectionStatus> {
    const response = await authenticatedFetch('/api/instagram/connection/status');
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Instagram-Status konnte nicht geladen werden.');
    return data;
  },

  async disconnect(): Promise<void> {
    const response = await authenticatedFetch('/api/instagram/connection', { method: 'DELETE' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Instagram-Verbindung konnte nicht getrennt werden.');
  },

  async publishImage(input: { caption: string; imageBase64: string }): Promise<{ id: string; url: string }> {
    const response = await authenticatedFetch('/api/instagram/publish-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.publishedMedia) {
      throw new Error(data.error || 'Instagram-Beitrag konnte nicht veröffentlicht werden.');
    }
    return data.publishedMedia;
  },
};
