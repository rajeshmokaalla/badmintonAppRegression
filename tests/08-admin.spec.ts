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

  // USD $15 lives in #subModal (display:none) — verify DOM presence only
  test('Subscription price USD $15 is in subModal', async ({ page }) => {
    await expect(page.locator('#subModal')).toBeAttached();
    await expect(page.locator('#subModal').getByText('USD $15', { exact: false })).toBeAttached();
  });

  // "12 months" appears in the visible Privacy Notice section
  test('Subscription duration 12 months is in Privacy Notice', async ({ page }) => {
    const privacyPanel = page.locator('.panel').filter({ hasText: 'Privacy Notice' });
    await expect(privacyPanel.getByText(SUBSCRIPTION.subscriptionMonths, { exact: false })).toBeVisible();
  });

  test('Refresh admin button (#refreshAdminBtn) is attached', async ({ page }) => {
    await expect(page.locator('#refreshAdminBtn')).toBeAttached();
  });

  test('Admin subscription list (#adminSubList) is attached', async ({ page }) => {
    await expect(page.locator('#adminSubList')).toBeAttached();
  });

  // Refund policy and 3 business days are inside #subModal (display:none)
  test('Refund policy text is in subModal', async ({ page }) => {
    await expect(page.locator('#subModal').getByText('Refund policy', { exact: false })).toBeAttached();
  });

  test('3 business days refund window is in subModal', async ({ page }) => {
    await expect(page.locator('#subModal').getByText('3 business days', { exact: false })).toBeAttached();
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
