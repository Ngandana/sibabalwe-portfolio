import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COMMANDS } from '../data/commandItems';

export function useCommandPalette(onCopyEmail) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);

  const groups = useMemo(() => {
    const q = query.toLowerCase().trim();
    return COMMANDS
      .map((group) => ({
        group: group.group,
        items: group.items.filter((it) => !q || it.name.toLowerCase().includes(q) || it.sub.toLowerCase().includes(q))
      }))
      .filter((g) => g.items.length);
  }, [query]);

  const flatItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const runItem = useCallback((item) => {
    setIsOpen(false);
    if (item.action === 'copy') { onCopyEmail?.(); return; }
    if (item.external) { window.open(item.href, '_blank', 'noopener'); return; }
    if (item.href) { window.location.href = item.href; }
  }, [onCopyEmail]);

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setActiveIdx(0);
    setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? close() : open();
        return;
      }
      if (!isOpen) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, flatItems.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); if (flatItems[activeIdx]) runItem(flatItems[activeIdx]); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, flatItems, activeIdx, open, close, runItem]);

  return { isOpen, open, close, query, setQuery, groups, activeIdx, setActiveIdx, runItem, inputRef };
}
