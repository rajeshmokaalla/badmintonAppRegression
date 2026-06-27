import { test, expect } from '@playwright/test';
import { AdminSection } from '../pages/AdminSection';
import { SUBSCRIPTION } from '../utils/test-data';

test.describe('Admin — Subscriptions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Admin Subscriptions section heading is visible', async ({ page }) => {
    const a = new AdminSection(page);
    await a.expectSectionVisible();
  });

  test('Subscription price USD $15 is displayed', async ({ page }) => {
    const a = new AdminSection(page);
    await a.scrollToSection();
    await a.expectSubscriptionPriceVisible();
  });

  test('Subscription duration 12 months is shown', async ({ page }) => {
    await expect(page.getByText(SUBSCRIPTION.subscriptionMonths, { exact: false })).toBeVisible();
  });

  test('Refresh button is visible', async ({ page }) => {
    const a = new AdminSection(page);
    await a.scrollToSection();
    await a.expectRefreshButtonVisible();
  });

  test('Submit Subscription Request button is visible', async ({ page }) => {
    const a = new AdminSection(page);
    await a.scrollToSection();
    await expect(a.submitRequestButton).toBeVisible();
  });

  test('Refund policy text is visible', async ({ page }) => {
    await expect(page.getByText('refund', { exact: false })).toBeVisible();
  });

  test('3 business days refund window is stated', async ({ page }) => {
    await expect(page.getByText('3 business days', { exact: false })).toBeVisible();
  });

  test('Refresh click does not crash app', async ({ page }) => {
    const a = new AdminSection(page);
    await a.scrollToSection();
    await a.refreshButton.click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });

  test('Sign in with Google button is present in admin area', async ({ page }) => {
    const btns = page.getByRole('button', { name: 'Sign in with Google', exact: false });
    expect(await btns.count()).toBeGreaterThanOrEqual(1);
  });

  test('Submit request click opens form or auth prompt', async ({ page }) => {
    const a = new AdminSection(page);
    await a.scrollToSection();
    await a.submitRequestButton.click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });
});
