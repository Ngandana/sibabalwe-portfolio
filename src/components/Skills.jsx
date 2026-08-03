import { PROFICIENCY, BENTO } from '../data/skillsData';
import { useInView } from '../hooks/useInView';
import GitHubStatsCard from './GitHubStatsCard';

export default function Skills() {
  const { ref: barsRef, inView } = useInView(0.3);

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading" ref={barsRef}>
      <div className="section-inner">
        <p className="section-eyebrow">Technical skills</p>
        <h2 className="section-heading reveal" id="skills-heading">Tools of the trade.</h2>
        <p className="section-sub reveal reveal-delay-1">Full-stack capability — from database schema to deployed UI.</p>
        <div className="skills-layout">
          <div className="skills-sidebar reveal">
            <div className="skill-group">
              <p className="skill-group-title">Proficiency</p>
              {PROFICIENCY.map((s) => (
                <div className="skill-bar-item" key={s.name}>
                  <div className="skill-bar-header">
                    <span className="skill-bar-name">{s.name}</span>
                    <span className="skill-bar-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: inView ? s.pct + '%' : '0%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bento reveal reveal-delay-1" role="list" aria-label="Skill categories">
            {BENTO.map((card) => (
              <div className={`bento-card${card.highlight ? ' highlight' : ''}${card.col2 ? ' col-2' : ''}`} role="listitem" key={card.title}>
                <p className="bento-label">{card.label}</p>
                <h3 className="bento-title">{card.title}</h3>
                <div className="bento-tags">
                  {card.tags.map((tag) => <span className="bento-tag" key={tag}>{tag}</span>)}
                </div>
              </div>
            ))}
            <GitHubStatsCard />
          </div>
        </div>
      </div>
    </section>
  );
}
