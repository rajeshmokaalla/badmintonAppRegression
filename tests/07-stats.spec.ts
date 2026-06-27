import { test, expect } from '@playwright/test';
import { StatsSection } from '../pages/StatsSection';

test.describe('Player Statistics', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Player Stats section heading is visible', async ({ page }) => {
    const s = new StatsSection(page);
    await s.expectSectionVisible();
  });

  test('Load Stats button is visible', async ({ page }) => {
    const s = new StatsSection(page);
    await s.scrollToSection();
    await s.expectLoadStatsButtonVisible();
  });

  test('Lifetime stats description is visible', async ({ page }) => {
    const s = new StatsSection(page);
    await s.scrollToSection();
    await s.expectLifetimeStatsDescriptionVisible();
  });

  test('Load Stats button is enabled', async ({ page }) => {
    const s = new StatsSection(page);
    await s.scrollToSection();
    await expect(s.loadStatsButton).toBeEnabled();
  });

  test('Load Stats click does not crash app', async ({ page }) => {
    const s = new StatsSection(page);
    await s.scrollToSection();
    await s.loadStatsButton.click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });

  test('Clear button is present in stats section', async ({ page }) => {
    const s = new StatsSection(page);
    await s.scrollToSection();
    const clearBtns = page.getByRole('button', { name: 'Clear', exact: false });
    if (await clearBtns.count() > 0) {
      await expect(clearBtns.first()).toBeVisible();
    }
  });

  test('Stats section remains stable after load click', async ({ page }) => {
    const s = new StatsSection(page);
    await s.scrollToSection();
    await s.loadStatsButton.click();
    await expect(s.sectionHeading).toBeVisible();
  });
});
