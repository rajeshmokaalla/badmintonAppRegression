import { test, expect } from '@playwright/test';
import { CourtBookingSection } from '../pages/CourtBookingSection';

test.describe('Court Booking & Split', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Court Booking & Split section heading is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.expectSectionVisible();
  });

  test('Group Members sub-section is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.expectGroupMembersSectionVisible();
  });

  test('Add Court Booking sub-section heading is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await expect(b.addBookingHeading).toBeVisible();
  });

  test('Other Expenses sub-section heading is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await expect(b.expensesHeading).toBeVisible();
  });

  test('Split Summary sub-section heading is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.expectSplitSummaryVisible();
  });

  test('No members yet state shown initially', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await b.expectNoMembersState();
  });

  test('Shuttle expense category button is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.shuttleButton).toBeVisible();
  });

  test('Snacks expense category button is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.snacksButton).toBeVisible();
  });

  test('Miscellaneous expense category button is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.miscButton).toBeVisible();
  });

  test('Add Booking button is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.addBookingButton).toBeVisible();
  });

  test('Add Expense button is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.addExpenseButton).toBeVisible();
  });

  test('Load button is visible in Split Summary', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.loadButton).toBeVisible();
  });

  test('Mark as Settled & Reset button is visible', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.settleResetButton).toBeVisible();
  });

  test('all expense category buttons are enabled', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await expect(b.shuttleButton).toBeEnabled();
    await expect(b.snacksButton).toBeEnabled();
    await expect(b.miscButton).toBeEnabled();
  });

  test('Shuttle category button is clickable', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await b.shuttleButton.click();
    await expect(b.shuttleButton).toBeVisible();
  });

  test('Snacks category button is clickable', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await b.snacksButton.click();
    await expect(b.snacksButton).toBeVisible();
  });

  test('Miscellaneous category button is clickable', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await b.miscButton.click();
    await expect(b.miscButton).toBeVisible();
  });

  test('clicking Add Booking without auth keeps app stable', async ({ page }) => {
    const b = new CourtBookingSection(page);
    await b.scrollToSection();
    await b.addBookingButton.click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });
});
