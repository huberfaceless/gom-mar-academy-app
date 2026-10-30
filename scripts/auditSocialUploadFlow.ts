import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as pinterestTarget from '../src/utils/pinterestTargetUrl';
import { youtubeUploadTitle } from '../src/utils/youtubeUploadTitle';
import { savePinterestOAuthReturn, readPinterestOAuthReturn, clearPinterestOAuthReturn } from '../src/utils/pinterestOAuthReturn';

const data = new Map<string, string>();
const storage = { getItem: (key: string) => data.get(key) || null, setItem: (key: string, value: string) => data.set(key, value), removeItem: (key: string) => data.delete(key) };
Object.assign(globalThis, { sessionStorage: storage, window: { location: { search: '?pinterest=connected&keep=yes', href: 'https://academy.example/?pinterest=connected&keep=yes#hub' }, history: { replaceState(_a: unknown, _b: unknown, url: string) { assert.equal(url, '/?keep=yes#hub'); } }, confirm: () => true } });
const saved = { userId: 'owner', projectId: 'brand', contentProjectId: 'article-two', pinId: 'pin-two', environment: 'sandbox' as const };
savePinterestOAuthReturn(saved);
assert.equal(readPinterestOAuthReturn('other'), null, 'A different member must not restore this context.');
assert.equal(readPinterestOAuthReturn('owner')?.pinId, 'pin-two');
const now = Date.now;
Date.now = () => now() + 31 * 60_000;
assert.equal(readPinterestOAuthReturn('owner'), null, 'Expired return context must be ignored.');
Date.now = now;
clearPinterestOAuthReturn();
assert.equal(readPinterestOAuthReturn('owner'), null);
assert.equal(youtubeUploadTitle('GOM-MAR_Einführung.DE.mp4'), 'GOM-MAR Einführung.DE');
assert.equal(youtubeUploadTitle('a'.repeat(120) + '.mov').length, 100);

// Invoke the actual component's file and upload handlers with isolated hooks/services.
const slots: any[] = [], dependencies: any[][] = [];
let cursor = 0, pending: Array<() => void> = [];
const react = {
  createElement: (type: any, props: any, ...children: any[]) => ({ type, props: { ...props, children } }),
  useState(initial: any) { const i = cursor++; if (!(i in slots)) slots[i] = typeof initial === 'function' ? initial() : initial; return [slots[i], (value: any) => { slots[i] = typeof value === 'function' ? value(slots[i]) : value; }]; },
  useRef(value: any) { const i = cursor++; if (!(i in slots)) slots[i] = { current: value }; return slots[i]; },
  useEffect(effect: () => void, deps: any[]) { const i = cursor++; if (!dependencies[i] || deps.some((value, n) => value !== dependencies[i][n])) { dependencies[i] = deps; pending.push(effect); } },
};
const uploads: any[] = [];
const service = {
  getConnectionStatus: async () => ({ connected: true }),
  uploadUnlistedVideo: async (file: any, metadata: any) => { uploads.push({ file, metadata }); return { videoId: 'uploaded-id', videoUrl: 'https://youtu.be/uploaded-id' }; },
};
const context = vm.createContext({ exports: {}, console, URLSearchParams, window: globalThis.window, require(name: string) {
  if (name === 'react') return react;
  if (name.endsWith('useContentHubCopy')) return { useContentHubCopy: () => ({ language: 'de', hubText: (text: string) => text }) };
  if (name.endsWith('youtubeUploadTitle')) return { youtubeUploadTitle };
  if (name.endsWith('youtubeService')) return { youtubeService: service };
  return new Proxy({}, { get: (_target, key) => String(key) });
} });
vm.runInContext('(function(){' + ts.transpileModule(readFileSync('src/components/ContentEngine/YouTubeScriptTab.tsx', 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
}).outputText + '\n})();', context);
let changed: any;
const video = { title: 'Old fasting script', description: 'Description', keywords: [], script: { hook: '', intro: '', mainBody: [], cta: '', outro: '' }, chapters: [], thumbnailConcept: { headline: '', visualDescription: '', imagePrompt: '' }, status: 'ai_generated' };
const props = { video, shorts: [], topic: 'Topic', onChangeVideo: (value: any) => { changed = value; }, onChangeShorts() {}, onGoToCalendar() {} };
const render = () => { cursor = 0; pending = []; const tree = context.exports.YouTubeScriptTab(props); for (const effect of pending) effect(); return tree; };
const find = (node: any, predicate: (value: any) => boolean): any => {
  if (Array.isArray(node)) { for (const child of node) { const result = find(child, predicate); if (result) return result; } }
  else if (node && typeof node === 'object') { if (predicate(node)) return node; return find(node.props?.children, predicate); }
};
render(); await new Promise(resolve => setImmediate(resolve));
let tree = render();
find(tree, n => n.type === 'input' && n.props.type === 'file').props.onChange({ target: { files: [{ name: 'Academy_intro.mp4' }] } });
tree = render();
const titleInput = find(tree, n => n.type === 'input' && n.props.maxLength === 100);
assert.equal(titleInput.props.value, 'Academy intro');
titleInput.props.onChange({ target: { value: 'My Academy introduction' } });
tree = render();
await find(tree, n => n.type === 'button' && n.props.onClick?.name === 'handleUploadYouTube').props.onClick();
assert.equal(uploads[0].metadata.title, 'My Academy introduction');
assert.equal(changed.title, uploads[0].metadata.title, 'Persisted calendar/queue source and uploaded title must match.');
assert.equal(changed.videoId, 'uploaded-id');
assert.equal(changed.status, 'approved');
console.log('Social upload flow: PASS');

slots.length = 0; dependencies.length = 0;
savePinterestOAuthReturn(saved);
Object.assign(context, { sessionStorage: storage });
const originalRequire = context.require;
const pinsRequire = (name: string) => name.endsWith('pinterestTargetUrl') ? pinterestTarget : originalRequire(name);
context.require = (name: string) => name.endsWith('pinterestOAuthReturn')
  ? { readPinterestOAuthReturn, clearPinterestOAuthReturn, savePinterestOAuthReturn }
  : pinsRequire(name);
vm.runInContext('(function(){' + ts.transpileModule(readFileSync('src/components/ContentEngine/PinterestPinsTab.tsx', 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
}).outputText + '\n})();', context);
const pinProps = { userId: 'owner', contentProjectId: 'article-two', projectSettings: { id: 'brand' }, pins: [{ id: 'pin-one', angle: 'problem', title: 'First', keywords: [], targetUrl: 'https://example.com' }, { id: 'pin-two', angle: 'problem', title: 'Second', keywords: [], targetUrl: 'https://example.com' }], topic: '', onChange() {}, onOpenInstagram() {} };
const renderPins = () => { cursor = 0; pending = []; const tree = context.exports.PinterestPinsTab(pinProps); for (const effect of pending) effect(); return tree; };
renderPins();
const restored = renderPins();
const modal = find(restored, n => n.type === 'PinterestPublishModal');
assert.equal(modal.props.pin.id, 'pin-two');
assert.equal(modal.props.isOpen, true);
assert.equal(storage.getItem('gommar_pinterest_publish_environment'), 'sandbox');
assert.equal(readPinterestOAuthReturn('owner'), null, 'Consume return once, without re-opening on later edits.');
modal.props.onBeforeConnect('production');
assert.equal(readPinterestOAuthReturn('owner')?.environment, 'production');
console.log('Pinterest dialog restoration: PASS');
