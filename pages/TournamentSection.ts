import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TournamentSection extends BasePage {
  readonly matchesHeading: Locator;
  readonly standingsHeading: Locator;
  readonly undoButton: Locator;
  readonly exportButton: Locator;
  readonly playAgainButton: Locator;
  readonly resetButton: Locator;
  readonly saveTournamentButton: Locator;

  constructor(page: Page) {
    super(page);
    this.matchesHeading = page.getByText('3. Matches', { exact: false }).first();
    this.standingsHeading = page.getByText('4. Standings', { exact: false }).first();
    this.undoButton = page.getByRole('button', { name: 'Undo Last Edit', exact: false });
    this.exportButton = page.getByRole('button', { name: 'Export', exact: false });
    this.playAgainButton = page.getByRole('button', { name: 'Play Again', exact: false });
    this.resetButton = page.getByRole('button', { name: 'Reset Tournament', exact: false });
    this.saveTournamentButton = page.getByRole('button', { name: 'Save Tournament', exact: false });
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

  async expectSaveTournamentButtonVisible(): Promise<void> {
    await expect(this.saveTournamentButton).toBeVisible();
  }
}
