const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// Remove Lenis initialization and RAF completely
s = s.replace(/const lenis = new Lenis\([\s\S]*?\}\);/g, "");
s = s.replace(/function raf\(time\) \{[\s\S]*?requestAnimationFrame\(raf\);/g, "");
s = s.replace(/lenis\.on\('scroll', ScrollTrigger\.update\);/g, "");
s = s.replace(/gsap\.ticker\.add\(\(time\) => \{[\s\S]*?\}\);/g, "");
s = s.replace(/gsap\.ticker\.lagSmoothing\(0, 0\);/g, "");

// Ensure we remove the if condition for lenis
s = s.replace(/if \(typeof gsap === 'undefined' \|\| typeof Lenis === 'undefined'\) return;/g, "if (typeof gsap === 'undefined') return;");

fs.writeFileSync('script.js', s);
