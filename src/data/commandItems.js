export const COMMANDS = [
  {
    group: 'Navigate',
    items: [
      { name: 'Home', sub: 'Hero section', icon: 'home', href: '#home' },
      { name: 'About', sub: 'Who I am', icon: 'user', href: '#about' },
      { name: 'Skills', sub: 'Technical stack', icon: 'code', href: '#skills' },
      { name: 'Experience', sub: 'Work history', icon: 'briefcase', href: '#experience' },
      { name: 'Projects', sub: 'Things I built', icon: 'grid', href: '#projects' },
      { name: 'Education', sub: 'Qualifications & certs', icon: 'book', href: '#education' },
      { name: 'Contact', sub: 'Get in touch', icon: 'mail', href: '#contact' }
    ]
  },
  {
    group: 'Live Projects',
    items: [
      { name: 'ITSM Platform', sub: 'pillar5ticket-system.vercel.app', icon: 'globe', href: 'https://pillar5ticket-system.vercel.app/', external: true, badge: 'Live' },
      { name: 'Compass Fisheries', sub: 'compass-fisheries.vercel.app', icon: 'globe', href: 'https://compass-fisheries.vercel.app/', external: true, badge: 'Live' },
      { name: 'GitHub Profile', sub: 'github.com/Ngandana', icon: 'github', href: 'https://github.com/Ngandana', external: true }
    ]
  },
  {
    group: 'Actions',
    items: [
      { name: 'Copy Email', sub: 'sibabalwengandana@gmail.com', icon: 'copy', action: 'copy' },
      { name: 'Send Email', sub: 'Open mail client', icon: 'mail', href: 'mailto:sibabalwengandana@gmail.com' },
      { name: 'Call', sub: '078 116 3465', icon: 'phone', href: 'tel:0781163465' }
    ]
  }
];

export const CMD_ICON_PATHS = {
  home: '<polyline points="3 9 12 2 21 9"/><path d="M9 22V12h6v10M3 9v13h18V9"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.13 3.53 2 2 0 0 1 3.1 1.37h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.83a16 16 0 0 0 6.08 6.08l1.12-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>'
};
