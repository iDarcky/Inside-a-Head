const { test, expect } = require('@playwright/test');

test('final verification of portfolio redesign', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check Title
  await expect(page.locator('h1')).toContainText('INSIDE A HEAD');

  // Check Projects / Studio
  const panel = page.locator('.app-panel').first();
  await panel.scrollIntoViewIfNeeded();
  await expect(panel).toBeVisible({ timeout: 10000 });
  // Adjusted text selector because the title now has "01_" prepended and spaces removed
  await expect(page.locator('.app-title').first()).toContainText('The Retro Circuit');

  // Check Logbook
  await expect(page.locator('#logbook')).toBeVisible();
  await expect(page.locator('text=On Minimalism in Interface Design')).toBeVisible();

  // Check Bento Section
  await expect(page.locator(".bento-wrapper")).toBeVisible();

  // Check Design System Section
  await expect(page.locator('.engine-room-section')).toBeVisible();
  await expect(page.locator('text=SYSTEM ARCHITECTURE')).toBeVisible();

  });
