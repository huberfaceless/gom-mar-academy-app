import vm from 'node:vm';
import ts from 'typescript';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { socialEditorialPin, socialEditorialContent, updateSocialEditorialContent } from '../src/utils/socialEditorialReview';
import type { PinterestPin } from '../src/types/contentEngine';

const pin: PinterestPin = { id: 'pin-one', angle: 'solution', angleLabel: 'Lösung', title: 'Ursprüngliche Überschrift', description: 'Originalbeschreibung.', keywords: ['Wasser'], subHook: 'Originale Unterzeile', bulletPoints: ['Originalpunkt'], targetUrl: 'https://vital50.gomo-marketing.at/wasser/', board: 'Gesundheit', templateStyle: 'vital50_clean', imagePrompt: 'Wasser', status: 'scheduled', scheduledDate: '2026-11-20T09:00:00Z' };
const other = { ...pin, id: 'pin-two' };
const initial = JSON.stringify([pin, other]);
const instagram = { ...socialEditorialContent(pin, 'instagram'), title: 'Korrigierte Instagram-Überschrift', description: 'Fachlich geprüfte Instagram-Beschreibung.', keywords: ['Trinkpausen', 'Alltag'], subHook: 'Geprüfte Unterzeile', bulletPoints: ['Korrigierter Tipp'], ctaButtonText: 'Artikel lesen' };
const edited = updateSocialEditorialContent([pin, other], pin.id, 'instagram', instagram);
assert.equal(JSON.stringify([pin, other]), initial, 'Editing must not mutate the original record.');
assert.equal(edited[0].title, pin.title, 'Instagram corrections must not change Pinterest.');
assert.equal(socialEditorialPin(edited[0], 'instagram').title, instagram.title);
assert.equal(socialEditorialPin(edited[0], 'instagram').description, instagram.description);
assert.deepEqual(socialEditorialPin(edited[0], 'instagram').keywords, instagram.keywords);
assert.equal(edited[0].scheduledDate, pin.scheduledDate);
assert.equal(edited[0].status, pin.status);
assert.equal(edited[0].targetUrl, pin.targetUrl);
assert.strictEqual(edited[1], other);
const reloaded = JSON.parse(JSON.stringify(edited));
assert.deepEqual(socialEditorialContent(reloaded[0], 'instagram'), instagram, 'Corrections must survive persistence and reload.');
const pinterest = { ...socialEditorialContent(edited[0], 'pinterest'), title: 'Korrigierter Pinterest-Titel', description: 'Nur Pinterest geändert.' };
const both = updateSocialEditorialContent(edited, pin.id, 'pinterest', pinterest);
assert.equal(both[0].title, pinterest.title);
assert.equal(socialEditorialPin(both[0], 'instagram').title, instagram.title, 'Subsequent Pinterest corrections must preserve Instagram.');
assert.equal(socialEditorialPin(pin, 'instagram'), pin, 'Existing records keep their original content without a migration.');
assert.throws(() => updateSocialEditorialContent(edited, 'deleted', 'instagram', instagram));
assert.throws(() => updateSocialEditorialContent(edited, pin.id, 'pinterest', { ...pinterest, title: '' }));
assert.throws(() => updateSocialEditorialContent(edited, pin.id, 'pinterest', { ...pinterest, description: 'a'.repeat(501) }));
assert.doesNotThrow(() => updateSocialEditorialContent(edited, pin.id, 'instagram', { ...instagram, description: 'a'.repeat(1500) }));

// Verify that preview, direct publishing, scheduled caption AND scheduled image consume the same channel-specific content.
const tab = readFileSync('src/components/ContentEngine/InstagramPostsTab.tsx', 'utf8');
assert.match(tab, /socialEditorialPin\(sourcePin, 'instagram'\)/);
assert.match(tab, /renderPinToCanvas\(canvasRef.current, activePin/);
assert.match(tab, /<InstagramPublishModal\s+pin=\{activePin\}/);
const calendar = readFileSync('src/components/ContentEngine/ContentCalendarTab.tsx', 'utf8');
assert.match(calendar, /const editorialPin = socialEditorialPin\(pin, 'instagram'\)/);
assert.match(calendar, /buildInstagramCaption\(editorialPin.description, editorialPin.keywords\)/);
assert.match(calendar, /renderInstagramImage\(socialEditorialPin\(sourcePin, 'instagram'\)/);
assert.match(calendar, /SocialEditorialReviewModal/);
const modal = readFileSync('src/components/ContentEngine/SocialEditorialReviewModal.tsx', 'utf8');
assert.match(modal, /await onSave\(/);
assert.match(modal, /confirmed === false/);
assert.match(modal, /JSON.stringify\(pin\) !== initial.current/);
assert.match(modal, /Bereits eingeplante Aufträge behalten ihren bisherigen Inhalt/);
assert.doesNotMatch(modal, /publishPin|publishImage|enqueue|deletePublishingJob/);
console.log('Redaktionelle Prüfung: unabhängige Kanaltexte, unveränderte Quelle/Termine, Neuladen, Validierung sowie identische Instagram-Inhalte in Vorschau, Direktveröffentlichung und Kalender geprüft.');

// Exercise the actual editor handlers: cancel discards local edits, save persists,
// and an unconfirmed cloud write keeps the editor open with an error.
const slots: any[] = [];
let cursor = 0, writes = 0, closed = 0, confirm = false;
const react = {
  createElement: (type: unknown, props: any, ...children: unknown[]) => ({ type, props: { ...props, children } }),
  useState(value: any) { const i = cursor++; if (!(i in slots)) slots[i] = typeof value === 'function' ? value() : value; return [slots[i], (next: any) => { slots[i] = typeof next === 'function' ? next(slots[i]) : next; }]; },
  useRef(value: any) { const i = cursor++; if (!(i in slots)) slots[i] = { current: value }; return slots[i]; },
  useEffect() {},
};
const context = vm.createContext({ exports: {}, console, URL, require(name: string) {
  if (name === 'react') return react;
  if (name.endsWith('socialEditorialReview')) return { socialEditorialContent };
  if (name.endsWith('useContentHubCopy')) return { useContentHubCopy: () => ({ hubText: (text: string) => text }) };
  return {};
} });
vm.runInContext(ts.transpileModule(modal, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText, context);
const View = context.exports.SocialEditorialReviewModal;
const render = () => { cursor = 0; return View({ pin, channel: 'instagram', projectSettings: {}, onClose: () => { closed++; }, onSave: async (draft: any) => { writes++; assert.equal(draft.title, 'Geprüfte Aussage'); return confirm; } }); };
const find = (node: any, predicate: (node: any) => boolean): any => {
  if (Array.isArray(node)) { for (const child of node) { const result = find(child, predicate); if (result) return result; } }
  else if (node && typeof node === 'object') { if (predicate(node)) return node; return find(node.props?.children, predicate); }
};
let tree = render();
find(tree, node => node.type === 'input').props.onChange({ target: { value: 'Geprüfte Aussage' } });
tree = render();
assert.equal(writes, 0, 'Typing must not save or publish.');
find(tree, node => node.type === 'button' && node.props.children.includes('Abbrechen')).props.onClick();
assert.equal(writes, 0); assert.equal(closed, 1);
closed = 0;
find(tree, node => node.type === 'button' && node.props.children.includes('Korrekturen speichern')).props.onClick();
await new Promise(setImmediate);
assert.equal(writes, 1); assert.equal(closed, 0);
tree = render();
assert.match(find(tree, node => node.props?.role === 'alert').props.children.join(''), /Cloud-Speicherung/);
confirm = true;
find(tree, node => node.type === 'button' && node.props.children.includes('Korrekturen speichern')).props.onClick();
await new Promise(setImmediate);
assert.equal(closed, 1); assert.equal(writes, 2);
console.log('Prüfeditor: lokale Änderungen, Abbrechen, bestätigtes Speichern und Cloud-Fehler mit echten Komponenten-Handlern geprüft.');
