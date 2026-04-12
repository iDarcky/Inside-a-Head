const fs = require('fs');
let code = fs.readFileSync('final_verify.spec.js', 'utf8');

// Due to dynamically added class names, and the fact that Playwright tests check visibility immediately, some elements might fail visibility check if they are below the fold (Lenis/GSAP delays). Let's scroll into view or increase timeout.
code = code.replace("await expect(page.locator('.app-panel').first()).toBeVisible();", "const panel = page.locator('.app-panel').first();\n  await panel.scrollIntoViewIfNeeded();\n  await expect(panel).toBeVisible({ timeout: 10000 });");

fs.writeFileSync('final_verify.spec.js', code);
