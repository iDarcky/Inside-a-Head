const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// I'll strip the syntax error by re-constructing the end of the file.
// Ah, the issue is that I used a regex to remove the snap logic but messed it up.
s = s.replace(/\/\/ Full-page Section Snapping[\s\S]*\}\n$/, '\n');
fs.writeFileSync('script.js', s);
