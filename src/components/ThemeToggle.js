import React from 'react';

const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="theme-toggle"
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
  </button>
);

export default ThemeToggle;
