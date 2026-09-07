/**
 * Minimal Supabase client for the WEBSITE project.
 *
 * This site only ever reads public marketing content: portfolio work and the
 * weekly supermarket flyers. That is two REST shapes, so it talks to Supabase
 * directly with `fetch` rather than pulling @supabase/supabase-js (~120 kB)
 * into a marketing bundle.
 *
 * Important: these credentials belong to the *website* Supabase project, which
 * holds nothing but published content. The project behind cirqle-app — with
 * payroll, finance and client data — is never reachable from this site.
 * The anon key is public by design and constrained by Row Level Security to
 * SELECT on published rows only.
 */

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL ?? "").replace(/\/+$/, "");

export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

/** True when both env vars are present, so callers can fall back gracefully. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** PostgREST endpoint for a table. */
export function restUrl(table: string): string {
  return `${SUPABASE_URL}/rest/v1/${table}`;
}

/** Public URL for an object in a public bucket. */
export function publicUrl(bucket: string, path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

/** Origin used for the preconnect hint in index.html. */
export function supabaseOrigin(): string {
  return SUPABASE_URL;
}

export interface StorageObject {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  metadata: { size?: number; mimetype?: string } | null;
}

const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

/**
 * List image files inside a public bucket (optionally within a folder),
 * newest first. Returns [] on any failure so the UI can fall back.
 */
export async function listBucketImages(
  bucket: string,
  options: { folder?: string; limit?: number } = {}
): Promise<StorageObject[]> {
  if (!isSupabaseConfigured) return [];

  const { folder = "", limit = 100 } = options;

  try {
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${bucket}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        prefix: folder,
        limit,
        offset: 0,
        // Newest upload first — matches how weekly flyers are published.
        sortBy: { column: "created_at", order: "desc" },
      }),
    });

    if (!res.ok) {
      console.error(`Supabase storage list failed (${res.status}) for bucket "${bucket}"`);
      return [];
    }

    const data = (await res.json()) as StorageObject[];
    if (!Array.isArray(data)) return [];

    // Folders come back with a null id; keep real image files only.
    return data.filter((o) => o?.id && IMAGE_RE.test(o.name));
  } catch (err) {
    console.error("Supabase storage list failed:", err);
    return [];
  }
}
