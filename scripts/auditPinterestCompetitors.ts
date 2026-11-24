import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { publicPinUrl, publicPinMetadata, resolvePinSource, loadPublicPin, searchCompetitorPins } from '../server/pinterestCompetitorSearch';
import { analyzePinterestDesign } from '../server/pinterestDesignResearch';
import { normalizePinDesignProfile } from '../src/utils/pinterestDesign';

const pinUrl='https://www.pinterest.com/pin/123456789/';
const imageUrl='https://i.pinimg.com/originals/reference.png';
const head=`<head><meta content="${pinUrl}" property="og:url"><meta property='og:title' content='Business &amp; Design'><meta property="og:image" content="${imageUrl}"></head>`;
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9ZlS8AAAAASUVORK5CYII=','base64');
const requests:string[]=[];
const request:typeof fetch=async(input,init)=>{
 const url=String(input);requests.push(url);assert.equal(init?.headers?.['Authorization'],undefined,'Public references do not receive account tokens');
 if(url===pinUrl)return new Response(head,{headers:{'content-type':'text/html; charset=utf-8'}});
 if(url===imageUrl)return new Response(png,{headers:{'content-type':'image/png'}});
 if(url.startsWith('https://vertexaisearch.cloud.google.com/grounding-api-redirect/'))return new Response(null,{status:302,headers:{location:pinUrl}});
 throw new Error('Unexpected URL '+url);
};
for(const url of ['https://evil.test/pin/123/','https://pinterest.com.evil.test/pin/123/','http://pinterest.com/pin/123/','https://a:b@pinterest.com/pin/123/','https://pinterest.com:8443/pin/123/','https://pinterest.com/search/pins/','https://127.0.0.1/pin/123/','https://pin.it/123','https://pinterest.com/pin/not-a-pin/'])assert.equal(publicPinUrl(url),null);
assert.equal(publicPinUrl('https://de.pinterest.com/pin/123456789/?tracking=1'),pinUrl);
assert.equal(publicPinMetadata(head,pinUrl)?.title,'Business & Design');
assert.equal(publicPinMetadata(head.replace('</head>','<meta property="og:see_also" content="https://gomo-marketing.at/article/"></head>'),pinUrl,new Set(['gomo-marketing.at'])),null,'Known own-site destinations are excluded from competitor results');
assert.equal(publicPinMetadata(head.replace(imageUrl,'https://evil.test/picture.png'),pinUrl),null);
assert.equal(publicPinMetadata(head.replace('property="og:url"','property="unrelated"'),pinUrl),null);
assert.equal(await resolvePinSource('https://evil.test/',request),null);
assert.equal(await resolvePinSource('https://vertexaisearch.cloud.google.com/grounding-api-redirect/test',request),pinUrl);
let forbiddenFetches=0;
const maliciousRedirect:typeof fetch=async(input)=>{forbiddenFetches++;assert.ok(String(input).startsWith('https://vertexaisearch.cloud.google.com/'));return new Response(null,{status:302,headers:{location:'http://169.254.169.254/latest/meta-data'}});};
assert.equal(await resolvePinSource('https://vertexaisearch.cloud.google.com/grounding-api-redirect/test',maliciousRedirect),null);assert.equal(forbiddenFetches,1);
await assert.rejects(()=>loadPublicPin(pinUrl,async()=>new Response(null,{status:302,headers:{location:'https://evil.test/'}})),/nicht.*lesbar/);
await assert.rejects(()=>loadPublicPin(pinUrl,async()=>new Response('Sign in',{status:403})),/nicht.*lesbar/);
await assert.rejects(()=>loadPublicPin(pinUrl,async()=>new Response('<head>'+(' '.repeat(600000))+head,{headers:{'content-type':'text/html'}})),/nicht.*lesbar/);
assert.equal((await loadPublicPin(pinUrl,request)).kind,'competitor');

let generation:any;
const searchResponse={text:'A hallucinated URL https://www.pinterest.com/pin/999/ should never be trusted.',candidates:[{finishReason:'STOP',groundingMetadata:{webSearchQueries:['site:pinterest.com/pin/ online business'],groundingChunks:[{web:{uri:pinUrl}},{web:{uri:pinUrl}},{web:{uri:'https://evil.test/'}},{web:{uri:'https://www.pinterest.com/boards/'}}],searchEntryPoint:{renderedContent:'<div>Google attribution</div>'}}}]};
const ai={models:{generateContent:async(input:any)=>{generation=input;return searchResponse;}}};
const report=await searchCompetitorPins(ai,{query:'Online Business ab 50'},request);
assert.equal(report.pins.length,1);assert.equal(report.pins[0]?.pinUrl,pinUrl);assert.equal(report.pins[0]?.outboundClicks,undefined);
assert.ok(generation.config.tools[0].googleSearch);assert.ok(report.searchSuggestionsHtml.includes('Google'));
assert.ok(!requests.some(url=>url.includes('/999/')),'Model text cannot fabricate search results');
await assert.rejects(()=>searchCompetitorPins(ai,{query:'x'},request),/3 bis 250/);
await assert.rejects(()=>searchCompetitorPins({models:{generateContent:async()=>({candidates:[{finishReason:'STOP',groundingMetadata:{groundingChunks:[]}}]})}},{query:'Business'},request),/keine abgeschlossene/);
const empty=await searchCompetitorPins({models:{generateContent:async()=>({...searchResponse,candidates:[{finishReason:'STOP',groundingMetadata:{...searchResponse.candidates[0].groundingMetadata,groundingChunks:[]}}]})}},{query:'Unknown topic'},request);
assert.equal(empty.pins.length,0,'No invented fallback pins');

const variants=[{layout:'bold',background:'#ffffff',foreground:'#111827',accent:'#047857',alignment:'left',headingSize:'large'},{layout:'split',background:'#111827',foreground:'#ffffff',accent:'#047857',alignment:'left',headingSize:'large'},{layout:'list',background:'#ffffff',foreground:'#111827',accent:'#047857',alignment:'center',headingSize:'medium'}];
let analyzed:any;
const profile=await analyzePinterestDesign({models:{generateContent:async(input:any)=>{analyzed=input;return{text:JSON.stringify({variants,observations:['Große Schrift und klare Hierarchie.'],imageGuidance:'Eigenes passendes Motiv verwenden.'})};}}},undefined,{competitorPinUrls:[pinUrl],topic:'Online Business'},request);
assert.equal(profile.references[0].kind,'competitor');assert.equal(profile.references[0].outboundClicks,undefined);
assert.ok(analyzed.contents[0].parts.some((part:any)=>part.inlineData?.data===png.toString('base64')),'Actual competitor image bytes reach the visual model');
assert.equal(normalizePinDesignProfile(profile)?.references[0].pinUrl,pinUrl);
const forged=normalizePinDesignProfile({...profile,references:[{...profile.references[0],outboundClicks:999999}]});assert.equal(forged?.references[0].outboundClicks,undefined);
await assert.rejects(()=>analyzePinterestDesign(ai,undefined,{competitorPinUrls:[pinUrl,pinUrl],topic:'Business'},request),/unterschiedliche/);
await assert.rejects(()=>analyzePinterestDesign(ai,undefined,{competitorPinUrls:[pinUrl,pinUrl,pinUrl,pinUrl],topic:'Business'},request));

// Actual UI event handlers: search, select a competitor, analyze, persist; no own-account request.
const slots:any[]=[];let cursor=0;let saved:any;const apiCalls:any[]=[];
const react={createElement:(type:unknown,props:any,...children:unknown[])=>({type,props:{...props,children}}),useState(value:any){const i=cursor++;if(!(i in slots))slots[i]=value;return[slots[i],(next:any)=>{slots[i]=next;}];},useRef(value:any){const i=cursor++;if(!(i in slots))slots[i]={current:value};return slots[i];},useEffect(){}};
const ctx=vm.createContext({exports:{},URL,Date,console,require(name:string){if(name==='react')return react;if(name.endsWith('useContentHubCopy'))return{useContentHubCopy:()=>({hubText:(value:string)=>value})};if(name.endsWith('authenticatedFetch'))return{authenticatedFetch:async(url:string,options:any)=>{const body=JSON.parse(options.body);apiCalls.push({url,body});return{ok:true,json:async()=>url.endsWith('competitors')?report:{profile}};}};return{};}});
vm.runInContext(ts.transpileModule(readFileSync('src/components/ContentEngine/PinterestDesignPanel.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,ctx);
const render=()=>{cursor=0;return ctx.exports.PinterestDesignPanel({project:{id:'academy',name:'Academy'},topic:'Online Business',onSave:async(value:any)=>{saved=value;return true;}});};
const find=(node:any,test:(n:any)=>boolean):any=>{if(Array.isArray(node)){for(const child of node){const result=find(child,test);if(result)return result;}}else if(node&&typeof node==='object'){if(test(node))return node;return find(node.props?.children,test);}};
find(render(),n=>n.type==='button'&&n.props.children.includes('Konkurrenz-Pins suchen')).props.onClick();await new Promise(setImmediate);
assert.equal(apiCalls[0].body.query,'Online Business');
let tree=render();const iframe=find(tree,n=>n.type==='iframe');assert.ok(iframe.props.sandbox&&!iframe.props.sandbox.includes('allow-scripts')&&!iframe.props.sandbox.includes('allow-same-origin'));
find(tree,n=>n.type==='input'&&n.props.type==='checkbox').props.onChange({target:{checked:true}});
find(render(),n=>n.type==='button'&&n.props.children.includes('Ausgewählte Bilder analysieren und Designvorgaben speichern')).props.onClick();await new Promise(setImmediate);
assert.deepEqual(apiCalls[1].body.competitorPinUrls,[pinUrl]);assert.equal(apiCalls[1].body.pinIds.length,0);assert.equal(saved.pinterestDesignProfile.references[0].kind,'competitor');
assert.ok(apiCalls.every(call=>!call.url.includes('top-pins')));
console.log('Konkurrenz-Pins geprüft: belegte Suchquellen, sichere öffentliche Bilder, keine erfundenen Messwerte, echte Bildanalyse, Auswahl und Speicherung ohne Pinterest-Kontozugriff.');

// Server route rejects missing membership, invalid topics and sandbox before invoking search.
let searches=0;let handler:any;
const routeContext=vm.createContext({app:{post:(_path:string,...args:any[])=>{handler=args.at(-1);}},requireVerifiedMember(){},requireProMember(){},requireContentProjectAccess(){},ai:{},searchCompetitorPins:async()=>{searches++;return report;}});
const ast=ts.createSourceFile('server.ts',readFileSync('server.ts','utf8'),ts.ScriptTarget.ES2022,true);
function visit(node:ts.Node){if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)&&node.expression.expression.getText(ast)==='app.post'&&node.expression.arguments[0]?.getText(ast).includes("'/api/pinterest/design/competitors'")){assert.match(node.getText(ast),/requireVerifiedMember, requireProMember, requireContentProjectAccess/);vm.runInContext(ts.transpileModule(node.getText(ast),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,routeContext);}else ts.forEachChild(node,visit);}
visit(ast);assert.ok(handler);
let status=200;const res={locals:{pinterestEnvironment:'production'},status(code:number){status=code;return this;},json(){}};
await handler({body:{query:'Business'}},res);assert.equal(status,401);assert.equal(searches,0);
await handler({body:{query:'x'},firebaseUser:{sub:'member'}},res);assert.equal(status,400);assert.equal(searches,0);
res.locals.pinterestEnvironment='sandbox';await handler({body:{query:'Business'},firebaseUser:{sub:'member'}},res);assert.equal(status,400);assert.equal(searches,0);
res.locals.pinterestEnvironment='production';status=200;await handler({body:{query:'Business'},firebaseUser:{sub:'member'}},res);assert.equal(status,200);assert.equal(searches,1);
