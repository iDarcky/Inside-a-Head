const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// Remove the complex snap logic from JS because we will implement CSS Scroll Snapping
s = s.replace(/\/\/ Full-page Section Snapping[\s\S]*\}\n\}\n$/, '\n}');

// We need to slightly darken the body background colors otherwise the text contrast will be destroyed by bright red/purple backgrounds
s = s.replace("const colors = ['#7c3aed', '#53796f', '#ee0000'];", "const colors = ['#1a0f30', '#121f1a', '#300a0a'];"); // Dark tinted charcoals matching the brand hues

fs.writeFileSync('script.js', s);
