const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// Update Lenis easing for a snappier feel
s = s.replace("easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),", "easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy ease\n    wheelMultiplier: 1.2,");

// Add Magnetic Button logic for the massive CTA
const magneticLogic = `
  // 2.5 Magnetic Button
  const magneticButton = document.querySelector('.ds-cta');
  if (magneticButton) {
    magneticButton.addEventListener('mousemove', (e) => {
      const rect = magneticButton.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(magneticButton, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power3.out"
      });
    });

    magneticButton.addEventListener('mouseleave', () => {
      gsap.to(magneticButton, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }
`;

// Insert magnetic logic before Studio Stack
s = s.replace("// 3. Studio Stack Overlap", magneticLogic + "\n  // 3. Studio Stack Overlap");

// Make Studio Overlap scale smaller (e.g. 0.8) and darker for a deeper Z-axis feel
s = s.replace("scale: 0.9,", "scale: 0.85,\n        y: -50,");
s = s.replace("opacity: 0.3,", "opacity: 0.1,");

fs.writeFileSync('script.js', s);
