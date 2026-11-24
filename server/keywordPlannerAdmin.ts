import {GoogleAuth} from 'google-auth-library';
import {createCipheriv,createDecipheriv,createHash,createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
import { normalizePlannerInput, plannerPeriod, parsePlannerRows, type KeywordPlannerReport } from '../src/utils/keywordPlanner.js';
const scope='https://www.googleapis.com/auth/adwords';
const auth=new GoogleAuth({scopes:['https://www.googleapis.com/auth/datastore']});
type Environment=Record<string,string|undefined>;
export function keywordPlannerConfig(env:Environment=process.env){
 const dedicated=Boolean(env.KEYWORD_PLANNER_OAUTH_CLIENT_ID?.trim()||env.KEYWORD_PLANNER_OAUTH_CLIENT_SECRET?.trim());
 const clientId=(dedicated?env.KEYWORD_PLANNER_OAUTH_CLIENT_ID:env.YOUTUBE_OAUTH_CLIENT_ID)?.trim()||'';
 const clientSecret=(dedicated?env.KEYWORD_PLANNER_OAUTH_CLIENT_SECRET:env.YOUTUBE_OAUTH_CLIENT_SECRET)?.trim()||'';
 const secret=env.KEYWORD_PLANNER_TOKEN_ENCRYPTION_KEY?.trim()||env.YOUTUBE_TOKEN_ENCRYPTION_KEY?.trim()||'';
 const redirectUri=env.KEYWORD_PLANNER_OAUTH_REDIRECT_URI?.trim()||'https://academy.gomo-marketing.at/api/keyword-planner/oauth/callback';
 return{clientId,clientSecret,secret,redirectUri,configured:Boolean(clientId&&clientSecret&&secret)};
}
function config(env:Environment){const c=keywordPlannerConfig(env);if(!c.configured)throw new Error('Die Keyword-Planner-Verbindung ist serverseitig noch nicht eingerichtet.');return c;}
const signature=(payload:string,secret:string)=>createHmac('sha256',`keyword-planner-state:${secret}`).update(payload).digest();
export function createKeywordPlannerAuthorization(userId:string,env:Environment=process.env,now=Date.now()){
 const c=config(env);const nonce=randomBytes(24).toString('base64url');
 const payload=Buffer.from(JSON.stringify({uid:userId,nonce,exp:now+600000})).toString('base64url');
 const state=payload+'.'+signature(payload,c.secret).toString('base64url');
 const params=new URLSearchParams({client_id:c.clientId,redirect_uri:c.redirectUri,response_type:'code',scope,access_type:'offline',prompt:'consent select_account',include_granted_scopes:'false',state});
 return{nonce,authorizationUrl:'https://accounts.google.com/o/oauth2/v2/auth?'+params};
}
function verifyState(state:string,cookieNonce:string,env:Environment,now:number):string {
 const c=config(env);const parts=state.split('.');if(parts.length!==2)throw new Error('Die Keyword-Planner-Verbindungsanfrage ist ungültig.');
 const expected=signature(parts[0],c.secret),actual=Buffer.from(parts[1],'base64url');
 if(actual.length!==expected.length||!timingSafeEqual(actual,expected))throw new Error('Die Keyword-Planner-Verbindungsanfrage ist ungültig.');
 const data=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
 const supplied=Buffer.from(cookieNonce),nonce=Buffer.from(typeof data.nonce==='string'?data.nonce:'');
 if(typeof data.uid!=='string'||!data.uid||!Number.isFinite(data.exp)||data.exp<=now||data.exp>now+600000||!supplied.length||supplied.length!==nonce.length||!timingSafeEqual(supplied,nonce))throw new Error('Die Keyword-Planner-Verbindungsanfrage ist abgelaufen oder gehört zu einer anderen Browsersitzung.');
 return data.uid;
}
function encrypt(token:string,uid:string,secret:string){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',createHash('sha256').update('keyword-planner:'+secret).digest(),iv);cipher.setAAD(Buffer.from(uid));const data=Buffer.concat([cipher.update(token,'utf8'),cipher.final()]);return{token:data.toString('base64url'),iv:iv.toString('base64url'),tag:cipher.getAuthTag().toString('base64url')};}
function decrypt(doc:any,uid:string,secret:string){const cipher=createDecipheriv('aes-256-gcm',createHash('sha256').update('keyword-planner:'+secret).digest(),Buffer.from(doc.fields.iv.stringValue,'base64url'));cipher.setAAD(Buffer.from(uid));cipher.setAuthTag(Buffer.from(doc.fields.tag.stringValue,'base64url'));return Buffer.concat([cipher.update(Buffer.from(doc.fields.token.stringValue,'base64url')),cipher.final()]).toString('utf8');}
function upstreamError(status:number){return new Error(status===401?'Google-Ads-Zugriff abgelehnt. Bitte erneut verbinden.':status===403?'Google-Ads-Zugriff fehlt. Bitte Kundennummer, Kontoberechtigung und Basic-Freigabe für Keyword-Recherche im OAuth-Projekt prüfen.':status===429?'Google-Ads-Anfragelimit erreicht. Bitte später erneut versuchen.':'Google Keyword Planner konnte die Anfrage nicht verarbeiten. Bitte Konto, API-Freigabe und Eingaben prüfen.');}
export function createKeywordPlannerAdmin(options:{request?:typeof fetch;env?:Environment;now?:()=>Date;databaseToken?:()=>Promise<string>}={}){
 const request=options.request||fetch,env=options.env||process.env,now=options.now||(()=>new Date());
 const dbToken=options.databaseToken|| (async()=>{const client=await auth.getClient();const result=await client.getAccessToken();if(!result.token)throw new Error('Serverzugriff für die Keyword-Planner-Verbindung fehlt.');return result.token;});
 const docUrl=(project:string,uid:string)=>`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/${encodeURIComponent(env.FIREBASE_DATABASE_ID||'(default)')}/documents/academyKeywordPlannerConnections/${encodeURIComponent(uid)}`;
 const read=async(project:string,uid:string)=>{const res=await request(docUrl(project,uid),{headers:{Authorization:`Bearer ${await dbToken()}`},signal:AbortSignal.timeout(15000)});if(res.status===404)return null;if(!res.ok)throw new Error('Die Keyword-Planner-Verbindung konnte nicht gelesen werden.');return res.json();};
 const access=async(project:string,uid:string)=>{const c=config(env),doc=await read(project,uid);if(!doc)throw new Error('Bitte zuerst Google Keyword Planner verbinden.');let refresh:string;try{refresh=decrypt(doc,uid,c.secret);}catch{throw new Error('Die gespeicherte Keyword-Planner-Verbindung ist nicht lesbar. Bitte erneut verbinden.');}
  const res=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:c.clientId,client_secret:c.clientSecret,refresh_token:refresh,grant_type:'refresh_token'}),signal:AbortSignal.timeout(15000)});
  const data=await res.json().catch(()=>({}));if(!res.ok||typeof data.access_token!=='string'||!data.access_token.trim())throw new Error('Der Keyword-Planner-Zugriff konnte nicht erneuert werden. Bitte erneut verbinden.');return data.access_token as string;
 };
 const cache=new Map<string,{at:number;report:KeywordPlannerReport}>(),lastRequest=new Map<string,number>();
 return{
  async status(project:string,uid:string){if(!keywordPlannerConfig(env).configured)return{configured:false,connected:false,connectedAt:null};const doc=await read(project,uid);return{configured:true,connected:Boolean(doc?.fields?.token?.stringValue),connectedAt:doc?.fields?.connectedAt?.timestampValue||null};},
  async complete(project:string,code:string,state:string,nonce:string){const c=config(env),uid=verifyState(state,nonce,env,now().getTime());
   for(const key of cache.keys()){const identity=JSON.parse(key);if(identity[0]===project&&identity[1]===uid)cache.delete(key);}
   const res=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:c.clientId,client_secret:c.clientSecret,redirect_uri:c.redirectUri,grant_type:'authorization_code'}),signal:AbortSignal.timeout(15000)});
   const data=await res.json().catch(()=>({}));if(!res.ok||typeof data.refresh_token!=='string'||!data.refresh_token.trim()||!String(data.scope||'').split(' ').includes(scope))throw new Error('Google hat keinen dauerhaften Zugriff auf Google Keyword Planner erteilt. Bitte erneut verbinden.');
   const encrypted=encrypt(data.refresh_token,uid,c.secret),timestamp=now().toISOString();
   const saved=await request(docUrl(project,uid),{method:'PATCH',headers:{Authorization:`Bearer ${await dbToken()}`,'Content-Type':'application/json'},body:JSON.stringify({fields:{userId:{stringValue:uid},token:{stringValue:encrypted.token},iv:{stringValue:encrypted.iv},tag:{stringValue:encrypted.tag},scope:{stringValue:scope},connectedAt:{timestampValue:timestamp}}}),signal:AbortSignal.timeout(15000)});
   if(!saved.ok)throw new Error('Die Keyword-Planner-Verbindung konnte nicht sicher gespeichert werden.');
  },
  async disconnect(project:string,uid:string){for(const key of cache.keys()){const identity=JSON.parse(key);if(identity[0]===project&&identity[1]===uid)cache.delete(key);}lastRequest.delete(uid);const res=await request(docUrl(project,uid),{method:'DELETE',headers:{Authorization:`Bearer ${await dbToken()}`},signal:AbortSignal.timeout(15000)});if(!res.ok&&res.status!==404)throw new Error('Die Keyword-Planner-Verbindung konnte nicht getrennt werden.');},
  async query(project:string,uid:string,raw:unknown):Promise<KeywordPlannerReport>{
   const input=normalizePlannerInput(raw),period=plannerPeriod(now());
   const key=JSON.stringify([project,uid,input,period]);const cached=cache.get(key);
   if(cached&&now().getTime()-cached.at<86400000){if(!await read(project,uid)){cache.delete(key);throw new Error('Bitte zuerst Google Keyword Planner verbinden.');}return cached.report;}
   const clock=now().getTime();if(lastRequest.has(uid)&&clock-lastRequest.get(uid)!<30000)throw new Error('Bitte 30 Sekunden zwischen neuen Keyword-Abfragen warten.');
   if(lastRequest.size>500)lastRequest.clear();lastRequest.set(uid,clock);
   const token=await access(project,uid);
   const language={de:'1001',en:'1000',pl:'1030'}[input.language];
   const countries={DE:'2276',AT:'2040',CH:'2756'};
   const body={language:'languageConstants/'+language,geoTargetConstants:input.countries.map(country=>'geoTargetConstants/'+countries[country]),keywordPlanNetwork:'GOOGLE_SEARCH',historicalMetricsOptions:{yearMonthRange:{start:{year:period.startYear,month:period.startMonth},end:{year:period.endYear,month:period.endMonth}}},...(input.mode==='ideas'?{keywordSeed:{keywords:input.keywords},includeAdultKeywords:false,pageSize:100}:{keywords:input.keywords,includeAdultKeywords:false})};
   const headers:Record<string,string>={Authorization:`Bearer ${token}`,'Content-Type':'application/json'};
   if(input.loginCustomerId)headers['login-customer-id']=input.loginCustomerId;
   const method=input.mode==='ideas'?'generateKeywordIdeas':'generateKeywordHistoricalMetrics';
   const res=await request(`https://googleads.googleapis.com/v26/customers/${input.customerId}:${method}`,{method:'POST',headers,body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
   if(!res.ok)throw upstreamError(res.status);const data=await res.json();
   if(!data||typeof data!=='object'||data.results!==undefined&&!Array.isArray(data.results))throw new Error('Google hat keine gültigen Keyword-Daten geliefert.');
   const report:KeywordPlannerReport={source:'Google Keyword Planner',...input,startDate:period.startDate,endDate:period.endDate,fetchedAt:now().toISOString(),rows:parsePlannerRows(data.results||[],input.mode),limited:Boolean(data.nextPageToken)||(data.results?.length||0)>100};
   if(cache.size>=100)cache.delete(cache.keys().next().value!);cache.set(key,{at:clock,report});return report;
  },
 };
}
