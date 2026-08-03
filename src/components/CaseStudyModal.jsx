import { CASE_STUDIES } from '../data/caseStudies';
import { SHOT_URLS } from '../data/projectsData';

const closeIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);

export default function CaseStudyModal({ openId, onClose, boxRef, closeBtnRef, failedShots }) {
  const data = openId ? CASE_STUDIES[openId] : null;
  const showShot = data?.shot && !failedShots[data.shot];

  return (
    <div id="case-overlay" className={openId ? 'open' : ''} role="dialog" aria-modal="true" aria-labelledby="case-title" aria-hidden={!openId}>
      <div id="case-box" ref={boxRef}>
        <button id="case-close" aria-label="Close case study" ref={closeBtnRef} onClick={onClose}>
          {closeIcon}
        </button>
        {data && (
          <>
            <div className={`case-shot-wrap${showShot ? '' : ' hidden'}`}>
              {showShot && <img src={SHOT_URLS[data.shot]} alt={data.title} />}
            </div>
            <p className="project-type" id="case-type">{data.type}</p>
            <h3 className="section-heading" id="case-title" style={{ fontSize: '1.6rem', marginBottom: '.5rem' }}>{data.title}</h3>
            <div className="case-block"><h4>Problem</h4><p id="case-problem">{data.problem}</p></div>
            <div className="case-block"><h4>Approach</h4><p id="case-approach">{data.approach}</p></div>
            <div className="case-block">
              <h4>Impact</h4>
              <ul id="case-impact">{data.impact.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div className="project-stack" id="case-stack" style={{ marginTop: '1rem' }}>
              {data.stack.map((s) => <span className="stack-tag" key={s}>{s}</span>)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
