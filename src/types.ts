export type AcademyTier = 'FREE' | 'PRO' | 'PREMIUM';
export type UserRole = 'member' | 'admin';

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  tier: AcademyTier;
  role?: UserRole;
  level: number;
  xp: number;
  currentStageId: number;
  currentLessonId: string;
  completedTaskIds: string[];
  unlockedStageIds: number[];
  leadsCount: number;
  activeCampaignsCount: number;
  earnedBadges: string[];
  niche: string;
  targetAudience: string;
  offerName: string;
  theme?: 'dark-emerald' | 'cyber-slate' | 'deep-indigo' | 'clean-light';
  isRegistered?: boolean;
  email?: string;
  emailVerified?: boolean;
  registeredAt?: string;
  lastActiveAt?: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  tier: AcademyTier;
  registeredAt: string;
  lastActiveAt: string;
  completedLessonsCount: number;
  totalLessonsCount: number;
  progressPercent: number;
  currentLessonId: string;
  level: number;
  niche: string;
  status: 'active' | 'inactive' | 'verified';
}

export interface Lesson {
  id: string;
  publicationStatus?: 'draft' | 'published';
  stageId: number;
  stageTitle: string;
  title: string;
  durationMinutes: number;
  description: string;
  learnContent: {
    videoTitle?: string;
    videoDuration?: string;
    videoUrl?: string;
    summaryText: string;
    bulletPoints: string[];
    fullArticleGuide?: string;
    practicalExamples?: string[];
    videoChapters?: { time: string; title: string }[];
    coreConcepts?: {
      iconName?: string;
      title: string;
      description: string;
      highlight?: boolean;
    }[];
    resources?: {
      title: string;
      subtitle: string;
      type: 'tool' | 'pdf' | 'link';
      iconName?: string;
      actionUrl?: string;
    }[];
    actionBanner?: {
      title: string;
      description: string;
      buttonText: string;
      actionUrl: string;
      iconName?: string;
    };
  };
  understandContent: {
    coreTakeaway: string;
    keyPrinciples: string[];
  };
  actionTask: {
    instruction: string;
    inputType?: 'text' | 'choice' | 'checklist' | 'link_toolbox';
    toolboxCategory?: 'content' | 'email' | 'landingpage' | 'affiliate' | 'crm' | 'settings';
    checklistItems?: string[];
    placeholder?: string;
  };
  translations?: Partial<Record<'en' | 'pl', LessonTranslation>>;
}

export interface LessonTranslation {
  title?: string;
  description?: string;
  learnContent?: Partial<Lesson['learnContent']>;
  understandContent?: Partial<Lesson['understandContent']>;
  actionTask?: Partial<Lesson['actionTask']>;
}

export interface Stage {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  badgeIcon: string;
  description: string;
  lessons: Lesson[];
}

export interface EmailMessage {
  id: string;
  campaignId: string;
  dayOffset: number; // 0 = sofort, 1 = nach 1 Tag, 2 = nach 2 Tagen, 4 = nach 4 Tagen, 7 = nach 7 Tagen
  title: string;
  subject: string;
  previewText: string;
  content: string;
  status: 'sent' | 'scheduled' | 'locked';
  requiredLessonId?: string;
  opensCount?: number;
  clicksCount?: number;
}

export interface Campaign {
  id: string;
  title: string;
  targetAudience: string;
  description: string;
  leadsCount: number;
  status: 'active' | 'draft' | 'paused';
  createdAt: string;
  emails: EmailMessage[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'gommar';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    view: 'academy' | 'email' | 'toolbox' | 'profile';
    stageId?: number;
    lessonId?: string;
  };
}

export interface PromptTemplate {
  id: string;
  category: 'Nische' | 'Content' | 'E-Mail' | 'Landingpage' | 'Mindset';
  title: string;
  description: string;
  prompt: string;
}
