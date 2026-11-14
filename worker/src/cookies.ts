/** Cookie helpers. Session cookies are HttpOnly (not readable by page scripts) and Secure. */

export const STUDENT_COOKIE = 'em_student';
export const TEACHER_COOKIE = 'em_teacher';
export const STUDENT_MAX_AGE = 60 * 60 * 24 * 365; // stay signed in on this device for a year
export const TEACHER_MAX_AGE = 60 * 60 * 12; // teacher sessions last 12 hours

export function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=') || null;
  }
  return null;
}

export function setCookie(name: string, value: string, maxAge: number, sameSite: 'Lax' | 'Strict'): string {
  return `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=${sameSite}`;
}

export function clearCookie(name: string, sameSite: 'Lax' | 'Strict'): string {
  return `${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=${sameSite}`;
}
