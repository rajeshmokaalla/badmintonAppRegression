import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rajeshmokaalla.github.io/badminton-tournament/';

const VIEWPORTS = [
  { name: 'mobile-sm', width: 375, height: 667 },
  { name: 'mobile-lg', width: 430, height: 932 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop-sm', width: 1280, height: 800 },
  { name: 'desktop-lg', width: 1920, height: 1080 },
];

test.describe('Responsive Design', () => {
  for (const vp of VIEWPORTS) {
    test(`app loads at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
    });

    test(`Players section scrolls into view at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      const heading = page.getByText('1. Players', { exact: false }).first();
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    });

    test(`Add button meets minimum touch target at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');
      const addBtn = page.getByRole('button', { name: 'Add', exact: true }).first();
      await addBtn.scrollIntoViewIfNeeded();
      const box = await addBtn.boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(24);
        expect(box.height).toBeGreaterThanOrEqual(24);
      }
    });
  }

  test('no horizontal scroll on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });

  test('all numbered sections visible on desktop (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    for (const label of ['1. Players', '2. Teams', '3. Matches', '4. Standings']) {
      const el = page.getByText(label, { exact: false }).first();
      await el.scrollIntoViewIfNeeded();
      await expect(el).toBeVisible();
    }
  });

  test('portrait and landscape on mobile both render correctly', async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();

    // Landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.waitForTimeout(300);
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });

  test('Contact Us section is reachable on mobile via scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const contact = page.getByText('Contact Us', { exact: false }).first();
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeVisible();
  });
});
