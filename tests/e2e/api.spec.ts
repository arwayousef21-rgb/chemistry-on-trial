import { expect, test } from '@playwright/test';

test.describe('local API and database (synthetic data)', () => {
  test('health check reaches the D1 database', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    expect(res.headers()['cache-control']).toBe('no-store');
    expect(res.headers()['access-control-allow-origin']).toBeUndefined();
    expect(await res.json()).toMatchObject({ ok: true, db: 'ok', schemaVersion: '2', dataset: 'synthetic' });
  });

  test('unknown routes and wrong methods are rejected', async ({ request }) => {
    expect((await request.get('/api/does-not-exist')).status()).toBe(404);
    expect((await request.post('/api/health')).status()).toBe(405);
  });

  test('the approved site is served with the platform name', async ({ page }) => {
    await page.goto('/?lang=ar#/');
    await expect(page).toHaveTitle('مهمة الاتزان – THE EQUILIBRIUM MISSION');
  });
});
