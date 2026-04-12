const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// I see stray requestAnimationFrame(raf); block near the top of initKineticEngine from the broken regex replace. Let's fix that.
s = s.replace(/  \}\n  requestAnimationFrame\(raf\);\n\n  \/\/ Sync GSAP ScrollTrigger with Lenis\n  \n  \n  /g, "");

fs.writeFileSync('script.js', s);
