const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// Just replace that whole block
s = s.replace(/end: \(\) => .*/, "end: () => '+=' + (getScrollAmount() * -1),");

fs.writeFileSync('script.js', s);
