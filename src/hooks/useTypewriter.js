import { useEffect, useRef } from 'react';

const LINES = [
  { prompt: true, dir: '~/portfolio', text: 'cat developer.json' },
  { prompt: false, text: '', cls: '' },
  { prompt: false, text: '{', cls: 'dim' },
  { prompt: false, text: '  "name": "Sibabalwe Ngandana",', cls: 'out' },
  { prompt: false, text: '  "role": "Full-Stack Developer",', cls: 'out' },
  { prompt: false, text: '  "location": "Cape Town, ZA",', cls: 'out' },
  { prompt: false, text: '  "stack": ["Java","React","Node"],', cls: 'out' },
  { prompt: false, text: '  "open_to_work": true', cls: 'grn' },
  { prompt: false, text: '}', cls: 'dim' },
  { prompt: false, text: '', cls: '' },
  { prompt: true, dir: '~/portfolio', text: 'git log --oneline -3' },
  { prompt: false, text: 'a3f21bc feat: ITSM ticketing platform', cls: 'out' },
  { prompt: false, text: 'b9e02d1 feat: FastAPI research platform', cls: 'out' },
  { prompt: false, text: 'c7a14f8 feat: e-commerce with JWT auth', cls: 'out' },
  { prompt: false, text: '', cls: '' },
  { prompt: true, dir: '~/portfolio', text: 'echo "Let\'s build something"', cls: '' },
  { prompt: false, text: "Let's build something", cls: 'amber' },
  { prompt: false, text: '', cls: '', cursor: true }
];

/** Types the fake terminal session into the given container ref, one character at a time. */
export function useTypewriter(containerRef) {
  useEffect(() => {
    const body = containerRef.current;
    if (!body) return;
    let i = 0;
    let cancelled = false;
    const timers = [];

    function nextLine() {
      if (cancelled || i >= LINES.length) return;
      const l = LINES[i++];
      const row = document.createElement('div');
      row.className = 't-line';

      if (l.prompt) {
        const p = document.createElement('span');
        p.className = 't-prompt';
        p.textContent = '❯';
        const d = document.createElement('span');
        d.className = 't-dir';
        d.textContent = ' ' + l.dir + ' ';
        const t = document.createElement('span');
        t.className = 't-text cmd';
        row.append(p, d, t);
        body.appendChild(row);
        let ci = 0;
        const iv = setInterval(() => {
          if (cancelled) { clearInterval(iv); return; }
          t.textContent += l.text[ci++];
          if (ci >= l.text.length) {
            clearInterval(iv);
            timers.push(setTimeout(nextLine, 180));
          }
        }, 45);
      } else {
        const t = document.createElement('span');
        t.className = 't-text ' + (l.cls || '');
        t.textContent = l.text;
        if (l.cursor) {
          const c = document.createElement('span');
          c.className = 't-cursor';
          row.append(t, c);
        } else {
          row.appendChild(t);
        }
        body.appendChild(row);
        timers.push(setTimeout(nextLine, l.text === '' ? 60 : 90));
      }
      body.scrollTop = body.scrollHeight;
    }

    timers.push(setTimeout(nextLine, 800));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [containerRef]);
}
