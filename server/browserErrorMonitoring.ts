import express, { type Request, type RequestHandler } from 'express';
import { parseBrowserErrorReport } from '../src/utils/browserErrorReport.js';

export const createBrowserErrorRouter = (options: {
  publicOrigin: string;
  authenticate: RequestHandler;
  memberId: (request: Request) => string | undefined;
  now?: () => number;
}) => {
  const router = express.Router();
  const now = options.now || Date.now;
  const seen = new Map<string, number>();
  let windowStart = now();
  let accepted = 0;
  let received = 0;

  router.post('/', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    // No proxy/IP trust or attacker-controlled identifiers in the logs.
    if (req.header('origin') !== options.publicOrigin) { res.sendStatus(403); return; }
    const time = now();
    if (time - windowStart >= 60_000) { windowStart = time; accepted = 0; received = 0; }
    if (++received > 60) { res.sendStatus(429); return; }
    next();
  }, express.json({ limit: '1kb', strict: true }), options.authenticate, (req, res) => {
    const report = parseBrowserErrorReport(req.body);
    const memberId = options.memberId(req);
    if (!memberId) { res.sendStatus(401); return; }
    if (!report) { res.sendStatus(400); return; }
    const time = now();
    for (const [key, expires] of seen) if (expires <= time) seen.delete(key);
    const key = JSON.stringify([memberId, report.kind, report.view]);
    if (seen.has(key)) { res.sendStatus(204); return; }
    if (accepted >= 10 || seen.size >= 1000) { res.sendStatus(429); return; }
    seen.set(key, time + 5 * 60_000);
    accepted++;
    console.log(JSON.stringify({
      severity: 'ERROR',
      event: 'browser_error_reported',
      kind: report.kind,
      view: report.view,
    }));
    res.sendStatus(204);
  });
  // Bad/oversized reports must not become application errors or echo their contents.
  router.use((error: unknown, _req: Request, res: express.Response, next: express.NextFunction) => {
    const status = (error as { status?: number })?.status;
    if (status === 413 || status === 400) { res.sendStatus(status); return; }
    next(error);
  });
  return router;
};
