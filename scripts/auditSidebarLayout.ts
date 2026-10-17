import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { SidebarTooltip } from '../src/components/SidebarTooltip';
import * as icons from 'lucide-react';
import { translations } from '../src/i18n/translations';
import { canAccessView } from '../src/utils/membershipAccess';

let state: boolean | undefined;
let stored: string | null = null;
let storageFails = false;
let language: 'de' | 'en' | 'pl' = 'de';
let destination = ''; let mentorOpened = false;
const context = vm.createContext({ exports: {}, window: { localStorage: {
  getItem() { if (storageFails) throw Error('blocked'); return stored; },
  setItem(_key: string, value: string) { if (storageFails) throw Error('blocked'); stored = value; },
} }, require(name: string) {
  if (name === 'react') return { ...React, useState(initial: () => boolean) { state ??= initial(); return [state, (value: boolean) => { state = value; }]; } };
  if (name.endsWith('SidebarTooltip')) return { SidebarTooltip };
  if (name === 'lucide-react') return icons;
  if (name.endsWith('LanguageContext')) return { useLanguage: () => ({ t: (key: keyof typeof translations.de) => translations[language][key] }) };
  if (name.endsWith('membershipAccess')) return { canAccessView };
  if (name.endsWith('.jpg')) return 'logo.jpg';
  throw Error(name);
} });
vm.runInContext(ts.transpileModule(readFileSync('src/components/Sidebar.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
}).outputText, context);
const Sidebar = (context.exports as any).Sidebar;
const render = (role = 'member') => Sidebar({ activeView: 'contentEngine', onNavigate: (view: string) => { destination = view; }, progressPercent: 25,
  completedTasksCount: 1, totalTasksCount: 4, onOpenFragGommar: () => { mentorOpened = true; }, userRole: role, userTier: 'PRO' });
const find = (node: any, predicate: (node: any) => boolean): any => {
  if (Array.isArray(node)) { for (const child of node) { const found = find(child, predicate); if (found) return found; } }
  else if (node && typeof node === 'object') { if (predicate(node)) return node; return find(node.props?.children, predicate); }
};
const toggle = (tree: any) => find(tree, n => n.props?.['aria-controls'] === 'academy-sidebar-navigation');
let tree = render();
assert.equal(toggle(tree).props['aria-expanded'], true);
assert.ok(renderToStaticMarkup(tree).includes('md:w-64'));
toggle(tree).props.onClick(); tree = render();
assert.equal(stored, 'true'); assert.equal(toggle(tree).props['aria-expanded'], false);
const html = renderToStaticMarkup(tree);
assert.ok(html.includes('md:w-20'));
assert.ok(find(tree, n => n.type === SidebarTooltip && n.props.label === translations.de['nav.contentHub'] && n.props.enabled));
assert.ok(!find(tree, n => n.props?.id === 'nav-item-admin'));
find(tree, n => n.props?.id === 'nav-item-contentEngine').props.onClick(); assert.equal(destination, 'contentEngine');
find(tree, n => n.props?.['aria-label'] === translations.de['mentor.ask']).props.onClick(); assert.equal(mentorOpened, true);
assert.ok(find(render('admin'), n => n.props?.id === 'nav-item-admin'));
state = undefined; assert.equal(toggle(render()).props['aria-expanded'], false, 'Neuladen muss die Auswahl behalten.');
toggle(render()).props.onClick(); assert.equal(stored, 'false');
state = undefined; assert.equal(toggle(render()).props['aria-expanded'], true);
for (const code of ['de', 'en', 'pl'] as const) {
  language = code; assert.equal(toggle(render()).props['aria-label'], translations[code]['nav.collapse']);
}
storageFails = true; state = undefined; assert.doesNotThrow(() => { toggle(render()).props.onClick(); });
console.log('Seitenmenü geprüft: Einklappen, Ausklappen, gespeicherte Auswahl, Navigation, Mentor, Adminsichtbarkeit, DE/EN/PL und gesperrter Browserspeicher.');

// Exercise the actual tooltip's event handlers and portal output without a browser dependency.
let position: any = null;
let cleanup: (() => void) | undefined;
const listeners = new Map<string, () => void>();
const tooltipContext = vm.createContext({ exports: {}, window: {
  innerHeight: 800, addEventListener: (name: string, listener: () => void) => listeners.set(name, listener),
  removeEventListener: (name: string) => listeners.delete(name),
}, document: { body: {} }, require(name: string) {
  if (name === 'react') return { ...React, useId: () => 'tooltip-test',
    useState: () => [position, (value: any) => { position = value; }],
    useEffect: (effect: () => (() => void) | undefined) => { cleanup?.(); cleanup = effect(); },
  };
  if (name === 'react-dom') return { createPortal: (child: any) => child };
  throw Error(name);
} });
vm.runInContext(ts.transpileModule(readFileSync('src/components/SidebarTooltip.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
}).outputText, tooltipContext);
const Tooltip = (tooltipContext.exports as any).SidebarTooltip;
const renderTooltip = (enabled = true) => Tooltip({ enabled, label: 'Kalender & Freigabe', children: React.createElement('button', { 'aria-label': 'Kalender & Freigabe' }) });
const event = { currentTarget: { getBoundingClientRect: () => ({ right: 72, top: 120, height: 40 }) } };
let tip = renderTooltip(); assert.ok(!find(tip, n => n.props?.role === 'tooltip'));
tip.props.onMouseEnter(event); tip = renderTooltip();
const bubble = find(tip, n => n.props?.role === 'tooltip');
assert.equal(bubble.props.style.left, 82); assert.equal(bubble.props.style.top, 140);
assert.equal(find(tip, n => n.type === 'button').props['aria-describedby'], 'tooltip-test');
assert.ok(renderToStaticMarkup(bubble).includes('Kalender &amp; Freigabe'));
tip.props.onKeyDown({ key: 'Escape' }); tip = renderTooltip(); assert.equal(position, null);
tip.props.onFocus(event); tip = renderTooltip(); assert.ok(find(tip, n => n.props?.role === 'tooltip'));
listeners.get('scroll')!(); renderTooltip(); assert.equal(position, null); assert.equal(listeners.size, 0);
for (const exit of ['onMouseLeave', 'onBlur', 'onClick']) {
  tip = renderTooltip(); tip.props.onMouseEnter(event); tip = renderTooltip(); tip.props[exit](); renderTooltip(); assert.equal(position, null);
}
tip = renderTooltip(); tip.props.onFocus(event); renderTooltip(); listeners.get('resize')!(); renderTooltip(); assert.equal(position, null);
renderTooltip(false).props.onMouseEnter(event); assert.equal(position, null);
console.log('Infoblasen geprüft: Maus, Tastaturfokus, Beschriftung, Portalposition, Escape sowie Schließen bei Verlassen, Klick, Scrollen und Größenänderung.');
