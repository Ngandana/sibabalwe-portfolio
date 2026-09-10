// Rate limiting for the public /api/chat endpoint, backed by Upstash Redis
// (free tier, no card required — see README for setup). Serverless functions
// are stateless between cold starts, so an in-memory counter wouldn't hold;
// Redis is the shared counter across invocations.
//
// Two limits, for two different problems:
//
//  1. PER-IP  — stops one visitor burning the whole quota or running up abuse.
//  2. GLOBAL  — the Gemini free tier caps GenerateContent at 15 requests per
//     MINUTE for the whole project (not per user). Without a global cap, three
//     visitors chatting at once would push past it and everyone would start
//     seeing errors. We hold the whole site to 12/min to keep headroom.
//
// If the Upstash env vars aren't set (e.g. local dev without a DB yet), both
// limits are skipped rather than failing the request — a warning is logged so
// it's obvious it isn't wired up before going live.

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const PER_IP_MAX = 20;
const PER_IP_WINDOW = '1 h';
const GLOBAL_MAX = 12; // Gemini free tier hard limit is 15/min, project-wide
const GLOBAL_WINDOW = '1 m';

let ipLimiter = null;
let globalLimiter = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = Redis.fromEnv();
  ipLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(PER_IP_MAX, PER_IP_WINDOW),
    prefix: 'portfolio-ai-chat:ip'
  });
  globalLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(GLOBAL_MAX, GLOBAL_WINDOW),
    prefix: 'portfolio-ai-chat:global'
  });
} else {
  console.warn('[api/chat] UPSTASH_REDIS_REST_URL/TOKEN not set — rate limiting is disabled.');
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

// Returns { success, remaining, limit, scope } where scope is 'ip' or 'global'
// when a limit is hit, so the caller can pick the right message and status.
// Always succeeds when rate limiting is disabled (no Upstash configured).
export async function checkRateLimit(ip) {
  if (!ipLimiter || !globalLimiter) {
    return { success: true, remaining: PER_IP_MAX, limit: PER_IP_MAX, scope: null };
  }

  // Check the per-IP limit first: an abusive client shouldn't consume the
  // shared global budget just by being told it's rate limited.
  const perIp = await ipLimiter.limit(ip);
  if (!perIp.success) {
    return { success: false, remaining: perIp.remaining, limit: PER_IP_MAX, scope: 'ip' };
  }

  const global = await globalLimiter.limit('all');
  if (!global.success) {
    return { success: false, remaining: perIp.remaining, limit: PER_IP_MAX, scope: 'global' };
  }

  return { success: true, remaining: perIp.remaining, limit: PER_IP_MAX, scope: null };
}
