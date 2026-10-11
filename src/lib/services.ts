export const CONTACT_SERVICES = [
  { value: 'supermarket-campaign', label: 'Supermarket campaigns' },
  { value: 'brand-identity', label: 'Brand identity' },
  { value: 'event-branding', label: 'Event branding' },
  { value: 'ui-ux-design', label: 'UI/UX design' },
  { value: 'marketing-pack', label: 'Marketing pack' },
  { value: 'graphic-design', label: 'Graphic design' },
  { value: 'video-production', label: 'Video production' },
  { value: 'social-media', label: 'Social media' },
  { value: 'meta-ads', label: 'Meta ads' },
  { value: 'other', label: 'Other / help me choose' },
] as const;
export function validService(value: string | null) { return CONTACT_SERVICES.some(service => service.value === value) ? value || '' : ''; }
