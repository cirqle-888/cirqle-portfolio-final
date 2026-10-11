-- Apply in the WEBSITE project. Admin uploads use the backend service role.
-- Browser accounts cannot manage storage. All writes use the authorized backend.
drop policy if exists "team can write flyers" on storage.objects;
drop policy if exists "team can update flyers" on storage.objects;
drop policy if exists "team can delete flyers" on storage.objects;

