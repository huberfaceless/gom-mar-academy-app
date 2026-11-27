import assert from 'node:assert/strict';
import { createWeAreRealProject, promotionStoryPrompt, WEAREREAL_REFERRAL_URL, WEAREREAL_SOURCE_URL } from '../src/utils/wearerealPromotion';
import { createStarterProjects, createOnlineBusinessProject } from '../src/utils/contentStorage';
import { editorialStrategyPrompt } from '../src/utils/editorialStrategy';
import { pinterestTrackingUrl } from '../src/utils/pinterestTargetUrl';
import { generateContentEmail } from '../server/contentEmailGeneration';
import { renderPinToCanvas } from '../src/utils/pinterestCanvasRenderer';
import type { PinterestPin } from '../src/types/contentEngine';

const project = createWeAreRealProject('owner');
assert.notEqual(project.id, createWeAreRealProject('other').id);
assert.equal(project.defaultTargetUrl, WEAREREAL_REFERRAL_URL);
assert.equal(project.websiteUrl, ''); assert.equal(project.wordpressAutoPublish, false);
assert.equal(project.pinterestTextPosition, 'bottom-left');
assert.ok(!createStarterProjects('member').some(p => p.defaultTargetUrl.includes('2002708')));
const untouched = createOnlineBusinessProject('member');
assert.equal(promotionStoryPrompt(untouched), '');
const prompt = editorialStrategyPrompt(project);
for (const text of [WEAREREAL_SOURCE_URL, 'Advertorial', 'keine unabhängige', 'Stell dir vor', 'Mini-Storytelling', 'Keine erfundenen Ich-Erlebnisse']) assert.ok(prompt.includes(text), text);
assert.ok(!promotionStoryPrompt({ ...project, storytelling: false }).includes('Mini-Storytelling'));
assert.equal(new URL(pinterestTrackingUrl(project.defaultTargetUrl, project.name, 'curiosity')).searchParams.get('real'), '2002708');
let emailPrompt = '';
await generateContentEmail({ topic: 'Gemeinsam statt allein', projectSettings: project, targetUrl: project.defaultTargetUrl, count: 1 }, async request => {
  emailPrompt = request.config.systemInstruction;
  return { text: JSON.stringify({ title: 'Einladung', emails: [{ title: 'Kontakt', subject: 'Eine Frage stellen', previewText: 'Ein möglicher erster Schritt', content: 'Stell dir vor, du stellst eine Frage und kommst ins Gespräch.' }] }) };
});
assert.ok(emailPrompt.includes('Mini-Storytelling')); assert.ok(emailPrompt.includes('Advertorial'));

const pin = { id: 'p', angle: 'curiosity', angleLabel: '', title: 'Viele Kontakte. Aber wer hört dir wirklich zu?', subHook: 'Stell dir vor, aus einer Frage wird ein Gespräch.', customBadge: 'Gemeinsam weiterdenken', ctaButtonText: 'Community entdecken →', keywords: [], description: 'Eine Einladung.', targetUrl: project.defaultTargetUrl, imagePrompt: '', status: 'ai_generated' } as PinterestPin;
const originalImage = globalThis.Image;
let imageLoads = 0;
(globalThis as any).Image = class { onerror: any; set src(_value: string) { imageLoads++; queueMicrotask(() => this.onerror()); } };
try {
  for (const size of [[1080, 1620], [540, 810], [1080, 1350]]) {
    for (const templateStyle of ['vital50_clean', 'vital50_bold', 'vital50_list', 'vital50_quote', 'vital50_dark', 'vital50_curiosity'] as const) {
      for (const design of [undefined, { layout: 'bold', alignment: 'center', background: '#ffffff', foreground: '#111827', accent: '#047857', headingSize: 'large' }] as const) {
        const text: { text: string; x: number; y: number; alignment: string }[] = [];
        const ctx = new Proxy({ font: '', fillStyle: '', textAlign: '', measureText: (s: string) => ({ width: s.length * 22 }),
          fillText(value: string, x: number, y: number) { text.push({ text: value, x, y, alignment: this.textAlign }); }, createLinearGradient: () => ({ addColorStop() {} }),
        } as any, { get(object, key) { return key in object ? object[key] : () => {}; } });
        const canvas = { getContext: () => ctx } as unknown as HTMLCanvasElement;
        await renderPinToCanvas(canvas, { ...pin, templateStyle, ...(design ? { design: { ...design } } : {}) }, project, { width: size[0], height: size[1] });
        assert.ok(text.length > 3);
        const normalizedHeight = size[1] / (size[0] / 1080);
        for (const line of text) {
          assert.equal(line.alignment, 'left'); assert.equal(line.x, 72);
          assert.ok(line.y >= normalizedHeight * .54 && line.y <= normalizedHeight - 60, JSON.stringify(line));
        }
        const cta = text.find(t => t.text === pin.ctaButtonText)!;
        assert.ok(cta && text.filter(t => t !== cta).every(t => t.y < cta.y - 25), 'CTA overlaps no story text');
        assert.ok(text.some(t => t.text === project.name));
      }
    }
  }
  assert.equal(imageLoads, 0, 'No health stock photo is silently assigned to a community project.');
} finally { if (originalImage === undefined) delete (globalThis as any).Image; else globalThis.Image = originalImage; }
console.log('WeAreReal geprüft: getrennte Vorlage, Empfehlungslink erhalten, Quellenstatus und Mini-Stories in Prompts; linksbündige untere Pin-Texte in allen Templates, analysierten Designs und Exportgrößen.');
