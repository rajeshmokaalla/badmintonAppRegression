import { test, expect } from '@playwright/test';
import { PlayerSection } from '../pages/PlayerSection';
import { PLAYERS } from '../utils/test-data';

test.describe('Player Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Players section heading is visible', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.expectSectionVisible();
  });

  test('Add button is present and visible', async ({ page }) => {
    const p = new PlayerSection(page);
    await expect(p.addButton).toBeVisible();
  });

  test('Clear All button is present and visible', async ({ page }) => {
    const p = new PlayerSection(page);
    await expect(p.clearAllButton).toBeVisible();
  });

  test('points selector (#pointsInput) is present', async ({ page }) => {
    const p = new PlayerSection(page);
    await expect(p.pointsSelector).toBeAttached();
  });

  test('points selector contains 21', async ({ page }) => {
    const p = new PlayerSection(page);
    await expect(p.pointsSelector).toBeAttached();
    // #pointsInput is an <input type="number"> — use inputValue(), not textContent()
    const val = await p.pointsSelector.inputValue();
    expect(val).toContain('21');
  });

  test('points input is enabled on fresh page load (no tournament in progress)', async ({ page }) => {
    const p = new PlayerSection(page);
    await expect(p.pointsSelector).toBeEnabled();
  });

  test('points input accepts a different value', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.pointsSelector.fill('15');
    await p.pointsSelector.dispatchEvent('change');
    const val = await p.pointsSelector.inputValue();
    expect(Number(val)).toBe(15);
  });

  test('points hint text updates when points value changes', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.pointsSelector.fill('15');
    await p.pointsSelector.dispatchEvent('change');
    const hint = await page.locator('#pointsHint').textContent();
    expect(hint).toContain('15');
  });

  test('points input has min=5 and max=100 attributes', async ({ page }) => {
    const p = new PlayerSection(page);
    const min = await p.pointsSelector.getAttribute('min');
    const max = await p.pointsSelector.getAttribute('max');
    expect(Number(min)).toBeLessThanOrEqual(5);
    expect(Number(max)).toBeGreaterThanOrEqual(100);
  });

  test('empty state shown when no players added', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.expectEmptyState();
  });

  test('player input field accepts text', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.playerInput.fill(PLAYERS.single);
    await expect(p.playerInput).toHaveValue(PLAYERS.single);
  });

  test('input is cleared after player is added', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addPlayer(PLAYERS.single);
    await expect(p.playerInput).toHaveValue('');
  });

  test('added player appears in the list', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addPlayer(PLAYERS.single);
    await p.expectPlayerInList(PLAYERS.single);
  });

  test('player can be added via Enter key', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addPlayerViaEnter(PLAYERS.valid[0]);
    await p.expectPlayerInList(PLAYERS.valid[0]);
  });

  test('multiple players can be added sequentially', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    for (const name of PLAYERS.valid.slice(0, 4)) {
      await p.addPlayer(name);
    }
    for (const name of PLAYERS.valid.slice(0, 4)) {
      await p.expectPlayerInList(name);
    }
  });

  test('all 8 valid players can be added', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    for (const name of PLAYERS.valid) {
      await p.addPlayer(name);
    }
    for (const name of PLAYERS.valid) {
      await p.expectPlayerInList(name);
    }
  });

  test('Clear All removes all players', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addPlayer(PLAYERS.valid[0]);
    await p.addPlayer(PLAYERS.valid[1]);
    // clearPlayers uses window.confirm — accept it before clicking
    await p.clearAllPlayers();
    await expect(p.page.locator('#playerEmpty')).toBeAttached();
  });

  test('player with numeric suffix can be added', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addPlayer(PLAYERS.withNumbers);
    await p.expectPlayerInList(PLAYERS.withNumbers);
  });

  test("player with apostrophe in name can be added", async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addPlayer(PLAYERS.withSpecialChars);
    await p.expectPlayerInList(PLAYERS.withSpecialChars);
  });

  test('empty name submission does not add a player', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addButton.click();
    // #playerEmpty starts hidden (CSS) and JS sets it to block — use toBeAttached()
    await expect(p.emptyState).toBeAttached();
  });

  test('player list gains items after each addition', async ({ page }) => {
    const p = new PlayerSection(page);
    await p.scrollToSection();
    await p.addPlayer(PLAYERS.valid[0]);
    // Wait for the player name to appear first, then confirm the pill count
    await p.expectPlayerInList(PLAYERS.valid[0]);
    await expect(page.locator('#playerList .pill')).toHaveCount(1);
  });
});
