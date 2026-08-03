import { useEffect } from 'react';

/** Custom cursor: lerp-follow the pointer, grow on hover over interactive elements, disabled on mobile. */
export function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    if (!cursor || !dot) return;

    const isMobile = window.matchMedia('(max-width:768px)').matches;
    if (isMobile) return;

    let mx = 0, my = 0, cx = 0, cy = 0;
    let raf;

    function onMouseMove(e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    }
    function animate() {
      cx += (mx - cx) * 0.14;
      cy += (my - cy) * 0.14;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      raf = requestAnimationFrame(animate);
    }
    function onMouseDown() { document.body.classList.add('cursor-click'); }
    function onMouseUp() { document.body.classList.remove('cursor-click'); }
    function onEnter() { document.body.classList.add('cursor-hover'); }
    function onLeave() { document.body.classList.remove('cursor-hover'); }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    raf = requestAnimationFrame(animate);

    const hoverEls = document.querySelectorAll('a,button,.bento-card,.project-card,.stat-card,.edu-card,.tl-card');
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}
