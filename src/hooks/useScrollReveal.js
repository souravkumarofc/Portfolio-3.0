import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    function revealOnScroll() {
      const reveals = document.querySelectorAll('section, .fade-in');
      const windowHeight = window.innerHeight;
      for (const el of reveals) {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
          el.classList.add('fade-in');
        }
      }
    }

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      window.removeEventListener('load', revealOnScroll);
    };
  }, []);
}

