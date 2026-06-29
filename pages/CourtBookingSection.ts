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
  readonly addMemberButton: Locator;
  readonly addBookingButton: Locator;
  readonly addExpenseButton: Locator;
  readonly loadButton: Locator;
  readonly clearMonthButton: Locator;
  readonly splitArea: Locator;
  readonly splitSection: Locator;
  readonly archiveSection: Locator;
  readonly archiveList: Locator;
  readonly shuttleButton: Locator;
  readonly noMembersState: Locator;

  constructor(page: Page) {
    super(page);
    this.courtPanel           = page.locator('#courtPanel');
    this.groupMembersHeading  = page.locator('#courtPanel').getByText('Group Members', { exact: false });
    this.addBookingHeading    = page.locator('#courtPanel').getByText('Add Court Booking', { exact: false });
    this.expensesHeading      = page.locator('#courtPanel').getByText('Other Expenses', { exact: false });
    this.splitSummaryHeading  = page.locator('#courtPanel').getByText('Split Summary', { exact: false });
    this.pastSettlementsHeading = page.locator('#courtPanel').getByText('Past Settlements', { exact: false });
    this.addMemberButton      = page.locator('#cbAddMemberBtn');
    this.addBookingButton     = page.locator('#cbAddBookingBtn');
    this.addExpenseButton     = page.locator('#cbAddExpBtn');
    this.loadButton           = page.locator('#cbLoadMonthBtn');
    this.clearMonthButton     = page.locator('#cbClearMonthBtn');
    this.splitArea            = page.locator('#cbSplitArea');
    this.splitSection         = page.locator('#cbSplitSection');
    this.archiveSection       = page.locator('#cbArchiveSection');
    this.archiveList          = page.locator('#cbArchiveList');
    this.shuttleButton        = page.locator('#cbExpType');
    this.noMembersState       = page.locator('#cbMemberEmpty');
  }

  async expectCourtPanelAttached(): Promise<void> {
    await expect(this.courtPanel).toBeAttached();
  }

  async expectSectionElementsAttached(): Promise<void> {
    await expect(this.addMemberButton).toBeAttached();
    await expect(this.addBookingButton).toBeAttached();
    await expect(this.addExpenseButton).toBeAttached();
    await expect(this.loadButton).toBeAttached();
    await expect(this.clearMonthButton).toBeAttached();
    await expect(this.splitSection).toBeAttached();
    await expect(this.archiveSection).toBeAttached();
  }
}
