import { PresentationHotspots } from './PresentationHotspots';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ClientPicker } from './ClientPicker';
import { useShowcase } from '../../lib/showcase';
import './WorkPresentation.css';

export function WorkPresentation() {
 const {entries,loading,error,retry}=useShowcase();
 const [interest,setInterest]=useState("brand-identity");
 const [selected,setSelected]=useState('');
 const [ready,setReady]=useState('');
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
 // Keep the outgoing decoded artwork until the incoming layer has dissolved over it.
 const [held,setHeld]=useState<{src:string;focalX:number;focalY:number}|null>(null);
 const hoverTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const cancelHover=()=>{if(hoverTimer.current)clearTimeout(hoverTimer.current);};
 useEffect(()=>()=>{if(hoverTimer.current)clearTimeout(hoverTimer.current);},[]);
 const markReady=useCallback((url:string)=>setReady(url),[]);
 useEffect(()=>{
  if(mediaType!=='video'||!mediaUrl)return;
  if(!poster)return;
  let live=true;const image=new Image();image.src=poster;
  void image.decode().then(()=>{if(live)requestAnimationFrame(()=>{if(live)markReady(mediaUrl);});}).catch(()=>{});
  return()=>{live=false;};
 },[mediaUrl,mediaType,poster,focalX,focalY,markReady]);
 const select=(slug:string)=>{
  cancelHover();
  if(slug===current?.slug)return;
  if(current&&ready===mediaUrl){const src=mediaType==='video'?poster:mediaUrl;if(src)setHeld({src,focalX:focalX??50,focalY:focalY??50});}
  setReady('');setSelected(slug);setFailed(null);
 };
 const hoverSelect=(slug:string)=>{cancelHover();hoverTimer.current=setTimeout(()=>select(slug),130);};
 // ── Idle ────────────────────────────────────────────────────────────────
 // The panels sit on top of the artwork, and the artwork is the point. After
 // a few quiet seconds they recede; any pointer movement brings them back.
 // Leaving the section entirely counts as going quiet immediately — if the
 // cursor is somewhere else on the page there is nobody to hide them from.
 const [idle,setIdle]=useState(false);
 const idleTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{
  const node=section.current;if(!node)return;
  const events=['pointermove','pointerdown','focusin','keydown'] as const;
  const wake=()=>{
   setIdle(false);
   if(idleTimer.current)clearTimeout(idleTimer.current);
   idleTimer.current=setTimeout(()=>setIdle(true),2800);
  };
  const rest=()=>{if(idleTimer.current)clearTimeout(idleTimer.current);setIdle(true);};
  wake();
  for(const event of events)node.addEventListener(event,wake);
  node.addEventListener('pointerleave',rest);
  return()=>{
   for(const event of events)node.removeEventListener(event,wake);
   node.removeEventListener('pointerleave',rest);
   if(idleTimer.current)clearTimeout(idleTimer.current);
  };
 },[]);

 // ── Auto-advance ────────────────────────────────────────────────────────
 // Held in a ref and reassigned every render so the interval always calls a
 // version that can see the current slug, without tearing the timer down and
 // rebuilding it on each state change.
 const advance=useRef<()=>void>(()=>{});
 const pausedUntil=useRef(0);
 const [overList,setOverList]=useState(false);
 advance.current=()=>{
  if(entries.length<2)return;
  const at=entries.findIndex(entry=>entry.slug===current?.slug);
  select(entries[(at+1)%entries.length].slug);
 };
 useEffect(()=>{
  if(entries.length<2||overList)return;
  // Honour the OS setting: an unrequested slideshow is motion.
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let onScreen=true;
  const observer=new IntersectionObserver(([entry])=>{onScreen=entry.isIntersecting;},{threshold:.55});
  if(section.current)observer.observe(section.current);
  const timer=setInterval(()=>{
   // Three reasons to skip a beat rather than stop: the section has scrolled
   // away, the tab is in the background (where timers are throttled anyway),
   // or somebody just chose a client by hand and is presumably reading it.
   if(!onScreen||document.visibilityState!=='visible'||Date.now()<pausedUntil.current)return;
   advance.current();
  },6500);
  return()=>{clearInterval(timer);observer.disconnect();};
 },[entries.length,overList]);

 useEffect(()=>{
  const header=document.querySelector('header');
  if(!header)return;
  const update=()=>section.current?.closest<HTMLElement>(".portfolio-page--presentation")?.style.setProperty('--portfolio-header',`${header.getBoundingClientRect().height}px`);
  const observer=new ResizeObserver(update);observer.observe(header);update();return()=>observer.disconnect();
 },[]);
 return <><div className="wp-dwell"><section ref={section} className={`work-presentation${idle?" work-presentation--idle":""}`} aria-label="Client work presentation" aria-busy={loading || (!!current && ready !== mediaUrl && !(mediaType==='video'&&!poster) && failed !== current.slug)}><div className="wp-first-frame" aria-hidden="true"/>
  {held&&held.src!==mediaUrl&&<div className="wp-media wp-media--ready wp-media--held" aria-hidden="true" style={{objectPosition:`${held.focalX}% ${held.focalY}%`}}>
   <img src={held.src} alt="" decoding="async" style={{objectPosition:'inherit'}}/>
  </div>}
  {current&&<div className={`wp-media ${ready===mediaUrl || (mediaType==='video'&&!poster) ? "wp-media--ready" : ""}`} key={`${current.slug}-${mediaUrl}`} style={{objectPosition:`${focalX}% ${focalY}%`}}>
   {mediaType==='video'?<video src={mediaUrl||undefined} poster={poster||undefined} controls playsInline preload="none" onLoadedData={()=>markReady(mediaUrl||'')} onError={()=>setFailed(current.slug)} aria-label={current.alt_text} style={{objectPosition:'inherit'}}/>:<img fetchPriority="high" decoding="async" onLoad={async e=>{const img=e.currentTarget;try{await img.decode();}catch{/* Loaded images may already be decoded. */}requestAnimationFrame(()=>requestAnimationFrame(()=>{if(img.isConnected)markReady(mediaUrl||'');}));}} src={mediaUrl||undefined} alt={current.alt_text} style={{objectPosition:'inherit'}} onError={()=>setFailed(current.slug)}/>}

  </div>}
  <div className="wp-shade" aria-hidden="true"/>
  {current && mediaType === "image" && ready === mediaUrl && failed !== current.slug && mediaUrl && <PresentationHotspots key={`${current.slug}-${mobile}`} items={(mobile ? current.hotspots?.mobile : current.hotspots?.desktop) || []} source={mediaUrl} focalX={focalX ?? 50} focalY={focalY ?? 50}/>}
  <div className="wp-top"><h1 className="wp-sr-only">Cirqle portfolio</h1><div className="wp-top-actions"><Link className="wp-browse" to="/portfolio?view=gallery">All work <ArrowUpRight size={16}/></Link></div></div>
  {loading&&<p className="wp-sr-only" role="status">Loading selected work…</p>}
  {error&&<div className="wp-state" role="alert"><p>Selected work is temporarily unavailable.</p><button onClick={retry}>Try again</button></div>}
  {!loading&&!error&&!current&&<p className="wp-state">Explore our latest work in the <Link to="/portfolio?view=gallery">gallery</Link>.</p>}
  {current&&<><ClientPicker entries={entries} value={current.slug} onChange={slug=>{pausedUntil.current=Date.now()+20000;select(slug);}}/><nav className="wp-clients" aria-label="Select a client" onPointerEnter={()=>setOverList(true)} onPointerLeave={()=>setOverList(false)}>{entries.map(entry=><button key={entry.slug} aria-pressed={entry.slug===current.slug} onPointerEnter={e=>{if(e.pointerType==='mouse')hoverSelect(entry.slug);}} onPointerLeave={cancelHover} onFocus={()=>select(entry.slug)} onClick={()=>{pausedUntil.current=Date.now()+20000;select(entry.slug);}}>{entry.client_name}</button>)}</nav><div className="wp-caption" key={current.slug} aria-live="polite"><span>{current.category}</span><h2>{current.client_name}</h2>{current.description&&<p>{current.description}</p>}{current.project_path&&<Link to={current.project_path}>View project <ArrowUpRight size={15}/></Link>}</div>{failed===current.slug&&<p className="wp-media-error" role="status">Visual unavailable. Explore the project or select another client.</p>}</>}
 </section></div><section className="wp-contact" aria-label="Start a project"><span className="wp-contact-eyebrow">YOUR NEXT CHAPTER</span><h2>Let’s make<br/><em>your next impression.</em></h2><p>What do you have in mind?</p><div className="wp-interest" aria-label="Project interest">{[['brand-identity','A brand'],['supermarket-campaign','A campaign'],['ui-ux-design','A digital experience']].map(([value,label])=><button key={value} aria-pressed={interest===value} onClick={()=>setInterest(value)}>{label}</button>)}</div><Link className="wp-contact-cta" to={`/contact?service=${interest}`}>Let’s talk <ArrowUpRight/></Link><div className="wp-contact-bottom"><a href="mailto:team@cirqle.work">team@cirqle.work</a><button onClick={()=>section.current?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>Back to work ↑</button><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></section></>;

}
