#!/usr/bin/env node
/**
 * One-off migration: push the portfolio images in ./seed/work into the
 * website Supabase project.
 *
 * Generates the same WebP renditions the admin app produces in the browser,
 * uploads them to the "work" bucket, then upserts the collection / brand /
 * item rows. Safe to re-run: rows are matched on their slugs and files are
 * overwritten in place.
 *
 * Usage:
 *   SUPABASE_URL=https://<ref>.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=<service role key> \
 *   node scripts/seed-portfolio.mjs [--dry-run]
 *
 * The service role key bypasses Row Level Security. Never put it in .env
 * (which Vite inlines into the browser bundle) — pass it on the command line
 * or export it in your shell for this one run.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const SEED_DIR = path.join(process.cwd(), "seed", "work");
const BUCKET = "work";

/** Rendition widths. Must stay in step with the admin app's uploader. */
const WIDTHS = [480, 960, 1600, 2000];
const WEBP_QUALITY = 82;

const SUPABASE_URL = (process.env.SUPABASE_URL ?? "").replace(/\/+$/, "");
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const DRY_RUN = process.argv.includes("--dry-run");
// By default the script never overwrites a row that already exists — editing
// done in cirqle-app must survive a re-run. --force restores the seed values.
const FORCE = process.argv.includes("--force");

// --dry-run processes the images and prints what would happen without
// contacting Supabase, so the pipeline can be checked before the project exists.
if (!DRY_RUN && (!SUPABASE_URL || !SERVICE_KEY)) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. See the header of this file.");
  console.error("Or pass --dry-run to check the image pipeline without uploading.");
  process.exit(1);
}

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

const CASE_FIXES = {
  iphone: "iPhone", ipad: "iPad", macbook: "MacBook", ai: "AI", ui: "UI", ux: "UX",
  fifa: "FIFA", uae: "UAE", ksa: "KSA", vat: "VAT", aed: "AED", "3d": "3D", tv: "TV",
  fc: "FC", ceo: "CEO", diy: "DIY", qr: "QR", eid: "Eid", ipl: "IPL", isl: "ISL",
  and: "and", of: "of", the: "the", with: "with", for: "for",
};

/** "03-happy-smile-day.jpg" → "Happy Smile Day" */
function titleFromFilename(file) {
  const base = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_ .]*/, "");
  return base
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w, i) => {
      const fix = CASE_FIXES[w.toLowerCase()];
      if (fix) return i === 0 ? fix[0].toUpperCase() + fix.slice(1) : fix;
      return w[0].toUpperCase() + w.slice(1);
    })
    .join(" ");
}

const slugify = (s) =>
  s.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ── Supabase helpers ────────────────────────────────────────────────────────
const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
};

async function rest(table, { method = "GET", query = "", body, prefer } = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Prefer: prefer ?? "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${table} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

async function upload(objectPath, buffer, contentType) {
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${objectPath}`,
    {
      method: "POST",
      headers: { ...headers, "Content-Type": contentType, "x-upsert": "true" },
      body: buffer,
    }
  );
  if (!res.ok) throw new Error(`upload ${objectPath} → ${res.status}: ${await res.text()}`);
}

/**
 * Insert `row`, or return the row already stored under the same unique key.
 *
 * Existing rows are left untouched unless --force: this script seeds a fresh
 * project, and a second run must not undo titles or ordering changed since.
 */
async function upsert(table, row, onConflict, match) {
  // A missing `match` would only blow up on a real run, long after the dry run
  // said everything was fine — fail loudly instead.
  if (!match || !Object.keys(match).length) {
    throw new Error(`upsert(${table}) called without a match key — this is a bug in the script`);
  }
  // In a dry run, hand back a stand-in so the walk can continue offline.
  if (DRY_RUN) return { ...row, id: `dry-${table}-${row.slug}`, existed: false };

  if (!FORCE) {
    const filter = Object.entries(match)
      .map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`)
      .join("&");
    const found = await rest(table, { query: `?${filter}&select=*&limit=1` });
    if (found?.length) return { ...found[0], existed: true };
  }

  const [saved] = await rest(table, {
    method: "POST",
    query: `?on_conflict=${onConflict}`,
    body: [row],
    prefer: "return=representation,resolution=merge-duplicates",
  });
  return { ...saved, existed: false };
}

// ── Image processing ────────────────────────────────────────────────────────
async function buildVariants(file, objectPrefix) {
  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) throw new Error(`Could not read dimensions of ${file}`);

  // Never upscale: keep the widths below the original, plus the original itself
  // (capped at the largest target so a huge export doesn't ship untouched).
  const targets = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, Math.max(...WIDTHS))])]
    .sort((a, b) => a - b);

  const variants = [];
  for (const w of targets) {
    const buf = await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
    const info = await sharp(buf).metadata();
    const objectPath = `${objectPrefix}-${w}.webp`;
    if (!DRY_RUN) await upload(objectPath, buf, "image/webp");
    variants.push({ width: info.width, height: info.height, path: objectPath, bytes: buf.length });
  }
  return { width, height, variants };
}

// ── Walk the seed folder ────────────────────────────────────────────────────
async function dirs(parent) {
  const entries = await readdir(parent, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

async function main() {
  await stat(SEED_DIR).catch(() => {
    throw new Error(`No seed folder at ${SEED_DIR}`);
  });

  let items = 0;
  let skipped = 0;

  for (const collectionSlug of await dirs(SEED_DIR)) {
    const collection = await upsert(
      "work_collections",
      { slug: collectionSlug, title: titleFromFilename(collectionSlug) },
      "slug",
      { slug: collectionSlug }
    );
    console.log(`\ncollection  ${collectionSlug}`);

    let brandPosition = 0;
    for (const brandSlug of await dirs(path.join(SEED_DIR, collectionSlug))) {
      const brandDir = path.join(SEED_DIR, collectionSlug, brandSlug);

      let info = {};
      try {
        info = JSON.parse(await readFile(path.join(brandDir, "_info.json"), "utf8"));
      } catch {
        // _info.json is optional
      }

      const files = (await readdir(brandDir)).filter((f) => IMAGE_RE.test(f)).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true })
      );
      if (!files.length) {
        console.log(`  brand     ${brandSlug} — no images, skipped`);
        skipped++;
        continue;
      }

      brandPosition += 10;
      const brand = await upsert(
        "work_brands",
        {
          collection_id: collection.id,
          slug: brandSlug,
          name: info.name?.trim() || titleFromFilename(brandSlug),
          tagline: info.tagline?.trim() || null,
          position: typeof info.order === "number" ? info.order : brandPosition,
        },
        "collection_id,slug",
        { collection_id: collection.id, slug: brandSlug }
      );
      console.log(`  brand     ${brand.name} (${files.length})`);

      let itemPosition = 0;
      for (const file of files) {
        itemPosition += 10;
        const slug = slugify(file);
        const { width, height, variants } = await buildVariants(
          path.join(brandDir, file),
          `${collectionSlug}/${brandSlug}/${slug}`
        );

        await upsert(
          "work_items",
          {
            brand_id: brand.id,
            slug,
            title: titleFromFilename(file),
            width,
            height,
            variants,
            published: true,
            position: itemPosition,
          },
          "brand_id,slug",
          { brand_id: brand.id, slug }
        );
        items++;
        const kb = Math.round(variants.reduce((n, v) => n + v.bytes, 0) / 1024);
        console.log(
          `    ${titleFromFilename(file).padEnd(34)} ${width}x${height}  ${variants.length} sizes  ${kb} KB`
        );
      }
    }
  }

  console.log(
    `\n${DRY_RUN ? "[dry run] would upload" : "Uploaded"} ${items} creatives.` +
      (skipped ? ` ${skipped} empty brand folder(s) skipped.` : "")
  );
}

main().catch((err) => {
  console.error(`\nFailed: ${err.message}`);
  process.exit(1);
});
