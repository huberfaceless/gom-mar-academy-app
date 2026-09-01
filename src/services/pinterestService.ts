import { PinterestAccountConfig, PinterestBoard, PinterestPin } from '../types/contentEngine';
import { authenticatedFetch } from './authenticatedFetch';

const PINTEREST_STORAGE_KEY = 'gommar_pinterest_account_config';

export const pinterestService = {
  /**
   * Load stored Pinterest Account settings
   */
  loadAccountConfig(): PinterestAccountConfig {
    try {
      const stored = localStorage.getItem(PINTEREST_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse pinterest account config:', e);
    }
    return {
      accessToken: '',
      isConnected: false,
    };
  },

  /**
   * Save Pinterest Account settings
   */
  saveAccountConfig(config: PinterestAccountConfig): void {
    try {
      localStorage.setItem(PINTEREST_STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save pinterest account config:', e);
    }
  },

  /**
   * Test connection with Pinterest
   */
  async testConnection(accessToken: string): Promise<{ success: boolean; user?: Record<string, unknown>; error?: string }> {
    try {
      const res = await authenticatedFetch('/api/pinterest/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Verbindung fehlgeschlagen.' };
      }
      return { success: true, user: data.user };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Netzwerkfehler bei Pinterest-Verbindung.';
      return { success: false, error: msg };
    }
  },

  /**
   * Get user's Pinterest boards
   */
  async getBoards(accessToken: string): Promise<{ success: boolean; boards: PinterestBoard[]; error?: string }> {
    try {
      const res = await authenticatedFetch('/api/pinterest/boards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, boards: [], error: data.error || 'Boards konnten nicht geladen werden.' };
      }
      return { success: true, boards: data.boards || [] };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Fehler beim Laden der Boards.';
      return { success: false, boards: [], error: msg };
    }
  },

  /**
   * Create new Pinterest Board
   */
  async createBoard(accessToken: string, name: string, description?: string): Promise<{ success: boolean; board?: PinterestBoard; error?: string }> {
    try {
      const res = await authenticatedFetch('/api/pinterest/create-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, name, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Board konnte nicht erstellt werden.' };
      }
      return { success: true, board: data.board };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Fehler beim Erstellen des Boards.';
      return { success: false, error: msg };
    }
  },

  /**
   * Publish Pin to Pinterest
   */
  async publishPin(
    accessToken: string,
    pinData: PinterestPin,
    boardId: string,
    imageBase64?: string
  ): Promise<{ success: boolean; publishedPin?: { id: string; pin_url: string; title: string }; error?: string }> {
    try {
      const res = await authenticatedFetch('/api/pinterest/publish-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken,
          boardId,
          pinData: {
            ...pinData,
            imageBase64,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Veröffentlichung fehlgeschlagen.' };
      }
      return { success: true, publishedPin: data.publishedPin };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Fehler beim Veröffentlichen.';
      return { success: false, error: msg };
    }
  },

  /**
   * Optimize Image Prompt with AI
   */
  async optimizeImagePrompt(topic: string, prompt: string, angle?: string): Promise<{ success: boolean; optimizedPrompt?: string; stockKeywords?: string[] }> {
    try {
      const res = await authenticatedFetch('/api/pinterest/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, prompt, angle }),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        return {
          success: true,
          optimizedPrompt: data.data.optimizedPrompt,
          stockKeywords: data.data.stockSearchKeywords,
        };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  }
};
