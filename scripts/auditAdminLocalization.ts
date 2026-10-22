import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, symlinkSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { adminInterfaceText } from '../src/i18n/adminInterfaceCopy';

// Only tab selection is controlled by the adapter. The actual components,
// translation provider and React rendering run unchanged; SSR runs no effects.
const reactPath = 'react';
const bundled = await build({ stdin:{resolveDir:process.cwd(),loader:'tsx',contents:`
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {LanguageProvider} from './src/context/LanguageContext';
import {AdminDashboardView} from './src/components/AdminDashboardView';
import {EmailAutomationView} from './src/components/EmailAutomationView';
import {LeadDetailModal} from './src/components/LeadDetailModal';
const forbidden = async()=>{throw Error('Rendering must not change data or send mail');};
const lesson = {id:'custom-lesson',title:'Meine gespeicherte Lektion',description:'Eigene Beschreibung',publicationStatus:'draft',durationMinutes:5};
const stages=[{id:1,title:'Meine gespeicherte Etappe',description:'',lessons:[lesson]}];
const campaign={id:'saved',title:'HTML-Automatik-Test',targetAudience:'Eigene Zielgruppe',description:'Eigener Text',status:'paused',deliveryMode:'self-test',leadsCount:0,createdAt:'2026-10-22',emails:[]};
const lead={id:'member_audit',name:'Stefan Beispiel',role:'Eigene Rolle',company:'Eigene Firma',avatarUrl:'https://example.com/avatar.png',email:'audit@example.com',phone:'',location:'Wien',badge:'Eigener Status',badgeType:'new',score:50,scoreDescription:'Eigene Beschreibung',tags:['Eigener Tag'],lastInteraction:'Eigene Zeitangabe',timeline:[{id:'note',type:'note',title:'Meine gespeicherte Notiz',timestamp:'2026-10-22',noteDetails:{author:'Stefan',text:'Mein unveränderter Notiztext'}}]};
export function render(language,scenario){
  globalThis.__adminUiScenario=scenario;
  const component=scenario.startsWith('admin')?<AdminDashboardView user={{role:'admin',tier:'PREMIUM'}} stages={stages} onUpdateStages={forbidden} onResetStages={forbidden} onRestoreLesson={forbidden} onNavigate={()=>{}}/>:scenario.startsWith('email')?<EmailAutomationView language={language} campaigns={[campaign]} onUpdateCampaigns={forbidden} onNavigateToToolbox={()=>{}} onOpenFragGommar={()=>{}} isAdmin isLoadingCampaigns={false} campaignsError={null}/>:<LeadDetailModal lead={lead} onClose={()=>{}} onSendEmail={forbidden} onUpdateLead={forbidden} onDeleteLead={forbidden}/>;
  return renderToStaticMarkup(<LanguageProvider>{component}</LanguageProvider>);
}
`},bundle:true,write:false,platform:'node',format:'esm',packages:'external',logLevel:'silent',plugins:[{name:'select-admin-tabs',setup(builder){
  builder.onResolve({filter:/^react$/},args=>/components\/(AdminDashboardView|EmailAutomationView|LeadDetailModal)\.tsx$/.test(args.importer)?{path:'react-adapter',namespace:'audit'}:args.namespace==='audit'?{path:'react',external:true}:null);
  builder.onLoad({filter:/.*/,namespace:'audit'},()=>({loader:'js',contents:`
import React from ${JSON.stringify(reactPath)};
export * from ${JSON.stringify(reactPath)};
export default React;
export function useState(initial){
  const scenario=globalThis.__adminUiScenario;
  if(initial==='students' && scenario==='admin-curriculum') initial='curriculum';
  if(initial==='marketing' && scenario==='email-crm') initial='crm';
  if(initial==='details' && scenario==='lead-compose') initial='writeEmail';
  if(initial==='details' && scenario==='lead-note') initial='addNote';
  return React.useState(initial);
}
`}));
}}]});
const temp=mkdtempSync(join(tmpdir(),'gommar-admin-i18n-'));
const previousWindow=globalThis.window;
try{
  symlinkSync(join(process.cwd(),'node_modules'),join(temp,'node_modules'),'dir');
  writeFileSync(join(temp,'render.mjs'),bundled.outputFiles[0].text);
  const {render}=await import(pathToFileURL(join(temp,'render.mjs')).href);
  const scenarios:Record<string,string[]>={
    'admin-members':['Administrator-Zentrale','Voller Systemzugriff','Teilnehmer','Lektionen','Firebase-Tarifverwaltung','Deutsche Mitglieder','Englische Mitglieder','Polnische Mitglieder'],
    'admin-curriculum':['Deutsche Audios auswählen','Neue Lektion erstellen','Entwurf ansehen','Bearbeiten','Löschen'],
    'email-campaign':['Kontakte verwalten (CRM)','+ Test-Lead eintragen','Empfänger der Automatik','Versandprotokoll der ausgewählten Kampagne'],
    'email-crm':['Alle Mitglieder abgleichen','Gesamtkontakte','Aktive Leads','Kontakte nach Name, E-Mail oder Tag durchsuchen...','Kunden','Abgebrochen'],
    'lead-details':['Marketing-Einwilligung','Schnellaktionen','Notiz hinzufügen','Kontakt dauerhaft löschen','Interaktionsverlauf & Chronik'],
    'lead-compose':['E-Mail verfassen an','Nachrichtentext:','E-Mail jetzt senden'],
    'lead-note':['Gesprächs- / Beobachtungsnotiz:','Notiz im Verlauf speichern'],
  };
  for(const language of ['de','en','de'] as const){
    const storage={getItem:(key:string)=>key==='gommar-language'?language:null,setItem(){},removeItem(){}};
    globalThis.window={localStorage:storage,sessionStorage:storage,location:{search:''}} as unknown as Window & typeof globalThis;
    for(const [scenario,sources] of Object.entries(scenarios)){
      const html=render(language,scenario);
      for(const source of sources){
        const expected=adminInterfaceText(language,source).replaceAll('&','&amp;');
        assert.ok(html.includes(expected),scenario+' / '+language+': missing '+expected);
        if(language==='en')assert.ok(!html.includes(source),scenario+': still German: '+source);
      }
      if(scenario==='email-campaign')assert.ok(html.includes('HTML-Automatik-Test'),'Stored campaign name must stay unchanged.');
      if(scenario==='admin-curriculum')assert.ok(html.includes('Meine gespeicherte Lektion'),'Stored lesson title must stay unchanged.');
      if(scenario==='lead-details'){
        assert.ok(html.includes('Meine gespeicherte Notiz'));
        assert.ok(html.includes('Mein unveränderter Notiztext'));
        assert.ok(html.includes('Eigener Tag'));
      }
    }
  }
  assert.equal(adminInterfaceText('en','Tarif für {0} wirklich von {1} auf {2} ändern?','Name {1}','FREE','PRO'),'Change the membership tier for Name {1} from FREE to PRO?');
  // CRM filter keys must remain stable while their displayed labels change.
  const emailSource=readFileSync('src/components/EmailAutomationView.tsx','utf8');
  assert.ok(emailSource.includes("filterCategory === 'Kunden'"));
  assert.ok(emailSource.includes('{emailText(cat)}'));
  console.log('Admin and CRM UI: DE/EN rendering across member administration, curriculum, campaigns, CRM and contact forms verified; saved data and filter keys preserved.');
}finally{
  if(previousWindow===undefined)delete (globalThis as any).window;else globalThis.window=previousWindow;
  delete (globalThis as any).__adminUiScenario;
  rmSync(temp,{recursive:true,force:true});
}
