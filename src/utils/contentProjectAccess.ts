// Vital50 is the Academy administrator's brand; members keep their own projects.
export const isVital50Project = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') return false;
  const project = value as Record<string, unknown>;
  const id = typeof project.id === 'string' ? project.id.toLowerCase() : '';
  const name = typeof project.name === 'string' ? project.name.trim().toLowerCase() : '';
  const ownsVital50Url = [project.websiteUrl, project.defaultTargetUrl, project.targetUrl]
    .some(url => typeof url === 'string' && /^https?:\/\/vital50\.gomo-marketing\.at(?:[/:?#]|$)/i.test(url));
  return /^proj_vital50(?:_|$)/.test(id) || /^vital\s*50(?:\s|$)/.test(name) || ownsVital50Url;
};

export const canUseContentProject = (project: unknown, isAdmin: boolean): boolean =>
  isAdmin || !isVital50Project(project);
