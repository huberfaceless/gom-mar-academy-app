import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  deleteDoc, 
  updateDoc,
  runTransaction
} from 'firebase/firestore';
import { db, isFirestoreOperational, handleFirestoreError } from '../firebase/config';
import { 
  ProjectSettings, 
  CentralContentProject, 
  PublishingJob, 
  SchedulerJob, 
  toCanonicalStatus 
} from '../types/contentEngine';
import { 
  loadAllProjectSettings, 
  saveAllProjectSettings,
  loadAllContentProjects, 
  saveAllContentProjects, 
  loadAllPublishingJobs,
  saveAllPublishingJobs,
  loadAllSchedulerJobs,
  saveAllSchedulerJobs,
  createStarterProjects,
  migrateLegacyContentStorage,
  removeContentProjectLocally,
} from '../utils/contentStorage';

import { planContentProjectRemoval } from '../utils/contentProjectRemoval';
import { canUseContentProject } from '../utils/contentProjectAccess';

const COLLECTION_PROJECTS = 'projects';
const COLLECTION_CONTENT_PROJECTS = 'contentProjects';
const COLLECTION_PUBLISHING_JOBS = 'publishingJobs';
const COLLECTION_SCHEDULER_JOBS = 'schedulerJobs';
const FIRESTORE_WRITE_TIMEOUT_MS = 8000;

function rethrowFirestoreWriteError(err: unknown): never {
  handleFirestoreError(err);
  throw new Error('Die Änderung wurde lokal gesichert, aber von der Cloud nicht bestätigt. Bitte erneut versuchen.');
}

async function firestoreWithTimeout<T>(promise: Promise<T>, timeoutMs: number = 2000): Promise<T> {
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error('Firestore operation timed out')), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutHandle));
}

export class FirestoreContentService {

  // ==========================================
  // 1. BRAND / PROJECT SETTINGS
  // ==========================================

  static async getProjectSettings(userId?: string, isAdmin = false): Promise<ProjectSettings[]> {
    if (!userId || !isFirestoreOperational()) {
      return loadAllProjectSettings(userId, isAdmin);
    }

    try {
      const q = query(collection(db, COLLECTION_PROJECTS), where('userId', '==', userId));
      const snapshot = await firestoreWithTimeout(getDocs(q), 1500);
      const saved = snapshot.docs.map((d) => ({ ...(d.data() as ProjectSettings), id: d.id }));
      const visible = saved.filter(project => !project.deletedAt && canUseContentProject(project, isAdmin));
      if (saved.some(project => project.deletedAt) && visible.length === 0) {
        saveAllProjectSettings(saved, userId);
        return [];
      }
      if (visible.length > 0) {
        saveAllProjectSettings(saved, userId);
        return visible;
      }
      const initial = createStarterProjects(userId, isAdmin);
      for (const project of initial) {
        await setDoc(doc(db, COLLECTION_PROJECTS, project.id), project);
      }
      saveAllProjectSettings([...saved, ...initial], userId);
      return initial;
    } catch (err) {
      handleFirestoreError(err);
      return loadAllProjectSettings(userId, isAdmin);
    }
  }

  static async saveProjectSettings(userId: string | undefined, settings: ProjectSettings, isAdmin = false): Promise<void> {
    if (!userId) return;
    
    if (!canUseContentProject(settings, isAdmin)) throw new Error('Vital50 steht ausschließlich Administratoren zur Verfügung.');

    // Always save locally first
    const current = loadAllProjectSettings(userId, isAdmin);
    const idx = current.findIndex(p => p.id === settings.id);
    if (idx >= 0) {
      current[idx] = settings;
    } else {
      current.push(settings);
    }
    saveAllProjectSettings(current, userId);

    if (!isFirestoreOperational()) return;

    try {
      const docRef = doc(db, COLLECTION_PROJECTS, settings.id);
      const dataToSave = {
        ...settings,
        userId,
        updatedAt: new Date().toISOString(),
      };
      await firestoreWithTimeout(setDoc(docRef, dataToSave, { merge: true }), FIRESTORE_WRITE_TIMEOUT_MS);
    } catch (err) {
      rethrowFirestoreWriteError(err);
    }
  }

  // ==========================================
  // 2. CENTRAL CONTENT PROJECTS
  // ==========================================

  static async getContentProjects(userId?: string): Promise<CentralContentProject[]> {
    if (!userId || !isFirestoreOperational()) {
      return loadAllContentProjects(userId);
    }

    try {
      const q = query(collection(db, COLLECTION_CONTENT_PROJECTS), where('userId', '==', userId));
      const snapshot = await firestoreWithTimeout(getDocs(q), 1500);
      const list = snapshot.docs.map((d) => ({ ...(d.data() as CentralContentProject), id: d.id }));
      saveAllContentProjects(list, userId);
      return loadAllContentProjects(userId);
    } catch (err) {
      handleFirestoreError(err);
      return loadAllContentProjects(userId);
    }
  }

  static async getContentProjectById(userId: string | undefined, contentProjectId: string): Promise<CentralContentProject | null> {
    if (!userId || !isFirestoreOperational()) {
      const list = loadAllContentProjects(userId);
      return list.find((p) => p.id === contentProjectId) || null;
    }

    try {
      const docRef = doc(db, COLLECTION_CONTENT_PROJECTS, contentProjectId);
      const snap = await firestoreWithTimeout(getDoc(docRef), 1500);
      if (snap.exists() && !snap.data()?.deletedAt && snap.data()?.userId === userId) {
        return { ...(snap.data() as CentralContentProject), id: snap.id };
      }
      return null;
    } catch (err) {
      handleFirestoreError(err);
      const list = loadAllContentProjects(userId);
      return list.find((p) => p.id === contentProjectId) || null;
    }
  }

  static async saveContentProject(userId: string | undefined, project: CentralContentProject): Promise<void> {
    const dataToSave: CentralContentProject = {
      ...project,
      userId: userId || project.userId,
      updatedAt: new Date().toISOString(),
    };

    // Always update local cache for responsiveness
    const current = loadAllContentProjects(userId);
    const idx = current.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      current[idx] = dataToSave;
    } else {
      current.unshift(dataToSave);
    }
    saveAllContentProjects(current, userId);

    if (userId && isFirestoreOperational()) {
      try {
        const docRef = doc(db, COLLECTION_CONTENT_PROJECTS, project.id);
        const serialized = JSON.parse(JSON.stringify(dataToSave));
        await firestoreWithTimeout(setDoc(docRef, serialized, { merge: true }), FIRESTORE_WRITE_TIMEOUT_MS);
      } catch (err) {
        rethrowFirestoreWriteError(err);
      }
    }
  }

  static async deleteProjectSettings(userId: string | undefined, projectId: string): Promise<void> {
    await this.removeProject(userId, projectId);
  }

  static async deleteContentProject(userId: string | undefined, contentProjectId: string): Promise<void> {
    const content = await this.getContentProjectById(userId, contentProjectId);
    if (!content) throw new Error('Das Inhaltsprojekt wurde nicht gefunden. Bitte die Seite neu laden.');
    await this.removeProject(userId, content.projectSettings.id, contentProjectId);
  }

  private static async removeProject(userId: string | undefined, projectId: string, contentProjectId?: string): Promise<void> {
    if (userId) {
      if (!isFirestoreOperational()) throw new Error('Zum Entfernen bitte eine Verbindung zur Cloud herstellen.');
      const snapshots = await Promise.all([COLLECTION_CONTENT_PROJECTS, COLLECTION_PUBLISHING_JOBS, COLLECTION_SCHEDULER_JOBS].map(name =>
        firestoreWithTimeout(getDocs(query(collection(db, name), where('userId', '==', userId))), FIRESTORE_WRITE_TIMEOUT_MS)));
      const projectRef = doc(db, COLLECTION_PROJECTS, projectId);
      const initialPlan = planContentProjectRemoval(projectId, contentProjectId,
        snapshots[0].docs.map(d => ({ ...d.data(), id: d.id } as CentralContentProject)),
        snapshots[1].docs.map(d => ({ ...d.data(), id: d.id } as PublishingJob)),
        snapshots[2].docs.map(d => ({ ...d.data(), id: d.id } as SchedulerJob)));
      const selections = [initialPlan.contentIds, initialPlan.jobIds, initialPlan.schedulerIds];
      const refs = snapshots.flatMap((snapshot, index) => snapshot.docs.filter(d => selections[index].has(d.id)).map(d => d.ref));
      if (refs.length > 450) throw new Error('Zu viele gespeicherte Einträge für eine sichere gemeinsame Löschung. Bitte zuerst abgeschlossene Warteschlangen-Einträge entfernen.');
      // Re-read inside the transaction: a publisher claiming a queued job causes a
      // retry, where the new lock blocks removal before any document is changed.
      const removed = await firestoreWithTimeout(runTransaction(db, async transaction => {
        const [project, ...documents] = await Promise.all([projectRef, ...refs].map(ref => transaction.get(ref)));
        if (!project.exists() || project.data().userId !== userId) throw new Error('Das Projekt wurde nicht gefunden oder gehört einem anderen Konto.');
        const contents: CentralContentProject[] = [];
        const jobs: PublishingJob[] = [];
        const schedulers: SchedulerJob[] = [];
        for (const d of documents) {
          if (!d.exists()) continue;
          if (d.data().userId !== userId) throw new Error('Ein Eintrag gehört einem anderen Konto.');
          const data = { ...d.data(), id: d.id };
          if (d.ref.parent.id === COLLECTION_CONTENT_PROJECTS) contents.push(data as CentralContentProject);
          if (d.ref.parent.id === COLLECTION_PUBLISHING_JOBS) jobs.push(data as PublishingJob);
          if (d.ref.parent.id === COLLECTION_SCHEDULER_JOBS) schedulers.push(data as SchedulerJob);
        }
        const plan = planContentProjectRemoval(projectId, contentProjectId, contents, jobs, schedulers);
        const deletedAt = new Date().toISOString();
        if (!contentProjectId) transaction.update(projectRef, { deletedAt });
        for (const d of documents) {
          if (!d.exists()) continue;
          if (d.ref.parent.id === COLLECTION_CONTENT_PROJECTS && plan.contentIds.has(d.id)) transaction.update(d.ref, { deletedAt });
          if (d.ref.parent.id === COLLECTION_PUBLISHING_JOBS && plan.jobIds.has(d.id)) transaction.delete(d.ref);
          if (d.ref.parent.id === COLLECTION_SCHEDULER_JOBS && plan.schedulerIds.has(d.id)) transaction.delete(d.ref);
        }
        return plan;
      }), FIRESTORE_WRITE_TIMEOUT_MS);
      // Remove stale cached locks only after the authoritative transaction succeeds.
      saveAllPublishingJobs(loadAllPublishingJobs(userId).filter(j => !removed.jobIds.has(j.id)), userId);
      saveAllSchedulerJobs(loadAllSchedulerJobs(userId).filter(j => !removed.schedulerIds.has(j.id)), userId);
    }
    removeContentProjectLocally(projectId, contentProjectId, userId);
  }

  // ==========================================
  // 3. PUBLISHING QUEUE JOBS
  // ==========================================

  static async getPublishingJobs(userId?: string, contentProjectId?: string): Promise<PublishingJob[]> {
    if (!userId) return [];

    try {
      let q = query(collection(db, COLLECTION_PUBLISHING_JOBS), where('userId', '==', userId));
      const snapshot = await firestoreWithTimeout(getDocs(q), 1500);
      let list = snapshot.docs.map((d) => ({ ...(d.data() as PublishingJob), id: d.id }));
      if (contentProjectId) {
        list = list.filter((j) => j.contentProjectId === contentProjectId);
      }
      saveAllPublishingJobs(list, userId);
      return list.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
    } catch (err) {
      handleFirestoreError(err);
      throw new Error('Die Veröffentlichungswarteschlange konnte nicht aus Firestore geladen werden.');
    }
  }

  static async savePublishingJob(userId: string, job: PublishingJob): Promise<void> {
    const dataToSave = {
      ...job,
      userId,
      updatedAt: new Date().toISOString(),
    };

    try {
      const docRef = doc(db, COLLECTION_PUBLISHING_JOBS, job.id);
      const serialized = JSON.parse(JSON.stringify(dataToSave));
      await firestoreWithTimeout(setDoc(docRef, serialized, { merge: true }), FIRESTORE_WRITE_TIMEOUT_MS);
    } catch (err) {
      rethrowFirestoreWriteError(err);
    }

    const current = loadAllPublishingJobs(userId);
    const idx = current.findIndex((j) => j.id === job.id);
    if (idx >= 0) {
      current[idx] = dataToSave;
    } else {
      current.unshift(dataToSave);
    }
    saveAllPublishingJobs(current, userId);
  }

  static async updatePinterestJobBoard(userId: string, jobId: string, boardId: string, boardName: string): Promise<void> {
    if (!userId || !boardId.trim()) throw new Error('Bitte wähle eine Ziel-Pinnwand auf Pinterest aus.');
    const updatedAt = new Date().toISOString();
    let payload: PublishingJob['payload'];
    await firestoreWithTimeout(runTransaction(db, async transaction => {
      const jobRef = doc(db, COLLECTION_PUBLISHING_JOBS, jobId);
      const snapshot = await transaction.get(jobRef);
      if (!snapshot.exists()) throw new Error('Der Veröffentlichungsauftrag wurde nicht gefunden.');
      const job = snapshot.data() as PublishingJob;
      if (job.userId !== userId) throw new Error('Dieser Veröffentlichungsauftrag gehört nicht zu deinem Konto.');
      if (job.platform !== 'PINTEREST' || job.contentType !== 'PIN') throw new Error('Dieser Auftrag ist kein Pinterest-Pin.');
      if (!['DRAFT', 'SCHEDULED', 'NEEDS_REVIEW'].includes(job.status)
        || job.publicationUncertain || job.externalId || job.publishedAt
        || job.lockedAt || job.lockedBy || job.lockExpiresAt) {
        throw new Error('Nur wartende, unveröffentlichte Pinterest-Aufträge können geändert werden. Bitte aktualisiere die Ansicht.');
      }
      payload = { ...job.payload, boardId: boardId.trim(), boardName };
      transaction.update(jobRef, { payload, updatedAt });
    }), FIRESTORE_WRITE_TIMEOUT_MS);
    saveAllPublishingJobs(loadAllPublishingJobs(userId).map(job => job.id === jobId
      ? { ...job, payload, updatedAt } : job), userId);
  }

  static async reschedulePublishingJob(userId: string, jobId: string, scheduledAt: string): Promise<void> {
    const date = new Date(scheduledAt);
    if (!userId || !Number.isFinite(date.getTime())) {
      throw new Error('Bitte wähle ein gültiges Datum und eine gültige Uhrzeit.');
    }
    const normalizedDate = date.toISOString();
    const schedulerSnapshot = await firestoreWithTimeout(getDocs(query(
      collection(db, COLLECTION_SCHEDULER_JOBS), where('userId', '==', userId),
    )), FIRESTORE_WRITE_TIMEOUT_MS);
    const schedulerRefs = schedulerSnapshot.docs
      .filter(snapshot => snapshot.data().publishingJobId === jobId)
      .map(snapshot => doc(db, COLLECTION_SCHEDULER_JOBS, snapshot.id));
    const updatedAt = new Date().toISOString();
    await firestoreWithTimeout(runTransaction(db, async transaction => {
      const jobRef = doc(db, COLLECTION_PUBLISHING_JOBS, jobId);
      const snapshot = await transaction.get(jobRef);
      if (!snapshot.exists()) throw new Error('Der Veröffentlichungsauftrag wurde nicht gefunden.');
      const job = snapshot.data() as PublishingJob;
      if (job.userId !== userId) throw new Error('Dieser Veröffentlichungsauftrag gehört nicht zu deinem Konto.');
      if (job.status !== 'SCHEDULED' || job.publishedAt || job.externalId) {
        throw new Error('Nur wartende Aufträge können verschoben werden. Der Auftrag wird möglicherweise bereits veröffentlicht.');
      }
      const schedulerDocuments = await Promise.all(schedulerRefs.map(ref => transaction.get(ref)));
      for (const scheduler of schedulerDocuments) {
        if (!scheduler.exists()) continue;
        const data = scheduler.data() as SchedulerJob;
        if (data.userId !== userId || data.publishingJobId !== jobId || data.status !== 'PENDING') {
          throw new Error('Der Scheduler-Auftrag kann nicht mehr verschoben werden. Bitte aktualisiere die Ansicht.');
        }
      }
      transaction.update(jobRef, { scheduledAt: normalizedDate, updatedAt });
      for (let index = 0; index < schedulerDocuments.length; index++) {
        if (schedulerDocuments[index].exists()) {
          transaction.update(schedulerRefs[index], { scheduledAt: normalizedDate, updatedAt });
        }
      }
    }), FIRESTORE_WRITE_TIMEOUT_MS);
    // Lokale Spiegel erst nach der bestätigten gemeinsamen Cloud-Aktualisierung ändern.
    saveAllPublishingJobs(loadAllPublishingJobs(userId).map(job => job.id === jobId
      ? { ...job, scheduledAt: normalizedDate, updatedAt } : job), userId);
    saveAllSchedulerJobs(loadAllSchedulerJobs(userId).map(job => job.publishingJobId === jobId
      ? { ...job, scheduledAt: normalizedDate, updatedAt } : job), userId);
  }

  static async updatePublishingJobStatus(
    userId: string,
    jobId: string,
    status: PublishingJob['status'],
    lastError?: string,
    extraFields?: Partial<PublishingJob>
  ): Promise<void> {
    const current = loadAllPublishingJobs(userId);
    const idx = current.findIndex((j) => j.id === jobId);
    if (idx >= 0) {
      current[idx] = {
        ...current[idx],
        status,
        updatedAt: new Date().toISOString(),
        lastError: lastError !== undefined ? lastError : current[idx].lastError,
        ...extraFields,
      };
      saveAllPublishingJobs(current, userId);
    }

    try {
      const docRef = doc(db, COLLECTION_PUBLISHING_JOBS, jobId);
      const updateData: Record<string, any> = {
        status,
        updatedAt: new Date().toISOString(),
        ...extraFields,
      };
      if (lastError !== undefined) {
        updateData.lastError = lastError;
      }
      await firestoreWithTimeout(updateDoc(docRef, updateData), FIRESTORE_WRITE_TIMEOUT_MS);
    } catch (err) {
      rethrowFirestoreWriteError(err);
    }
  }

  static async deletePublishingJob(userId: string, jobId: string): Promise<void> {
    try {
      await firestoreWithTimeout(deleteDoc(doc(db, COLLECTION_PUBLISHING_JOBS, jobId)), FIRESTORE_WRITE_TIMEOUT_MS);
    } catch (err) {
      rethrowFirestoreWriteError(err);
    }
    const current = loadAllPublishingJobs(userId).filter((j) => j.id !== jobId);
    saveAllPublishingJobs(current, userId);
  }

  // ==========================================
  // 4. SCHEDULER JOBS
  // ==========================================

  static async getSchedulerJobs(userId?: string): Promise<SchedulerJob[]> {
    if (!userId) return [];

    try {
      const q = query(collection(db, COLLECTION_SCHEDULER_JOBS), where('userId', '==', userId));
      const snapshot = await firestoreWithTimeout(getDocs(q), 1500);
      const list = snapshot.docs.map((d) => ({ ...(d.data() as SchedulerJob), id: d.id }));
      saveAllSchedulerJobs(list, userId);
      return list;
    } catch (err) {
      handleFirestoreError(err);
      throw new Error('Die Scheduler-Aufträge konnten nicht aus Firestore geladen werden.');
    }
  }

  static async saveSchedulerJob(userId: string, job: SchedulerJob): Promise<void> {
    const dataToSave = {
      ...job,
      userId,
      updatedAt: new Date().toISOString(),
    };

    try {
      const docRef = doc(db, COLLECTION_SCHEDULER_JOBS, job.id);
      const serialized = JSON.parse(JSON.stringify(dataToSave));
      await firestoreWithTimeout(setDoc(docRef, serialized, { merge: true }), FIRESTORE_WRITE_TIMEOUT_MS);
    } catch (err) {
      rethrowFirestoreWriteError(err);
    }

    const current = loadAllSchedulerJobs(userId);
    const idx = current.findIndex((j) => j.id === job.id);
    if (idx >= 0) {
      current[idx] = dataToSave;
    } else {
      current.unshift(dataToSave);
    }
    saveAllSchedulerJobs(current, userId);
  }

  static async updateSchedulerJobStatus(
    userId: string,
    jobId: string,
    status: SchedulerJob['status'],
    lastError?: string
  ): Promise<void> {
    const current = loadAllSchedulerJobs(userId);
    const idx = current.findIndex((j) => j.id === jobId);
    if (idx >= 0) {
      current[idx] = {
        ...current[idx],
        status,
        updatedAt: new Date().toISOString(),
        lastError: lastError !== undefined ? lastError : current[idx].lastError,
      };
      saveAllSchedulerJobs(current, userId);
    }

    try {
      const docRef = doc(db, COLLECTION_SCHEDULER_JOBS, jobId);
      const updateData: Record<string, any> = {
        status,
        updatedAt: new Date().toISOString(),
      };
      if (lastError !== undefined) {
        updateData.lastError = lastError;
      }
      await firestoreWithTimeout(updateDoc(docRef, updateData), FIRESTORE_WRITE_TIMEOUT_MS);
    } catch (err) {
      rethrowFirestoreWriteError(err);
    }
  }

  // ==========================================
  // 5. LOCALSTORAGE TO FIRESTORE MIGRATION
  // ==========================================

  static async syncLocalDataToFirestore(userId: string, isAdmin = false): Promise<void> {
    if (!userId) return;
    migrateLegacyContentStorage(userId);
    if (!isFirestoreOperational()) return;

    try {
      const [settingsSnapshot, contentSnapshot] = await Promise.all([
        getDocs(query(collection(db, COLLECTION_PROJECTS), where('userId', '==', userId))),
        getDocs(query(collection(db, COLLECTION_CONTENT_PROJECTS), where('userId', '==', userId))),
      ]);
      saveAllProjectSettings([...loadAllProjectSettings(userId, isAdmin), ...settingsSnapshot.docs.filter(d => d.data().deletedAt).map(d => ({ ...d.data(), id: d.id } as ProjectSettings))], userId);
      saveAllContentProjects([...loadAllContentProjects(userId), ...contentSnapshot.docs.filter(d => d.data().deletedAt).map(d => ({ ...d.data(), id: d.id } as CentralContentProject))], userId);
      const localSettings = loadAllProjectSettings(userId, isAdmin);
      for (const settings of localSettings) {
        if (settings.userId === userId) {
          await this.saveProjectSettings(userId, settings, isAdmin);
        }
      }
      const localProjects = loadAllContentProjects(userId);
      for (const p of localProjects) {
        if (p.userId === userId && canUseContentProject(p.projectSettings, isAdmin)) {
          await this.saveContentProject(userId, p);
        }
      }
    } catch (err) {
      handleFirestoreError(err);
    }
  }
}
