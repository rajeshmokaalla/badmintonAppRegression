import { test, expect } from '@playwright/test';
import { StatsSection } from '../pages/StatsSection';

test.describe('Player Statistics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('statsPanel (#statsPanel) is visible', async ({ page }) => {
    const s = new StatsSection(page);
    await s.expectSectionVisible();
  });

  // #loadStatsBtn is inside #statsAuthArea (display:none for unauthenticated users)
  test('Load Stats button (#loadStatsBtn) is attached to DOM', async ({ page }) => {
    const s = new StatsSection(page);
    await expect(s.loadStatsButton).toBeAttached();
  });

  test('Lifetime stats description is visible', async ({ page }) => {
    const s = new StatsSection(page);
    await s.scrollToSection();
    await s.expectLifetimeStatsDescriptionVisible();
  });

  test('Load Stats button is attached', async ({ page }) => {
    const s = new StatsSection(page);
    await expect(s.loadStatsButton).toBeAttached();
  });

  test('Clear Stats button (#clearStatsBtn) is attached', async ({ page }) => {
    await expect(page.locator('#clearStatsBtn')).toBeAttached();
  });

  // #loadStatsBtn is hidden for unauthenticated users — verify statsPanel is stable without clicking
  test('statsPanel is visible after page load', async ({ page }) => {
    const s = new StatsSection(page);
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
    await expect(s.sectionHeading).toBeVisible();
  });

  test('statsPanel remains visible on page', async ({ page }) => {
    const s = new StatsSection(page);
    await expect(s.sectionHeading).toBeVisible();
  });
});
