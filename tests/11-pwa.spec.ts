import { test, expect } from '@playwright/test';

const BASE_URL = 'https://rajeshmokaalla.github.io/badminton-tournament/';

test.describe('PWA & Service Worker', () => {
  test('page has a web app manifest link tag', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  });

  test('manifest.webmanifest file returns 200', async ({ request }) => {
    const response = await request.get(`${BASE_URL}manifest.webmanifest`);
    expect(response.status()).toBe(200);
  });

  test('manifest contains required name field', async ({ request }) => {
    const response = await request.get(`${BASE_URL}manifest.webmanifest`);
    const manifest = await response.json();
    expect(manifest.name || manifest.short_name).toBeTruthy();
  });

  test('manifest contains start_url', async ({ request }) => {
    const response = await request.get(`${BASE_URL}manifest.webmanifest`);
    const manifest = await response.json();
    expect(manifest.start_url).toBeTruthy();
  });

  test('manifest contains display mode', async ({ request }) => {
    const response = await request.get(`${BASE_URL}manifest.webmanifest`);
    const manifest = await response.json();
    expect(manifest.display).toBeTruthy();
  });

  test('sw.js service worker script is accessible', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}sw.js`);
    expect(response?.status()).toBe(200);
  });

  test('Install app link is visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Install app', { exact: false })).toBeVisible();
  });

  test('page has viewport meta tag', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
    const content = await viewport.getAttribute('content');
    expect(content).toContain('width=device-width');
  });

  test('page is served over HTTPS', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.url()).toMatch(/^https:\/\//);
  });
});
