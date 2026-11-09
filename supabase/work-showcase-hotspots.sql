-- Run in the WEBSITE Supabase project, not the ERP project.
-- Additive: existing presentations receive empty areas and render unchanged.
begin;
alter table public.work_showcases add column if not exists hotspots jsonb not null
 default '{"desktop":[],"mobile":[]}'::jsonb;
alter table public.work_showcases drop constraint if exists work_showcases_hotspots_shape;
alter table public.work_showcases add constraint work_showcases_hotspots_shape check (
 jsonb_typeof(hotspots) = 'object'
 and hotspots ? 'desktop' and hotspots ? 'mobile'
 and jsonb_typeof(hotspots->'desktop') = 'array'
 and jsonb_typeof(hotspots->'mobile') = 'array'
 and jsonb_array_length(hotspots->'desktop') <= 8
 and jsonb_array_length(hotspots->'mobile') <= 8
);
notify pgrst, 'reload schema';
commit;
