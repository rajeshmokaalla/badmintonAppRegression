import { Page, expect } from '@playwright/test';

export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
}

export async function scrollToSection(page: Page, heading: string): Promise<void> {
  const el = page.getByText(heading, { exact: false }).first();
  await el.scrollIntoViewIfNeeded();
}

export async function expectSectionVisible(page: Page, heading: string): Promise<void> {
  await expect(page.getByText(heading, { exact: false }).first()).toBeVisible();
}

export async function expectButtonEnabled(page: Page, name: string): Promise<void> {
  const btn = page.getByRole('button', { name, exact: false });
  await expect(btn).toBeVisible();
  await expect(btn).toBeEnabled();
}

export async function addPlayer(page: Page, name: string): Promise<void> {
  const input = page
    .locator('input[type="text"], input:not([type])')
    .filter({ hasNot: page.locator('[type="number"]') })
    .first();
  await input.fill(name);
  await page.getByRole('button', { name: 'Add', exact: true }).first().click();
}
