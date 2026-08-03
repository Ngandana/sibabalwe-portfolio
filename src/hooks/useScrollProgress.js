import { useEffect, useState } from 'react';

/** Scroll progress bar percentage + whether the page has scrolled past the nav threshold. */
export function useScrollProgress() {
  const [pct, setPct] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const p = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setPct(Math.min(p, 100));
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { pct, scrolled };
}
