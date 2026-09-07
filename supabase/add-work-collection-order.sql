-- A hand-picked order for a collection's "All" view.
--
-- `position` orders creatives INSIDE one brand, which is what a brand page
-- needs. The All view runs across brands, and there the best three pieces may
-- belong to three different clients — so it gets its own order, set by
-- dragging in the dashboard.
--
-- Null means "not placed by hand": those fall in after the placed ones, in the
-- old brand-then-position order, so adding this column changes nothing until
-- somebody actually drags something.
--
-- Run once in the website project's SQL editor. Safe to re-run.

alter table public.work_items
  add column if not exists collection_position integer;

comment on column public.work_items.collection_position is
  'Hand-picked order for the collection-wide All view. Null = fall back to brand order, then position.';

create index if not exists work_items_collection_position_idx
  on public.work_items (collection_position)
  where collection_position is not null;
