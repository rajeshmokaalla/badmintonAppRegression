import { test, expect } from '@playwright/test';
import { CourtBookingSection } from '../pages/CourtBookingSection';

// courtPanel is auth-gated (display:none). All tests verify DOM presence
// (toBeAttached) rather than visual visibility. Interactive tests are skipped.

test.describe('Court Booking & Split', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  // ── Panel ──────────────────────────────────────────────────────────────────

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

  // ── Section headings ───────────────────────────────────────────────────────

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

  // ── Members form ───────────────────────────────────────────────────────────

  test('Member name input (#cbMemberInput) is attached', async ({ page }) => {
    await expect(page.locator('#cbMemberInput')).toBeAttached();
  });

  test('Member join date input (#cbMemberJoinDate) is attached', async ({ page }) => {
    await expect(page.locator('#cbMemberJoinDate')).toBeAttached();
  });

  test('Member join date input is of type date', async ({ page }) => {
    const type = await page.locator('#cbMemberJoinDate').getAttribute('type');
    expect(type).toBe('date');
  });

  test('Add Member button (#cbAddMemberBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbAddMemberBtn')).toBeAttached();
  });

  test('Member list container (#cbMemberList) is attached', async ({ page }) => {
    await expect(page.locator('#cbMemberList')).toBeAttached();
  });

  test('No members yet state (#cbMemberEmpty) is attached', async ({ page }) => {
    await expect(page.locator('#cbMemberEmpty')).toBeAttached();
  });

  // ── Court booking form ─────────────────────────────────────────────────────

  test('Booking date input (#cbDate) is attached', async ({ page }) => {
    await expect(page.locator('#cbDate')).toBeAttached();
  });

  test('Booking date input is of type date', async ({ page }) => {
    const type = await page.locator('#cbDate').getAttribute('type');
    expect(type).toBe('date');
  });

  test('Time From input (#cbTimeFrom) is attached', async ({ page }) => {
    await expect(page.locator('#cbTimeFrom')).toBeAttached();
  });

  test('Time To input (#cbTimeTo) is attached', async ({ page }) => {
    await expect(page.locator('#cbTimeTo')).toBeAttached();
  });

  test('Paid By selector (#cbPaidBy) is attached', async ({ page }) => {
    await expect(page.locator('#cbPaidBy')).toBeAttached();
  });

  test('Booking amount input (#cbAmount) is attached', async ({ page }) => {
    await expect(page.locator('#cbAmount')).toBeAttached();
  });

  test('Booking note input (#cbNote) is attached', async ({ page }) => {
    await expect(page.locator('#cbNote')).toBeAttached();
  });

  test('Add Booking button (#cbAddBookingBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbAddBookingBtn')).toBeAttached();
  });

  test('Booking saved message (#cbBookingSavedMsg) is attached but hidden', async ({ page }) => {
    await expect(page.locator('#cbBookingSavedMsg')).toBeAttached();
    const isVisible = await page.locator('#cbBookingSavedMsg').isVisible();
    expect(isVisible).toBe(false);
  });

  // ── Expense form ───────────────────────────────────────────────────────────

  test('Expense date input (#cbExpDate) is attached', async ({ page }) => {
    await expect(page.locator('#cbExpDate')).toBeAttached();
  });

  test('Expense type selector (#cbExpType) is attached', async ({ page }) => {
    await expect(page.locator('#cbExpType')).toBeAttached();
  });

  test('Expense description input (#cbExpDesc) is attached', async ({ page }) => {
    await expect(page.locator('#cbExpDesc')).toBeAttached();
  });

  test('Expense paid by selector (#cbExpPaidBy) is attached', async ({ page }) => {
    await expect(page.locator('#cbExpPaidBy')).toBeAttached();
  });

  test('Expense amount input (#cbExpAmount) is attached', async ({ page }) => {
    await expect(page.locator('#cbExpAmount')).toBeAttached();
  });

  test('Add Expense button (#cbAddExpBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbAddExpBtn')).toBeAttached();
  });

  test('Expense saved message (#cbExpSavedMsg) is attached but hidden', async ({ page }) => {
    await expect(page.locator('#cbExpSavedMsg')).toBeAttached();
    const isVisible = await page.locator('#cbExpSavedMsg').isVisible();
    expect(isVisible).toBe(false);
  });

  // ── View entries by month ─────────────────────────────────────────────────

  test('Month view input (#cbViewMonth) is attached', async ({ page }) => {
    await expect(page.locator('#cbViewMonth')).toBeAttached();
  });

  test('Month view input is of type month', async ({ page }) => {
    const type = await page.locator('#cbViewMonth').getAttribute('type');
    expect(type).toBe('month');
  });

  test('Load month button (#cbLoadMonthBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbLoadMonthBtn')).toBeAttached();
  });

  test('Clear month button (#cbClearMonthBtn) is attached', async ({ page }) => {
    await expect(page.locator('#cbClearMonthBtn')).toBeAttached();
  });

  test('Month load status (#cbMonthLoadStatus) is attached', async ({ page }) => {
    await expect(page.locator('#cbMonthLoadStatus')).toBeAttached();
  });

  test('Month entries container (#cbMonthEntries) is attached', async ({ page }) => {
    await expect(page.locator('#cbMonthEntries')).toBeAttached();
  });

  // ── Split summary ──────────────────────────────────────────────────────────

  test('Split section (#cbSplitSection) is attached to DOM', async ({ page }) => {
    await expect(page.locator('#cbSplitSection')).toBeAttached();
  });

  test('Split section is initially hidden', async ({ page }) => {
    const isVisible = await page.locator('#cbSplitSection').isVisible();
    expect(isVisible).toBe(false);
  });

  test('Split month label (#cbSplitMonthLabel) is attached', async ({ page }) => {
    await expect(page.locator('#cbSplitMonthLabel')).toBeAttached();
  });

  test('Split area container (#cbSplitArea) is attached', async ({ page }) => {
    await expect(page.locator('#cbSplitArea')).toBeAttached();
  });

  // #cbSettleBtn no longer exists as a static element — per-member "Mark Settled"
  // buttons are rendered dynamically inside #cbSplitArea when settlements exist.
  test('Global settle button (#cbSettleBtn) is not statically present in DOM', async ({ page }) => {
    const count = await page.locator('#cbSettleBtn').count();
    expect(count).toBe(0);
  });

  // ── Past Settlements archive ───────────────────────────────────────────────

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

  // ── All elements together ─────────────────────────────────────────────────

  test('all core court booking elements present in DOM', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.expectSectionElementsAttached();
  });
});
