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

  // Only sections always visible without auth
  test('always-visible section headings are present', async ({ page }) => {
    const always = ['1. Players', '2. Teams', '3. Matches', '4. Standings', 'Player Stats', 'Contact Us'];
    for (const h of always) {
      await expect(page.getByText(h, { exact: false }).first()).toBeVisible();
    }
  });

  // Auth-gated sections exist in DOM but are display:none
  test('auth-gated sections are attached to DOM', async ({ page }) => {
    await expect(page.locator('#cloudPanel')).toBeAttached();
    await expect(page.locator('#courtPanel')).toBeAttached();
    await expect(page.locator('#adminPanel')).toBeAttached();
    await expect(page.locator('#subModal')).toBeAttached();
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

  // cloudPanel is display:none until tournament completes — check DOM presence
  test('Save to Cloud section (5) is attached to DOM', async ({ page }) => {
    await expect(page.locator('#cloudPanel')).toBeAttached();
    const heading = page.locator('#cloudPanel').getByText('Save to Cloud', { exact: false });
    await expect(heading).toBeAttached();
  });

  test('Past Tournaments section is visible', async ({ page }) => {
    await expect(page.locator('#historyPanel')).toBeVisible();
  });

  test('Player Stats section is visible', async ({ page }) => {
    await expect(page.locator('#statsPanel')).toBeVisible();
  });

  // courtPanel is display:none (auth-gated) — check DOM presence
  test('Court Booking section is attached to DOM', async ({ page }) => {
    await expect(page.locator('#courtPanel')).toBeAttached();
  });

  test('Contact Us section is visible', async ({ page }) => {
    await expect(page.getByText('Contact Us', { exact: false }).first()).toBeVisible();
  });

  test('Privacy Notice section is visible', async ({ page }) => {
    await expect(page.getByText('Privacy Notice', { exact: false }).first()).toBeVisible();
  });

  // subModal (Unlock Unlimited Saves) is display:none — check DOM presence
  test('Unlock Unlimited Saves modal is attached to DOM', async ({ page }) => {
    await expect(page.locator('#subModal')).toBeAttached();
  });

  test('Install app link is visible', async ({ page }) => {
    const home = new HomePage(page);
    await home.expectInstallLinkPresent();
  });

  // Only check always-visible sections for vertical order
  test('numbered sections appear in correct vertical order', async ({ page }) => {
    const labels = ['1. Players', '2. Teams', '3. Matches', '4. Standings'];
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
