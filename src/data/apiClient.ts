/**
 * Same-origin API client. Session cookies are HttpOnly: page scripts never see them,
 * the browser sends them automatically.
 */
import type { RegistrationErrors } from '@shared/validation';

export interface HealthResponse {
  ok: boolean;
  app: string;
  env: string;
  db: 'ok' | 'unavailable';
  schemaVersion: string | null;
  dataset: string | null;
}

export interface StudentProfile {
  fullName: string;
  researchCode: string;
}

export interface TeacherStudentRow {
  researchCode: string;
  fullName: string;
  email: string;
  phone: string;
  phoneShared: boolean;
  registeredAt: string;
  lastActiveAt: string;
}

/** Result of an API call: either data or a stable error code (plus field errors for forms). */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; status: number; error: string; fields?: RegistrationErrors };

async function call<T>(path: string, init?: { method?: string; body?: unknown; signal?: AbortSignal }): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, {
      method: init?.method ?? 'GET',
      credentials: 'same-origin',
      headers: init?.body !== undefined ? { 'content-type': 'application/json', accept: 'application/json' } : { accept: 'application/json' },
      body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
      signal: init?.signal,
    });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (res.ok && json.ok !== false) return { ok: true, data: json as T };
    return { ok: false, status: res.status, error: String(json.error ?? 'unknown_error'), fields: json.fields as RegistrationErrors | undefined };
  } catch {
    return { ok: false, status: 0, error: 'network_error' };
  }
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse | null> {
  const r = await call<HealthResponse>('/api/health', { signal });
  return r.ok ? r.data : null;
}

export const api = {
  me: () => call<{ student: StudentProfile | null }>('/api/students/me'),
  register: (body: { fullName: string; email: string; phone: string; consent: boolean; website: string }) =>
    call<{ student: StudentProfile }>('/api/students/register', { method: 'POST', body }),
  resume: (body: { email: string; phone: string }) => call<{ student: StudentProfile }>('/api/students/resume', { method: 'POST', body }),
  logout: () => call<{ ok: true }>('/api/students/logout', { method: 'POST', body: {} }),
  teacherSession: () => call<{ signedIn: boolean; configured: boolean }>('/api/teacher/session'),
  teacherLogin: (password: string) => call<{ ok: true }>('/api/teacher/login', { method: 'POST', body: { password } }),
  teacherLogout: () => call<{ ok: true }>('/api/teacher/logout', { method: 'POST', body: {} }),
  teacherStudents: () => call<{ students: TeacherStudentRow[]; generatedAt: string }>('/api/teacher/students'),
};
