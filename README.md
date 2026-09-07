# Cirqle Marketing Website

Marketing site for [Cirqle](https://cirqle.work) — a creative design agency in Kerala, India.

## Stack

- **Vite 6 + React 18 + TypeScript** (client-rendered SPA, deployed on Vercel)
- **react-router-dom 7** for routing; `vercel.json` rewrites all paths to `/`
- **motion** for entrance animations (kept light; `prefers-reduced-motion` is respected)
- **Supabase** (website-only project) holds everything that changes without a
  deploy: the portfolio and the weekly supermarket flyers. It is deliberately a
  different project from the one behind `cirqle-app`, so the key published in
  this site's JavaScript can never reach business data. Read-only from here;
  all writing happens in cirqle-app. See `supabase/README.md`.
  Without the env vars the portfolio is empty and the flyer gallery shows a
  placeholder — the site still builds and runs.
- **Formspree** powers the contact form; WhatsApp CTA links to `wa.me`.
- Styling is a checked-in compiled Tailwind v4 file (`src/index.css`) with
  hand-written utilities appended at the end. There is **no Tailwind build step** —
  new utility classes must already exist in that file, or be added by hand.

## Develop

```bash
npm install
npm run dev        # http://localhost:5176
npm run build      # outputs dist/
```

Environment (`.env`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, from the
**website** Supabase project. The anon key is public by design and limited by
Row Level Security to reading published content.

## Analytics

`src/lib/analytics.ts` forwards to `window.plausible` or `window.gtag` when
present. To activate analytics, add the provider's `<script>` tag to
`index.html` — no code changes needed.

## Pages

`/` home · `/services` (+ brand-identity, event-branding, ui-ux-design) ·
`/highlights/supermarket-campaign` (real flyer gallery) ·
`/products/marketing-pack` · `/portfolio` · `/portfolio/:collection` ·
`/portfolio/:collection/:brand` · `/about` · `/careers` · `/contact`
· `/privacy` · `/terms`

## Adding portfolio work

Use **cirqle-app → Dashboard → Portfolio**. Uploads are converted to WebP at
four widths in the browser, so a full-size export is fine to drop in. New work
is live on the next page load; no deploy.

`seed/work/` keeps the original launch images so the portfolio can be rebuilt
into a fresh Supabase project with `scripts/seed-portfolio.mjs`.
