export const browserErrorKinds = ['render_error', 'runtime_error', 'unhandled_rejection'] as const;
export const browserErrorViews = [
  'root', 'app', 'dashboard', 'contentEngine', 'admin', 'academy', 'email',
  'toolbox', 'progress', 'profile', 'landing', 'settings',
  'verify_email', 'reset_password',
] as const;
export type BrowserErrorKind = typeof browserErrorKinds[number];
export type BrowserErrorView = typeof browserErrorViews[number];
export type BrowserErrorReport = { kind: BrowserErrorKind; view: BrowserErrorView };

export const browserErrorView = (value: string): BrowserErrorView =>
  browserErrorViews.includes(value as BrowserErrorView) ? value as BrowserErrorView : 'app';

export const parseBrowserErrorReport = (value: unknown): BrowserErrorReport | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const report = value as Record<string, unknown>;
  if (Object.keys(report).length !== 2 || !('kind' in report) || !('view' in report)) return null;
  if (!browserErrorKinds.includes(report.kind as BrowserErrorKind)
    || !browserErrorViews.includes(report.view as BrowserErrorView)) return null;
  return { kind: report.kind as BrowserErrorKind, view: report.view as BrowserErrorView };
};
