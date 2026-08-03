import { useEffect, useRef } from 'react';

/** 3D mouse-tilt effect for project cards, disabled on mobile. */
export function useTilt() {
  const ref = useRef(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const isMobile = window.matchMedia('(max-width:768px)').matches;
    if (isMobile) return;

    function onMove(e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    }
    function onLeave() { card.style.transform = ''; }

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
}
