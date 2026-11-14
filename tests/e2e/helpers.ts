import type { APIRequestContext, Browser, BrowserContext } from '@playwright/test';

/** Synthetic, test-only teacher password (also in .dev.vars locally and the CI command). Not a real secret. */
export const TEST_TEACHER_PASSWORD = 'synthetic-local-teacher-passphrase';

let counter = 0;
const run = Date.now().toString(36);

/** A unique fake client address per test, so rate limits of one test never affect another. */
export const uniqueIp = () => `203.0.113.${(Date.now() + ++counter) % 250}-${run}-${counter}`;
export const uniqueEmail = (label = 'student') => `${label}.${run}.${++counter}@example.com`;

/** A unique valid synthetic Egyptian mobile number. */
export const uniquePhone = () => `015${String((Date.now() + ++counter * 7919) % 100_000_000).padStart(8, '0')}`;

export async function newVisitor(browser: Browser, opts: { width?: number; height?: number } = {}): Promise<BrowserContext> {
  return browser.newContext({
    viewport: { width: opts.width ?? 1536, height: opts.height ?? 1024 },
    extraHTTPHeaders: { 'cf-connecting-ip': uniqueIp() },
  });
}

export async function registerViaApi(request: APIRequestContext, overrides: Partial<{ fullName: string; email: string; phone: string }> = {}) {
  const body = { fullName: 'طالب تجريبي للاختبار', email: uniqueEmail(), phone: uniquePhone(), consent: true, website: '', ...overrides };
  // Each synthetic registration comes from its own fake address (registration is rate-limited per address).
  const res = await request.post('/api/students/register', { data: body, headers: { 'cf-connecting-ip': uniqueIp() } });
  return { res, body };
}

export async function teacherRoster(request: APIRequestContext) {
  const login = await request.post('/api/teacher/login', { data: { password: TEST_TEACHER_PASSWORD }, headers: { 'cf-connecting-ip': uniqueIp() } });
  if (!login.ok()) throw new Error(`teacher login failed: ${login.status()}`);
  const res = await request.get('/api/teacher/students');
  return (await res.json()).students as Array<{ email: string; phone: string; researchCode: string; phoneShared: boolean }>;
}
