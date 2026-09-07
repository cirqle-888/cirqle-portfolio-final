/**
 * Supermarket flyers, from the website Supabase project.
 *
 * These are read from the `flyers` table rather than by listing the storage
 * bucket, because the site presents them as a flip-through brochure and page
 * order matters — object storage has no dependable ordering.
 *
 * Uploading and reordering happens in cirqle-app (Dashboard → Portfolio →
 * Flyers). Nothing on this site can write.
 */
import { isSupabaseConfigured, publicUrl, restUrl, SUPABASE_ANON_KEY } from "../lib/supabase";
import type { WorkVariant } from "../lib/work";

const FLYERS_BUCKET = "flyers";

export { isSupabaseConfigured };

export interface Flyer {
  title: string;
  width: number;
  height: number;
  /** Largest rendition — what the brochure reader shows */
  src: string;
  /** Every rendition, so the grid can pick a small one */
  srcset: string;
}

interface RawFlyer {
  title: string;
  width: number;
  height: number;
  variants: WorkVariant[] | null;
  position: number;
}

/**
 * Every published flyer, in page order.
 * Returns [] when Supabase is unconfigured or unreachable, so the caller keeps
 * its placeholder rather than showing an empty shelf.
 */
export async function getSupermarketFlyers(): Promise<Flyer[]> {
  if (!isSupabaseConfigured) return [];

  try {
    const res = await fetch(
      `${restUrl("flyers")}?select=title,width,height,variants,position&order=position.asc`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    if (!res.ok) {
      console.error(`Flyer request failed (${res.status})`);
      return [];
    }

    return ((await res.json()) as RawFlyer[])
      .map((row) => {
        const variants = (row.variants ?? [])
          .filter((v) => v?.path && v.width > 0)
          .slice()
          .sort((a, b) => b.width - a.width);
        const largest = variants[0];
        if (!largest) return null;
        return {
          title: row.title,
          width: row.width,
          height: row.height,
          src: publicUrl(FLYERS_BUCKET, largest.path),
          srcset: variants.map((v) => `${publicUrl(FLYERS_BUCKET, v.path)} ${v.width}w`).join(", "),
        };
      })
      .filter((f): f is Flyer => f !== null);
  } catch (err) {
    console.error("Could not load flyers:", err);
    return [];
  }
}
