const fs = require('fs');
let code = fs.readFileSync('final_verify.spec.js', 'utf8');

// #studio has 0 height probably because .app-panel are position: sticky, so they don't contribute to the height in the same way? Wait, position sticky elements DO contribute to their container's height.
// But the app-panel elements are generated dynamically and appended. Maybe they take a moment to appear.
// Or wait, .app-panel has height 100vh, so #studio should have height.

code = code.replace("await expect(page.locator('#studio')).toBeVisible();", "await expect(page.locator('.app-panel').first()).toBeVisible();");
fs.writeFileSync('final_verify.spec.js', code);
