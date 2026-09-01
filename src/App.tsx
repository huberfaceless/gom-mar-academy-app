import React, { lazy, Suspense, useState, useEffect } from 'react';
import { UserProfile, Campaign, StudentRecord, Stage, AcademyTier } from './types';
import { 
  loadUserProfile, 
  saveUserProfile, 
  loadCampaigns, 
  saveCampaigns, 
  calculateLevelAndTitle,
  loadStudents,
  addOrUpdateStudentRecord,
  loadAcademyStages,
  saveAcademyStages,
  resetAcademyStagesToDefault
} from './utils/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VisitorAccessGateModal } from './components/VisitorAccessGateModal';
import { FragGommarDrawer } from './components/FragGommarDrawer';
import { CelebrationModal } from './components/CelebrationModal';
import { MembershipAccessModal } from './components/MembershipAccessModal';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { useAuth } from './context/AuthContext';
import { EmailVerificationView } from './components/EmailVerificationView';
import { AuthModal } from './components/AuthModal';
import { Loader2 } from 'lucide-react';
import gommarLogo from './assets/images/gommar_logo.jpg';
import { useLanguage } from './context/LanguageContext';
import { unlockNextAcademyStage } from './utils/academyProgress';
import {
  canAccessView,
  getAcademyStageLimit,
  requiredTierForView,
  resolveMembershipClaims,
} from './utils/membershipAccess';

const DashboardView = lazy(() => import('./components/DashboardView').then((module) => ({ default: module.DashboardView })));
const AcademyView = lazy(() => import('./components/AcademyView').then((module) => ({ default: module.AcademyView })));
const AdminDashboardView = lazy(() => import('./components/AdminDashboardView').then((module) => ({ default: module.AdminDashboardView })));
const EmailAutomationView = lazy(() => import('./components/EmailAutomationView').then((module) => ({ default: module.EmailAutomationView })));
const ToolboxView = lazy(() => import('./components/ToolboxView').then((module) => ({ default: module.ToolboxView })));
const ProgressView = lazy(() => import('./components/ProgressView').then((module) => ({ default: module.ProgressView })));
const ProfileView = lazy(() => import('./components/ProfileView').then((module) => ({ default: module.ProfileView })));
const SettingsView = lazy(() => import('./components/SettingsView').then((module) => ({ default: module.SettingsView })));
const PublicLandingView = lazy(() => import('./components/PublicLandingView').then((module) => ({ default: module.PublicLandingView })));
const ContentEngineView = lazy(() => import('./components/ContentEngine/ContentEngineView').then((module) => ({ default: module.ContentEngineView })));

function ViewLoadingFallback() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-48 items-center justify-center gap-3 text-sm font-semibold text-indigo-300">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>{t('app.loading')}</span>
    </div>
  );
}

export default function App() {
  const { user: firebaseUser, loading: authLoading, authState } = useAuth();
  const { t } = useLanguage();

  const [user, setUser] = useState<UserProfile>(() => {
    const loaded = loadUserProfile();
    return { ...loaded, tier: 'FREE', role: 'member' };
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(loadCampaigns());
  const [stages, setStages] = useState<Stage[]>(loadAcademyStages());
  const [students, setStudents] = useState<StudentRecord[]>(loadStudents());
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [membershipGate, setMembershipGate] = useState<{
    isOpen: boolean;
    mode: 'access' | 'change';
    requestedTier: AcademyTier;
  }>({ isOpen: false, mode: 'access', requestedTier: 'PRO' });

  // Auth modal toggle with mode support
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register' | 'forgot_password';
  }>({
    isOpen: false,
    mode: 'register',
  });

  // Legal Modal State (Impressum, Datenschutz, Cookies)
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalDoc, setLegalModalDoc] = useState<LegalDocType>('imprint');

  const handleOpenLegalModal = (docType: LegalDocType) => {
    setLegalModalDoc(docType);
    setIsLegalModalOpen(true);
  };

  // Deep linking state for Academy
  const [academyStageId, setAcademyStageId] = useState<number | undefined>(user.currentStageId || 1);
  const [academyLessonId, setAcademyLessonId] = useState<string | undefined>(user.currentLessonId || '1.1');
  const [toolboxCategory, setToolboxCategory] = useState<string | undefined>('content');

  // Frag GOM-MAR AI Assistant Drawer State
  const [isFragGommarOpen, setIsFragGommarOpen] = useState<boolean>(false);
  const [fragGommarInitialPrompt, setFragGommarInitialPrompt] = useState<string | undefined>(undefined);

  // Celebration Modal State
  const [celebrationModal, setCelebrationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    levelTitle?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // Keep local user profile in sync with Firebase Auth User
  useEffect(() => {
    let cancelled = false;

    if (firebaseUser) {
      void firebaseUser.getIdTokenResult().then((tokenResult) => {
        if (cancelled) return;
        const membership = resolveMembershipClaims(tokenResult.claims, firebaseUser.email);
        setUser((prev) => {
          const updated: UserProfile = {
            ...prev,
            email: firebaseUser.email || prev.email,
            name: firebaseUser.displayName || prev.name || 'GOM-MAR Mitglied',
            isRegistered: true,
            emailVerified: firebaseUser.emailVerified,
            tier: membership.tier,
            role: membership.role,
          };
          saveUserProfile(updated);
          return updated;
        });
      }).catch(() => {
        if (cancelled) return;
        setUser((prev) => {
          const updated: UserProfile = {
            ...prev,
            email: firebaseUser.email || prev.email,
            name: firebaseUser.displayName || prev.name || 'GOM-MAR Mitglied',
            isRegistered: true,
            emailVerified: firebaseUser.emailVerified,
            tier: 'FREE',
            role: 'member',
          };
          saveUserProfile(updated);
          return updated;
        });
      });
    } else {
      setUser((prev) => {
        const updated: UserProfile = {
          ...prev,
          isRegistered: false,
          emailVerified: false,
          tier: 'FREE',
          role: 'member',
        };
        saveUserProfile(updated);
        return updated;
      });
    }

    return () => {
      cancelled = true;
    };
  }, [firebaseUser]);

  // Calculate overall progress across all lessons in all modules
  const allLessons = stages.flatMap((s) => s.lessons);
  const totalTasksCount = allLessons.length;
  const completedTasksCount = user.completedTaskIds.length;
  const { level, title: levelTitle, progressPercent } = calculateLevelAndTitle(completedTasksCount, totalTasksCount);
  const academyStageLimit = getAcademyStageLimit(user.tier, user.role, stages.length);

  // Auto-sync level changes
  useEffect(() => {
    if (level !== user.level) {
      const updatedUser = { ...user, level };
      setUser(updatedUser);
      saveUserProfile(updatedUser);
    }
  }, [completedTasksCount]);

  // Handle Lesson Completion
  const handleCompleteLesson = (lessonId: string, stageId: number) => {
    if (stageId > academyStageLimit) {
      setMembershipGate({ isOpen: true, mode: 'access', requestedTier: 'PRO' });
      return;
    }

    let newCompleted = [...user.completedTaskIds];
    let isFirstCompletion = false;

    if (!newCompleted.includes(lessonId)) {
      newCompleted.push(lessonId);
      isFirstCompletion = true;
    }

    // Check if stage completed
    const stageObj = stages.find((s) => s.id === stageId);
    const stageCompleted = stageObj?.lessons.every((l) => newCompleted.includes(l.id));

    const unlockedStages = stageCompleted
      ? unlockNextAcademyStage(user.unlockedStageIds, stageId, academyStageLimit)
      : [...user.unlockedStageIds];

    // Badges update
    let badges = [...user.earnedBadges];
    if (stageCompleted && !badges.includes(`Etappe ${stageId} Meister`)) {
      badges.push(`Etappe ${stageId} Meister`);
    }

    const updatedUser: UserProfile = {
      ...user,
      completedTaskIds: newCompleted,
      unlockedStageIds: unlockedStages,
      currentStageId: stageCompleted && stageId < academyStageLimit ? stageId + 1 : stageId,
      earnedBadges: badges,
    };

    setUser(updatedUser);
    saveUserProfile(updatedUser);

    // Sync student record if registered in directory
    if (user.email) {
      addOrUpdateStudentRecord({
        name: user.name,
        email: user.email,
        completedLessonsCount: newCompleted.length,
        totalLessonsCount: totalTasksCount,
        progressPercent: Math.min(100, Math.round((newCompleted.length / totalTasksCount) * 100)),
        currentLessonId: lessonId,
        tier: user.tier,
      });
      setStudents(loadStudents());
    }

    if (isFirstCompletion) {
      setCelebrationModal({
        isOpen: true,
        title: stageCompleted
          ? t('celebration.stageTitle', { stage: stageId })
          : t('celebration.lessonTitle', { lesson: lessonId }),
        message: stageCompleted
          ? t('celebration.stageMessage', { stage: stageId })
          : t('celebration.lessonMessage'),
        levelTitle: level > user.level ? t('celebration.levelUp', { level: levelTitle }) : undefined,
      });
    }
  };

  const handleUpdateCampaigns = (updatedCampaigns: Campaign[]) => {
    setCampaigns(updatedCampaigns);
    saveCampaigns(updatedCampaigns);
  };

  const handleUpdateStages = (newStages: Stage[]) => {
    setStages(newStages);
    saveAcademyStages(newStages);
  };

  const handleResetStages = () => {
    const defaultStages = resetAcademyStagesToDefault();
    setStages(defaultStages);
  };

  const handleNavigate = (view: string, stageId?: number, lessonId?: string) => {
    if (!canAccessView(view, user.tier, user.role)) {
      setMembershipGate({
        isOpen: true,
        mode: 'access',
        requestedTier: requiredTierForView(view) || 'PREMIUM',
      });
      return;
    }

    setActiveView(view);
    if (stageId) setAcademyStageId(stageId);
    if (lessonId) setAcademyLessonId(lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToToolbox = (category?: string) => {
    if (!canAccessView('toolbox', user.tier, user.role)) {
      setMembershipGate({ isOpen: true, mode: 'access', requestedTier: 'PRO' });
      return;
    }
    setToolboxCategory(category);
    setActiveView('toolbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFragGommar = (prompt?: string) => {
    setFragGommarInitialPrompt(prompt);
    setIsFragGommarOpen(true);
  };

  const handleResetProgress = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Current active stage & lesson titles for Frag GOM-MAR context
  const currentStageObj = stages.find((s) => s.id === (academyStageId || 1));
  const currentLessonObj = currentStageObj?.lessons.find((l) => l.id === (academyLessonId || '1.1'));

  // Theme styling helper
  const themeClass = user.theme === 'cyber-slate'
    ? 'bg-slate-900 text-slate-100'
    : user.theme === 'deep-indigo'
    ? 'bg-zinc-950 text-purple-100'
    : user.theme === 'clean-light'
    ? 'bg-slate-100 text-slate-900'
    : 'bg-slate-950 text-slate-100';

  // Check if visitor is unauthenticated
  const isNotAuthenticated = !firebaseUser;
  const isEmailNotVerified = Boolean(firebaseUser && !firebaseUser.emailVerified);

  // If Auth state is still initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-700 p-1 shadow-xl overflow-hidden flex items-center justify-center animate-pulse">
          <img 
            src={gommarLogo} 
            alt="GOM-MAR Academy" 
            className="w-full h-full object-contain rounded-xl"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>GOM-MAR Academy wird initialisiert...</span>
        </div>
      </div>
    );
  }

  // If user is authenticated in Firebase but has NOT verified their email yet
  if (isEmailNotVerified) {
    return (
      <div className={`min-h-screen ${themeClass} flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 relative`}>
        <Header
          user={user}
          onOpenFragGommar={handleOpenFragGommar}
          onNavigate={handleNavigate}
          activeView={activeView}
        />
        <main className="flex-1 max-w-4xl mx-auto w-full p-4 lg:p-8 flex items-center justify-center">
          <EmailVerificationView 
            onVerificationSuccess={() => {
              setActiveView('dashboard');
            }} 
          />
        </main>
        <Footer 
          theme={user.theme} 
          onOpenLegal={handleOpenLegalModal} 
        />
        <LegalModal
          isOpen={isLegalModalOpen}
          initialDoc={legalModalDoc}
          onClose={() => setIsLegalModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClass} flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 relative`}>
      {/* Header */}
      <Header
        user={user}
        onOpenFragGommar={handleOpenFragGommar}
        onNavigate={handleNavigate}
        activeView={activeView}
      />

      {/* Main Container */}
      <div className={`flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start ${isNotAuthenticated && activeView !== 'landing' ? 'pointer-events-none select-none filter blur-[2px] opacity-70' : ''}`}>
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          onNavigate={handleNavigate}
          progressPercent={progressPercent}
          completedTasksCount={completedTasksCount}
          totalTasksCount={totalTasksCount}
          onOpenFragGommar={() => handleOpenFragGommar()}
          userRole={user.role || 'member'}
          userTier={user.tier}
        />

        {/* Content View Area */}
        <main className="flex-1 p-4 lg:p-8 w-full min-w-0">
          <Suspense fallback={<ViewLoadingFallback />}>
          {activeView === 'dashboard' && (
            <DashboardView
              user={user}
              progressPercent={progressPercent}
              completedTasksCount={completedTasksCount}
              totalTasksCount={totalTasksCount}
              onNavigate={handleNavigate}
              onOpenFragGommar={handleOpenFragGommar}
              stageAccessLimit={academyStageLimit}
            />
          )}

          {activeView === 'contentEngine' && canAccessView('contentEngine', user.tier, user.role) && (
            <ContentEngineView />
          )}

          {activeView === 'admin' && user.role === 'admin' && (
            <AdminDashboardView
              user={user}
              stages={stages}
              students={students}
              onUpdateStages={handleUpdateStages}
              onResetStages={handleResetStages}
              onNavigate={handleNavigate}
            />
          )}

          {activeView === 'academy' && (
            <AcademyView
              user={user}
              stages={stages}
              initialStageId={academyStageId}
              initialLessonId={academyLessonId}
              onCompleteLesson={handleCompleteLesson}
              onNavigateToToolbox={handleNavigateToToolbox}
              onOpenFragGommar={handleOpenFragGommar}
              stageAccessLimit={academyStageLimit}
            />
          )}

          {activeView === 'email' && canAccessView('email', user.tier, user.role) && (
            <EmailAutomationView
              campaigns={campaigns}
              onUpdateCampaigns={handleUpdateCampaigns}
              onNavigateToToolbox={handleNavigateToToolbox}
              onOpenFragGommar={handleOpenFragGommar}
            />
          )}

          {activeView === 'toolbox' && canAccessView('toolbox', user.tier, user.role) && (
            <ToolboxView
              initialCategory={toolboxCategory}
              onOpenFragGommar={handleOpenFragGommar}
            />
          )}

          {activeView === 'progress' && (
            <ProgressView
              user={user}
              completedTasksCount={completedTasksCount}
              totalTasksCount={totalTasksCount}
              progressPercent={progressPercent}
            />
          )}

          {activeView === 'profile' && (
            <ProfileView
              user={user}
              onUpdateUser={(u) => {
                setUser(u);
                saveUserProfile(u);
              }}
              progressPercent={progressPercent}
              completedTasksCount={completedTasksCount}
              onRequestTierChange={(requestedTier) => {
                setMembershipGate({ isOpen: true, mode: 'change', requestedTier });
              }}
            />
          )}

          {activeView === 'landing' && (
            <PublicLandingView
              onCancelToMemberArea={() => setActiveView('dashboard')}
              onOpenLegal={handleOpenLegalModal}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView
              user={user}
              onUpdateUser={(u) => {
                setUser(u);
                saveUserProfile(u);
              }}
              onResetProgress={handleResetProgress}
            />
          )}
          </Suspense>
        </main>
      </div>

      {/* 📜 Legal Footer (Impressum, Datenschutz, Cookie-Richtlinie) */}
      <Footer 
        theme={user.theme} 
        onOpenLegal={handleOpenLegalModal} 
      />

      {/* ⚖️ Legal Modal (DSGVO Datenschutz, Impressum, Cookie-Einstellungen) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        initialDoc={legalModalDoc}
        onClose={() => setIsLegalModalOpen(false)}
      />

      {/* 🔒 Visitor Access Lock Overlay Modal when unauthenticated */}
      {isNotAuthenticated && activeView !== 'landing' && (
        <VisitorAccessGateModal
          onOpenRegisterModal={() => setAuthModalState({ isOpen: true, mode: 'register' })}
          onOpenLoginModal={() => setAuthModalState({ isOpen: true, mode: 'login' })}
          onOpenLandingView={() => {
            setActiveView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        onClose={() => setAuthModalState((prev) => ({ ...prev, isOpen: false }))}
        initialMode={authModalState.mode}
      />

      {/* 🤖 Frag GOM-MAR AI Mentor Drawer */}
      <FragGommarDrawer
        isOpen={isFragGommarOpen}
        onClose={() => setIsFragGommarOpen(false)}
        user={user}
        initialPrompt={fragGommarInitialPrompt}
        currentStageTitle={currentStageObj?.title}
        currentLessonTitle={currentLessonObj?.title}
        onNavigate={handleNavigate}
      />

      {/* 🎉 Celebration Modal */}
      <CelebrationModal
        isOpen={celebrationModal.isOpen}
        onClose={() => setCelebrationModal((prev) => ({ ...prev, isOpen: false }))}
        title={celebrationModal.title}
        message={celebrationModal.message}
        levelTitle={celebrationModal.levelTitle}
      />

      <MembershipAccessModal
        isOpen={membershipGate.isOpen}
        mode={membershipGate.mode}
        currentTier={user.tier}
        requestedTier={membershipGate.requestedTier}
        onClose={() => setMembershipGate((prev) => ({ ...prev, isOpen: false }))}
        onOpenProfile={() => {
          setMembershipGate((prev) => ({ ...prev, isOpen: false }));
          setActiveView('profile');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 📱 Mobile Bottom Navigation Bar */}
      <BottomNav
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenFragGommar={() => handleOpenFragGommar()}
        userRole={user.role || 'member'}
        userTier={user.tier}
      />
    </div>
  );
}
