import { useEffect, useState } from 'react';

/** Tracks which section[id] is currently in view, for nav-link aria-current highlighting. */
export function useNavScrollSpy() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return activeId;
}
