import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Showcase } from '../../lib/showcase';

export function ProjectCaption({entry,announce}:{entry:Showcase;announce:boolean}) {
 const content=useRef<HTMLDivElement>(null);
 const [height,setHeight]=useState<number>();
 const reduced=useReducedMotion();
 useLayoutEffect(()=>{
  const node=content.current;if(!node)return;
  const measure=()=>setHeight(node.offsetHeight);
  measure();const observer=new ResizeObserver(measure);observer.observe(node);
  return()=>observer.disconnect();
 },[entry]);
 return <div className="wp-caption" aria-live={announce?'polite':'off'}>
  <motion.div className="wp-caption-stage" animate={{height}} transition={{duration:reduced?0:.65,ease:[.22,.61,.36,1]}}>
   <AnimatePresence initial={false}>
    <motion.div key={entry.slug} ref={content} className="wp-caption-content" initial={{opacity:reduced?1:0,y:reduced?0:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-4,position:'absolute'}} transition={{duration:reduced?0:.55,ease:'easeInOut'}}>
     <span>{entry.category}</span><h2>{entry.client_name}</h2>
     {entry.description&&<p>{entry.description}</p>}
     {entry.project_path&&<Link to={entry.project_path}>View project <ArrowUpRight size={15}/></Link>}
    </motion.div>
   </AnimatePresence>
  </motion.div>
 </div>;
}
