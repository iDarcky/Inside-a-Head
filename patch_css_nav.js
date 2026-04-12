const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Strip CSS scroll snapping
css = css.replace(/html \{\n  scroll-behavior: smooth;\n  scroll-snap-type: y mandatory;\n\}\n\.section-snap \{\n  scroll-snap-align: start;\n  scroll-snap-stop: always;\n\}/g, '');

// 2. Add styles for Top-Left Anchor
css += `
/* Global Anchor */
.global-anchor {
  position: fixed;
  top: 24px;
  left: 40px;
  z-index: 1001;
  font-family: 'Geist Mono', monospace;
  font-weight: 700;
  color: var(--geist-foreground);
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  flex-direction: column;
  mix-blend-mode: difference;
  transition: opacity var(--fast-transition);
}

.global-anchor:hover {
  opacity: 0.5;
}

.anchor-sub {
  color: var(--accents-6);
  align-self: center;
  margin-top: 2px;
}

/* Dot Navigation */
.dot-nav {
  position: fixed;
  top: 50%;
  right: 40px;
  transform: translateY(-50%);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 16px;
  mix-blend-mode: difference;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accents-5);
  transition: transform var(--fast-transition), background-color var(--fast-transition);
}

.dot.active {
  transform: scale(1.5);
  background-color: var(--geist-foreground);
}

@media (max-width: 768px) {
  .global-anchor {
    top: 16px;
    left: 20px;
  }
  .dot-nav {
    display: none;
  }
}
`;

fs.writeFileSync('styles.css', css);
