import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { canAccessView } from '../src/utils/membershipAccess';
import { emailCampaignText } from '../src/i18n/emailCampaignCopy';

assert.ok(canAccessView('email', 'PRO', 'member'), 'Test the view accessible to a PRO member.');
// Render the actual member component. SSR never executes effects or sends mail.
const bundle = await build({ stdin: { resolveDir: process.cwd(), loader: 'tsx', contents: `
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { EmailAutomationView } from './src/components/EmailAutomationView';
const campaign = {id:'saved', title:'Meine gespeicherte Kampagne', targetAudience:'Deutsche Leser', description:'Eigener Text', status:'draft', deliveryMode:'self-test', leadsCount:0, createdAt:'2026-10-22', emails:[]};
export function render(language, mode, isAdmin = false) {
  const campaigns = mode === 'empty' || mode === 'loading' ? [] : [mode === 'emails' ? {...campaign, emails:[{id:'saved-mail',campaignId:'saved',title:'Mein interner Name',subject:'Mein gespeicherter Betreff',previewText:'Meine Vorschau',content:'Mein unveränderter Inhalt',dayOffset:2,status:'draft'}]} : campaign];
  return renderToStaticMarkup(<EmailAutomationView language={language} campaigns={campaigns} isAdmin={isAdmin} isLoadingCampaigns={mode === 'loading'} campaignsError={null} onUpdateCampaigns={async()=>{throw Error('Rendering must not save campaigns');}} onNavigateToToolbox={()=>{}} onOpenFragGommar={()=>{}} />);
}
` }, bundle:true, write:false, platform:'node', format:'esm', packages:'external', logLevel:'silent' });
const temp = mkdtempSync(join(tmpdir(), 'gommar-email-i18n-'));
try {
  symlinkSync(join(process.cwd(), 'node_modules'), join(temp, 'node_modules'), 'dir');
  writeFileSync(join(temp,'render.mjs'), bundle.outputFiles[0].text);
  const {render} = await import(pathToFileURL(join(temp,'render.mjs')).href);
  for (const language of ['de','en','de'] as const) {
    const empty = render(language,'empty');
    for (const source of ['Noch keine Kampagne vorhanden','Die Testkampagnen wurden entfernt. Erstelle eine neue leere Kampagne.','Erste Kampagne erstellen']) {
      assert.ok(empty.includes(emailCampaignText(language,source)), language + ': missing empty state copy');
      if (language === 'en') assert.ok(!empty.includes(source), 'PRO empty state is still German');
    }
    assert.ok(!empty.includes('Open CRM'), 'Members must not receive admin CRM access.');
    assert.ok(render(language,'loading').includes(emailCampaignText(language,'E-Mail-Kampagnen werden geladen…')));
    const saved = render(language,'saved');
    assert.ok(saved.includes('Meine gespeicherte Kampagne'), 'Stored campaign title must remain unchanged.');
    for (const source of ['Kampagne bearbeiten','Noch keine Automatisierung eingerichtet','Erste E-Mail erstellen','Die Freigabe markiert vollständige E-Mails als geplant. Ein automatischer Empfängerversand ist nur für Academy-Administratoren verfügbar.']) {
      assert.ok(saved.includes(emailCampaignText(language,source)), language + ': missing campaign copy');
      if (language === 'en') assert.ok(!saved.includes(source), 'Member campaign UI is still German');
    }
    const emails = render(language,'emails');
    assert.ok(emails.includes('Mein gespeicherter Betreff'));
    assert.ok(emails.includes('Mein interner Name'));
    assert.ok(emails.includes(emailCampaignText(language,'{0} E-Mails • Versand nach Start und bestätigter Einwilligung',1)));
  }
  const admin = render('en','empty',true);
  assert.ok(admin.includes('Open CRM'));
  assert.ok(admin.includes('or open your empty CRM.'));
  assert.equal(emailCampaignText('en','E-Mail {0}','My {1} name'),'Email My {1} name', 'Interpolation must preserve user input.');
  console.log('PRO member email UI: DE/EN empty, loading and campaign states verified; saved member text and admin access preserved.');
} finally { rmSync(temp,{recursive:true,force:true}); }
