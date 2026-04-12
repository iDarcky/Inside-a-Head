const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// Update createAppPanel to alternate row direction and add section-snap class
s = s.replace(/panel\.className = "app-panel";/, 'panel.className = "app-panel section-snap";');

s = s.replace(/<div class="app-panel-content" id="app-\\\${index}">/, `<div class="app-panel-content" id="app-\${index}" style="flex-direction: \${index % 2 !== 0 ? 'row-reverse' : 'row'};">`);

fs.writeFileSync('script.js', s);
