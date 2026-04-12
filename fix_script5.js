const fs = require('fs');

let script = fs.readFileSync('script.js', 'utf8');
script = script.replace('console.error("LOAD ERROR:", error);', 'console.error("LOAD ERROR:", error.stack || error);');
fs.writeFileSync('script.js', script);
