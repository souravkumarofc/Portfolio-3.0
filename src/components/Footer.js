import React from 'react';
import EditorialBrandMark from './EditorialBrandMark';

const EMAIL = 'souravkumarjsr01@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/souravkumarofc/';
const GITHUB = 'https://github.com/souravkumarofc/';
const X_URL = 'https://x.com/souravkumarofc';

function FooterLandscape() {
  return (
    <svg
      className="footer-landscape-svg"
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="footerSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--footer-sky-top)" />
          <stop offset="100%" stopColor="var(--footer-sky-bottom)" />
        </linearGradient>
        <linearGradient id="footerPeak" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--footer-peak-light)" />
          <stop offset="100%" stopColor="var(--footer-peak-dark)" />
        </linearGradient>
      </defs>
      <rect width="1440" height="220" fill="url(#footerSky)" />
      <circle cx="1180" cy="52" r="36" fill="var(--footer-sun)" opacity="0.45" />
      <path
        d="M0 140 L200 95 L380 130 L520 70 L720 120 L900 55 L1100 110 L1280 80 L1440 125 L1440 220 L0 220 Z"
        fill="url(#footerPeak)"
        opacity="0.85"
      />
      <path
        d="M0 165 L240 120 L420 155 L600 100 L800 150 L1000 90 L1200 140 L1440 115 L1440 220 L0 220 Z"
        fill="var(--footer-peak-dark)"
        opacity="0.55"
      />
      <path
        d="M0 185 L1440 185 L1440 220 L0 220 Z"
        fill="var(--footer-water)"
        opacity="0.35"
      />
      <path
        d="M0 200 L120 198 L240 202 L360 196 L480 201 L600 197 L720 203 L840 198 L960 201 L1080 197 L1200 202 L1320 198 L1440 201"
        fill="none"
        stroke="var(--footer-water-line)"
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-landscape-wrap">
        <FooterLandscape />
      </div>
      <div className="footer-panel">
        <div className="footer-inner container mx-auto px-4">
          <div className="footer-top">
            <div className="footer-brand-block">
              <a href="#hero" className="footer-brand" aria-label="Sourav Kumar home">
                <EditorialBrandMark />
                <span className="footer-brand-name">Sourav Kumar</span>
              </a>
              <p className="footer-tagline">
                Software Developer · Full-Stack Engineer · AI Enthusiast
              </p>
            </div>
            <nav className="footer-links" aria-label="Footer">
              <a href={`mailto:${EMAIL}`}>Email</a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={X_URL} target="_blank" rel="noopener noreferrer">X</a>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>&copy; {year} Sourav Kumar. All rights reserved.</p>
            <p className="footer-location">Designed and built by Sourav Kumar · Bangalore, Karnataka, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
