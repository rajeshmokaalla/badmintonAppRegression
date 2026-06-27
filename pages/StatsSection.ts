import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class StatsSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly loadStatsButton: Locator;
  readonly lifetimeStatsText: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('Player Stats', { exact: false }).first();
    this.loadStatsButton = page.getByRole('button', { name: 'Load Stats', exact: false });
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
