const fs = require('fs');

let spec = fs.readFileSync('final_verify.spec.js', 'utf8');

// Since we removed the theme toggle, let's remove that part of the test.
// Also update the Book checking, as they are now 'book-premium-card' items instead of 'book-compact-item'.

spec = spec.replace(/\/\/ Check Theme Toggle[\s\S]*?\/\/ Check "See all"/, '// Check "See all"');
spec = spec.replace(/const books = page\.locator\('.book-compact-item'\);/g, "const books = page.locator('.book-premium-card');");

// We also removed the see all button entirely since the shelf is an infinite scroll block. Let's strip the 'See all' logic too.
spec = spec.replace(/\/\/ Check "See all" functionality[\s\S]*\}\);/, '});');

// Wait, looking at index.html, we removed projects-grid, and replaced it with studio-stack
spec = spec.replace("await expect(page.locator('#projects-grid')).toBeVisible();", "await expect(page.locator('#studio')).toBeVisible();");

// we removed '.app-card h3' and replaced with '.app-title'
spec = spec.replace("await expect(page.locator('.app-card h3').first()).toContainText('01_TheRetroCircuit');", "await expect(page.locator('.app-title').first()).toContainText('The Retro Circuit');");

// Update 'System Architecture' check for capitalization as it is now massive uppercase CSS text-transform but HTML might be normal, Wait, html is "SYSTEM ARCHITECTURE"
spec = spec.replace("await expect(page.locator('text=System Architecture')).toBeVisible();", "await expect(page.locator('text=SYSTEM ARCHITECTURE')).toBeVisible();");

fs.writeFileSync('final_verify.spec.js', spec);
