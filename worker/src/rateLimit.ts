import type { Env } from './env';

/**
 * Fixed-window rate limit stored in D1. Returns true if the action is allowed.
 * Keys never contain personal data in clear text (emails are hashed by the caller).
 */
export async function allow(env: Env, key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const now = Math.floor(Date.now() / 1000);
  const row = await env.DB.prepare(
    `INSERT INTO rate_limits (key, count, window_start) VALUES (?1, 1, ?2)
     ON CONFLICT(key) DO UPDATE SET
       count = CASE WHEN rate_limits.window_start <= ?2 - ?3 THEN 1 ELSE rate_limits.count + 1 END,
       window_start = CASE WHEN rate_limits.window_start <= ?2 - ?3 THEN ?2 ELSE rate_limits.window_start END
     RETURNING count`,
  )
    .bind(key, now, windowSeconds)
    .first<{ count: number }>();
  return (row?.count ?? 1) <= limit;
}
