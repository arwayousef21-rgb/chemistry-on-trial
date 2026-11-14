import type { Env } from './env';
import { error } from './http';
import { health } from './routes/health';

type Handler = (request: Request, env: Env) => Promise<Response>;

/** API routes. Later milestones add registration, resume, attempts and teacher routes here. */
const routes: Record<string, Partial<Record<string, Handler>>> = {
  '/api/health': { GET: (_req, env) => health(env) },
};

export async function handleApi(request: Request, env: Env): Promise<Response> {
  const { pathname } = new URL(request.url);
  const route = routes[pathname];
  if (!route) return error(404, 'not_found');
  const handler = route[request.method];
  if (!handler) return error(405, 'method_not_allowed', { allow: Object.keys(route).join(', ') });
  try {
    return await handler(request, env);
  } catch {
    // Never leak internal details to the browser.
    return error(500, 'internal_error');
  }
}
