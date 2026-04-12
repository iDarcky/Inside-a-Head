const fs = require('fs');

let script = fs.readFileSync('script.js', 'utf8');

// I also noticed the projects weren't rendering in playwright. Let's see if there was an error in loadContent.
script = script.replace('console.error(error);', 'console.error("LOAD ERROR:", error);');

fs.writeFileSync('script.js', script);
