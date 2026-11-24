import {searchConsoleWebsite} from './searchConsoleKeywords';
export type PlannerMode='historical'|'ideas';
export type PlannerCountry='DE'|'AT'|'CH';
export interface PlannerInput {websiteUrl:string;customerId:string;loginCustomerId:string;language:'de'|'en'|'pl';countries:PlannerCountry[];mode:PlannerMode;keywords:string[]}
export interface PlannerKeyword {keyword:string;closeVariants:string[];averageMonthlySearches:number|null;advertisingCompetition:string|null;monthlySearches:{year:number;month:string;searches:number|null}[]}
export interface KeywordPlannerReport extends PlannerInput {source:'Google Keyword Planner';startDate:string;endDate:string;fetchedAt:string;rows:PlannerKeyword[];limited:boolean}
export function normalizePlannerInput(raw:unknown):PlannerInput {
 const input=raw as Partial<PlannerInput>|null;
 if(!input||typeof input!=='object')throw new Error('Bitte Keyword-Eingaben prüfen.');
 const account=(v:unknown,optional=false)=>{if(optional&&(v===undefined||v===''))return'';if(typeof v!=='string'||!/^\d{3}-?\d{3}-?\d{4}$/.test(v.trim()))throw new Error('Bitte eine gültige Google-Ads-Kundennummer angeben.');return v.trim().replace(/-/g,'');};
 if(!['de','en','pl'].includes(input.language||''))throw new Error('Bitte eine unterstützte Projektsprache wählen.');
 if(!Array.isArray(input.countries)||!input.countries.length||input.countries.length>3||input.countries.some(c=>!['DE','AT','CH'].includes(c)))throw new Error('Bitte Deutschland, Österreich oder Schweiz auswählen.');
 if(input.mode!=='historical'&&input.mode!=='ideas')throw new Error('Bitte eine gültige Keyword-Abfrage wählen.');
 if(!Array.isArray(input.keywords)||!input.keywords.length||input.keywords.length>(input.mode==='ideas'?20:50)||input.keywords.some(k=>typeof k!=='string'||!k.trim()||k.trim().length>80||k.trim().split(/\s+/).length>10))throw new Error('Bitte höchstens 20 Startbegriffe oder 50 Prüfbegriffe mit maximal 80 Zeichen und 10 Wörtern je Begriff eingeben.');
 return{websiteUrl:searchConsoleWebsite(input.websiteUrl),customerId:account(input.customerId),loginCustomerId:account(input.loginCustomerId,true),language:input.language!,countries:[...new Set(input.countries)].sort(),mode:input.mode,keywords:[...new Set(input.keywords.map(k=>k.trim().toLocaleLowerCase()))]};
}
export function plannerPeriod(now:Date){const end=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),0)),start=new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth()-11,1));const months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];return{startDate:start.toISOString().slice(0,10),endDate:end.toISOString().slice(0,10),startYear:start.getUTCFullYear(),startMonth:months[start.getUTCMonth()],endYear:end.getUTCFullYear(),endMonth:months[end.getUTCMonth()]};}
function number(value:unknown):number|null {if(typeof value!=='number'&&typeof value!=='string'||value==='')return null;if(typeof value==='string'&&!/^\d+$/.test(value))return null;const n=Number(value);return Number.isSafeInteger(n)&&n>=0?n:null;}
export function parsePlannerRows(rows:unknown[],mode:PlannerMode):PlannerKeyword[]{return rows.slice(0,100).filter((r:any)=>typeof r?.text==='string'&&r.text.trim()&&r.text.length<=250).map((r:any)=>{const m=(mode==='ideas'?r.keywordIdeaMetrics:r.keywordMetrics)||{};return{keyword:r.text.trim(),closeVariants:Array.isArray(r.closeVariants)?r.closeVariants.filter((v:unknown)=>typeof v==='string'&&v.length<=250).slice(0,50):[],averageMonthlySearches:number(m.avgMonthlySearches),advertisingCompetition:['LOW','MEDIUM','HIGH'].includes(m.competition)?m.competition:null,monthlySearches:Array.isArray(m.monthlySearchVolumes)?m.monthlySearchVolumes.filter((v:any)=>number(v.year)!==null&&typeof v.month==='string').slice(0,12).map((v:any)=>({year:Number(v.year),month:v.month,searches:number(v.monthlySearches)})):[]};});}
export function plannerEvidence(keyword:string,report:KeywordPlannerReport|undefined,website:string):'estimate'|'variant'|'unknown'{
 try{if(!report||report.source!=='Google Keyword Planner'||searchConsoleWebsite(report.websiteUrl)!==searchConsoleWebsite(website))return'unknown';}catch{return'unknown';}
 const key=keyword.trim().toLocaleLowerCase();const rows=Array.isArray(report.rows)?report.rows:[];
 if(rows.some(r=>r.keyword.toLocaleLowerCase()===key&&r.averageMonthlySearches!==null))return'estimate';
 return rows.some(r=>r.closeVariants.some(v=>v.toLocaleLowerCase()===key)&&r.averageMonthlySearches!==null)?'variant':'unknown';
}
