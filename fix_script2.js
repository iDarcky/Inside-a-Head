const fs = require('fs');

const script = fs.readFileSync('script.js', 'utf8');

// I notice that github-btn and linkedin-btn are present in the DOM footer, but they are populated in renderProfile by id.
// In the original script.js they were in the hero section.
