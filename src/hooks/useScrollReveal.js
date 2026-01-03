import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    // Use IntersectionObserver for better performance (no scroll event needed)
    const reveals = document.querySelectorAll('section, .fade-in');
    
    // Use IntersectionObserver API for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation 100px before element enters viewport
      }
    );

    // Observe all reveal elements
    reveals.forEach((el) => {
      // Only observe if not already revealed
      if (!el.classList.contains('fade-in')) {
        observer.observe(el);
      }
    });

    // Initial check for elements already in viewport
    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('fade-in');
        observer.unobserve(el);
      }
    });

    return () => {
      // Cleanup: unobserve all elements
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

