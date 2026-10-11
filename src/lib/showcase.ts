import { useEffect, useState } from 'react';
import { fetchJson } from './request';
import { isSupabaseConfigured, restUrl, SUPABASE_ANON_KEY } from './supabase';

export interface Showcase {
 slug: string;
 client_name: string;
 category: string;
 description: string;
 media_type: 'image' | 'video';
 media_url: string;
 poster_url: string | null;
 mobile_media_url: string | null;
 mobile_media_type: "image" | "video" | null;
 mobile_poster_url: string | null;
 mobile_focal_x: number | null;
 mobile_focal_y: number | null;
 alt_text: string;
 focal_x: number;
 focal_y: number;
 project_path: string | null;
}
const validMedia = (url: unknown): url is string => typeof url==='string' && /^https:\/\//i.test(url);
function validate(rows: unknown): Showcase[] {
 if (!Array.isArray(rows)) throw new Error('Invalid showcase response');
 return rows.filter((r): r is Showcase => !!r && typeof r.slug==='string' && typeof r.client_name==='string' && validMedia(r.media_url) && ['image','video'].includes(r.media_type)).map(r=>({...r,
  poster_url:validMedia(r.poster_url)?r.poster_url:null,
  mobile_media_url:validMedia(r.mobile_media_url)?r.mobile_media_url:null,
  mobile_media_type:r.mobile_media_type === "video" || r.mobile_media_type === "image" ? r.mobile_media_type : null,
  mobile_poster_url:validMedia(r.mobile_poster_url)?r.mobile_poster_url:null,
  mobile_focal_x:Number.isFinite(r.mobile_focal_x)?Math.min(100,Math.max(0,r.mobile_focal_x as number)):null,
  mobile_focal_y:Number.isFinite(r.mobile_focal_y)?Math.min(100,Math.max(0,r.mobile_focal_y as number)):null,
  project_path:typeof r.project_path==='string' && /^\/portfolio(?:[/?#]|$)/.test(r.project_path)?r.project_path:null,
  focal_x:Number.isFinite(r.focal_x)?Math.min(100,Math.max(0,r.focal_x)):50,
  focal_y:Number.isFinite(r.focal_y)?Math.min(100,Math.max(0,r.focal_y)):50,
 }));
}
export function useShowcase() {
 const [entries,setEntries]=useState<Showcase[]>([]);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState(false);
 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{
  let live=true;
  async function load(){
   setLoading(true);setError(false);
   try {
    if(!isSupabaseConfigured)throw new Error('Showcase unavailable');
    const {response,data}=await fetchJson<unknown>(`${restUrl('work_showcases')}?select=slug,client_name,category,description,media_type,media_url,poster_url,mobile_media_url,mobile_media_type,mobile_poster_url,mobile_focal_x,mobile_focal_y,alt_text,focal_x,focal_y,project_path&published=eq.true&order=position.asc,slug.asc`,{headers:{apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`}});
    if(!response.ok)throw new Error(`Showcase ${response.status}`);
    if(live)setEntries(validate(data));
   }catch{
    // Independent local preview content only; production never borrows gallery data.
    if(import.meta.env.DEV){const {showcasePreview}=await import('./showcase-preview');if(live)setEntries(validate(showcasePreview));}
    else if(live)setError(true);
   }finally{if(live)setLoading(false);}
  }
  void load();return()=>{live=false;};
 },[attempt]);
 return {entries,loading,error,retry:()=>setAttempt(n=>n+1)};
}
