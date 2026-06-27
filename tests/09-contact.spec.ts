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

  test('Refund policy text is visible', async ({ page }) => {
    const c = new ContactSection(page);
    await c.scrollToSection();
    await c.expectRefundPolicyVisible();
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
    const c = new ContactSection(page);
    await c.scrollToSection();
    await expect(page.getByText('data', { exact: false }).first()).toBeVisible();
  });

  test('Cloud sync via Supabase text is visible', async ({ page }) => {
    await expect(page.getByText('Supabase', { exact: false })).toBeVisible();
  });

  test('3 business days refund window is stated', async ({ page }) => {
    const c = new ContactSection(page);
    await c.scrollToSection();
    await expect(page.getByText('3 business days', { exact: false })).toBeVisible();
  });
});
