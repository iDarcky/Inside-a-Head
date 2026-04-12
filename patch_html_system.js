const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Wrap text in a div
const oldEngineRoom = `
          <div class="engine-room-content">
            <h2 class="engine-title">SYSTEM ARCHITECTURE</h2>
            <p class="engine-copy">Powered by Geist UI. Explore the foundational principles, typography, and semantic components that power every app in the Inside a Head studio.</p>
            <a href="https://design-system-dm.vercel.app/" class="button button-massive ds-cta" target="_blank" rel="noreferrer" data-hover>
              Explore the Design System <i data-lucide="arrow-right" style="margin-left: 16px; width: 24px; height: 24px;"></i>
            </a>
          </div>
`;

const newEngineRoom = `
          <div class="engine-room-content">
            <div>
              <h2 class="engine-title">SYSTEM ARCHITECTURE</h2>
              <p class="engine-copy">Powered by Geist UI. Explore the foundational principles, typography, and semantic components that power every app in the studio.</p>
            </div>
            <a href="https://design-system-dm.vercel.app/" class="button button-massive ds-cta" target="_blank" rel="noreferrer" data-hover>
              Explore <i data-lucide="arrow-right" style="margin-left: 16px; width: 24px; height: 24px;"></i>
            </a>
          </div>
`;

html = html.replace(oldEngineRoom, newEngineRoom);

fs.writeFileSync('index.html', html);
