import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CloudSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly signInButton: Locator;
  readonly pastTournamentsHeading: Locator;
  readonly unlockSavesHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('5. Save to Cloud', { exact: false }).first();
    this.signInButton = page.getByRole('button', { name: 'Sign in with Google', exact: false }).first();
    this.pastTournamentsHeading = page.getByText('Past Tournaments', { exact: false }).first();
    this.unlockSavesHeading = page.getByText('Unlock Unlimited Saves', { exact: false });
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async expectCloudSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }

  async expectSignInButtonVisible(): Promise<void> {
    await expect(this.signInButton).toBeVisible();
  }

  async expectPastTournamentsSectionVisible(): Promise<void> {
    await expect(this.pastTournamentsHeading).toBeVisible();
  }

  async expectUnlockSectionVisible(): Promise<void> {
    await expect(this.unlockSavesHeading).toBeVisible();
  }
}
