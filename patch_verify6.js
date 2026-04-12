const fs = require('fs');
let code = fs.readFileSync('final_verify.spec.js', 'utf8');

// I modified Shelf text previously to check for "Shelf".
// But in the Monks redesign, the text is actually "THE SHELF" (uppercase, different string).
code = code.replace("await expect(page.locator('h2:text(\"Shelf\")')).toBeVisible();", "await expect(page.locator('h2:text(\"THE SHELF\")')).toBeVisible();");

// As for .app-panel timing out: When we removed lenis via regex, we accidentally removed a bracket in script.js or something that broke execution?
