import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { pinterestApiBase, parsePinterestEnvironment } from '../src/utils/pinterestEnvironment';
import { requirePinterestEnvironment } from '../server/pinterestEnvironmentMiddleware';
import { listPinterestBoards } from '../server/pinterestBoards';
import { resolvePinterestTargetUrl } from '../src/utils/pinterestTargetUrl';

const originalFetch = globalThis.fetch;
const envKeys = ['PINTEREST_OAUTH_CLIENT_ID', 'PINTEREST_OAUTH_CLIENT_SECRET', 'PINTEREST_TOKEN_ENCRYPTION_KEY'] as const;
const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
Object.assign(process.env, { PINTEREST_OAUTH_CLIENT_ID: 'test-id', PINTEREST_OAUTH_CLIENT_SECRET: 'test-secret', PINTEREST_TOKEN_ENCRYPTION_KEY: 'test-encryption-key' });
async function isolated(entry: string, mocks: Record<string, string>) {
  const result = await build({ entryPoints: [entry], bundle: true, write: false, platform: 'node', format: 'esm', plugins: [{ name: 'pinterest-isolation', setup(builder) {
    builder.onResolve({ filter: /.*/ }, args => args.path in mocks ? { path: args.path, namespace: 'mock' } : undefined);
    builder.onLoad({ filter: /.*/, namespace: 'mock' }, args => ({ contents: mocks[args.path], loader: 'js' }));
  } }] });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}
try {
  assert.equal(parsePinterestEnvironment(undefined), 'production');
  assert.equal(pinterestApiBase('sandbox'), 'https://api-sandbox.pinterest.com/v5');
  for (const value of ['', null, {}, ['sandbox'], 'https://attacker.example', 'Sandbox']) assert.throws(() => parsePinterestEnvironment(value));
  for (const method of ['GET', 'POST', 'DELETE']) {
    for (const value of [undefined, 'sandbox', 'production', 'invalid']) {
      let next = false; let status = 200;
      const res: any = { locals: {}, status(code: number) { status = code; return this; }, json() {} };
      requirePinterestEnvironment({ method, query: { environment: value }, body: { environment: value } } as any, res, () => { next = true; });
      assert.equal(next, value !== 'invalid');
      assert.equal(status, value === 'invalid' ? 400 : 200);
      if (next) assert.equal(res.locals.pinterestEnvironment, value || 'production');
    }
  }

  // Run actual OAuth module: signed environment, separate encrypted stores and refresh endpoints.
  const documents = new Map<string, any>();
  const tokenCalls: string[] = [];
  const documentCalls: string[] = [];
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.includes('/oauth/token')) {
      tokenCalls.push(url);
      const environment = url.includes('api-sandbox.') ? 'sandbox' : 'production';
      return Response.json({ access_token: environment + '-access', refresh_token: environment + '-refresh', expires_in: 3600 });
    }
    documentCalls.push(url);
    if (init?.method === 'PATCH') { documents.set(url, JSON.parse(String(init.body))); return Response.json({}); }
    if (init?.method === 'DELETE') { documents.delete(url); return Response.json({}); }
    return documents.has(url) ? Response.json(documents.get(url)) : Response.json({}, { status: 404 });
  };
  const oauth = await isolated('server/pinterestConnectionAdmin.ts', {
    'google-auth-library': 'export class GoogleAuth { async getClient() { return {getAccessToken:async()=>({token:"google-test"})}; } }',
  });
  for (const environment of ['production', 'sandbox'] as const) {
    const { authorizationUrl, nonce } = oauth.createPinterestAuthorizationUrl('owner', environment);
    const state = new URL(authorizationUrl).searchParams.get('state')!;
    await oauth.completePinterestAuthorization('project', 'code', state, nonce);
    const url = documentCalls.at(-1)!;
    assert.ok(url.includes(environment === 'sandbox' ? '/academyPinterestSandboxConnections/' : '/academyPinterestConnections/'));
    assert.doesNotMatch(JSON.stringify(documents.get(url)), new RegExp(environment + '-(?:access|refresh)'));
    assert.equal(await oauth.loadPinterestAccessToken('project', 'owner', environment), environment + '-access');
    documents.get(url).fields.accessTokenExpiresAt.timestampValue = '2000-01-01T00:00:00Z';
    assert.equal(await oauth.loadPinterestAccessToken('project', 'owner', environment), environment + '-access');
    assert.equal(tokenCalls.at(-1), pinterestApiBase(environment) + '/oauth/token');
    const before = tokenCalls.length;
    await assert.rejects(oauth.completePinterestAuthorization('project', 'code', state, 'wrong-cookie'));
    const [payload, signature] = state.split('.');
    const tampered = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(payload, 'base64url').toString()), environment: environment === 'sandbox' ? 'production' : 'sandbox' })).toString('base64url') + '.' + signature;
    await assert.rejects(oauth.completePinterestAuthorization('project', 'code', tampered, nonce));
    assert.equal(tokenCalls.length, before);
  }
  assert.equal(documents.size, 2);
  await oauth.deletePinterestConnection('project', 'owner', 'sandbox');
  assert.equal(documents.size, 1);
  assert.equal((await oauth.loadPinterestConnectionStatus('project', 'owner', 'sandbox')).connected, false);
  assert.equal((await oauth.loadPinterestConnectionStatus('project', 'owner')).connected, true);

  // Empty sandbox pages must not hide subsequent boards.
  const pages: string[] = [];
  globalThis.fetch = async input => {
    const url = String(input); pages.push(url);
    assert.ok(url.startsWith(pinterestApiBase('sandbox') + '/boards?'));
    return Response.json(pages.length === 1 ? { items: [], bookmark: 'next&safe' } : { items: [{ id: 'sandbox-board', name: 'Test' }] });
  };
  assert.equal((await listPinterestBoards('sandbox-access', 'sandbox'))[0].id, 'sandbox-board');
  assert.equal(new URL(pages[1]).searchParams.get('bookmark'), 'next&safe');
  globalThis.fetch = async () => Response.json({ items: [], bookmark: 'repeating' });
  await assert.rejects(listPinterestBoards('sandbox-access', 'sandbox'), /vollständig/);

  // Execute the real direct-publishing handler for both environments.
  const server = readFileSync('server.ts', 'utf8');
  let handler: any; let destination = ''; let credentialEnvironment = ''; let body: any;
  const context = vm.createContext({
    app: { post: (_path: string, ...handlers: any[]) => { handler = handlers.at(-1); } },
    requireVerifiedMember: [], requireProMember() {}, requireContentProjectAccess() {},
    resolvePinterestTargetUrl, pinterestApiBase, FIREBASE_PROJECT_ID: 'project', console,
    loadPinterestAccessToken: async (_project: string, _user: string, environment: string) => { credentialEnvironment = environment; return environment + '-access'; },
    fetch: async (url: string, request: any) => { destination = url; body = JSON.parse(request.body); return Response.json({ id: 'pin-42', title: 'Test' }); },
  });
  const start = server.indexOf("  app.post('/api/pinterest/publish-pin'");
  vm.runInContext(ts.transpileModule(server.slice(start, server.indexOf('  // 📌 Pinterest AI Image Prompt', start)), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
  for (const environment of ['production', 'sandbox']) {
    let result: any;
    await handler({ firebaseUser: { sub: 'owner' }, body: { boardId: environment + '-board', pinData: { title: 'Test', description: 'Test', imageBase64: 'data:image/png;base64,dGVzdA==', targetUrl: 'https://example.com/' } } }, {
      locals: { pinterestEnvironment: environment }, status() { return this; }, json(value: any) { result = value; },
    });
    assert.equal(result.success, true);
    assert.equal(result.environment, environment);
    assert.equal(credentialEnvironment, environment);
    assert.equal(destination, pinterestApiBase(environment as any) + '/pins');
    assert.equal(body.board_id, environment + '-board');
    assert.equal(body.link, 'https://example.com/');
  }
  // Browser transport must carry the environment for every operation, without tokens.
  const requests: any[] = [];
  (globalThis as any).__sandboxFetch = async (url: string, request: any) => {
    requests.push({ url, ...request });
    return Response.json({ connected: true, success: true, boards: [], board: { id: 'test' }, publishedPin: { id: 'pin' }, environment: 'sandbox' });
  };
  const { pinterestService } = await isolated('src/services/pinterestService.ts', {
    './authenticatedFetch': 'export const authenticatedFetch = (...args) => globalThis.__sandboxFetch(...args);',
  });
  await pinterestService.getConnectionStatus('sandbox');
  await pinterestService.disconnect('sandbox');
  await pinterestService.getBoards('sandbox');
  await pinterestService.createBoard('Test', undefined, 'sandbox');
  const published = await pinterestService.publishPin({ title: 'Test' }, 'test-board', 'data:image/png;base64,dGVzdA==', 'sandbox');
  assert.equal(published.environment, 'sandbox');
  assert.ok(requests[0].url.endsWith('?environment=sandbox'));
  assert.ok(requests[1].url.endsWith('?environment=sandbox'));
  for (const request of requests.slice(2)) assert.equal(JSON.parse(request.body).environment, 'sandbox');
  delete (globalThis as any).__sandboxFetch;
  console.log('Pinterest-Sandbox geprüft: getrennte OAuth-Token, Signaturen, Erneuerung, Pinnwände, API-Ziele und Browser-Anfragen.');
} finally {
  globalThis.fetch = originalFetch;
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key]; else process.env[key] = originalEnv[key];
  }
  delete (globalThis as any).__sandboxFetch;
}
