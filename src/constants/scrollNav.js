/** Must match `section { scroll-margin-top }` in index.css (7.5rem). */
export const SECTION_SCROLL_MARGIN_PX = 120;

export function readSectionScrollMarginPx(element) {
  if (!element) return SECTION_SCROLL_MARGIN_PX;
  const value = parseFloat(getComputedStyle(element).scrollMarginTop);
  return Number.isFinite(value) ? value : SECTION_SCROLL_MARGIN_PX;
}

export function getSectionDocumentTop(element) {
  return element.getBoundingClientRect().top + window.scrollY;
}
