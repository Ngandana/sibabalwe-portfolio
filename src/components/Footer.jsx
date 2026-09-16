export default function Footer({ onOpenChat }) {
  return (
    <footer role="contentinfo">
      <p className="footer-left">© 2025 <span>Sibabalwe Ngandana</span></p>
      <p className="footer-right">
        Built with care ·{' '}
        <button className="footer-ai-link" onClick={onOpenChat}>ask my AI assistant</button>{' · '}
        <a href="https://github.com/Ngandana" target="_blank" rel="noopener">github.com/Ngandana</a>
      </p>
    </footer>
  );
}
