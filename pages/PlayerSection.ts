import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlayerSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly playerInput: Locator;
  readonly addButton: Locator;
  readonly clearAllButton: Locator;
  readonly pointsSelector: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('1. Players', { exact: false }).first();
    this.playerInput = page
      .locator('input[type="text"], input:not([type])')
      .filter({ hasNot: page.locator('[type="number"]') })
      .first();
    this.addButton = page.getByRole('button', { name: 'Add', exact: true }).first();
    this.clearAllButton = page.getByRole('button', { name: 'Clear All', exact: false }).first();
    this.pointsSelector = page.locator('select').first();
    this.emptyState = page.getByText('No players added yet', { exact: false });
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async addPlayer(name: string): Promise<void> {
    await this.playerInput.fill(name);
    await this.addButton.click();
  }

  async addPlayerViaEnter(name: string): Promise<void> {
    await this.playerInput.fill(name);
    await this.playerInput.press('Enter');
  }

  async clearAllPlayers(): Promise<void> {
    await this.clearAllButton.click();
  }

  async expectEmptyState(): Promise<void> {
    await expect(this.emptyState).toBeVisible();
  }

  async expectPlayerInList(name: string): Promise<void> {
    await expect(this.page.getByText(name, { exact: false })).toBeVisible();
  }

  async getPlayerListItems(): Promise<Locator> {
    return this.page.locator('ul li').filter({ hasText: /[A-Za-z]/ });
  }

  async expectSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }
}
