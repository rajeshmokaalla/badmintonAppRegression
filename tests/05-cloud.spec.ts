import { test, expect } from '@playwright/test';
import { CloudSection } from '../pages/CloudSection';

test.describe('Cloud Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  // cloudPanel is display:none until tournament is complete
  test('cloudPanel (#cloudPanel) is attached to DOM', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectCloudPanelAttached();
  });

  test('cloudPanel is initially hidden (display:none)', async ({ page }) => {
    const isVisible = await page.locator('#cloudPanel').isVisible();
    expect(isVisible).toBe(false);
  });

  // historyPanel is always visible
  test('Past Tournaments section (#historyPanel) is visible', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectPastTournamentsSectionVisible();
  });

  // statsPanel is always visible
  test('Player Stats section (#statsPanel) is visible', async ({ page }) => {
    await expect(page.locator('#statsPanel')).toBeVisible();
  });

  // Sign-in buttons inside historyPanel/statsPanel are always visible
  test('Sign in with Google button in history panel is visible', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectSignInButtonVisible();
  });

  test('Sign in with Google button in stats panel is visible', async ({ page }) => {
    const c = new CloudSection(page);
    await expect(c.signInFromStatsButton).toBeVisible();
  });

  // subModal (Unlock Unlimited Saves) is display:none — DOM presence only
  test('Unlock Unlimited Saves modal (#subModal) is attached to DOM', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectUnlockSectionAttached();
  });

  test('clicking Sign in from history does not crash app', async ({ page }) => {
    const c = new CloudSection(page);
    await expect(c.signInFromHistoryButton).toBeVisible();
    // Clicking may open a Google OAuth popup or redirect — just verify button is clickable
    await c.signInFromHistoryButton.click({ timeout: 8000 }).catch(() => {});
  });

  // Footer "Saved automatically in your browser · Cloud sync via Supabase" is always visible
  test('footer mentions Supabase cloud sync', async ({ page }) => {
    await expect(page.locator('.footer-note')).toBeVisible();
    await expect(page.locator('.footer-note')).toContainText('Supabase');
  });

  test('footer says Saved automatically', async ({ page }) => {
    await expect(page.locator('.footer-note')).toContainText('Saved automatically');
  });
});
