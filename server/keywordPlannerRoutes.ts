import type {Express,RequestHandler} from 'express';
import {createKeywordPlannerAdmin,createKeywordPlannerAuthorization} from './keywordPlannerAdmin.js';
export function registerKeywordPlannerRoutes(app:Express,guards:RequestHandler[],projectGuard:RequestHandler,projectId:string,publicUrl:string,service=createKeywordPlannerAdmin()){
 const uid=(req:any)=>req.firebaseUser?.sub as string|undefined;
 const run=(action:(req:any,res:any,userId:string)=>Promise<void>):RequestHandler=>async(req,res)=>{res.setHeader('Cache-Control','no-store');const user=uid(req);if(!user)return void res.status(401).json({error:'Mitglied konnte nicht bestätigt werden.'});try{await action(req,res,user);}catch(error){res.status(400).json({error:error instanceof Error?error.message:'Google Keyword Planner konnte nicht abgefragt werden.'});}};
 app.get('/api/keyword-planner/status',...guards,run(async(_req,res,user)=>{res.json(await service.status(projectId,user));}));
 app.post('/api/keyword-planner/oauth/start',...guards,run(async(_req,res,user)=>{const result=createKeywordPlannerAuthorization(user);res.setHeader('Set-Cookie',`keyword_planner_oauth_state=${encodeURIComponent(result.nonce)}; Path=/api/keyword-planner/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=600`);res.json({authorizationUrl:result.authorizationUrl});}));
 app.get('/api/keyword-planner/oauth/callback',async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('Set-Cookie','keyword_planner_oauth_state=; Path=/api/keyword-planner/oauth; HttpOnly; Secure; SameSite=Lax; Max-Age=0');
  try{const code=typeof req.query.code==='string'?req.query.code:'',state=typeof req.query.state==='string'?req.query.state:'';
   const cookie=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith('keyword_planner_oauth_state='))?.slice('keyword_planner_oauth_state='.length)||'';
   if(req.query.error||!code||!state)throw Error();await service.complete(projectId,code,state,decodeURIComponent(cookie));res.redirect(`${publicUrl}/?keywordPlanner=connected`);
  }catch{res.redirect(`${publicUrl}/?keywordPlanner=error`);}
 });
 app.delete('/api/keyword-planner/connection',...guards,run(async(_req,res,user)=>{await service.disconnect(projectId,user);res.json({success:true});}));
 app.post('/api/keyword-planner/query',...guards,projectGuard,run(async(req,res,user)=>{res.json({report:await service.query(projectId,user,{...req.body,websiteUrl:req.body?.projectSettings?.websiteUrl,language:req.body?.projectSettings?.language})});}));
}
