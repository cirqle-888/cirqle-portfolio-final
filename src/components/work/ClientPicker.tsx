import { useEffect, useLayoutEffect, useRef } from 'react';
import type { Showcase } from '../../lib/showcase';

export function ClientPicker({entries,value,onChange}:{entries:Showcase[];value:string;onChange:(value:string)=>void}) {
 const list=useRef<HTMLDivElement>(null);
 const previous=useRef(value);
 const touchY=useRef<number|null>(null);
 const lastStep=useRef(0);
 const at=Math.max(0,entries.findIndex(entry=>entry.slug===value));
 useEffect(()=>{
  const root=list.current;if(!root||entries.length<2)return;
  let distance=0;
  const wheel=(event:WheelEvent)=>{
   event.preventDefault();distance+=event.deltaY;
   if(Math.abs(distance)<24||Date.now()-lastStep.current<700)return;
   lastStep.current=Date.now();onChange(entries[(at+(distance>0?1:entries.length-1))%entries.length].slug);distance=0;
  };
  root.addEventListener('wheel',wheel,{passive:false});
  return()=>root.removeEventListener('wheel',wheel);
 },[at,entries,onChange]);
 useLayoutEffect(()=>{
  const old=entries.findIndex(entry=>entry.slug===previous.current);
  previous.current=value;
  if(old<0||old===at||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const forward=(at-old+entries.length)%entries.length;
  const direction=forward<=entries.length/2?1:-1;
  const animation=list.current?.firstElementChild?.animate(
   [{transform:`translateY(${direction>0?0:-88}px)`},{transform:'translateY(-44px)'}],
   {duration:680,easing:'cubic-bezier(.22,.61,.36,1)'}
  );
  return()=>animation?.cancel();
 },[value,at,entries]);
 const step=(direction:number)=>onChange(entries[(at+direction+entries.length)%entries.length].slug);
 return <nav className="wp-client-picker" aria-label="Select a client">
  <div ref={list} className="wp-client-list" onTouchStart={e=>{touchY.current=e.touches[0].clientY}} onTouchEnd={e=>{
   if(touchY.current===null)return;
   const delta=touchY.current-e.changedTouches[0].clientY;touchY.current=null;
   if(Math.abs(delta)>25&&entries.length>1)step(delta>0?1:-1);
  }} onKeyDown={e=>{
   if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
    e.preventDefault();
    if(e.key==='Home'||e.key==='End')onChange(entries[e.key==='Home'?0:entries.length-1].slug);
    else step(e.key==='ArrowDown'?1:-1);
   }
  }}>
   <div className="wp-client-wheel">{[-2,-1,0,1,2].map(offset=>{
    if(entries.length===1&&offset!==0)return <span className="wp-client-empty" key={offset}/>;
    const entry=entries[(at+offset+entries.length*2)%entries.length];
    return <button aria-hidden={Math.abs(offset)>1||undefined} key={offset} className={offset===0?'is-current':''} aria-pressed={offset===0} tabIndex={offset===0?0:-1} onClick={()=>onChange(entry.slug)}>{entry.client_name}</button>;
   })}</div>
  </div>
 </nav>;
}
