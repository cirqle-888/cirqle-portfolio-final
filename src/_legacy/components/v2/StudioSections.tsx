import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Plus, Minus, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useWork } from '../../lib/work';
import { WorkExperience } from './WorkExperience';
import { FAQS } from '../../lib/faqs';

const studioServices = [
  { title:'Brand identity', slug:'brand-identity', path:'/services/brand-identity', description:'From the first impression to every touchpoint. A distinctive identity that feels like you, wherever your brand shows up.', tags:['Strategy & positioning','Logo & visual identity','Brand guidelines','Packaging'], collection:'brand-identity' },
  { title:'Retail & campaigns', slug:'supermarket-campaign', path:'/highlights/supermarket-campaign', description:'Turn your next offer into something people stop for. Cohesive supermarket flyers, event campaigns and launch materials, made for the retail calendar.', tags:['Supermarket flyers','Event branding','Campaign design','Print & outdoor'], collection:'print' },
  { title:'Digital experiences', slug:'ui-ux-design', path:'/services/ui-ux-design', description:'Thoughtful websites and interfaces that make your brand easy to understand, explore and choose.', tags:['Web design','UI/UX design','Design systems','Development'], collection:'social-media' },
  { title:'Content & motion', slug:'social-media', path:'/contact?service=social-media', description:'Keep your brand moving. Social creatives, video and campaign content that connect the everyday moments into one recognisable story.', tags:['Social media','Video production','Motion design','Meta ads'], collection:'social-media' },
];

export function StudioHero() {
  return <section className="v2-hero v2-wrap">
    <div className="v2-eyebrow"><span className="v2-dot" /> Independent creative team · Working worldwide</div>
    <h1>We build brands.<br/>Create experiences.<br/><span>Bring it full cirqle.</span></h1>
    <div className="v2-hero-bottom"><a className="v2-scroll" href="#selected-work"><ArrowDown size={20}/> Discover our work</a><p>Strategy, design and digital.<br/>One connected team for every<br/>expression of your brand.</p></div>
  </section>;
}

export function StudioVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused,setPaused] = useState(false);
  return <section className={`v2-visual ${paused || reduced ? 'is-paused' : ''}`} ref={ref} aria-label="Cirqle creative identity" onPointerMove={event=>{ if(reduced || event.pointerType==='touch')return; const r=event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty('--mx',`${(event.clientX-r.left)/r.width*18-9}deg`); event.currentTarget.style.setProperty('--my',`${(event.clientY-r.top)/r.height*12-6}deg`); }} onPointerLeave={()=>{ref.current?.style.setProperty('--mx','0deg');ref.current?.style.setProperty('--my','0deg');}}>
    <div className="v2-visual-top"><span>CIRQLE® / CREATIVE CONNECTIONS</span><span>Brand. Digital. Motion.</span></div>
    <div className="v2-orbit-scene" aria-hidden="true"><div className="v2-orbit"><i/><i/><i/><i/><div className="v2-orbit-core"/></div></div>
    <div className="v2-visual-copy"><span>Different skills.<br/>One shared vision.</span><Link to="/portfolio" className="v2-round-link" aria-label="Explore the Cirqle portfolio"><ArrowUpRight/></Link></div>
    {!reduced && <button className="v2-motion-toggle" onClick={()=>setPaused(!paused)} aria-label={paused?'Play visual animation':'Pause visual animation'}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>}
  </section>;
}

export function StudioProjects({full=false}:{full?:boolean}) { return <WorkExperience full={full}/>; }

export function StudioServices() {
  const [active,setActive] = useState<number|null>(0);
  return <section className="v2-wrap v2-section v2-services" id="services"><div className="v2-services-intro"><span className="v2-eyebrow">ONE TEAM. EVERY TOUCHPOINT.</span><h2>Good design<br/>connects<br/><em>everything.</em></h2><p>We bring your identity, campaigns and digital experiences together. So every part feels like the same brand.</p><Link className="v2-text-link" to="/services">Our capabilities <ArrowUpRight size={19}/></Link></div><div className="v2-service-list">{studioServices.map((service,i)=><div key={service.slug} className={`v2-service ${active===i?'is-open':''}`}><h3><button aria-expanded={active===i} aria-controls={`service-panel-${i}`} onClick={()=>setActive(active===i?null:i)}><span className="v2-service-number">0{i+1}</span>{service.title}{active===i?<Minus/>:<Plus/>}</button></h3><div id={`service-panel-${i}`} hidden={active!==i}><p>{service.description}</p><div className="v2-tags">{service.tags.map(t=><span key={t}>{t}</span>)}</div><Link to={service.path} className="v2-text-link">Explore {service.title.toLowerCase()} <ArrowUpRight size={17}/></Link></div></div>)}</div></section>;
}

export function StudioClients() {
  const {collections}=useWork();
  const brands=[...new Map(collections.flatMap(c=>c.brands).map(b=>[b.name,b])).values()].filter(b=>!`${b.tagline || ''}`.toLowerCase().includes('concept')).slice(0,8);
  if(!brands.length)return null;
  return <section className="v2-wrap v2-clients"><span className="v2-eyebrow">IN GOOD COMPANY</span><div>{brands.map(b=><span key={b.name}>{b.name}</span>)}</div></section>;
}

const steps=[['Discover','We start with your business, your audience and what you want to change.'],['Create','A clear direction, thoughtful design and room to explore the unexpected.'],['Refine','We work through feedback together, keeping every touchpoint connected.'],['Launch','Ready-to-use assets and the support to take your next step with confidence.']];
export function StudioProcess(){const[step,setStep]=useState(0);return <section className="v2-process"><div className="v2-wrap v2-section"><div className="v2-section-head"><div><span className="v2-eyebrow">HOW WE WORK</span><h2>Great work starts<br/>with a conversation.</h2></div><p>Close collaboration. A clear process.<br/>A shared ambition to make it better.</p></div><div className="v2-process-tabs" role="tablist" aria-label="Our process">{steps.map(([title],i)=><button role="tab" id={`step-tab-${i}`} aria-selected={step===i} aria-controls="process-detail" key={title} onClick={()=>setStep(i)} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:3))%4;setStep(next);document.getElementById(`step-tab-${next}`)?.focus();}}} tabIndex={step===i?0:-1}><span>0{i+1}</span>{title}<ArrowUpRight size={18}/></button>)}</div><div id="process-detail" role="tabpanel" aria-labelledby={`step-tab-${step}`} className="v2-process-detail"><span>0{step+1} / 04</span><p>{steps[step][1]}</p><Link to="/contact" className="v2-round-link" aria-label="Discuss a project"><ArrowUpRight/></Link></div></div></section>;}
export function StudioFaq(){return <section className="v2-wrap v2-section v2-faq"><div><span className="v2-eyebrow">A FEW GOOD QUESTIONS</span><h2>Glad you asked.</h2></div><div>{FAQS.map(f=><details key={f.q}><summary>{f.q}<Plus size={20}/></summary><p>{f.a}</p></details>)}</div></section>;}
export function StudioContact(){return <section className="v2-wrap v2-contact-callout"><span className="v2-eyebrow">YOUR NEXT CHAPTER</span><Link to="/contact"><h2>Let’s make<br/><em>something matter.</em></h2><span className="v2-round-link"><ArrowUpRight/></span></Link><div><p>Have an idea, a brief, or a good question?</p><a href="mailto:team@cirqle.work">team@cirqle.work <ArrowUpRight size={18}/></a></div></section>;}
