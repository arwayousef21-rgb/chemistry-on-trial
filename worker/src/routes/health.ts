import type { Env } from '../env';
import { json } from '../http';

/**
 * GET /api/health — confirms the API is running and the database is reachable.
 * Returns no personal data.
 */
export async function health(env: Env): Promise<Response> {
  let db: 'ok' | 'unavailable' = 'unavailable';
  let schemaVersion: string | null = null;
  let dataset: string | null = null;
  try {
    const rows = await env.DB.prepare("SELECT key, value FROM app_meta WHERE key IN ('schema_version', 'dataset')").all<{
      key: string;
      value: string;
    }>();
    for (const r of rows.results ?? []) {
      if (r.key === 'schema_version') schemaVersion = r.value;
      if (r.key === 'dataset') dataset = r.value;
    }
    db = 'ok';
  } catch {
    db = 'unavailable';
  }
  return json({ ok: db === 'ok', app: 'equilibrium-mission', env: env.APP_ENV, db, schemaVersion, dataset }, db === 'ok' ? 200 : 503);
}
