import { readHotspots, type PresentationHotspots } from './hotspots';
import { useEffect, useState } from 'react';
import { fetchJson } from './request';
import { isSupabaseConfigured, restUrl, SUPABASE_ANON_KEY } from './supabase';

export interface Showcase {
 hotspots?: PresentationHotspots;
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
  hotspots:readHotspots(r.hotspots),
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
// Share the public response between Home and Work, including concurrent mounts.
let cached: Showcase[] | null = null;
let expires = 0;
let pending: Promise<Showcase[]> | null = null;
function loadShowcase(): Promise<Showcase[]> {
 if(cached && Date.now()<expires) return Promise.resolve(cached);
 if(pending) return pending;
 pending=(async()=>{
  let rows: Showcase[];
  try {
   if(!isSupabaseConfigured) throw new Error('Showcase unavailable');
    const {response,data}=await fetchJson<unknown>(`${restUrl('work_showcases')}?select=*&published=eq.true&order=position.asc,slug.asc`,{headers:{apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`}});
    if(!response.ok)throw new Error(`Showcase ${response.status}`);
   rows=validate(data);
  } catch(error) {
   if(!import.meta.env.DEV) throw error;
   const {showcasePreview}=await import('./showcase-preview');
   rows=validate(showcasePreview);
  }
  cached=rows;expires=Date.now()+60000;
  return rows;
 })().finally(()=>{pending=null;});
 return pending;
}
export function useShowcase() {
 const [entries,setEntries]=useState<Showcase[]>(()=>cached||[]);
 const [loading,setLoading]=useState(()=>!cached);
 const [error,setError]=useState(false);
 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{
  let live=true;
  void loadShowcase().then(rows=>{if(live){setEntries(rows);setError(false);}}).catch(()=>{if(live)setError(true);}).finally(()=>{if(live)setLoading(false);});
  return()=>{live=false;};
 },[attempt]);
 return {entries,loading,error,retry:()=>{expires=0;setError(false);setLoading(!entries.length);setAttempt(n=>n+1);}};
}
