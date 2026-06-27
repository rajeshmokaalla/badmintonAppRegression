import { test, expect } from '@playwright/test';
import { PlayerSection } from '../pages/PlayerSection';
import { TeamSection } from '../pages/TeamSection';
import { TournamentSection } from '../pages/TournamentSection';
import { PLAYERS } from '../utils/test-data';

async function setupWithPlayers(page: import('@playwright/test').Page): Promise<void> {
  const p = new PlayerSection(page);
  await p.scrollToSection();
  for (const name of PLAYERS.valid) {
    await p.addPlayer(name);
  }
}

test.describe('Tournament Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rajeshmokaalla.github.io/badminton-tournament/');
    await page.waitForLoadState('networkidle');
  });

  test('Matches section heading (3) is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectMatchesSectionVisible();
  });

  test('Standings section heading (4) is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectStandingsSectionVisible();
  });

  test('Undo Last Edit button is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectUndoButtonVisible();
  });

  test('Export button is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectExportButtonVisible();
  });

  test('Play Again button is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await expect(t.playAgainButton).toBeVisible();
  });

  test('Reset Tournament button is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await expect(t.resetButton).toBeVisible();
  });

  test('Save Tournament button is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectSaveTournamentButtonVisible();
  });

  test('Export button is enabled', async ({ page }) => {
    const t = new TournamentSection(page);
    await expect(t.exportButton).toBeEnabled();
  });

  test('Undo click does not crash the app', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.undoButton.click();
    await expect(t.matchesHeading).toBeVisible();
  });

  test('Reset Tournament keeps app stable', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.resetButton.click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });

  test('Play Again click keeps app stable', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.playAgainButton.click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });

  test('Start Tournament after player setup keeps app stable', async ({ page }) => {
    await setupWithPlayers(page);
    const teams = new TeamSection(page);
    await teams.scrollToSection();
    await teams.autoAssignButton.click();
    await teams.startTournamentButton.click();
    const t = new TournamentSection(page);
    await expect(t.matchesHeading).toBeVisible();
  });

  test('Save to Cloud section is visible after tournament setup', async ({ page }) => {
    await expect(page.getByText('5. Save to Cloud', { exact: false }).first()).toBeVisible();
  });
});
