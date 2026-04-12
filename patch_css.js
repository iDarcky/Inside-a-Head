const fs = require('fs');

const css = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap');

:root {
  /* Light Theme (Geist Colors) */
  --geist-background: #fff;
  --geist-foreground: #000;
  --accents-1: #fafafa;
  --accents-2: #eaeaea;
  --accents-3: #999;
  --accents-4: #888;
  --accents-5: #666;
  --accents-6: #444;
  --accents-7: #333;
  --accents-8: #111;
  --geist-border: #eaeaea;
  --geist-border-hover: #000;

  --geist-link-color: #0070f3;
  --geist-success: #0070f3;
  --geist-error: #ee0000;
  --geist-warning: #f5a623;

  --fs-hero: clamp(2.5rem, 5vw, 4rem);
  --fs-h2: clamp(1.5rem, 3vw, 2.25rem);
  --fs-body: 1rem;
  --fs-meta: 0.875rem;

  --space-gap: 24px;
  --radius: 8px;

  --transition: 0.2s ease;
}

[data-theme='dark'] {
  --geist-background: #000;
  --geist-foreground: #fff;
  --accents-1: #111;
  --accents-2: #333;
  --accents-3: #444;
  --accents-4: #666;
  --accents-5: #888;
  --accents-6: #999;
  --accents-7: #eaeaea;
  --accents-8: #fafafa;
  --geist-border: #333;
  --geist-border-hover: #fff;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: var(--geist-background);
  color: var(--geist-foreground);
  line-height: 1.6;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  transition: background-color var(--transition), color var(--transition);
}

/* Header & Nav */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(var(--geist-background-rgb, 255, 255, 255), 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--geist-border);
}

[data-theme='dark'] .site-header {
  background-color: rgba(0, 0, 0, 0.8);
}

.header-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accents-5);
  text-decoration: none;
  transition: color var(--transition);
}

.nav-link:hover {
  color: var(--geist-foreground);
}

.theme-toggle {
  background: none;
  border: 1px solid var(--geist-border);
  border-radius: var(--radius);
  padding: 6px;
  cursor: pointer;
  color: var(--geist-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--transition);
}

.theme-toggle:hover {
  border-color: var(--geist-border-hover);
}

.sun-icon, .moon-icon {
  width: 16px;
  height: 16px;
}

[data-theme='light'] .moon-icon { display: none; }
[data-theme='dark'] .sun-icon { display: none; }


.layout {
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 24px;
}

h1, h2, h3 {
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.05em;
}

.title-inside-a-head {
  font-size: var(--fs-hero);
  line-height: 1.1;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 32px;
}

.hero-copy {
  font-size: 1.25rem;
  color: var(--accents-5);
  max-width: 600px;
  margin-bottom: 32px;
}

.section {
  padding: 64px 0;
}

.hero {
  padding-bottom: 40px;
}


.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 40px;
  border-radius: var(--radius);
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all var(--transition);
}

.button-primary {
  background: var(--geist-foreground);
  color: var(--geist-background);
  border: 1px solid var(--geist-foreground);
}

.button-primary:hover {
  background: transparent;
  color: var(--geist-foreground);
}

.button-secondary {
  background: transparent;
  color: var(--accents-5);
  border: 1px solid var(--geist-border);
}

.button-secondary:hover {
  border-color: var(--geist-border-hover);
  color: var(--geist-foreground);
}


/* App Grid (Studio) */
.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.app-card {
  --brand-color: var(--geist-border-hover);
  padding: 24px;
  border: 1px solid var(--geist-border);
  border-radius: var(--radius);
  transition: border-color var(--transition), box-shadow var(--transition);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  background-color: var(--geist-background);
}

.app-card:hover {
  border-color: var(--brand-color);
  box-shadow: 0 0 20px -5px var(--brand-color);
}

.app-card h3 {
  font-family: 'Geist Mono', monospace;
  font-size: 1.1rem;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.app-card p {
  color: var(--accents-5);
  margin-bottom: 24px;
  font-size: 0.95rem;
  flex-grow: 1;
}

.app-card-footer {
  font-size: 0.875rem;
  color: var(--accents-4);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-project {
  display: flex;
  align-items: center;
  transition: color var(--transition);
}

.app-card:hover .view-project {
  color: var(--geist-foreground);
}


/* Design System Integration */
.design-system-section {
  padding: 32px 0 64px 0;
}

.design-system-card {
  background-color: #000;
  color: #fff;
  border-radius: var(--radius);
  padding: 48px;
  position: relative;
  overflow: hidden;
  border: 1px solid #333;
}

/* Faint dot matrix background */
.design-system-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(#333 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.3;
  pointer-events: none;
}

.design-system-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}

.design-system-content h2 {
  font-family: 'Geist Mono', monospace;
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #fff;
}

.design-system-content p {
  color: #a1a1aa; /* custom subtle gray */
  margin-bottom: 32px;
  font-size: 1.1rem;
}

.ds-cta {
  background: #fff;
  color: #000;
  border: 1px solid #fff;
}

.ds-cta:hover {
  background: transparent;
  color: #fff;
  border-color: #fff;
}


/* Logbook */
.logbook-list {
  display: flex;
  flex-direction: column;
}

.logbook-entry {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid var(--geist-border);
  text-decoration: none;
  color: inherit;
  align-items: baseline;
}

.logbook-entry:last-child {
  border-bottom: none;
}

.logbook-date {
  font-family: 'Geist Mono', monospace;
  font-size: 0.875rem;
  color: var(--accents-5);
}

.logbook-content h3 {
  font-size: 1.125rem;
  margin-bottom: 8px;
  transition: text-decoration var(--transition);
}

.logbook-entry:hover .logbook-content h3 {
  text-decoration: underline;
}

.logbook-content p {
  margin: 0;
  color: var(--accents-5);
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .logbook-entry {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}


/* Shelf */
.shelf-container {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (min-width: 768px) {
  .shelf-container {
    flex-direction: row;
    gap: 64px;
  }
  .shelf-column {
    flex: 1;
  }
}

.shelf-kicker {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--accents-5);
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}

.book-compact-card {
  padding: 16px;
  border: 1px solid var(--geist-border);
  border-radius: var(--radius);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-decoration: none;
  color: inherit;
  transition: border-color var(--transition);
}

.book-compact-card:hover {
  border-color: var(--geist-border-hover);
}

.book-compact-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.book-compact-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 0.95rem;
}

.book-compact-index {
  font-family: 'Geist Mono', monospace;
  font-size: 0.875rem;
  color: var(--accents-4);
  width: 24px;
}

.book-compact-title {
  font-weight: 500;
}

.book-compact-author {
  color: var(--accents-5);
  font-size: 0.875rem;
}

.book-rating {
  color: var(--geist-warning);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  margin-left: auto;
}


/* Footer */
.footer {
  margin-top: 80px;
  padding: 40px 0;
  border-top: 1px solid var(--geist-border);
  color: var(--accents-4);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.footer-links a {
  color: var(--accents-5);
  text-decoration: none;
  transition: color var(--transition);
}

.footer-links a:hover {
  color: var(--geist-foreground);
}

.footer-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-meta p {
  margin: 0;
}

.back-to-top {
  color: inherit;
  text-decoration: none;
}


/* Skeletons */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--accents-1) 25%,
    var(--accents-2) 50%,
    var(--accents-1) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
}

.skeleton-card {
  height: 200px;
  border: 1px solid var(--geist-border);
  border-radius: var(--radius);
}
`;

fs.writeFileSync('styles.css', css);
console.log('styles.css updated successfully');
