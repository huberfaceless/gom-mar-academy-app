import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { proOfferAt, isSixMonthContractVersion, PRO_PRICE_CHANGE_AT, PRO_2026_CONTRACT, PRO_2027_CONTRACT, PRO_CHECKOUT_QUOTE_SECONDS, proPrice } from '../src/config/proPricing';
import { createManagedSubscriptionCheckout, scheduleSixMonthCancellation, verifySixMonthConfiguration } from '../server/stripeManagedPayments';
import { sendProContractConfirmation } from '../server/proContractConfirmation';

const change = Date.parse(PRO_PRICE_CHANGE_AT);
const before = proOfferAt(change - 1), after = proOfferAt(change);
assert.equal(new Intl.DateTimeFormat('de-AT',{timeZone:'Europe/Vienna',dateStyle:'short',timeStyle:'medium'}).format(change), '01.01.27, 00:00:00');
assert.equal(before.monthlyCents,2990); assert.equal(before.minimumTotalCents,17940);
assert.equal(after.monthlyCents,4990); assert.equal(after.minimumTotalCents,29940);
assert.equal(before.contractVersion,PRO_2026_CONTRACT); assert.equal(after.contractVersion,PRO_2027_CONTRACT);
assert.equal(isSixMonthContractVersion(PRO_2026_CONTRACT),true); assert.equal(isSixMonthContractVersion(PRO_2027_CONTRACT),true);
assert.equal(isSixMonthContractVersion('unknown'),false);
assert.throws(()=>proOfferAt(NaN));

const originalFetch=globalThis.fetch, originalNow=Date.now;
const envNames=['STRIPE_PRO_SIX_MONTH_ENABLED','STRIPE_PRO_SIX_MONTH_PRICE_ID','STRIPE_PRO_SIX_MONTH_PORTAL_ID','STRIPE_PRO_SIX_MONTH_TAX_MODE','SENDGRID_API_KEY','SENDGRID_FROM_EMAIL','NODE_ENV'];
const oldEnv=envNames.map(name=>process.env[name]);
const requests:Array<{url:string;params:URLSearchParams}>=[];
let body:any;
try {
  process.env.STRIPE_PRO_SIX_MONTH_ENABLED='true';process.env.STRIPE_PRO_SIX_MONTH_PRICE_ID='price_legacy';process.env.STRIPE_PRO_SIX_MONTH_PORTAL_ID='bpc_safe';
  process.env.STRIPE_PRO_SIX_MONTH_TAX_MODE='automatic';
  globalThis.fetch=async(url,init)=>{
    const value=String(url);
    if(init?.method==='POST') { requests.push({url:value,params:init.body as URLSearchParams}); return Response.json({id:'cs_new',url:'https://checkout.stripe.com/mock',cancel_at:1800000000}); }
    if(value.includes('/prices/'))return Response.json({id:'price_legacy',active:true,unit_amount:2990,currency:'eur',tax_behavior:'inclusive',recurring:{interval:'month',interval_count:1},product:{id:'prod_pro',tax_code:'mock-tax-code'}});
    if(value.includes('/billing_portal/configurations?'))return Response.json({has_more:false,data:[]});
    return Response.json({active:true,features:{subscription_cancel:{enabled:false},subscription_update:{enabled:false}},login_page:{enabled:false}});
  };
  Date.now=()=>change;
  const config=await verifySixMonthConfiguration('mock-key');
  assert.equal(config.productId,'prod_pro');
  const base={secretKey:'mock-key',priceId:config.priceId,productId:config.productId,firebaseUid:'owner',customerEmail:'owner@example.com',applicationUrl:'https://academy.example',sixMonthContract:true,residenceCountry:'AT'};
  await createManagedSubscriptionCheckout({...base,offer:after});
  const current=requests.at(-1)!.params;
  assert.equal(current.get('line_items[0][price]'),null);
  assert.equal(current.get('line_items[0][price_data][product]'),'prod_pro');
  assert.equal(current.get('line_items[0][price_data][unit_amount]'),'4990');
  assert.equal(current.get('line_items[0][price_data][recurring][interval]'),'month');
  assert.equal(current.get('line_items[0][price_data][tax_behavior]'),'inclusive');
  assert.equal(current.get('subscription_data[metadata][contract_version]'),PRO_2027_CONTRACT);
  assert.match(current.get('custom_text[submit][message]')!,/299.40/);
  assert.equal(current.get('expires_at'),String(change/1000+PRO_CHECKOUT_QUOTE_SECONDS));
  await assert.rejects(createManagedSubscriptionCheckout({...base,productId:undefined,offer:after}),/Produkt/);
  Date.now=()=>change-1;
  await createManagedSubscriptionCheckout({...base,offer:before});
  const old=requests.at(-1)!.params;
  assert.equal(old.get('line_items[0][price]'),'price_legacy');
  assert.equal(old.get('line_items[0][price_data][unit_amount]'),null);
  assert.equal(old.get('subscription_data[metadata][contract_version]'),PRO_2026_CONTRACT);
  assert.match(old.get('custom_text[submit][message]')!,/179.40/);
  // Old subscriptions remain cancellable after the price change. Only cancel_at changes.
  Date.now=()=>change+3600000;
  for(const version of [PRO_2026_CONTRACT,PRO_2027_CONTRACT]) {
    await scheduleSixMonthCancellation('mock-key',{id:'sub_existing',status:'active',start_date:1780000000,current_period_end:1782600000,metadata:{firebase_uid:'owner',contract_version:version}},'owner');
    const params=requests.at(-1)!.params;
    assert.equal(params.get('items[0][price]'),null);assert.equal(params.get('cancel_at')!==null,true);
  }
  assert.ok(requests.every(r=>!r.url.includes('/prices/') && !r.url.includes('/products/')), 'Existing Stripe catalogue prices must never be mutated.');
  process.env.SENDGRID_API_KEY='mock-sendgrid';process.env.SENDGRID_FROM_EMAIL='test@example.com';process.env.NODE_ENV='test';
  globalThis.fetch=async(_url,init)=>{body=JSON.parse(String(init?.body));return new Response(null,{status:202});};
  for(const [version,amount]of [[PRO_2026_CONTRACT,'29,90'],[PRO_2027_CONTRACT,'49,90']]) {
    await sendProContractConfirmation({id:'cs_mock',customer_email:'test@example.com',metadata:{contract_version:version}},'https://academy.example');
    assert.ok(body.content[0].value.includes(`Monatlicher Gesamtpreis: ${amount}`));
    assert.ok(body.content[0].value.includes(`Vertragsfassung: ${version}`));
  }
  // Execute actual checkout and contract routes; do not trust client amounts or stale versions.
  const source=readFileSync('server.ts','utf8');const ast=ts.createSourceFile('server.ts',source,ts.ScriptTarget.ES2022,true);
  const routes=new Map<string,any[]>();let charged:any;let calls=0;let priorStatus:string|null=null;
  const verified=()=>{};
  const context=vm.createContext({app:{get:(path:string,...h:any[])=>routes.set(path,h),post:(path:string,...h:any[])=>routes.set(path,h)},
    process:{env:{STRIPE_SECRET_KEY:'mock-key',STRIPE_PRO_MONTHLY_PRICE_ID:'price_legacy'}},requireVerifiedMember:verified,
    proOfferAt,sixMonthCheckoutEnabled:()=>true,isProSalesCountry:(v:string)=>v==='AT',PRO_SALES_COUNTRIES:['AT','DE','PL'],
    firebaseTierRank:(user:any)=>user.tier==='PRO'?1:0,FIREBASE_PROJECT_ID:'project',ACADEMY_PUBLIC_URL:'https://academy.example',
    verifySixMonthConfiguration:async()=>config,loadStripeCustomerId:async()=>undefined,
    loadStripeSubscriptionId:async()=>priorStatus ? 'sub_prior' : null,
    retrieveStripeSubscription:async()=>({id:'sub_prior',status:priorStatus,metadata:{firebase_uid:'owner'}}),
    createManagedSubscriptionCheckout:async(input:any)=>{calls++;charged=input;return{url:'https://checkout.stripe.com/mock',id:'cs_mock'};},console,
  });
  function register(node:ts.Node) {
    if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)&&['app.get','app.post'].includes(node.expression.expression.getText(ast))&&['/api/payments/contract','/api/payments/checkout/pro-monthly'].includes((node.expression.arguments[0]as ts.StringLiteral).text)) {
      vm.runInContext(ts.transpileModule(node.getText(ast),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,context);return;
    }ts.forEachChild(node,register);
  }register(ast);
  const checkout=routes.get('/api/payments/checkout/pro-monthly')!;assert.equal(checkout[0],verified);
  let status=200,result:any;
  const response={setHeader(){},status(code:number){status=code;return this;},json(data:any){result=data;}};
  const req={firebaseUser:{sub:'owner',email:'owner@example.com',email_verified:true,tier:'FREE'},body:{contractVersion:PRO_2026_CONTRACT,residenceCountry:'AT',monthlyCents:1}};
  await checkout.at(-1)(req,response);assert.equal(status,400);assert.equal(calls,0,'Old form must not start a new-price checkout silently.');
  req.body.contractVersion=PRO_2027_CONTRACT;status=200;
  await checkout.at(-1)(req,response);assert.equal(status,200);assert.equal(charged.offer.monthlyCents,4990);
  assert.equal(charged.firebaseUid,'owner');
  priorStatus='past_due';status=200;
  await checkout.at(-1)(req,response);assert.equal(status,409);assert.equal(calls,1,'A payment problem must not cause replacement of an ongoing old-price subscription.');
  priorStatus='canceled';status=200;
  await checkout.at(-1)(req,response);assert.equal(status,200);assert.equal(calls,2);assert.equal(charged.offer.monthlyCents,4990,'Rejoining after actual contract end uses the new price.');
  priorStatus=null;
  await checkout.at(-1)({...req,firebaseUser:{...req.firebaseUser,tier:'PRO'}},response);assert.equal(status,409);assert.equal(calls,2,'Existing subscribers must not receive replacement subscriptions.');
  await routes.get('/api/payments/contract')!.at(-1)({},response);assert.equal(result.offer.monthlyCents,4990);assert.equal(result.contractVersion,PRO_2027_CONTRACT);
} finally {
  globalThis.fetch=originalFetch;Date.now=originalNow;
  envNames.forEach((name,index)=>{if(oldEnv[index]===undefined)delete process.env[name];else process.env[name]=oldEnv[index];});
}

// Render the actual notice, including all languages, old/new offer and existing members.
let language:'de'|'en'|'pl'='de';
const react={createElement:(type:any,props:any,...children:any[])=>({type,props:{...props,children}})};
const ui=vm.createContext({exports:{},require(name:string){
  if(name==='react')return react;
  if(name.endsWith('proPricing'))return{proPrice};
  if(name.endsWith('LanguageContext'))return{useLanguage:()=>({language})};
  if(name.endsWith('useProContract'))return{useProContract:()=>null};
  throw new Error(name);
}});
vm.runInContext(ts.transpileModule(readFileSync('src/components/ProPriceNotice.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,ui);
for(const lang of ['de','en','pl']as const) {
  language=lang;
  const render=(offer:any,existingMember=false)=>JSON.stringify(ui.exports.ProPriceNotice({contract:{sixMonthContract:true,offer},existingMember,publicPage:true}));
  const current=render(after);assert.ok(current.includes(proPrice(29940,lang)));assert.ok(!current.includes('23:59'));
  const early=render(before);assert.ok(early.includes(proPrice(17940,lang)));assert.ok(early.includes('23:59'));assert.ok(early.includes('#register-form'));
  const member=render(after,true);assert.ok(!member.includes(proPrice(29940,lang)),'Existing members must not be shown a new minimum bill.');
}
console.log('PRO-Preis 2027: Wiener Jahreswechsel, verbindlicher Serverpreis, alte Formulare, Inline-Stripe-Preis, Alt-Abos, Vertragsbestätigung und DE/EN/PL-Hinweise geprüft. Keine echten Zahlungen oder E-Mails.');

// A price change invalidates previously checked consent synchronously, before effects.
let shownOffer = before;
const states:any[]=[];let cursor=0;
const hookReact={createElement:react.createElement,useEffect(){},useState(initial:any){const i=cursor++;if(!(i in states))states[i]=initial;return[states[i],(value:any)=>{states[i]=typeof value==='function'?value(states[i]):value;}];}};
const profileContext=vm.createContext({exports:{},require(name:string){
  if(name==='react')return hookReact;
  if(name.endsWith('proPricing'))return{proPrice};
  if(name.endsWith('useProContract'))return{useProContract:()=>({sixMonthContract:true,contractVersion:shownOffer.contractVersion,offer:shownOffer})};
  if(name.endsWith('LanguageContext'))return{useLanguage:()=>({language:'de'})};
  if(name.endsWith('proSalesPolicy'))return{PRO_SALES_COUNTRIES:['AT','DE','PL']};
  return new Proxy({},{get:(_target,key)=>String(key)});
}});
vm.runInContext(ts.transpileModule(readFileSync('src/components/ProfileView.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText,profileContext);
let profileTree:any;
const renderProfile=()=>{cursor=0;profileTree=profileContext.exports.ProfileView({user:{name:'Test',email:'test@example.com',tier:'FREE',niche:'Online',targetAudience:'50+',role:'member',earnedBadges:[],activeCampaignsCount:0,leadsCount:0,level:1,currentStageId:1},progressPercent:0,completedTasksCount:0,onUpdateUser(){},onRequestTierChange(){}});};
function find(predicate:(node:any)=>boolean,node=profileTree):any{
  if(Array.isArray(node)){for(const child of node){const found=find(predicate,child);if(found)return found;}}
  else if(node&&typeof node==='object'){if(predicate(node))return node;return find(predicate,node.props?.children);}
}
const consent=()=>find(n=>n.type==='label'&&JSON.stringify(n.props.children).includes('Ich habe die Vertragsinformationen')).props.children[0];
renderProfile();assert.equal(consent().props.checked,false);
consent().props.onChange({target:{checked:true}});renderProfile();assert.equal(consent().props.checked,true);
shownOffer=after;renderProfile();assert.equal(consent().props.checked,false,'Consent for 29.90 must never carry over to 49.90.');
assert.ok(JSON.stringify(profileTree).includes(proPrice(4990,'de')));
console.log('Profil: Preiswechsel hebt eine bestehende Vertragsbestätigung vor dem nächsten Klick auf.');
