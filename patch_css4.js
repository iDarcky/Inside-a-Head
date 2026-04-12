const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Tweak the Engine Room background to be a bit more subtle and move slower
css = css.replace("animation: bgPan 20s linear infinite;", "animation: bgPan 40s linear infinite;\n  opacity: 0.3;");

fs.writeFileSync('styles.css', css);
