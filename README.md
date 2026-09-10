# Sibabalwe Ngandana Portfolio

A personal portfolio website showcasing my experience, projects, education, and technical skills as a Full-Stack Software Developer based in Cape Town, South Africa.

## Live Demo

(https://sibabalwe-portfolio-eight.vercel.app/)

## About

This portfolio highlights:
- My full-stack development experience
- Internship work at BIIC and Condor Green
- Selected projects built with Java, Spring Boot, React, Node.js, FastAPI, and PostgreSQL
- Education and certifications
- Contact information and availability

## Tech Stack

- React 18 + Vite
- Three.js / @react-three/fiber (hero particle effect)
- CSS3 (single global stylesheet, custom properties)
- Google Fonts
- Vercel Serverless Function (`/api/chat`) + Gemini API — AI assistant
- Upstash Redis — per-IP rate limiting for the AI assistant
- Zod — request validation

## Features

- Responsive layout for desktop and mobile
- Animated hero section with a live 3D particle effect (Antigravity)
- Custom cursor and scroll progress indicator
- Interactive skill and project sections, incl. live GitHub stats and project case-study modals
- Mobile navigation drawer
- Accessibility-friendly structure with skip link and focus states
- **AI assistant** (terminal-styled chat, open via the dock or `Cmd/Ctrl+K` → "Ask AI Assistant") that answers visitor questions about my background, skills, and projects, grounded in this site's own content — see [Setting up the AI assistant](#setting-up-the-ai-assistant)

## Setting up the AI assistant

The chat feature calls the [Gemini API](https://ai.google.dev/) (free tier — no credit card required) from a Vercel serverless function, so the API key never reaches the browser. It needs two things before it'll work:

1. **A Gemini API key** — create one for free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. **An Upstash Redis database** (also free, no card) — create one at [console.upstash.com](https://console.upstash.com/). It enforces two limits: **20 messages/hour per visitor** (anti-abuse) and **12 requests/minute site-wide**. The second one matters: Gemini's free tier caps generation at 15 requests per minute for the *whole project*, so without a global cap a few simultaneous visitors would push past it and everyone would see errors. If you skip Upstash the endpoint still works but unthrottled — fine for local dev, not recommended once deployed publicly.

Set these as environment variables (in Vercel: Project Settings → Environment Variables; locally: a `.env.local` file, which is gitignored — never put real keys in `.env.example`):

```
GEMINI_API_KEY=your-key-here
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
GEMINI_MODEL=            # optional — defaults to gemini-3.5-flash-lite
```

### Testing it locally

`npm run dev` runs Vite only, which does **not** serve the `/api` functions — the chat will fail against it. To exercise the real endpoint locally you need the Vercel CLI:

```bash
npm i -g vercel
vercel dev        # serves the site AND /api/chat, reading .env.local
```

Otherwise, deploy to Vercel (with the env vars set) and test there.

### Notes

- The assistant's knowledge is compiled from this repo's own `src/data/*` files (experience, education, skills, project case studies) — see `api/_lib/knowledge.js`. Update those files and the assistant's answers follow automatically.
- `gemini-3.5-flash-lite` was chosen after benchmarking: it answers in ~1.3s, while the larger flash models took ~20s to first token. `GEMINI_MODEL` lets you swap models without a code change if one is ever retired.
- Your own elevator pitch, availability, and personal context go in `api/_lib/personal.js` — empty fields are simply skipped, so filling one in is the only step needed.

### Seeing what visitors ask (optional)

`api/_lib/chatlog.js` can log every question + answer to Supabase so you can review real conversations and spot weak answers. It's off by default and never breaks the chat if misconfigured or down — logging failures are swallowed, not surfaced.

**No personal data is stored** — no names, emails, or IPs. Just the question, the answer, and a random per-tab id used only to group a conversation's turns together. The chat UI discloses this. See `supabase/schema.sql` for the exact columns and the row-level-security lockdown (only the service-role key can read or write the table — the anon/public key is denied both).

To turn it on:
1. Create a free Supabase project at [supabase.com](https://supabase.com/) (no card required).
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API — the **service_role** secret, not the anon/public key) as env vars.

To read the logs, use the Supabase dashboard's Table Editor on `chat_logs`, or the `chat_common_questions` / `chat_recent` views it also creates.

## Projects

A few featured projects included in the portfolio:
- Arts & Craft E-Commerce Platform
- IT Service Management Platform
- University Research Collaboration Platform
- Scooter Rental Service Application

## Contact

- Email: sibabalwengandana@gmail.com
- GitHub: https://github.com/Ngandana
- Phone: 078 116 3465

## Local Run

This is a Vite + React app and needs a build step.

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```