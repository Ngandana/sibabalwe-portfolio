import { useNavScrollSpy } from '../hooks/useNavScrollSpy';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' }
];

export default function Nav({ scrolled, onOpenCommandPalette, onOpenChat, onToggleDrawer, drawerOpen }) {
  const activeId = useNavScrollSpy();

  return (
    <nav role="navigation" aria-label="Main navigation" className={scrolled ? 'scrolled' : ''}>
      <a href="#home" className="nav-logo" aria-label="Sibabalwe Ngandana — back to top">
        SN<span className="nav-logo-dot" aria-hidden="true"></span>
      </a>
      <ul className="nav-links" role="list">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} aria-current={activeId === l.href.slice(1) ? 'page' : undefined}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <span className="nav-status" aria-label="Open to opportunities">
          <span className="nav-status-dot" aria-hidden="true"></span>Available
        </span>
        <button id="cmd-trigger" className="cmd-trigger-btn" aria-label="Open command palette (press K)" title="Command palette ⌘K" onClick={onOpenCommandPalette}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <span className="cmd-kbd">⌘K</span>
        </button>
        <button className="nav-ai-btn" onClick={onOpenChat} aria-label="Ask the AI assistant about Sibabalwe">
          <svg className="nav-ai-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="7" x2="12" y2="3.4" />
            <circle className="ai-bot-antenna" cx="12" cy="2.6" r="1.3" fill="currentColor" stroke="none" />
            <rect x="4" y="7" width="16" height="13" rx="4.5" />
            <circle className="ai-bot-eye" cx="9" cy="13.2" r="1.35" fill="currentColor" stroke="none" />
            <circle className="ai-bot-eye ai-bot-eye-2" cx="15" cy="13.2" r="1.35" fill="currentColor" stroke="none" />
          </svg>
          Ask AI
        </button>
        <a href="#contact" className="nav-cta">Let's talk</a>
      </div>
      <button className="hamburger" aria-label="Open menu" aria-expanded={drawerOpen} aria-controls="mobile-drawer" onClick={onToggleDrawer}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
