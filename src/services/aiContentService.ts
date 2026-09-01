import { 
  ProjectSettings, 
  ContentBrief, 
  BlogArticle, 
  PinterestPin, 
  YouTubeVideoData, 
  YouTubeShort 
} from '../types/contentEngine';
import { authenticatedFetch } from './authenticatedFetch';

export class AIContentService {
  /**
   * 1. Generate Structured Content Brief
   */
  static async generateContentBrief(
    topic: string,
    projectSettings: ProjectSettings,
    customAngle?: string,
    targetUrl?: string,
    cta?: string
  ): Promise<{ brief: ContentBrief; rawText?: string }> {
    const response = await authenticatedFetch('/api/content-engine/brief', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        projectSettings,
        customAngle,
        targetUrl: targetUrl || projectSettings.defaultTargetUrl,
        cta: cta || projectSettings.defaultCta,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Netzwerkfehler' }));
      throw new Error(err.error || `HTTP ${response.status}: Fehler beim Erstellen des Content Briefs.`);
    }

    const data = await response.json();
    if (!data.brief) {
      throw new Error('Ungültiges Antwortformat vom Server erhalten.');
    }

    return { brief: data.brief, rawText: data.raw };
  }

  /**
   * 2. Generate Full Blog Article from Content Brief
   */
  static async generateBlogArticle(
    topic: string,
    brief: ContentBrief,
    projectSettings: ProjectSettings
  ): Promise<BlogArticle> {
    const response = await authenticatedFetch('/api/content-engine/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        brief,
        projectSettings,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Netzwerkfehler' }));
      throw new Error(err.error || `HTTP ${response.status}: Fehler beim Erstellen des Blogartikels.`);
    }

    const data = await response.json();
    if (!data.article) {
      throw new Error('Ungültige Artikeldaten empfangen.');
    }

    return {
      title: data.article.title || brief.suggestedTitle || brief.h1,
      metaDescription: data.article.metaDescription || brief.metaDescription,
      contentMarkdown: data.article.contentMarkdown || '',
      readingTimeMinutes: data.article.readingTimeMinutes || 5,
      wordCount: data.article.wordCount || 1000,
      status: 'ai_generated',
    };
  }

  /**
   * 3. Generate 5 Distinct Pinterest Pins (Problem, Solution, Mistake, List, Curiosity)
   */
  static async generatePinterestPins(
    topic: string,
    brief: ContentBrief,
    projectSettings: ProjectSettings
  ): Promise<PinterestPin[]> {
    const response = await authenticatedFetch('/api/content-engine/pins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        brief,
        projectSettings,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Netzwerkfehler' }));
      throw new Error(err.error || `HTTP ${response.status}: Fehler beim Erstellen der Pinterest Pins.`);
    }

    const data = await response.json();
    const rawPins = data.pins || [];

    return rawPins.map((p: any, idx: number) => ({
      id: `pin_${Date.now()}_${idx + 1}`,
      angle: p.angle || 'solution',
      angleLabel: p.angleLabel || `Pin ${idx + 1}`,
      title: p.title || `${topic} - Tipp ${idx + 1}`,
      description: p.description || '',
      keywords: Array.isArray(p.keywords) ? p.keywords : [],
      targetUrl: p.targetUrl || projectSettings.defaultTargetUrl,
      board: p.board || projectSettings.pinterestBoardDefault || 'Vital50',
      imagePrompt: p.imagePrompt || `Fotorealistisches 1080x1620 Pinterest-Bild zum Thema ${topic}`,
      templateStyle: p.templateStyle || 'vital50_clean',
      status: 'ai_generated',
    }));
  }

  /**
   * 4. Generate YouTube Faceless Video Script & Metadata
   */
  static async generateYouTubeScript(
    topic: string,
    brief: ContentBrief,
    projectSettings: ProjectSettings
  ): Promise<YouTubeVideoData> {
    const response = await authenticatedFetch('/api/content-engine/youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        brief,
        projectSettings,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Netzwerkfehler' }));
      throw new Error(err.error || `HTTP ${response.status}: Fehler beim Erstellen des YouTube Skripts.`);
    }

    const data = await response.json();
    if (!data.video) {
      throw new Error('Ungültige YouTube-Skriptdaten empfangen.');
    }

    return {
      title: data.video.title || topic,
      description: data.video.description || '',
      keywords: Array.isArray(data.video.keywords) ? data.video.keywords : [],
      script: data.video.script || {
        hook: '',
        intro: '',
        mainBody: [],
        cta: '',
        outro: '',
      },
      chapters: Array.isArray(data.video.chapters) ? data.video.chapters : [],
      thumbnailConcept: data.video.thumbnailConcept || {
        headline: '',
        visualDescription: '',
        imagePrompt: '',
      },
      status: 'ai_generated',
    };
  }

  /**
   * 5. Generate 3 YouTube Shorts
   */
  static async generateYouTubeShorts(
    topic: string,
    brief: ContentBrief,
    projectSettings: ProjectSettings
  ): Promise<YouTubeShort[]> {
    const response = await authenticatedFetch('/api/content-engine/shorts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        brief,
        projectSettings,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: 'Netzwerkfehler' }));
      throw new Error(err.error || `HTTP ${response.status}: Fehler beim Erstellen der YouTube Shorts.`);
    }

    const data = await response.json();
    const rawShorts = data.shorts || [];

    return rawShorts.map((s: any, idx: number) => ({
      id: `short_${Date.now()}_${idx + 1}`,
      shortNumber: s.shortNumber || idx + 1,
      title: s.title || `Short #${idx + 1}: ${topic}`,
      hook: s.hook || '',
      scriptText: s.scriptText || '',
      description: s.description || '',
      cta: s.cta || projectSettings.defaultCta,
      status: 'ai_generated',
    }));
  }
}
