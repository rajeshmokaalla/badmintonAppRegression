import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TournamentSection extends BasePage {
  readonly matchesHeading: Locator;
  readonly standingsHeading: Locator;
  readonly undoButton: Locator;
  readonly exportButton: Locator;
  // playAgainBtn and saveCloudBtn are display:none until specific game states
  readonly playAgainButton: Locator;
  readonly resetButton: Locator;
  readonly saveTournamentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.matchesHeading = page.getByText('3. Matches', { exact: false }).first();
    this.standingsHeading = page.getByText('4. Standings', { exact: false }).first();
    this.undoButton = page.locator('#undoBtn');
    this.exportButton = page.locator('#exportBtn');
    this.playAgainButton = page.locator('#playAgainBtn');
    this.resetButton = page.locator('#resetBtn');
    this.saveTournamentButton = page.locator('#saveCloudBtn');
  }

  async expectMatchesSectionVisible(): Promise<void> {
    await expect(this.matchesHeading).toBeVisible();
  }

  async expectStandingsSectionVisible(): Promise<void> {
    await expect(this.standingsHeading).toBeVisible();
  }

  async expectUndoButtonVisible(): Promise<void> {
    await expect(this.undoButton).toBeVisible();
  }

  async expectExportButtonVisible(): Promise<void> {
    await expect(this.exportButton).toBeVisible();
  }

  // cloudPanel (Save to Cloud) is display:none until tournament completes
  async expectSaveTournamentButtonAttached(): Promise<void> {
    await expect(this.saveTournamentButton).toBeAttached();
  }

  // playAgainBtn is display:none until tournament is over
  async expectPlayAgainButtonAttached(): Promise<void> {
    await expect(this.playAgainButton).toBeAttached();
  }
}
