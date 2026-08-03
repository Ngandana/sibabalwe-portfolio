import { useCopyEmail } from '../hooks/useCopyEmail';

export default function Contact() {
  const copyEmail = useCopyEmail();

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="section-inner">
        <div className="contact-wrap">
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Get in touch</p>
          <h2 className="section-heading reveal" id="contact-heading">Let's build<br />something great.</h2>
          <p className="contact-sub reveal reveal-delay-1">
            Open to full-time roles, graduate programmes, and interesting projects. Based in Cape Town — remote-ready too.
          </p>
          <div className="contact-email-wrap reveal reveal-delay-2">
            <p className="contact-email-lbl">Primary contact</p>
            <a href="mailto:sibabalwengandana@gmail.com" className="contact-email-link">
              sibabalwengandana@gmail.com
            </a>
            <div>
              <button className="copy-email-btn" onClick={copyEmail} aria-label="Copy email address to clipboard">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                Copy email
              </button>
            </div>
          </div>
          <div className="contact-links-row reveal reveal-delay-3">
            <a href="tel:0781163465" className="contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.13 3.53 2 2 0 0 1 3.1 1.37h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.83a16 16 0 0 0 6.08 6.08l1.12-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" /></svg>
              078 116 3465
            </a>
            <a href="https://github.com/Ngandana" target="_blank" rel="noopener" className="contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              GitHub
            </a>
            <a href="mailto:sibabalwengandana@gmail.com" className="contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              Send email
            </a>
            <a href="https://www.google.com/maps/place/Woodstock,+Cape+Town" target="_blank" rel="noopener" className="contact-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Cape Town, ZA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
