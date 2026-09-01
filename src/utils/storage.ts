import { UserProfile, Campaign, StudentRecord, Stage, Lesson } from '../types';
import { INITIAL_CAMPAIGN, ACADEMY_STAGES } from '../data/academyData';
import { migrateLegacyAcademyUnlocks } from './academyProgress';

const STORAGE_KEY_USER = 'gommar_user_profile_v1';
const STORAGE_KEY_CAMPAIGNS = 'gommar_campaigns_v1';
const STORAGE_KEY_STUDENTS = 'gommar_students_directory_v1';
const STORAGE_KEY_CUSTOM_STAGES = 'gommar_custom_stages_v1';
export const TOTAL_ACADEMY_LESSONS = ACADEMY_STAGES.reduce((total, stage) => total + stage.lessons.length, 0);
const calculateStudentProgress = (completedLessons: number) => Math.round((completedLessons / TOTAL_ACADEMY_LESSONS) * 100);

export const INITIAL_STUDENTS_LIST: StudentRecord[] = [
  {
    id: 'usr_001',
    name: 'Sarah Lindemann',
    email: 'sarah.lindemann@gmail.com',
    tier: 'PRO',
    registeredAt: '2026-08-10',
    lastActiveAt: '2026-08-15',
    completedLessonsCount: 14,
    totalLessonsCount: TOTAL_ACADEMY_LESSONS,
    progressPercent: calculateStudentProgress(14),
    currentLessonId: '2.1',
    level: 2,
    niche: 'Faceless Instagram & Reels',
    status: 'active'
  },
  {
    id: 'usr_002',
    name: 'Tobias Becker',
    email: 't.becker@web.de',
    tier: 'FREE',
    registeredAt: '2026-08-12',
    lastActiveAt: '2026-08-14',
    completedLessonsCount: 5,
    totalLessonsCount: TOTAL_ACADEMY_LESSONS,
    progressPercent: calculateStudentProgress(5),
    currentLessonId: '1.6',
    level: 1,
    niche: 'Affiliate Marketing für Einsteiger',
    status: 'active'
  },
  {
    id: 'usr_003',
    name: 'Melanie Krause',
    email: 'melanie.k@outlook.com',
    tier: 'PREMIUM',
    registeredAt: '2026-08-01',
    lastActiveAt: '2026-08-15',
    completedLessonsCount: 38,
    totalLessonsCount: TOTAL_ACADEMY_LESSONS,
    progressPercent: calculateStudentProgress(38),
    currentLessonId: '3.10',
    level: 3,
    niche: 'Digital Produkte & Skalierung',
    status: 'active'
  },
  {
    id: 'usr_004',
    name: 'Christian Meyer',
    email: 'christian.meyer@gmx.net',
    tier: 'FREE',
    registeredAt: '2026-08-14',
    lastActiveAt: '2026-08-15',
    completedLessonsCount: 1,
    totalLessonsCount: TOTAL_ACADEMY_LESSONS,
    progressPercent: calculateStudentProgress(1),
    currentLessonId: '1.2',
    level: 1,
    niche: 'Nebeneinkommen neben dem Hauptjob',
    status: 'verified'
  },
  {
    id: 'usr_005',
    name: 'Julia Wagner',
    email: 'j.wagner@icloud.com',
    tier: 'PRO',
    registeredAt: '2026-07-28',
    lastActiveAt: '2026-08-13',
    completedLessonsCount: 22,
    totalLessonsCount: TOTAL_ACADEMY_LESSONS,
    progressPercent: calculateStudentProgress(22),
    currentLessonId: '2.9',
    level: 2,
    niche: 'E-Mail Copywriting & Funnels',
    status: 'active'
  }
];

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
  activeCampaignsCount: 1,
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
    activeCampaignsCount: 1,
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
  return [INITIAL_CAMPAIGN];
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
