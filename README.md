# Cirqle Marketing Website

Marketing site for [Cirqle](https://cirqle.work) — a creative design agency in Kerala, India.

## Stack

- **Vite 6 + React 18 + TypeScript** (React navigation with route-specific prerendered HTML, deployed on Vercel)
- **react-router-dom 7** for routing; Vercel serves generated clean URLs and a real `404.html`, without a blanket rewrite
- **motion** for entrance animations (kept light; `prefers-reduced-motion` is respected)
- **Supabase** (website-only project) holds everything that changes without a
  deploy: the portfolio and the weekly supermarket flyers. It is deliberately a
  different project from the one behind `cirqle-app`, so the key published in
  this site's JavaScript can never reach business data. Read-only from here;
  all writing happens in cirqle-app. See `supabase/README.md`.
  Without the env vars the portfolio is empty and the flyer gallery shows a
  placeholder — the site still builds and runs.
- **Formspree** powers the contact form; WhatsApp CTA links to `wa.me`.
- Styling preserves the existing design in `src/index.css`. Tailwind v4 now generates
  new utilities through the Vite plugin and `src/styles/utilities.css`.

## Develop

```bash
npm install
npm run dev        # http://localhost:5176
npm run build      # outputs prerendered dist/ and a generated sitemap
npm run check      # zero-warning lint + source typecheck
npm run check:static # validates metadata and compressed HTML after build
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

## Audit fixes and deployment

Build requires Chrome (auto-detected on macOS), `CHROME_PATH`, or Chromium installed with `npm run browser:install`. On CI/Vercel install Chromium before `npm run build` (for example build command `npx playwright install chromium && npm run build`). The build reads website environment configuration, discovers published collection/brand routes and fails if it cannot fetch the configured sitemap data. New collection/brand URLs require a rebuild for direct-link HTML; creative changes within existing pages still load at runtime.

Apply `supabase/restrict-flyer-storage-writes.sql` to the **website** project to revoke broad authenticated-account storage writes. Admin management continues through the authorized service-role backend. This migration has not been applied by the local build.

Unpublishing hides database rows; public object URLs remain accessible. For complete withdrawal remove the corresponding storage objects through authorized admin tooling after removing the published entries. Public buckets are for marketing assets only, never confidential drafts. No existing storage objects were deleted during this work.

Analytics now emits contact success/failure and WhatsApp click events containing no form details. A provider must still be configured separately; this change does not activate tracking. Verify Formspree's provider-side spam/rate-limit configuration separately.

Browser regression checks use mocked content and contact responses, never real submissions. Start the dev server with website configuration (test-safe example `VITE_SUPABASE_URL=https://website-fixture.invalid VITE_SUPABASE_ANON_KEY=fixture npm run dev`), then run `npm run check:browser`. Set `AUDIT_URL` if using another port and `CHROME_PATH` to select a browser. The source-controlled `public/sitemap.xml` is legacy; build replaces it with published route discovery.
