import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly privacyHeading: Locator;
  readonly emailLink: Locator;
  readonly refundPolicyText: Locator;
  readonly savedAutomaticallyText: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('Contact Us', { exact: false }).first();
    this.privacyHeading = page.getByText('Privacy Notice', { exact: false }).first();
    this.emailLink = page.locator('a[href^="mailto:"]').first();
    this.refundPolicyText = page.getByText('full refund', { exact: false });
    this.savedAutomaticallyText = page.getByText('Saved automatically', { exact: false });
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async expectSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }

  async expectPrivacySectionVisible(): Promise<void> {
    await expect(this.privacyHeading).toBeVisible();
  }

  async expectEmailLinkPresent(): Promise<void> {
    await expect(this.emailLink).toBeVisible();
    const href = await this.emailLink.getAttribute('href');
    expect(href).toContain('mailto:');
  }

  async expectRefundPolicyVisible(): Promise<void> {
    await expect(this.refundPolicyText).toBeVisible();
  }

  async expectSavedAutomaticallyTextVisible(): Promise<void> {
    await expect(this.savedAutomaticallyText).toBeVisible();
  }
}
