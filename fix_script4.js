const fs = require('fs');

let script = fs.readFileSync('script.js', 'utf8');
script = script.replace('if (linkedinLink && linkedinBtn) linkedinBtn.href = linkedinLink.url;', 'if (linkedinLink && linkedinBtn) linkedinBtn.href = linkedinLink.url; else console.log("Missing linkedin");');
fs.writeFileSync('script.js', script);
