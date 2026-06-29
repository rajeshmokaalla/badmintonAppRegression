import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// courtPanel is auth-gated: style="display:none" for unauthenticated users.
// All elements inside it are attached to DOM but not visible.
// Tests use toBeAttached() for presence checks and toBeVisible() only for
// elements that are guaranteed visible when the panel is open.
export class CourtBookingSection extends BasePage {
  readonly courtPanel: Locator;
  readonly groupMembersHeading: Locator;
  readonly addBookingHeading: Locator;
  readonly expensesHeading: Locator;
  readonly splitSummaryHeading: Locator;
  readonly pastSettlementsHeading: Locator;

  // Members
  readonly memberInput: Locator;
  readonly memberJoinDate: Locator;
  readonly addMemberButton: Locator;
  readonly memberList: Locator;
  readonly noMembersState: Locator;

  // Court booking form
  readonly bookingDate: Locator;
  readonly timeFrom: Locator;
  readonly timeTo: Locator;
  readonly paidBy: Locator;
  readonly bookingAmount: Locator;
  readonly bookingNote: Locator;
  readonly addBookingButton: Locator;
  readonly bookingSavedMsg: Locator;

  // Expense form
  readonly expenseDate: Locator;
  readonly expenseType: Locator;
  readonly expenseDesc: Locator;
  readonly expensePaidBy: Locator;
  readonly expenseAmount: Locator;
  readonly addExpenseButton: Locator;
  readonly expenseSavedMsg: Locator;

  // View entries by month
  readonly viewMonthInput: Locator;
  readonly loadButton: Locator;
  readonly clearMonthButton: Locator;
  readonly monthLoadStatus: Locator;
  readonly monthEntries: Locator;

  // Split summary
  readonly splitSection: Locator;
  readonly splitMonthLabel: Locator;
  readonly splitArea: Locator;

  // Archive
  readonly archiveSection: Locator;
  readonly archiveList: Locator;

  // Legacy alias kept for backward compat
  readonly shuttleButton: Locator;

  constructor(page: Page) {
    super(page);
    this.courtPanel             = page.locator('#courtPanel');
    this.groupMembersHeading    = page.locator('#courtPanel').getByText('Group Members', { exact: false });
    this.addBookingHeading      = page.locator('#courtPanel').getByText('Add Court Booking', { exact: false });
    this.expensesHeading        = page.locator('#courtPanel').getByText('Other Expenses', { exact: false });
    this.splitSummaryHeading    = page.locator('#courtPanel').getByText('Split Summary', { exact: false });
    this.pastSettlementsHeading = page.locator('#courtPanel').getByText('Past Settlements', { exact: false });

    // Members
    this.memberInput      = page.locator('#cbMemberInput');
    this.memberJoinDate   = page.locator('#cbMemberJoinDate');
    this.addMemberButton  = page.locator('#cbAddMemberBtn');
    this.memberList       = page.locator('#cbMemberList');
    this.noMembersState   = page.locator('#cbMemberEmpty');

    // Court booking form
    this.bookingDate      = page.locator('#cbDate');
    this.timeFrom         = page.locator('#cbTimeFrom');
    this.timeTo           = page.locator('#cbTimeTo');
    this.paidBy           = page.locator('#cbPaidBy');
    this.bookingAmount    = page.locator('#cbAmount');
    this.bookingNote      = page.locator('#cbNote');
    this.addBookingButton = page.locator('#cbAddBookingBtn');
    this.bookingSavedMsg  = page.locator('#cbBookingSavedMsg');

    // Expense form
    this.expenseDate      = page.locator('#cbExpDate');
    this.expenseType      = page.locator('#cbExpType');
    this.expenseDesc      = page.locator('#cbExpDesc');
    this.expensePaidBy    = page.locator('#cbExpPaidBy');
    this.expenseAmount    = page.locator('#cbExpAmount');
    this.addExpenseButton = page.locator('#cbAddExpBtn');
    this.expenseSavedMsg  = page.locator('#cbExpSavedMsg');

    // View entries by month
    this.viewMonthInput   = page.locator('#cbViewMonth');
    this.loadButton       = page.locator('#cbLoadMonthBtn');
    this.clearMonthButton = page.locator('#cbClearMonthBtn');
    this.monthLoadStatus  = page.locator('#cbMonthLoadStatus');
    this.monthEntries     = page.locator('#cbMonthEntries');

    // Split summary
    this.splitSection     = page.locator('#cbSplitSection');
    this.splitMonthLabel  = page.locator('#cbSplitMonthLabel');
    this.splitArea        = page.locator('#cbSplitArea');

    // Archive
    this.archiveSection   = page.locator('#cbArchiveSection');
    this.archiveList      = page.locator('#cbArchiveList');

    // Legacy alias
    this.shuttleButton    = this.expenseType;
  }

  async expectCourtPanelAttached(): Promise<void> {
    await expect(this.courtPanel).toBeAttached();
  }

  async expectSectionElementsAttached(): Promise<void> {
    // Members
    await expect(this.memberInput).toBeAttached();
    await expect(this.memberJoinDate).toBeAttached();
    await expect(this.addMemberButton).toBeAttached();
    await expect(this.memberList).toBeAttached();
    await expect(this.noMembersState).toBeAttached();

    // Court booking form
    await expect(this.bookingDate).toBeAttached();
    await expect(this.timeFrom).toBeAttached();
    await expect(this.timeTo).toBeAttached();
    await expect(this.paidBy).toBeAttached();
    await expect(this.bookingAmount).toBeAttached();
    await expect(this.bookingNote).toBeAttached();
    await expect(this.addBookingButton).toBeAttached();
    await expect(this.bookingSavedMsg).toBeAttached();

    // Expense form
    await expect(this.expenseDate).toBeAttached();
    await expect(this.expenseType).toBeAttached();
    await expect(this.expenseDesc).toBeAttached();
    await expect(this.expensePaidBy).toBeAttached();
    await expect(this.expenseAmount).toBeAttached();
    await expect(this.addExpenseButton).toBeAttached();
    await expect(this.expenseSavedMsg).toBeAttached();

    // View entries by month
    await expect(this.viewMonthInput).toBeAttached();
    await expect(this.loadButton).toBeAttached();
    await expect(this.clearMonthButton).toBeAttached();
    await expect(this.monthLoadStatus).toBeAttached();
    await expect(this.monthEntries).toBeAttached();

    // Split summary
    await expect(this.splitSection).toBeAttached();
    await expect(this.splitMonthLabel).toBeAttached();
    await expect(this.splitArea).toBeAttached();

    // Archive
    await expect(this.archiveSection).toBeAttached();
    await expect(this.archiveList).toBeAttached();
  }
}
