const fs = require('fs');

const script = `async function loadContent() {
  const response = await fetch("content.json");
  if (!response.ok) {
    throw new Error("Could not load content.json");
  }
  return response.json();
}

function createTag(tag) {
  const span = document.createElement("span");
  span.className = "tag";
  span.textContent = tag;
  return span;
}

function createAppCard(project, index) {
  const card = document.createElement("a");
  card.className = "app-card";
  card.href = project.url;
  card.target = "_blank";
  card.rel = "noreferrer";

  // Prepend padded index (e.g. "01_")
  const paddedIndex = String(index + 1).padStart(2, '0');

  const title = document.createElement("h3");
  title.textContent = \`\${paddedIndex}_\${project.title.replace(/\s+/g, '')}\`;

  const desc = document.createElement("p");
  desc.textContent = project.description;

  const footer = document.createElement("div");
  footer.className = "app-card-footer";

  const status = document.createElement("span");
  status.textContent = project.status;

  const viewProject = document.createElement("span");
  viewProject.className = "view-project";
  viewProject.innerHTML = 'View Project <i data-lucide="arrow-up-right" style="margin-left: 4px; width: 14px;"></i>';

  footer.append(status, viewProject);
  card.append(title, desc, footer);
  return card;
}

function createLogbookEntry(entry) {
  const link = document.createElement("a");
  link.className = "logbook-entry";
  link.href = entry.url;

  const dateStr = new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');

  link.innerHTML = \`
    <div class="logbook-date">\${dateStr}</div>
    <div class="logbook-content">
      <h3>\${entry.title}</h3>
      <p>\${entry.excerpt}</p>
    </div>
  \`;
  return link;
}

function createBookCompactItem(book, index) {
  const item = document.createElement("div");
  item.className = "book-compact-item";

  const rating = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

  item.innerHTML = \`
    <div class="book-compact-index">
      \${String(index + 1).padStart(2, '0')}
    </div>
    <div>
      <span class="book-compact-title">\${book.title}</span>
      <span class="book-compact-author"> by \${book.author}</span>
    </div>
    <div class="book-rating">\${rating}</div>
  \`;
  return item;
}

function renderProfile(profile) {
  document.getElementById("hero-title").textContent = "Inside a Head.";
  document.getElementById("profile-bio").textContent = profile.bio;

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
  // Studio (Projects)
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = "";
  data.projects.forEach((project, idx) =>
    projectsGrid.appendChild(createAppCard(project, idx))
  );

  // Logbook
  const logbookList = document.getElementById("logbook-list");
  if (data.logbook && logbookList) {
    logbookList.innerHTML = "";
    data.logbook.forEach(entry => {
      logbookList.appendChild(createLogbookEntry(entry));
    });
  }

  // Shelf (Books)
  const booksList = document.getElementById("books-list");
  booksList.innerHTML = "";

  const allBooks = data.books.read || [];
  const initialCount = 5;

  function displayBooks(count) {
    booksList.innerHTML = "";
    allBooks.slice(0, count).forEach((book, index) => {
      booksList.appendChild(createBookCompactItem(book, index));
    });
  }

  displayBooks(initialCount);

  const seeAllBtn = document.getElementById("see-all-books");
  if (allBooks.length > initialCount) {
    seeAllBtn.style.display = "inline-flex";
    seeAllBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (seeAllBtn.textContent.includes("See all")) {
        displayBooks(10);
        seeAllBtn.innerHTML = 'Show less <i data-lucide="chevron-up" style="margin-left: 8px; width: 16px;"></i>';
      } else {
        displayBooks(initialCount);
        seeAllBtn.innerHTML = 'See all <i data-lucide="chevron-down" style="margin-left: 8px; width: 16px;"></i>';
      }
      lucide.createIcons({ elements: seeAllBtn.querySelectorAll('[data-lucide]') });
    });
  } else {
    seeAllBtn.style.display = "none";
  }

  // Currently Reading
  if (data.books && data.books.currently_reading) {
    let readingCard = document.getElementById("reading-card");
    readingCard.innerHTML = \`
      <i data-lucide="book-open" style="color: var(--geist-success); margin-top: 2px;"></i>
      <div>
        <strong style="display: block; line-height: 1.2; margin-bottom: 4px;">\${data.books.currently_reading.title}</strong>
        <span style="font-size: 0.875rem; color: var(--accents-5);">\${data.books.currently_reading.author}</span>
      </div>
    \`;

    if (readingCard.parentElement.tagName !== 'A') {
        const link = document.createElement("a");
        link.href = data.books.currently_reading.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.style.textDecoration = "none";
        link.style.color = "inherit";
        link.className = "book-compact-card";

        // Move innerHTML over
        link.innerHTML = readingCard.innerHTML;

        readingCard.parentNode.replaceChild(link, readingCard);
    }
  }
}

function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    });
  }
}

async function init() {
  initTheme();
  try {
    const data = await loadContent();
    renderProfile(data.profile);
    renderCollections(data);
    lucide.createIcons();
  } catch (error) {
    const fallback = document.createElement("p");
    fallback.textContent = "Content could not be loaded.";
    document.querySelector("main").prepend(fallback);
    console.error(error);
  }
}

init();
`;

fs.writeFileSync('script.js', script);
console.log('script.js updated successfully');
