const fs = require('fs');

const oldHtml = fs.readFileSync('index.html', 'utf8');

const newHtml = `<!DOCTYPE html>
<html lang="en" data-theme="light">
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
  </head>
  <body>
    <header class="site-header">
      <div class="header-inner">
        <nav class="nav-links">
          <a href="#top" class="nav-link">Studio</a>
          <a href="#logbook" class="nav-link">Logbook</a>
          <a href="#shelf" class="nav-link">Shelf</a>
        </nav>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
          <i data-lucide="sun" class="sun-icon"></i>
          <i data-lucide="moon" class="moon-icon"></i>
        </button>
      </div>
    </header>

    <div class="layout">
      <main>
        <section class="hero" id="top">
          <h1 id="hero-title" class="title-inside-a-head">Inside a Head.</h1>
          <p class="hero-copy" id="profile-bio">
            The digital studio of Daniel. Product Manager, Musician, and Builder. Constructing human-centric software and creative workflows.
          </p>
        </section>

        <section class="section" id="studio" aria-labelledby="projects-title">
          <div id="projects-grid" class="app-grid">
            <!-- Skeletons initially -->
            <div class="app-card skeleton skeleton-card"></div>
            <div class="app-card skeleton skeleton-card"></div>
            <div class="app-card skeleton skeleton-card"></div>
          </div>
        </section>

        <section class="design-system-section">
          <div class="design-system-card">
            <div class="design-system-content">
              <h2>System Architecture</h2>
              <p>Powered by Geist UI. Explore the foundational principles, typography, and semantic components that power every app in the Inside a Head studio.</p>
              <a href="https://design-system-dm.vercel.app/" class="button button-primary ds-cta" target="_blank" rel="noreferrer">
                Explore the Design System <i data-lucide="arrow-right" style="margin-left: 8px; width: 16px;"></i>
              </a>
            </div>
          </div>
        </section>

        <section class="section" id="logbook" aria-labelledby="logbook-title">
          <h2 id="logbook-title" class="section-title">Logbook</h2>
          <div id="logbook-list" class="logbook-list">
             <!-- Logbook entries go here -->
          </div>
        </section>

        <section class="section" id="shelf" aria-labelledby="books-title">
          <h2 id="books-title" class="section-title">Shelf</h2>
          <div class="shelf-container">
            <div id="currently-reading" class="shelf-column">
              <h3 class="shelf-kicker">Currently Reading</h3>
              <div id="reading-card" class="book-compact-card">
                 <!-- Populated by script.js -->
              </div>
            </div>
            <div class="shelf-column">
              <h3 class="shelf-kicker">Recently Read</h3>
              <div id="books-list" class="book-compact-grid">
                <!-- Populated by script.js -->
              </div>
              <div style="margin-top: 16px;">
                 <button id="see-all-books" class="button button-secondary" style="font-size: 0.75rem; display: none;">
                   See all <i data-lucide="chevron-down" style="margin-left: 8px; width: 16px;"></i>
                 </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <div class="footer-links">
          <a href="https://github.com/iDarcky" target="_blank" rel="noreferrer" id="github-btn">GitHub</a>
          <a href="https://www.linkedin.com/in/danielnmaghis/" target="_blank" rel="noreferrer" id="linkedin-btn">LinkedIn</a>
          <a href="https://www.goodreads.com/user/show/106429003-daniel-maghis" target="_blank" rel="noreferrer" id="goodreads-btn">Goodreads</a>
        </div>
        <div class="footer-meta">
          <p>&copy; 2026 Inside a Head.</p>
          <a href="#top" class="back-to-top">Back to top &uarr;</a>
        </div>
      </footer>
    </div>

    <script src="script.js"></script>
    <script>
      // Initialize icons
      lucide.createIcons();
    </script>
  </body>
</html>`;

fs.writeFileSync('index.html', newHtml);
console.log('index.html updated successfully');
