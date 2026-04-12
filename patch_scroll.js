const fs = require('fs');

// 1. Update HTML: remove Lenis
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<script src="https:\/\/unpkg\.com\/@studio-freight\/lenis@1\.0\.34\/dist\/lenis\.min\.js"><\/script>\n    /, '');
fs.writeFileSync('index.html', html);

// 2. Update JS: remove Lenis init
let s = fs.readFileSync('script.js', 'utf8');
s = s.replace(/const lenis = new Lenis\([\s\S]*?\}\);[\s\S]*?requestAnimationFrame\(raf\);/g, '');
s = s.replace(/lenis\.on\('scroll', ScrollTrigger\.update\);/g, '');
s = s.replace(/gsap\.ticker\.add\(\(time\) => \{[\s\S]*?\}\);/g, '');
s = s.replace(/gsap\.ticker\.lagSmoothing\(0, 0\);/g, '');
// replace lenis.scrollTo with native scrollIntoView or window.scrollTo
s = s.replace(/lenis\.scrollTo\(sections\[i\]\);/g, 'sections[i].scrollIntoView({ behavior: "smooth" });');
fs.writeFileSync('script.js', s);

// 3. Update CSS: Add scroll snapping back
let css = fs.readFileSync('styles.css', 'utf8');
css += `
/* Native CSS Scroll Snapping */
html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

.section-snap {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
`;
fs.writeFileSync('styles.css', css);
