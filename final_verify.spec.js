const { test, expect } = require('@playwright/test');

test('final verification of portfolio', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check Title
  await expect(page.locator('h1')).toContainText('Daniel');

  // Check Projects
  await expect(page.locator('#projects-grid')).toBeVisible();
  await expect(page.locator('text=The Retro Circuit')).toBeVisible();

  // Check Shelf
  await expect(page.locator('text=Shelf')).toBeVisible();
  await expect(page.locator('text=The Sorrows of Young Werther')).toBeVisible();

  // Check Theme Toggle
  const themeToggle = page.locator('#theme-toggle');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  // Check "See all" functionality again
  const seeAllBtn = page.locator('#see-all-books');
  if (await seeAllBtn.isVisible()) {
    await seeAllBtn.click();
    const books = page.locator('.book-item');
    const count = await books.count();
    console.log('Book count after click:', count);
    expect(count).toBeGreaterThan(5);
  }
});
