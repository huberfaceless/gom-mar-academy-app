import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, symlinkSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
import { build } from 'esbuild';
import { normalizeLongTailKeywords, longTailKeywordPrompt } from '../src/utils/longTailKeywords';
import { normalizeSeoGeo, wordpressSeoMeta } from '../src/utils/blogSeoGeo';
import { briefForSocial, appendSocialPins, appendYouTubeContent } from '../src/utils/additionalSocialContent';
import { createOnlineBusinessProject } from '../src/utils/contentStorage';
import type { CentralContentProject } from '../src/types/contentEngine';
import { contentLanguageInstruction } from '../server/contentGenerationLanguage';

const phrases = ['online Geld verdienen ab 50', 'Affiliate Marketing ohne eigene Kamera'];
assert.deepEqual(normalizeLongTailKeywords([phrases[0], ' ONLINE  GELD verdienen ab 50 ', null, 'Keyword', '<b>Affiliate</b> Marketing ohne eigene Kamera']), phrases);
assert.deepEqual(normalizeLongTailKeywords('not an array'), []);
assert.equal(normalizeLongTailKeywords(Array.from({length:20},(_,i)=>`Konkrete Suchphrase Nummer ${i}`)).length, 10);
assert.ok(longTailKeywordPrompt({longTailKeywords:phrases}).includes(phrases[0]));
const settings = createOnlineBusinessProject('audit');
const article = {title:'Gespeicherter Artikel',metaDescription:'Beschreibung',contentMarkdown:'Bestehender Artikel mit einem [Link](https://example.com/).',wordCount:8,readingTimeMinutes:1,status:'published' as const, longTailKeywords:phrases};
const brief = {mainKeyword:'Online Geld verdienen',secondaryKeywords:[],suggestedTitle:article.title,h1:article.title,searchIntent:'informational' as const,targetAudience:'Menschen ab 50',metaDescription:'Beschreibung',outline:[],faqTopics:[],cta:'Mehr erfahren',internalLinkingSuggestions:[],longTailKeywords:['Alte Suchphrase im Briefing']};
const project: CentralContentProject = {id:'legacy',topic:'Online Geld verdienen',projectSettings:settings,contentBrief:brief,blogArticle:article,pinterestPins:[],youtubeShorts:[],calendarItems:[],createdAt:'2026-11-24'};
assert.deepEqual(briefForSocial(project).longTailKeywords, phrases, 'Current article phrases are passed to subsequent social content');
assert.deepEqual(briefForSocial({...project,blogArticle:{...article,longTailKeywords:[]}}).longTailKeywords, [], 'An explicitly cleared list must not resurrect brief phrases');
assert.equal(briefForSocial(project).sourceArticle, undefined);
assert.deepEqual(normalizeSeoGeo({},article,brief).longTailKeywords,phrases);
assert.deepEqual(normalizeSeoGeo({longTailKeywords:[]},article,brief).longTailKeywords,[]);
assert.equal(wordpressSeoMeta('seopress', {...article,focusKeyword:'Online Geld verdienen'},brief)?._seopress_analysis_target_kw,'Online Geld verdienen','Long-tail lists do not silently replace the selected SEO focus keyword');

// Execute the actual protected suggestion route without any real model calls.
const server = readFileSync('server.ts','utf8');
const ast = ts.createSourceFile('server.ts',server,ts.ScriptTarget.ES2022,true);
let handler: (req:any,res:any)=>Promise<void>;
let request:any; let calls=0; let responseText=JSON.stringify({longTailKeywords:phrases});
const ctx=vm.createContext({normalizeLongTailKeywords,contentLanguageInstruction,requireVerifiedMember(){},requireProMember(){},requireContentProjectAccess(){},
  app:{post:(_path:string,...handlers:any[])=>{handler=handlers.at(-1);}},
  ai:{models:{generateContent:async(input:any)=>{calls++;request=input;return{text:responseText};}}}});
function visit(node:ts.Node) {
 if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)) {
  const call=node.expression;
  if(call.expression.getText(ast)==='app.post'&&ts.isStringLiteral(call.arguments[0])&&call.arguments[0].text==='/api/content-engine/long-tail-keywords') {
   assert.match(node.getText(ast),/requireVerifiedMember, requireProMember, requireContentProjectAccess/);
   vm.runInContext(ts.transpileModule(node.getText(ast),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,ctx);return;
  }
 }
 ts.forEachChild(node,visit);
}
visit(ast);
async function invoke(body:any){let status=200;let result:any;await handler({body},{status(code:number){status=code;return this;},json(value:any){result=value;}});return{status,result};}
for(const [language,label] of [['de','German'],['en','English'],['pl','Polish']]) {
 const result=await invoke({topic:article.title,content:article.contentMarkdown,projectSettings:{...settings,language}});
 assert.equal(result.status,200);assert.equal(JSON.stringify(result.result.longTailKeywords),JSON.stringify(phrases));
 assert.ok(request.config.systemInstruction.includes('Output language: '+label));
 assert.equal(JSON.parse(request.contents).content,article.contentMarkdown);
}
const before=calls;
for(const body of [{topic:'',content:'Text'},{topic:'Titel',content:''},{topic:'Titel',content:'x'.repeat(200001)},{topic:[],content:'Text'}]) assert.equal((await invoke(body)).status,400);
assert.equal(calls,before,'Invalid input is rejected before calling AI');
for(const bad of ['not json','{}','{"longTailKeywords":["kurz",7]}']) {responseText=bad;assert.equal((await invoke({topic:article.title,content:article.contentMarkdown,projectSettings:settings})).status,502);}

// Run real client response mapping: each content format retains its phrases.
const temp=mkdtempSync(join(tmpdir(),'gommar-long-tail-'));
symlinkSync(join(process.cwd(),'node_modules'),join(temp,'node_modules'),'dir');
try {
 const bundled=await build({entryPoints:['src/services/aiContentService.ts'],bundle:true,write:false,platform:'node',format:'esm',packages:'external',logLevel:'silent',plugins:[{name:'isolated-api',setup(builder){
  builder.onResolve({filter:/authenticatedFetch$/},()=>({path:'api',namespace:'audit'}));
  builder.onLoad({filter:/.*/,namespace:'audit'},()=>({loader:'js',contents:`export async function authenticatedFetch(url,options){
   globalThis.__keywordRequests.push({url,body:JSON.parse(options.body)});
   return {ok:true,json:async()=>globalThis.__keywordResponse};
  }`}));
 }}]});
 writeFileSync(join(temp,'service.mjs'),bundled.outputFiles[0].text);
 const {AIContentService}=await import(pathToFileURL(join(temp,'service.mjs')).href);
 (globalThis as any).__keywordRequests=[];
 (globalThis as any).__keywordResponse={brief,article,pins:[{title:'Ein Pin',longTailKeywords:phrases}],video:{title:'Ein Video',longTailKeywords:phrases},shorts:[{title:'Ein Short',longTailKeywords:phrases}],longTailKeywords:phrases};
 const generatedBrief=(await AIContentService.generateContentBrief(project.topic,settings)).brief;
 assert.deepEqual(generatedBrief.longTailKeywords,brief.longTailKeywords);
 const blog=await AIContentService.generateBlogArticle(project.topic,brief,settings,null);
 assert.deepEqual(blog.longTailKeywords,phrases);assert.equal(blog.contentMarkdown,article.contentMarkdown);
 const pins=await AIContentService.generatePinterestPins(project.topic,brief,settings,null);
 const ig=await AIContentService.generatePinterestPins(project.topic,brief,settings,null,{channel:'instagram'});
 const video=await AIContentService.generateYouTubeScript(project.topic,brief,settings,null);
 const shorts=await AIContentService.generateYouTubeShorts(project.topic,brief,settings,null);
 for(const item of [...pins,...ig,video,...shorts]) assert.deepEqual(item.longTailKeywords,phrases);
 const updated=appendYouTubeContent(appendSocialPins(project,'instagram',ig,'ig'),video,shorts,'yt');
 const reloaded=JSON.parse(JSON.stringify(updated));
 assert.deepEqual(reloaded.instagramPosts[0].longTailKeywords,phrases);assert.deepEqual(reloaded.youtubeVideo.longTailKeywords,phrases);assert.deepEqual(reloaded.youtubeShorts[0].longTailKeywords,phrases);
 assert.equal(reloaded.blogArticle.contentMarkdown,article.contentMarkdown);
 assert.deepEqual(await AIContentService.suggestLongTailKeywords(article.title,article.contentMarkdown,settings),phrases);
 const last=(globalThis as any).__keywordRequests.at(-1);assert.equal(last.url,'/api/content-engine/long-tail-keywords');assert.equal(last.body.projectSettings.id,settings.id);
} finally {delete (globalThis as any).__keywordRequests;delete (globalThis as any).__keywordResponse;rmSync(temp,{recursive:true,force:true});}
console.log('Long-Tail-Keywords geprüft: echte API-Route, Eingabe-/Antwortfehler, DE/EN/PL, alle Inhaltsformate, bestehende Artikel, Fokuskeyword und Speicherung bleiben erhalten.');

// Exercise actual UI handlers, including a source edit during the model request.
const slots:any[]=[]; let cursor=0; let writes=0; let confirm=true;
let resolveSuggestion:(value:string[])=>void;
const react={
 createElement:(type:unknown,props:any,...children:unknown[])=>({type,props:{...props,children}}),
 useState(value:any){const i=cursor++;if(!(i in slots))slots[i]=value;return[slots[i],(next:any)=>{slots[i]=next;}];},
 useRef(value:any){const i=cursor++;if(!(i in slots))slots[i]={current:value};return slots[i];},
 useEffect(){},
};
const uiContext=vm.createContext({exports:{},console,require(name:string){
 if(name==='react')return react;
 if(name.endsWith('longTailKeywords'))return{normalizeLongTailKeywords};
 if(name.endsWith('useContentHubCopy'))return{useContentHubCopy:()=>({hubText:(text:string)=>text})};
 if(name.endsWith('aiContentService'))return{AIContentService:{suggestLongTailKeywords:()=>new Promise<string[]>(resolve=>{resolveSuggestion=resolve;})}};
 return{};
}});
vm.runInContext(ts.transpileModule(readFileSync('src/components/ContentEngine/LongTailKeywordsPanel.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,uiContext);
const KeywordPanel=uiContext.exports.LongTailKeywordsPanel;
let source='Originaler Text';
const render=()=>{cursor=0;return KeywordPanel({value:[],topic:'Originaler Titel',content:source,projectSettings:settings,onChange:async(value:string[])=>{writes++;assert.deepEqual(value,phrases);return confirm;}});};
const find=(node:any,test:(node:any)=>boolean):any=>{
 if(Array.isArray(node)){for(const child of node){const result=find(child,test);if(result)return result;}}
 else if(node&&typeof node==='object'){if(test(node))return node;return find(node.props?.children,test);}
};
const generate=(tree:any)=>find(tree,node=>node.type==='button'&&node.props.children.includes('Long-Tail-Keywords erstellen')).props.onClick();
generate(render());source='Zwischenzeitlich geänderter Text';render();resolveSuggestion!(phrases);await new Promise(setImmediate);
assert.equal(writes,0,'A stale keyword response cannot overwrite an edited article');
assert.match(find(render(),node=>node.props?.role==='alert').props.children.join(''),/inzwischen geändert/);
generate(render());resolveSuggestion!(phrases);await new Promise(setImmediate);assert.equal(writes,1);
confirm=false;generate(render());resolveSuggestion!(phrases);await new Promise(setImmediate);
assert.match(find(render(),node=>node.props?.role==='alert').props.children.join(''),/erfolgreich speichern/);
console.log('Keyword-Editor geprüft: Generierung schreibt nur Keywords, Quellenwechsel verwirft alte Antworten, fehlgeschlagene Cloud-Speicherung bleibt sichtbar.');
