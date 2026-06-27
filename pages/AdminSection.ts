import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly refreshButton: Locator;
  readonly submitRequestButton: Locator;
  readonly subscriptionPriceText: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('Admin', { exact: false }).first();
    this.refreshButton = page.getByRole('button', { name: 'Refresh', exact: false });
    this.submitRequestButton = page.getByRole('button', { name: 'Submit Subscription Request', exact: false });
    this.subscriptionPriceText = page.getByText('USD $15', { exact: false });
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async expectSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }

  async expectSubscriptionPriceVisible(): Promise<void> {
    await expect(this.subscriptionPriceText).toBeVisible();
  }

  async expectRefreshButtonVisible(): Promise<void> {
    await expect(this.refreshButton).toBeVisible();
  }
}
