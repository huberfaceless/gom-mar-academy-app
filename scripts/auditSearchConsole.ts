import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
import {createSearchConsoleAdmin,createSearchConsoleAuthorization,searchConsoleConfig,searchConsolePeriod} from '../server/searchConsoleAdmin';
import {registerSearchConsoleRoutes} from '../server/searchConsoleRoutes';
import * as keywordUtils from '../src/utils/searchConsoleKeywords';
import {contentHubEnglish} from '../src/i18n/contentHubCopy';
const env={SEARCH_CONSOLE_OAUTH_CLIENT_ID:'test-client',SEARCH_CONSOLE_OAUTH_CLIENT_SECRET:'test-secret',SEARCH_CONSOLE_TOKEN_ENCRYPTION_KEY:'test-encryption',FIREBASE_DATABASE_ID:'(default)'};
const now=new Date('2026-11-24T12:00:00Z');
assert.deepEqual(searchConsolePeriod(28,now),{startDate:'2026-10-25',endDate:'2026-11-21'});
assert.equal(searchConsolePeriod(28,new Date('2026-11-24T00:00:00Z')).endDate,'2026-11-20','Pacific date is used even before UTC midnight changes locally');
assert.throws(()=>searchConsolePeriod(30,now));
assert.equal(searchConsoleConfig({YOUTUBE_OAUTH_CLIENT_ID:'id',YOUTUBE_OAUTH_CLIENT_SECRET:'secret',YOUTUBE_TOKEN_ENCRYPTION_KEY:'key'}).configured,true);
assert.equal(searchConsoleConfig({...env,SEARCH_CONSOLE_OAUTH_CLIENT_SECRET:'',YOUTUBE_OAUTH_CLIENT_SECRET:'other'}).configured,false,'Do not mix partial dedicated client credentials with YouTube credentials');
for(const [property,website,allowed] of [['sc-domain:gomo-marketing.at','https://vital50.gomo-marketing.at/',true],['sc-domain:gomo-marketing.at','https://gomo-marketing.at.evil.test/',false],['https://gomo-marketing.at/','https://vital50.gomo-marketing.at/',false],['https://gomo-marketing.at/blog/','https://gomo-marketing.at/',false],['https://gomo-marketing.at/','https://gomo-marketing.at/blog/',true]] as const)assert.equal(keywordUtils.propertyMatchesWebsite(property,website),allowed);
for(const invalid of ['javascript:alert(1)','https://a:b@example.com/','not a URL'])assert.throws(()=>keywordUtils.searchConsoleWebsite(invalid));
const docs=new Map<string,any>(),calls:{url:string;init?:RequestInit}[]=[];let queryStatus=200;let queryRows:any=[{keys:['online business ab 50'],clicks:8,impressions:200,ctr:.04,position:9.5},{keys:['neues thema ohne messwerte'],ctr:4}];
let exchangeCalls=0;
const request:typeof fetch=async(input,init)=>{
 const url=String(input);calls.push({url,init});
 if(url.startsWith('https://firestore.googleapis.com/')){
  assert.equal((init?.headers as any).Authorization,'Bearer server-database');
  if(init?.method==='PATCH'){docs.set(url,JSON.parse(String(init.body)));return Response.json({});}
  if(init?.method==='DELETE'){docs.delete(url);return new Response(null,{status:204});}
  return docs.has(url)?Response.json(docs.get(url)):Response.json({}, {status:404});
 }
 if(url==='https://oauth2.googleapis.com/token'){
  const params=new URLSearchParams(String(init?.body));assert.equal(params.get('client_id'),'test-client');assert.equal(params.get('client_secret'),'test-secret');
  if(params.get('grant_type')==='authorization_code'){exchangeCalls++;return Response.json({refresh_token:'private-refresh-token',scope:'https://www.googleapis.com/auth/webmasters.readonly'});}
  assert.equal(params.get('refresh_token'),'private-refresh-token');return Response.json({access_token:'private-access-token'});
 }
 assert.equal((init?.headers as any).Authorization,'Bearer private-access-token');
 if(url.endsWith('/sites'))return Response.json({siteEntry:[{siteUrl:'https://gomo-marketing.at/',permissionLevel:'siteOwner'},{siteUrl:'sc-domain:gomo-marketing.at',permissionLevel:'siteFullUser'},{siteUrl:'https://evil.test/',permissionLevel:'siteOwner'},{siteUrl:'https://gomo-marketing.at/blog/',permissionLevel:'siteOwner'},{siteUrl:'https://gomo-marketing.at/',permissionLevel:'siteUnverifiedUser'}]});
 if(url.includes('/searchAnalytics/query'))return queryStatus===200?Response.json({rows:queryRows}):Response.json({error:{message:'private-access-token must never be reflected'}},{status:queryStatus});
 throw Error('Unexpected request '+url);
};
const service=createSearchConsoleAdmin({env,request,now:()=>now,databaseToken:async()=>'server-database'});
assert.deepEqual(await service.status('db','member'),{configured:true,connected:false,connectedAt:null});
const authorization=createSearchConsoleAuthorization('member',env,now.getTime()),url=new URL(authorization.authorizationUrl),state=url.searchParams.get('state')!;
assert.equal(url.origin,'https://accounts.google.com');assert.equal(url.searchParams.get('scope'),'https://www.googleapis.com/auth/webmasters.readonly');assert.equal(url.searchParams.get('include_granted_scopes'),'false');
await assert.rejects(()=>service.complete('db','code',state,'wrong nonce'));assert.equal(exchangeCalls,0);
await assert.rejects(()=>service.complete('db','code',state+'tampered',authorization.nonce));assert.equal(exchangeCalls,0);
const expired=createSearchConsoleAuthorization('member',env,now.getTime()-601000);await assert.rejects(()=>service.complete('db','code',new URL(expired.authorizationUrl).searchParams.get('state')!,expired.nonce));assert.equal(exchangeCalls,0);
await service.complete('db','code',state,authorization.nonce);
assert.equal((await service.status('db','member')).connected,true);assert.equal((await service.status('db','other-member')).connected,false);
assert.ok(!JSON.stringify([...docs.values()]).includes('private-refresh-token'),'Refresh tokens are encrypted in the server-only collection');
await assert.rejects(()=>service.properties('db','other-member','https://gomo-marketing.at/'),/zuerst/);
const sites=await service.properties('db','member','https://gomo-marketing.at/');assert.deepEqual(sites.map((item:any)=>item.siteUrl),['https://gomo-marketing.at/','sc-domain:gomo-marketing.at']);
const report=await service.queries('db','member',{websiteUrl:'https://gomo-marketing.at/',property:'sc-domain:gomo-marketing.at',days:28});
assert.equal(report.rows[0].impressions,200);assert.equal(report.rows[1].impressions,null);assert.equal(report.rows[1].ctr,null);assert.equal(report.source,'Google Search Console');
const queryRequest=calls.filter(c=>c.url.includes('/searchAnalytics/query')).at(-1)!;const body=JSON.parse(String(queryRequest.init?.body));
assert.equal(body.dataState,'final');assert.deepEqual(body.dimensions,['query']);assert.equal(body.rowLimit,250);const regex=new RegExp(body.dimensionFilterGroups[0].filters[0].expression);
assert.ok(regex.test('https://gomo-marketing.at/article/'));assert.ok(!regex.test('https://vital50.gomo-marketing.at/article/'));assert.ok(!regex.test('https://gomo-marketing.at.evil.test/'));
await assert.rejects(()=>service.queries('db','member',{websiteUrl:'https://gomo-marketing.at/',property:'https://evil.test/',days:28}),/passt nicht/);
queryRows=[];const empty=await service.queries('db','member',{websiteUrl:'https://gomo-marketing.at/',property:'sc-domain:gomo-marketing.at',days:28});assert.deepEqual(empty.rows,[]);
queryStatus=403;await assert.rejects(()=>service.queries('db','member',{websiteUrl:'https://gomo-marketing.at/',property:'sc-domain:gomo-marketing.at',days:28}),error=>error instanceof Error&&error.message.includes('Berechtigung')&&!error.message.includes('private-access-token'));
assert.equal(keywordUtils.keywordDataStatus('Online Business ab 50',report,'https://gomo-marketing.at/'),'data');assert.equal(keywordUtils.keywordDataStatus('anderes Thema',report,'https://gomo-marketing.at/'),'unchecked');assert.equal(keywordUtils.keywordDataStatus('online business ab 50',report,'https://vital50.gomo-marketing.at/'),'unchecked');assert.equal(keywordUtils.keywordDataStatus('online business ab 50',undefined,'https://gomo-marketing.at/'),'ai');

// API guards and authenticated identity never come from request bodies.
const routes=new Map<string,{handlers:any[]}>(),verified=()=>{},pro=()=>{},projectGuard=()=>{};let received:any;
const app={get:(path:string,...handlers:any[])=>routes.set('GET '+path,{handlers}),post:(path:string,...handlers:any[])=>routes.set('POST '+path,{handlers}),delete:(path:string,...handlers:any[])=>routes.set('DELETE '+path,{handlers})};
registerSearchConsoleRoutes(app as any,[verified,pro],projectGuard,'db','https://academy.gomo-marketing.at',{status:async(...args:any[])=>{received=args;return{connected:true};},properties:async(...args:any[])=>{received=args;return[];},queries:async(...args:any[])=>{received=args;return report;},complete:async()=>{},disconnect:async()=>{}} as any);
for(const [path,route] of routes)if(!path.endsWith('/callback')){assert.ok(route.handlers.includes(verified));assert.ok(route.handlers.includes(pro));if(path.endsWith('queries')||path.endsWith('properties'))assert.ok(route.handlers.includes(projectGuard));}
let status=200;let response:any;const res={setHeader(){},status(code:number){status=code;return this;},json(value:any){response=value;},redirect(){}};
await routes.get('POST /api/search-console/queries')!.handlers.at(-1)({body:{userId:'forged',projectSettings:{websiteUrl:'https://gomo-marketing.at/'},property:'sc-domain:gomo-marketing.at',days:28},firebaseUser:{sub:'real-member'}},res);
assert.equal(received[1],'real-member');assert.ok(!JSON.stringify(response).includes('private-refresh-token'));
await routes.get('GET /api/search-console/status')!.handlers.at(-1)({body:{userId:'forged'}},res);assert.equal(status,401);

// Actual panel handlers: fetch properties, load evidence, choose a measured main keyword, preserve draft content.
const slots:any[]=[{configured:true,connected:true}];let cursor=0;let activeBrief:any={mainKeyword:'KI-Idee',h1:'Mein Titel',suggestedTitle:'Mein Titel',longTailKeywords:[],outline:[]};let activeProject:any={id:'business',websiteUrl:'https://gomo-marketing.at/',name:'Business'};let saved=0;let confirm=true;let pending:any;let defer=false;
const react={createElement:(type:any,props:any,...children:any[])=>({type,props:{...props,children}}),useState(value:any){const i=cursor++;if(!(i in slots))slots[i]=value;return[slots[i],(next:any)=>{slots[i]=next;}];},useRef(value:any){const i=cursor++;if(!(i in slots))slots[i]={current:value};return slots[i];},useEffect(){}};
const ctx=vm.createContext({exports:{},Date,console,require(name:string){if(name==='react')return react;if(name.endsWith('searchConsoleKeywords'))return keywordUtils;if(name.endsWith('useContentHubCopy'))return{useContentHubCopy:()=>({hubText:(s:string)=>s})};if(name.endsWith('authenticatedFetch'))return{authenticatedFetch:async(path:string,options:any)=>{assert.equal(JSON.parse(options.body).projectSettings.id,'business');return{ok:true,json:async()=>path.endsWith('/properties')?{properties:sites}:defer?new Promise(resolve=>{pending=resolve;}):{report}};}};return{};}});
vm.runInContext(ts.transpileModule(readFileSync('src/components/ContentEngine/SearchConsoleKeywordsPanel.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,ctx);
const render=()=>{cursor=0;return ctx.exports.SearchConsoleKeywordsPanel({project:activeProject,brief:activeBrief,onChange:async(next:any)=>{if(!confirm)return false;saved++;activeBrief=next;return true;}});};
const find=(node:any,test:(n:any)=>boolean):any=>{if(Array.isArray(node)){for(const child of node){const result=find(child,test);if(result)return result;}}else if(node&&typeof node==='object'){if(test(node))return node;return find(node.props?.children,test);}};
const button=(text:string)=>find(render(),n=>n.type==='button'&&n.props.children.includes(text));
button('Website-Properties laden').props.onClick();await new Promise(setImmediate);button('Echte Suchdaten laden').props.onClick();await new Promise(setImmediate);
assert.equal(activeBrief.searchConsoleReport.source,'Google Search Console');assert.equal(activeBrief.mainKeyword,'KI-Idee');assert.ok(find(render(),n=>n.type==='span'&&n.props.children.includes('Noch ungeprüft')));
button('Als Hauptkeyword wählen').props.onClick();await new Promise(setImmediate);assert.equal(activeBrief.mainKeyword,'online business ab 50');assert.equal(activeBrief.h1,'Mein Titel');assert.ok(find(render(),n=>n.type==='span'&&n.props.children.includes('Suchdaten vorhanden')));
confirm=false;button('Echte Suchdaten laden').props.onClick();await new Promise(setImmediate);assert.match(find(render(),n=>n.props?.role==='alert').props.children.join(''),/Cloud-Speicherung/);
confirm=true;defer=true;button('Echte Suchdaten laden').props.onClick();await new Promise(setImmediate);const previousSaves=saved;activeProject={...activeProject,websiteUrl:'https://other.test/'};render();pending({report});await new Promise(setImmediate);assert.equal(saved,previousSaves);assert.match(find(render(),n=>n.props?.role==='alert').props.children.join(''),/geändert/);
for(const label of ['KI-Vorschlag','Suchdaten vorhanden','Noch ungeprüft','Echte Suchdaten laden'])assert.ok(contentHubEnglish[label]);
await service.disconnect('db','member');assert.equal((await service.status('db','member')).connected,false);
assert.match(readFileSync('firestore.rules','utf8'),/match \/\{document=\*\*\}[\s\S]*allow read, write: if false/);
console.log('Search Console geprüft: reiner OAuth-Lesezugriff, signierter Sitzungsstatus, verschlüsselte kontogetrennte Tokens, passende Properties, begrenzte Website-Abfrage in PT, echte Messwerte, unbekannte Werte, sichere API-Routen und tatsächliche Auswahl-/Speicherhandler.');

// OAuth start ignores any forged UID and keeps nonce and tokens out of the browser JSON.
const savedEnv=new Map(Object.keys(env).map(key=>[key,process.env[key]]));
try{
 Object.assign(process.env,env);const headers:Record<string,string>={};let started:any;
 const startRes={setHeader:(key:string,value:string)=>{headers[key]=value;},status(){return this;},json:(value:any)=>{started=value;}};
 await routes.get('POST /api/search-console/oauth/start')!.handlers.at(-1)({body:{userId:'forged'},firebaseUser:{sub:'real-member'}},startRes);
 const state=new URL(started.authorizationUrl).searchParams.get('state')!;
 assert.equal(JSON.parse(Buffer.from(state.split('.')[0],'base64url').toString()).uid,'real-member');
 assert.match(headers['Set-Cookie'],/HttpOnly; Secure; SameSite=Lax/);assert.equal(Object.keys(started).join(','),'authorizationUrl');
}finally{for(const [key,value] of savedEnv){if(value===undefined)delete process.env[key];else process.env[key]=value;}}
