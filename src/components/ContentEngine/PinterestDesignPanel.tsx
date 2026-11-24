import React, { useEffect, useRef, useState } from 'react';
import type { ProjectSettings } from '../../types/contentEngine';
import type { PinDesignProfile, PinDesignReference } from '../../utils/pinterestDesign';
import { authenticatedFetch } from '../../services/authenticatedFetch';
import { pinterestService } from '../../services/pinterestService';
import { useContentHubCopy } from '../../i18n/useContentHubCopy';

interface Inspiration {title:string;imageData:string}
async function readInspiration(file:File):Promise<Inspiration> {
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>10*1024*1024)throw new Error('Bitte ein PNG-, JPEG- oder WebP-Bild bis 10 MB auswählen.');
 const url=URL.createObjectURL(file);
 try {
  const image=new Image();image.src=url;await image.decode();
  const scale=Math.min(1,1000/Math.max(image.width,image.height));
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Das Bild konnte nicht vorbereitet werden.');
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
  const imageData=canvas.toDataURL('image/jpeg',0.85);
  if(imageData.length>2*1024*1024)throw new Error('Das vorbereitete Bild ist zu groß. Bitte ein kleineres Bild wählen.');
  return{title:file.name.slice(0,200),imageData};
 }finally{URL.revokeObjectURL(url);}
}
async function request(path:string,body:unknown) {
 const response=await authenticatedFetch(`/api/pinterest/design/${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'Die Pinterest-Designanalyse ist fehlgeschlagen.');return data;
}
export function PinterestDesignPanel({project,topic,onSave}:{project:ProjectSettings;topic:string;onSave:(project:ProjectSettings)=>Promise<boolean|void>}) {
 const {hubText}=useContentHubCopy();
 const [expanded,setExpanded]=useState(!project.pinterestDesignProfile);
 const [days,setDays]=useState(30);const [pins,setPins]=useState<PinDesignReference[]>([]);const [period,setPeriod]=useState<{start:string;end:string}|null>(null);
 const [selected,setSelected]=useState<string[]>([]);const [inspirations,setInspirations]=useState<Inspiration[]>([]);
 const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [notice,setNotice]=useState('');
 const latest=useRef({project,topic,onSave,days});latest.current={project,topic,onSave,days};
 const mounted=useRef(true);useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
 const source=()=>JSON.stringify({project:latest.current.project,topic:latest.current.topic,days:latest.current.days});
 const run=async(action:()=>Promise<void>)=>{if(busy)return;setBusy(true);setError('');setNotice('');try{await action();}catch(err){if(mounted.current)setError(err instanceof Error?hubText(err.message):hubText('Die Pinterest-Designanalyse ist fehlgeschlagen.'));}finally{if(mounted.current)setBusy(false);}};
 const load=()=>run(async()=>{
  const initial=source();const data=await request('top-pins',{environment:'production',days,projectSettings:project});
  if(!mounted.current)return;if(initial!==source())throw new Error(hubText('Das Projekt oder Thema wurde geändert. Bitte erneut starten.'));
  setPins(data.pins||[]);setPeriod(data.period);setSelected([]);
  if(!data.pins?.length)setNotice(hubText('Für diesen Zeitraum wurden keine auswertbaren Pin-Bilder mit Kontodaten gefunden.'));
 });
 const analyze=()=>run(async()=>{
  const initial=source();const data=await request('analyze',{environment:'production',days,pinIds:selected,inspirations,topic,projectSettings:project});
  if(!mounted.current)return;if(initial!==source())throw new Error(hubText('Das Projekt oder Thema wurde geändert. Bitte erneut starten.'));
  if(await latest.current.onSave({...latest.current.project,pinterestDesignProfile:data.profile as PinDesignProfile})===false)throw new Error(hubText('Die Cloud-Speicherung konnte nicht bestätigt werden.'));
  if(mounted.current)setNotice(hubText('Designanalyse gespeichert. Neu erstellte Pinterest-Pins verwenden diese Varianten; bestehende Pins bleiben erhalten.'));
 });
 const profile=project.pinterestDesignProfile;
 return <details className="rounded-2xl border border-emerald-200 bg-white p-5" open={expanded} onToggle={event=>setExpanded(event.currentTarget.open)}>
  <summary className="cursor-pointer text-lg font-bold text-slate-900">{hubText('Design aus erfolgreichen Pins ableiten')}{profile?' ✓':''}</summary>
  <div className="mt-4 space-y-4">
   <p className="text-sm text-slate-600">{hubText('Analysiert echte Pin-Bilder: Layout, Farben, Kontrast, Schrift und Blickführung. Ausgewählte Kontodaten belegen die Klicks, aber nicht deren Ursache. Fremde Vorbilder bleiben ohne verifizierte Klickdaten.')}</p>
   {profile && <section className="space-y-2 rounded-xl bg-emerald-50 p-4">
    <h4 className="font-bold">{hubText('Aktive Designanalyse')}</h4>
    <p className="text-xs">{profile.analyzedAt.slice(0,10)}{profile.period?` · ${profile.period.start} – ${profile.period.end}`:''}</p>
    <ul className="list-disc pl-5 text-sm">{profile.observations.map((item,i)=><li key={i}>{item}</li>)}</ul>
    <p className="text-sm">{profile.imageGuidance}</p>
    <div className="flex flex-wrap gap-3">{profile.variants.map((design,i)=><div key={i} className="rounded-xl border p-4 text-sm" style={{backgroundColor:design.background,color:design.foreground}}>{hubText('Variante')} {i+1}: {hubText(design.layout==='split'?'Bild und Text geteilt':design.layout==='bold'?'Kontrastblock':design.layout==='list'?'Checkliste':'Große Headline')}<div className="mt-2 h-2 w-24" style={{backgroundColor:design.accent}} /></div>)}</div>
    <p className="text-xs">{profile.references.map(ref=>`${ref.title}: ${ref.kind==='account'?hubText('Kontodaten'):hubText('Designvorbild ohne Klicknachweis')}`).join(' · ')}</p>
    <button type="button" disabled={busy} onClick={()=>void run(async()=>{const {pinterestDesignProfile:_profile,...rest}=latest.current.project;if(await latest.current.onSave(rest)===false)throw new Error(hubText('Die Cloud-Speicherung konnte nicht bestätigt werden.'));})} className="rounded-xl border px-3 py-2 text-xs font-bold">{hubText('Designvorgaben entfernen')}</button>
   </section>}
   <div className="flex flex-wrap items-end gap-3">
    <label className="text-sm font-bold">{hubText('Messzeitraum')}<select value={days} disabled={busy} onChange={e=>{setDays(Number(e.target.value));setPins([]);setSelected([]);setPeriod(null);}} className="ml-2 rounded-xl border p-2">{[30,60,90].map(n=><option key={n} value={n}>{n} {hubText('Tage')}</option>)}</select></label>
    <button type="button" disabled={busy} onClick={()=>void load()} className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{hubText('Klickstarke Pins meines Kontos laden')}</button>
    <button type="button" disabled={busy} onClick={()=>void run(()=>pinterestService.startOAuth('production'))} className="rounded-xl border px-4 py-2 text-sm font-bold">{hubText('Pinterest verbinden')}</button>
   </div>
   <p className="text-xs text-slate-500">{hubText('Organische Kontodaten, nach ausgehenden Klicks sortiert. Maximal zehn verfügbare Bild-Pins aus den Top 50, erstellt in den letzten 90 Tagen. Fehlende Messwerte bleiben unbekannt. Neue Freigaben oder ein Business-Konto können erforderlich sein.')}</p>
   {period && <p className="text-xs">{period.start} – {period.end}</p>}
   <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{pins.map(pin=><label key={pin.id} className="space-y-2 rounded-xl border p-3 text-sm">
    <div className="flex items-start gap-2"><input type="checkbox" checked={selected.includes(pin.id)} disabled={busy||(!selected.includes(pin.id)&&selected.length+inspirations.length>=3)} onChange={e=>setSelected(e.target.checked?[...selected,pin.id]:selected.filter(id=>id!==pin.id))}/><strong>{pin.title}</strong></div>
    <img src={pin.imageUrl} alt={pin.title} loading="lazy" referrerPolicy="no-referrer" className="h-48 w-full rounded-lg object-contain"/>
    <p>{hubText('Ausgehende Klicks')}: {pin.outboundClicks??'—'} · {hubText('Impressionen')}: {pin.impressions??'—'} · {hubText('Klickrate')}: {pin.outboundRate===null||pin.outboundRate===undefined?'—':`${(pin.outboundRate*100).toFixed(2)} %`}</p>
    {(pin.impressions??0)<100 && <p className="text-xs text-amber-800">{hubText('Geringe oder unbekannte Datenbasis: kein belastbarer Gewinner.')}</p>}
    {pin.dataStatus && <p className="text-xs text-slate-500">{pin.dataStatus}</p>}
    <a href={pin.pinUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">{hubText('Pin ansehen')}</a>
   </label>)}</div>
   <label className="block text-sm font-bold">{hubText('Zusätzliche Designvorbilder hochladen (ohne Klicknachweis)')}
    <input type="file" multiple accept="image/png,image/jpeg,image/webp" disabled={busy||selected.length+inspirations.length>=3} className="mt-2 block w-full text-xs" onChange={event=>{const files=Array.from(event.target.files||[]);event.target.value='';void run(async()=>{if(files.length+selected.length+inspirations.length>3)throw new Error(hubText('Bitte insgesamt höchstens drei Pin-Bilder auswählen.'));const added=await Promise.all(files.map(readInspiration));if(mounted.current)setInspirations([...inspirations,...added]);});}}/>
   </label>
   <div className="flex flex-wrap gap-3">{inspirations.map((ref,i)=><div key={i} className="w-32 space-y-1"><img src={ref.imageData} alt={ref.title} className="h-40 w-full rounded-xl object-contain"/><p className="break-words text-xs">{ref.title}</p><button type="button" disabled={busy} onClick={()=>setInspirations(inspirations.filter((_,index)=>index!==i))} className="text-xs underline">{hubText('Entfernen')}</button></div>)}</div>
   <button type="button" disabled={busy||selected.length+inspirations.length===0} onClick={()=>void analyze()} className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">{hubText(busy?'Pin-Bilder werden verarbeitet…':'Ausgewählte Bilder analysieren und Designvorgaben speichern')}</button>
   <p className="text-xs text-slate-500">{hubText('Die ausgewählten Bilder werden für die KI-Bildanalyse übertragen. Gespeichert werden Analyse, Messbezug und Designvorgaben; hochgeladene Vorbilder werden nicht als neue Pin-Bilder übernommen.')}</p>
   {error&&<p role="alert" className="text-sm text-rose-700">{error}</p>}{notice&&<p role="status" className="text-sm text-emerald-800">{notice}</p>}
  </div>
 </details>;
}
