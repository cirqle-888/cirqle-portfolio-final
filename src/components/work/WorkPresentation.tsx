import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ClientPicker } from './ClientPicker';
import { useShowcase } from '../../lib/showcase';
import './WorkPresentation.css';

export function WorkPresentation() {
 const {entries,loading,error,retry}=useShowcase();
 const [interest,setInterest]=useState("brand-identity");
 const [selected,setSelected]=useState('');
 const [failed,setFailed]=useState<string|null>(null);
 const [mobile,setMobile]=useState(()=>window.matchMedia("(max-width:700px)").matches);
 useEffect(()=>{const query=window.matchMedia("(max-width:700px)");const update=()=>setMobile(query.matches);query.addEventListener("change",update);return()=>query.removeEventListener("change",update);},[]);
 const section=useRef<HTMLElement>(null);
 const current=entries.find(entry=>entry.slug===selected)||entries[0];
 const useMobile=mobile && !!current?.mobile_media_url;
 const mediaUrl=useMobile ? current?.mobile_media_url : current?.media_url;
 const mediaType=useMobile ? current?.mobile_media_type || current?.media_type : current?.media_type;
 const poster=useMobile ? current?.mobile_poster_url || current?.poster_url : current?.poster_url;
 const focalX=useMobile ? current?.mobile_focal_x ?? current?.focal_x : current?.focal_x;
 const focalY=useMobile ? current?.mobile_focal_y ?? current?.focal_y : current?.focal_y;
 const select=(slug:string)=>{setSelected(slug);setFailed(null);};
 useEffect(()=>{
  const header=document.querySelector('header');
  if(!header)return;
  const update=()=>section.current?.closest<HTMLElement>(".portfolio-page--presentation")?.style.setProperty('--portfolio-header',`${header.getBoundingClientRect().height}px`);
  const observer=new ResizeObserver(update);observer.observe(header);update();return()=>observer.disconnect();
 },[]);
 return <><div className="wp-dwell"><section ref={section} className="work-presentation" aria-label="Client work presentation">
  {current&&<div className="wp-media" key={`${current.slug}-${mediaUrl}`} style={{objectPosition:`${focalX}% ${focalY}%`}}>
   {mediaType==='video'?<video src={mediaUrl||undefined} poster={poster||undefined} controls playsInline preload="none" onError={()=>setFailed(current.slug)} aria-label={current.alt_text} style={{objectPosition:'inherit'}}/>:<img src={mediaUrl||undefined} alt={current.alt_text} style={{objectPosition:'inherit'}} onError={()=>setFailed(current.slug)}/>}

  </div>}
  <div className="wp-shade" aria-hidden="true"/>
  <div className="wp-top"><h1 className="wp-sr-only">Cirqle portfolio</h1><div className="wp-top-actions"><button className="wp-return" onClick={()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}>Navigation ↑</button><Link className="wp-browse" to="/portfolio?view=gallery">All work <ArrowUpRight size={16}/></Link></div></div>
  {loading&&<p className="wp-state" role="status">Loading selected work…</p>}
  {error&&<div className="wp-state" role="alert"><p>Selected work is temporarily unavailable.</p><button onClick={retry}>Try again</button></div>}
  {!loading&&!error&&!current&&<p className="wp-state">Explore our latest work in the <Link to="/portfolio?view=gallery">gallery</Link>.</p>}
  {current&&<><ClientPicker entries={entries} value={current.slug} onChange={select}/><nav className="wp-clients" aria-label="Select a client">{entries.map(entry=><button key={entry.slug} aria-pressed={entry.slug===current.slug} onPointerEnter={e=>{if(e.pointerType==='mouse')select(entry.slug);}} onFocus={()=>select(entry.slug)} onClick={()=>select(entry.slug)}>{entry.client_name}</button>)}</nav><div className="wp-caption" aria-live="polite"><span>{current.category}</span><h2>{current.client_name}</h2>{current.description&&<p>{current.description}</p>}{current.project_path&&<Link to={current.project_path}>View project <ArrowUpRight size={15}/></Link>}</div>{failed===current.slug&&<p className="wp-media-error" role="status">Visual unavailable. Explore the project or select another client.</p>}</>}
 </section></div><section className="wp-contact" aria-label="Start a project"><span className="wp-contact-eyebrow">YOUR NEXT CHAPTER</span><h2>Let’s make<br/><em>your next impression.</em></h2><p>What do you have in mind?</p><div className="wp-interest" aria-label="Project interest">{[['brand-identity','A brand'],['supermarket-campaign','A campaign'],['ui-ux-design','A digital experience']].map(([value,label])=><button key={value} aria-pressed={interest===value} onClick={()=>setInterest(value)}>{label}</button>)}</div><Link className="wp-contact-cta" to={`/contact?service=${interest}`}>Let’s talk <ArrowUpRight/></Link><div className="wp-contact-bottom"><a href="mailto:team@cirqle.work">team@cirqle.work</a><button onClick={()=>section.current?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>Back to work ↑</button><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></section></>;

}
