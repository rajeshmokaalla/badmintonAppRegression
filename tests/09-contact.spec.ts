import { test, expect } from '@playwright/test';
import { ContactSection } from '../pages/ContactSection';

test.describe('Contact & Privacy', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Contact Us section heading is visible', async ({ page }) => {
    const c = new ContactSection(page);
    await c.expectSectionVisible();
  });

  test('Privacy Notice section is visible', async ({ page }) => {
    const c = new ContactSection(page);
    await c.expectPrivacySectionVisible();
  });

  test('Email link is present and uses mailto protocol', async ({ page }) => {
    const c = new ContactSection(page);
    await c.scrollToSection();
    await c.expectEmailLinkPresent();
  });

  // Refund policy lives in #subModal (display:none) — verify DOM presence only
  test('Refund policy text is in subModal', async ({ page }) => {
    await expect(page.locator('#subModal').getByText('Refund policy', { exact: false })).toBeAttached();
  });

  test('Saved automatically text is visible', async ({ page }) => {
    const c = new ContactSection(page);
    await c.expectSavedAutomaticallyTextVisible();
  });

  test('rajesh email address is shown in contact section', async ({ page }) => {
    const c = new ContactSection(page);
    await c.scrollToSection();
    await expect(page.getByText('rajesh', { exact: false }).first()).toBeVisible();
  });

  test('Phone links exist in contact section', async ({ page }) => {
    const c = new ContactSection(page);
    await c.scrollToSection();
    const phoneLinks = page.locator('a[href^="tel:"]');
    expect(await phoneLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test('India (+91) phone number is present', async ({ page }) => {
    const c = new ContactSection(page);
    await c.scrollToSection();
    await expect(page.getByText('+91', { exact: false })).toBeVisible();
  });

  test('Singapore (+65) phone number is present', async ({ page }) => {
    const c = new ContactSection(page);
    await c.scrollToSection();
    await expect(page.getByText('+65', { exact: false })).toBeVisible();
  });

  test('Privacy Notice mentions data', async ({ page }) => {
    // Scope to the visible Privacy Notice panel to avoid matching hidden panels first
    const privacyPanel = page.locator('.panel').filter({ hasText: 'Privacy Notice' });
    await expect(privacyPanel.getByText('data', { exact: false }).first()).toBeVisible();
  });

  test('Cloud sync via Supabase text is visible', async ({ page }) => {
    // Scope to .footer-note which is always visible
    await expect(page.locator('.footer-note').getByText('Supabase', { exact: false })).toBeVisible();
  });

  // 3 business days is inside #subModal (display:none) — verify DOM presence only
  test('3 business days refund window is in subModal', async ({ page }) => {
    await expect(page.locator('#subModal').getByText('3 business days', { exact: false })).toBeAttached();
  });
});
