# Cirqle website folder audit — 11 October 2026

Scope: cirqle-website only, current working tree including existing local changes. No application source fixes or deployment performed. This is a source and local-browser audit, not a live production database or Lighthouse assessment.

## Verification

- npm run build passed.
- npx tsc --noEmit -p tsconfig.app.json passed.
- npm run lint: zero errors, eight warnings.
- Local Chrome checked /, /services/brand-identity, /contact and an unknown route at 390px and 1440px. No horizontal overflow on those pages.
- Mobile menu keyboard test reproduced focus escaping the open dialog after repeated Tab presses.
- No contact submission sent. Live Supabase policies, provider-side spam controls and production response headers not verified.

## Findings in priority order

### P1 — Conflicting and incorrect canonical/OG metadata (confirmed)
index.html contains permanent homepage canonical and Open Graph tags. React Helmet adds its own tags without removing the static, unmanaged tags. Browser results: /contact has canonical https://cirqle.work/ AND https://cirqle.work/contact; /services/brand-identity retains only the homepage canonical and OG URL because that page only sets title/description. The same source omission exists in event-branding, ui-ux-design, marketing-pack and supermarket-campaign pages.

Use one metadata owner and supply a unique canonical, title, description and share image per route. Initial HTML should also be generated per route for share-preview clients that do not execute JavaScript. Current SPA HTML is shared by every URL.

Evidence: index.html; src/pages/Contact.tsx:12; src/pages/services/brand-identity.tsx:16.

### P1 — Storage write permissions do not distinguish staff from other authenticated users (schema confirmed; deployed impact conditional)
supabase/schema.sql:242–253 permits any authenticated account to insert/update/delete any object in the flyers bucket. There is no staff membership or ownership condition. If nonstaff accounts can be created or authenticated in this project, they gain those capabilities. Authentication configuration and deployed policies were not inspected.

Remove these browser write policies if all management is through the service-role backend, or restrict them to explicitly authorized staff. Verify signup and actual deployed policy state.

### P2 — Dialog keyboard focus is not contained (browser confirmed for mobile menu)
Header.tsx:94 moves focus to the first link and handles Escape, but neither traps Tab nor makes the background inert. Browser test reached a background portfolio link while the menu remained open. WorkLightbox.tsx:36 only handles Escape/arrows and scroll locking; it lacks initial focus, Tab containment and focus restoration. BrochureReader declares aria-modal but also lacks a complete focus management implementation.

Use a shared accessible dialog with initial focus, Tab/Shift+Tab containment, background isolation, accessible name and restoration to the opener.

### P2 — Contact form honeypot is disconnected (source confirmed)
ContactSection.tsx:182 renders _gotcha, but submit serializes only name, whatsapp, email, message and _subject at line 77. The trap value never reaches Formspree and is never checked locally. This particular spam defense is ineffective; provider-side defenses may still exist.

Serialize/check the trap, keep it outside the tab order, and verify server/provider rate limiting. Add request timeout and retry feedback: the current fetch has no timeout and can leave the submit state waiting indefinitely. Make success feedback announced and focus the first invalid field.

### P2 — Backend failures cannot be explicitly retried by the current subscriber
src/lib/work.ts:512–580 returns [] on errors and caches the failed promise for 30 seconds. useWork calls loadWork only once per mount; expiry alone does not retry or update an already mounted component. The UI merges empty/unconfigured/backend-failed cases. Flyer service likewise returns [] for all failures and has no request timeout.

Expose loading/empty/error separately, provide a Retry action, use bounded requests and allow explicit refresh to invalidate the cache.

### P2 — Unknown URLs render a soft 404 with homepage metadata
vercel.json rewrites all routes to /. App's NotFound supplies no route metadata or noindex. Local unknown route displayed Page not found but retained homepage title/canonical. Production HTTP status not tested; the configuration provides no true unknown-route 404 handling.

Return an HTTP 404 for unknown routes where possible and supply route-specific noindex metadata. Do not blanket-rewrite nonexistent assets as HTML.

### P3 — Conversion measurement is only a stub
src/lib/analytics.ts defines trackEvent but no other source calls it. index.html includes no analytics provider. Pageview wrapper exists, but quote submissions and WhatsApp/service CTA clicks are not measured in this folder's setup.

Record contact success, contact failure and CTA clicks with nonpersonal properties. Confirm consent/privacy requirements and provider configuration before enabling production tracking.

### P3 — Content loading and maintenance will become costly as portfolio grows
loadWork fetches every collection, brand and item on every fresh visit, even on a single-brand page. Lazy images help image downloads but do not limit JSON or DOM workload. sitemap.xml hardcodes launch-era brand URLs and is disconnected from the content database. CSS is a checked-in compiled Tailwind output with no generation pipeline, so new utility classes can silently have no styles. Build targets esnext despite TypeScript targeting ES2020.

Fetch scoped/paginated portfolio content, generate sitemap from published content, restore a reproducible CSS build and establish a tested browser support target.

### P3 — Unpublishing a row does not revoke public asset access
Table RLS hides unpublished rows, but work/flyers are public storage buckets. A previously known object URL remains readable after published=false. This is acceptable for permanently public marketing assets but is not access revocation. Use private storage or remove/move objects if withdrawal must revoke access.

## Existing strengths

Separate website content project; no business-data client in this folder. Published-row RLS and no public table-write policies in schema. Route-level lazy loading, responsive image variants, ErrorBoundary, skip link, image lazy loading and visible keyboard focus styles already exist. Portfolio supports brand/format filters, share links, video viewing and flyer booklets; these are existing features, not proposed additions.

## Features worth adding after the fixes

1. Structured quote brief: service, deadline, budget range and brief attachment; route submitted leads into the existing CRM through a server-side validated integration.
2. Case studies: challenge, work delivered and verified outcome, rather than only a creative gallery.
3. Portfolio text search and scoped pagination, retaining the existing brand/format filters and shareable URLs.
4. Service-aware WhatsApp/contact CTA carrying a short selected-service context without private data.
5. Flyer client/date filters and a clear current/archive distinction.
6. Content health checks for missing artwork, invalid external links and stale sitemap entries.

Suggested sequence: metadata and staff storage authorization; dialog/contact/recovery fixes; performance and regression coverage; then quote briefs and case studies. Browser smoke tests for route metadata, mobile-menu focus, contact validation and gallery close behavior would catch the reproduced regressions.
