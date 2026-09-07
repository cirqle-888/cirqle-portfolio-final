-- What a creative is CALLED on the website, as opposed to what its file was
-- called.
--
-- `title` is set from the uploaded file name, which is how tiles ended up
-- announcing themselves as "WhatsApp Image 2026 07 28 At 11.34.18 PM". That
-- name is still useful in the dashboard for finding the thing again, so it
-- stays; the caption is what the public sees, and only when it is filled in.
-- Empty caption = the tile shows the brand alone.
--
-- Run once in the website project's SQL editor. Safe to re-run.

alter table public.work_items
  add column if not exists caption text;

comment on column public.work_items.caption is
  'Shown under a tile on the website. Null or empty = show nothing; the file-derived title is never public.';
