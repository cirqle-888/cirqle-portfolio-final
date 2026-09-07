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

/** What a portfolio entry actually is. */
export type WorkKind = "image" | "video" | "reel";

/**
 * What shape the piece was designed for — the second way the gallery can be
 * filtered. Independent of `kind`: a story frame may be a still or a clip.
 */
export type WorkFormat =
  // social media
  | "post" | "reel" | "story"
  // brand identity — one collection, mixed deliverables: some clients get a
  // logo and nothing else, some a full brandbook, some a single chart.
  | "logo" | "guidelines" | "brandbook" | "chart";

export const FORMAT_LABEL: Record<WorkFormat, string> = {
  post: "Posts",
  reel: "Reels",
  story: "Stories",
  logo: "Logos",
  guidelines: "Guidelines",
  brandbook: "Brandbooks",
  chart: "Brand charts",
};

/** Chip order on the site. Only formats actually present are ever shown. */
export const FORMATS: readonly WorkFormat[] =
  ["post", "reel", "story", "logo", "guidelines", "brandbook", "chart"] as const;

/** Where a linked reel lives, used to label the button that opens it. */
export type Platform = "instagram" | "youtube" | "facebook" | "tiktok" | "vimeo" | "other";

export interface WorkItem {
  /** "<brand>/<slug>" — unique within a collection */
  id: string;
  slug: string;
  /** File-derived name. Used for alt text and search, never shown on a tile. */
  title: string;
  /** What the tile says, when someone has written one. */
  caption?: string;
  kind: WorkKind;
  format: WorkFormat;
  /** Playable file we host — only for kind "video" */
  videoUrl?: string;
  /** Where it lives on a social platform; openable for any kind */
  externalUrl?: string;
  platform?: Platform;
  durationSeconds?: number;
  collectionSlug: string;
  brandSlug: string;
  brandName: string;
  /** Intrinsic size of the original artwork */
  width: number;
  height: number;
  /** width / height */
  aspect: number;
  /** Hand-picked place in the collection's All view; null when never dragged. */
  collectionPosition: number | null;
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
  /** Shown on the filter chip in place of the name, when one was uploaded. */
  logo?: string;
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
  caption?: string | null;
  width: number;
  height: number;
  variants: WorkVariant[] | null;
  position: number;
  collection_position?: number | null;
  kind: WorkKind | null;
  format: WorkFormat | null;
  media_path: string | null;
  external_url: string | null;
  duration_seconds: number | null;
}
interface RawBrand {
  slug: string;
  name: string;
  tagline: string | null;
  position: number;
  logo_path?: string | null;
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

// The newer columns are requested together and dropped together: PostgREST
// rejects the whole select for one unknown field, and a site that shipped
// before the migrations ran would otherwise show no portfolio at all.
interface Extras {
  brand: readonly string[];
  item: readonly string[];
}

const selectFor = ({ brand, item }: Extras) =>
  "slug,eyebrow,title,description,seo_title,seo_description,position," +
  `work_brands(slug,name,tagline,position,${brand.map((c) => `${c},`).join("")}` +
  `work_items(slug,title,width,height,variants,position,kind,` +
  `${item.map((c) => `${c},`).join("")}media_path,external_url,duration_seconds))`;

/**
 * What to ask for, best first, giving up ONE column per step.
 *
 * PostgREST rejects an entire select for a single unknown field, so a site
 * deployed ahead of its migrations has to be able to climb down. One at a time
 * and newest first, because the migrations land in that order: a database with
 * logos but no captions should still return the logos.
 */
const SELECTS: readonly Extras[] = [
  { brand: ["logo_path"], item: ["format", "collection_position", "caption"] },
  { brand: ["logo_path"], item: ["format", "collection_position"] },
  { brand: ["logo_path"], item: ["format"] },
  { brand: [], item: ["format"] },
  { brand: [], item: [] },
];

/**
 * Format for a row that has none — either because the database has not been
 * migrated yet, or because the row predates the column. Same rule as the
 * backfill in supabase/add-work-format.sql, so the site never disagrees with
 * what the dashboard will show once the column lands: anything that plays is a
 * reel, a tall still is a story frame, everything else is a post.
 */
function inferFormat(it: RawItem, collectionSlug: string): WorkFormat {
  // Outside social media there is nothing in the file to infer from — a logo
  // and a brandbook page look alike to a computer — so the neutral first type
  // stands in until someone sets it in the dashboard.
  if (collectionSlug === "brand-identity") return "logo";
  if (it.kind === "reel" || it.kind === "video") return "reel";
  if (it.width > 0 && it.height / it.width >= 1.5) return "story";
  return "post";
}

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
              const kind: WorkKind = it.kind ?? "image";
              return {
                id: `${b.slug}/${it.slug}`,
                slug: it.slug,
                title: it.title,
                caption: it.caption?.trim() || undefined,
                kind,
                format: it.format ?? inferFormat(it, c.slug),
                videoUrl: it.media_path ? publicUrl(WORK_BUCKET, it.media_path) : undefined,
                externalUrl: it.external_url ?? undefined,
                platform: it.external_url ? platformOf(it.external_url) : undefined,
                durationSeconds: it.duration_seconds ?? undefined,
                collectionSlug: c.slug,
                brandSlug: b.slug,
                brandName: b.name,
                width: it.width,
                height: it.height,
                aspect: it.width && it.height ? it.width / it.height : 1,
                collectionPosition: it.collection_position ?? null,
                variants,
                src: largest ? publicUrl(WORK_BUCKET, largest.path) : "",
                srcset: variants
                  .map((v) => `${publicUrl(WORK_BUCKET, v.path)} ${v.width}w`)
                  .join(", "),
              };
            })
            // A tile needs something to show: artwork, a clip we host, or at
            // minimum a link to send the viewer to. Videos whose poster frame
            // could not be captured have no renditions but are still playable,
            // so `videoUrl` has to count here.
            .filter((it) => it.src || it.videoUrl || it.externalUrl);

          return {
            slug: b.slug,
            name: b.name,
            tagline: b.tagline ?? undefined,
            logo: b.logo_path ? publicUrl(WORK_BUCKET, b.logo_path) : undefined,
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
        // brands.flatMap gives brand order, then order inside each brand —
        // which is what a brand page wants. The All view can override it: an
        // item dragged there carries a collectionPosition and sorts by it,
        // ahead of everything never placed by hand. sort() is stable, so the
        // untouched tail keeps exactly the order it already had.
        items: brands
          .flatMap((b) => b.items)
          .slice()
          .sort(
            (a, b) =>
              (a.collectionPosition ?? Number.MAX_SAFE_INTEGER) -
              (b.collectionPosition ?? Number.MAX_SAFE_INTEGER)
          ),
      };
    });
}

/**
 * How a creative should be described out loud — alt text, aria labels, the
 * lightbox heading. Its caption when there is one, otherwise just the brand:
 * the file-derived title never reaches a visitor.
 */
export function describeItem(item: Pick<WorkItem, "brandName" | "caption">): string {
  return item.caption ? `${item.brandName} — ${item.caption}` : item.brandName;
}

/** Recognise the host so the button can say "Watch on Instagram". */
export function platformOf(url: string): Platform {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    if (host.endsWith("instagram.com")) return "instagram";
    if (host.endsWith("youtube.com") || host === "youtu.be") return "youtube";
    if (host.endsWith("facebook.com") || host === "fb.watch") return "facebook";
    if (host.endsWith("tiktok.com")) return "tiktok";
    if (host.endsWith("vimeo.com")) return "vimeo";
    return "other";
  } catch {
    return "other";
  }
}

export const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
  tiktok: "TikTok",
  vimeo: "Vimeo",
  other: "the original",
};

/** YouTube video id, when the URL is one we can embed inline. */
export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (!host.endsWith("youtube.com")) return null;
    if (u.pathname === "/watch") return u.searchParams.get("v");
    const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

/** "1:04" from a duration in seconds. */
export function formatDuration(seconds?: number): string | null {
  if (!seconds || seconds <= 0) return null;
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
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

  // `format` is a newer column. If the site ships before the migration has been
  // run on the database, PostgREST rejects the WHOLE select for one unknown
  // field — which would blank the entire portfolio. Retrying without it keeps
  // the gallery up; every creative simply reads as a post until the column
  // lands, and the format chips stay hidden.
  const request = (extras: Extras) =>
    fetch(`${restUrl("work_collections")}?select=${encodeURIComponent(selectFor(extras))}`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });

  inflight = (async () => {
    let res = await request(SELECTS[0]);
    for (let i = 1; i < SELECTS.length && res.status === 400; i++) {
      if (i === 1) {
        console.warn(
          "Portfolio: a newer column is missing — run the pending files in cirqle-website/supabase."
        );
      }
      res = await request(SELECTS[i]);
    }
    if (!res.ok) throw new Error(`Portfolio request failed (${res.status})`);
    return shape((await res.json()) as RawCollection[]);
  })()
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
