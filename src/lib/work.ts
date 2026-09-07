/**
 * Portfolio ("Work") content, loaded from the website Supabase project.
 *
 * The marketing site only ever reads. Everything here is public content, so it
 * is fetched with the anon key over PostgREST and cached for the lifetime of
 * the page — see src/lib/supabase.ts for why there is no Supabase SDK.
 *
 * Uploading and editing happens in cirqle-app (Dashboard → Portfolio), which
 * writes with the service role key. Nothing on this site can write.
 */
import { useEffect, useState } from "react";
import { isSupabaseConfigured, publicUrl, restUrl, SUPABASE_ANON_KEY } from "./supabase";

/** Bucket holding portfolio renditions. */
const WORK_BUCKET = "work";

/** One generated rendition of a creative. */
export interface WorkVariant {
  width: number;
  height: number;
  path: string;
  bytes?: number;
}

export interface WorkItem {
  /** "<brand>/<slug>" — unique within a collection */
  id: string;
  slug: string;
  title: string;
  collectionSlug: string;
  brandSlug: string;
  brandName: string;
  /** Intrinsic size of the original artwork */
  width: number;
  height: number;
  /** width / height */
  aspect: number;
  variants: WorkVariant[];
  /** Largest rendition — used by the lightbox and the download button */
  src: string;
  /** `srcset` string across every rendition */
  srcset: string;
}

export interface WorkBrand {
  slug: string;
  name: string;
  tagline?: string;
  items: WorkItem[];
  cover: WorkItem;
}

export interface WorkCollection {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  brands: WorkBrand[];
  /** All items, brand order then item order */
  items: WorkItem[];
}

// ── Shapes returned by PostgREST ────────────────────────────────────────────
interface RawItem {
  slug: string;
  title: string;
  width: number;
  height: number;
  variants: WorkVariant[] | null;
  position: number;
}
interface RawBrand {
  slug: string;
  name: string;
  tagline: string | null;
  position: number;
  work_items: RawItem[] | null;
}
interface RawCollection {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  seo_title: string | null;
  seo_description: string | null;
  position: number;
  work_brands: RawBrand[] | null;
}

const SELECT =
  "slug,eyebrow,title,description,seo_title,seo_description,position," +
  "work_brands(slug,name,tagline,position," +
  "work_items(slug,title,width,height,variants,position))";

const byPosition = <T extends { position: number; slug: string }>(a: T, b: T) =>
  a.position - b.position || a.slug.localeCompare(b.slug, undefined, { numeric: true });

function shape(raw: RawCollection[]): WorkCollection[] {
  return raw
    .slice()
    .sort(byPosition)
    .map((c) => {
      const brands: WorkBrand[] = (c.work_brands ?? [])
        .slice()
        .sort(byPosition)
        .map((b) => {
          const items: WorkItem[] = (b.work_items ?? [])
            .slice()
            .sort(byPosition)
            .map((it) => {
              // Widest rendition first, so [0] is always the full-size image.
              const variants = (it.variants ?? [])
                .filter((v) => v?.path && v.width > 0)
                .slice()
                .sort((x, y) => y.width - x.width);
              const largest = variants[0];
              return {
                id: `${b.slug}/${it.slug}`,
                slug: it.slug,
                title: it.title,
                collectionSlug: c.slug,
                brandSlug: b.slug,
                brandName: b.name,
                width: it.width,
                height: it.height,
                aspect: it.width && it.height ? it.width / it.height : 1,
                variants,
                src: largest ? publicUrl(WORK_BUCKET, largest.path) : "",
                srcset: variants
                  .map((v) => `${publicUrl(WORK_BUCKET, v.path)} ${v.width}w`)
                  .join(", "),
              };
            })
            // An item with no renditions would render as a broken tile.
            .filter((it) => it.src);

          return {
            slug: b.slug,
            name: b.name,
            tagline: b.tagline ?? undefined,
            items,
            cover: items[0],
          };
        })
        .filter((b) => b.items.length > 0);

      return {
        slug: c.slug,
        eyebrow: c.eyebrow,
        title: c.title,
        description: c.description,
        seoTitle: c.seo_title ?? `${c.title} | Cirqle`,
        seoDescription: c.seo_description ?? c.description,
        brands,
        items: brands.flatMap((b) => b.items),
      };
    });
}

// ── Loading ─────────────────────────────────────────────────────────────────
// One request per page load, shared by every component that asks. A failure is
// cached too, for a short while: several sections call this on mount, and
// without a cooldown an unreachable backend would be retried once per section
// on every navigation.
const RETRY_AFTER_MS = 30_000;

let inflight: Promise<WorkCollection[]> | null = null;
let failedAt = 0;

export function loadWork(): Promise<WorkCollection[]> {
  if (inflight) {
    // Let a stale failure expire so the content can appear without a reload.
    if (!failedAt || Date.now() - failedAt < RETRY_AFTER_MS) return inflight;
    inflight = null;
    failedAt = 0;
  }
  if (!isSupabaseConfigured) return Promise.resolve([]);

  inflight = fetch(`${restUrl("work_collections")}?select=${encodeURIComponent(SELECT)}`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`Portfolio request failed (${res.status})`);
      return shape((await res.json()) as RawCollection[]);
    })
    .catch((err) => {
      console.error("Could not load portfolio:", err);
      failedAt = Date.now();
      return [] as WorkCollection[];
    });

  return inflight;
}

export interface UseWorkResult {
  collections: WorkCollection[];
  loading: boolean;
}

/** Subscribe a component to the portfolio content. */
export function useWork(): UseWorkResult {
  const [collections, setCollections] = useState<WorkCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadWork().then((data) => {
      if (cancelled) return;
      setCollections(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { collections, loading };
}

// ── Lookups ─────────────────────────────────────────────────────────────────
export function findCollection(
  collections: WorkCollection[],
  slug: string | undefined
): WorkCollection | undefined {
  return slug ? collections.find((c) => c.slug === slug) : undefined;
}

export function findBrand(
  collections: WorkCollection[],
  collectionSlug: string | undefined,
  brandSlug: string | undefined
): WorkBrand | undefined {
  return findCollection(collections, collectionSlug)?.brands.find((b) => b.slug === brandSlug);
}

// ── Helpers shared with the components ──────────────────────────────────────
/** Rendition closest to (and not smaller than) `targetW` px wide. */
export function srcFor(item: WorkItem, targetW: number): string {
  const ascending = item.variants.slice().sort((a, b) => a.width - b.width);
  const pick = ascending.find((v) => v.width >= targetW) ?? ascending[ascending.length - 1];
  return pick ? publicUrl(WORK_BUCKET, pick.path) : item.src;
}

export function absoluteUrl(src: string, origin = "https://cirqle.work"): string {
  try {
    return new URL(src, origin).toString();
  } catch {
    return src;
  }
}
