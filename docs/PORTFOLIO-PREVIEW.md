# Portfolio studio preview

Branch: `preview/portfolio-studio`. No production deployment, database changes, or push to main.

Run `npm run dev` and open `/portfolio`. Uses the existing public website Supabase configuration and published work. No fixture brands or invented case-study results are shown.

## Review

- `/portfolio`: editorial opening, grouped client/category portfolios, category navigation, search, client filter, In context / Artwork views and progressive loading.
- `/portfolio/:collection`: collection browsing, same controls and existing shared-link compatibility.
- `/portfolio/:collection/:brand`: large project presentation, individual pieces, format filter, full-resolution media viewer, same-brand work in other categories and related clients.
- Existing supermarket flyer reader remains available on the portfolio.

## Presentations

CSS perspective, material-like borders, shadows, pearl spheres and faded rings surround the original images. Social posts, phone formats, branding, outdoor, standees, paper and packaging receive different treatments. These are illustrative studio scenes, not photographic installation evidence or interactive 3D models. The Artwork toggle removes the setting. Existing custom covers remain supported and are not placed inside a second mockup.

Fabric and browser scene styles are available for content with matching format/collection metadata. The current publishing dashboard/schema has not been expanded to create those formats; no unsupported database writes were made. Exact-location hoardings and physically accurate curtain folds need prepared photographic/3D assets. Upload those through the existing custom-cover workflow. A logo, flattened brand board or package dieline is not automatically reconstructed into separate 3D objects.

## Validation

Production build, TypeScript check, changed-file ESLint; desktop/mobile browser checks with published content. Search/reset, artwork toggle, navigation, viewer open/close, direct media URL reopening, legacy collection share links, and viewport overflow are checked. See the task for current results.

## Before publishing

Review the preview visually and choose the strongest covers in the existing Portfolio dashboard. This UI groups existing brand/category content into portfolio entries; it does not invent project objectives, outcomes, dates or commissions. A future case-study editor can add those as authored fields.

Unrelated extraction/restoration scripts already present in the working folder are excluded from this change.
