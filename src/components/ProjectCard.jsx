import { Fragment } from 'react';
import { useTilt } from '../hooks/useTilt';
import { SHOT_URLS } from '../data/projectsData';

const arrowIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
);
const externalIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
);
const caseStudyIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
);

function ProjectNum({ num }) {
  return (
    <div className="project-num">
      <span>{num}</span>
      <div className="project-arrow" aria-hidden="true">{arrowIcon}</div>
    </div>
  );
}

function ProjectActions({ project, onOpenCase }) {
  return (
    <div className="project-actions">
      <span className={`deploy-badge ${project.badge.kind}`}>{project.badge.label}</span>
      {project.liveHref && (
        <a href={project.liveHref} target="_blank" rel="noopener" className="project-link-live" aria-label={project.liveLabel}>
          View Live {externalIcon}
        </a>
      )}
      <a href={project.githubHref} target="_blank" rel="noopener" className="project-link" aria-label={project.githubLabel}>
        GitHub {externalIcon}
      </a>
      <button
        className="project-link case-study-btn"
        data-case-study={project.id}
        aria-haspopup="dialog"
        onClick={(e) => onOpenCase(project.id, e.currentTarget)}
      >
        Case study {caseStudyIcon}
      </button>
    </div>
  );
}

export default function ProjectCard({ project, onOpenCase, onShotError, shotFailed }) {
  const tiltRef = useTilt();
  const hasShot = Boolean(project.shot);

  if (project.featured) {
    return (
      <article className="project-card featured reveal" aria-labelledby={`${project.id}-title`}>
        <div>
          <ProjectNum num={project.num} />
          <p className="project-type" style={{ marginTop: '.75rem' }}>{project.type}</p>
          <h3 className="project-title" id={`${project.id}-title`} style={{ margin: '.5rem 0 .75rem' }}>{project.title}</h3>
          <p className="project-desc">{project.desc}</p>
          <div className="project-stack" style={{ marginTop: '1rem' }}>
            {project.stack.map((s) => <span className="stack-tag" key={s}>{s}</span>)}
          </div>
        </div>
        <ProjectActions project={project} onOpenCase={onOpenCase} />
      </article>
    );
  }

  const Body = hasShot ? 'div' : Fragment;
  const bodyProps = hasShot ? { className: 'project-card-body' } : {};
  const delayClass = project.revealDelay ? ` reveal-delay-${project.revealDelay}` : '';

  return (
    <article ref={tiltRef} className={`project-card reveal${delayClass} tilt-card${hasShot ? ' has-shot' : ''}`} aria-labelledby={`${project.id}-title`}>
      {hasShot && (
        <div className={`project-shot-wrap${shotFailed ? ' shot-failed' : ''}`}>
          <img
            src={SHOT_URLS[project.shot]}
            alt={project.shotAlt}
            width="640"
            height="360"
            loading="lazy"
            onError={() => onShotError(project.shot)}
          />
        </div>
      )}
      <Body {...bodyProps}>
        <ProjectNum num={project.num} />
        <p className="project-type">{project.type}</p>
        <h3 className="project-title" id={`${project.id}-title`}>{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-stack">
          {project.stack.map((s) => <span className="stack-tag" key={s}>{s}</span>)}
        </div>
        <ProjectActions project={project} onOpenCase={onOpenCase} />
      </Body>
    </article>
  );
}
