import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TeamSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly autoAssignButton: Locator;
  readonly reshuffleButton: Locator;
  readonly nextPhaseButton: Locator;
  readonly doublesButton: Locator;
  readonly singlesButton: Locator;
  readonly mixedButton: Locator;
  readonly numberOfTeamsInput: Locator;
  readonly applyButton: Locator;
  readonly startTournamentButton: Locator;
  readonly clearTeamsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('2. Teams', { exact: false }).first();
    this.autoAssignButton = page.getByRole('button', { name: 'Auto-assign Teams', exact: false });
    this.reshuffleButton = page.getByRole('button', { name: 'Reshuffle Order', exact: false });
    this.nextPhaseButton = page.getByRole('button', { name: 'Next Phase', exact: false });
    this.doublesButton = page.getByText('Doubles', { exact: false }).first();
    this.singlesButton = page.getByText('Singles', { exact: false }).first();
    this.mixedButton = page.getByText('Mixed', { exact: false }).first();
    this.numberOfTeamsInput = page.locator('input[type="number"]').first();
    this.applyButton = page.getByRole('button', { name: 'Apply', exact: false });
    this.startTournamentButton = page.getByRole('button', { name: 'Start Tournament', exact: false });
    this.clearTeamsButton = page.getByRole('button', { name: 'Clear Teams', exact: false });
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async expectSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }

  async selectFormat(format: 'Doubles' | 'Singles' | 'Mixed'): Promise<void> {
    await this.page.getByText(format, { exact: false }).first().click();
  }

  async setNumberOfTeams(n: string): Promise<void> {
    await this.numberOfTeamsInput.fill(n);
    await this.applyButton.click();
  }

  async expectAutoAssignVisible(): Promise<void> {
    await expect(this.autoAssignButton).toBeVisible();
  }
}
