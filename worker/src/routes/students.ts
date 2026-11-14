import { validateRegistration, validateResume, type RegistrationInput } from '../../../shared/validation';
import { STUDENT_COOKIE, STUDENT_MAX_AGE, clearCookie, readCookie, setCookie } from '../cookies';
import { randomToken, sha256Hex } from '../crypto';
import type { Env } from '../env';
import { error, json } from '../http';
import { allow } from '../rateLimit';
import { clientKey, nowIso, readJson } from '../request';

/** Public view of the signed-in student's own record (minimal; no other student is ever returned). */
interface StudentRow {
  id: string;
  research_code: string;
  full_name: string;
}

const publicProfile = (s: StudentRow) => ({ fullName: s.full_name, researchCode: s.research_code });

async function startSession(env: Env, studentId: string): Promise<string> {
  const token = randomToken();
  const now = nowIso();
  await env.DB.prepare('INSERT INTO device_sessions (token_hash, student_id, created_at, last_used_at) VALUES (?, ?, ?, ?)')
    .bind(await sha256Hex(token), studentId, now, now)
    .run();
  return setCookie(STUDENT_COOKIE, token, STUDENT_MAX_AGE, 'Lax');
}

/** Finds the student for this browser's session cookie, or null. */
export async function currentStudent(request: Request, env: Env): Promise<StudentRow | null> {
  const token = readCookie(request, STUDENT_COOKIE);
  if (!token) return null;
  const hash = await sha256Hex(token);
  const row = await env.DB.prepare(
    `SELECT s.id, s.research_code, s.full_name, d.last_used_at
       FROM device_sessions d JOIN students s ON s.id = d.student_id
      WHERE d.token_hash = ?`,
  )
    .bind(hash)
    .first<StudentRow & { last_used_at: string }>();
  if (!row) return null;
  // Record participation at most once per hour (keeps database writes low).
  if (Date.now() - Date.parse(row.last_used_at) > 60 * 60 * 1000) {
    const now = nowIso();
    await env.DB.batch([
      env.DB.prepare('UPDATE device_sessions SET last_used_at = ? WHERE token_hash = ?').bind(now, hash),
      env.DB.prepare('UPDATE students SET last_active_at = ? WHERE id = ?').bind(now, row.id),
    ]);
  }
  return row;
}

/** POST /api/students/register — first-time registration: one new record + a device session. */
export async function register(request: Request, env: Env): Promise<Response> {
  const body = await readJson<Partial<RegistrationInput> & { website?: string }>(request);
  if (body.website) return error(400, 'invalid_request'); // hidden field only bots fill in
  if (!(await allow(env, `register:${clientKey(request)}`, 20, 3600))) return error(429, 'too_many_attempts');

  const v = validateRegistration({
    fullName: String(body.fullName ?? ''),
    email: String(body.email ?? ''),
    phone: String(body.phone ?? ''),
    consent: body.consent === true,
  });
  if (!v.ok) return json({ ok: false, error: 'validation_failed', fields: v.errors }, 422);
  const { fullName, email, phone } = v.value;

  const existing = await env.DB.prepare('SELECT 1 FROM students WHERE email = ?').bind(email).first();
  if (existing) return error(409, 'email_exists'); // the student should use "I already have an account"

  const id = crypto.randomUUID();
  const now = nowIso();
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await env.DB.prepare(
        `INSERT INTO students (id, research_code, full_name, email, phone, phone_shared, consent_at, created_at, last_active_at)
         VALUES (?1, 'S-' || printf('%04d', (SELECT COALESCE(MAX(CAST(substr(research_code, 3) AS INTEGER)), 0) + 1 FROM students)),
                 ?2, ?3, ?4, 0, ?5, ?5, ?5)`,
      )
        .bind(id, fullName, email, phone, now)
        .run();
      break;
    } catch (e) {
      const msg = String((e as Error).message ?? '');
      if (msg.includes('students.email')) return error(409, 'email_exists');
      if (!msg.includes('research_code') || attempt === 2) throw e;
    }
  }
  // Flag records that share a phone number (siblings may share a parent's phone) for teacher review.
  await env.DB.prepare('UPDATE students SET phone_shared = 1 WHERE phone = ?1 AND (SELECT COUNT(*) FROM students WHERE phone = ?1) > 1').bind(phone).run();

  const student = await env.DB.prepare('SELECT id, research_code, full_name FROM students WHERE id = ?').bind(id).first<StudentRow>();
  const cookie = await startSession(env, id);
  return json({ ok: true, student: publicProfile(student!) }, 201, { 'set-cookie': cookie });
}

/**
 * POST /api/students/resume — new device: email + phone must BOTH match one record.
 * Answers only match / no match. Never creates a record.
 */
export async function resume(request: Request, env: Env): Promise<Response> {
  const body = await readJson<{ email?: string; phone?: string }>(request);
  const v = validateResume({ email: String(body.email ?? ''), phone: String(body.phone ?? '') });
  if (!v.ok) return json({ ok: false, error: 'validation_failed', fields: v.errors }, 422);

  const ipOk = await allow(env, `resume-ip:${clientKey(request)}`, 30, 900);
  const emailOk = await allow(env, `resume-email:${await sha256Hex(v.email)}`, 8, 900);
  if (!ipOk || !emailOk) return error(429, 'too_many_attempts');

  const student = await env.DB.prepare('SELECT id, research_code, full_name FROM students WHERE email = ? AND phone = ?')
    .bind(v.email, v.phone)
    .first<StudentRow>();
  if (!student) return error(404, 'no_match');
  const cookie = await startSession(env, student.id);
  return json({ ok: true, student: publicProfile(student) }, 200, { 'set-cookie': cookie });
}

/** GET /api/students/me — same device: who is signed in here? */
export async function me(request: Request, env: Env): Promise<Response> {
  const student = await currentStudent(request, env);
  return json({ ok: true, student: student ? publicProfile(student) : null });
}

/** POST /api/students/logout — "Not you?": ends this browser's session only. */
export async function logout(request: Request, env: Env): Promise<Response> {
  const token = readCookie(request, STUDENT_COOKIE);
  if (token) await env.DB.prepare('DELETE FROM device_sessions WHERE token_hash = ?').bind(await sha256Hex(token)).run();
  return json({ ok: true }, 200, { 'set-cookie': clearCookie(STUDENT_COOKIE, 'Lax') });
}
