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
  /** True when this page belongs to the same booklet as the page before it. */
  bookletContinues: boolean;
}

/**
 * One thing to pick up off the table: a single sheet, or the pages of one
 * folded brochure.
 */
export interface FlyerGroup {
  pages: Flyer[];
  /** Index of the first page in the flat list, for the brochure reader. */
  startIndex: number;
}

/**
 * Fold the flat page list into booklets. A page flagged `bookletContinues`
 * joins the booklet above it; anything else starts a new one. A flag on the
 * very first page has nothing to continue, so it opens a booklet like any
 * other page.
 */
export function groupFlyers(flyers: Flyer[]): FlyerGroup[] {
  const groups: FlyerGroup[] = [];
  flyers.forEach((flyer, index) => {
    const previous = groups[groups.length - 1];
    if (flyer.bookletContinues && previous) previous.pages.push(flyer);
    else groups.push({ pages: [flyer], startIndex: index });
  });
  return groups;
}

interface RawFlyer {
  title: string;
  width: number;
  height: number;
  variants: WorkVariant[] | null;
  position: number;
  booklet_continues?: boolean | null;
}

/**
 * Every published flyer, in page order.
 * Returns [] when Supabase is unconfigured or unreachable, so the caller keeps
 * its placeholder rather than showing an empty shelf.
 */
export async function getSupermarketFlyers(): Promise<Flyer[]> {
  if (!isSupabaseConfigured) return [];

  // `booklet_continues` is newer than the table. PostgREST rejects the whole
  // select for one unknown column, which would empty the shelf, so a 400 is
  // retried without it — every flyer then reads as its own single sheet.
  const request = (withBooklets: boolean) =>
    fetch(
      `${restUrl("flyers")}?select=title,width,height,variants,position` +
        `${withBooklets ? ",booklet_continues" : ""}&order=position.asc`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );

  try {
    let res = await request(true);
    if (res.status === 400) {
      console.warn('Flyers: the "booklet_continues" column is missing — run supabase/add-flyer-booklets.sql.');
      res = await request(false);
    }
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
          bookletContinues: row.booklet_continues ?? false,
        };
      })
      .filter((f): f is Flyer => f !== null);
  } catch (err) {
    console.error("Could not load flyers:", err);
    return [];
  }
}
