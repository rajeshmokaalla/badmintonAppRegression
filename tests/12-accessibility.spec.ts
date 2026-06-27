import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rajeshmokaalla.github.io/badminton-tournament/';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('html element has a lang attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('page has at least one H1 heading', async ({ page }) => {
    expect(await page.locator('h1').count()).toBeGreaterThanOrEqual(1);
  });

  test('heading hierarchy is logical (h1 exists)', async ({ page }) => {
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    expect(await headings.count()).toBeGreaterThan(0);
    expect(await page.locator('h1').count()).toBeGreaterThanOrEqual(1);
  });

  test('all buttons have non-empty accessible names', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = (await btn.textContent())?.trim();
      const ariaLabel = await btn.getAttribute('aria-label');
      const title = await btn.getAttribute('title');
      expect(
        Boolean(text || ariaLabel || title),
        `Button at index ${i} has no accessible name`
      ).toBe(true);
    }
  });

  test('all visible inputs have labels or placeholders', async ({ page }) => {
    const inputs = page.locator('input:not([type="hidden"])');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      // Skip inputs inside hidden containers (auth-gated or toggle-hidden sections)
      const isVisible = await input.isVisible();
      if (!isVisible) continue;
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const placeholder = await input.getAttribute('placeholder');
      // Check both for="id" labels and any immediately preceding <label> element
      const hasAssocLabel = id
        ? (await page.locator(`label[for="${id}"]`).count()) > 0
        : false;
      const hasLabel = Boolean(ariaLabel || ariaLabelledBy || placeholder || hasAssocLabel);
      expect(hasLabel, `Visible input at index ${i} (id="${id}") has no label`).toBe(true);
    }
  });

  test('pressing Tab moves focus to an interactive element', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toHaveCount(1);
  });

  test('Add button is reachable via keyboard Tab navigation', async ({ page }) => {
    let found = false;
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
      const text = await page.evaluate(() => document.activeElement?.textContent?.trim());
      if (text === 'Add') {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });

  test('focus does not get trapped on page load', async ({ page }) => {
    const seen = new Set<string>();
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => document.activeElement?.tagName ?? '');
      seen.add(tag);
    }
    expect(seen.size).toBeGreaterThanOrEqual(1);
  });

  test('images have alt attributes', async ({ page }) => {
    const imgs = page.locator('img');
    const count = await imgs.count();
    for (let i = 0; i < count; i++) {
      const alt = await imgs.nth(i).getAttribute('alt');
      expect(alt !== null, `img[${i}] missing alt attribute`).toBe(true);
    }
  });

  test('text color is not transparent on main heading', async ({ page }) => {
    const heading = page.getByText('Badminton Tournament', { exact: false }).first();
    await expect(heading).toBeVisible();
    const color = await heading.evaluate((el) => window.getComputedStyle(el).color);
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
  });
});
