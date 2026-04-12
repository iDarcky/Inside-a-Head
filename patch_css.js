const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// We are going to completely rewrite styles.css for the kinetic layout
const newCss = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap');

:root {
  /* High-contrast monochromatic colors */
  --geist-background: #ffffff;
  --geist-card-bg: #fafafa;
  --geist-foreground: #000000;

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

  --fs-hero: clamp(3rem, 6vw, 5rem);
  --fs-h2: clamp(2rem, 4vw, 3rem);

  --radius: 12px;
  --transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --fast-transition: 0.2s ease;
}

[data-theme='dark'] {
  --geist-background: #000000;
  --geist-card-bg: #0a0a0a;
  --geist-foreground: #ffffff;

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

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}

body {
  font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--geist-background);
  color: var(--geist-foreground);
  line-height: 1.6;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  transition: background-color var(--transition), color var(--transition);
  overflow-x: hidden;
}

/* Sticky Header */
.site-header {
  position: fixed; /* Using fixed to float above the scrolling cards */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: none; /* Minimalist, non-bordered */
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-family: 'Geist Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accents-5);
  text-decoration: none;
  transition: color var(--fast-transition);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-link:hover {
  color: var(--geist-foreground);
}

.theme-toggle {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--geist-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--fast-transition);
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.sun-icon, .moon-icon {
  width: 18px;
  height: 18px;
}

[data-theme='light'] .moon-icon { display: none; }
[data-theme='dark'] .sun-icon { display: none; }

/* Layout & Stacking Cards */
.layout {
  padding-top: 80px; /* space for fixed header */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0; /* Cards will stack tightly or overlap slightly via JS */
}

main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-card {
  width: 100%;
  max-width: 1200px;
  min-height: 80vh; /* Near full-screen */
  margin-bottom: 24px; /* Default spacing, will be enhanced by GSAP */
  padding: 80px 40px;
  background-color: var(--geist-card-bg);
  border: 1px solid var(--geist-border);
  border-radius: var(--radius);
  position: sticky;
  top: 80px; /* Sticking points for depth */
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
  overflow: hidden; /* For backgrounds */
}

[data-theme='dark'] .section-card {
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
}

h1, h2, h3 {
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.05em;
}

.section-title {
  font-size: var(--fs-h2);
  margin-bottom: 48px;
}

/* Intro Visual */
.intro-visual-container {
  position: relative;
  width: 100%;
  height: 50vh;
  min-height: 400px;
  border-radius: calc(var(--radius) - 4px);
  overflow: hidden;
  margin-bottom: 48px;
  background-color: #1a1a1a;
}

.intro-portrait {
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, #2a2a2a, #0a0a0a);
}

/* CSS Grain */
.intro-portrait::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.intro-logo-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  mix-blend-mode: overlay;
}

.iah-logo {
  width: 80%;
  height: 80%;
  opacity: 0.8;
  color: #ffffff;
}

.intro-text-container {
  max-width: 800px;
}

.title-inside-a-head {
  font-size: var(--fs-hero);
  line-height: 1;
  margin-bottom: 24px;
}

.hero-copy {
  font-size: 1.5rem;
  color: var(--accents-5);
  max-width: 600px;
}

/* Buttons */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 48px;
  border-radius: 99px; /* Pill shape for premium feel */
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all var(--fast-transition);
}

.button-primary {
  background: var(--geist-foreground);
  color: var(--geist-background);
  border: 1px solid var(--geist-foreground);
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

[data-theme='dark'] .button-primary:hover {
  box-shadow: 0 4px 12px rgba(255,255,255,0.1);
}


/* Studio Section & Grid Animation */
.studio-section {
  position: relative;
  background-color: var(--geist-card-bg);
}

.studio-grid-bg {
  position: absolute;
  inset: 0;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, rgba(128, 128, 128, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(128, 128, 128, 0.05) 1px, transparent 1px);
  z-index: 0;
  animation: shimmerGrid 10s linear infinite;
}

[data-theme='dark'] .studio-grid-bg {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

@keyframes shimmerGrid {
  0% { transform: translateY(0); }
  100% { transform: translateY(40px); }
}

#projects-grid {
  position: relative;
  z-index: 1;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

/* App Card Hover Flowing Border */
.app-card {
  --brand-color: var(--geist-foreground);
  position: relative;
  padding: 32px;
  background-color: var(--geist-background);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--geist-border);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
  overflow: hidden;
}

/* 4 Animated Borders using pseudoelements */
.app-card::before, .app-card::after,
.app-card .border-top, .app-card .border-bottom {
  content: '';
  position: absolute;
  background: var(--brand-color);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.app-card::before { /* Left border */
  top: 0; left: 0; width: 2px; height: 100%;
  transform: scaleY(0); transform-origin: bottom;
}
.app-card::after { /* Right border */
  top: 0; right: 0; width: 2px; height: 100%;
  transform: scaleY(0); transform-origin: top;
}
.border-top { /* Top border */
  top: 0; left: 0; width: 100%; height: 2px;
  transform: scaleX(0); transform-origin: left;
  position: absolute;
}
.border-bottom { /* Bottom border */
  bottom: 0; left: 0; width: 100%; height: 2px;
  transform: scaleX(0); transform-origin: right;
  position: absolute;
}

.app-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
  border-color: transparent;
}

[data-theme='dark'] .app-card:hover {
  box-shadow: 0 20px 40px -10px rgba(255,255,255,0.05);
}

.app-card:hover::before, .app-card:hover::after { transform: scaleY(1); }
.app-card:hover .border-top, .app-card:hover .border-bottom { transform: scaleX(1); }

.app-card h3 {
  font-family: 'Geist Mono', monospace;
  font-size: 1.25rem;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 2;
}

.app-card p {
  color: var(--accents-5);
  margin-bottom: 32px;
  font-size: 1rem;
  flex-grow: 1;
  position: relative;
  z-index: 2;
}

.app-card-footer {
  font-family: 'Geist Mono', monospace;
  font-size: 0.75rem;
  color: var(--accents-4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}


/* Design System */
.design-system-card {
  /* Using standard section-card for the main wrapper */
}

/* Logbook */
.logbook-list {
  display: flex;
  flex-direction: column;
  overflow: hidden; /* contain parallaxing items */
}

.logbook-entry {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 32px;
  padding: 40px 0;
  text-decoration: none;
  color: inherit;
  align-items: baseline;
  position: relative;
}

/* Divider animated via JS */
.logbook-divider {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0%;
  height: 1px;
  background-color: var(--geist-border);
  transform: translateX(-50%);
}

.logbook-date {
  font-family: 'Geist Mono', monospace;
  font-size: 0.875rem;
  color: var(--accents-5);
  /* The element itself is animated by GSAP */
}

.logbook-content {
  /* The element itself is animated by GSAP */
}

.logbook-content h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  transition: color var(--fast-transition);
}

.logbook-entry:hover .logbook-content h3 {
  color: var(--accents-5);
}

.logbook-content p {
  margin: 0;
  color: var(--accents-5);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .logbook-entry {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Shelf */
.shelf-container {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

@media (min-width: 768px) {
  .shelf-container {
    flex-direction: row;
  }
  .shelf-column {
    flex: 1;
  }
}

.shelf-kicker {
  font-family: 'Geist Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--accents-5);
  letter-spacing: 0.1em;
  margin-bottom: 24px;
}

.book-compact-card, .book-compact-item {
  /* animated by GSAP expanding */
  will-change: transform, opacity;
}

.book-compact-card {
  padding: 24px;
  border: 1px solid var(--geist-border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  gap: 24px;
  text-decoration: none;
  color: inherit;
  background-color: var(--geist-background);
  transition: transform var(--fast-transition);
}

.book-compact-card:hover {
  transform: scale(1.02);
}

.book-compact-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.book-compact-item {
  display: flex;
  align-items: baseline;
  gap: 16px;
  font-size: 1rem;
  padding: 8px 0;
  border-bottom: 1px solid transparent;
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
  color: var(--geist-foreground);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  margin-left: auto;
}

/* Footer */
.footer {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto 80px;
  padding: 40px;
  border-top: 1px solid var(--geist-border);
  color: var(--accents-4);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
}

.footer-links a {
  color: var(--accents-5);
  text-decoration: none;
  transition: color var(--fast-transition);
  font-weight: 500;
}

.footer-links a:hover {
  color: var(--geist-foreground);
}

.footer-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .section-card {
    padding: 40px 24px;
    min-height: auto;
  }
}
`;

fs.writeFileSync('styles.css', newCss);
