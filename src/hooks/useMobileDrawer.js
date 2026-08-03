import { useCallback, useState } from 'react';

export function useMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  return { isOpen, toggle, closeDrawer };
}
