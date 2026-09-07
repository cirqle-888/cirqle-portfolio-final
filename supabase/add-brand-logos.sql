-- A logo for a brand, shown on the filter chips instead of its name.
--
-- Path inside the existing public `work` bucket, e.g.
--   social-media/cell-world/logo-480.webp
-- Null means the brand has no logo and the chip falls back to its name, which
-- is also what the logo's alt text says — the name is never lost, only hidden.
--
-- Run once in the website project's SQL editor. Safe to re-run.

alter table public.work_brands
  add column if not exists logo_path text;

comment on column public.work_brands.logo_path is
  'Storage path of the brand logo in the work bucket. Null = show the brand name instead.';
