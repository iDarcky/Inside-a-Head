const fs = require('fs');

const script = `async function loadContent() {
  const response = await fetch("content.json");
  if (!response.ok) {
    throw new Error("Could not load content.json");
  }
  return response.json();
}

function createAppPanel(project, index) {
  const panel = document.createElement("div");
  panel.className = "app-panel";

  // Placeholder charcoal tints
  const colors = ['#0a0f14', '#0a140f', '#140a0a'];
  const bgColor = colors[index % colors.length];
  panel.setAttribute('data-bg', bgColor);

  const paddedIndex = String(index + 1).padStart(2, '0');

  panel.innerHTML = \`
    <div class="app-panel-content">
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
  \`;
  return panel;
}

function createLogbookEntry(entry) {
  const link = document.createElement("a");
  link.className = "logbook-entry";
  link.href = entry.url;
  link.setAttribute('data-hover', '');

  const dateStr = new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\\//g, '.');

  link.innerHTML = \`
    <div class="logbook-date">\${dateStr}</div>
    <div class="logbook-content">
      <h3 class="logbook-title-parallax">\${entry.title}</h3>
    </div>
  \`;
  return link;
}

function createBookPremiumCard(book, index, isCurrent = false) {
  const card = document.createElement("a");
  card.className = "book-premium-card";
  card.href = book.url || "#";
  card.target = "_blank";
  card.rel = "noreferrer";
  card.setAttribute('data-hover', '');

  const rating = book.rating ? "★".repeat(book.rating) + "☆".repeat(5 - book.rating) : "Currently Reading";
  const kicker = isCurrent ? "CURRENTLY READING" : \`READ // \${String(index + 1).padStart(2, '0')}\`;

  card.innerHTML = \`
    <div>
      <div class="book-kicker">\${kicker}</div>
      <h4 class="book-premium-title">\${book.title}</h4>
      <div class="book-premium-author">by \${book.author}</div>
    </div>
    <div class="book-premium-footer">
      <span>\${rating}</span>
      <i data-lucide="arrow-up-right"></i>
    </div>
  \`;
  return card;
}

function renderProfile(profile) {
  const linkedinBtn = document.getElementById("linkedin-btn");
  const githubBtn = document.getElementById("github-btn");

  if (profile.links) {
    const linkedinLink = profile.links.find(l => l.label === "LinkedIn");
    const githubLink = profile.links.find(l => l.label === "GitHub");
    if (linkedinLink && linkedinBtn) linkedinBtn.href = linkedinLink.url;
    if (githubLink && githubBtn) githubBtn.href = githubLink.url;
  }
}

function renderCollections(data) {
  // Studio Panels
  const studioStack = document.getElementById("studio");
  studioStack.innerHTML = "";

  data.projects.forEach((project, idx) =>
    studioStack.appendChild(createAppPanel(project, idx))
  );

  // Logbook
  const logbookList = document.getElementById("logbook-list");
  if (data.logbook && logbookList) {
    logbookList.innerHTML = "";
    data.logbook.forEach(entry => {
      logbookList.appendChild(createLogbookEntry(entry));
    });
  }

  // Shelf (Premium Horizontal Track)
  const shelfTrack = document.getElementById("shelf-track");
  shelfTrack.innerHTML = "";

  if (data.books && data.books.currently_reading) {
    shelfTrack.appendChild(createBookPremiumCard(data.books.currently_reading, 0, true));
  }

  const allBooks = data.books.read || [];
  allBooks.forEach((book, index) => {
    shelfTrack.appendChild(createBookPremiumCard(book, index));
  });
}

// Lenis & GSAP will be appended in the next step

async function init() {
  try {
    const data = await loadContent();
    renderProfile(data.profile);
    renderCollections(data);
    lucide.createIcons();

    // Give DOM a tick to render elements
    setTimeout(() => {
        if (typeof initKineticEngine === 'function') {
            initKineticEngine();
        }
    }, 100);
  } catch (error) {
    console.error("LOAD ERROR:", error.stack || error);
  }
}

init();
`;

fs.writeFileSync('script.js', script);
