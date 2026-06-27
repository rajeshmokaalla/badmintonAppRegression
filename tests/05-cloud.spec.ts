import { test, expect } from '@playwright/test';
import { CloudSection } from '../pages/CloudSection';

test.describe('Cloud Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Save to Cloud section heading is visible', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectCloudSectionVisible();
  });

  test('Sign in with Google button is visible', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectSignInButtonVisible();
  });

  test('Past Tournaments section is visible', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectPastTournamentsSectionVisible();
  });

  test('Unlock Unlimited Saves section is visible', async ({ page }) => {
    const c = new CloudSection(page);
    await c.expectUnlockSectionVisible();
  });

  test('Sign in button is enabled before authentication', async ({ page }) => {
    const c = new CloudSection(page);
    await expect(c.signInButton).toBeEnabled();
  });

  test('clicking Sign in with Google does not crash app', async ({ page }) => {
    const c = new CloudSection(page);
    const [popup] = await Promise.all([
      page.waitForEvent('popup', { timeout: 5000 }).catch(() => null),
      c.signInButton.click(),
    ]);
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
    if (popup) await popup.close();
  });

  test('Supabase is mentioned as cloud sync provider', async ({ page }) => {
    await expect(page.getByText('Supabase', { exact: false })).toBeVisible();
  });

  test('Saved automatically text is visible', async ({ page }) => {
    await expect(page.getByText('Saved automatically', { exact: false })).toBeVisible();
  });

  test('at least one Sign in with Google button exists on page', async ({ page }) => {
    const btns = page.getByRole('button', { name: 'Sign in with Google', exact: false });
    expect(await btns.count()).toBeGreaterThanOrEqual(1);
  });
});
