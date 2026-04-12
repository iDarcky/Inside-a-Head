const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Update Engine Room
css = css.replace('padding: 15vw 5vw;', 'padding: 10vw 5vw;'); // Reduce padding

// The prompt asked to demote it to a 30-40vh interstitial bridge.
// I'll ensure it doesn't try to be full height if it was.
css = css.replace('.engine-room-content {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n}', `.engine-room-content {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4vw;
}`);

css = css.replace('.engine-copy {\n  font-size: clamp(1.5rem, 3vw, 2.5rem);\n  color: var(--accents-6);\n  max-width: 1000px;\n  margin-bottom: 80px;\n}', `.engine-copy {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: var(--accents-6);
  max-width: 600px;
  margin-bottom: 0;
}`);

// Wait, the HTML structure in index.html for engine-room-content is linear.
// Let's modify index.html to wrap the text in a div, so the flex layout works with the button.

fs.writeFileSync('styles.css', css);
