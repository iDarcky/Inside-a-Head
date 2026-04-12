const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Inside a Head - The digital studio of Daniel. Product Manager, Musician, and Builder."
    />
    <title>Inside a Head | Digital Studio</title>
    <link rel="stylesheet" href="styles.css" />

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- GSAP & ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

    <!-- Lenis for Smooth Scrolling -->
    <script src="https://unpkg.com/@studio-freight/lenis@1.0.34/dist/lenis.min.js"></script>
  </head>
  <body>
    <!-- Custom Cursor -->
    <div class="custom-cursor"></div>

    <header class="site-header">
      <div class="header-inner">
        <nav class="nav-links">
          <a href="#top" class="nav-link" data-hover>Studio</a>
          <a href="#logbook" class="nav-link" data-hover>Logbook</a>
          <a href="#shelf" class="nav-link" data-hover>Shelf</a>
        </nav>
      </div>
    </header>

    <div class="layout">
      <main>

        <section class="hero-immersive" id="top">
          <div class="hero-parallax-wrapper">
            <h1 id="hero-title" class="hero-massive-text">INSIDE A HEAD</h1>

            <div class="hero-center-cluster">
              <div class="intro-portrait"></div>
              <div class="intro-logo-overlay">
                <svg viewBox="0 0 100 100" class="iah-logo">
                  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="'Geist Mono', monospace" font-size="48" font-weight="bold" fill="currentColor" letter-spacing="-5">IAH</text>
                </svg>
              </div>
            </div>

            <p class="hero-copy" id="profile-bio">
              The digital studio of Daniel. Product Manager, Musician, and Builder. Constructing human-centric software and creative workflows.
            </p>
          </div>

          <div class="scroll-indicator">
            <div class="scroll-indicator-line"></div>
          </div>
        </section>

        <!-- The Studio (The Vertical Sticky Stack) -->
        <section class="studio-stack" id="studio">
          <!-- Panels injected by script.js -->
        </section>

        <!-- The Design System (The Engine Room) -->
        <section class="engine-room-section" id="design-system">
          <div class="engine-room-content">
            <h2 class="engine-title">SYSTEM ARCHITECTURE</h2>
            <p class="engine-copy">Powered by Geist UI. Explore the foundational principles, typography, and semantic components that power every app in the Inside a Head studio.</p>
            <a href="https://design-system-dm.vercel.app/" class="button button-massive ds-cta" target="_blank" rel="noreferrer" data-hover>
              Explore the Design System <i data-lucide="arrow-right" style="margin-left: 16px; width: 24px; height: 24px;"></i>
            </a>
          </div>
        </section>

        <!-- The Logbook -->
        <section class="logbook-cinematic" id="logbook">
          <div class="logbook-header-wrapper">
            <h2 class="logbook-huge-title">LOGBOOK</h2>
          </div>
          <div id="logbook-list" class="logbook-list">
             <!-- Logbook entries go here -->
          </div>
        </section>

        <!-- The Shelf -->
        <section class="shelf-horizontal-section" id="shelf">
          <div class="shelf-pin-wrapper">
            <h2 class="shelf-huge-title">THE SHELF</h2>
            <div class="shelf-track-container">
              <div class="shelf-track" id="shelf-track">
                <!-- Books injected by script.js -->
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer class="footer-massive">
        <div class="footer-huge-links">
          <a href="https://github.com/iDarcky" target="_blank" rel="noreferrer" id="github-btn" data-hover>GITHUB</a>
          <a href="https://www.linkedin.com/in/danielnmaghis/" target="_blank" rel="noreferrer" id="linkedin-btn" data-hover>LINKEDIN</a>
          <a href="https://www.goodreads.com/user/show/106429003-daniel-maghis" target="_blank" rel="noreferrer" id="goodreads-btn" data-hover>GOODREADS</a>
        </div>
        <div class="footer-bottom-meta">
          <p>© 2026 INSIDE A HEAD STUDIO.</p>
          <a href="#top" class="back-to-top" data-hover>BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>

    <script src="script.js"></script>
  </body>
</html>`;

fs.writeFileSync('index.html', html);
