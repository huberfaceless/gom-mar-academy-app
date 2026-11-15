import { splitSocialCaption, buildSocialCaption } from './socialCaption';
import type { PinterestPin } from '../types/contentEngine';

export type SocialChannel = 'pinterest' | 'instagram';
export type SocialEditorialContent = Pick<PinterestPin, 'title' | 'description' | 'keywords' | 'subHook' | 'bulletPoints' | 'ctaButtonText'>;
export const socialEditorialPin = (pin: PinterestPin, channel: SocialChannel): PinterestPin =>
  channel === 'instagram' && pin.instagramContent ? { ...pin, ...pin.instagramContent } : pin;

export const socialEditorialContent = (pin: PinterestPin, channel: SocialChannel): SocialEditorialContent => {
  const source = socialEditorialPin(pin, channel);
  const caption = splitSocialCaption(source.description, source.keywords);
  return { title: source.title, ...caption, subHook: source.subHook || '', bulletPoints: [...(source.bulletPoints || [])], ctaButtonText: source.ctaButtonText || 'Jetzt lesen →' };
};

export function updateSocialEditorialContent(pins: PinterestPin[], id: string, channel: SocialChannel, draft: SocialEditorialContent): PinterestPin[] {
  if (!pins.some(pin => pin.id === id)) throw new Error('Der Beitrag ist nicht mehr vorhanden.');
  draft = { ...draft, ...splitSocialCaption(draft.description, draft.keywords) };
  const maxDescription = channel === 'instagram' ? 2000 : 500;
  if (!draft.title.trim() || draft.title.length > 100) throw new Error('Die Überschrift muss zwischen 1 und 100 Zeichen enthalten.');
  if (!draft.description.trim() || draft.description.length > maxDescription) throw new Error(`Die Beschreibung muss zwischen 1 und ${maxDescription} Zeichen enthalten.`);
  if (draft.keywords.length > 30 || draft.keywords.some(keyword => keyword.length > 100)) throw new Error('Bitte höchstens 30 kurze Suchbegriffe verwenden.');
  if (channel === 'instagram' && buildSocialCaption(draft.description, draft.keywords).length > 2200) throw new Error('Instagram-Text und Hashtags dürfen zusammen höchstens 2.200 Zeichen enthalten.');
  if ((draft.bulletPoints || []).length > 8 || (draft.bulletPoints || []).some(line => line.length > 300)) throw new Error('Bitte höchstens acht Stichpunkte mit jeweils maximal 300 Zeichen verwenden.');
  const content: SocialEditorialContent = { title: draft.title.trim(), description: draft.description.trim(), keywords: draft.keywords.map(word => word.trim()).filter(Boolean), subHook: (draft.subHook || '').slice(0, 300), bulletPoints: (draft.bulletPoints || []).slice(0, 8).map(line => line.slice(0, 300)), ctaButtonText: (draft.ctaButtonText || '').slice(0, 100) };
  return pins.map(pin => pin.id !== id ? pin : channel === 'instagram' ? { ...pin, instagramContent: content } : { ...pin, ...content });
}
