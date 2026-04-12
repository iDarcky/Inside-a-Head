const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// We'll append media queries and mobile adjustments.
css += `
/* ---- POLISH & RESPONSIVENESS ---- */

/* Disable Custom Cursor on Touch Devices */
@media (pointer: coarse) {
  body, a, button, [data-hover] {
    cursor: auto !important;
  }
  .custom-cursor {
    display: none !important;
  }
}

/* Ensure no horizontal scrolling */
body, .layout {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .header-inner {
    padding: 16px;
    justify-content: center;
  }
  .nav-links {
    gap: 20px;
  }

  .hero-massive-text {
    font-size: clamp(3rem, 15vw, 6rem);
  }

  .hero-center-cluster {
    width: 60vw;
    height: 80vw;
  }

  .hero-copy {
    bottom: 5vh;
    left: 20px;
    right: 20px;
    font-size: 1rem;
    text-align: center;
  }

  .app-panel {
    padding: 4vw;
  }

  .app-title {
    font-size: clamp(2.5rem, 10vw, 4rem);
    margin-bottom: 24px;
  }

  .app-desc {
    font-size: 1rem;
    margin-bottom: 32px;
  }

  .app-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .engine-room-section {
    padding: 20vw 5vw;
  }

  .engine-copy {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  .button-massive {
    padding: 16px 32px;
    font-size: 1rem;
    width: 100%;
    text-align: center;
  }

  .logbook-huge-title {
    font-size: clamp(2rem, 8vw, 4rem);
  }

  .logbook-content h3 {
    font-size: clamp(1.5rem, 6vw, 3rem);
  }

  .shelf-pin-wrapper {
    padding: 0 5vw;
  }

  .shelf-huge-title {
    margin-bottom: 40px;
  }

  .book-premium-card {
    width: 280px;
    height: 350px;
    padding: 24px;
  }

  .book-premium-title {
    font-size: 1.5rem;
  }

  .footer-huge-links a {
    font-size: clamp(2rem, 10vw, 4rem);
  }

  .footer-bottom-meta {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
}

/* Engine Room CTA Shimmer */
.ds-cta {
  position: relative;
  overflow: hidden;
}
.ds-cta::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  transform: skewX(-20deg);
  transition: 0.5s;
}
.ds-cta:hover::after {
  left: 150%;
}
[data-theme='dark'] .ds-cta::after {
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent);
}
`;

fs.writeFileSync('styles.css', css);
