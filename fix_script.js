const fs = require('fs');

const script = fs.readFileSync('script.js', 'utf8');
const fixedScript = script.replace('await loadContent();', 'await loadContent();\n    console.log("data", data);');

// Actually wait, let's see why the app-cards aren't rendering.
