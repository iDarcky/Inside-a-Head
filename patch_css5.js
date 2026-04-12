const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Update cursor to be a triangle (arrowhead)
css = css.replace(".custom-cursor {\n  position: fixed;", ".custom-cursor {\n  position: fixed;\n  clip-path: polygon(0 0, 100% 100%, 0 100%);");
css = css.replace("border-radius: 50%;", "border-radius: 0;");
css = css.replace("transform: translate(-50%, -50%);", "transform: translate(-2px, -2px) rotate(-15deg); /* offset tip to match pointer exactly */");

// 2. Adjust shelf-track-container for independent scrolling
css = css.replace(".shelf-track-container {\n  width: 100%;\n  /* Hide scrollbar */\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}", `
.shelf-track-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 24px;
}
.shelf-track-container::-webkit-scrollbar {
  height: 8px;
}
.shelf-track-container::-webkit-scrollbar-track {
  background: var(--geist-border);
  border-radius: 8px;
}
.shelf-track-container::-webkit-scrollbar-thumb {
  background: var(--accents-6);
  border-radius: 8px;
}
`);
css = css.replace(".shelf-track-container::-webkit-scrollbar {\n  display: none;\n}", "");

// 3. Add CSS scroll snapping behavior to the layout/main sections
// We need to apply scroll-snap-type to html
css += `
/* CSS Scroll Snapping */
html {
  scroll-snap-type: y mandatory;
}
.section-snap {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
`;

fs.writeFileSync('styles.css', css);
