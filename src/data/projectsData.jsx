export const SHOT_URLS = {
  itsm: 'https://api.microlink.io/?url=https%3A%2F%2Fpillar5ticket-system.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url',
  compass: 'https://api.microlink.io/?url=https%3A%2F%2Fcompass-fisheries.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url',
  pitstop: 'https://api.microlink.io/?url=https%3A%2F%2Fpitstop-opal.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url'
};

// Live projects first, then projects still in production.
export const PROJECTS = [
  {
    id: 'p2',
    num: '01',
    featured: true,
    type: 'ITSM · Full-Stack SaaS',
    title: 'IT Service Management Platform',
    desc: (
      <>Production-grade ITSM with <strong>React 18 + Vite</strong>, <strong>Node.js/Express</strong>, and PostgreSQL on Railway. Three-tier RBAC, email verification via Outlook SMTP, JWT auth, and forgot-password flow. Deployed across Vercel and Render.</>
    ),
    stack: ['React 18', 'Node.js', 'PostgreSQL', 'Vite', 'Tailwind', 'JWT', 'Nodemailer'],
    badges: [{ kind: 'live', label: 'Live' }],
    githubHref: 'https://github.com/Ngandana',
    githubLabel: 'View ITSM Platform on GitHub',
    liveHref: 'https://pillar5ticket-system.vercel.app/',
    liveLabel: 'View ITSM Platform live site',
    shot: 'itsm',
    shotAlt: 'Screenshot of the IT Service Management Platform dashboard'
  },
  {
    id: 'p5',
    num: '02',
    type: 'Full-Stack · Operations App',
    title: 'Compass Fisheries Order & Management App',
    desc: (
      <>A full-stack fisheries operations platform handling <strong>order management, inventory tracking, and business workflows</strong> for a live client. Deployed to production on Vercel with a clean, role-aware UI tailored to operational staff — still under active development as new features roll out.</>
    ),
    stack: ['React', 'Node.js', 'Vercel', 'REST API', 'Operations'],
    badges: [{ kind: 'live', label: 'Live' }, { kind: 'wip', label: 'In Production' }],
    githubHref: 'https://github.com/Ngandana',
    githubLabel: 'View Compass Fisheries on GitHub',
    liveHref: 'https://compass-fisheries.vercel.app/',
    liveLabel: 'View Compass Fisheries live site',
    shot: 'compass',
    shotAlt: 'Screenshot of the Compass Fisheries order and management app'
  },
  {
    id: 'p6',
    num: '03',
    revealDelay: 1,
    type: 'Full-Stack · Fleet Management SaaS',
    title: 'Pitstop — Fleet Management Platform',
    desc: (
      <>Fleet management system for a scooter rental business — bike/driver registration with handover photos, <strong>Cartrack telematics</strong> odometer sync, kilometer-based service scheduling, rental and payment ledgers, and an <strong>outbox-pattern reminder system</strong>. Built with Next.js 16 and Supabase, still under active development.</>
    ),
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS', 'Zod', 'Vitest'],
    badges: [{ kind: 'live', label: 'Live' }, { kind: 'wip', label: 'In Production' }],
    githubHref: 'https://github.com/Ngandana/pitstop',
    githubLabel: 'View Pitstop on GitHub',
    liveHref: 'https://pitstop-opal.vercel.app/',
    liveLabel: 'View Pitstop live site',
    shot: 'pitstop',
    shotAlt: 'Screenshot of the Pitstop fleet management dashboard'
  },
  {
    id: 'p1',
    num: '04',
    type: 'Full-Stack · Web App',
    title: 'Arts & Craft E-Commerce Platform',
    desc: (
      <>End-to-end e-commerce with product listings, category filtering, and <strong>JWT-based auth</strong>. Achieved a measurable <strong>30% usability improvement</strong> through iterative UI/UX refinements and a streamlined checkout. Clean REST API contracts, team-built.</>
    ),
    stack: ['Java', 'Spring Boot', 'Vue.js', 'MySQL', 'JWT', 'REST API'],
    badges: [{ kind: 'wip', label: 'In Production' }],
    githubHref: 'https://github.com/Ngandana',
    githubLabel: 'View E-Commerce project on GitHub',
    liveHref: null,
    shot: null
  },
  {
    id: 'p3',
    num: '05',
    revealDelay: 1,
    type: 'Python · REST API',
    title: 'University Research Collaboration Platform',
    desc: (
      <>FastAPI platform with <strong>3-layer service architecture</strong>, 19 endpoints, and <strong>249 passing tests</strong>. Full CI/CD via GitHub Actions. Repository pattern, domain modelling, design patterns — built incrementally across 7 assignments.</>
    ),
    stack: ['Python', 'FastAPI', 'pytest', 'GitHub Actions', 'CI/CD', 'REST API'],
    badges: [{ kind: 'wip', label: 'In Production' }],
    githubHref: 'https://github.com/Ngandana/university-research-collaboration-platform',
    githubLabel: 'View Research Platform on GitHub',
    liveHref: null,
    shot: null
  },
  {
    id: 'p4',
    num: '06',
    type: 'Desktop App · Java',
    title: 'Scooter Rental Service Application',
    desc: (
      <>Java Swing desktop app for end-to-end scooter rental management — account creation, availability tracking, and orders. Separate <strong>admin and customer interfaces</strong> with role-based access control. Solved concurrent MySQL connectivity challenges.</>
    ),
    stack: ['Java', 'Java Swing', 'MySQL', 'RBAC', 'OOP'],
    badges: [{ kind: 'wip', label: 'In Production' }],
    githubHref: 'https://github.com/Ngandana',
    githubLabel: 'View Scooter Rental on GitHub',
    liveHref: null,
    shot: null
  }
];
