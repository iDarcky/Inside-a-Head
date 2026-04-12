const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css += `
/* App Panel Left/Right Layout & Glassmorphism */
.app-panel-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4vw;
  max-width: 1400px;
  width: 100%;
}

.app-text-column {
  flex: 1;
  max-width: 600px;
}

.app-visual-column {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  perspective: 1000px; /* For 3D floating effect */
}

/* The Angled Floating Glass Browser Placeholder */
.glass-browser {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
  transform: rotateY(-15deg) rotateX(5deg);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  /* Mask fading into dark background */
  -webkit-mask-image: linear-gradient(to bottom right, black 40%, transparent 100%);
  mask-image: linear-gradient(to bottom right, black 40%, transparent 100%);
}

.glass-header {
  height: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
}

.glass-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accents-3);
}

.glass-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.glass-skeleton {
  height: 12px;
  background-color: rgba(255,255,255,0.05);
  border-radius: 4px;
}
.glass-skeleton:nth-child(1) { width: 40%; height: 24px; }
.glass-skeleton:nth-child(2) { width: 80%; }
.glass-skeleton:nth-child(3) { width: 60%; }

@media (max-width: 1024px) {
  .app-panel-content {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .app-text-column {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .app-visual-column {
    display: none; /* Hide complex 3D placeholder on small mobile to save space */
  }
}
`;

fs.writeFileSync('styles.css', css);
