import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, Search } from 'lucide-react';
import { useWork, type WorkBrand, type WorkCollection } from '../../lib/work';

type Project = { brand: WorkBrand; collection: WorkCollection };
const keyOf = (p: Project) => `${p.collection.slug}/${p.brand.slug}`;
function Artwork({ project }: { project: Project }) {
 const { brand } = project;
 return <img src={brand.coverImage?.src || brand.cover.src} srcSet={brand.coverImage?.srcset || brand.cover.srcset} sizes="(max-width: 700px) 90vw, 55vw" alt={`${brand.name} — ${project.collection.title}`} loading="lazy"/>;
}
export function WorkExperience({ full = false }: { full?: boolean }) {
 const { collections, loading, error, retry } = useWork();
 const [active, setActive] = useState('');
 const [service, setService] = useState('all');
 const [brand, setBrand] = useState('all');
 const [search, setSearch] = useState('');
 const projects = collections.flatMap(c => c.brands.map((b, i) => ({ brand:b, collection:c, index:i }))).sort((a,b)=>a.index-b.index);
 const featured = projects.slice(0,8);
 const selected = featured.find(p=>keyOf(p)===active) || featured[0];
 const brands = [...new Map(projects.map(p=>[p.brand.slug,p.brand.name])).entries()];
 const filtered = projects.filter(p=>(service==='all'||p.collection.slug===service)&&(brand==='all'||p.brand.slug===brand)&&`${p.brand.name} ${p.brand.tagline || ''} ${p.collection.title}`.toLowerCase().includes(search.trim().toLowerCase()));
 const clear = ()=>{setService('all');setBrand('all');setSearch('');};
 const Heading = full ? 'h1' : 'h2';
 return <section className={`v2-wrap v2-section cq-work ${full?'cq-work-full':''}`} id="selected-work">
  <div className="v2-section-head"><div><span className="v2-eyebrow">THE CIRQLE PORTFOLIO</span><Heading>Work that comes<br/><em>full cirqle.</em></Heading></div><p>Explore the identities, campaigns and creatives behind the brands.</p></div>
  {loading && <div className="v2-project-skeleton" role="status" aria-label="Loading projects"/>}
  {error && <p role="alert">{error} <button className="v2-text-link" onClick={retry}>Try again</button></p>}
  {!loading && !error && !projects.length && <p>New work is on its way. <Link to="/contact">Talk to us about your project.</Link></p>}
  {!loading && !error && projects.length>0 && (full ? <div className="cq-work-layout">
   <aside className="cq-work-sidebar" aria-label="Portfolio filters">
    <details open><summary>Services</summary><div className="cq-filter-pills"><button aria-pressed={service==='all'} onClick={()=>setService('all')}>All services <small>({projects.length})</small></button>{collections.filter(c=>c.brands.length).map(c=><button key={c.slug} aria-pressed={service===c.slug} onClick={()=>setService(c.slug)}>{c.eyebrow || c.title} <small>({c.brands.length})</small></button>)}</div></details>
    <details open><summary>Brands</summary><div className="cq-filter-pills"><button aria-pressed={brand==='all'} onClick={()=>setBrand('all')}>All brands <small>({projects.length})</small></button>{brands.map(([slug,name])=><button key={slug} aria-pressed={brand===slug} onClick={()=>setBrand(slug)}>{name} <small>({projects.filter(p=>p.brand.slug===slug).length})</small></button>)}</div></details>
    <Link className="v2-pill" to="/contact">Discuss a project <ArrowUpRight size={18}/></Link>
   </aside>
   <div className="cq-work-results">
    <label className="cq-work-search"><Search size={19}/><input type="search" aria-label="Search projects" placeholder="Find a brand or project" value={search} onChange={e=>setSearch(e.target.value)}/></label>
    <div className="cq-active-filters"><span role="status">{filtered.length} {filtered.length===1?'project':'projects'}</span>{service!=='all'&&<button onClick={()=>setService('all')} aria-label="Remove service filter">{collections.find(c=>c.slug===service)?.eyebrow || service}<X size={15}/></button>}{brand!=='all'&&<button onClick={()=>setBrand('all')} aria-label="Remove brand filter">{brands.find(b=>b[0]===brand)?.[1]}<X size={15}/></button>}{(service!=='all'||brand!=='all'||search)&&<button className="cq-clear" onClick={clear}>Clear all</button>}</div>
    {filtered.length===0?<div className="cq-work-empty"><h3>No matching projects.</h3><p>Try another combination or reset your filters.</p><button className="v2-pill" onClick={clear}>Show all work</button></div>:<div className="v2-project-grid">{filtered.map(p=><Link className="v2-project" key={keyOf(p)} to={`/portfolio/${keyOf(p)}`}><div className="v2-project-art"><Artwork project={p}/><span className="v2-project-open"><ArrowUpRight/></span></div><div className="v2-project-caption"><div><h3>{p.brand.name}</h3><p>{p.brand.tagline || p.collection.title}</p></div></div><span className="cq-project-service">{p.collection.eyebrow || p.collection.title}</span></Link>)}</div>}
   </div>
  </div> : selected && <div className="cq-work-stage">
   <div className="cq-work-selector" aria-label="Featured projects">{featured.map(p=><button key={keyOf(p)} aria-pressed={keyOf(selected)===keyOf(p)} aria-controls="featured-project" onClick={()=>setActive(keyOf(p))} onPointerEnter={e=>{if(e.pointerType==='mouse')setActive(keyOf(p));}} onFocus={()=>setActive(keyOf(p))}>{p.brand.name}<span>{p.collection.eyebrow}</span></button>)}<Link to="/portfolio">All work <ArrowUpRight size={16}/></Link></div>
   <div className="cq-featured" id="featured-project"><Link key={keyOf(selected)} className="cq-featured-art" to={`/portfolio/${keyOf(selected)}`} aria-label={`View ${selected.brand.name} project`}><Artwork project={selected}/><span className="v2-round-link"><ArrowUpRight/></span></Link><div className="cq-featured-caption" aria-live="polite"><div><span className="v2-eyebrow">{selected.collection.eyebrow}</span><h3>{selected.brand.name}</h3><p>{selected.brand.tagline || selected.collection.title}</p></div><Link className="v2-text-link" to={`/portfolio/${keyOf(selected)}`}>View project <ArrowUpRight size={18}/></Link></div></div>
  </div>)}
 </section>;
}
