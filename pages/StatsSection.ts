import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class StatsSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly loadStatsButton: Locator;
  readonly lifetimeStatsText: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.locator('#statsPanel');
    this.loadStatsButton = page.locator('#loadStatsBtn');
    this.lifetimeStatsText = page.getByText('Lifetime stats', { exact: false });
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async expectSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }

  async expectLoadStatsButtonVisible(): Promise<void> {
    await expect(this.loadStatsButton).toBeVisible();
  }

  async expectLifetimeStatsDescriptionVisible(): Promise<void> {
    await expect(this.lifetimeStatsText).toBeVisible();
  }
}
