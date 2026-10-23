const NAV_LINK_SELECTOR = '[data-nav-section]';

let pinnedNavSectionId = null;

export function setActiveNavSection(id) {
  if (!id) return;
  document.querySelectorAll(NAV_LINK_SELECTOR).forEach((el) => {
    el.classList.toggle('active', el.dataset.navSection === id);
  });
}

/** Keep nav highlight on target while smooth-scrolling (scroll spy won't override). */
export function pinActiveNavSection(id) {
  if (!id) return;
  pinnedNavSectionId = id;
  setActiveNavSection(id);
}

export function clearActiveNavSectionPin() {
  pinnedNavSectionId = null;
}

export function getPinnedActiveNavSection() {
  return pinnedNavSectionId;
}
