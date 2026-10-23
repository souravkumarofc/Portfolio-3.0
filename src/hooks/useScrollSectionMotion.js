import { useEffect } from 'react';

const SECTION_SELECTOR = 'section, footer';

/**
 * Lightweight section reveal — IntersectionObserver only (no scroll listeners, no blur).
 */
export function useScrollSectionMotion() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(SECTION_SELECTOR));
    if (!sections.length) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sections.forEach((section) => {
      section.classList.add('scroll-motion-section', 'motion-active');
    });

    if (prefersReducedMotion) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add('motion-active');
            el.classList.remove('motion-muted');
          } else {
            el.classList.remove('motion-active');
            el.classList.add('motion-muted');
          }
        });
      },
      {
        root: null,
        // Top margin accounts for fixed header so content hides sooner when scrolling up
        rootMargin: '-104px 0px -14% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}
