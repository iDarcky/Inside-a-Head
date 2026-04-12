const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The main sections should have the section-snap class.
// Looking at the previous HTML, they might already have them or they were removed.
// We also need .app-panel (in script.js) to have section-snap.

fs.writeFileSync('index.html', html);
