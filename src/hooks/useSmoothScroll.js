import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link && link.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}

