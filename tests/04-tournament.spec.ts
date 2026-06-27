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

  test('Undo button (#undoBtn) is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectUndoButtonVisible();
  });

  test('Export button (#exportBtn) is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectExportButtonVisible();
  });

  // playAgainBtn is display:none until tournament ends — check DOM presence only
  test('Play Again button (#playAgainBtn) is attached to DOM', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectPlayAgainButtonAttached();
  });

  test('Reset button (#resetBtn) is visible', async ({ page }) => {
    const t = new TournamentSection(page);
    await expect(t.resetButton).toBeVisible();
  });

  // saveCloudBtn lives inside cloudPanel which is display:none until tournament completes
  test('Save Tournament button (#saveCloudBtn) is attached to DOM', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.expectSaveTournamentButtonAttached();
  });

  test('Export button is enabled', async ({ page }) => {
    const t = new TournamentSection(page);
    await expect(t.exportButton).toBeEnabled();
  });

  test('Undo click does not crash app', async ({ page }) => {
    const t = new TournamentSection(page);
    // undoBtn starts disabled — force:true bypasses actionability check
    await t.undoButton.click({ force: true });
    await expect(t.matchesHeading).toBeVisible();
  });

  test('Reset click does not crash app', async ({ page }) => {
    const t = new TournamentSection(page);
    await t.resetButton.click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });

  test('cloudPanel is display:none before tournament completes', async ({ page }) => {
    await expect(page.locator('#cloudPanel')).toBeAttached();
    const isVisible = await page.locator('#cloudPanel').isVisible();
    expect(isVisible).toBe(false);
  });

  test('shuffleBtn becomes enabled after players are added', async ({ page }) => {
    await setupWithPlayers(page);
    await expect(page.locator('#shuffleBtn')).toBeEnabled();
  });

  test('shuffleBtn click with players runs without crash', async ({ page }) => {
    await setupWithPlayers(page);
    await page.locator('#shuffleBtn').click();
    await expect(page.getByText('Badminton Tournament', { exact: false }).first()).toBeVisible();
  });
});
