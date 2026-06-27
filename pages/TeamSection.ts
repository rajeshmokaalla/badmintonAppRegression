import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TeamSection extends BasePage {
  readonly sectionHeading: Locator;
  // shuffleBtn text is set by JS to "Auto-assign & Start" (auto mode) or "Random" (manual mode)
  readonly autoAssignButton: Locator;
  readonly reshuffleButton: Locator;
  readonly doublesButton: Locator;
  readonly singlesButton: Locator;
  readonly mixedButton: Locator;
  readonly numberOfTeamsInput: Locator;
  readonly applyButton: Locator;
  readonly clearTeamsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('2. Teams', { exact: false }).first();
    this.autoAssignButton = page.locator('#shuffleBtn');
    this.reshuffleButton = page.locator('#reshuffleBtn');
    this.doublesButton = page.locator('#typeDoubles');
    this.singlesButton = page.locator('#typeSingles');
    this.mixedButton = page.locator('#typeMixed');
    this.numberOfTeamsInput = page.locator('#teamCountInput');
    this.applyButton = page.locator('#applyTeamCount');
    this.clearTeamsButton = page.locator('#clearTeamsBtn');
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async expectSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }

  async selectFormat(format: 'Doubles' | 'Singles' | 'Mixed'): Promise<void> {
    const map = { Doubles: '#typeDoubles', Singles: '#typeSingles', Mixed: '#typeMixed' };
    await this.page.locator(map[format]).click();
  }

  async setNumberOfTeams(n: string): Promise<void> {
    await this.numberOfTeamsInput.fill(n);
    await this.applyButton.click();
  }

  async expectAutoAssignVisible(): Promise<void> {
    await expect(this.autoAssignButton).toBeVisible();
  }
}
