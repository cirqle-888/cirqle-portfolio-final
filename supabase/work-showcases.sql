-- Independent editorial showcase. Apply to the WEBSITE Supabase project only.
-- No dependency on work_collections, work_brands or work_items.
create table if not exists public.work_showcases (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique,
 client_name text not null,
 category text not null default '',
 description text not null default '',
 media_type text not null default 'image' check (media_type in ('image','video')),
 media_url text not null check (media_url ~ '^https://'),
 poster_url text check (poster_url is null or poster_url ~ '^https://'),
 mobile_media_url text check (mobile_media_url is null or mobile_media_url ~ '^https://'),
 alt_text text not null,
 focal_x integer not null default 50 check (focal_x between 0 and 100),
 focal_y integer not null default 50 check (focal_y between 0 and 100),
 project_path text check (project_path is null or project_path ~ '^/portfolio([/?#]|$)'),
 position integer not null default 0,
 published boolean not null default false,
 created_at timestamptz not null default now(),
 check (media_type <> 'video' or poster_url is not null)
);
alter table public.work_showcases enable row level security;
revoke all on public.work_showcases from anon, authenticated;
grant select on public.work_showcases to anon, authenticated;
grant all on public.work_showcases to service_role;
drop policy if exists "published showcases are public" on public.work_showcases;
create policy "published showcases are public" on public.work_showcases for select to anon, authenticated using (published = true);
create index if not exists work_showcases_published_order on public.work_showcases(position,slug) where published = true;

-- Desktop uses media_type/media_url/poster_url/focal_x/focal_y above.
-- Optional mobile overrides allow portrait images OR a different mobile video.
-- Re-running this file also upgrades an existing showcase table.
alter table public.work_showcases
 add column if not exists mobile_media_type text check (mobile_media_type in ('image','video')),
 add column if not exists mobile_poster_url text check (mobile_poster_url is null or mobile_poster_url ~ '^https://'),
 add column if not exists mobile_focal_x integer check (mobile_focal_x between 0 and 100),
 add column if not exists mobile_focal_y integer check (mobile_focal_y between 0 and 100);
alter table public.work_showcases drop constraint if exists work_showcases_mobile_video_poster;
alter table public.work_showcases add constraint work_showcases_mobile_video_poster
 check (mobile_media_url is null or coalesce(mobile_media_type,media_type) <> 'video' or mobile_poster_url is not null or poster_url is not null);
