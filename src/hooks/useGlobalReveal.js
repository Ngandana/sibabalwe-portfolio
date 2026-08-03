import { useEffect } from 'react';

/** Global one-shot scroll-in animation for every `.reveal` element on the page. */
export function useGlobalReveal() {
  useEffect(() => {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));
    return () => revealObs.disconnect();
  }, []);
}
