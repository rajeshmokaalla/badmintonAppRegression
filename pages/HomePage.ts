import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly appTitle: Locator;
  readonly installAppLink: Locator;

  constructor(page: Page) {
    super(page);
    this.appTitle = page.getByText('Badminton Tournament', { exact: false }).first();
    this.installAppLink = page.locator('#installBtn');
  }

  async expectAppLoaded(): Promise<void> {
    await expect(this.appTitle).toBeVisible();
  }

  // Only sections that are always visible (no auth required)
  async expectAllSectionHeadingsPresent(): Promise<void> {
    const alwaysVisible = ['1. Players', '2. Teams', '3. Matches', '4. Standings'];
    for (const h of alwaysVisible) {
      await expect(this.page.getByText(h, { exact: false }).first()).toBeVisible();
    }
    // Auth-gated panels exist in DOM but may be display:none
    await expect(this.page.locator('#cloudPanel')).toBeAttached();
    await expect(this.page.locator('#courtPanel')).toBeAttached();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async expectInstallLinkPresent(): Promise<void> {
    await expect(this.installAppLink).toBeVisible();
  }
}
