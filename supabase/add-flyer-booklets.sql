-- Lets consecutive flyer pages be read as one booklet.
--
-- The flyers table is a flat, ordered list of pages. Some campaigns are a
-- single sheet and some are a folded brochure, and nothing in the row said
-- which — the titles are raw camera filenames. This flag is set per page in
-- the dashboard: true means "this page continues the booklet above me", so a
-- run of flagged pages plus the page before them is one booklet.
--
-- Run once in the website project's SQL editor. Safe to re-run.

alter table public.flyers
  add column if not exists booklet_continues boolean not null default false;

comment on column public.flyers.booklet_continues is
  'True when this page belongs to the same booklet as the page before it (by position).';
