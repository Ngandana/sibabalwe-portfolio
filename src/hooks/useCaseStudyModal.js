import { useCallback, useEffect, useRef, useState } from 'react';

/** Open/close state + ESC/click-outside dismissal + a manual Tab focus-trap for the case-study modal. */
export function useCaseStudyModal() {
  const [openId, setOpenId] = useState(null);
  const boxRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const open = useCallback((id, triggerEl) => {
    lastFocusedRef.current = triggerEl || document.activeElement;
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    setOpenId(null);
    lastFocusedRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!openId) return;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => { document.body.style.overflow = ''; };
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    function onKeyDown(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        const box = boxRef.current;
        if (!box) return;
        const focusables = box.querySelectorAll('button, a, [tabindex]');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openId, close]);

  return { openId, open, close, boxRef, closeBtnRef };
}
