import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseURL = 'https://rajeshmokaalla.github.io/badminton-tournament/';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.baseURL);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async scrollTo(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  button(name: string): Locator {
    return this.page.getByRole('button', { name, exact: false });
  }

  input(placeholder: string): Locator {
    return this.page.locator(`input[placeholder*="${placeholder}" i]`);
  }
}
