import { useEffect } from 'react';
import {
  setActiveNavSection,
  getPinnedActiveNavSection,
} from './useActiveSection';
import { readSectionScrollMarginPx } from '../constants/scrollNav';

/**
 * One passive scroll pipeline (rAF-batched): nav backdrop, progress bar, active section.
 * Section spy uses viewport rects so long sections (e.g. Contact) highlight correctly.
 */
export function usePageScroll(shellRef, progressRef, sectionIds) {
  useEffect(() => {
    const sections = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((entry) => entry.el);

    let rafId = null;
    let lastScrollTop = -1;
    let cachedMaxScroll = 0;
    let navScrolled = false;
    let activeId = sectionIds[0] || '';
    let sectionScrollMarginPx = readSectionScrollMarginPx(sections[0]?.el);

    const measureMaxScroll = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollHeight = Math.max(doc.scrollHeight, body?.scrollHeight ?? 0);
      cachedMaxScroll = Math.max(0, scrollHeight - window.innerHeight);
    };

    const refreshScrollMargin = () => {
      sectionScrollMarginPx = readSectionScrollMarginPx(sections[0]?.el);
    };

    const resolveActiveSection = (scrollTop) => {
      if (!sections.length) return activeId;

      const doc = document.documentElement;
      if (scrollTop + window.innerHeight >= doc.scrollHeight - 8) {
        return sections[sections.length - 1].id;
      }

      if (scrollTop < 80) {
        return sections[0].id;
      }

      const headerLine = sectionScrollMarginPx;

      // Section that contains the header anchor (fixes long sections e.g. Open To vs Contact)
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, el } = sections[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerLine + 2 && rect.bottom > headerLine + 2) {
          return id;
        }
      }

      // Fallback: last section whose top has passed the header line
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.getBoundingClientRect().top <= headerLine + 2) {
          return sections[i].id;
        }
      }

      return sections[0].id;
    };

    const apply = () => {
      rafId = null;
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollTop > cachedMaxScroll) {
        measureMaxScroll();
      }

      const shell = shellRef.current;
      if (shell) {
        const scrolled = scrollTop > 0;
        if (scrolled !== navScrolled) {
          navScrolled = scrolled;
          shell.classList.toggle('nav-is-scrolled', scrolled);
        }
      }

      if (scrollTop === lastScrollTop) {
        return;
      }
      lastScrollTop = scrollTop;

      const progress =
        cachedMaxScroll > 0
          ? Math.min(1, Math.max(0, scrollTop / cachedMaxScroll))
          : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const pinned = getPinnedActiveNavSection();
      const nextActive = pinned || resolveActiveSection(scrollTop);
      if (nextActive && nextActive !== activeId) {
        activeId = nextActive;
        setActiveNavSection(activeId);
      }
    };

    const schedule = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(apply);
      }
    };

    const onResize = () => {
      measureMaxScroll();
      refreshScrollMargin();
      lastScrollTop = -1;
      schedule();
    };

    measureMaxScroll();
    refreshScrollMargin();
    if (activeId) {
      setActiveNavSection(activeId);
    }
    apply();

    const forceNavSync = () => {
      lastScrollTop = -1;
      schedule();
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('load', onResize);
    window.addEventListener('portfolio:nav-sync', forceNavSync);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      window.removeEventListener('portfolio:nav-sync', forceNavSync);
    };
  }, [shellRef, progressRef, sectionIds]);
}
