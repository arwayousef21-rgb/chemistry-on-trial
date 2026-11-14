import { defineConfig, devices } from '@playwright/test';

/**
 * Browser tests run against the real local stack: the built site + Worker API +
 * local D1 database (synthetic data), started by `wrangler dev`. No Cloudflare account.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  expect: {
    // Approved Stage 2 design: small tolerance for anti-aliasing differences between machines.
    toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: 'disabled' },
  },
  use: {
    baseURL: 'http://localhost:8787',
    trace: 'off',
  },
  webServer: {
    command: 'npm run db:migrate:local && npm run db:seed:local && npx wrangler dev --local --port 8787',
    url: 'http://localhost:8787/api/health',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
