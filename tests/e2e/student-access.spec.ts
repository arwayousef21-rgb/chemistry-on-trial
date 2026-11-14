import { expect, test } from '@playwright/test';
import { newVisitor, registerViaApi, teacherRoster, uniqueEmail, uniqueIp, uniquePhone } from './helpers';

/** D15 student access flow: register → same device → new device (email + phone) → Not you? */

test('first registration creates one record, then the same device is recognised automatically', async ({ browser }) => {
  const ctx = await newVisitor(browser);
  const page = await ctx.newPage();
  await page.goto('/?lang=ar#/');
  await page.getByLabel('الاسم الكامل').fill('طالب تجريبي جديد');
  const email = uniqueEmail('ui');
  await page.getByLabel('البريد الإلكتروني').fill(email);
  await page.getByLabel('رقم الهاتف المحمول').fill('٠١٥١٢٣٤٥٦٧٨'); // Arabic digits are accepted
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'ابدأ مهمتك' }).click();
  await expect(page.locator('article')).toHaveCount(3); // the approved dashboard

  await page.reload();
  await expect(page.locator('article')).toHaveCount(3);
  await expect(page.getByLabel('الاسم الكامل')).toHaveCount(0); // not asked to register again
  await ctx.close();
});

test('field checks explain what is missing, in Arabic and English', async ({ browser }) => {
  const ctx = await newVisitor(browser);
  const page = await ctx.newPage();
  await page.goto('/?lang=en#/');
  await page.getByLabel('Mobile number').fill('01312345678');
  await page.getByRole('button', { name: 'Start your mission' }).click();
  await expect(page.getByText('Enter a valid 11-digit Egyptian mobile number')).toBeVisible();
  await expect(page.getByText('Please agree to the use of your details to continue.')).toBeVisible();
  await ctx.close();
});

test('new device: email + phone resume the SAME record; Not you? clears the session', async ({ browser, request }) => {
  const reg = await registerViaApi(request);
  expect(reg.res.status()).toBe(201);
  const code = (await reg.res.json()).student.researchCode;

  const ctx = await newVisitor(browser);
  const page = await ctx.newPage();
  await page.goto('/?lang=en#/');
  await page.getByRole('button', { name: 'I already have an account' }).click();
  await page.getByLabel('Email address').fill(reg.body.email.toUpperCase());
  await page.getByLabel('Mobile number').fill(`+20 ${reg.body.phone.slice(1)}`);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.locator('article')).toHaveCount(3);
  expect((await (await page.request.get('/api/students/me')).json()).student.researchCode).toBe(code);

  // Not you? → back to the welcome screen, session gone
  await page.getByRole('button', { name: /Not you\?/ }).click();
  await expect(page.getByLabel('Full name')).toBeVisible();
  expect((await (await page.request.get('/api/students/me')).json()).student).toBeNull();

  // still exactly one record for this email
  const roster = await teacherRoster(request);
  expect(roster.filter((s) => s.email === reg.body.email)).toHaveLength(1);
  await ctx.close();
});

test('new device with details that do not match shows a clear error and creates nothing', async ({ browser, request }) => {
  const reg = await registerViaApi(request);
  const ctx = await newVisitor(browser);
  const page = await ctx.newPage();
  await page.goto('/?lang=ar#/');
  await page.getByRole('button', { name: 'لدي حساب بالفعل' }).click();
  await page.getByLabel('البريد الإلكتروني').fill(reg.body.email);
  await page.getByLabel('رقم الهاتف المحمول').fill('01099999999');
  await page.getByRole('button', { name: 'متابعة', exact: true }).click();
  await expect(page.getByText('لم نجد حسابًا بهذه البيانات')).toBeVisible();

  const unknown = uniqueEmail('unknown');
  const res = await request.post('/api/students/resume', { data: { email: unknown, phone: uniquePhone() }, headers: { 'cf-connecting-ip': uniqueIp() } });
  expect(res.status()).toBe(404);
  expect(await res.json()).toEqual({ ok: false, error: 'no_match' }); // no details of anyone
  const roster = await teacherRoster(request);
  expect(roster.some((s) => s.email === unknown)).toBe(false);
  await ctx.close();
});

test('registering an email that already exists does not create a duplicate', async ({ browser, request }) => {
  const reg = await registerViaApi(request);
  const ctx = await newVisitor(browser);
  const page = await ctx.newPage();
  await page.goto('/?lang=en#/');
  await page.getByLabel('Full name').fill('Someone Else');
  await page.getByLabel('Email address').fill(reg.body.email);
  await page.getByLabel('Mobile number').fill(uniquePhone());
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Start your mission' }).click();
  await expect(page.getByText('This email is already registered.')).toBeVisible();
  const roster = await teacherRoster(request);
  expect(roster.filter((s) => s.email === reg.body.email)).toHaveLength(1);
  await ctx.close();
});

test('a shared phone number is allowed but flagged for the teacher', async ({ request }) => {
  const phone = uniquePhone();
  await registerViaApi(request, { phone });
  await registerViaApi(request, { phone, fullName: 'Sibling Student' });
  const roster = await teacherRoster(request);
  const matches = roster.filter((s) => s.phone === phone);
  expect(matches).toHaveLength(2);
  expect(matches.every((s) => s.phoneShared)).toBe(true);
});

test('the public interface never exposes other students', async ({ request }) => {
  const reg = await registerViaApi(request);
  const me = await (await request.get('/api/students/me')).json();
  expect(Object.keys(me.student).sort()).toEqual(['fullName', 'researchCode']); // own minimal profile only
  expect((await request.get('/api/teacher/students')).status()).toBe(401); // a student session is not a teacher session
  expect(reg.res.headers()['set-cookie']).toMatch(/HttpOnly; Secure; SameSite=Lax/);
});

test('resume attempts are rate-limited per address', async ({ request }) => {
  const ip = uniqueIp();
  const statuses: number[] = [];
  for (let i = 0; i < 9; i++) {
    const res = await request.post('/api/students/resume', { data: { email: 'limit.test@example.com', phone: '01000000009' }, headers: { 'cf-connecting-ip': ip } });
    statuses.push(res.status());
  }
  expect(statuses.slice(0, 8).every((s) => s === 404)).toBe(true);
  expect(statuses[8]).toBe(429);
});

test('cross-site and malformed requests are rejected', async ({ request }) => {
  const cross = await request.post('/api/students/resume', { data: { email: 'a@example.com', phone: '01000000001' }, headers: { origin: 'https://evil.example' } });
  expect(cross.status()).toBe(403);
  const form = await request.post('/api/students/register', { form: { fullName: 'A B' } });
  expect(form.status()).toBe(415);
  const bot = await request.post('/api/students/register', { data: { fullName: 'Bot Name', email: uniqueEmail('bot'), phone: uniquePhone(), consent: true, website: 'spam' } });
  expect(bot.status()).toBe(400);
});
