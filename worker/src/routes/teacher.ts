import { TEACHER_COOKIE, TEACHER_MAX_AGE, clearCookie, readCookie, setCookie } from '../cookies';
import { randomToken, sha256Hex, timingSafeEqual } from '../crypto';
import type { Env } from '../env';
import { error, json } from '../http';
import { allow } from '../rateLimit';
import { clientKey, nowIso, readJson } from '../request';

/** Minimum length accepted for the teacher password secret. A long passphrase (16+ characters) is recommended. */
export const MIN_TEACHER_PASSWORD_LENGTH = 12;

const configured = (env: Env) => typeof env.TEACHER_PASSWORD === 'string' && env.TEACHER_PASSWORD.length >= MIN_TEACHER_PASSWORD_LENGTH;

/** True if the request carries a valid, unexpired teacher session. */
export async function isTeacher(request: Request, env: Env): Promise<boolean> {
  const token = readCookie(request, TEACHER_COOKIE);
  if (!token) return false;
  const row = await env.DB.prepare('SELECT expires_at FROM teacher_sessions WHERE token_hash = ?').bind(await sha256Hex(token)).first<{ expires_at: string }>();
  return !!row && Date.parse(row.expires_at) > Date.now();
}

/** POST /api/teacher/login — one strong password, kept as a server-side secret. */
export async function login(request: Request, env: Env): Promise<Response> {
  const body = await readJson<{ password?: string }>(request);
  if (!configured(env)) return error(503, 'teacher_login_not_configured');
  const ipOk = await allow(env, `teacher-ip:${clientKey(request)}`, 5, 900);
  const globalOk = await allow(env, 'teacher-global', 30, 900);
  if (!ipOk || !globalOk) return error(429, 'too_many_attempts');
  if (!(await timingSafeEqual(String(body.password ?? ''), env.TEACHER_PASSWORD!))) return error(401, 'wrong_password');

  const token = randomToken();
  const now = new Date();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM teacher_sessions WHERE expires_at < ?').bind(now.toISOString()),
    env.DB.prepare('INSERT INTO teacher_sessions (token_hash, created_at, expires_at) VALUES (?, ?, ?)').bind(
      await sha256Hex(token),
      now.toISOString(),
      new Date(now.getTime() + TEACHER_MAX_AGE * 1000).toISOString(),
    ),
  ]);
  return json({ ok: true }, 200, { 'set-cookie': setCookie(TEACHER_COOKIE, token, TEACHER_MAX_AGE, 'Strict') });
}

/** POST /api/teacher/logout */
export async function logout(request: Request, env: Env): Promise<Response> {
  const token = readCookie(request, TEACHER_COOKIE);
  if (token) await env.DB.prepare('DELETE FROM teacher_sessions WHERE token_hash = ?').bind(await sha256Hex(token)).run();
  return json({ ok: true }, 200, { 'set-cookie': clearCookie(TEACHER_COOKIE, 'Strict') });
}

/** GET /api/teacher/session — is the teacher signed in? */
export async function session(request: Request, env: Env): Promise<Response> {
  return json({ ok: true, signedIn: await isTeacher(request, env), configured: configured(env) });
}

/** GET /api/teacher/students — teacher only: the student register. */
export async function students(request: Request, env: Env): Promise<Response> {
  if (!(await isTeacher(request, env))) return error(401, 'teacher_only');
  const rows = await env.DB.prepare(
    `SELECT research_code, full_name, email, phone, phone_shared, created_at, last_active_at
       FROM students ORDER BY created_at DESC`,
  ).all<{
    research_code: string;
    full_name: string;
    email: string;
    phone: string;
    phone_shared: number;
    created_at: string;
    last_active_at: string;
  }>();
  return json({
    ok: true,
    generatedAt: nowIso(),
    students: (rows.results ?? []).map((r) => ({
      researchCode: r.research_code,
      fullName: r.full_name,
      email: r.email,
      phone: r.phone,
      phoneShared: r.phone_shared === 1,
      registeredAt: r.created_at,
      lastActiveAt: r.last_active_at,
    })),
  });
}
