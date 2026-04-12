const { test, expect } = require('@playwright/test');

test('final verification of portfolio redesign', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check Title
  await expect(page.locator('h1')).toContainText('Inside a Head');

  // Check Projects / Studio
  await expect(page.locator('#projects-grid')).toBeVisible();
  // Adjusted text selector because the title now has "01_" prepended and spaces removed
  await expect(page.locator('.app-card h3').first()).toContainText('01_TheRetroCircuit');

  // Check Logbook
  await expect(page.locator('#logbook')).toBeVisible();
  await expect(page.locator('text=On Minimalism in Interface Design')).toBeVisible();

  // Check Shelf
  await expect(page.locator('h2:text("Shelf")')).toBeVisible();
  await expect(page.locator('text=The Sorrows of Young Werther')).toBeVisible();

  // Check Design System Section
  await expect(page.locator('.design-system-card')).toBeVisible();
  await expect(page.locator('text=System Architecture')).toBeVisible();

  // Check Theme Toggle
  const themeToggle = page.locator('#theme-toggle');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  // Check "See all" functionality
  const seeAllBtn = page.locator('#see-all-books');
  if (await seeAllBtn.isVisible()) {
    await seeAllBtn.click();
    const books = page.locator('.book-compact-item');
    const count = await books.count();
    console.log('Book count after click:', count);
    expect(count).toBeGreaterThan(5);
  }
});
