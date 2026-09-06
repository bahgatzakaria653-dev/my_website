/**
 * BAHGAT ZAKARIA — DATA ENGINEERING PORTFOLIO
 * Theme Engine (theme.js)
 * Supports Light & Dark mode, system preference sync, and localStorage persistence.
 */

(function () {
  'use strict';

  const THEME_KEY = 'bz_portfolio_theme';
  const THEME_ATTR = 'data-theme';
  const LIGHT = 'light';
  const DARK = 'dark';

  /**
   * Determine initial theme:
   * 1. Check saved localStorage preference.
   * 2. Otherwise inspect system color scheme (prefers-color-scheme: dark).
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === LIGHT || savedTheme === DARK) {
      return savedTheme;
    }
    return DARK;
  }

  /**
   * Apply theme to <html> and update toggle button ARIA states
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute(THEME_ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update toggle buttons if present
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const isDark = theme === DARK;
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute(THEME_ATTR) || LIGHT;
    const nextTheme = currentTheme === DARK ? LIGHT : DARK;
    applyTheme(nextTheme);
  }

  // Initialize theme immediately to prevent screen flash
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Bind event listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    // Listen for OS system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only react if the user hasn't explicitly set a preference in localStorage
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
  });

  // Export functions to global scope
  window.bzTheme = {
    get: () => document.documentElement.getAttribute(THEME_ATTR) || LIGHT,
    set: applyTheme,
    toggle: toggleTheme
  };
})();
