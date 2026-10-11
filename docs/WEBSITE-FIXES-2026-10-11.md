# Website audit fixes — 11 October 2026

Implemented in cirqle-website, preserving pre-existing gallery/reader changes.

- One Helmet-owned canonical/share metadata set per route; all detail-service routes now have unique metadata.
- Build prerenders published routes into HTML, generates the sitemap, and produces a noindex 404. Removed the blanket Vercel SPA rewrite so missing paths/assets receive normal platform 404 handling.
- Shared dialog focus containment, initial focus, background inert state and opener restoration for mobile navigation, work lightbox and Flyer reader. Closing a reader it put in fullscreen also exits fullscreen.
- Contact honeypot checked and serialized, field-error focus, bounded submission, announced success, consistent response-time copy and nonpersonal conversion events.
- Bounded public content requests, separate failure/empty states and Retry; collection/brand pages fetch only their requested content. Home/portfolio previews also expose Retry on failure.
- Portfolio text search and progressive display of 48 creatives, preserving the full lightbox/deep-link collection.
- Tailwind Vite generation added alongside legacy styling; ES2020 output target. All previous lint warnings resolved.
- Compatible dependency security updates; npm audit returned zero vulnerabilities.
- Database schema removes blanket authenticated Flyer storage writes; deployable migration supplied.

Validation: zero-warning lint and source typecheck passed. Chrome suite passed at 390px/1440px with mocked content/contact responses; tests cover metadata, overflow, dialog keyboard containment/restoration, validation, honeypot, submit success, pagination/search, recovery and Flyer closing. Static checks passed for 31 routes and 404, including matching gzip/Brotli HTML.

## Remaining live operations

This work has not deployed the website, applied database SQL, configured analytics or modified Formspree provider settings. Apply restrict-flyer-storage-writes.sql in the website Supabase project and deploy the built website. CI needs Playwright Chromium or CHROME_PATH (README has build instructions). Rebuild when adding new collection/brand URLs to generate direct-link pages and sitemap.

Public marketing bucket URLs remain public even after a row is unpublished. Fully withdrawing previously public artwork requires deleting its actual storage objects through authorized admin tooling. No existing customer artwork was deleted. Browser-side write revocation and public read access are distinct.

The new-feature ideas in the audit (CRM quote attachments, case studies, date/client Flyer metadata and content-health administration) are a separate product expansion, not unresolved code defects. They require their own data/workflow design; portfolio search and pagination were included here because they directly address the audited gallery limitations.
