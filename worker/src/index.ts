/**
 * THE EQUILIBRIUM MISSION — Cloudflare Worker (D15).
 * Serves the approved Stage 2 site from dist/ and the API under /api/.
 * The D1 database is reachable only through this code, never from the browser.
 */
import type { Env } from './env';
import { handleApi } from './router';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/api/')) return handleApi(request, env);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
