const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// Update createAppPanel template
const newPanelTemplate = `
  const paddedIndex = String(index + 1).padStart(2, '0');

  panel.innerHTML = \`
    <div class="app-panel-content" id="app-\${index}">
      <div class="app-text-column">
        <div class="app-index">\${paddedIndex}</div>
        <h3 class="app-title">\${project.title}</h3>
        <p class="app-desc">\${project.description}</p>
        <div class="app-meta">
          <span>\${project.status}</span>
          <a href="\${project.url}" target="_blank" rel="noreferrer" class="app-view-link" data-hover>
            View Project <i data-lucide="arrow-up-right" style="margin-left: 8px; width: 16px;"></i>
          </a>
        </div>
      </div>
      <div class="app-visual-column">
        <div class="glass-browser">
          <div class="glass-header">
            <div class="glass-dot"></div><div class="glass-dot"></div><div class="glass-dot"></div>
          </div>
          <div class="glass-body">
            <div class="glass-skeleton"></div>
            <div class="glass-skeleton"></div>
            <div class="glass-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  \`;
`;

s = s.replace(/const paddedIndex = String\(index \+ 1\)\.padStart\(2, '0'\);[\s\S]*?panel\.innerHTML = `[\s\S]*?`;/, newPanelTemplate);

fs.writeFileSync('script.js', s);
