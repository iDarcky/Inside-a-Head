const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add section-snap classes to main sections
html = html.replace('class="hero-immersive"', 'class="hero-immersive section-snap"');
html = html.replace('class="studio-stack"', 'class="studio-stack section-snap"');
html = html.replace('class="engine-room-section"', 'class="engine-room-section section-snap"');
html = html.replace('class="logbook-cinematic"', 'class="logbook-cinematic section-snap"');
html = html.replace('class="shelf-horizontal-section"', 'class="shelf-horizontal-section section-snap"');
html = html.replace('class="footer-massive"', 'class="footer-massive section-snap"');

fs.writeFileSync('index.html', html);
