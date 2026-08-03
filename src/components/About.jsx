import StatCard from './StatCard';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="section-inner">
        <p className="section-eyebrow">About me</p>
        <div className="about-grid">
          <div>
            <h2 className="section-heading reveal" id="about-heading">Solution-driven<br />by instinct.</h2>
            <div className="about-body reveal reveal-delay-1">
              <p>
                I'm a <strong>Full-Stack Software Engineering graduate</strong> from Cape Peninsula University of Technology, building out of Woodstock, Cape Town. My work spans the entire SDLC — requirements, architecture, implementation, deployment.
              </p>
              <p>
                I've shipped production software during internships at <strong>BIIC</strong> and <strong>Condor Green</strong> — transforming client briefs into real products, conducting feasibility assessments, and collaborating across disciplines.
              </p>
              <p>
                I care about code that's clean, systems that scale, and interfaces people actually enjoy using. Currently completing a <strong>Postgraduate Diploma</strong> at CPUT while continuing to build.
              </p>
            </div>
            <div className="about-stats reveal reveal-delay-2" aria-label="Key statistics">
              <StatCard target={2} suffix="+" label="Years internship experience" />
              <StatCard target={5} suffix="+" label="Production projects" />
              <StatCard staticValue="PGDip" label="ICT Applications Development" />
              <StatCard staticValue="ZA" label="Cape Town · Remote-ready" />
            </div>
          </div>
          <div className="about-info reveal reveal-delay-1">
            <div className="info-item">
              <div className="info-icon-wrap" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.13 3.53 2 2 0 0 1 3.1 1.37h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.83a16 16 0 0 0 6.08 6.08l1.12-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" /></svg>
              </div>
              <div>
                <p className="info-lbl">Phone</p>
                <p className="info-val"><a href="tel:0781163465">078 116 3465</a></p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-wrap" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <div>
                <p className="info-lbl">Email</p>
                <p className="info-val"><a href="mailto:sibabalwengandana@gmail.com" style={{ wordBreak: 'break-all' }}>sibabalwengandana@gmail.com</a></p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-wrap" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              </div>
              <div>
                <p className="info-lbl">GitHub</p>
                <p className="info-val"><a href="https://github.com/Ngandana" target="_blank" rel="noopener">github.com/Ngandana</a></p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-wrap" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <p className="info-lbl">Location</p>
                <p className="info-val">Woodstock, Cape Town, ZA</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-wrap" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <p className="info-lbl">Availability</p>
                <p className="info-val">
                  <span className="status-badge">
                    <span className="status-badge-dot" aria-hidden="true"></span>
                    Open to opportunities
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
