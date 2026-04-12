const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Lenis script back
html = html.replace('<!-- GSAP & ScrollTrigger -->', `<!-- Lenis for Smooth Scrolling -->\n    <script src="https://unpkg.com/@studio-freight/lenis@1.0.34/dist/lenis.min.js"></script>\n    <!-- GSAP & ScrollTrigger -->`);

// 2. Add Top-Left Fixed Anchor
const anchorHTML = `
    <!-- Global Anchor -->
    <a href="#top" class="global-anchor" data-hover>
      <span>INSIDE A HEAD</span>
      <span class="anchor-sub">STUDIO</span>
    </a>
`;
html = html.replace('<!-- Custom Cursor -->\n    <div class="custom-cursor"></div>', `<!-- Custom Cursor -->\n    <div class="custom-cursor"></div>\n${anchorHTML}`);

// 3. Add Fixed Dot Navigation
const dotsHTML = `
    <!-- Dot Navigation -->
    <div class="dot-nav">
      <div class="dot" data-target="#top"></div>
      <div class="dot" data-target="#app-0"></div>
      <div class="dot" data-target="#app-1"></div>
      <div class="dot" data-target="#app-2"></div>
      <div class="dot" data-target="#logbook"></div>
    </div>
`;
html = html.replace('</header>', `</header>\n${dotsHTML}`);

fs.writeFileSync('index.html', html);
