import { useEffect, useRef, useState } from 'react';

/** Counts up from 0 to `target` once the ref scrolls into view (one-shot, matches old stat-card counters). */
export function useCountUp(target, suffix = '', dur = 1200) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(target != null ? target + suffix : null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || target == null) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const start = performance.now();
            function step(now) {
              const p = Math.min((now - start) / dur, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(ease * target) + suffix);
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix, dur]);

  return { ref, display };
}
