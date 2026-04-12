const fs = require('fs');
let code = fs.readFileSync('final_verify.spec.js', 'utf8');

// I replaced the wrong text earlier apparently. Let's just blindly replace the shelf check block.
code = code.replace(/\/\/ Check Shelf[\s\S]*?\/\/ Check Design System Section/, '// Check Bento Section\n  await expect(page.locator(".bento-wrapper")).toBeVisible();\n\n  // Check Design System Section');

fs.writeFileSync('final_verify.spec.js', code);
