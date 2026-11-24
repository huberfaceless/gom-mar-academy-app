import { pinBrandText } from './pinBranding';
import type { PinterestPin, ProjectSettings } from '../types/contentEngine';
import { normalizePinDesign, colorContrast } from './pinterestDesign';
const fontFamily='Arial, "Nimbus Sans", sans-serif';
function lines(ctx:CanvasRenderingContext2D,text:string,width:number) {
 const result:string[]=[];let current='';
 for(const word of text.split(/\s+/)){const trial=current?`${current} ${word}`:word;if(current&&ctx.measureText(trial).width>width){result.push(current);current=word;}else current=trial;}
 if(current)result.push(current);return result;
}
function fit(ctx:CanvasRenderingContext2D,text:string,width:number,font:number,maxHeight:number,maxLines:number) {
 let size=font;let wrapped:string[]=[];
 do{ctx.font=`800 ${size}px ${fontFamily}`;wrapped=lines(ctx,text,width);if(wrapped.length<=maxLines&&wrapped.length*size*1.15<=maxHeight)break;size-=2;}while(size>22);
 const shown=wrapped.slice(0,maxLines);if(wrapped.length>maxLines)shown[maxLines-1]=shown[maxLines-1].replace(/\s+\S*$/,'')+'…';
 return{shown,size,height:shown.length*size*1.15};
}
function block(ctx:CanvasRenderingContext2D,text:string,x:number,y:number,width:number,font:number,maxHeight:number,maxLines=5) {
 const plan=fit(ctx,text,width,font,maxHeight,maxLines);ctx.font=`800 ${plan.size}px ${fontFamily}`;
 for(const [i,line] of plan.shown.entries())ctx.fillText(line,x,y+i*plan.size*1.15,width);
 return y+plan.height;
}
function photo(ctx:CanvasRenderingContext2D,image:HTMLImageElement,y:number,width:number,height:number) {
 const ratio=Math.max(width/image.width,height/image.height);
 ctx.save();ctx.beginPath();ctx.rect(0,y,width,height);ctx.clip();ctx.drawImage(image,(width-image.width*ratio)/2,y+(height-image.height*ratio)/2,image.width*ratio,image.height*ratio);ctx.restore();
}
/** The exported canvas uses analyzed design tokens and the member's own content and image. */
export function renderAnalyzedPin(ctx:CanvasRenderingContext2D,width:number,height:number,pin:PinterestPin,project:ProjectSettings,image?:HTMLImageElement):boolean {
 const design=normalizePinDesign(pin.design);if(!design)return false;
 ctx.save();const scale=width/1080;ctx.scale(scale,scale);const h=height/scale,w=1080,m=72,content=w-2*m;
 ctx.fillStyle=design.background;ctx.fillRect(0,0,w,h);
 const centered=design.alignment==='center',textX=centered?w/2:m;
 ctx.textAlign=centered?'center':'left';ctx.textBaseline='alphabetic';
 const layout=design.layout==='split'&&!image?'editorial':design.layout;
 if(image){
  if(layout==='split')photo(ctx,image,h*.56,w,h*.26);
  else if(layout==='bold')photo(ctx,image,145,w,h-335);
  else photo(ctx,image,145,w,h*.28);
 }
 // Branding and divider have their own reserved space above the headline.
 ctx.fillStyle=design.foreground;ctx.font=`600 25px ${fontFamily}`;ctx.fillText(pinBrandText(pin,project).slice(0,60),textX,70,content);
 ctx.fillStyle=design.accent;ctx.fillRect(m,105,content,10);
 const photoAbove=Boolean(image&&layout!=='bold'&&layout!=='split');
 const y=photoAbove?145+h*.28+105:layout==='split'||layout==='list'?230:h*.28;
 const titleMax=photoAbove?h*.20:layout==='split'?h*.25:h*.34;
 const titleWidth=layout==='bold'?content-60:content;
 const headingFont=design.headingSize==='large'?100:78;
 const plan=fit(ctx,pin.title,titleWidth,headingFont,titleMax,5);
 if(layout==='bold'){
  ctx.fillStyle=design.foreground;ctx.fillRect(m-20,y-plan.size-25,content+40,plan.height+65);ctx.fillStyle=design.background;
 }else ctx.fillStyle=design.foreground;
 const titleY=block(ctx,pin.title,textX,y,titleWidth,headingFont,titleMax,5);
 ctx.fillStyle=design.foreground;
 if(layout==='list'&&pin.bulletPoints?.length){
  let row=titleY+35;
  for(const [index,item] of pin.bulletPoints.slice(0,photoAbove?3:4).entries()){
   if(row>h-230)break;
   row=block(ctx,`${index+1}. ${item}`,textX,row,content,photoAbove?30:34,photoAbove?42:88,photoAbove?1:2)+28;
  }
 }else if(pin.subHook){
  const row=titleY+65;
  const space=(layout==='split'?h*.54:h-200)-row;
  if(space>40){
   if(layout==='bold'){ctx.fillStyle=design.background;ctx.fillRect(m-20,row-40,content+40,Math.min(space,160)+55);ctx.fillStyle=design.foreground;}
   block(ctx,pin.subHook,textX,row,content,34,Math.min(space,160),3);
  }
 }
 const buttonY=h-158;ctx.fillStyle=design.accent;ctx.fillRect(m,buttonY,content,80);
 ctx.fillStyle=colorContrast(design.accent,'#ffffff')>=4.5?'#ffffff':'#000000';ctx.textAlign='center';ctx.font=`800 30px ${fontFamily}`;
 ctx.fillText((pin.ctaButtonText||project.defaultCta||'Mehr erfahren').slice(0,70),w/2,buttonY+51,content-40);
 ctx.fillStyle=design.foreground;ctx.font=`500 22px ${fontFamily}`;
 let domain='';try{domain=new URL(pin.targetUrl||project.websiteUrl).hostname;}catch{/* no invented destination */}
 ctx.fillText(domain,w/2,h-34,content);ctx.restore();return true;
}
