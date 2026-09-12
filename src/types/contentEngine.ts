export type CanonicalContentStatus = 
  | 'DRAFT' 
  | 'GENERATING' 
  | 'NEEDS_REVIEW' 
  | 'APPROVED' 
  | 'SCHEDULED' 
  | 'PUBLISHING' 
  | 'PUBLISHED' 
  | 'FAILED' 
  | 'CANCELLED';

// Backwards compatibility alias allowing both formats
export type ContentStatus = 
  | CanonicalContentStatus
  | 'draft' 
  | 'brief_generated' 
  | 'ai_generated' 
  | 'needs_review' 
  | 'approved' 
  | 'scheduled' 
  | 'publishing'
  | 'published' 
  | 'failed'
  | 'cancelled';

export type PublishPlatform = 'BLOG' | 'PINTEREST' | 'YOUTUBE';
export type PublishContentType = 'ARTICLE' | 'PIN' | 'VIDEO' | 'SHORT';

export type SchedulerJobStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface ProjectSettings {
  id: string;
  userId?: string;
  name: string; // e.g. "Vital50"
  websiteUrl: string; // e.g. "https://vital50.gomo-marketing.at/"
  targetAudience: string; // e.g. "Menschen 50+"
  coreTopics: string[]; // e.g. ["Gesundheit", "Ernährung", "Abnehmen", "Energie & Vitalität"]
  language: 'de' | 'en' | 'pl';
  defaultCta: string;
  defaultTargetUrl: string;
  brandVoice: string; // e.g. "Einfühlsam, wissenschaftlich fundiert, motivierend, seriös"
  pinterestBoardDefault?: string;
  youtubeChannelName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ContentBrief {
  mainKeyword: string;
  secondaryKeywords: string[];
  searchIntent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  targetAudience: string;
  suggestedTitle: string;
  metaDescription: string;
  h1: string;
  outline: {
    h2: string;
    h3s?: string[];
    keyPoints?: string[];
  }[];
  faqTopics: { question: string; answerSummary: string }[];
  cta: string;
  internalLinkingSuggestions: string[];
}

export interface BlogArticle {
  title: string;
  metaDescription: string;
  contentMarkdown: string;
  readingTimeMinutes: number;
  wordCount: number;
  status: ContentStatus;
  publishedUrl?: string;
}

export type PinAngle = 'problem' | 'solution' | 'mistake' | 'list' | 'curiosity';

export type PinTemplateStyle = 
  | 'vital50_clean' 
  | 'vital50_bold' 
  | 'vital50_list' 
  | 'vital50_quote' 
  | 'vital50_dark' 
  | 'vital50_curiosity';

export type PinColorTheme = 'emerald' | 'teal' | 'coral' | 'amber' | 'berry' | 'dark' | 'ocean';

export interface PinterestPin {
  id: string;
  angle: PinAngle;
  angleLabel: string;
  title: string;
  subHook?: string;
  bulletPoints?: string[];
  customBadge?: string;
  ctaButtonText?: string;
  customBrandText?: string;
  colorTheme?: PinColorTheme;
  description: string;
  keywords: string[];
  targetUrl: string;
  utmLink?: string;
  board: string;
  pinterestBoardId?: string;
  imagePrompt: string;
  imageUrl?: string;
  imageBase64?: string;
  templateStyle: PinTemplateStyle;
  status: ContentStatus;
  scheduledDate?: string;
  publishedPinId?: string;
  publishedUrl?: string;
  pinAnalytics?: {
    impressions?: number;
    saves?: number;
    pinClicks?: number;
    outboundClicks?: number;
  };
}

export interface PinterestBoard {
  id: string;
  name: string;
  description?: string;
  privacy?: 'PUBLIC' | 'PROTECTED' | 'SECRET';
  pinCount?: number;
}

export interface PinterestAccountConfig {
  accessToken: string;
  refreshToken?: string;
  username?: string;
  accountType?: string;
  profileImage?: string;
  isConnected: boolean;
  selectedDefaultBoardId?: string;
  lastConnectedAt?: string;
}

export interface YouTubeChapter {
  timestamp: string;
  title: string;
}

export interface YouTubeVideoData {
  title: string;
  description: string;
  keywords: string[];
  script: {
    hook: string;
    intro: string;
    mainBody: { sectionTitle: string; narrationText: string; visualCue: string }[];
    cta: string;
    outro: string;
  };
  chapters: YouTubeChapter[];
  thumbnailConcept: {
    headline: string;
    visualDescription: string;
    imagePrompt: string;
  };
  status: ContentStatus;
  scheduledDate?: string;
  videoId?: string;
  videoUrl?: string;
}

export interface YouTubeShort {
  id: string;
  shortNumber: number;
  title: string;
  hook: string;
  scriptText: string;
  description: string;
  cta: string;
  status: ContentStatus;
  scheduledDate?: string;
}

export interface CalendarItem {
  id: string;
  channel: 'blog' | 'pinterest' | 'youtube' | 'shorts';
  title: string;
  scheduledDate: string;
  status: ContentStatus;
  publishingJobId?: string;
}

export interface CentralContentProject {
  id: string;
  userId?: string;
  projectId?: string; // references ProjectSettings.id
  projectSettings: ProjectSettings;
  topic: string;
  mainKeyword?: string;
  secondaryKeywords?: string[];
  targetAudience?: string;
  searchIntent?: string;
  contentAngle?: string;
  desiredCta?: string;
  targetUrl?: string;
  affiliateLink?: string;
  language?: 'de' | 'en' | 'pl';
  brandVoice?: string;
  status?: ContentStatus;
  createdAt: string;
  updatedAt?: string;
  scheduledDate?: string;
  publishedDate?: string;

  // Generated Sub-Modules
  contentBrief?: ContentBrief;
  blogArticle?: BlogArticle;
  pinterestPins: PinterestPin[];
  youtubeVideo?: YouTubeVideoData;
  youtubeShorts?: YouTubeShort[];
  calendarItems: CalendarItem[];
  
  // Cost & Execution Logging
  logs?: {
    timestamp: string;
    action: string;
    model: string;
    tokensUsed?: number;
    status: 'success' | 'error';
    message?: string;
  }[];
}

// 📜 Server Scheduler Execution Log
export interface SchedulerExecutionLog {
  id: string;
  jobId: string;
  userId: string;
  platform: PublishPlatform;
  contentType: PublishContentType;
  startedAt: string;
  completedAt: string;
  status: CanonicalContentStatus;
  attempts: number;
  maxAttempts: number;
  lastError?: string;
  publishedAt?: string;
  publishedUrl?: string;
  externalId?: string;
  triggeredBy: 'SCHEDULER_CRON' | 'MANUAL_RUN' | 'API_TRIGGER';
}

// 📦 Central Publishing Queue Job Model
export interface PublishingJob {
  id: string;
  userId: string;
  projectId: string;
  contentProjectId: string;
  contentId: string;
  platform: PublishPlatform;
  contentType: PublishContentType;
  scheduledAt: string;
  status: CanonicalContentStatus;
  attempts: number;
  maxAttempts: number;
  lastError?: string;
  nextAttemptAt?: string;
  payload?: {
    title: string;
    description?: string;
    targetUrl?: string;
    boardId?: string;
    boardName?: string;
    imageUrl?: string;
    imageBase64?: string;
    contentMarkdown?: string;
    tags?: string[];
    accessToken?: string;
    metadata?: Record<string, any>;
  };
  publishedAt?: string;
  publishedUrl?: string;
  externalId?: string;
  // 🔒 Atomic Locking & Crash Recovery
  lockedAt?: string;
  lockedBy?: string;
  lockExpiresAt?: string;
  executionLogs?: SchedulerExecutionLog[];
  createdAt: string;
  updatedAt: string;
}

// ⏰ Central Scheduler Job Model
export interface SchedulerJob {
  id: string;
  userId: string;
  publishingJobId: string;
  scheduledAt: string;
  status: SchedulerJobStatus;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

// Result abstraction for PublishingService
export interface PublishResult {
  success: boolean;
  status: 'PUBLISHED' | 'NOT_CONNECTED' | 'NOT_IMPLEMENTED' | 'FAILED';
  externalId?: string;
  publishedUrl?: string;
  error?: string;
}

/**
 * Normalizes any ContentStatus string to the canonical uppercase format
 */
export function toCanonicalStatus(status?: string): CanonicalContentStatus {
  if (!status) return 'DRAFT';
  const s = status.toUpperCase();
  switch (s) {
    case 'BRIEF_GENERATED':
    case 'AI_GENERATED':
    case 'GENERATING':
      return 'GENERATING';
    case 'NEEDS_REVIEW':
      return 'NEEDS_REVIEW';
    case 'APPROVED':
      return 'APPROVED';
    case 'SCHEDULED':
      return 'SCHEDULED';
    case 'PUBLISHING':
      return 'PUBLISHING';
    case 'PUBLISHED':
      return 'PUBLISHED';
    case 'FAILED':
      return 'FAILED';
    case 'CANCELLED':
      return 'CANCELLED';
    default:
      return 'DRAFT';
  }
}
