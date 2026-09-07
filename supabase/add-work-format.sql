-- Adds the "format" dimension to portfolio creatives.
--
-- Brands answer WHO the work was for; format answers WHAT SHAPE it is, so the
-- site can offer "All · Posts · Reels · Stories" alongside the brand chips and
-- one Roots Bahrain story is findable under both.
--
-- Run once in the website project's SQL editor. Safe to re-run.

alter table public.work_items
  add column if not exists format text not null default 'post';

do $$ begin
  alter table public.work_items add constraint work_items_format_check
    check (format in ('post', 'reel', 'story'));
exception when duplicate_object then null; end $$;

-- Backfill what can be inferred, so the filter is useful immediately:
--   anything that plays is a reel;
--   a tall still (9:16 and friends) is a story frame;
--   everything else stays a post.
-- Only rows still carrying the default are touched, so a later re-run cannot
-- undo a format someone set by hand in the dashboard.
update public.work_items
   set format = 'reel'
 where format = 'post'
   and kind in ('video', 'reel');

update public.work_items
   set format = 'story'
 where format = 'post'
   and kind = 'image'
   and width > 0
   and height::numeric / width::numeric >= 1.5;

create index if not exists work_items_format_idx on public.work_items (format);
