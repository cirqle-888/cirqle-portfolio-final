# Seed archive

These are the portfolio images the site launched with. They are **not** read at
build time any more — the live portfolio lives in the website Supabase project
and is managed from cirqle-app (Dashboard → Portfolio).

This folder exists so the original files stay in version control and so the
migration can be re-run against a fresh project:

```bash
SUPABASE_URL=https://<ref>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/seed-portfolio.mjs
```

Layout the script expects:

```
seed/work/
  social-media/                  ← collection slug
    cell-world/                  ← brand slug
      _info.json                 ← optional: { "name", "tagline", "order" }
      01-eid-mubarak-iphone.jpg  ← file name becomes the title
```

The file name becomes the item title, with a leading number stripped and used
only for ordering: `03-happy-smile-day.jpg` → "Happy Smile Day". Folders with
no images are skipped.

**To add new work, use the admin in cirqle-app** rather than adding files here.
