-- Outdoor and print work: two collections, each with its own deliverables.
--
-- Same shape as add-brand-identity.sql — one collection per medium, items
-- carrying a format — because the medium is what decides how the site draws
-- the piece. A hoarding is shown on a board against sky; a brochure is shown
-- as paper with a fold. Splitting those into separate collections per
-- deliverable would scatter one client's job across several pages.
--
-- The format vocabulary is deliberately the services Cirqle actually sells, so
-- a designer uploading work recognises the word from the job sheet rather than
-- having to translate.
--
-- Requires add-work-format.sql and add-brand-identity.sql to have been run
-- first. Run once in the website project's SQL editor. Safe to re-run.

-- Widen the format vocabulary. The constraint is replaced rather than added
-- to, so this file always states the complete list — one place to read.
alter table public.work_items drop constraint if exists work_items_format_check;
alter table public.work_items add constraint work_items_format_check
  check (format in (
    -- social media
    'post', 'reel', 'story',
    -- brand identity
    'logo', 'guidelines', 'brandbook', 'chart',
    -- outdoor
    'hoarding', 'banner', 'standee',
    -- print
    'poster', 'brochure', 'menu', 'packaging', 'stationery'
  ));

insert into public.work_collections (slug, eyebrow, title, description, seo_title, seo_description, position)
values (
  'outdoor',
  'Outdoor',
  'Hoardings and outdoor',
  'Roadside hoardings, flex banners and standees - work that has to land from across a street, read in seconds, and hold up at three metres wide.',
  'Hoarding & Outdoor Advertising Design | Cirqle',
  'Outdoor advertising design by Cirqle - roadside hoardings, flex banners and standees for businesses across Kerala and the Gulf.',
  30
)
on conflict (slug) do nothing;

insert into public.work_collections (slug, eyebrow, title, description, seo_title, seo_description, position)
values (
  'print',
  'Print',
  'Printed pieces',
  'Brochures, posters, menus, packaging and stationery - artwork made to survive a press, a fold and a customer''s hands.',
  'Print Design Portfolio | Brochures, Menus & Packaging | Cirqle',
  'Print design by Cirqle - brochures, posters, menus, product packaging and stationery, prepared for press and produced for businesses across Kerala and the Gulf.',
  40
)
on conflict (slug) do nothing;
