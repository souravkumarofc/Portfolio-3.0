import { useEffect } from 'react';
import {
  pinActiveNavSection,
  clearActiveNavSectionPin,
  setActiveNavSection,
} from './useActiveSection';
import { getSectionDocumentTop, readSectionScrollMarginPx } from '../constants/scrollNav';

const NAV_SECTION_IDS = new Set([
  'about',
  'education',
  'experience',
  'honors-awards',
  'projects',
  'expertise',
  'how-i-work',
  'open-to',
  'contact',
]);

function getCleanUrlPath() {
  const { pathname, search } = window.location;
  return `${pathname}${search}` || '/';
}

/** Keep the address bar at / with no #section fragment (scroll still targets sections). */
function clearUrlHash() {
  const clean = getCleanUrlPath();
  if (window.location.hash || window.location.href.includes('#')) {
    window.history.replaceState(null, '', clean);
  }
}

function scrollToHashTarget(hash, behavior = 'smooth') {
  if (!hash || hash === '#') return false;
  const target = document.querySelector(hash);
  if (!target) return false;

  const margin = readSectionScrollMarginPx(target);
  const top = getSectionDocumentTop(target) - margin;

  window.scrollTo({ top: Math.max(0, top), behavior });
  clearUrlHash();

  const id = hash.replace('#', '');
  if (NAV_SECTION_IDS.has(id)) {
    pinActiveNavSection(id);

    const releasePin = () => {
      clearActiveNavSectionPin();
      setActiveNavSection(id);
      window.dispatchEvent(new Event('portfolio:nav-sync'));
    };

    if (behavior === 'smooth' && 'onscrollend' in window) {
      window.addEventListener('scrollend', releasePin, { once: true });
    } else if (behavior === 'smooth') {
      window.setTimeout(releasePin, 750);
    } else {
      releasePin();
    }
  }
  return true;
}

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      scrollToHashTarget(href);
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToHashTarget(hash, 'auto');
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHashTarget(window.location.hash, 'auto');
      });
    } else {
      clearUrlHash();
    }

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
}
