import { UserProfile, Campaign, StudentRecord, Stage, Lesson } from '../types';
import { ACADEMY_STAGES } from '../data/academyData';
import { migrateLegacyAcademyUnlocks } from './academyProgress';

const STORAGE_KEY_USER = 'gommar_user_profile_v1';
const STORAGE_KEY_CAMPAIGNS = 'gommar_campaigns_v1';
const STORAGE_KEY_STUDENTS = 'gommar_students_directory_v1';
const STORAGE_KEY_CUSTOM_STAGES = 'gommar_custom_stages_v1';
export const TOTAL_ACADEMY_LESSONS = ACADEMY_STAGES.reduce((total, stage) => total + stage.lessons.length, 0);
export const INITIAL_STUDENTS_LIST: StudentRecord[] = [];

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'GOM-MAR Mitglied',
  avatarUrl: '',
  tier: 'FREE',
  role: 'member', // Default role is member
  level: 1,
  xp: 0,
  currentStageId: 1,
  currentLessonId: '1.1',
  completedTaskIds: [],
  unlockedStageIds: [1],
  leadsCount: 0,
  activeCampaignsCount: 0,
  earnedBadges: [],
  niche: 'Faceless Content & Social Media',
  targetAudience: 'Berufstätige & Einsteiger mit Wunsch nach zeitlicher Freiheit',
  offerName: 'GOM-MAR Starter Funnel',
  theme: 'clean-light',
  isRegistered: false,
  email: '',
  emailVerified: false,
  registeredAt: '',
  lastActiveAt: ''
};

export function createFreshUserProfile(name: string, email: string, tier: 'FREE' | 'PRO' | 'PREMIUM' = 'FREE', niche: string = 'Faceless Content & Social Media'): UserProfile {
  return {
    name: name.trim() || 'GOM-MAR Mitglied',
    avatarUrl: '',
    tier,
    role: 'member',
    level: 1,
    xp: 0,
    currentStageId: 1,
    currentLessonId: '1.1',
    completedTaskIds: [],
    unlockedStageIds: [1],
    leadsCount: 0,
    activeCampaignsCount: 0,
    earnedBadges: [],
    niche: niche || 'Faceless Content & Social Media',
    targetAudience: 'Interessenten für automatisiertes Online-Einkommen',
    offerName: 'Mein Faceless Funnel',
    theme: 'clean-light',
    isRegistered: false,
    email: email.trim(),
    emailVerified: false,
    registeredAt: new Date().toISOString().split('T')[0],
    lastActiveAt: new Date().toISOString().split('T')[0]
  };
}

export function loadUserProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure role exists and defaults to member if undefined
      if (!parsed.role) {
        parsed.role = 'member';
      }
      const hasLegacyUnlocks = Array.isArray(parsed.unlockedStageIds)
        && parsed.unlockedStageIds.length === 7
        && parsed.unlockedStageIds.every((stageId: unknown, index: number) => stageId === index + 1);

      if (hasLegacyUnlocks) {
        parsed.unlockedStageIds = migrateLegacyAcademyUnlocks(
          parsed.currentStageId,
          Array.isArray(parsed.completedTaskIds) ? parsed.completedTaskIds : [],
          ACADEMY_STAGES,
        );
      }

      return parsed;
    }
  } catch (e) {
    console.error('Error loading user profile:', e);
  }
  return DEFAULT_USER_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving user profile:', e);
  }
}

export function loadStudents(): StudentRecord[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading students:', e);
  }
  return INITIAL_STUDENTS_LIST;
}

export function saveStudents(students: StudentRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students:', e);
  }
}

export function addOrUpdateStudentRecord(newStudent: Partial<StudentRecord> & { name: string; email: string }): void {
  const currentStudents = loadStudents();
  const existingIdx = currentStudents.findIndex(s => s.email.toLowerCase() === newStudent.email.toLowerCase());
  
  if (existingIdx >= 0) {
    currentStudents[existingIdx] = {
      ...currentStudents[existingIdx],
      ...newStudent,
      lastActiveAt: new Date().toISOString().split('T')[0]
    };
  } else {
    const record: StudentRecord = {
      id: `usr_${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      tier: newStudent.tier || 'FREE',
      registeredAt: new Date().toISOString().split('T')[0],
      lastActiveAt: new Date().toISOString().split('T')[0],
      completedLessonsCount: newStudent.completedLessonsCount || 0,
      totalLessonsCount: newStudent.totalLessonsCount || TOTAL_ACADEMY_LESSONS,
      progressPercent: newStudent.progressPercent || 0,
      currentLessonId: newStudent.currentLessonId || '1.1',
      level: newStudent.level || 1,
      niche: newStudent.niche || 'Online-Nebeneinkommen',
      status: 'verified'
    };
    currentStudents.unshift(record);
  }
  saveStudents(currentStudents);
}

export function loadAcademyStages(): Stage[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_STAGES);
    if (saved) {
      const parsed: Stage[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading custom stages:', e);
  }
  return ACADEMY_STAGES;
}

export function saveAcademyStages(stages: Stage[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_STAGES, JSON.stringify(stages));
  } catch (e) {
    console.error('Error saving custom stages:', e);
  }
}

export function resetAcademyStagesToDefault(): Stage[] {
  try {
    localStorage.removeItem(STORAGE_KEY_CUSTOM_STAGES);
  } catch (e) {
    console.error('Error resetting custom stages:', e);
  }
  return ACADEMY_STAGES;
}

export function loadCampaigns(): Campaign[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CAMPAIGNS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading campaigns:', e);
  }
  return [];
}

export function saveCampaigns(campaigns: Campaign[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CAMPAIGNS, JSON.stringify(campaigns));
  } catch (e) {
    console.error('Error saving campaigns:', e);
  }
}

export function calculateLevelAndTitle(completedCount: number, totalCount: number = 28): { level: number; title: string; progressPercent: number } {
  const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100));
  
  if (progressPercent >= 80) {
    return { level: 5, title: 'Level 5 – Online Entrepreneur', progressPercent };
  } else if (progressPercent >= 60) {
    return { level: 4, title: 'Level 4 – Creator', progressPercent };
  } else if (progressPercent >= 40) {
    return { level: 3, title: 'Level 3 – Builder', progressPercent };
  } else if (progressPercent >= 20) {
    return { level: 2, title: 'Level 2 – Explorer', progressPercent };
  } else {
    return { level: 1, title: 'Level 1 – Starter', progressPercent };
  }
}
