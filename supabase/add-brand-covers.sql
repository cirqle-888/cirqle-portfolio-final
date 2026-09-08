-- How a brand's card picks the picture it shows.
--
--   auto    — the first creative inside it, which is what happened before this
--             column existed and stays the default.
--   custom  — one chosen creative (cover_item_id), or an image uploaded just
--             for the card (cover_path). Whichever is set wins, upload first.
--   collage — several creatives laid out inside the card, for work that is
--             better understood as a set than as one image.
--
-- Run once in the website project's SQL editor. Safe to re-run.

alter table public.work_brands
  add column if not exists cover_mode text not null default 'auto',
  add column if not exists cover_item_id uuid,
  add column if not exists cover_path text;

do $$ begin
  alter table public.work_brands add constraint work_brands_cover_mode_check
    check (cover_mode in ('auto', 'custom', 'collage'));
exception when duplicate_object then null; end $$;

-- Deleting the chosen creative falls the card back to automatic rather than
-- leaving it pointing at a row that is gone.
do $$ begin
  alter table public.work_brands add constraint work_brands_cover_item_fkey
    foreign key (cover_item_id) references public.work_items(id) on delete set null;
exception when duplicate_object then null; end $$;

comment on column public.work_brands.cover_mode is
  'auto | custom | collage — how the brand card on the website chooses its picture.';
