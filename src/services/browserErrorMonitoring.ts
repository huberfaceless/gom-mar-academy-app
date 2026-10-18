import {
  browserErrorView, parseBrowserErrorReport, type BrowserErrorKind,
} from '../utils/browserErrorReport';

export const createBrowserErrorReporter = (options: {
  getToken: () => Promise<string | null>;
  send: typeof fetch;
  now?: () => number;
}) => {
  const now = options.now || Date.now;
  const seen = new Map<string, number>();
  let windowStart = now();
  let count = 0;
  return async (kind: BrowserErrorKind, view: string): Promise<void> => {
    // Rebuild the body from fixed fields; never serialize errors or browser locations.
    const report = parseBrowserErrorReport({ kind, view: browserErrorView(view) });
    if (!report) return;
    const time = now();
    if (time - windowStart >= 60_000) { windowStart = time; count = 0; }
    const key = `${report.kind}:${report.view}`;
    if (count >= 3 || (seen.get(key) || 0) > time) return;
    seen.set(key, time + 5 * 60_000);
    count++;
    try {
      const token = await options.getToken();
      if (!token) return;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      try {
        await options.send('/api/client-errors', {
          method: 'POST', mode: 'same-origin', credentials: 'omit',
          referrerPolicy: 'no-referrer', cache: 'no-store', keepalive: true,
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(report), signal: controller.signal,
        });
      } finally { clearTimeout(timeout); }
    } catch {
      // Never report transport/auth failures again or interrupt the member's recovery.
    }
  };
};

let activeView = 'app';
let reporter: ReturnType<typeof createBrowserErrorReporter> | undefined;
export const setBrowserErrorView = (view: string) => { activeView = browserErrorView(view); };
export const reportBrowserError = (kind: BrowserErrorKind, view = activeView): void => {
  void reporter?.(kind, view);
};

export const installBrowserErrorMonitoring = (
  target: Window,
  report: ReturnType<typeof createBrowserErrorReporter>,
): (() => void) => {
  reporter = report;
  const onError = (event: ErrorEvent) => {
    // Ignore resource load events and errors attributed to browser extensions/other origins.
    if (!(event instanceof ErrorEvent)) return;
    if (event.filename) {
      try { if (new URL(event.filename, target.location.origin).origin !== target.location.origin) return; }
      catch { return; }
    }
    reportBrowserError('runtime_error');
  };
  const onRejection = (event: PromiseRejectionEvent) => {
    if (event.reason instanceof DOMException && event.reason.name === 'AbortError') return;
    reportBrowserError('unhandled_rejection');
  };
  target.addEventListener('error', onError);
  target.addEventListener('unhandledrejection', onRejection);
  return () => {
    target.removeEventListener('error', onError);
    target.removeEventListener('unhandledrejection', onRejection);
    if (reporter === report) reporter = undefined;
  };
};
