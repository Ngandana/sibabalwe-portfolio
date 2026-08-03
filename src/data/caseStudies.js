export const CASE_STUDIES = {
  p1: {
    type: 'Full-Stack · Web App',
    title: 'Arts & Craft E-Commerce Platform',
    problem: 'A team project needed a full e-commerce flow — product listings, category filtering, and a secure, easy checkout for buying arts and crafts.',
    approach: 'Built the backend in Java with Spring Boot and the frontend in Vue.js, with JWT-based authentication and clean REST API contracts so frontend and backend could be developed in parallel by the team.',
    impact: [
      '30% usability improvement through iterative UI/UX refinements',
      'Clean REST API contracts enabling seamless frontend/backend integration',
      'Team-built, end-to-end e-commerce flow from listing to checkout'
    ],
    stack: ['Java', 'Spring Boot', 'Vue.js', 'MySQL', 'JWT', 'REST API'],
    shot: null
  },
  p2: {
    type: 'ITSM · Full-Stack SaaS',
    title: 'IT Service Management Platform',
    problem: 'A client needed a live, production-ready IT support ticketing system with proper access control for administrative and technical staff, and a reliable account/auth flow.',
    approach: 'React 18 + Vite on the frontend, Node.js/Express API, PostgreSQL hosted on Railway. Implemented three-tier RBAC for admin and technical dashboards, JWT auth, email verification via Outlook SMTP, and a forgot-password flow. Deployed across Vercel and Render, with updates packaged as versioned, documented releases.',
    impact: [
      'Live in production for a real client',
      'Three-tier role-based access control across admin/technical dashboards',
      'Full auth lifecycle: JWT, email verification, and password recovery',
      'Versioned, documented releases for easy client adoption'
    ],
    stack: ['React 18', 'Node.js', 'PostgreSQL', 'Vite', 'Tailwind', 'JWT', 'Nodemailer'],
    shot: 'itsm'
  },
  p3: {
    type: 'Python · REST API',
    title: 'University Research Collaboration Platform',
    problem: 'University researchers needed a way to collaborate on projects, manage profiles, and share their research work through a reliable backend platform.',
    approach: 'Built with Python and FastAPI, organised into domain, repository, and service layers to keep the codebase easy to maintain and extend. Built incrementally across 7 assignments, applying clean software design patterns throughout.',
    impact: [
      '249 passing automated tests keeping the platform reliable as it grew',
      '19 REST endpoints across a 3-layer service architecture',
      'Full CI/CD pipeline via GitHub Actions'
    ],
    stack: ['Python', 'FastAPI', 'pytest', 'GitHub Actions', 'CI/CD', 'REST API'],
    shot: null
  },
  p4: {
    type: 'Desktop App · Java',
    title: 'Scooter Rental Service Application',
    problem: 'Employees and customers needed a way to manage scooter rentals end-to-end — account creation, checking availability, and placing orders — with separate tooling for staff and customers.',
    approach: 'Built as a Java desktop application using Swing, with separate admin and customer interfaces and role-based access control, backed by MySQL for persistence.',
    impact: [
      'Solved concurrent MySQL connectivity challenges for reliable data access and storage',
      'Separate, role-based admin and customer interfaces for efficient management'
    ],
    stack: ['Java', 'Java Swing', 'MySQL', 'RBAC', 'OOP'],
    shot: null
  },
  p5: {
    type: 'Full-Stack · Operations App',
    title: 'Compass Fisheries Order & Management App',
    problem: 'A live client needed a way to manage order processing, inventory tracking, and day-to-day business workflows for fisheries operations.',
    approach: 'Built with React and Node.js, deployed to production on Vercel, with a clean, role-aware UI tailored to how operational staff actually work.',
    impact: [
      'Live in production for a real operating client',
      'Streamlined order management and inventory tracking workflows for operational staff'
    ],
    stack: ['React', 'Node.js', 'Vercel', 'REST API', 'Operations'],
    shot: 'compass'
  }
};
