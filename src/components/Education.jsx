import { EDUCATION, CERTIFICATIONS } from '../data/educationData';

const DELAYS = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4'];

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="edu-heading">
      <div className="section-inner">
        <p className="section-eyebrow">Education & certifications</p>
        <h2 className="section-heading reveal" id="edu-heading">Always learning.</h2>
        <p className="section-sub reveal reveal-delay-1">Currently completing a Postgraduate Diploma at CPUT — built on a strong academic foundation, sharpened by self-directed study.</p>
        <div className="edu-grid" role="list" aria-label="Academic qualifications">
          {EDUCATION.map((edu, i) => (
            <article className={`edu-card reveal ${DELAYS[i] || ''}`} role="listitem" key={edu.degree}>
              <p className="edu-year">{edu.year}</p>
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-school">{edu.school}</p>
              <span className="edu-badge">{edu.badge}</span>
            </article>
          ))}
        </div>
        <p className="section-eyebrow" style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Certifications</p>
        <div className="certs-grid" role="list" aria-label="Professional certifications">
          {CERTIFICATIONS.map((cert, i) => (
            <div className={`cert-card reveal ${DELAYS[i] || ''}`} role="listitem" key={cert.name}>
              <div className="cert-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
              </div>
              <div>
                <p className="cert-name">{cert.name}</p>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
