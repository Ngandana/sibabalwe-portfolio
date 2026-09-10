// POST /api/chat — streams a grounded answer about Sibabalwe from Gemini.
//
// Vercel Node.js serverless function. Body is validated with Zod, the
// request is rate-limited per IP via Upstash Redis, and the reply streams
// back as plain text chunks so the UI can render it token-by-token.

import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { buildSystemInstruction } from './_lib/knowledge.js';
import { checkRateLimit, getClientIp } from './_lib/ratelimit.js';
import { logExchange } from './_lib/chatlog.js';

// Measured against the free tier: flash-lite answers in ~1.3s, while the
// larger flash models took ~20s to first token (they think before replying) —
// far too slow for a chat widget. Overridable via env so a future model
// retirement (gemini-2.5-flash was retired for new keys) is a config change,
// not a code change.
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const MAX_HISTORY_TURNS = 12; // bounds token spend regardless of what the client sends

const ChatRequestSchema = z.object({
  message: z.string().trim().min(1, 'Message cannot be empty').max(2000, 'Message is too long'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        text: z.string().min(1).max(4000)
      })
    )
    .max(40)
    .optional()
    .default([]),
  // Random, browser-generated, dies with the tab — groups multi-turn
  // conversations in the log. Identifies a conversation, never a person.
  sessionId: z.string().max(64).optional()
});

let ai = null;
function getClient() {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!ai) ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return ai;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const client = getClient();
  if (!client) {
    res.status(500).json({ error: 'AI assistant is not configured yet (missing GEMINI_API_KEY).' });
    return;
  }

  const parsed = ChatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message || 'Invalid request' });
    return;
  }
  const { message, history, sessionId } = parsed.data;

  const ip = getClientIp(req);
  const { success, remaining, limit, scope } = await checkRateLimit(ip);
  if (!success) {
    if (scope === 'global') {
      // The whole site is at capacity, not this particular visitor.
      res.status(503).json({ error: 'The assistant is busy right now — please try again in a moment.' });
    } else {
      res.status(429).json({ error: "You've reached the message limit for now — please try again later." });
    }
    return;
  }

  const recentHistory = history.slice(-MAX_HISTORY_TURNS);
  const contents = [
    ...recentHistory.map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
    { role: 'user', parts: [{ text: message }] }
  ];

  // Open the stream first, while we can still send a real status code — this
  // is where auth/model/overload errors surface. Only write headers once the
  // upstream call has actually succeeded.
  let stream;
  try {
    stream = await client.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: buildSystemInstruction(),
        temperature: 0.6,
        maxOutputTokens: 1024
      }
    });
  } catch (err) {
    console.error('[api/chat] Gemini request failed:', err);
    const code = errorCode(err);
    if (code === 429 || code === 503) {
      res.status(503).json({ error: 'The assistant is busy right now — please try again in a moment.' });
    } else {
      res.status(502).json({ error: 'The assistant is unavailable right now — please try again later.' });
    }
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Limit': String(limit)
  });

  const startedAt = Date.now();
  let answer = '';
  try {
    for await (const chunk of stream) {
      if (chunk.text) {
        answer += chunk.text;
        res.write(chunk.text);
      }
    }
  } catch (err) {
    console.error('[api/chat] Gemini stream broke mid-response:', err);
    // Headers are already sent, so the failure has to be surfaced in-band.
    res.write('\n\n[Something went wrong generating a response — please try again.]');
  }

  // Log before ending the response: a serverless function can be frozen the
  // moment res.end() returns, which would drop an un-awaited write. The
  // visitor already has the full text, so this costs them nothing.
  await logExchange({
    sessionId,
    turnIndex: Math.floor(recentHistory.length / 2),
    question: message,
    answer,
    model: MODEL,
    latencyMs: Date.now() - startedAt
  });

  res.end();
}

// The SDK surfaces upstream failures as a message containing the raw JSON
// error body, so check the structured field first and fall back to the text.
function errorCode(err) {
  if (typeof err?.status === 'number') return err.status;
  const match = String(err?.message || '').match(/"code"\s*:\s*(\d{3})/);
  return match ? Number(match[1]) : 0;
}
