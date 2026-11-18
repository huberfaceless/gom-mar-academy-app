import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { renderCampaignEmailHtml } from '../server/emailHtmlTemplate';
import { generateContentEmail } from '../server/contentEmailGeneration';
import { importContentEmailCampaign } from '../server/emailCampaignsAdmin';
import { contentEmailCampaign, validateContentEmailBatch } from '../src/utils/contentEmail';
import { createOnlineBusinessProject } from '../src/utils/contentStorage';
import { contentHubEnglish, contentHubText } from '../src/i18n/contentHubCopy';

const settings = { ...createOnlineBusinessProject('test'), language: 'en', brandVoice: 'Ich bin Betreiber der Academy.', defaultCta: 'Lernpfad ansehen' };
const article = { title: 'Mein Artikel', contentMarkdown: 'Verbindliche Fakten aus dem Artikel.' };
const targetUrl = 'https://academy.gomo-marketing.at/?source=email#kurs';
const input = { topic: 'Online-Business ab 50', projectSettings: settings, article, count: 5, targetUrl };
let modelCalls = 0;
const model = async (request: any) => {
  modelCalls++;
  assert.match(request.config.systemInstruction, /English/);
  assert.match(request.config.systemInstruction, /Keine erfundenen/);
  assert.equal(JSON.parse(request.contents).source.text, article.contentMarkdown);
  assert.equal(JSON.parse(request.contents).brandVoice, settings.brandVoice);
  return { text: JSON.stringify({ title: 'Lernserie', emails: Array.from({length:5}, (_, i) => ({title:`Schritt ${i}`,subject:`Betreff ${i}`,previewText:'Vorschau',content:`Hilfreicher Schritt ${i}`})) }) };
};
const batch = await generateContentEmail(input, model);
assert.deepEqual(batch.emails.map(e => e.dayOffset), [0,2,4,6,8]);
assert.ok(batch.emails.every(e => e.content.endsWith(`${settings.defaultCta}\n${targetUrl}`)));
await assert.rejects(() => generateContentEmail({...input,count:2}, model));
await assert.rejects(() => generateContentEmail({...input,targetUrl:'javascript:alert(1)'}, model));
assert.equal(modelCalls, 1, 'Invalid inputs must not call the paid model.');
await assert.rejects(() => generateContentEmail(input, async () => ({text:'{"emails":[]}'})));
await assert.rejects(() => generateContentEmail(input, async () => ({text:'invalid JSON'})));
let request: any;
const single = await generateContentEmail({...input,article:undefined,brief:{h1:'Briefing'},count:1}, async r => {
  request = r;
  return {text:JSON.stringify({title:'Einzelmail',emails:[{title:'Mail',subject:'Betreff',previewText:'',content:'Hilfreicher Inhalt'}]})};
});
assert.equal(JSON.parse(request.contents).source.h1, 'Briefing');
assert.equal(single.emails.length, 1);
const html = renderCampaignEmailHtml('de','Betreff',`${single.emails[0].content}\n<script>alert(1)</script>`, 'https://academy.gomo-marketing.at/abmelden');
assert.ok(html.includes('href="https://academy.gomo-marketing.at/?source=email#kurs"'));
assert.ok(!html.includes('<script>'));
const hostile = renderCampaignEmailHtml('de','Betreff','https://example.com/?a=1&b=2" onclick="alert(1)', 'https://example.com/unsubscribe');
assert.ok(hostile.includes('href="https://example.com/?a=1&amp;b=2"'));
assert.ok(!hostile.includes(' onclick="'));
const poisoned = {...batch, status:'active', deliveryMode:'members-and-crm', automationStartedAt:'2026-01-01', emails:batch.emails.map(e=>({...e,status:'scheduled',requiredLessonId:'x'}))};
const campaign = contentEmailCampaign(poisoned);
assert.equal(campaign.status,'draft'); assert.equal(campaign.deliveryMode,'self-test'); assert.equal(campaign.leadsCount,0);
assert.equal(campaign.automationStartedAt,undefined);
assert.ok(campaign.emails.every(e=>e.status==='draft' && !e.requiredLessonId));
assert.throws(()=>validateContentEmailBatch({...batch,emails:[{...single.emails[0],dayOffset:-1}]}));

// Fresh reads, preconditioned writes and idempotent retries preserve every existing campaign.
const old = {...contentEmailCampaign(single),id:'old',emails:[]};
let document: any = { updateTime:'2026-11-18T10:00:00Z',fields:{campaignsJson:{stringValue:JSON.stringify([old])}} };
let writes = 0; let conflict = false;
const dependencies = {
  token: async ()=>'test-token',
  read: async () => document ? Response.json(document) : new Response(null,{status:404}),
  write: async (url: any, options: any) => {
    writes++;
    assert.match(String(url), /academyEmailCampaigns\/owner\?/);
    assert.match(String(url), document ? /currentDocument.updateTime=/ : /currentDocument.exists=false/);
    if (conflict) return new Response(null,{status:412});
    document = {...JSON.parse(options.body),updateTime:'2026-11-18T10:01:00Z'};
    return Response.json(document);
  },
};
let result = await importContentEmailCampaign('project','owner',batch,dependencies);
assert.equal(result.campaigns.length,2); assert.deepEqual(result.campaigns[0],old);
result = await importContentEmailCampaign('project','owner',batch,dependencies);
assert.equal(result.alreadyExists,true); assert.equal(writes,1);
conflict = true;
await assert.rejects(()=>importContentEmailCampaign('project','owner',{...batch,id:'other'},dependencies),/inzwischen geändert/);
assert.equal(JSON.parse(document.fields.campaignsJson.stringValue).length,2);
conflict = false; document = null;
await importContentEmailCampaign('project','owner',batch,dependencies);

// Execute the actual routes with authentication middleware recorded and own UID enforced.
const routes = new Map<string,any[]>();
const verified = ()=>{}, pro = ()=>{}, access = ()=>{};
let importedOwner = '';
const server = readFileSync('server.ts','utf8');
const ast = ts.createSourceFile('server.ts',server,ts.ScriptTarget.ES2022,true);
const routeContext = vm.createContext({ app:{post:(path:string,...handlers:any[])=>routes.set(path,handlers)},
  requireVerifiedMember:verified,requireProMember:pro,requireContentProjectAccess:access,FIREBASE_PROJECT_ID:'project',
  generateContentEmail:async()=>batch,ai:{models:{generateContent:async()=>({})}},
  importContentEmailCampaign:async (_project:string,uid:string)=>{importedOwner=uid;return result;},
});
function register(node:ts.Node) {
  if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)&&node.expression.expression.getText(ast)==='app.post'&&['/api/content-engine/emails','/api/email/campaigns/from-content'].includes((node.expression.arguments[0] as ts.StringLiteral).text)) {
    vm.runInContext(ts.transpileModule(node.getText(ast),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,routeContext);return;
  }
  ts.forEachChild(node,register);
}
register(ast);
for(const handlers of routes.values()) assert.deepEqual(handlers.slice(0,2),[verified,pro]);
assert.equal(routes.get('/api/content-engine/emails')?.[2],access);
assert.equal(routes.size,2);
const response = {setHeader(){},json(){},status(){return this;}};
await routes.get('/api/email/campaigns/from-content')!.at(-1)({firebaseUser:{sub:'owner'},body:{batch,userId:'someone-else'}},response);
assert.equal(importedOwner,'owner');

// Actual UI handlers: edit -> review -> save -> import; a failed save blocks import.
let slots:any[]=[];let cursor=0;let cloudFails=false;let importCalls=0;let imported:any;const saves:any[]=[];
const react={createElement:(type:any,props:any,...children:any[])=>({type,props:{...props,children}}),useState:(initial:any)=>{const i=cursor++;if(!(i in slots))slots[i]=initial;return[slots[i],(value:any)=>{slots[i]=typeof value==='function'?value(slots[i]):value;}];}};
const context=vm.createContext({exports:{},console,window:{confirm:()=>true},require(name:string){
  if(name==='react')return react;
  if(name.endsWith('contentEmail'))return{validateContentEmailBatch};
  if(name.endsWith('contentEmailService'))return{generateEmails:async()=>single,importEmails:async(value:any)=>{importCalls++;imported=value;return{campaignId:`hub_${value.id}`,campaigns:[contentEmailCampaign(value)]};}};
  if(name.endsWith('useContentHubCopy'))return{useContentHubCopy:()=>({hubText:(text:string,...args:unknown[])=>contentHubText('de',text,...args)})};
  return new Proxy({},{get:(_t,key)=>String(key)});
}});
const ui=readFileSync('src/components/ContentEngine/EmailGeneratorTab.tsx','utf8');
vm.runInContext(ts.transpileModule(ui,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,context);
const props={project:{id:'p',topic:input.topic,projectSettings:settings,emailBatch:single},disabled:false,onBusyChange(){},onImported(value:any){assert.equal(value[0].status,'draft');},async onSave(value:any){saves.push(value);return !cloudFails;}};
let tree:any;
const render=()=>{cursor=0;tree=context.exports.EmailGeneratorTab(props);};
function find(predicate:(node:any)=>boolean,node=tree):any{
  if(Array.isArray(node)){for(const child of node){const found=find(predicate,child);if(found)return found;}}
  else if(node&&typeof node==='object'){if(predicate(node))return node;return find(predicate,node.props?.children);}
}
const button=(text:string)=>find(n=>n.type==='button'&&n.props.children.flat().includes(text));
const review=()=>find(n=>n.type==='input'&&n.props.type==='checkbox');
const tick=async()=>{await new Promise(setImmediate);render();};
render(); assert.equal(button('In E-Mail & CRM als Entwurf übernehmen').props.disabled,true);
review().props.onChange({target:{checked:true}});render();
find(n=>n.type==='textarea').props.onChange({target:{value:'Geprüfter neuer Text'}});render();
assert.equal(review().props.checked,false,'Edits must invalidate review.');
review().props.onChange({target:{checked:true}});render();cloudFails=true;
button('In E-Mail & CRM als Entwurf übernehmen').props.onClick();await tick();
assert.equal(importCalls,0,'A failed cloud save must prevent CRM transfer.');
cloudFails=false;button('In E-Mail & CRM als Entwurf übernehmen').props.onClick();await tick();
assert.equal(importCalls,1);assert.equal(imported.emails[0].content,'Geprüfter neuer Text');
assert.ok(saves.length>=3);assert.equal(button('In E-Mail & CRM als Entwurf übernehmen'),undefined,'Imported drafts must be locked.');
for(const match of ui.matchAll(/hubText\('([^']+)'/g))assert.ok(contentHubEnglish[match[1]],`Missing English UI copy: ${match[1]}`);
console.log('Content-Hub-E-Mails: Generierung, Sprache, Prüfung, Cloud-Sperre, sichere Entwürfe, eigene UID und duplikatfreier Import geprüft.');
