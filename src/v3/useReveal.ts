import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Sections rise into place the first time they are scrolled to. The selector is
// kept in step with the one in theme.css, which hides them before the observer
// runs so nothing flashes on first paint.
const SELECTOR =
  'section > .wrap > *, section > .wrap > .sec-head > *, .fbar .wrap > *, .grid > .wt, .strip > *, .incl > .inc, .steps > .step, .why > .card, .ab3 > *, .roles > .role, .ways > .way, .legal > div, .retail > *';

const HERO_DELAYS = [0, 200, 350, 450, 550];

export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('rv-on');
      return;
    }

    root.classList.add('rv-on');

    let cleanup: (() => void) | null = null;

    const frame = requestAnimationFrame(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      const firstSection = document.querySelector('section');

      elements.forEach((element) => {
        const parent = element.parentElement;
        const index = parent ? Array.prototype.indexOf.call(parent.children, element) : 0;
        if (firstSection && parent && parent.parentElement === firstSection) {
          element.style.transitionDelay = `${HERO_DELAYS[Math.min(index, HERO_DELAYS.length - 1)]}ms`;
        } else if (parent && !parent.classList.contains('wrap') && !parent.classList.contains('sec-head')) {
          element.style.transitionDelay = `${(index % 8) * 80}ms`;
        }
      });

      if (typeof IntersectionObserver === 'undefined') {
        elements.forEach((element) => element.classList.add('in'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -80px 0px', threshold: 0.05 },
      );

      elements.forEach((element) => observer.observe(element));
      cleanup = () => observer.disconnect();
    });

    return () => {
      cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [pathname]);
}
