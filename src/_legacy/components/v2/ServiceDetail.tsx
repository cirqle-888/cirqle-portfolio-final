import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { StudioProjects } from './StudioSections';

export function ServiceDetail({title,description,service,glyphs,items}:{title:string;description:string;service:string;glyphs:string[];items:{title:string;desc:string}[]}) {
 return <>
  <section className="v2-wrap v2-page-intro"><Link className="v2-eyebrow" to="/services">CIRQLE / CAPABILITIES</Link><h1>{title}</h1><p>{description}</p><Link className="v2-pill v2-service-cta" data-slot="button" to={`/contact?service=${service}`}>Discuss your project <ArrowUpRight size={18}/></Link></section>
  <div className="v2-service-art" aria-hidden="true">{glyphs.map((glyph,i)=><span key={i}>{glyph}</span>)}</div>
  <section className="v2-wrap v2-section v2-service-deliverables"><div><span className="v2-eyebrow">THOUGHT THROUGH. READY TO USE.</span><h2>Every detail.<br/>One clear direction.</h2></div><ul>{items.map((item,i)=><li key={item.title}><span>0{i+1}</span><div><h3>{item.title}</h3><p>{item.desc}</p></div></li>)}</ul></section>
  <StudioProjects/>
 </>;
}
