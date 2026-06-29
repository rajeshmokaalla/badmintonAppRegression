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
    const heading = page.locator('#courtPanel h2').first();
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

  test('Past Settlements heading is inside courtPanel', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await expect(b.pastSettlementsHeading).toBeAttached();
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

  test('Clear month button (#cbClearMonthBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbClearMonthBtn')).toBeAttached();
  });

  // #cbSettleBtn no longer exists as a static element — per-member "Mark Settled"
  // buttons are rendered dynamically inside #cbSplitArea when settlements exist.
  // Verify the split area container (static) is attached instead.
  test('Split area container (#cbSplitArea) is attached', async ({ page }) => {
    await expect(page.locator('#cbSplitArea')).toBeAttached();
  });

  test('Split section (#cbSplitSection) is attached to DOM', async ({ page }) => {
    await expect(page.locator('#cbSplitSection')).toBeAttached();
  });

  // Static global settle button is gone — confirm it does NOT exist in the DOM
  test('Global settle button (#cbSettleBtn) is not statically present in DOM', async ({ page }) => {
    const count = await page.locator('#cbSettleBtn').count();
    expect(count).toBe(0);
  });

  // Past Settlements archive section — hidden until archives exist, but always in DOM
  test('Past Settlements section (#cbArchiveSection) is attached to DOM', async ({ page }) => {
    await expect(page.locator('#cbArchiveSection')).toBeAttached();
  });

  test('Past Settlements list (#cbArchiveList) is attached to DOM', async ({ page }) => {
    await expect(page.locator('#cbArchiveList')).toBeAttached();
  });

  test('Past Settlements section is initially hidden for unauthenticated users', async ({ page }) => {
    const isVisible = await page.locator('#cbArchiveSection').isVisible();
    expect(isVisible).toBe(false);
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
