# Cirqle Marketing Website

Marketing site for [Cirqle](https://cirqle.work) — a creative design agency in Kerala, India.

## Stack

- **Vite 6 + React 18 + TypeScript** (client-rendered SPA, deployed on Vercel)
- **react-router-dom 7** for routing; `vercel.json` rewrites all paths to `/`
- **motion** for entrance animations (kept light; `prefers-reduced-motion` is respected)
- **Contentful** (optional CMS) — only two content types exist in the space:
  `supermarketFlyers` (array of flyer image assets, shown in the flyer gallery)
  and `portfolio`. All other page copy is hardcoded in the components.
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

Environment (`.env`): `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ACCESS_TOKEN`
(read-only Content Delivery API token; baked into the client bundle by design).
Without them the flyer gallery falls back to a placeholder image.

## Analytics

`src/lib/analytics.ts` forwards to `window.plausible` or `window.gtag` when
present. To activate analytics, add the provider's `<script>` tag to
`index.html` — no code changes needed.

## Pages

`/` home · `/services` (+ brand-identity, event-branding, ui-ux-design) ·
`/highlights/supermarket-campaign` (real flyer gallery) ·
`/products/marketing-pack` · `/portfolio` · `/about` · `/careers` · `/contact`
· `/privacy` · `/terms`
