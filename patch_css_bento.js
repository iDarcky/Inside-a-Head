const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Remove old shelf CSS
css = css.replace(/\/\* Shelf Horizontal Scroll \*\/[\s\S]*?\/\* Massive Footer \*\//, '/* Massive Footer */');

// Add Bento CSS
css += `
/* Shelf Bento Box */
.bento-section {
  width: 100vw;
  padding: 10vw 5vw;
  background-color: #050505;
  position: relative;
  z-index: 10;
}

.bento-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

.shelf-huge-title {
  font-size: var(--fs-h2);
  margin-bottom: 80px;
  text-transform: uppercase;
  color: var(--accents-3);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 250px;
  gap: 1px; /* 1px gaps */
  background-color: var(--geist-border);
  border: 1px solid var(--geist-border);
}

.bento-tile {
  background-color: #0a0a0a;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.bento-tile:hover {
  background-color: #111;
}

.tile-tall {
  grid-column: span 1;
  grid-row: span 2;
}

.tile-square {
  grid-column: span 1;
  grid-row: span 1;
}

.tile-wide {
  grid-column: span 2;
  grid-row: span 1;
}

.tile-small {
  grid-column: span 1;
  grid-row: span 1;
}

.bento-kicker {
  font-family: 'Geist Mono', monospace;
  font-size: 0.75rem;
  color: var(--accents-5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Specific Tile Styles */
.athletics-data {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
}
.ath-row {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 8px;
}
.ath-label { color: var(--accents-6); font-size: 0.875rem; }
.ath-value { font-family: 'Geist Mono', monospace; font-size: 1.25rem; font-weight: bold; }

.infra-schematic {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
  opacity: 0.5;
}
.node { width: 16px; height: 16px; border-radius: 50%; background-color: var(--accents-7); }
.line { height: 1px; flex: 1; background-color: var(--accents-4); }

.film-still-placeholder {
  width: 100%;
  height: 100%;
  margin-top: 16px;
  background: linear-gradient(145deg, #222, #111);
  border-radius: 4px;
}

/* Responsive Bento */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .tile-tall { grid-column: span 2; grid-row: span 1; }
  .tile-wide { grid-column: span 2; }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-tile { grid-column: span 1 !important; grid-row: span 1 !important; }
}

/* Book Cover Placeholders in Tall Tile */
.bento-book-covers {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}
.book-cover {
  height: 120px;
  background: linear-gradient(145deg, #1a1a1a, #050505);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: flex-end;
  padding: 12px;
}
.book-cover span {
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 1.1;
}

`;

fs.writeFileSync('styles.css', css);
