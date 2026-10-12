import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { coverBox, hotspotColour, type PresentationHotspot } from '../../lib/hotspots';

/** SVG paths share the image's cover transform, including off-centre crops. */
export function PresentationHotspots({ items, source, focalX, focalY }: {items: PresentationHotspot[];source: string;focalX:number;focalY:number}) {
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
 return <div ref={frame} className="wp-hotspots" aria-label="Explore featured artwork">{geometry?.source===source&&items.map(item=>{
  const x=item.points.reduce((s,p)=>s+p[0],0)/item.points.length;
  const y=item.points.reduce((s,p)=>s+p[1],0)/item.points.length;
  const px=geometry.left+x*geometry.width/100,py=geometry.top+y*geometry.height/100;
  // Fully cropped targets must not create invisible keyboard stops.
  const visible=px>=0&&py>=0&&px<=geometry.frameWidth&&py<=geometry.frameHeight;
  if(!visible)return null;
  // The glow colour travels as a custom property. `hotspotColour` resolves a
  // stored KEY to one of a fixed set of hexes, so no author-supplied string
  // ever reaches this style declaration.
  return <a key={item.id} href={item.path} aria-label={item.label} className="wp-hotspot" style={{'--wp-glow':hotspotColour(item.color)} as CSSProperties}><svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute',width:geometry.width,height:geometry.height,left:geometry.left,top:geometry.top}}><polygon points={item.points.map(p=>p.join(',')).join(' ')} vectorEffect="non-scaling-stroke"/></svg><span className="wp-hotspot-marker" style={{left:px,top:py}}><span aria-hidden="true">+</span><span className="wp-hotspot-label">{item.label} ↗</span></span></a>;
 })}</div>;
}
