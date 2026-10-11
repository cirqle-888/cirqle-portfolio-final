import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Showcase } from '../../lib/showcase';

export function ClientPicker({entries,value,onChange}:{entries:Showcase[];value:string;onChange:(value:string)=>void}) {
 const [open,setOpen]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const choose=(slug:string)=>{onChange(slug);setOpen(false);trigger.current?.focus();};
 useEffect(()=>{
  if(!open)return;
  root.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
  const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};
  const resize=()=>{if(innerWidth>700)setOpen(false);};
  document.addEventListener('pointerdown',outside);window.addEventListener('resize',resize);
  return()=>{document.removeEventListener('pointerdown',outside);window.removeEventListener('resize',resize);};
 },[open]);
 return <div ref={root} className="wp-client-picker" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
  <button ref={trigger} className="wp-picker-trigger" aria-label="Choose a client" aria-haspopup="menu" aria-expanded={open} aria-controls="showcase-client-menu" onClick={()=>setOpen(!open)} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setOpen(true);}}}><span>{entries.find(e=>e.slug===value)?.client_name}</span><ChevronDown size={18} className={open?'is-open':''}/></button>
  {open&&<div id="showcase-client-menu" className="wp-picker-menu" role="menu" aria-label="Clients" onKeyDown={e=>{
   const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
   const index=buttons.indexOf(document.activeElement as HTMLButtonElement);
   if(e.key==='Escape'){e.preventDefault();setOpen(false);trigger.current?.focus();}
   else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(index+(e.key==='ArrowDown'?1:buttons.length-1))%buttons.length;buttons[next]?.focus();}
  }}>{entries.map(entry=><button key={entry.slug} role="menuitemradio" aria-checked={entry.slug===value} tabIndex={-1} onClick={()=>choose(entry.slug)}><span>{entry.client_name}</span>{entry.slug===value&&<Check size={16}/>}</button>)}</div>}
 </div>;
}
