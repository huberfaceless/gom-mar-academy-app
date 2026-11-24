import {GoogleAuth} from 'google-auth-library';
import {createCipheriv,createDecipheriv,createHash,createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
import {searchConsoleWebsite,propertyMatchesWebsite,type SearchConsoleReport} from '../src/utils/searchConsoleKeywords.js';
const scope='https://www.googleapis.com/auth/webmasters.readonly';
const auth=new GoogleAuth({scopes:['https://www.googleapis.com/auth/datastore']});
type Environment=Record<string,string|undefined>;
export function searchConsoleConfig(env:Environment=process.env){
 const dedicated=Boolean(env.SEARCH_CONSOLE_OAUTH_CLIENT_ID?.trim()||env.SEARCH_CONSOLE_OAUTH_CLIENT_SECRET?.trim());
 const clientId=(dedicated?env.SEARCH_CONSOLE_OAUTH_CLIENT_ID:env.YOUTUBE_OAUTH_CLIENT_ID)?.trim()||'';
 const clientSecret=(dedicated?env.SEARCH_CONSOLE_OAUTH_CLIENT_SECRET:env.YOUTUBE_OAUTH_CLIENT_SECRET)?.trim()||'';
 const secret=env.SEARCH_CONSOLE_TOKEN_ENCRYPTION_KEY?.trim()||env.YOUTUBE_TOKEN_ENCRYPTION_KEY?.trim()||'';
 const redirectUri=env.SEARCH_CONSOLE_OAUTH_REDIRECT_URI?.trim()||'https://academy.gomo-marketing.at/api/search-console/oauth/callback';
 return{clientId,clientSecret,secret,redirectUri,configured:Boolean(clientId&&clientSecret&&secret)};
}
function config(env:Environment){const c=searchConsoleConfig(env);if(!c.configured)throw new Error('Die Search-Console-Verbindung ist serverseitig noch nicht eingerichtet.');return c;}
const signature=(payload:string,secret:string)=>createHmac('sha256',`search-console-state:${secret}`).update(payload).digest();
export function createSearchConsoleAuthorization(userId:string,env:Environment=process.env,now=Date.now()){
 const c=config(env);const nonce=randomBytes(24).toString('base64url');
 const payload=Buffer.from(JSON.stringify({uid:userId,nonce,exp:now+600000})).toString('base64url');
 const state=payload+'.'+signature(payload,c.secret).toString('base64url');
 const params=new URLSearchParams({client_id:c.clientId,redirect_uri:c.redirectUri,response_type:'code',scope,access_type:'offline',prompt:'consent select_account',include_granted_scopes:'false',state});
 return{nonce,authorizationUrl:'https://accounts.google.com/o/oauth2/v2/auth?'+params};
}
function verifyState(state:string,cookieNonce:string,env:Environment,now:number):string {
 const c=config(env);const parts=state.split('.');if(parts.length!==2)throw new Error('Die Search-Console-Verbindungsanfrage ist ungültig.');
 const expected=signature(parts[0],c.secret),actual=Buffer.from(parts[1],'base64url');
 if(actual.length!==expected.length||!timingSafeEqual(actual,expected))throw new Error('Die Search-Console-Verbindungsanfrage ist ungültig.');
 const data=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
 const supplied=Buffer.from(cookieNonce),nonce=Buffer.from(typeof data.nonce==='string'?data.nonce:'');
 if(typeof data.uid!=='string'||!data.uid||!Number.isFinite(data.exp)||data.exp<=now||data.exp>now+600000||!supplied.length||supplied.length!==nonce.length||!timingSafeEqual(supplied,nonce))throw new Error('Die Search-Console-Verbindungsanfrage ist abgelaufen oder gehört zu einer anderen Browsersitzung.');
 return data.uid;
}
export function searchConsolePeriod(days:unknown,now=new Date()){
 if(![28,90].includes(Number(days)))throw new Error('Bitte 28 oder 90 Tage auswählen.');
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const value=(type:string)=>parts.find(p=>p.type===type)!.value;
 const end=new Date(`${value('year')}-${value('month')}-${value('day')}T00:00:00Z`);end.setUTCDate(end.getUTCDate()-3);
 const start=new Date(end);start.setUTCDate(start.getUTCDate()-Number(days)+1);
 return{startDate:start.toISOString().slice(0,10),endDate:end.toISOString().slice(0,10)};
}
function encrypt(token:string,uid:string,secret:string){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',createHash('sha256').update('search-console:'+secret).digest(),iv);cipher.setAAD(Buffer.from(uid));const data=Buffer.concat([cipher.update(token,'utf8'),cipher.final()]);return{token:data.toString('base64url'),iv:iv.toString('base64url'),tag:cipher.getAuthTag().toString('base64url')};}
function decrypt(doc:any,uid:string,secret:string){const cipher=createDecipheriv('aes-256-gcm',createHash('sha256').update('search-console:'+secret).digest(),Buffer.from(doc.fields.iv.stringValue,'base64url'));cipher.setAAD(Buffer.from(uid));cipher.setAuthTag(Buffer.from(doc.fields.tag.stringValue,'base64url'));return Buffer.concat([cipher.update(Buffer.from(doc.fields.token.stringValue,'base64url')),cipher.final()]).toString('utf8');}
function upstreamError(status:number){return new Error(status===401?'Google hat den Search-Console-Zugriff abgelehnt. Bitte erneut verbinden.':status===403?'Search-Console-Zugriff nicht freigegeben. Bitte Website-Berechtigung und aktivierte Search Console API im Google-Cloud-Projekt prüfen.':status===429?'Das Search-Console-Anfragelimit ist erreicht. Bitte später erneut versuchen.':'Search Console ist vorübergehend nicht erreichbar. Bitte später erneut versuchen.');}
export function createSearchConsoleAdmin(options:{request?:typeof fetch;env?:Environment;now?:()=>Date;databaseToken?:()=>Promise<string>}={}){
 const request=options.request||fetch,env=options.env||process.env,now=options.now||(()=>new Date());
 const dbToken=options.databaseToken|| (async()=>{const client=await auth.getClient();const result=await client.getAccessToken();if(!result.token)throw new Error('Serverzugriff für die Search-Console-Verbindung fehlt.');return result.token;});
 const docUrl=(project:string,uid:string)=>`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/${encodeURIComponent(env.FIREBASE_DATABASE_ID||'(default)')}/documents/academySearchConsoleConnections/${encodeURIComponent(uid)}`;
 const read=async(project:string,uid:string)=>{const res=await request(docUrl(project,uid),{headers:{Authorization:`Bearer ${await dbToken()}`},signal:AbortSignal.timeout(15000)});if(res.status===404)return null;if(!res.ok)throw new Error('Die Search-Console-Verbindung konnte nicht gelesen werden.');return res.json();};
 const access=async(project:string,uid:string)=>{const c=config(env),doc=await read(project,uid);if(!doc)throw new Error('Bitte zuerst Google Search Console verbinden.');let refresh:string;try{refresh=decrypt(doc,uid,c.secret);}catch{throw new Error('Die gespeicherte Search-Console-Verbindung ist nicht lesbar. Bitte erneut verbinden.');}
  const res=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:c.clientId,client_secret:c.clientSecret,refresh_token:refresh,grant_type:'refresh_token'}),signal:AbortSignal.timeout(15000)});
  const data=await res.json().catch(()=>({}));if(!res.ok||typeof data.access_token!=='string'||!data.access_token.trim())throw new Error('Der Search-Console-Zugriff konnte nicht erneuert werden. Bitte erneut verbinden.');return data.access_token as string;
 };
 return{
  async status(project:string,uid:string){if(!searchConsoleConfig(env).configured)return{configured:false,connected:false,connectedAt:null};const doc=await read(project,uid);return{configured:true,connected:Boolean(doc?.fields?.token?.stringValue),connectedAt:doc?.fields?.connectedAt?.timestampValue||null};},
  async complete(project:string,code:string,state:string,nonce:string){const c=config(env),uid=verifyState(state,nonce,env,now().getTime());
   const res=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:c.clientId,client_secret:c.clientSecret,redirect_uri:c.redirectUri,grant_type:'authorization_code'}),signal:AbortSignal.timeout(15000)});
   const data=await res.json().catch(()=>({}));if(!res.ok||typeof data.refresh_token!=='string'||!data.refresh_token.trim()||!String(data.scope||'').split(' ').includes(scope))throw new Error('Google hat keinen dauerhaften Lesezugriff auf Search Console erteilt. Bitte erneut verbinden.');
   const encrypted=encrypt(data.refresh_token,uid,c.secret),timestamp=now().toISOString();
   const saved=await request(docUrl(project,uid),{method:'PATCH',headers:{Authorization:`Bearer ${await dbToken()}`,'Content-Type':'application/json'},body:JSON.stringify({fields:{userId:{stringValue:uid},token:{stringValue:encrypted.token},iv:{stringValue:encrypted.iv},tag:{stringValue:encrypted.tag},scope:{stringValue:scope},connectedAt:{timestampValue:timestamp}}}),signal:AbortSignal.timeout(15000)});
   if(!saved.ok)throw new Error('Die Search-Console-Verbindung konnte nicht sicher gespeichert werden.');
  },
  async disconnect(project:string,uid:string){const res=await request(docUrl(project,uid),{method:'DELETE',headers:{Authorization:`Bearer ${await dbToken()}`},signal:AbortSignal.timeout(15000)});if(!res.ok&&res.status!==404)throw new Error('Die Search-Console-Verbindung konnte nicht getrennt werden.');},
  async properties(project:string,uid:string,website:unknown){const url=searchConsoleWebsite(website),token=await access(project,uid);
   const res=await request('https://www.googleapis.com/webmasters/v3/sites',{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(15000)});if(!res.ok)throw upstreamError(res.status);const data=await res.json();if(!data||typeof data!=='object'||data.siteEntry!==undefined&&!Array.isArray(data.siteEntry))throw new Error('Google hat keine gültige Property-Liste geliefert.');
   return(Array.isArray(data.siteEntry)?data.siteEntry:[]).filter((site:any)=>['siteOwner','siteFullUser','siteRestrictedUser'].includes(site?.permissionLevel)&&typeof site.siteUrl==='string'&&propertyMatchesWebsite(site.siteUrl,url)).map((site:any)=>({siteUrl:site.siteUrl,permissionLevel:site.permissionLevel}));
  },
  async queries(project:string,uid:string,input:{websiteUrl:unknown;property:unknown;days:unknown}):Promise<SearchConsoleReport>{const website=searchConsoleWebsite(input.websiteUrl),property=typeof input.property==='string'?input.property:'';
   if(!propertyMatchesWebsite(property,website))throw new Error('Die Search-Console-Property passt nicht zur Projektwebsite.');
   const period=searchConsolePeriod(input.days,now()),token=await access(project,uid);
   const prefix=website.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
   const res=await request(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({...period,dimensions:['query'],type:'web',dataState:'final',rowLimit:250,dimensionFilterGroups:[{groupType:'and',filters:[{dimension:'page',operator:'includingRegex',expression:'^'+prefix}]}]}),signal:AbortSignal.timeout(25000)});
   if(!res.ok)throw upstreamError(res.status);const data=await res.json();if(!data||typeof data!=='object'||data.rows!==undefined&&!Array.isArray(data.rows))throw new Error('Google hat keine gültigen Suchdaten geliefert.');const rows=Array.isArray(data.rows)?data.rows:[];
   const metric=(v:unknown,max=Infinity)=>typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=max?v:null;
   return{source:'Google Search Console',websiteUrl:website,property,...period,fetchedAt:now().toISOString(),limited:rows.length>=250,rows:rows.slice(0,250).filter((row:any)=>typeof row?.keys?.[0]==='string'&&row.keys[0].trim()&&row.keys[0].trim().length<=250).map((row:any)=>({query:row.keys[0].trim(),clicks:metric(row.clicks),impressions:metric(row.impressions),ctr:metric(row.ctr,1),position:metric(row.position)}))};
  },
 };
}
