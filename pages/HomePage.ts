import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly appTitle: Locator;
  readonly installAppLink: Locator;

  constructor(page: Page) {
    super(page);
    this.appTitle = page.getByText('Badminton Tournament', { exact: false }).first();
    this.installAppLink = page.getByText('Install app', { exact: false });
  }

  async expectAppLoaded(): Promise<void> {
    await expect(this.appTitle).toBeVisible();
  }

  async expectAllSectionHeadingsPresent(): Promise<void> {
    const headings = [
      '1. Players',
      '2. Teams',
      '3. Matches',
      '4. Standings',
      '5. Save to Cloud',
      'Player Stats',
      'Court Booking',
      'Contact Us',
    ];
    for (const h of headings) {
      await expect(this.page.getByText(h, { exact: false }).first()).toBeVisible();
    }
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async expectInstallLinkPresent(): Promise<void> {
    await expect(this.installAppLink).toBeVisible();
  }
}
