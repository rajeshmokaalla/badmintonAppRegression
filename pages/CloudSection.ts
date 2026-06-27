import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CloudSection extends BasePage {
  // cloudPanel is display:none until tournament completes — use toBeAttached()
  readonly cloudPanel: Locator;
  // historyPanel and statsPanel are always visible and contain sign-in buttons
  readonly pastTournamentsHeading: Locator;
  readonly signInFromHistoryButton: Locator;
  readonly signInFromStatsButton: Locator;
  // subModal (Unlock Unlimited Saves) is display:none — use toBeAttached()
  readonly unlockSavesModal: Locator;

  constructor(page: Page) {
    super(page);
    this.cloudPanel = page.locator('#cloudPanel');
    this.pastTournamentsHeading = page.locator('#historyPanel').getByText('Past Tournaments', { exact: false });
    this.signInFromHistoryButton = page.locator('#loginFromHistoryBtn');
    this.signInFromStatsButton = page.locator('#loginFromStatsBtn');
    this.unlockSavesModal = page.locator('#subModal');
  }

  async expectCloudPanelAttached(): Promise<void> {
    await expect(this.cloudPanel).toBeAttached();
  }

  async expectPastTournamentsSectionVisible(): Promise<void> {
    await expect(this.pastTournamentsHeading).toBeVisible();
  }

  async expectSignInButtonVisible(): Promise<void> {
    // historyPanel is always rendered — its sign-in button is visible
    await expect(this.signInFromHistoryButton).toBeVisible();
  }

  async expectUnlockSectionAttached(): Promise<void> {
    await expect(this.unlockSavesModal).toBeAttached();
  }
}
