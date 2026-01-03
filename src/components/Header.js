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
          <div className="md:hidden flex items-center gap-3">
            <button
              id="mobile-menu-button"
              className="mobile-menu-button text-gray-700"
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
          </div>
          <div id="nav-content" className="desktop-nav overflow-x-auto scrollbar-hide">
            <ul className="flex flex-row space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 items-center min-w-max">
              <li className="flex-shrink-0">
                <a
                  href="#hero"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  Home
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#about"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  About
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#education"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  Education
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#experience"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  Experience
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#honors-awards"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  <span className="hidden sm:inline">Honors & Awards</span>
                  <span className="sm:hidden">Awards</span>
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#projects"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  Projects
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#skills"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  Skills
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="#contact"
                  className="px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/10 hover:text-accent transition-all duration-300 font-medium text-sm sm:text-base whitespace-nowrap text-gray-700"
                >
                  Contact
                </a>
              </li>
              <li className="flex-shrink-0">
                <a
                  href="/Sourav Kumar CV.pdf"
                  download
                  className="resume-button px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap"
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
              className="resume-button mt-4 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold flex items-center gap-2 justify-center"
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

