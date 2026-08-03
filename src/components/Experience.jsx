import { EXPERIENCE } from '../data/experienceData';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="exp-heading">
      <div className="section-inner">
        <p className="section-eyebrow">Work experience</p>
        <h2 className="section-heading reveal" id="exp-heading">Where I've worked.</h2>
        <p className="section-sub reveal reveal-delay-1">Two internships — real production environments, real delivery.</p>
        <div className="timeline" role="list">
          {EXPERIENCE.map((exp, i) => (
            <article className={`tl-item reveal${i > 0 ? ' reveal-delay-1' : ''}`} role="listitem" aria-labelledby={exp.id} key={exp.id}>
              <div className="tl-dot-wrap"><div className="tl-dot" aria-hidden="true"></div></div>
              <div className="tl-card">
                <div className="tl-head">
                  <h3 className="tl-role" id={exp.id}>{exp.role}</h3>
                  <span className="tl-period">{exp.period}</span>
                </div>
                <p className="tl-company">{exp.company}</p>
                <ul className="tl-bullets" aria-label="Responsibilities">
                  {exp.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>
                <div className="tl-skills" aria-label="Technologies used">
                  {exp.skills.map((s) => <span className="tl-skill" key={s}>{s}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
