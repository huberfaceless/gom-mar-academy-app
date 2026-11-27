import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { LanguageProvider } from '../src/context/LanguageContext';
import { PinterestImagePickerModal } from '../src/components/ContentEngine/PinterestImagePickerModal';
import * as projectAccess from '../src/utils/contentProjectAccess';
import { createWeAreRealProject } from '../src/utils/wearerealPromotion';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
import {pinBrandText,projectPinWebsite} from '../src/utils/pinBranding';
import {renderPinToCanvas,CURATED_HEALTH_PHOTOS} from '../src/utils/pinterestCanvasRenderer';
import * as target from '../src/utils/pinterestTargetUrl';
import type {PinterestPin,ProjectSettings} from '../src/types/contentEngine';
const business={id:'business',name:'GOM-MAR Online Business',websiteUrl:'https://gomo-marketing.at/',defaultTargetUrl:'https://gomo-marketing.at/',targetAudience:'Menschen ab 50',coreTopics:[],language:'de',defaultCta:'Mehr erfahren',brandVoice:'klar',createdAt:''} as ProjectSettings;
const vital={...business,id:'vital50',name:'Vital50',websiteUrl:'https://vital50.gomo-marketing.at/'};
const pin={id:'one',angle:'curiosity',angleLabel:'',title:'Ein Online-Business aufbauen',description:'Hilfreiche Schritte für deinen Einstieg.',keywords:[],targetUrl:'https://gomo-marketing.at/',board:'Business',imagePrompt:'',templateStyle:'vital50_clean',status:'ai_generated'} as PinterestPin;
assert.equal(pinBrandText(pin,business),'GOMO-MARKETING.AT');assert.equal(pinBrandText(pin,vital),'VITAL50.GOMO-MARKETING.AT');
assert.equal(pinBrandText({...pin,customBrandText:'Meine eigene Marke'},business),'Meine eigene Marke');
assert.equal(pinBrandText({...pin,customBrandText:'   '},business),'GOMO-MARKETING.AT');
assert.equal(pinBrandText(pin,{...business,websiteUrl:''}),business.name);
assert.equal(projectPinWebsite({...business,websiteUrl:'https://www.gomo-marketing.at/blog/?ref=1'}),'gomo-marketing.at');
assert.equal(projectPinWebsite({...business,websiteUrl:'https://user:password@example.com/'}),business.name);

// Render the real editor component and invoke the actual branding field handler.
const react={createElement:(type:unknown,props:any,...children:unknown[])=>({type,props:{...props,children}}),useState:(value:any)=>[value,()=>{}],useRef:(value:any)=>({current:value}),useEffect(){}};
const context=vm.createContext({exports:{},require(name:string){if(name==='react')return react;if(name.endsWith('contentProjectAccess'))return projectAccess;if(name.endsWith('pinterestCanvasRenderer'))return{CURATED_HEALTH_PHOTOS};if(name.endsWith('pinBranding'))return{pinBrandText};if(name.endsWith('pinterestTargetUrl'))return target;if(name.endsWith('useContentHubCopy'))return{useContentHubCopy:()=>({language:'de',hubText:(value:string)=>value})};return{};}});
vm.runInContext(ts.transpileModule(readFileSync('src/components/ContentEngine/PinterestPinsTab.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,context);
let changes=0;let updated:PinterestPin[]=[];
const editor=(project:ProjectSettings,current=pin)=>context.exports.PinterestPinsTab({pins:[current],projectSettings:project,topic:'Business',onChange:(value:PinterestPin[])=>{changes++;updated=value;},onOpenInstagram(){}});
const find=(node:any,test:(value:any)=>boolean):any=>{if(Array.isArray(node)){for(const child of node){const found=find(child,test);if(found)return found;}}else if(node&&typeof node==='object'){if(test(node))return node;return find(node.props?.children,test);}};
const brandInput=(tree:any,value:string)=>find(tree,node=>node.type==='input'&&node.props.value===value);
assert.ok(brandInput(editor(business),'GOMO-MARKETING.AT'));assert.ok(!brandInput(editor(business),'VITAL50.AT'));
assert.ok(brandInput(editor(vital),'VITAL50.GOMO-MARKETING.AT'));assert.ok(brandInput(editor(business),'GOMO-MARKETING.AT'));assert.equal(changes,0,'Rendering and project switches do not mutate stored pins');
brandInput(editor(business),'GOMO-MARKETING.AT').props.onChange({target:{value:'Meine eigene Marke'}});
assert.equal(updated[0].customBrandText,'Meine eigene Marke');assert.ok(brandInput(editor(business,updated[0]),'Meine eigene Marke'));

// Test real legacy and analyzed canvas paths without external images or publishing.
const oldImage=globalThis.Image;
(globalThis as any).Image=class{onerror:any;set src(_value:string){queueMicrotask(()=>this.onerror());}};
try{
 const drawn:string[]=[];
 const ctx=new Proxy({font:'',fillStyle:'',measureText:(text:string)=>({width:text.length*16}),fillText:(text:string)=>drawn.push(text),createLinearGradient:()=>({addColorStop(){}})} as any,{get(object,key){return key in object?object[key]:()=>{};}});
 const canvas={getContext:()=>ctx} as unknown as HTMLCanvasElement;
 for(const templateStyle of ['vital50_clean','vital50_list','vital50_bold','vital50_dark','vital50_curiosity'] as PinterestPin['templateStyle'][]){
  drawn.length=0;await renderPinToCanvas(canvas,{...pin,templateStyle},business);
  assert.ok(drawn.includes('✨ GOMO-MARKETING.AT'));assert.ok(drawn.includes('gomo-marketing.at'));
  assert.ok(drawn.every(text=>!/VITAL50|Stoffwechsel|Blutzucker|Entzündungen|KOSTENLOSER RATGEBER|wissenschaftlich geprüft/i.test(text)),templateStyle);
 }
 drawn.length=0;await renderPinToCanvas(canvas,{...pin,design:{layout:'editorial',background:'#ffffff',foreground:'#111827',accent:'#047857',alignment:'left',headingSize:'large'}},business);
 assert.ok(drawn.includes('GOMO-MARKETING.AT'),'Analyzed layout uses the same branding as the editor');
 drawn.length=0;await renderPinToCanvas(canvas,{...pin,customBrandText:'Meine eigene Marke'},business);assert.ok(drawn.includes('✨ Meine eigene Marke'));
}finally{if(oldImage===undefined)delete(globalThis as any).Image;else globalThis.Image=oldImage;}
console.log('Pin-Branding geprüft: aktives Projekt in Editor und allen Canvas-Layouts, Projektwechsel, Website-Fallback und manuelle Markenangaben ohne fremde Gesundheits- oder Gratisversprechen.');

// Project-aware picker: no health gallery, no preselected unrelated background.
const picker=(projectSettings:ProjectSettings,currentImageUrl?:string)=>renderToStaticMarkup(React.createElement(LanguageProvider,null,React.createElement(PinterestImagePickerModal,{isOpen:true,projectSettings,currentImageUrl,topic:'Verbindung',angle:'curiosity',imagePrompt:'People in conversation',onClose(){},onSelectImage(){}})));
for(const project of [business,createWeAreRealProject('owner')]){
 const html=picker(project);
 assert.ok(html.includes('Bild vom Computer hochladen'));
 assert.ok(!html.includes('Kuratierte Vital50 HD-Fotos'));
 assert.ok(!html.includes(CURATED_HEALTH_PHOTOS[0].url.replace(/&/g,'&amp;')));
 assert.match(html,/disabled=""[^>]*>Bild für diesen Pin übernehmen/);
}
assert.ok(picker(vital).includes('Kuratierte Vital50 HD-Fotos'));
assert.ok(picker(vital).includes(CURATED_HEALTH_PHOTOS[0].url.replace(/&/g,'&amp;')));
const ownImage='data:image/png;base64,iVBORw0KGgo=';
assert.ok(picker(business,ownImage).includes(ownImage),'An explicitly selected image remains available.');
const editorHtml=editor(business);
assert.equal(find(editorHtml,node=>node.type==='img'&&node.props.src===CURATED_HEALTH_PHOTOS[0].url),undefined);
assert.ok(find(editor(business,{...pin,imageUrl:ownImage}),node=>node.type==='img'&&node.props.src===ownImage));
console.log('Projektbezogene Bildauswahl geprüft: Gesundheitsgalerie nur für Vital50, andere Projekte ohne fremde Vorauswahl, Upload und explizite Bilder erhalten.');
