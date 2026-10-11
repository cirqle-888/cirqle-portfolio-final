# Requested UI/UX updates

- Mobile orbit navigation replaced by a simple list with active-page state, service/work hints, quote CTA and social links. Escape, focus trapping/restoration and automatic close at desktop width remain supported.
- Contact form now offers a validated optional service selector. Service/product/highlight CTAs pass their service to /contact?service=...; selection is included in inquiries and WhatsApp context. Unknown service parameters are ignored.
- Shared control height, radii, button styling, readable primary-action colours, form fields, heading rhythm and light/dark surface tokens. Mobile contact padding scales with viewport width.

Validation: zero-warning lint, TypeScript, browser suite (including service prefill/submission, invalid service and dark form surface), 31-route build/static checks; mobile menu and contact screenshots inspected.

Stock image confirmation: the current local source still contains active Unsplash img tags on brand-identity.tsx, event-branding.tsx, ui-ux-design.tsx and marketing-pack.tsx. Those images were neither added nor removed in this update. This confirms local source usage, not the state of a separately deployed production build.

Website deployment was not performed.
