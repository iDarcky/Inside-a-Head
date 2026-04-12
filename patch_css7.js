const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Ensure smooth scroll behavior
css = css.replace("html {\n  scroll-snap-type: y mandatory;", "html {\n  scroll-behavior: smooth;\n  scroll-snap-type: y mandatory;");

// Aggressively force custom cursor everywhere, including scrollbars
css = css.replace("a, button, [data-hover] {\n  cursor: none !important;\n}", `
a, button, [data-hover], ::-webkit-scrollbar, ::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb {
  cursor: none !important;
}

/* Force elements to inherit none */
* {
  cursor: none !important;
}
`);

fs.writeFileSync('styles.css', css);
