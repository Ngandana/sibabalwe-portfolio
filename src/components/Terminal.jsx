import { useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

export default function Terminal() {
  const bodyRef = useRef(null);
  useTypewriter(bodyRef);

  return (
    <div className="hero-right" aria-hidden="true">
      <div className="terminal" role="img" aria-label="Terminal showing developer profile">
        <div className="terminal-bar">
          <span className="t-dot"></span>
          <span className="t-dot"></span>
          <span className="t-dot"></span>
          <span className="terminal-title">~/sibabalwe — portfolio.sh</span>
        </div>
        <div className="terminal-body" ref={bodyRef}></div>
      </div>
    </div>
  );
}
