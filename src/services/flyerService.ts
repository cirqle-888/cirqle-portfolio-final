/**
 * Supermarket flyer images, served from Supabase Storage.
 *
 * Replaces the previous Contentful integration: the team already runs a
 * Supabase project for cirqle-app, so flyers are uploaded to a public bucket
 * from the Supabase dashboard (or the app) and appear here on next load —
 * no CMS, no second vendor, no deploy.
 *
 * See supabase/README.md for the bucket and policy setup.
 */
import { listBucketImages, publicUrl, isSupabaseConfigured } from "../lib/supabase";

const FLYERS_BUCKET = import.meta.env.VITE_SUPABASE_FLYERS_BUCKET ?? "flyers";
const FLYERS_FOLDER = import.meta.env.VITE_SUPABASE_FLYERS_FOLDER ?? "";

export { isSupabaseConfigured };

/**
 * Public URLs of every supermarket flyer, newest first.
 * Returns [] when Supabase is not configured or the bucket is empty, so the
 * caller keeps its placeholder.
 */
export async function getSupermarketFlyers(): Promise<string[]> {
  const files = await listBucketImages(FLYERS_BUCKET, { folder: FLYERS_FOLDER, limit: 200 });
  return files.map((file) =>
    publicUrl(FLYERS_BUCKET, FLYERS_FOLDER ? `${FLYERS_FOLDER}/${file.name}` : file.name)
  );
}
