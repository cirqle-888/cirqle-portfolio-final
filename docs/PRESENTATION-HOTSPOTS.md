# Clickable presentation artwork

Website + dashboard implementation, 13 October 2026.

## Enable
Run `supabase/work-showcase-hotspots.sql` in the **website** Supabase SQL editor. This additive migration gives existing presentations empty desktop/mobile lists, retaining their appearance and permissions. It has not been applied from this workspace. Deploy both updated applications after migration. Existing rows can still be read without the new field, but saving hotspots requires it.

## Author
In the Cirqle dashboard, Portfolio → Presentation → Edit → Clickable artwork:
1. Choose Desktop or Phone.
2. Draw outline: click 3–16 points in order around a poster, then Finish outline. Add rectangle provides a keyboard-editable alternative.
3. Select a published client gallery or collection; enter a short hover/accessibility label.
4. Adjust coordinates under “Adjust outline points precisely” as needed.
5. “Preview website crop” shows the current focal crop and approximate reserved interface areas.
6. Save the presentation using its existing draft/publish controls.

Each side supports up to eight areas. Phone positions are deliberately independent, including when it uses the same source image. An empty phone list means no phone hotspots. Recheck outlines after changing either artwork file. Original-image percentage coordinates follow CSS cover scaling and focal positioning through resizing. Keep markers clear of interface overlays and crop edges. An area whose centre has been cropped out is omitted from keyboard navigation.

Desktop hover and keyboard focus produce a purple/blue outline glow and label. The plus marker is a 44px tap target. Click/Enter opens the chosen gallery. No cutout upload is needed: the original artwork stays untouched. This first version supports still images; moving video is excluded to avoid fixed hit areas over changing content. Polygon edges follow the drawn shape; a dedicated alpha-mask/cutout upload is not included.

## Validation
- Dashboard TypeScript and targeted lint checks passed.
- 52 showcase/hotspot unit tests passed, including malicious paths, degenerate shapes and cover geometry.
- Website lint/type checks and 31-route build/static checks passed.
- Run `node scripts/check-hotspots.mjs` for focused mocked browser checks.
- Full existing browser suite currently stops at the pre-existing Home service-card incoming-animation assertion before reaching portfolio tests. No homepage code was changed for this feature.
- Live database save/publish cannot be verified until the migration is applied.

## Precision masks and exterior glow (13 October 2026)

Mask imports now sample up to 1600px and retain up to 256 points. The mask must have the same aspect ratio and full canvas as the artwork. Manual drawing/magic selection retains its existing 16-point interaction. Imported contours remain editable. Object URLs are released after import. Editor outlines have no tinted fill.

The public renderer separates the invisible hit shape from the visible edge. Edges render in screen-pixel units; an exterior-only SVG mask excludes the entire object interior after glow filtering. Colour presets and gradients remain supported.

The supplied 2752×1536 Elara mask matches the desktop artwork. Its 180-point bottle contour was saved to the website's Elara desktop presentation, with a soft gold edge and a link to the published brand-identity gallery. Mobile areas were preserved. No additional database migration is required; updated app/site code must be deployed together to support the extended point limit.

Validation: 50 tracing/mask/hotspot unit tests; website lint/type/build/static checks; general hotspot browser checks and a specific Elara pixel comparison showing no interior tint. The dashboard-wide TypeScript check and targeted hotspot lint pass.

## Client dissolve and minimal controls

Client hover uses a 130ms intent delay, cancelled on pointer leave; click and keyboard selection remain immediate. The previous decoded image/poster stays beneath the incoming layer throughout its 650ms dissolve. Cached images wait for painting before entering. Detached image decode callbacks cannot change readiness after another client has been selected.

The permanent desktop plus button is removed. Hover/focus reveals a compact label above the artwork rather than over its centre. Touch devices retain a small arrow cue with a 44px target. Hotspots use router links, preload gallery modules on intent and use the browser View Transition API for a short gallery dissolve when supported. Modified clicks/new tabs remain ordinary links, and reduced-motion preferences bypass animation.

Verified with `scripts/check-presentation-motion.mjs` and the general hotspot browser suite: held frame during loading and fade, intermediate opacity, cancelled incidental hover, hidden desktop marker, keyboard label, gallery navigation without document reload, and reduced motion.
