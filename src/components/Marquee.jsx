const ITEMS = [
  'Full-Stack Development', 'Spring Boot', 'React.js', 'PostgreSQL', 'Node.js', 'FastAPI',
  'System Design', 'Java', 'Vue.js', 'REST APIs', 'Cape Town', 'SDLC'
];

export default function Marquee() {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track" id="marquee-track">
        {items.map((item, i) => (
          <span className="marquee-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
