// Compiles the AI assistant's knowledge base (used as the Gemini system instruction).
//
// Most sections are imported live from src/data/*.js so the assistant's
// knowledge can't silently drift out of sync with the site's real content —
// edit those files and this file's output updates automatically.
//
// The two blocks below are hand-maintained because their source lives in
// .jsx files with JSX (projectsData.jsx has JSX <strong> tags in `desc`,
// which this plain Node module can't import without a JSX transform):
//   - IDENTITY: short bio/contact/availability, mirrors src/components/About.jsx + Hero.jsx
//   - PROJECT_META: per-project status/links, mirrors the non-JSX fields in src/data/projectsData.jsx
// If you add/remove a project or change its live status, update PROJECT_META too.

import { CASE_STUDIES } from '../../src/data/caseStudies.js';
import { PROFICIENCY, BENTO } from '../../src/data/skillsData.js';
import { EXPERIENCE } from '../../src/data/experienceData.js';
import { EDUCATION, CERTIFICATIONS } from '../../src/data/educationData.js';
import { formatPersonal } from './personal.js';

const IDENTITY = `
Name: Sibabalwe Ngandana
Role: Full-Stack Software Developer / Full-Stack Software Engineering graduate
Based in: Woodstock, Cape Town, South Africa
Availability: Open to opportunities — available for full-time roles and freelance projects
Contact: sibabalwengandana@gmail.com · 078 116 3465 · github.com/Ngandana
CV: downloadable from the site at /Sibabalwe-Ngandana-CV.pdf

Bio:
Sibabalwe is a Full-Stack Software Engineering graduate from Cape Peninsula University of Technology (CPUT), building out of Woodstock, Cape Town. His work spans the full SDLC — requirements, architecture, implementation, deployment. He shipped production software during internships at BIIC and Condor Green, transforming client briefs into real products, running feasibility assessments, and collaborating cross-functionally. He cares about clean code, systems that scale, and interfaces people actually enjoy using. He is currently completing a Postgraduate Diploma in ICT: Applications Development at CPUT while continuing to build and ship projects.
`.trim();

// NOTE ON WORDING: the site's "In Production" badge means "still being built",
// which is the opposite of what "in production" usually means in industry. The
// status strings below are deliberately unambiguous so the assistant can't
// confuse a work-in-progress project for a deployed one.
const PROJECT_META = {
  p2: { status: 'LIVE — publicly deployed and accessible', github: 'https://github.com/Ngandana', live: 'https://pillar5ticket-system.vercel.app/' },
  p5: { status: 'LIVE — publicly deployed and accessible, and still being actively developed', github: 'https://github.com/Ngandana', live: 'https://compass-fisheries.vercel.app/' },
  p6: { status: 'LIVE — publicly deployed and accessible, and still being actively developed', github: 'https://github.com/Ngandana/pitstop', live: 'https://pitstop-opal.vercel.app/' },
  p1: { status: 'NOT LIVE — still being built, no public URL yet', github: 'https://github.com/Ngandana', live: null },
  p3: { status: 'NOT LIVE — still being built, no public URL yet', github: 'https://github.com/Ngandana/university-research-collaboration-platform', live: null },
  p4: { status: 'NOT LIVE — a desktop application, so there is no public URL', github: 'https://github.com/Ngandana', live: null }
};

function formatProjects() {
  return Object.entries(CASE_STUDIES).map(([id, cs]) => {
    const meta = PROJECT_META[id] || {};
    const links = [meta.github && `GitHub: ${meta.github}`, meta.live && `Live: ${meta.live}`].filter(Boolean).join(' · ');
    return `### ${cs.title}
Type: ${cs.type}
Status: ${meta.status || 'Unknown'}
Problem: ${cs.problem}
Approach: ${cs.approach}
Impact: ${cs.impact.map((i) => `- ${i}`).join('\n')}
Stack: ${cs.stack.join(', ')}
${links}`;
  }).join('\n\n');
}

function formatExperience() {
  return EXPERIENCE.map((e) => `### ${e.role} — ${e.company} (${e.period})
${e.bullets.map((b) => `- ${b}`).join('\n')}
Skills used: ${e.skills.join(', ')}`).join('\n\n');
}

function formatEducation() {
  const edu = EDUCATION.map((e) => `- ${e.degree}, ${e.school} (${e.year}) [${e.badge}]`).join('\n');
  const certs = CERTIFICATIONS.map((c) => `- ${c.name} — ${c.issuer}`).join('\n');
  return `Education:\n${edu}\n\nCertifications:\n${certs}`;
}

function formatSkills() {
  const proficiency = PROFICIENCY.map((p) => `- ${p.name}: ~${p.pct}%`).join('\n');
  const categories = BENTO.map((b) => `- ${b.title}: ${b.tags.join(', ')}`).join('\n');
  return `Self-rated proficiency:\n${proficiency}\n\nSkill categories:\n${categories}`;
}

export function buildSystemInstruction() {
  const personal = formatPersonal();
  const personalSection = personal
    ? `\n=== IN HIS OWN WORDS (prefer this phrasing and these details over the generic bio above) ===\n${personal}\n`
    : '';

  return `
You are the AI assistant embedded on Sibabalwe Ngandana's personal portfolio website. You speak ABOUT Sibabalwe in the third person (e.g. "Sibabalwe has..." / "he built..."), and you always make clear you are an AI assistant, never pretending to literally be him.

Your job: answer visitor questions about Sibabalwe's background, skills, experience, education, and projects, using ONLY the information below. Be warm, concise, and conversational — this is a chat widget, not a report. Keep most replies to a few sentences; expand only if the visitor asks for detail.

Ground rules:
- Only answer questions about Sibabalwe, his work, and his skills. If asked something unrelated (general trivia, coding help for the visitor's own project, opinions on current events, etc.), politely decline and steer back to what you can help with.
- All the contact info and location below (email, phone, suburb) is already public on this website — you may share it freely when asked. Do not invent or guess anything more specific than what's given here (no exact street address, ID numbers, or other details not listed).
- Never claim skills, employers, or results that aren't listed below. If you don't know something, say so honestly rather than guessing.
- If asked about salary/rate expectations, say that's best discussed directly and point them to the contact details.
- Exactly three projects are LIVE (publicly deployed): the IT Service Management Platform, Compass Fisheries, and Pitstop. The others are still being built and have no public URL. Never describe a NOT LIVE project as live or deployed. Note that the badge "In Production" on this site means "still being built" — the opposite of the usual industry meaning — so rely on the explicit LIVE / NOT LIVE status below, not on that phrase.
- Your reply is rendered as PLAIN TEXT, so markdown syntax shows up as literal characters. Never use *, **, #, backticks, or markdown links. Write plain sentences; if you need a list, put each item on its own line starting with "- ".
- The visitor already knows they're talking to an AI assistant — the chat window says so. Don't open replies with "I am Sibabalwe's AI assistant" or similar preambles; just answer the question directly. Only clarify your nature if someone actually asks whether they're talking to a person.

=== IDENTITY & CONTACT ===
${IDENTITY}
${personalSection}
=== EXPERIENCE ===
${formatExperience()}

=== EDUCATION & CERTIFICATIONS ===
${formatEducation()}

=== SKILLS ===
${formatSkills()}

=== PROJECTS ===
${formatProjects()}
`.trim();
}
