import React, { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { usePageScroll } from '../hooks/usePageScroll';
import ThemeToggle from './ThemeToggle';
import EditorialBrandMark from './EditorialBrandMark';

// Order matches page scroll order in App.js
const NAV_ITEMS = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#education', id: 'education', label: 'Education' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#honors-awards', id: 'honors-awards', label: 'Awards' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#expertise', id: 'expertise', label: 'Expertise' },
  { href: '#how-i-work', id: 'how-i-work', label: 'How I Work' },
  { href: '#open-to', id: 'open-to', label: 'Open To' },
  { href: '#contact', id: 'contact', label: 'Hire Me' },
];

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function Header({ isDark, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shellRef = useRef(null);
  const progressRef = useRef(null);
  useSmoothScroll();
  usePageScroll(shellRef, progressRef, NAV_SECTION_IDS);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  useEffect(() => {
    const handleLinkClick = () => {
      if (isMenuOpen) setTimeout(closeMenu, 100);
    };

    const links = document.querySelectorAll('#mobile-menu a[href^="#"]');
    links.forEach((link) => link.addEventListener('click', handleLinkClick));
    return () => links.forEach((link) => link.removeEventListener('click', handleLinkClick));
  }, [isMenuOpen]);

  return (
    <>
      <div ref={shellRef} className="editorial-nav-shell">
        <div className="editorial-nav-backdrop" aria-hidden="true" />
        <div className="editorial-nav-inner">
          <a href="#hero" className="editorial-brand" aria-label="Sourav Kumar home">
            <EditorialBrandMark />
            <span className="editorial-brand-name">Sourav Kumar</span>
          </a>

          <nav className="editorial-nav-pill" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                data-nav-section={item.id}
                className="editorial-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 pointer-events-auto">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <a
              href="/Sourav%20Kumar%20Resume.pdf"
              download="Sourav Kumar Resume.pdf"
              className="hidden md:inline-flex btn-editorial-secondary text-sm !py-2 !px-4"
            >
              <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              className="mobile-menu-button theme-toggle lg:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="editorial-scroll-track" aria-hidden="true">
          <div ref={progressRef} className="editorial-scroll-fill" />
        </div>
        <div className="editorial-nav-scrim" aria-hidden="true" />
      </div>

      <div
        id="mobile-menu-overlay"
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />
      <div id="mobile-menu" className={`off-canvas-menu ${isMenuOpen ? 'active' : ''}`}>
        <button type="button" className="close-menu-btn theme-toggle" onClick={closeMenu} aria-label="Close menu">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        <ul className="flex flex-col space-y-2 px-6 text-lg mt-12">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                data-nav-section={item.id}
                className="block py-2 editorial-nav-link !rounded-xl"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Sourav%20Kumar%20Resume.pdf"
              download="Sourav Kumar Resume.pdf"
              className="btn-editorial-primary mt-4 w-full"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
              Resume
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default React.memo(Header);
