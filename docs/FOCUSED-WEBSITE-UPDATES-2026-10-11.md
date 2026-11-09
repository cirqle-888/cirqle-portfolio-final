# Focused updates to the existing Cirqle website

The prior studio redesign is archived at /tmp/cirqle-redesign-retained.tar.gz. The pre-redesign source snapshot restored the original homepage, services/about layout, desktop header and footer, while keeping the earlier audit fixes. Removed stock service hero images remain removed.

- /portfolio initially displays an immersive client presentation using existing published portfolio artwork. Select a client, step through their creatives, and open the existing project gallery. The background uses the same artwork with blur; the foreground retains the complete image without cropping.
- Browse all work links to /portfolio?view=gallery, preserving the original gallery layout and category navigation. Existing portfolio hash links open the gallery directly. A return link goes back to the presentation.
- Removed Namaskaram from About.
- Mobile navigation is a solid, minimal panel with brand logo, simple links, active-page indication, contact CTA and social links. Escape, focus trapping and focus restoration remain in place.
- Removed Download from the portfolio lightbox.
- Share uses the native share sheet when available. Cancellation leaves the viewer open. Otherwise it copies the creative deep link with confirmation; a selectable URL is offered when clipboard access fails.

Local preview: http://127.0.0.1:5176/portfolio . Nothing published to production.
