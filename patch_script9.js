const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// I need to fix the extra bracket. I'll just remove the last line if it's an extra bracket.
s = s.replace(/}\n$/, "");

fs.writeFileSync('script.js', s);
