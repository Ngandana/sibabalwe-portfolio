import { useState } from 'react';
import { PROJECTS } from '../data/projectsData';
import ProjectCard from './ProjectCard';
import CaseStudyModal from './CaseStudyModal';
import { useCaseStudyModal } from '../hooks/useCaseStudyModal';

export default function Projects() {
  const { openId, open, close, boxRef, closeBtnRef } = useCaseStudyModal();
  const [failedShots, setFailedShots] = useState({});

  function handleShotError(shotKey) {
    setFailedShots((prev) => ({ ...prev, [shotKey]: true }));
  }

  return (
    <section id="projects" className="section" aria-labelledby="proj-heading">
      <div className="section-inner">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-heading reveal" id="proj-heading">Things I've built.</h2>
        <p className="section-sub reveal reveal-delay-1">End-to-end — from architecture decisions to deployed product.</p>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCase={open}
              onShotError={handleShotError}
              shotFailed={project.shot ? failedShots[project.shot] : false}
            />
          ))}
        </div>
      </div>
      <CaseStudyModal
        openId={openId}
        onClose={close}
        boxRef={boxRef}
        closeBtnRef={closeBtnRef}
        failedShots={failedShots}
      />
    </section>
  );
}
