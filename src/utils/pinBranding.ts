import type { PinterestPin, ProjectSettings } from '../types/contentEngine';

/** The active project supplies branding; no brand or destination is invented. */
export function projectPinWebsite(project: Pick<ProjectSettings, 'websiteUrl' | 'name'>): string {
 try {
  const raw=project.websiteUrl?.trim();
  if(raw){const url=new URL(raw);if(['http:','https:'].includes(url.protocol)&&!url.username&&!url.password)return url.hostname.replace(/^www\./,'');}
 }catch{/* A missing or malformed website falls back to the project name. */}
 return project.name?.trim()||'';
}
export function pinBrandText(pin: Pick<PinterestPin, 'customBrandText'>, project: Pick<ProjectSettings, 'websiteUrl' | 'name'>): string {
 const custom=pin.customBrandText?.trim();if(custom)return custom;
 const label=projectPinWebsite(project);
 return label===project.name?.trim()?label:label.toUpperCase();
}
