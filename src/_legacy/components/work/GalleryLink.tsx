import { type ComponentProps } from 'react';
import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

/** Preserve ordinary link behaviour, with a short document dissolve when supported. */
export function GalleryLink(props: ComponentProps<typeof Link>) {
 const navigate=useNavigate();
 const preload=()=>{void import('../../pages/work/Brand').catch(()=>{});void import('../../pages/work/Collection').catch(()=>{});};
 return <Link {...props} onPointerEnter={e=>{preload();props.onPointerEnter?.(e);}} onFocus={e=>{preload();props.onFocus?.(e);}} onClick={e=>{
  props.onClick?.(e);
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||props.target==='_blank')return;
  if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  e.preventDefault();
  document.startViewTransition(()=>{flushSync(()=>navigate(props.to));window.scrollTo({top:0,behavior:'instant'});});
 }}/>;
}
