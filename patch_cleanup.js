const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// I need to ensure the old GSAP code for the horizontal shelf is truly gone and doesn't throw errors.
s = s.replace(/const shelfSection = document\.querySelector\('\.shelf-horizontal-section'\);[\s\S]*?invalidateOnRefresh: true\n    \}\);\n  \}/, '');

fs.writeFileSync('script.js', s);
