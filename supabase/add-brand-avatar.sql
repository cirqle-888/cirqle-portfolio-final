-- A square mark per brand, for the account picture on social frames.
--
-- Separate from logo_path on purpose. That column holds the full lockup — an
-- emblem plus a wordmark, typically 480x170 — which is right for the filter
-- chips, where there is width to read it. Fitted into a 32px circle the whole
-- lockup scales to 32px WIDE, so the emblem lands at about eleven pixels and
-- the words vanish. A brand with no emblem at all (Elara Luxe is a pure
-- wordmark) cannot work as a circle in any crop.
--
-- Cropping the lockup automatically was the other option and was rejected: it
-- assumes every logo has a square emblem on one side, which is exactly the
-- case that is not true.
--
-- Falls back to the brand's initial, never to logo_path — an initial reads,
-- and a squeezed lockup does not.
--
-- Run once in the website project's SQL editor. Safe to re-run.

alter table public.work_brands
  add column if not exists avatar_path text;

comment on column public.work_brands.avatar_path is
  'Square mark shown as the account picture on social post frames. Distinct '
  'from logo_path, which is the wide lockup used on filter chips.';
