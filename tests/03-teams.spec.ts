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

  test('Auto-assign Teams button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await t.expectAutoAssignVisible();
  });

  test('Reshuffle Order button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await expect(t.reshuffleButton).toBeVisible();
  });

  test('Doubles format option is present', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(t.doublesButton).toBeVisible();
  });

  test('Singles format option is present', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(t.singlesButton).toBeVisible();
  });

  test('Mixed format option is present', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(t.mixedButton).toBeVisible();
  });

  test('Random assignment mode option is present', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(page.getByText('Random', { exact: false }).first()).toBeVisible();
  });

  test('Manual assignment mode option is present', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(page.getByText('Manual', { exact: false }).first()).toBeVisible();
  });

  test('Number of teams input is present', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(t.numberOfTeamsInput).toBeVisible();
  });

  test('Apply button is present', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(t.applyButton).toBeVisible();
  });

  test('Start Tournament button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(t.startTournamentButton).toBeVisible();
  });

  test('Clear Teams button is visible', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await expect(t.clearTeamsButton).toBeVisible();
  });

  test('Doubles format can be selected', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await t.selectFormat('Doubles');
    await expect(t.doublesButton).toBeVisible();
  });

  test('Singles format can be selected', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await t.selectFormat('Singles');
    await expect(t.singlesButton).toBeVisible();
  });

  test('Mixed format can be selected', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await t.selectFormat('Mixed');
    await expect(t.mixedButton).toBeVisible();
  });

  test('number of teams input accepts numeric value', async ({ page }) => {
    const t = new TeamSection(page);
    await t.scrollToSection();
    await t.numberOfTeamsInput.fill(TEAM_CONFIG.numberOfTeams);
    await expect(t.numberOfTeamsInput).toHaveValue(TEAM_CONFIG.numberOfTeams);
  });

  test('auto-assign teams works after adding minimum players', async ({ page }) => {
    await addMinPlayers(page);
    const t = new TeamSection(page);
    await t.scrollToSection();
    await t.autoAssignButton.click();
    await expect(t.sectionHeading).toBeVisible();
  });
});
