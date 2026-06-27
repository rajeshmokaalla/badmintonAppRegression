import { test, expect } from '@playwright/test';
import { AdminSection } from '../pages/AdminSection';
import { SUBSCRIPTION } from '../utils/test-data';

// adminPanel is auth-gated (display:none). Core checks use toBeAttached().
// Subscription price text and refund policy live outside adminPanel and are visible.

test.describe('Admin — Subscriptions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('adminPanel (#adminPanel) is attached to DOM', async ({ page }) => {
    const a = new AdminSection(page);
    await a.expectAdminPanelAttached();
  });

  test('adminPanel is initially hidden for non-admins', async ({ page }) => {
    const isVisible = await page.locator('#adminPanel').isVisible();
    expect(isVisible).toBe(false);
  });

  test('Subscription price USD $15 is displayed on page', async ({ page }) => {
    const a = new AdminSection(page);
    await a.expectSubscriptionPriceVisible();
  });

  test('Subscription duration 12 months is displayed', async ({ page }) => {
    await expect(page.getByText(SUBSCRIPTION.subscriptionMonths, { exact: false })).toBeVisible();
  });

  test('Refresh admin button (#refreshAdminBtn) is attached', async ({ page }) => {
    await expect(page.locator('#refreshAdminBtn')).toBeAttached();
  });

  test('Admin subscription list (#adminSubList) is attached', async ({ page }) => {
    await expect(page.locator('#adminSubList')).toBeAttached();
  });

  test('Refund policy text is visible on page', async ({ page }) => {
    await expect(page.getByText('refund', { exact: false })).toBeVisible();
  });

  test('3 business days refund window is stated', async ({ page }) => {
    await expect(page.getByText('3 business days', { exact: false })).toBeVisible();
  });

  // subSubmitBtn lives in subModal (the subscribe modal), which is display:none
  test('Submit Subscription button (#subSubmitBtn) is attached', async ({ page }) => {
    await expect(page.locator('#subSubmitBtn')).toBeAttached();
  });

  // Sign-in buttons in historyPanel/statsPanel are always visible
  test('Sign in with Google button exists on page', async ({ page }) => {
    const btns = page.locator('#loginFromHistoryBtn, #loginFromStatsBtn');
    expect(await btns.count()).toBeGreaterThanOrEqual(1);
  });
});
