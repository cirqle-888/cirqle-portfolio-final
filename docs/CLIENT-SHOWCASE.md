# Independent client showcase

The /portfolio presentation reads `public.work_showcases` in the website Supabase project. It has no relationship to the portfolio collections, brands or work-item tables. The existing gallery stays at `/portfolio?view=gallery`.

## Database setup pending

Apply `supabase/work-showcases.sql` to the website database. This session has public read credentials, not a database administration connection, so the migration has NOT been applied. Add rows using the Supabase table editor or an authorized backend. Public users can only read published rows; direct anonymous/authenticated writes are not allowed.

Each entry has:
- slug, client_name, category, description and alt_text
- media_type (`image` or `video`) and an HTTPS media_url
- poster_url (required for video), optional mobile_media_url for image art direction
- focal_x and focal_y from 0 to 100 for cover-image crop positioning
- optional project_path pointing within /portfolio
- position and published (defaults to false)

Use dedicated wide artwork (approximately 1920×1080 or larger) rather than a portrait social post. Media fills the frame using cover; focal position controls which area remains visible. A separate mobile image can preserve the composition on narrow screens. Keep important artwork away from the top control strip, left client list and bottom-right text region. Description is displayed as supplied.

Video requires an explicit play action and uses native controls. There is no autoplay, slide timer, count, previous or next button. Switching client unmounts the previous video. Mouse hover, keyboard focus and touch all select a client. All work opens the original gallery.

For local development only, `src/lib/showcase-preview.ts` contains independent sample records that reference existing public Cirqle artwork for layout review. They are not read from the gallery at runtime and are not production content. Production does not substitute those samples if the table is absent; it offers the existing gallery and retry. New dedicated media should replace the samples through the new table.

Verification covers full-frame media bounds, image fit, hover/focus/tap switching, no video autoplay, removal of slideshow controls, gallery access, mobile overflow and existing contact/share flows. Tests use mocked independent showcase records, not existing gallery data.

## Focus and responsive presentation revision

- Header logo reserves its width and uses its native 480:195 aspect ratio. Navigation switches to the compact menu below 1100px, preventing logo compression at tablet widths.
- Local preview now contains 12 published client names, independently snapshotted; it still does not query gallery records at runtime. New dedicated artwork should be supplied through the showcase table.
- Client list and project details have soft dark gradients, subtle edges and backdrop blur. Desktop client lists scroll when needed. Mobile uses a labelled native client selector with all entries.
- A 155svh desktop / 125svh mobile wrapper creates a brief natural sticky hold for the 100svh visual. Wheel, touch and keyboard scrolling remain native. Scrolling hides the global header; Navigation returns to the top, and keyboard focus reveals the header. Reduced motion removes the sticky hold.
- On presentation pages only, the standard footer and floating WhatsApp pill are replaced by a dedicated project-interest contact section. It includes service-prefilled contact links, email, back-to-work and legal links. Gallery and other pages retain the normal footer.

### Artwork preparation

Use separate compositions for desktop (1920×1080 or larger, landscape) and mobile (1080×1920, portrait). Supply the mobile image in mobile_media_url. Images fill the frame; focal_x/focal_y locate the important subject. Keep the central subject clear of the left client panel and bottom-right details on desktop. On mobile, leave roughly the top 20% and bottom 30% free of essential artwork because controls and details overlay those regions. Do not bake the website's title or controls into the artwork. Test the cover crop at both narrow/tall and wide/short sizes. Videos remain manual-play and require a poster.

## Glass panels, mobile picker and separate device media

Visible Selected work/Cirqle and Clients/count labels were removed. A visually hidden page heading remains for accessibility. Client/detail panels use 3px resting blur and 7px blur on hover or visible keyboard focus; resting backgrounds are more transparent. Mobile selection uses a styled menu with checked state, arrow/Home/End navigation, Escape, outside click, Tab dismissal and focus return after selection.

Database columns for the desktop version: `media_url`, `media_type`, `poster_url`, `focal_x`, `focal_y`.

Optional mobile version: `mobile_media_url`, `mobile_media_type`, `mobile_poster_url`, `mobile_focal_x`, `mobile_focal_y`. At widths up to 700px, a supplied mobile URL replaces the desktop media. The mobile type may be image or video independently of the desktop type. Null mobile type/crop/poster values inherit the desktop defaults. Missing mobile URL uses the desktop version. Switching size or client remounts the media so the old video stops; videos do not autoplay.

`supabase/work-showcases.sql` now includes idempotent ALTER statements to add these fields to an existing table, as well as initial table creation. The SQL has not been applied to a live database in this session.
