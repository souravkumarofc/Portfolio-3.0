import React, { useState, useEffect } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useSmoothScroll();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking on a link
  useEffect(() => {
    const handleLinkClick = () => {
      if (isMenuOpen) {
        setTimeout(() => setIsMenuOpen(false), 100);
      }
    };

    const links = document.querySelectorAll('#mobile-menu a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="w-full bg-white shadow-sm z-50 top-0 border-b border-gray-200 fixed">
        <nav className="container mx-auto flex flex-row justify-between items-center py-4 px-4 md:px-6">
          <div className="text-2xl font-playfair font-bold text-primary tracking-tight">
            Sourav Kumar
          </div>
          <button
            id="mobile-menu-button"
            className="md:hidden mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div id="nav-content" className="desktop-nav">
            <ul className="flex flex-row space-x-8 items-center">
              <li>
                <a
                  href="#hero"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  Education
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#honors-awards"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  Honors & Awards
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/Sourav Kumar CV.pdf"
                  download
                  className="px-6 py-3 bg-accent text-accent-foreground rounded-xl shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <i className="fa-solid fa-file-arrow-down"></i>
                  <span>Resume</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu-overlay"
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      ></div>
      <div id="mobile-menu" className={`off-canvas-menu ${isMenuOpen ? 'active' : ''}`}>
        <button
          id="close-menu-btn"
          className="close-menu-btn"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <ul className="flex flex-col space-y-4 px-6 text-xl">
          <li>
            <a
              href="#hero"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#education"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              Education
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#honors-awards"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              Honors & Awards
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block py-2 hover:text-accent transition-colors duration-300"
              onClick={closeMenu}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/Sourav Kumar CV.pdf"
              download
              className="mt-4 px-6 py-3 bg-accent text-accent-foreground rounded-xl shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2 justify-center"
            >
              <i className="fa-solid fa-file-arrow-down"></i>
              <span>Resume</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;

