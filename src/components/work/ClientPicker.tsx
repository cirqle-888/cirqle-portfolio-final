import { useEffect, useRef, type CSSProperties } from 'react';
import type { Showcase } from '../../lib/showcase';

export function ClientPicker({entries,value,onChange}:{entries:Showcase[];value:string;onChange:(value:string)=>void}) {
 const list=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=list.current;
  const selected=root?.querySelector<HTMLElement>('[aria-pressed="true"]');
  if(root&&selected)root.scrollTo({top:selected.offsetTop-(root.clientHeight-selected.offsetHeight)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 },[value,entries]);
 return <nav className="wp-client-picker" aria-label="Select a client" style={{'--client-count':entries.length} as CSSProperties}>
  <div ref={list} className="wp-client-list" onKeyDown={e=>{
   const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
   const index=buttons.indexOf(document.activeElement as HTMLButtonElement);
   if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
    e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(index+(e.key==='ArrowDown'?1:buttons.length-1))%buttons.length;
    buttons[next]?.focus();
   }
  }}>{entries.map(entry=><button key={entry.slug} className={entry.slug===value?'is-current':''} aria-pressed={entry.slug===value} onClick={()=>onChange(entry.slug)}>{entry.client_name}</button>)}</div>
 </nav>;
}
