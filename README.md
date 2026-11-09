# Cirqle Website — v3

The cirqle.work marketing site rebuilt around the v3 design: one light system,
three divisions (Creative, Digital, Accounts & Compliance) and the tagline
"One Cirqle. Many Possibilities."

This is a copy of `cirqle-website`. The original folder is untouched.

## Run it

```bash
npm install        # only if node_modules is missing or stale
npm run dev        # http://localhost:5176
npm run build      # prerendered dist/ plus a sitemap
npm run check      # lint with zero warnings + typecheck
```

`node_modules` was copied from `cirqle-website`, so `npm run dev` should work
straight away on macOS. If anything looks off, delete it and run `npm install`.

## What changed from the old site

| | Old | v3 |
|---|---|---|
| Design | Gradient-led, dark/light toggle | One light system: `#F7F6FB`, ink `#16132A`, accent `#7C5CFF` |
| Structure | Services with three detail pages | Three divisions, each with its own page |
| Portfolio route | `/portfolio` | `/work` (the old path still resolves) |
| Header | Solid bar | Liquid-glass pill, full-screen menu with service icons |
| Motion | Per-section `motion` components | One CSS reveal driven by `useReveal` |

## Layout

```
src/v3/
  theme.css      the whole design system; nothing else defines colour or type
  data.ts        divisions, services, artwork paths, contact details
  icons.tsx      line icons, one per service
  Header.tsx     glass bar + full-screen menu
  Footer.tsx
  Vibes.tsx      the three division panels and the Retail Offers band
  useReveal.ts   sections rise into place on first scroll
  pages/         Home, Services, Work, Division, About, Contact, Careers, Legal

src/lib/         unchanged — Supabase reads, showcase, analytics
src/_legacy/     the old pages and sections, kept for reference only.
                 Excluded from tsconfig and never imported.
```

## Where the content comes from

- **Portfolio work and the Work page presentation** — the website Supabase
  project, through `src/lib/work.ts` and `src/lib/showcase.ts`. Publish from
  cirqle-app → Dashboard → Portfolio; nothing here needs a deploy.
- **Division, service and step copy** — `src/v3/data.ts`.
- **Panel artwork** — `public/v3/`. The Al Madina offer pages were rendered
  from `cirqle-print/output/pdf`; the rest came from the Instagram kit.
- **Contact form** — the same Formspree form the old site used.
- **Careers** — applications go to `app.cirqle.work/careers/apply`.

A collection maps to a division in `COLLECTION_DIVISION` (`data.ts`):
`brand-identity → creative`, `social-media → digital`. Add a rung there when a
new collection appears, or the work lands under Creative by default.

## Still to do

- Accounts has no published work, so its page falls back to three result cards.
- Privacy and Terms are drafts written for this build. Have them checked before
  they go live.
- `scripts/check-*.mjs` still target the old presentation markup.
