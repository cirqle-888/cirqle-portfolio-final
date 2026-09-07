-- ═══════════════════════════════════════════════════════════════════════════
-- Cirqle website content — schema for the WEBSITE Supabase project.
--
-- Run this once, in the SQL Editor of the *website* project (not the project
-- that backs cirqle-app). It is safe to re-run.
--
-- What lives here: only content that is published on cirqle.work. Nothing in
-- this project is sensitive, which is the point — the anon key shipped in the
-- marketing site's JavaScript can only ever reach public marketing content.
--
--   work_collections  →  /portfolio/:collection      (e.g. "social-media")
--   work_brands       →  /portfolio/:collection/:brand
--   work_items        →  one creative
--   storage "work"    →  the image files themselves
--   storage "flyers"  →  weekly supermarket flyers
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Helper: keep updated_at honest ──────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Collections ─────────────────────────────────────────────────────────────
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

-- ── Brands (one client within a collection) ─────────────────────────────────
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

-- ── Items (one creative) ────────────────────────────────────────────────────
-- `variants` holds the rendition list produced at upload time, e.g.
--   [{"width":480,"height":480,"path":"social-media/cell-world/ab12-480.webp","bytes":21544}, …]
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

create index if not exists work_brands_collection_idx on public.work_brands (collection_id, position);
create index if not exists work_items_brand_idx       on public.work_items  (brand_id, position);
create index if not exists work_items_published_idx   on public.work_items  (published) where published;

drop trigger if exists work_collections_touch on public.work_collections;
create trigger work_collections_touch before update on public.work_collections
  for each row execute function public.touch_updated_at();

drop trigger if exists work_brands_touch on public.work_brands;
create trigger work_brands_touch before update on public.work_brands
  for each row execute function public.touch_updated_at();

drop trigger if exists work_items_touch on public.work_items;
create trigger work_items_touch before update on public.work_items
  for each row execute function public.touch_updated_at();

-- ── Row Level Security ──────────────────────────────────────────────────────
-- The public site reads with the anon key and may only ever SELECT.
-- Every write goes through cirqle-app using the service role key, which
-- bypasses RLS entirely — so there is deliberately no write policy here.
alter table public.work_collections enable row level security;
alter table public.work_brands      enable row level security;
alter table public.work_items       enable row level security;

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

grant usage on schema public to anon, authenticated;
grant select on public.work_collections, public.work_brands, public.work_items to anon, authenticated;

-- ── Storage ─────────────────────────────────────────────────────────────────
-- "work"   — portfolio renditions, written by the admin, read by everyone.
-- "flyers" — weekly supermarket flyers, uploaded from the Supabase dashboard.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('work',   'work',   true, 20971520, array['image/webp', 'image/jpeg', 'image/png', 'image/avif']),
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

-- ── Seed: the collections the site knows how to render ──────────────────────
insert into public.work_collections (slug, eyebrow, title, description, seo_title, seo_description, position)
values (
  'social-media',
  'Social Media',
  'Social media creatives',
  'Festival greetings, product launches, offers and reel thumbnails designed for brands across Kerala and the Gulf — each one built to stop the scroll.',
  'Social Media Creatives Portfolio | Instagram & Facebook Post Design | Cirqle',
  'Browse real social media creatives designed by Cirqle — Instagram posts, festival greetings, product launches and reel thumbnails for retail, food, automotive and lifestyle brands.',
  10
)
on conflict (slug) do nothing;
