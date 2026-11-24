import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import { readFileSync, mkdtempSync, writeFileSync, symlinkSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { loadTopPinDesigns, analyzePinterestDesign, pinterestImageUrl, researchPeriod } from '../server/pinterestDesignResearch';
import { colorContrast, normalizePinDesign, normalizePinDesignProfile, pinDesignPrompt } from '../src/utils/pinterestDesign';
import { renderAnalyzedPin } from '../src/utils/pinterestDesignRenderer';
import { createOnlineBusinessProject } from '../src/utils/contentStorage';
import { saveAllProjectSettings, loadAllProjectSettings } from '../src/utils/contentStorage';
import type { PinterestPin } from '../src/types/contentEngine';

const now=new Date('2026-11-24T09:00:00Z');
assert.deepEqual(researchPeriod(30,now),{start:'2026-10-25',end:'2026-11-23'});
assert.deepEqual(researchPeriod(90,now),{start:'2026-08-26',end:'2026-11-23'});
for(const days of [0,91,'bad',null])assert.throws(()=>researchPeriod(days,now));
for(const url of ['http://i.pinimg.com/a.jpg','https://i.pinimg.com.evil.test/a.jpg','https://evil.test/a.jpg','https://user:pass@i.pinimg.com/a.jpg','https://127.0.0.1/a.jpg'])assert.equal(pinterestImageUrl(url),null);
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9ZlS8AAAAASUVORK5CYII=','base64');
let calls:{url:string;init?:RequestInit}[]=[];
let deny=false;let huge=false;
const fakeFetch:typeof fetch=async(input,init)=>{
 const url=String(input);calls.push({url,init});
 if(url.includes('/analytics/top_pins')){
  if(deny)return new Response('{}',{status:403});
  return Response.json({pins:[null,{pin_id:'11',metrics:{IMPRESSION:1000,OUTBOUND_CLICK:30},data_status:{IMPRESSION:'READY'}},{pin_id:'22',metrics:{IMPRESSION:10,OUTBOUND_CLICK:2}},{pin_id:'33',metrics:{}},{pin_id:'11',metrics:{IMPRESSION:5,OUTBOUND_CLICK:1}},{pin_id:'https://evil.test'}]});
 }
 if(url.includes('/pins/'))return Response.json({title:`Titel ${url.split('/').at(-1)}`,media:{images:{'600x':{url:'https://i.pinimg.com/test.png'}}}});
 if(url==='https://i.pinimg.com/test.png')return new Response(png,{headers:{'Content-Type':'image/png',...(huge?{'Content-Length':String(4*1024*1024)}:{})}});
 throw new Error('Unexpected URL '+url);
};
const report=await loadTopPinDesigns('server-token',30,fakeFetch,now);
assert.equal(report.pins.length,3);assert.equal(report.pins[0].id,'11');assert.equal(report.pins[0].outboundRate,0.03);
assert.equal(report.pins[2].impressions,null);assert.equal(report.pins[2].outboundRate,null,'Missing counts never become zero or a fake CTR');
const query=new URL(calls[0].url);assert.equal(query.hostname,'api.pinterest.com');assert.equal(query.searchParams.get('content_type'),'ORGANIC');assert.equal(query.searchParams.get('sort_by'),'OUTBOUND_CLICK');assert.equal(query.searchParams.get('num_of_pins'),'50');
assert.ok(calls.every(call=>(call.init?.headers as any).Authorization==='Bearer server-token'));
deny=true;await assert.rejects(()=>loadTopPinDesigns('server-token',30,fakeFetch),/Analytics-Zugriff/);deny=false;
const design={layout:'split' as const,background:'#ffffff',foreground:'#eeeeee',accent:'#047857',alignment:'left' as const,headingSize:'large' as const};
assert.ok(colorContrast(normalizePinDesign(design)!.background,normalizePinDesign(design)!.foreground)>=4.5);
assert.equal(normalizePinDesign({...design,background:'url(javascript:evil)'})!.background,'#ffffff');
let modelRequest:any;let modelCalls=0;
const ai={models:{generateContent:async(request:any)=>{modelCalls++;modelRequest=request;return{text:JSON.stringify({observations:['Große Schrift und klarer Kontrast.'],imageGuidance:'Eigenes zum aktuellen Thema passendes Bild.',variants:[design,{...design,layout:'editorial'},{...design,layout:'bold'}]})};}}};
const settings=createOnlineBusinessProject('audit');
const input={days:30,pinIds:['11'],inspirations:[{title:'Vorbild ohne Messwerte',imageData:`data:image/png;base64,${png.toString('base64')}`,outboundClicks:999999}],topic:'Online-Business starten ab 50',projectSettings:settings};
calls=[];const profile=await analyzePinterestDesign(ai,'server-token',input,fakeFetch);
assert.equal(profile.references[0].outboundClicks,30);assert.equal(profile.references[1].kind,'inspiration');assert.equal(profile.references[1].outboundClicks,undefined,'Uploaded inspirations never inherit claimed click counts');
assert.equal(modelRequest.contents[0].parts.filter((p:any)=>p.inlineData).length,2,'Visual analysis receives actual image bytes, not titles alone');
assert.equal(calls.find(call=>call.url==='https://i.pinimg.com/test.png')?.init?.redirect,'error');
assert.equal(calls.find(call=>call.url==='https://i.pinimg.com/test.png')?.init?.headers,undefined,'Tokens are never sent to the image host');
assert.match(modelRequest.config.systemInstruction,/Weniger als 100 Impressionen/);
assert.equal(profile.variants.length,3);assert.ok(profile.variants.every(v=>colorContrast(v.background,v.foreground)>=4.5));
assert.ok(!JSON.stringify(profile).includes('base64'),'Reference artwork must not bloat saved projects');
const beforeModel=modelCalls;
await assert.rejects(()=>analyzePinterestDesign(ai,'server-token',{...input,pinIds:['999'],inspirations:[]},fakeFetch),/nicht auswertbar/);
await assert.rejects(()=>analyzePinterestDesign(ai,undefined,{...input,pinIds:['11'],inspirations:[]},fakeFetch),/Pinterest verbinden/);
await assert.rejects(()=>analyzePinterestDesign(ai,'server-token',{...input,pinIds:['11','11'],inspirations:[]},fakeFetch),/unterschiedliche/);
await assert.rejects(()=>analyzePinterestDesign(ai,undefined,{...input,pinIds:[],inspirations:[{imageData:'data:image/svg+xml;base64,PHN2Zz4='}]},fakeFetch),/gültiges/);
huge=true;await assert.rejects(()=>analyzePinterestDesign(ai,'server-token',{...input,inspirations:[]},fakeFetch),/sicher geladen/);huge=false;
assert.equal(modelCalls,beforeModel,'Bad sources are rejected before AI');
for(const [language,label] of [['de','German'],['en','English'],['pl','Polish']]){
 await analyzePinterestDesign(ai,undefined,{...input,pinIds:[],projectSettings:{...settings,language}},fakeFetch);
 assert.ok(modelRequest.config.systemInstruction.includes('Output language: '+label));
}
assert.ok(pinDesignPrompt(profile).includes('Design-Vorgaben aus einer Bildanalyse'));
assert.equal(pinDesignPrompt(undefined),'');assert.equal(normalizePinDesignProfile({version:1,variants:[]}),null);
assert.doesNotThrow(()=>normalizePinDesignProfile({...profile,references:[null,{}]}));

// Real canvas calls must use analyzed colors/typography and the current content/brand.
const drawn:string[]=[];const fills:string[]=[];let font='';let fill='';
const canvas={save(){},restore(){},scale(){},fillRect(){fills.push(fill);},fillText(value:string){drawn.push(value);},measureText(value:string){return{width:value.length*Number(font.match(/(\d+)px/)?.[1]||20)*.5};},beginPath(){},rect(){},clip(){},drawImage(){drawn.push('PHOTO');},set font(v:string){font=v;},set fillStyle(v:string){fill=v;},get font(){return font;},get fillStyle(){return fill;}} as unknown as CanvasRenderingContext2D;
const pin={id:'pin',title:'Dein Online-Business ab 50 starten',subHook:'Ein nachvollziehbarer Einstieg',ctaButtonText:'Leitfaden lesen',targetUrl:'https://gomo-marketing.at/article/',design:profile.variants[0]} as PinterestPin;
assert.equal(renderAnalyzedPin(canvas,1080,1620,pin,settings,{width:600,height:900} as HTMLImageElement),true);
assert.ok(fills.includes(profile.variants[0].background));assert.ok(drawn.includes('PHOTO'));assert.ok(drawn.includes(settings.name));assert.ok(drawn.includes('Leitfaden lesen'));assert.ok(drawn.includes('gomo-marketing.at'));
assert.ok(drawn.every(t=>!t.includes('Stoffwechsel')&&!t.includes('KOSTENLOSER RATGEBER')),'Analyzed business pins do not inherit hardcoded health promises');
assert.equal(renderAnalyzedPin(canvas,1080,1620,{...pin,design:undefined},settings),false,'Legacy designs remain compatible');

// Both endpoints use account identity from authentication, never a supplied token/user ID, and reject sandbox metrics.
const ast=ts.createSourceFile('server.ts',readFileSync('server.ts','utf8'),ts.ScriptTarget.ES2022,true);const routes=new Map<string,any>();const tokenReads:any[]=[];
const ctx=vm.createContext({app:{post:(path:string,...handlers:any[])=>routes.set(path,handlers.at(-1))},requireVerifiedMember(){},requireProMember(){},requireContentProjectAccess(){},FIREBASE_PROJECT_ID:'project',loadPinterestAccessToken:async(...args:any[])=>{tokenReads.push(args);return'server-token';},loadTopPinDesigns:async()=>report,analyzePinterestDesign:async()=>profile,ai});
function visit(node:ts.Node){if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)){const call=node.expression;if(call.expression.getText(ast)==='app.post'&&ts.isStringLiteral(call.arguments[0])&&call.arguments[0].text.startsWith('/api/pinterest/design/')){assert.match(node.getText(ast),/requireVerifiedMember, requireProMember, requireContentProjectAccess/);vm.runInContext(ts.transpileModule(node.getText(ast),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,ctx);return;}}ts.forEachChild(node,visit);}
visit(ast);assert.equal(routes.size,2);
for(const [path,handler] of routes){const readsBefore=tokenReads.length;let status=200;const res={locals:{pinterestEnvironment:'sandbox'},status(code:number){status=code;return this;},json(){}};await handler({body:{pinIds:['11']},firebaseUser:{sub:'real-user'}},res);assert.equal(status,400);assert.equal(tokenReads.length,readsBefore);
 res.locals.pinterestEnvironment='production';status=200;await handler({body:{pinIds:['11'],userId:'forged',accessToken:'forged'},firebaseUser:{sub:'real-user'}},res);assert.equal(status,200,path);assert.deepEqual(tokenReads.at(-1),['project','real-user','production']);}

// Test client mapping and saved settings with actual modules; no real services are called.
const temp=mkdtempSync(join(tmpdir(),'gommar-pin-design-'));symlinkSync(join(process.cwd(),'node_modules'),join(temp,'node_modules'),'dir');
try{
 const bundle=await build({stdin:{resolveDir:process.cwd(),loader:'tsx',contents:`
import React from 'react';import {renderToStaticMarkup} from 'react-dom/server';
import {LanguageProvider} from './src/context/LanguageContext';import {PinterestDesignPanel} from './src/components/ContentEngine/PinterestDesignPanel';
export {AIContentService} from './src/services/aiContentService';
export const render=(project,profile)=>renderToStaticMarkup(<LanguageProvider><PinterestDesignPanel project={{...project,pinterestDesignProfile:profile}} topic="Mein Thema" onSave={async()=>true}/></LanguageProvider>);
`},bundle:true,write:false,platform:'node',format:'esm',packages:'external',logLevel:'silent',plugins:[{name:'offline-auth',setup(b){b.onResolve({filter:/authenticatedFetch$/},()=>({path:'api',namespace:'audit'}));b.onLoad({filter:/.*/,namespace:'audit'},()=>({loader:'js',contents:`export const authenticatedFetch=async(url,options)=>({ok:true,json:async()=>({pins:[{title:'Aktuelles Thema',description:'Aktueller Text',subHook:'Kurze Zeile',bulletPoints:['Belegter Punkt'],ctaButtonText:'Lesen'}]})});`}));}}]});
 writeFileSync(join(temp,'ui.mjs'),bundle.outputFiles[0].text);const {render,AIContentService}=await import(pathToFileURL(join(temp,'ui.mjs')).href);
 const project={...settings,pinterestDesignProfile:profile};
 const result=await AIContentService.generatePinterestPins('Aktuelles Thema',{},project,null);
 assert.deepEqual(result[0].design,normalizePinDesign(profile.variants[0]));assert.equal(result[0].subHook,'Kurze Zeile');assert.equal(result[0].ctaButtonText,'Lesen');
 const ig=await AIContentService.generatePinterestPins('Aktuelles Thema',{},project,null,{channel:'instagram'});assert.equal(ig[0].design,undefined,'Pinterest guidelines do not silently override separately generated Instagram designs');
 const oldWindow=globalThis.window;const memory=new Map<string,string>();const storage={getItem:(key:string)=>memory.get(key)||null,setItem:(key:string,value:string)=>memory.set(key,value),removeItem:(key:string)=>memory.delete(key)};
 try{
  globalThis.window={localStorage:storage,sessionStorage:storage,location:{search:''}} as any;(globalThis as any).localStorage=storage;
  saveAllProjectSettings([project],'audit');assert.deepEqual(loadAllProjectSettings('audit').find(p=>p.id===settings.id)?.pinterestDesignProfile,profile);
  for(const language of ['de','en']){storage.setItem('gommar-language',language);const html=render(project,profile);assert.ok(html.includes(language==='en'?'Learn design from successful pins':'Design aus erfolgreichen Pins ableiten'));assert.ok(html.includes(language==='en'?'External references have no verified click data.':'Fremde Vorbilder bleiben ohne verifizierte Klickdaten.'));assert.ok(html.includes('Große Schrift und klarer Kontrast.'));}
 }finally{if(oldWindow===undefined)delete(globalThis as any).window;else globalThis.window=oldWindow;delete(globalThis as any).localStorage;}
}finally{rmSync(temp,{recursive:true,force:true});}
console.log('Pinterest-Designanalyse geprüft: reale Kontometriken, Zeiträume, keine erfundenen Fremdklicks, echte Bilddaten, geschützter Abruf, Sandbox-Trennung, Kontrastkorrektur, tatsächliche Canvas-Ausgabe, Generierung und Speicherung in DE/EN/PL.');

// Exercise actual panel event handlers: source changes and failed persistence cannot be reported as success.
const slots:any[]=[];let cursor=0;let writes=0;let confirm=true;let pending:(data:any)=>void;
const react={createElement:(type:unknown,props:any,...children:unknown[])=>({type,props:{...props,children}}),useState(value:any){const i=cursor++;if(!(i in slots))slots[i]=value;return[slots[i],(next:any)=>{slots[i]=next;}];},useRef(value:any){const i=cursor++;if(!(i in slots))slots[i]={current:value};return slots[i];},useEffect(){}};
const panelCtx=vm.createContext({exports:{},console,require(name:string){if(name==='react')return react;if(name.endsWith('useContentHubCopy'))return{useContentHubCopy:()=>({hubText:(s:string)=>s})};if(name.endsWith('authenticatedFetch'))return{authenticatedFetch:async(url:string)=>({ok:true,json:async()=>url.endsWith('top-pins')?report:new Promise(resolve=>{pending=resolve;})})};return{};}});
vm.runInContext(ts.transpileModule(readFileSync('src/components/ContentEngine/PinterestDesignPanel.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,panelCtx);
const Panel=panelCtx.exports.PinterestDesignPanel;let activeSettings=settings;
const renderPanel=()=>{cursor=0;return Panel({project:activeSettings,topic:'Mein Thema',onSave:async(saved:any)=>{writes++;assert.equal(saved.name,activeSettings.name);assert.equal(saved.pinterestDesignProfile.version,1);return confirm;}});};
const find=(node:any,test:(n:any)=>boolean):any=>{if(Array.isArray(node)){for(const child of node){const result=find(child,test);if(result)return result;}}else if(node&&typeof node==='object'){if(test(node))return node;return find(node.props?.children,test);}};
find(renderPanel(),n=>n.type==='button'&&n.props.children.includes('Klickstarke Pins meines Kontos laden')).props.onClick();await new Promise(setImmediate);
find(renderPanel(),n=>n.type==='input'&&n.props.type==='checkbox').props.onChange({target:{checked:true}});
const analyzeButton=(tree:any)=>find(tree,n=>n.type==='button'&&n.props.children.includes('Ausgewählte Bilder analysieren und Designvorgaben speichern'));
analyzeButton(renderPanel()).props.onClick();await new Promise(setImmediate);activeSettings={...settings,name:'Zwischenzeitlich bearbeitet'};renderPanel();pending!({profile});await new Promise(setImmediate);
assert.equal(writes,0);assert.match(find(renderPanel(),n=>n.props?.role==='alert').props.children.join(''),/geändert/);
analyzeButton(renderPanel()).props.onClick();await new Promise(setImmediate);pending!({profile});await new Promise(setImmediate);assert.equal(writes,1);
confirm=false;analyzeButton(renderPanel()).props.onClick();await new Promise(setImmediate);pending!({profile});await new Promise(setImmediate);
assert.match(find(renderPanel(),n=>n.props?.role==='alert').props.children.join(''),/Cloud-Speicherung/);assert.equal(find(renderPanel(),n=>n.props?.role==='status'),undefined);
console.log('Design-Panel geprüft: gemessene Pins auswählen, tatsächliche Analyse starten, geänderte Projektgrundlage verwerfen und Cloud-Fehler sichtbar lassen.');

// Image-prompt assistance must retain the design findings and current business topic.
let optimizedRequest:any;
(ctx as any).pinDesignPrompt=pinDesignPrompt;
(ctx as any).ai={models:{generateContent:async(input:any)=>{optimizedRequest=input;return{text:JSON.stringify({optimizedPrompt:'A clear workspace with a laptop',stockSearchKeywords:['laptop workspace']})};}}};
function registerOptimizer(node:ts.Node){if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)){const call=node.expression;if(call.expression.getText(ast)==='app.post'&&ts.isStringLiteral(call.arguments[0])&&call.arguments[0].text==='/api/pinterest/generate-image'){assert.match(node.getText(ast),/requireContentProjectAccess/);vm.runInContext(ts.transpileModule(node.getText(ast),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,ctx);return;}}ts.forEachChild(node,registerOptimizer);}
registerOptimizer(ast);let optimized:any;
await routes.get('/api/pinterest/generate-image')({body:{topic:'Online-Business',prompt:'Ein passendes Laptop-Bild',projectSettings:{...settings,pinterestDesignProfile:profile}}},{json(value:any){optimized=value;},status(){return this;}});
assert.ok(optimized.success);assert.match(optimized.data.optimizedPrompt,/laptop/);
assert.ok(optimizedRequest.contents.includes(profile.imageGuidance));assert.ok(optimizedRequest.contents.includes('Online-Business'));
assert.doesNotMatch(optimizedRequest.contents,/Vibrant healthy ingredients|commercial health photography/);
console.log('Bildauswahl geprüft: Motiv-Prompt übernimmt Designanalyse und Projektthema, ohne fest vorgegebene Gesundheitsmotive.');
