export interface SearchConsoleKeyword { query:string;clicks:number|null;impressions:number|null;ctr:number|null;position:number|null }
export interface SearchConsoleReport {
 source:'Google Search Console';websiteUrl:string;property:string;startDate:string;endDate:string;fetchedAt:string;
 rows:SearchConsoleKeyword[];limited:boolean;
}
export function searchConsoleWebsite(value:unknown):string {
 try{const url=new URL(String(value));if(!['https:','http:'].includes(url.protocol)||url.username||url.password||url.port)throw Error();url.search='';url.hash='';if(!url.pathname.endsWith('/'))url.pathname+='/';return url.href;}catch{throw new Error('Bitte eine gültige Projektwebsite hinterlegen.');}
}
export function propertyMatchesWebsite(property:string,website:string):boolean {
 try{const url=new URL(searchConsoleWebsite(website));if(property.startsWith('sc-domain:')){const domain=property.slice(10).toLowerCase();return /^[a-z0-9.-]+$/.test(domain)&&(url.hostname===domain||url.hostname.endsWith('.'+domain));}return searchConsoleWebsite(website).startsWith(searchConsoleWebsite(property));}catch{return false;}
}
export function keywordDataStatus(keyword:string,report:SearchConsoleReport|undefined,website:string):'ai'|'data'|'unchecked' {
 if(!report)return'ai';
 try{if(report.source!=='Google Search Console'||searchConsoleWebsite(report.websiteUrl)!==searchConsoleWebsite(website))return'unchecked';}catch{return'unchecked';}
 return Array.isArray(report.rows)&&report.rows.some(row=>typeof row?.query==='string'&&row.query.toLocaleLowerCase()===keyword.trim().toLocaleLowerCase()&&row.impressions!==null&&row.impressions>0)?'data':'unchecked';
}
