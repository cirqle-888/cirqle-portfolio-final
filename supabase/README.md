# Website Supabase project

The marketing site reads all of its changeable content — portfolio work and the
weekly supermarket flyers — from a Supabase project **used only by the website**.

## Why a second project

`cirqle-app` runs on its own Supabase project holding payroll, finance,
cashbook, client and recruitment data. The marketing site is a public
single-page app, so whatever key it uses is readable by anyone who opens dev
tools. Pointing it at the app's project would mean the same key that fronts the
business data is published on the internet, with only Row Level Security
standing between a policy mistake and a leak.

A separate project removes that risk by construction. Everything in it is
already public, so the anon key exposes nothing. It also means a marketing hire
can be given access to website content without being given access to the
business.

The Supabase free tier covers two projects.

## Setup

**1. Create the project.** In the Supabase dashboard, create a new project —
`cirqle-website` is a good name. Pick the region closest to your visitors.

**2. Create the schema.** Open the SQL Editor, paste [`schema.sql`](schema.sql)
and run it. It creates the content tables, the read-only policies, and the
`work` and `flyers` storage buckets. It is safe to re-run.

**3. Point the site at it.** From the project's API settings, copy the URL and
the anon (publishable) key into `.env`, and into the Vercel project's
environment variables:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

Without these the portfolio is empty and the flyer gallery shows a placeholder.
Nothing breaks.

**4. Migrate the existing portfolio.** The 17 creatives currently in `seed/work`
go up in one command. The service role key bypasses Row Level Security, so pass
it on the command line rather than putting it in `.env` — Vite inlines `.env`
into the browser bundle.

```bash
SUPABASE_URL=https://<project-ref>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<service role key> node scripts/seed-portfolio.mjs
```

Add `--dry-run` first to see what it would do without uploading anything.

**5. Give cirqle-app write access.** The admin lives in the cirqle-app
dashboard under **Portfolio**. Add the same three values to that app's
environment, prefixed so they are clearly the website's:

```
WEBSITE_SUPABASE_URL=https://<project-ref>.supabase.co
WEBSITE_SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

These are server-side only and never reach the browser.

## Day-to-day

- **Portfolio work** — cirqle-app → Dashboard → Portfolio. Uploads are
  converted to WebP at four widths in the browser before they are sent, so
  large exports are safe to drop in.
- **Supermarket flyers** — Supabase dashboard → Storage → `flyers` → Upload.
  They appear on the site on the next page load, newest first.

Flyers are **not** resized for you, because Supabase image transformation is a
paid add-on. Export them around 1200–1600 px wide before uploading.

## What is in the project

| Table / bucket | Holds |
| --- | --- |
| `work_collections` | A gallery, e.g. `social-media` → `/portfolio/social-media` |
| `work_brands` | A client inside a collection → `/portfolio/social-media/cell-world` |
| `work_items` | One creative, with its rendition list in `variants` |
| `work` bucket | The portfolio image files |
| `flyers` bucket | Weekly supermarket flyers |

Writes are only possible with the service role key. The website's anon key can
read published rows and nothing else.
