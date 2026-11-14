import type { Env } from './env';
import { error } from './http';
import { BadRequest } from './request';
import { health } from './routes/health';
import * as studentRoutes from './routes/students';
import * as teacherRoutes from './routes/teacher';

type Handler = (request: Request, env: Env) => Promise<Response>;

/** API routes. Later milestones add assessments, progress and exports here. */
const routes: Record<string, Partial<Record<string, Handler>>> = {
  '/api/health': { GET: (_req, env) => health(env) },
  // Students (no passwords, no verification, no return codes — D15)
  '/api/students/register': { POST: studentRoutes.register },
  '/api/students/resume': { POST: studentRoutes.resume },
  '/api/students/me': { GET: studentRoutes.me },
  '/api/students/logout': { POST: studentRoutes.logout },
  // Teacher (one strong password, server-side secret)
  '/api/teacher/login': { POST: teacherRoutes.login },
  '/api/teacher/logout': { POST: teacherRoutes.logout },
  '/api/teacher/session': { GET: teacherRoutes.session },
  '/api/teacher/students': { GET: teacherRoutes.students },
};

export async function handleApi(request: Request, env: Env): Promise<Response> {
  const { pathname } = new URL(request.url);
  const route = routes[pathname];
  if (!route) return error(404, 'not_found');
  const handler = route[request.method];
  if (!handler) return error(405, 'method_not_allowed', { allow: Object.keys(route).join(', ') });
  try {
    return await handler(request, env);
  } catch (e) {
    if (e instanceof BadRequest) return error(e.status, e.code);
    // Never leak internal details to the browser.
    return error(500, 'internal_error');
  }
}

