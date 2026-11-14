import { expect, test, type Page } from '@playwright/test';

/**
 * Protects the approved Stage 2 design (D14, commit 35a77b9).
 * 1) Strict layout measurements at 1536×1024, identical on every machine because the fonts are bundled.
 * 2) Screenshot comparison against the approved baselines (small anti-aliasing tolerance).
 */
async function open(page: Page, lang: 'ar' | 'en', width = 1536, height = 1024) {
  await page.setViewportSize({ width, height });
  await page.goto(`/?lang=${lang}#/`);
  await page.evaluate(() => document.fonts.ready);
  // Wait until every illustration inside the visible screen has loaded
  // (images further down are lazy-loaded and are not needed for these checks).
  await page.waitForFunction(() =>
    [...document.images]
      .filter((i) => {
        const r = i.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
      })
      .every((i) => i.complete && i.naturalWidth > 0),
  );
}

const box = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right), height: Math.round(r.height) };
  });

for (const lang of ['ar', 'en'] as const) {
  test.describe(`approved dashboard layout (${lang})`, () => {
    test('navigation, EQUI strip and glassware fit the first desktop screen', async ({ page }) => {
      await open(page, lang);
      expect((await box(page, 'header')).height).toBe(84);
      expect((await box(page, 'section[aria-label^="EQUI"]')).bottom).toBeLessThanOrEqual(1024);
      expect((await box(page, 'aside [data-asset="lab-glassware"]')).bottom).toBeLessThanOrEqual(1024);
    });

    test('localized platform name and RTL/LTR direction', async ({ page }) => {
      await open(page, lang);
      await expect(page.locator('html')).toHaveAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      await expect(page.locator('header a').first()).toContainText(lang === 'ar' ? 'مهمة الاتزان' : 'THE EQUILIBRIUM MISSION');
    });

    test('EQUI robot never overlaps a pathway button', async ({ page }) => {
      await open(page, lang);
      const robot = await box(page, 'section[aria-label^="EQUI"] [data-asset="equi-robot"]');
      for (const btn of await page.locator('article button').all()) {
        const b = await btn.evaluate((el) => el.getBoundingClientRect().toJSON());
        const overlap = !(robot.right < b.left || robot.left > b.right || robot.bottom < b.top || robot.top > b.bottom);
        expect(overlap).toBe(false);
      }
    });

    test('phone layout has no horizontal scrolling and shows the full name', async ({ page }) => {
      await open(page, lang, 390, 844);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
      const name = page.locator('header a span span').first();
      expect(await name.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    });

    test('matches the approved desktop screenshot', async ({ page }) => {
      await open(page, lang);
      await expect(page).toHaveScreenshot(`dashboard-desktop-${lang}.png`);
    });

    test('matches the approved phone screenshot', async ({ page }) => {
      await open(page, lang, 390, 844);
      await expect(page).toHaveScreenshot(`dashboard-mobile-${lang}.png`);
    });
  });
}

test('Arabic corrective pathway title stays on one line', async ({ page }) => {
  await open(page, 'ar');
  const title = page.locator('article h2').nth(1).locator('span').last();
  const lines = await title.evaluate((el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)));
  expect(lines).toBe(1);
});
