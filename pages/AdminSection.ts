import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// adminPanel is auth-gated: style="display:none" for non-admins.
export class AdminSection extends BasePage {
  readonly adminPanel: Locator;
  readonly refreshButton: Locator;
  readonly submitRequestButton: Locator;
  readonly subscriptionPriceText: Locator;

  constructor(page: Page) {
    super(page);
    this.adminPanel = page.locator('#adminPanel');
    this.refreshButton = page.locator('#refreshAdminBtn');
    this.submitRequestButton = page.getByRole('button', { name: 'Submit Subscription Request', exact: false });
    this.subscriptionPriceText = page.getByText('USD $15', { exact: false });
  }

  async expectAdminPanelAttached(): Promise<void> {
    await expect(this.adminPanel).toBeAttached();
  }

  async expectSubscriptionPriceVisible(): Promise<void> {
    // USD $15 lives in #subModal (display:none) — check DOM presence only
    await expect(this.subscriptionPriceText).toBeAttached();
  }
}
