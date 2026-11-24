import type {Express,RequestHandler} from 'express';
import {createSearchConsoleAdmin,createSearchConsoleAuthorization} from './searchConsoleAdmin.js';
export function registerSearchConsoleRoutes(app:Express,guards:RequestHandler[],projectGuard:RequestHandler,projectId:string,publicUrl:string,service=createSearchConsoleAdmin()){
 const uid=(req:any)=>req.firebaseUser?.sub as string|undefined;
 const run=(action:(req:any,res:any,userId:string)=>Promise<void>):RequestHandler=>async(req,res)=>{res.setHeader('Cache-Control','no-store');const user=uid(req);if(!user)return void res.status(401).json({error:'Mitglied konnte nicht bestätigt werden.'});try{await action(req,res,user);}catch(error){res.status(400).json({error:error instanceof Error?error.message:'Search Console konnte nicht abgefragt werden.'});}};
 app.get('/api/search-console/status',...guards,run(async(_req,res,user)=>{res.json(await service.status(projectId,user));}));
 app.post('/api/search-console/oauth/start',...guards,run(async(_req,res,user)=>{const result=createSearchConsoleAuthorization(user);res.setHeader('Set-Cookie',`search_console_oauth_state=${encodeURIComponent(result.nonce)}; Path=/api/search-console/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);res.json({authorizationUrl:result.authorizationUrl});}));
 app.get('/api/search-console/oauth/callback',async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('Set-Cookie','search_console_oauth_state=; Path=/api/search-console/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  try{const code=typeof req.query.code==='string'?req.query.code:'',state=typeof req.query.state==='string'?req.query.state:'';
   const cookie=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith('search_console_oauth_state='))?.slice('search_console_oauth_state='.length)||'';
   if(req.query.error||!code||!state)throw Error();await service.complete(projectId,code,state,decodeURIComponent(cookie));res.redirect(`${publicUrl}/?searchConsole=connected`);
  }catch{res.redirect(`${publicUrl}/?searchConsole=error`);}
 });
 app.delete('/api/search-console/connection',...guards,run(async(_req,res,user)=>{await service.disconnect(projectId,user);res.json({success:true});}));
 app.post('/api/search-console/properties',...guards,projectGuard,run(async(req,res,user)=>{res.json({properties:await service.properties(projectId,user,req.body?.projectSettings?.websiteUrl)});}));
 app.post('/api/search-console/queries',...guards,projectGuard,run(async(req,res,user)=>{res.json({report:await service.queries(projectId,user,{websiteUrl:req.body?.projectSettings?.websiteUrl,property:req.body?.property,days:req.body?.days??28})});}));
}
