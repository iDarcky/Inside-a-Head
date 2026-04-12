const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// I also need to adjust `.custom-cursor.active` since I changed the shape and clip-path.
// An arrowhead scaling to 48px looks huge, maybe just scale to 24px, or let it round out?
// The user asked for it to be shaped "more like a cursor, but not with the tail". A triangle pointing top-left is exactly that.
// Let's make it scale nicely.
css = css.replace("width: 48px;\n  height: 48px;", "width: 24px;\n  height: 24px;");

fs.writeFileSync('styles.css', css);
