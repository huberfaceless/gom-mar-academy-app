import type { CentralContentProject } from '../types/contentEngine';

// Assign by stored category ID, never by a title or the currently selected settings.
export function selectContentProjectScope(
  projects: CentralContentProject[],
  settingsId: string,
  selectedContentId?: string,
): { scopedProjects: CentralContentProject[]; activeProject: CentralContentProject | null } {
  const scopedProjects = projects.filter(project => project.projectSettings?.id === settingsId);
  return {
    scopedProjects,
    activeProject: scopedProjects.find(project => project.id === selectedContentId)
      || scopedProjects[0] || null,
  };
}
