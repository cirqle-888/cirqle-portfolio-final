-- Brand identity work: one collection page, mixed deliverables.
--
-- A brand identity job is not one fixed thing. Some clients get a logo and
-- nothing else, some get a full brandbook, some get a single brand chart. So
-- this is ONE collection whose items carry a type, rather than a page per
-- deliverable — a client's whole identity job stays together under their name
-- and the chips filter across all of them.
--
-- Requires add-work-format.sql to have been run first (it creates the format
-- column this widens). Run once in the website project's SQL editor. Safe to
-- re-run.

-- Widen the format vocabulary. The old constraint only allowed the social
-- media types, so it is replaced rather than added to.
alter table public.work_items drop constraint if exists work_items_format_check;
alter table public.work_items add constraint work_items_format_check
  check (format in (
    -- social media
    'post', 'reel', 'story',
    -- brand identity
    'logo', 'guidelines', 'brandbook', 'chart'
  ));

insert into public.work_collections (slug, eyebrow, title, description, seo_title, seo_description, position)
values (
  'brand-identity',
  'Brand Identity',
  'Brand identity work',
  'Logos, brand charts, guidelines and full brandbooks - the visual system a business is recognised by, built from the mark outwards.',
  'Brand Identity Portfolio | Logo Design & Brandbooks | Cirqle',
  'Real brand identity work by Cirqle - logo design, brand charts, colour and type systems, and complete brandbooks for businesses across Kerala and the Gulf.',
  20
)
on conflict (slug) do nothing;
