import { test, expect } from '@playwright/test';
import { PlayerSection } from '../pages/PlayerSection';
import { TeamSection } from '../pages/TeamSection';
import { PLAYERS, TEAM_CONFIG } from '../utils/test-data';

async function addMinPlayers(page: import('@playwright/test').Page): Promise<void> {
  const p = new PlayerSection(page);
  await p.scrollToSection();
  for (const name of PLAYERS.valid.slice(0, TEAM_CONFIG.minPlayers)) {
    await p.addPlayer(name);
  }
}

test.describe('Team Assignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Teams section heading is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await t.expectSectionVisible();
  });

  // shuffleBtn exists in DOM and is visible (but disabled until players added)
  test('Auto-assign button (#shuffleBtn) is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.autoAssignButton).toBeVisible();
  });

  test('Reshuffle Order button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.reshuffleButton).toBeVisible();
  });

  test('Doubles format button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.doublesButton).toBeVisible();
  });

  test('Singles format button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.singlesButton).toBeVisible();
  });

  test('Mixed format button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.mixedButton).toBeVisible();
  });

  test('Random mode option is visible', async ({ page }) => {
    await expect(page.locator('#modeAuto')).toBeVisible();
  });

  test('Manual mode option is visible', async ({ page }) => {
    await expect(page.locator('#modeManual')).toBeVisible();
  });

  test('Number of teams input (#teamCountInput) is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.numberOfTeamsInput).toBeVisible();
  });

  test('Apply button (#applyTeamCount) is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.applyButton).toBeVisible();
  });

  // No separate "Start Tournament" button — shuffleBtn says "Auto-assign & Start"
  test('Auto-assign & Start button is attached', async ({ page }) => {
    await expect(page.locator('#shuffleBtn')).toBeAttached();
  });

  test('Clear Teams button (#clearTeamsBtn) is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.clearTeamsButton).toBeVisible();
  });

  test('Doubles format button is clickable', async ({ page }) => {
    const t = new TeamSection(page);
    await t.doublesButton.click();
    await expect(t.doublesButton).toBeVisible();
  });

  test('Singles format button is clickable', async ({ page }) => {
    const t = new TeamSection(page);
    await t.singlesButton.click();
    await expect(t.singlesButton).toBeVisible();
  });

  test('Mixed format button is clickable', async ({ page }) => {
    const t = new TeamSection(page);
    await t.mixedButton.click();
    await expect(t.mixedButton).toBeVisible();
  });

  test('Number of teams input accepts a value', async ({ page }) => {
    const t = new TeamSection(page);
    await t.numberOfTeamsInput.fill(TEAM_CONFIG.numberOfTeams);
    await expect(t.numberOfTeamsInput).toHaveValue(TEAM_CONFIG.numberOfTeams);
  });

  test('shuffleBtn becomes enabled after adding minimum players', async ({ page }) => {
    await addMinPlayers(page);
    const t = new TeamSection(page);
    await expect(t.autoAssignButton).toBeEnabled();
  });
});
