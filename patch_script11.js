const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');
s = s.replace(/\/\/ Full-page Section Snapping[\s\S]*$/, '}');
fs.writeFileSync('script.js', s);
