const fs = require('fs');

let code = fs.readFileSync('final_verify.spec.js', 'utf8');
code = code.replace("await expect(page.locator('text=Shelf')).toBeVisible();", "await expect(page.locator('h2:text(\"Shelf\")')).toBeVisible();");
fs.writeFileSync('final_verify.spec.js', code);
