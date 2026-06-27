import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CourtBookingSection extends BasePage {
  readonly sectionHeading: Locator;
  readonly groupMembersHeading: Locator;
  readonly addBookingHeading: Locator;
  readonly expensesHeading: Locator;
  readonly splitSummaryHeading: Locator;
  readonly addBookingButton: Locator;
  readonly addExpenseButton: Locator;
  readonly loadButton: Locator;
  readonly settleResetButton: Locator;
  readonly shuttleButton: Locator;
  readonly snacksButton: Locator;
  readonly miscButton: Locator;
  readonly noMembersState: Locator;

  constructor(page: Page) {
    super(page);
    this.sectionHeading = page.getByText('Court Booking', { exact: false }).first();
    this.groupMembersHeading = page.getByText('Group Members', { exact: false }).first();
    this.addBookingHeading = page.getByText('Add Court Booking', { exact: false }).first();
    this.expensesHeading = page.getByText('Other Expenses', { exact: false }).first();
    this.splitSummaryHeading = page.getByText('Split Summary', { exact: false }).first();
    this.addBookingButton = page.getByRole('button', { name: 'Add Booking', exact: false });
    this.addExpenseButton = page.getByRole('button', { name: 'Add Expense', exact: false });
    this.loadButton = page.getByRole('button', { name: 'Load', exact: false });
    this.settleResetButton = page.getByRole('button', { name: 'Mark as Settled', exact: false });
    this.shuttleButton = page.getByRole('button', { name: 'Shuttle', exact: false });
    this.snacksButton = page.getByRole('button', { name: 'Snacks', exact: false });
    this.miscButton = page.getByRole('button', { name: 'Miscellaneous', exact: false });
    this.noMembersState = page.getByText('No members yet', { exact: false });
  }

  async scrollToSection(): Promise<void> {
    await this.sectionHeading.scrollIntoViewIfNeeded();
  }

  async expectSectionVisible(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
  }

  async expectGroupMembersSectionVisible(): Promise<void> {
    await expect(this.groupMembersHeading).toBeVisible();
  }

  async expectExpenseCategoryButtonsVisible(): Promise<void> {
    await expect(this.shuttleButton).toBeVisible();
    await expect(this.snacksButton).toBeVisible();
    await expect(this.miscButton).toBeVisible();
  }

  async expectSplitSummaryVisible(): Promise<void> {
    await expect(this.splitSummaryHeading).toBeVisible();
  }

  async expectNoMembersState(): Promise<void> {
    await expect(this.noMembersState).toBeVisible();
  }
}
