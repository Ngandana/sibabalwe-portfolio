const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact', accent: true }
];

export default function MobileDrawer({ isOpen, onClose }) {
  return (
    <nav id="mobile-drawer" className={`mobile-drawer${isOpen ? ' open' : ''}`} aria-label="Mobile navigation">
      {LINKS.map((l) => (
        <a href={l.href} key={l.href} style={l.accent ? { color: 'var(--amber)' } : undefined} onClick={onClose}>
          {l.label}
        </a>
      ))}
    </nav>
  );
}
