const fs = require('fs');
let code = fs.readFileSync('final_verify.spec.js', 'utf8');

// Update validation to check for the new Museum of My Mess bento layout
code = code.replace("await expect(page.locator('h2:text(\"THE SHELF\")')).toBeVisible();", "await expect(page.locator('h2:text(\"MUSEUM OF MY MESS\")')).toBeVisible();");
code = code.replace("await expect(page.locator('text=The Sorrows of Young Werther')).toBeVisible();", "await expect(page.locator('.bento-wrapper')).toBeVisible();");

fs.writeFileSync('final_verify.spec.js', code);
