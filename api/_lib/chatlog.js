// Optional conversation logging to Supabase, so you can see what visitors
// actually ask and fix weak answers.
//
// Design rules, in priority order:
//
//  1. NEVER break the chat. Logging is best-effort — any failure is swallowed
//     and logged to the console, never surfaced to the visitor.
//  2. Entirely optional. With SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY unset,
//     every call here is a no-op and the assistant behaves exactly as before.
//  3. No personal data. We store the question, the answer, and a random
//     conversation id — no IPs, no user agents, no cookies. See
//     supabase/schema.sql.
//
// This posts straight to PostgREST with fetch rather than pulling in
// @supabase/supabase-js: it's a single INSERT, and skipping a ~100KB
// dependency keeps the serverless cold start down.

const URL_BASE = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ENABLED = Boolean(URL_BASE && SERVICE_KEY);
const MAX_FIELD = 4000; // don't let a pathological input bloat the table

if (!ENABLED) {
  console.info('[api/chat] Supabase not configured — conversation logging is off.');
}

export const loggingEnabled = ENABLED;

function trim(value) {
  const text = String(value ?? '');
  return text.length > MAX_FIELD ? `${text.slice(0, MAX_FIELD)}…[truncated]` : text;
}

export async function logExchange({ sessionId, turnIndex, question, answer, model, latencyMs }) {
  if (!ENABLED) return;
  if (!question || !answer) return; // nothing useful to record

  try {
    const res = await fetch(`${URL_BASE}/rest/v1/chat_logs`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        session_id: sessionId ? String(sessionId).slice(0, 64) : null,
        turn_index: Number.isInteger(turnIndex) ? turnIndex : null,
        question: trim(question),
        answer: trim(answer),
        model: model ? String(model).slice(0, 64) : null,
        latency_ms: Number.isFinite(latencyMs) ? Math.round(latencyMs) : null
      })
    });

    if (!res.ok) {
      console.error('[api/chat] conversation log rejected:', res.status, (await res.text()).slice(0, 200));
    }
  } catch (err) {
    // Swallowed on purpose — a logging outage must never cost the visitor a reply.
    console.error('[api/chat] conversation log failed:', err?.message || err);
  }
}
