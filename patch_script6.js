const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// 1. Update colors
s = s.replace("const colors = ['#0a0f14', '#0a140f', '#140a0a'];", "const colors = ['#7c3aed', '#53796f', '#ee0000'];");
// Make the interpolated body colors slightly darker by adding an alpha or a darker shade for the cinematic effect?
// The user gave solid colors. It will be very bright if the whole body goes to #7c3aed.
// We'll leave it as requested, or convert it to a deep, dark tint of that color?
// Let's use the raw hex colors for now as requested.

// 2. Remove the Shelf GSAP scroll lock
s = s.replace(/\/\/ 5\. Shelf Horizontal Scroll[\s\S]*\}\n\}/, '}');

// 3. Add ScrollTrigger Snapping for full sections
// We'll find a good spot in initKineticEngine to add the snap logic
const snapLogic = `
  // Full-page Section Snapping
  ScrollTrigger.create({
    start: 0,
    end: "max",
    snap: {
      snapTo: [0,
               ...panels.map(p => p.offsetTop / (document.body.scrollHeight - window.innerHeight)),
               document.querySelector('.engine-room-section').offsetTop / (document.body.scrollHeight - window.innerHeight),
               document.querySelector('.logbook-cinematic').offsetTop / (document.body.scrollHeight - window.innerHeight),
               document.querySelector('.shelf-horizontal-section').offsetTop / (document.body.scrollHeight - window.innerHeight)
              ].filter(n => n >= 0 && n <= 1), // Calculate normalized array of section offsets
      duration: {min: 0.2, max: 0.6},
      delay: 0.1,
      ease: "power1.inOut"
    }
  });
`;

// Insert the snap logic at the end of initKineticEngine before the closing bracket
s = s.replace(/}\n$/, snapLogic + "\n}");

fs.writeFileSync('script.js', s);
