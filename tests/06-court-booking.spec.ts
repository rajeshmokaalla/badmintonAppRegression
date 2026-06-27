import { test, expect } from '@playwright/test';
import { CourtBookingSection } from '../pages/CourtBookingSection';

// courtPanel is auth-gated (display:none). All tests verify DOM presence
// (toBeAttached) rather than visual visibility. Interactive tests are skipped.

test.describe('Court Booking & Split', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('courtPanel (#courtPanel) is attached to DOM', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.expectCourtPanelAttached();
  });

  test('courtPanel is initially hidden for unauthenticated users', async ({ page }) => {
    const isVisible = await page.locator('#courtPanel').isVisible();
    expect(isVisible).toBe(false);
  });

  test('Court Booking heading is inside courtPanel', async ({ page }) => {
    const heading = page.locator('#courtPanel').getByText('Court Booking', { exact: false });
    await expect(heading).toBeAttached();
  });

  test('Group Members heading is inside courtPanel', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await expect(b.groupMembersHeading).toBeAttached();
  });

  test('Add Court Booking heading is inside courtPanel', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await expect(b.addBookingHeading).toBeAttached();
  });

  test('Other Expenses heading is inside courtPanel', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await expect(b.expensesHeading).toBeAttached();
  });

  test('Split Summary heading is inside courtPanel', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await expect(b.splitSummaryHeading).toBeAttached();
  });

  test('Add Member button (#cbAddMemberBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbAddMemberBtn')).toBeAttached();
  });

  test('Add Booking button (#cbAddBookingBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbAddBookingBtn')).toBeAttached();
  });

  test('Add Expense button (#cbAddExpBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbAddExpBtn')).toBeAttached();
  });

  test('Load month button (#cbLoadMonthBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbLoadMonthBtn')).toBeAttached();
  });

  test('Settle & Reset button (#cbSettleBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbSettleBtn')).toBeAttached();
  });

  test('No members yet state (#cbMemberEmpty) is attached', async ({ page }) => {
    await expect(page.locator('#cbMemberEmpty')).toBeAttached();
  });

  test('Expense type selector (#cbExpType) is attached', async ({ page }) => {
    await expect(page.locator('#cbExpType')).toBeAttached();
  });

  test('Member name input (#cbMemberInput) is attached', async ({ page }) => {
    await expect(page.locator('#cbMemberInput')).toBeAttached();
  });

  test('Booking amount input (#cbAmount) is attached', async ({ page }) => {
    await expect(page.locator('#cbAmount')).toBeAttached();
  });

  test('all core court booking elements present in DOM', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.expectSectionElementsAttached();
  });
});
