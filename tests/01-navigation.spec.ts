import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const BASE_URL = 'https://rajeshmokaalla.github.io/badminton-tournament/';

test.describe('Navigation & Layout', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.navigate();
  });

  test('page loads successfully with 2xx status', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBeLessThan(400);
  });

  test('page title contains Badminton', async ({ page }) => {
    const title = await page.title();
    expect(title.toLowerCase()).toContain('badminton');
  });

  test('main app heading is visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.expectAppLoaded();
  });

  test('all primary section headings are present', async ({ page }) => {
    const home = new HomePage(page);
    await home.expectAllSectionHeadingsPresent();
  });

  test('Players section (1) is visible', async ({ page }) => {
    await expect(page.getByText('1. Players', { exact: false }).first()).toBeVisible();
  });

  test('Teams section (2) is visible', async ({ page }) => {
    await expect(page.getByText('2. Teams', { exact: false }).first()).toBeVisible();
  });

  test('Matches section (3) is visible', async ({ page }) => {
    await expect(page.getByText('3. Matches', { exact: false }).first()).toBeVisible();
  });

  test('Standings section (4) is visible', async ({ page }) => {
    await expect(page.getByText('4. Standings', { exact: false }).first()).toBeVisible();
  });

  test('Save to Cloud section (5) is visible', async ({ page }) => {
    await expect(page.getByText('5. Save to Cloud', { exact: false }).first()).toBeVisible();
  });

  test('Past Tournaments section is present', async ({ page }) => {
    await expect(page.getByText('Past Tournaments', { exact: false }).first()).toBeVisible();
  });

  test('Player Stats section is present', async ({ page }) => {
    await expect(page.getByText('Player Stats', { exact: false }).first()).toBeVisible();
  });

  test('Court Booking section is present', async ({ page }) => {
    await expect(page.getByText('Court Booking', { exact: false }).first()).toBeVisible();
  });

  test('Contact Us section is present', async ({ page }) => {
    await expect(page.getByText('Contact Us', { exact: false }).first()).toBeVisible();
  });

  test('Privacy Notice section is present', async ({ page }) => {
    await expect(page.getByText('Privacy Notice', { exact: false }).first()).toBeVisible();
  });

  test('Unlock Unlimited Saves section is present', async ({ page }) => {
    await expect(page.getByText('Unlock Unlimited Saves', { exact: false }).first()).toBeVisible();
  });

  test('Install app link is visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.expectInstallLinkPresent();
  });

  test('numbered sections appear in correct vertical order', async ({ page }) => {
    const labels = ['1. Players', '2. Teams', '3. Matches', '4. Standings', '5. Save to Cloud'];
    const yPositions: number[] = [];
    for (const label of labels) {
      const el = page.getByText(label, { exact: false }).first();
      const box = await el.boundingBox();
      yPositions.push(box?.y ?? 0);
    }
    for (let i = 1; i < yPositions.length; i++) {
      expect(yPositions[i]).toBeGreaterThan(yPositions[i - 1]);
    }
  });

  test('page has no critical console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const critical = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('sw.js') && !e.includes('ResizeObserver')
    );
    expect(critical).toHaveLength(0);
  });

  test('page has no broken images', async ({ page }) => {
    const imgs = page.locator('img');
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      const naturalWidth = await imgs.nth(i).evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });
});
