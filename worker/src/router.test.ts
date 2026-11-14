import { describe, expect, it } from 'vitest';
import { handleApi } from './router';
import type { Env } from './env';

/** Minimal stand-in for D1 so the router can be tested without Cloudflare. */
function fakeEnv(rows: Array<{ key: string; value: string }> | Error): Env {
  return {
    APP_ENV: 'test',
    ASSETS: { fetch: async () => new Response('asset') } as unknown as Fetcher,
    DB: {
      prepare: () => ({
        all: async () => {
          if (rows instanceof Error) throw rows;
          return { results: rows };
        },
      }),
    } as unknown as D1Database,
  };
}

const req = (path: string, method = 'GET') => new Request(`http://localhost${path}`, { method });

describe('API router', () => {
  it('reports a healthy database with its schema version and dataset', async () => {
    const res = await handleApi(req('/api/health'), fakeEnv([
      { key: 'schema_version', value: '1' },
      { key: 'dataset', value: 'synthetic' },
    ]));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true, db: 'ok', schemaVersion: '1', dataset: 'synthetic' });
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(res.headers.get('access-control-allow-origin')).toBeNull();
  });

  it('returns 503 without internal details when the database is unavailable', async () => {
    const res = await handleApi(req('/api/health'), fakeEnv(new Error('secret internal message')));
    expect(res.status).toBe(503);
    const body = await res.text();
    expect(body).not.toContain('secret internal message');
  });

  it('returns 404 for unknown API routes and 405 for wrong methods', async () => {
    expect((await handleApi(req('/api/nope'), fakeEnv([]))).status).toBe(404);
    const res = await handleApi(req('/api/health', 'POST'), fakeEnv([]));
    expect(res.status).toBe(405);
    expect(res.headers.get('allow')).toBe('GET');
  });
});
