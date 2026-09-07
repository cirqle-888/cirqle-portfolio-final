-- Restore the collection's display copy.
-- The seed script overwrote `title` with a plain "Social Media"; this puts
-- back the heading the page was designed around. Safe to run once.
update public.work_collections
   set title = 'Social media creatives'
 where slug = 'social-media';
