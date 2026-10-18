import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import express from 'express';
import { createBrowserErrorRouter } from '../server/browserErrorMonitoring';
import {
  createBrowserErrorReporter, installBrowserErrorMonitoring, reportBrowserError, setBrowserErrorView,
} from '../src/services/browserErrorMonitoring';
import { parseBrowserErrorReport } from '../src/utils/browserErrorReport';
import { AppErrorBoundary } from '../src/components/AppErrorBoundary';

const origin = 'https://academy.gomo-marketing.at';
const report = { kind: 'render_error', view: 'academy' };
assert.deepEqual(parseBrowserErrorReport(report), report);
for (const invalid of [null, [], 'error', {}, { ...report, message: 'private' },
  { ...report, view: 'private-url' }, { ...report, kind: 'private-error' }]) {
  assert.equal(parseBrowserErrorReport(invalid), null);
}

let time = 1_000_000;
const sent: RequestInit[] = [];
const reporter = createBrowserErrorReporter({
  getToken: async () => 'test-token', now: () => time,
  send: (async (url, init) => { assert.equal(url, '/api/client-errors'); sent.push(init!); return new Response(null, { status: 204 }); }) as typeof fetch,
});
await Promise.all([reporter('render_error', 'academy'), reporter('render_error', 'academy')]);
assert.equal(sent.length, 1, 'Concurrent duplicate events must be suppressed.');
assert.deepEqual(JSON.parse(String(sent[0].body)), report);
assert.equal(sent[0].referrerPolicy, 'no-referrer');
assert.equal(sent[0].credentials, 'omit');
await reporter('runtime_error', 'private-url');
assert.equal(JSON.parse(String(sent[1].body)).view, 'app');
await reporter('unhandled_rejection', 'profile');
await reporter('runtime_error', 'email');
assert.equal(sent.length, 3, 'A page must emit at most three reports per minute.');
time += 60_001;
await reporter('render_error', 'academy');
assert.equal(sent.length, 3, 'Deduplication lasts five minutes.');
time += 5 * 60_000;
await reporter('render_error', 'academy');
assert.equal(sent.length, 4);
for (const getToken of [async () => null, async () => { throw Error('private-auth-error'); }]) {
  await createBrowserErrorReporter({ getToken, send: (() => { throw Error('Must not send'); }) as typeof fetch })('runtime_error', 'app');
}
await createBrowserErrorReporter({
  getToken: async () => 'token', send: (async () => { throw Error('private-network-error'); }) as typeof fetch,
})('runtime_error', 'app');

// Exercise the actual event listeners and their cleanup without reading error contents.
const globals = globalThis as any;
const originalErrorEvent = globals.ErrorEvent;
class TestErrorEvent extends Event {
  filename: string;
  constructor(filename: string) { super('error'); this.filename = filename; }
}
globals.ErrorEvent = TestErrorEvent;
const target = Object.assign(new EventTarget(), { location: { origin } });
const events: string[] = [];
const stop = installBrowserErrorMonitoring(target as unknown as Window, async (kind, view) => { events.push(`${kind}:${view}`); });
try {
  setBrowserErrorView('contentEngine');
  target.dispatchEvent(new Event('error')); // Resource failures are not runtime errors.
  target.dispatchEvent(new TestErrorEvent('chrome-extension://private/script.js'));
  assert.equal(events.length, 0);
  target.dispatchEvent(new TestErrorEvent(origin + '/assets/app.js?private-query'));
  target.dispatchEvent(Object.assign(new Event('unhandledrejection'), { reason: new DOMException('private', 'AbortError') }));
  target.dispatchEvent(Object.assign(new Event('unhandledrejection'), { reason: Error('private-token') }));
  assert.deepEqual(events, ['runtime_error:contentEngine', 'unhandled_rejection:contentEngine']);
  // Run the actual boundary lifecycle and user actions with React rendering the fallback.
  for (const language of ['de', 'en', 'pl'] as const) {
    let home = false;
    const boundary = new AppErrorBoundary({ children: React.createElement('span', null, 'Normal'), view: 'academy', language, onHome: () => { home = true; } });
    assert.ok(renderToStaticMarkup(boundary.render()).includes('Normal'));
    boundary.state = AppErrorBoundary.getDerivedStateFromError();
    boundary.componentDidCatch();
    const fallback = boundary.render() as React.ReactElement<any>;
    const html = renderToStaticMarkup(fallback);
    assert.ok(html.includes('role="alert"'));
    assert.ok(html.includes(`lang="${language}"`));
    assert.doesNotMatch(html, /private-|test-token/);
    boundary.setState = ((value: any) => { boundary.state = { ...boundary.state, ...value }; }) as any;
    fallback.props.children[2].props.children[1].props.onClick();
    assert.equal(home, true);
    assert.equal(boundary.state.failed, false);
  }
  assert.equal(events.at(-1), 'render_error:academy');
} finally {
  stop();
  if (originalErrorEvent === undefined) delete globals.ErrorEvent;
  else globals.ErrorEvent = originalErrorEvent;
}
const eventCount = events.length;
target.dispatchEvent(new Event('error'));
reportBrowserError('render_error', 'app');
assert.equal(events.length, eventCount);

// Real Express HTTP path: small parser, session guard, schema, limits and log output.
const app = express();
app.use('/api/client-errors', createBrowserErrorRouter({
  publicOrigin: origin, now: () => time,
  authenticate: (req, res, next) => {
    if (req.header('authorization') !== 'Bearer test-token') { res.sendStatus(401); return; }
    next();
  },
  memberId: req => req.header('x-test-member') || 'test-member',
}));
const http = createServer(app);
await new Promise<void>(resolve => http.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${(http.address() as AddressInfo).port}/api/client-errors`;
const logs: Record<string, unknown>[] = [];
const originalLog = console.log;
console.log = (line: string) => { logs.push(JSON.parse(line)); };
const post = (body: string, headers: Record<string, string> = {}) => fetch(url, {
  method: 'POST', headers: { Origin: origin, Authorization: 'Bearer test-token', 'Content-Type': 'application/json', ...headers }, body,
});
try {
  assert.equal((await post(JSON.stringify(report), { Origin: 'https://other.example' })).status, 403);
  assert.equal((await post(JSON.stringify(report), { Authorization: '' })).status, 401);
  assert.equal((await post(JSON.stringify({ ...report, message: 'private-input' }))).status, 400);
  assert.equal((await post('{invalid-private')).status, 400);
  assert.equal((await post(JSON.stringify({ message: 'private'.repeat(300) }))).status, 413);
  assert.equal(logs.length, 0);
  assert.equal((await post(JSON.stringify(report))).status, 204);
  assert.deepEqual(logs[0], { severity: 'ERROR', event: 'browser_error_reported', ...report });
  await post(JSON.stringify(report));
  assert.equal(logs.length, 1, 'Server must suppress duplicates independently of the browser.');
  for (let index = 1; index <= 9; index++) {
    assert.equal((await post(JSON.stringify(report), { 'x-test-member': `member-${index}` })).status, 204);
  }
  assert.equal((await post(JSON.stringify(report), { 'x-test-member': 'member-over-limit' })).status, 429);
  assert.equal(logs.length, 10);
  time += 60_001;
  assert.equal((await post(JSON.stringify(report))).status, 204);
  assert.equal(logs.length, 10);
  time += 5 * 60_000;
  assert.equal((await post(JSON.stringify(report))).status, 204);
  assert.equal(logs.length, 11);
  for (let i = 0; i < 59; i++) await post(JSON.stringify(report));
  assert.equal((await post(JSON.stringify(report))).status, 429);
  assert.doesNotMatch(JSON.stringify(logs), /private|token|member/);
} finally {
  console.log = originalLog;
  http.closeAllConnections();
  await new Promise<void>((resolve, reject) => http.close(error => error ? reject(error) : resolve()));
}

const server = readFileSync('server.ts', 'utf8');
assert.ok(server.indexOf("app.use('/api/client-errors'") < server.indexOf('app.use(express.json('));
assert.match(server, /authenticate: \(req, res, next\) => \{ void requireAuthenticatedMember\(req, res, next\); \}/);
const main = readFileSync('src/main.tsx', 'utf8');
assert.match(main, /if \(import.meta.env.PROD\)/);
assert.match(main, /await auth.authStateReady\(\)/);
assert.match(main, /<AppErrorBoundary view="root">/);
const source = readFileSync('src/App.tsx', 'utf8');
assert.match(source, /<AppErrorBoundary key=\{activeView\} view=\{activeView\}/);
console.log('Browser-Überwachung geprüft: authentifizierter HTTP-Empfang, Datenschutz, Herkunft, Größen-/Mengenlimits, Duplikate, Fehlerereignisse, Transportausfälle und dreisprachige Auffangansicht.');
