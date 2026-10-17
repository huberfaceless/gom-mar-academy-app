import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PinterestPinsTab } from '../src/components/ContentEngine/PinterestPinsTab';
import { selectContentProjectScope } from '../src/utils/contentProjectSelection';
import { createBlogArticleProject } from '../src/utils/blogArticleProjects';
import { createOnlineBusinessProject } from '../src/utils/contentStorage';

// Exercise the real view's hooks, selection handlers and generation callbacks with isolated services.
const settings = createOnlineBusinessProject('topic-audit');
const article = (id: string, topic: string, projectSettings = settings) => ({ id, topic, projectSettings, contentBrief: { h1: topic }, blogArticle: { title: topic }, pinterestPins: [], calendarItems: [] });
const first = article('one', 'Ü50: Geld verdienen mit Affiliate');
const second = article('two', 'Ein anderes Artikelthema');
const otherSettings = { ...settings, id: 'other-brand', name: 'Anderes Projekt' };
const other = article('other', 'Thema der anderen Marke', otherSettings);
let saved = [first, second, other];
const slots: any[] = []; const deps: any[][] = [];
let cursor = 0; let dirty = false; let effects: Array<() => void> = [];
const hookReact = {
  createElement: (type: any, props: any, ...children: any[]) => ({ type, props: { ...props, children } }),
  useState(initial: any) { const i = cursor++; if (!(i in slots)) slots[i] = typeof initial === 'function' ? initial() : initial; return [slots[i], (value: any) => { const next = typeof value === 'function' ? value(slots[i]) : value; if (!Object.is(next, slots[i])) { slots[i] = next; dirty = true; } }]; },
  useEffect(effect: () => void, next: any[]) { const i = cursor++; if (!deps[i] || next.some((v, n) => !Object.is(v, deps[i][n]))) { deps[i] = next; effects.push(effect); } },
};
const requests: Array<{ kind: string; topic: string }> = [];
const AIContentService = {
  async generateContentBrief(topic: string) { requests.push({ kind: 'brief', topic }); return { brief: { h1: topic } }; },
  async generateBlogArticle(topic: string) { requests.push({ kind: 'blog', topic }); return { title: topic }; },
  async generatePinterestPins(topic: string) { requests.push({ kind: 'pinterest', topic }); return []; },
};
const context = vm.createContext({ exports: {}, console, require(name: string) {
  if (name === 'react') return hookReact;
  if (name.endsWith('AuthContext')) return { useAuth: () => ({ user: null }) };
  if (name.endsWith('contentStorage')) return {
    loadAllProjectSettings: () => [settings, otherSettings], loadAllContentProjects: () => saved,
    createStarterProjects: () => [settings], DEFAULT_VITAL50_PROJECT: { id: 'vital50' },
    saveOrUpdateContentProject(value: any) { saved = [value, ...saved.filter(p => p.id !== value.id)]; },
  };
  if (name.endsWith('contentProjectSelection')) return { selectContentProjectScope };
  if (name.endsWith('contentProjectAccess')) return { canUseContentProject: () => true };
  if (name.endsWith('blogArticleProjects')) return { createBlogArticleProject };
  if (name.endsWith('aiContentService')) return { AIContentService };
  return new Proxy({}, { get: (_target, key) => String(key) });
} });
vm.runInContext(ts.transpileModule(readFileSync('src/components/ContentEngine/ContentEngineView.tsx', 'utf8'), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
}).outputText, context);
const View = (context.exports as any).ContentEngineView;
let tree: any;
const render = () => { for (let n = 0; n < 10; n++) { dirty = false; cursor = 0; effects = []; tree = View({}); for (const effect of effects) effect(); if (!dirty) return; } throw new Error('Instabile Hooks'); };
const find = (predicate: (node: any) => boolean, node: any): any => {
  if (Array.isArray(node)) { for (const child of node) { const found = find(predicate, child); if (found) return found; } }
  else if (node && typeof node === 'object') { if (predicate(node)) return node; return node.props?.children ? find(predicate, node.props.children) : undefined; }
};
const input = () => find(n => n.type === 'input' && n.props['aria-label'] === 'Thema für den Inhaltsablauf', tree);
const component = (name: string) => find(n => n.type === name, tree);
render();
assert.equal(input().props.value, first.topic, 'Gespeicherter Artikel muss das Themenfeld beim Laden füllen.');
component('BlogArticleLibrary').props.onSelect(second.id); render();
assert.equal(input().props.value, second.topic);
input().props.onChange({ target: { value: 'Eigener neuer Themenentwurf' } }); render();
assert.equal(input().props.value, 'Eigener neuer Themenentwurf', 'Normale Renders dürfen Eingaben nicht überschreiben.');
component('BlogArticleLibrary').props.onSelect(first.id); render();
assert.equal(input().props.value, first.topic);
component('BlogEditorTab').props.onGeneratePinterest(); render();
component('AffiliateLinkModal').props.onConfirm(null); await new Promise(setImmediate); render();
assert.deepEqual(requests.at(-1), { kind: 'pinterest', topic: first.topic });
assert.equal(component('PinterestPinsTab').props.topic, first.topic);
component('PinterestPinsTab').props.onGenerate(); render();
component('AffiliateLinkModal').props.onConfirm(null); await new Promise(setImmediate); render();
assert.deepEqual(requests.at(-1), { kind: 'pinterest', topic: first.topic });
component('BlogArticleLibrary').props.onCreate(); render();
component('AffiliateLinkModal').props.onConfirm(null, 'Zusätzlicher Artikel mit eigenem Thema'); await new Promise(setImmediate); render();
assert.equal(input().props.value, 'Zusätzlicher Artikel mit eigenem Thema');
assert.ok(saved.some(p => p.id === first.id && p.topic === first.topic));
const selector = find(n => n.type === 'select' && n.props.value === settings.id, tree);
selector.props.onChange({ target: { value: otherSettings.id } }); render();
assert.equal(input().props.value, other.topic, 'Ein Projektwechsel muss das passende Thema übernehmen.');
const html = renderToStaticMarkup(React.createElement(PinterestPinsTab, { pins: [], topic: first.topic, projectSettings: settings, onChange() {}, onOpenInstagram() {}, onGenerate() {} }));
assert.ok(html.includes(first.topic));
assert.ok(html.includes('Pinterest-Pins zu diesem Thema erstellen'));
console.log('Themenübergabe geprüft: Laden, Artikelauswahl, eigener Entwurf, zusätzlicher Artikel, Projektwechsel und Pinterest-Erstellung mit dem ausgewählten Thema.');
