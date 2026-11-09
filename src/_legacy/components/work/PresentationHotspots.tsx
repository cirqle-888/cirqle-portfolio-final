import { GalleryLink } from './GalleryLink';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { coverBox, hotspotGlowStrength, hotspotGlow, hasGradient, type PresentationHotspot } from '../../lib/hotspots';

/** SVG paths share the image's cover transform, including off-centre crops. */
export function PresentationHotspots({ items, source, focalX, focalY, singleReveal=false }: {singleReveal?:boolean;items: PresentationHotspot[];source: string;focalX:number;focalY:number}) {
 const instanceId=useId().replace(/:/g,'');
 const frame=useRef<HTMLDivElement>(null);
 const [geometry,setGeometry]=useState<{frameWidth:number;frameHeight:number;source:string;width:number;height:number;left:number;top:number}|null>(null);
 useEffect(()=>{
  const node=frame.current;if(!node)return;
  let live=true;const image=new Image();
  const update=()=>{if(live&&image.naturalWidth&&node.clientWidth)setGeometry({source,frameWidth:node.clientWidth,frameHeight:node.clientHeight,...coverBox(node.clientWidth,node.clientHeight,image.naturalWidth,image.naturalHeight,focalX,focalY)});};
  image.onload=update;image.src=source;
  const observer=new ResizeObserver(update);observer.observe(node);update();
  return()=>{live=false;observer.disconnect();image.onload=null;};
 },[source,focalX,focalY]);
 return <div ref={frame} className={`wp-hotspots${singleReveal?" wp-hotspots--single":""}`} aria-label="Explore featured artwork">{geometry?.source===source&&items.map((item,index)=>{
  const x=item.points.reduce((s,p)=>s+p[0],0)/item.points.length;
  const y=item.points.reduce((s,p)=>s+p[1],0)/item.points.length;
  const px=geometry.left+x*geometry.width/100,py=geometry.top+y*geometry.height/100;
  // Fully cropped targets must not create invisible keyboard stops.
  const visible=px>=0&&py>=0&&px<=geometry.frameWidth&&py<=geometry.frameHeight;
  if(!visible)return null;
  // Both ends of the glow travel as custom properties. They come back from
  // hotspotGlow as validated hexes — a preset key resolved, or a custom colour
  // that matched /^#[0-9a-f]{6}$/ — so no author-supplied string reaches this
  // style declaration unchecked.
  const glow=hotspotGlow(item);
  const strength=hotspotGlowStrength(item.glowStrength)*(singleReveal?1.35:1);
  const gradient=hasGradient(item);
  // One gradient per area, so two areas with different colours cannot collide.
  const gradientId=`wp-glow-${instanceId}-${item.id}`;
  const outline=item.points.map(([x,y])=>`${x*geometry.width/100},${y*geometry.height/100}`).join(' ');
  const maskId=`wp-outside-${instanceId}-${item.id}`;
  return <GalleryLink key={item.id} to={item.path} aria-label={item.label} className={`wp-hotspot${gradient?' wp-hotspot--gradient':''}`} style={{'--wp-pulse-delay':`${1.5+index*.65}s`,'--wp-blur-near':`${3*strength}px`,'--wp-blur-far':`${7*strength}px`,'--wp-glow':glow.from,'--wp-glow-2':glow.to,...(gradient?{'--wp-stroke':`url(#${gradientId})`}:null)} as CSSProperties}>
   <svg aria-hidden="true" viewBox={`0 0 ${geometry.width} ${geometry.height}`} style={{position:'absolute',width:geometry.width,height:geometry.height,left:geometry.left,top:geometry.top}}>
    <defs>
     {gradient&&<linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={glow.from}/><stop offset="100%" stopColor={glow.to}/></linearGradient>}
     <mask id={maskId} maskUnits="userSpaceOnUse" x="-40" y="-40" width={geometry.width+80} height={geometry.height+80} style={{maskType:'luminance'}}>
      <rect x="-40" y="-40" width={geometry.width+80} height={geometry.height+80} fill="white"/>
      <polygon points={outline} fill="black"/>
     </mask>
    </defs>
    <polygon className="wp-hotspot-hit" points={outline}/>
    <g className="wp-hotspot-outline" mask={`url(#${maskId})`}><polygon points={outline}/></g>
   </svg>
   <span className="wp-hotspot-marker" style={{left:Math.max(100,Math.min(geometry.frameWidth-100,px)),top:Math.max(30,geometry.top+Math.min(...item.points.map(p=>p[1]))*geometry.height/100-24)}}><span className="wp-hotspot-arrow" aria-hidden="true">↗</span><span className="wp-hotspot-label">{item.label} ↗</span></span>
  </GalleryLink>;
 })}</div>;
}
