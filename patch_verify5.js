const fs = require('fs');
let code = fs.readFileSync('final_verify.spec.js', 'utf8');

// I replaced '.design-system-card' with '.engine-room-section' in the new index.html.
code = code.replace("await expect(page.locator('.design-system-card')).toBeVisible();", "await expect(page.locator('.engine-room-section')).toBeVisible();");

fs.writeFileSync('final_verify.spec.js', code);
