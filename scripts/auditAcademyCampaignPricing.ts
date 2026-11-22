import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { academyCampaignPriceFacts, academyCampaignPricingPrompt, isAcademyPriceCampaign } from '../src/utils/academyCampaignPricing';
import { editorialStrategyPrompt } from '../src/utils/editorialStrategy';
import { proOfferAt, PRO_PRICE_CHANGE_AT } from '../src/config/proPricing';
import { generateContentEmail } from '../server/contentEmailGeneration';
import { createOnlineBusinessProject } from '../src/utils/contentStorage';

const settings = { ...createOnlineBusinessProject('owner'), name:'GOM MAR Academy',websiteUrl:'https://gomo-marketing.at',defaultTargetUrl:'https://academy.gomo-marketing.at/',brandVoice:'Stefan, Betreiber der Academy, hart, ehrlich, glasklar.' };
const deadline=Date.parse(PRO_PRICE_CHANGE_AT);
for (const name of ['GOM MAR Academy','GOM-MAR Academy','gom mar academy','GOM–MAR Academy']) assert.equal(isAcademyPriceCampaign({...settings,name}),true);
for (const other of [undefined,{...settings,name:'Vital50'},{...settings,name:'Meine Academy'},{...settings,defaultTargetUrl:'https://other.example',websiteUrl:'https://other.example'},{...settings,defaultTargetUrl:'https://other.example'}]) {
  assert.equal(isAcademyPriceCampaign(other),false);assert.equal(academyCampaignPricingPrompt(other),'');
}
for(const destination of ['https://other.example/','https://academy.gomo-marketing.at.evil.example','http://academy.gomo-marketing.at','https://user@academy.gomo-marketing.at/'])assert.equal(isAcademyPriceCampaign(settings,destination),false);
assert.equal(isAcademyPriceCampaign(settings,'https://gomo-marketing.at/2026/mein-artikel/'),true);
assert.equal(isAcademyPriceCampaign(settings,null),true,'An explicit no-link creation still knows its Academy project.');
const oldFacts=academyCampaignPriceFacts(settings,undefined,deadline-1)!;
const newFacts=academyCampaignPriceFacts(settings,undefined,deadline)!;
assert.equal(oldFacts.currentMonthlyEUR,proOfferAt(deadline-1).monthlyCents/100);
assert.equal(oldFacts.currentMinimumTotalEUR,179.4);assert.equal(oldFacts.nextMonthlyEUR,49.9);assert.equal(oldFacts.nextMinimumTotalEUR,299.4);
assert.equal(newFacts.currentMonthlyEUR,49.9);assert.equal(newFacts.currentMinimumTotalEUR,299.4);assert.equal(newFacts.protectedExistingMonthlyEUR,29.9);
assert.equal(newFacts.nextMonthlyEUR,undefined);
assert.equal(newFacts.timeZone,'Europe/Vienna');assert.equal(newFacts.checkoutQuoteMinutes,31);
assert.match(academyCampaignPricingPrompt(settings,undefined,deadline-1),/kein bisher verlangter Streichpreis/);
assert.match(academyCampaignPricingPrompt(settings,undefined,deadline),/KEINE Einladung zum Einstieg für 29,90/);
assert.match(academyCampaignPricingPrompt(settings,undefined,deadline),/keine alte Jahresend-Frist/);
assert.match(academyCampaignPricingPrompt(settings,undefined,deadline),/kostenlose Registrierung allein sichert den Preis nicht/);
assert.match(academyCampaignPricingPrompt(settings,undefined,deadline),/Mindestlaufzeit und Mindestgesamtpreis/);

const originalNow=Date.now;
try {
  Date.now=()=>deadline-1;
  const instructions=editorialStrategyPrompt(settings,undefined,settings.defaultTargetUrl);
  assert.match(instructions,/VERBINDLICHE PREISGRUNDLAGE/);assert.match(instructions,/"currentMonthlyEUR":29.9/);
  assert.equal(editorialStrategyPrompt(settings,undefined,'https://other.example/'),'');
  const source=readFileSync('server.ts','utf8');
  const ast=ts.createSourceFile('server.ts',source,ts.ScriptTarget.ES2022,true);
  let connected=0;
  function inspect(node:ts.Node) {
    if(ts.isExpressionStatement(node)&&ts.isCallExpression(node.expression)&&node.expression.expression.getText(ast)==='app.post') {
      const endpoint=(node.expression.arguments[0]as ts.StringLiteral).text;
      if(['/api/content-engine/brief','/api/content-engine/blog','/api/content-engine/pins','/api/content-engine/youtube','/api/content-engine/shorts'].includes(endpoint)) {
        const calls:ts.CallExpression[]=[];
        function collect(child:ts.Node){if(ts.isCallExpression(child)&&child.expression.getText(ast)==='editorialStrategyPrompt')calls.push(child);ts.forEachChild(child,collect);}
        collect(node);
        assert.equal(calls.length,1,endpoint);assert.equal(calls[0].arguments[0].getText(ast),'projectSettings');
        assert.equal(calls[0].arguments[2].getText(ast),endpoint.endsWith('/blog')?'affiliateLink':'targetUrl');connected++;
      }
    }ts.forEachChild(node,inspect);
  }
  inspect(ast);assert.equal(connected,5,'Every content generation route must pass its actual campaign destination.');
  for(const language of ['de','en','pl']as const)for(const moment of [deadline-1,deadline]) {
    Date.now=()=>moment;let request:any;
    const batch=await generateContentEmail({topic:'Die GOM-MAR Academy kennenlernen',projectSettings:{...settings,language},count:1,targetUrl:settings.defaultTargetUrl,article:{title:'Alter Artikel',contentMarkdown:'Die Academy kostet immer nur 29,90 Euro.'}},async value=>{
      request=value;return{text:JSON.stringify({title:'Mail',emails:[{title:'Einladung',subject:'Academy kennenlernen',previewText:'',content:'Lernweg und Werkzeuge kennenlernen.'}]})};
    });
    assert.match(request.config.systemInstruction,/VERBINDLICHE PREISGRUNDLAGE/);
    assert.match(request.config.systemInstruction,/Vorrang vor älteren Briefings/);
    assert.ok(request.config.systemInstruction.includes(`"currentMonthlyEUR":${moment<deadline?29.9:49.9}`));
    assert.ok(request.config.systemInstruction.includes(({de:'German',en:'English',pl:'Polish'})[language]));
    assert.equal(batch.targetUrl,settings.defaultTargetUrl);assert.equal(batch.targetAudience,settings.targetAudience);
    assert.equal(JSON.parse(request.contents).brandVoice,settings.brandVoice);
    assert.ok(JSON.parse(request.contents).source.text.includes('immer nur 29,90'),'Source snapshot remains intact; current product facts override its old price claim.');
  }
}finally{Date.now=originalNow;}
assert.doesNotMatch(readFileSync('src/components/ContentEngine/ContentEngineView.tsx','utf8'),/AcademyCampaignPricingPanel|ProPriceNotice/, 'Die KI-Inhaltszentrale zeigt keinen Buchungs-Preishinweis.');
console.log('Academy-Kampagne: echte Zieladresse, Projektabgrenzung, zentrale Preisquelle, Jahreswechsel, alle Inhaltsrouten und DE/EN/PL-E-Mails geprüft.');
