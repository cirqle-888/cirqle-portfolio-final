import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { Showcase } from '../../lib/showcase';

export function ClientPicker({entries,value,onChange}:{entries:Showcase[];value:string;onChange:(value:string)=>void}) {
 const [open,setOpen]=useState(false);
 const at=Math.max(0,entries.findIndex(entry=>entry.slug===value));
 const root=useRef<HTMLDivElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const choose=(slug:string)=>{onChange(slug);setOpen(false);trigger.current?.focus();};
 useEffect(()=>{
  if(!open)return;
  root.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();
  const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};

  document.addEventListener('pointerdown',outside);
  return()=>{document.removeEventListener('pointerdown',outside);};
 },[open]);
 return <div ref={root} className="wp-client-picker" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
  <button ref={trigger} className="wp-picker-trigger" aria-label="Choose a client" aria-haspopup="menu" aria-expanded={open} aria-controls="showcase-client-menu" onClick={()=>setOpen(!open)} onKeyDown={e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();setOpen(true);}}}><span className="wp-client-reel" aria-hidden="true"><span key={value} className="wp-client-reel-track">{[-2,-1,0,1,2].map(offset=><span key={offset} className={offset===0?'is-current':''}>{entries.length>1||offset===0?entries[(at+offset+entries.length*2)%entries.length]?.client_name:''}</span>)}</span></span><span className="wp-sr-only">{entries.find(e=>e.slug===value)?.client_name}</span><ChevronDown size={18} className={open?'is-open':''}/></button>
  {open&&<div id="showcase-client-menu" className="wp-picker-menu" role="menu" aria-label="Clients" onKeyDown={e=>{
   const buttons=Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
   const index=buttons.indexOf(document.activeElement as HTMLButtonElement);
   if(e.key==='Escape'){e.preventDefault();setOpen(false);trigger.current?.focus();}
   else if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(index+(e.key==='ArrowDown'?1:buttons.length-1))%buttons.length;buttons[next]?.focus();}
  }}>{entries.map(entry=><button key={entry.slug} role="menuitemradio" aria-checked={entry.slug===value} tabIndex={-1} onClick={()=>choose(entry.slug)}><span>{entry.client_name}</span>{entry.slug===value&&<Check size={16}/>}</button>)}</div>}
 </div>;
}
