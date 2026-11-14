import { expect, test } from '@playwright/test';
import { TEST_TEACHER_PASSWORD, newVisitor, uniqueIp } from './helpers';

test('teacher signs in with the password, sees the register, and signs out', async ({ browser }) => {
  const ctx = await newVisitor(browser);
  const page = await ctx.newPage();
  await page.goto('/?lang=ar#/teacher');
  await page.getByLabel('كلمة مرور المعلمة').fill('wrong-password-value');
  await page.getByRole('button', { name: 'دخول' }).click();
  await expect(page.getByText('كلمة المرور غير صحيحة.')).toBeVisible();

  await page.getByLabel('كلمة مرور المعلمة').fill(TEST_TEACHER_PASSWORD);
  await page.getByRole('button', { name: 'دخول' }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByText('synthetic.student1@example.com')).toBeVisible();

  await page.getByRole('button', { name: 'تسجيل الخروج' }).click();
  await expect(page.getByLabel('كلمة مرور المعلمة')).toBeVisible();
  expect((await page.request.get('/api/teacher/students')).status()).toBe(401);
  await ctx.close();
});

test('teacher data and functions are protected', async ({ request }) => {
  expect((await request.get('/api/teacher/students')).status()).toBe(401);
  const login = await request.post('/api/teacher/login', { data: { password: TEST_TEACHER_PASSWORD }, headers: { 'cf-connecting-ip': uniqueIp() } });
  expect(login.headers()['set-cookie']).toMatch(/em_teacher=.+HttpOnly; Secure; SameSite=Strict/);
});

test('teacher sign-in is rate-limited (5 attempts per 15 minutes per address)', async ({ request }) => {
  const ip = uniqueIp();
  const statuses: number[] = [];
  for (let i = 0; i < 6; i++) {
    statuses.push((await request.post('/api/teacher/login', { data: { password: 'guess' }, headers: { 'cf-connecting-ip': ip } })).status());
  }
  expect(statuses).toEqual([401, 401, 401, 401, 401, 429]);
});

test('the teacher password never appears in the website code', async ({ request }) => {
  const html = await (await request.get('/')).text();
  const scripts = [...html.matchAll(/src="([^"]+\.js)"/g)].map((m) => m[1]);
  expect(scripts.length).toBeGreaterThan(0);
  for (const src of scripts) {
    const js = await (await request.get(src)).text();
    expect(js).not.toContain(TEST_TEACHER_PASSWORD);
    expect(js).not.toContain('TEACHER_PASSWORD');
  }
});
