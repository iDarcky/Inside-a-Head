const fs = require('fs');

const oldHtml = fs.readFileSync('index.html', 'utf8');

// Insert GSAP and ScrollTrigger CDNs before the closing head tag
let newHtml = oldHtml.replace('</head>', `
    <!-- GSAP & ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  </head>
`);

// Add section-card wrapper for the stacking layout to the main sections.
// Rebuild the hero section
const heroContent = `
        <section class="section section-card" id="top">
          <div class="intro-visual-container">
            <div class="intro-portrait"></div>
            <div class="intro-logo-overlay">
              <svg viewBox="0 0 100 100" class="iah-logo">
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="'Geist Mono', monospace" font-size="48" font-weight="bold" fill="currentColor" letter-spacing="-5">IAH</text>
              </svg>
            </div>
          </div>
          <div class="intro-text-container">
            <h1 id="hero-title" class="title-inside-a-head">Inside a Head.</h1>
            <p class="hero-copy" id="profile-bio">
              The digital studio of Daniel. Product Manager, Musician, and Builder. Constructing human-centric software and creative workflows.
            </p>
          </div>
        </section>
`;
newHtml = newHtml.replace(/<section class="hero"[^>]*>[\s\S]*?<\/section>/, heroContent);

// Add 'section-card' and necessary wrapper classes to other sections
newHtml = newHtml.replace('<section class="section" id="studio" aria-labelledby="projects-title">', '<section class="section section-card studio-section" id="studio" aria-labelledby="projects-title">');

// Update Design system section wrapper
newHtml = newHtml.replace('<section class="design-system-section">', '<section class="section section-card design-system-section">');

newHtml = newHtml.replace('<section class="section" id="logbook" aria-labelledby="logbook-title">', '<section class="section section-card logbook-section" id="logbook" aria-labelledby="logbook-title">');

newHtml = newHtml.replace('<section class="section" id="shelf" aria-labelledby="books-title">', '<section class="section section-card shelf-section" id="shelf" aria-labelledby="books-title">');

fs.writeFileSync('index.html', newHtml);
