import Terminal from './Terminal';
import Antigravity from './Antigravity';
import { useReducedMotion } from '../hooks/useReducedMotion';

const TAGS = ['Java', 'Spring Boot', 'React.js', 'Node.js', 'PostgreSQL', 'Python', 'Vue.js', 'FastAPI'];

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" aria-labelledby="hero-heading">
      <div className="hero-canvas-wrap" aria-hidden="true">
        {!reducedMotion && (
          <Antigravity
            count={220}
            magnetRadius={6}
            ringRadius={7}
            waveSpeed={0.4}
            waveAmplitude={0.6}
            particleSize={1.1}
            lerpSpeed={0.05}
            color="#F5A623"
            autoAnimate={true}
            particleVariance={0.6}
            particleShape="sphere"
            fieldStrength={14}
          />
        )}
      </div>
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge" aria-label="Status: Cape Town — Open to work">
            <span className="hero-badge-dot" aria-hidden="true"></span>
            Cape Town · Open to work
          </div>
          <h1 className="hero-name" id="hero-heading">
            <span className="line"><span>Sibabalwe</span></span>
            <span className="line"><span className="accent">Ngandana</span></span>
          </h1>
          <p className="hero-desc">
            <strong>Full-Stack Software Developer</strong> — building efficient,
            real-world software from idea to deployment. Java, React, Node.js, PostgreSQL.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary" aria-label="View my projects">
              View Projects
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
            <a href="/Sibabalwe-Ngandana-CV.pdf" className="btn-ghost" download>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="M8 9l4 4 4-4" /><path d="M5 21h14" /></svg>
              Download CV
            </a>
            <a href="mailto:sibabalwengandana@gmail.com" className="btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              Get in touch
            </a>
          </div>
          <div className="hero-tags" aria-label="Key technologies">
            {TAGS.map((tag) => (
              <span className="hero-tag" key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hire-pulse" aria-live="polite">
            <span className="hire-ring" aria-hidden="true"></span>
            Currently available for full-time roles &amp; freelance projects
          </div>
        </div>
        <Terminal />
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line"></div>
        <span>scroll</span>
      </div>
    </section>
  );
}
