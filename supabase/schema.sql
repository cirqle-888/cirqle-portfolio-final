-- ===========================================================================
-- Cirqle website content - schema for the WEBSITE Supabase project.
--
-- Run this once, in the SQL Editor of the *website* project (not the project
-- that backs cirqle-app). It is safe to re-run.
--
-- What lives here: only content that is published on cirqle.work. Nothing in
-- this project is sensitive, which is the point - the anon key shipped in the
-- marketing site's JavaScript can only ever reach public marketing content.
--
--   work_collections  ->  /portfolio/:collection      (e.g. "social-media")
--   work_brands       ->  /portfolio/:collection/:brand
--   work_items        ->  one creative: image, hosted video, or linked reel
--   flyers            ->  weekly supermarket flyer pages, in page order
--   storage "work"    ->  portfolio images, video files and poster frames
--   storage "flyers"  ->  the flyer page images
-- ===========================================================================

-- -- Helper: keep updated_at honest ------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -- Collections -------------------------------------------------------------
create table if not exists public.work_collections (
  id              uuid primary key default gen_random_uuid(),
  slug            text        not null unique,
  eyebrow         text        not null default 'Portfolio',
  title           text        not null,
  description     text        not null default '',
  seo_title       text,
  seo_description text,
  position        integer     not null default 100,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint work_collections_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- -- Brands (one client within a collection) ---------------------------------
create table if not exists public.work_brands (
  id            uuid primary key default gen_random_uuid(),
  collection_id uuid        not null references public.work_collections(id) on delete cascade,
  slug          text        not null,
  name          text        not null,
  tagline       text,
  position      integer     not null default 100,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (collection_id, slug),
  constraint work_brands_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- -- Items (one creative) ----------------------------------------------------
-- `variants` holds the rendition list produced at upload time, e.g.
--   [{"width":480,"height":480,"path":"social-media/cell-world/ab12-480.webp","bytes":21544}, ...]
-- The widest entry is the one the lightbox and the download button use.
create table if not exists public.work_items (
  id         uuid primary key default gen_random_uuid(),
  brand_id   uuid        not null references public.work_brands(id) on delete cascade,
  slug       text        not null,
  title      text        not null,
  width      integer     not null check (width  > 0),
  height     integer     not null check (height > 0),
  variants   jsonb       not null default '[]'::jsonb,
  published  boolean     not null default true,
  position   integer     not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, slug),
  constraint work_items_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint work_items_variants_is_array check (jsonb_typeof(variants) = 'array')
);

-- -- Video and linked reels --------------------------------------------------
-- kind 'image'  -> a still; `variants` is the artwork.
--      'video'  -> an uploaded file at `media_path`; `variants` is the poster.
--      'reel'   -> hosted elsewhere; `external_url` is where it plays,
--                 `variants` is the thumbnail we show.
-- A 'video' may also carry `external_url`, so a viewer who watches it here can
-- still be sent to Instagram to like and share it.
alter table public.work_items add column if not exists kind text not null default 'image';
alter table public.work_items add column if not exists media_path text;
alter table public.work_items add column if not exists external_url text;
alter table public.work_items add column if not exists duration_seconds numeric;

do $$ begin
  alter table public.work_items add constraint work_items_kind_check
    check (kind in ('image', 'video', 'reel'));
exception when duplicate_object then null; end $$;

-- -- Format ------------------------------------------------------------------
-- Brands say WHO the work was for; format says WHAT SHAPE it is, so the site
-- can filter "All / Posts / Reels / Stories" across every brand at once.
-- See supabase/add-work-format.sql for the backfill applied to existing rows.
alter table public.work_items add column if not exists format text not null default 'post';
-- Hand-picked order for the collection-wide "All" view, where `position` (which
-- orders inside one brand) has nothing to say. Null = not placed by hand.
-- See supabase/add-work-collection-order.sql.
alter table public.work_items add column if not exists collection_position integer;


do $$ begin
  alter table public.work_items add constraint work_items_format_check
    check (format in (
      'post', 'reel', 'story',                        -- social media
      'logo', 'guidelines', 'brandbook', 'chart'      -- brand identity
    ));
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.work_items add constraint work_items_media_present
    check (
      (kind = 'image')
      or (kind = 'video' and media_path is not null)
      or (kind = 'reel'  and external_url is not null)
    );
exception when duplicate_object then null; end $$;

create index if not exists work_brands_collection_idx on public.work_brands (collection_id, position);
create index if not exists work_items_brand_idx       on public.work_items  (brand_id, position);
create index if not exists work_items_published_idx   on public.work_items  (published) where published;
create index if not exists work_items_format_idx      on public.work_items  (format);

drop trigger if exists work_collections_touch on public.work_collections;
create trigger work_collections_touch before update on public.work_collections
  for each row execute function public.touch_updated_at();

drop trigger if exists work_brands_touch on public.work_brands;
create trigger work_brands_touch before update on public.work_brands
  for each row execute function public.touch_updated_at();

drop trigger if exists work_items_touch on public.work_items;
create trigger work_items_touch before update on public.work_items
  for each row execute function public.touch_updated_at();

-- -- Supermarket flyers ------------------------------------------------------
-- One row per flyer page. The website flips through these like a printed
-- brochure, so `position` is page order - which is why this is a table and not
-- just a bucket listing: object storage has no reliable ordering.
create table if not exists public.flyers (
  id         uuid primary key default gen_random_uuid(),
  title      text        not null default '',
  width      integer     not null check (width  > 0),
  height     integer     not null check (height > 0),
  variants   jsonb       not null default '[]'::jsonb,
  published  boolean     not null default true,
  position   integer     not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint flyers_variants_is_array check (jsonb_typeof(variants) = 'array')
);

-- Pages that belong to the same folded brochure. See
-- supabase/add-flyer-booklets.sql — a run of pages flagged true, together with
-- the page before them, is one booklet on the site.
alter table public.flyers add column if not exists booklet_continues boolean not null default false;

create index if not exists flyers_position_idx on public.flyers (position) where published;

drop trigger if exists flyers_touch on public.flyers;
create trigger flyers_touch before update on public.flyers
  for each row execute function public.touch_updated_at();

-- -- Row Level Security ------------------------------------------------------
-- The public site reads with the anon key and may only ever SELECT.
-- Every write goes through cirqle-app using the service role key, which
-- bypasses RLS entirely - so there is deliberately no write policy here.
alter table public.work_collections enable row level security;
alter table public.work_brands      enable row level security;
alter table public.work_items       enable row level security;
alter table public.flyers           enable row level security;

drop policy if exists "collections are public" on public.work_collections;
create policy "collections are public"
  on public.work_collections for select to anon, authenticated using (true);

drop policy if exists "brands are public" on public.work_brands;
create policy "brands are public"
  on public.work_brands for select to anon, authenticated using (true);

-- Unpublished work is invisible to the website; the admin sees it via the
-- service role, which is not subject to this policy.
drop policy if exists "published items are public" on public.work_items;
create policy "published items are public"
  on public.work_items for select to anon, authenticated using (published);

drop policy if exists "published flyers are public" on public.flyers;
create policy "published flyers are public"
  on public.flyers for select to anon, authenticated using (published);

grant usage on schema public to anon, authenticated;
grant select on public.work_collections, public.work_brands, public.work_items, public.flyers
  to anon, authenticated;

-- -- Storage -----------------------------------------------------------------
-- "work"   - portfolio renditions, written by the admin, read by everyone.
-- "flyers" - weekly supermarket flyers, uploaded from the Supabase dashboard.
-- The work bucket also holds reel videos, so it allows video types and a
-- larger cap. Keep uploads short: Supabase's free tier includes 1 GB of
-- storage and 5 GB of egress a month, and video spends both quickly.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('work',   'work',   true, 52428800, array[
     'image/webp', 'image/jpeg', 'image/png', 'image/avif',
     'video/mp4', 'video/quicktime', 'video/webm']),
  ('flyers', 'flyers', true, 20971520, array['image/webp', 'image/jpeg', 'image/png', 'image/avif'])
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "work images are publicly readable" on storage.objects;
create policy "work images are publicly readable"
  on storage.objects for select to public
  using (bucket_id in ('work', 'flyers'));

-- Signed-in team members may manage flyers straight from the Supabase
-- dashboard. Portfolio images are written by cirqle-app's service role.
drop policy if exists "team can write flyers" on storage.objects;
create policy "team can write flyers"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'flyers');

drop policy if exists "team can update flyers" on storage.objects;
create policy "team can update flyers"
  on storage.objects for update to authenticated
  using (bucket_id = 'flyers') with check (bucket_id = 'flyers');

drop policy if exists "team can delete flyers" on storage.objects;
create policy "team can delete flyers"
  on storage.objects for delete to authenticated
  using (bucket_id = 'flyers');

-- -- Seed: the collections the site knows how to render ----------------------
insert into public.work_collections (slug, eyebrow, title, description, seo_title, seo_description, position)
values (
  'social-media',
  'Social Media',
  'Social media creatives',
  'Festival greetings, product launches, offers and reel thumbnails designed for brands across Kerala and the Gulf - each one built to stop the scroll.',
  'Social Media Creatives Portfolio | Instagram & Facebook Post Design | Cirqle',
  'Browse real social media creatives designed by Cirqle - Instagram posts, festival greetings, product launches and reel thumbnails for retail, food, automotive and lifestyle brands.',
  10
)
on conflict (slug) do nothing;
