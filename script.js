async function loadContent() {
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

function createProjectCard(project) {
  const card = document.createElement("a");
  card.className = "card";
  card.href = project.url;
  card.target = "_blank";
  card.rel = "noreferrer";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const desc = document.createElement("p");
  desc.textContent = project.description;

  const tagRow = document.createElement("div");
  tagRow.className = "tag-row";
  project.stack.forEach((tag) => tagRow.appendChild(createTag(tag)));

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${project.date} - ${project.status}`;

  card.append(title, desc, tagRow, meta);
  return card;
}

function createBookItem(book) {
  const item = document.createElement("li");
  item.style.display = "flex";
  item.style.justify_content = "space-between";
  item.style.alignItems = "center";

  const rating = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

  item.innerHTML = `
    <div style="flex: 1;">
      <strong style="display: block; font-size: 1rem;">${book.title}</strong>
      <span style="font-size: 0.875rem; color: var(--accents-5);">${book.author}</span>
    </div>
    <div style="color: var(--geist-warning); font-size: 0.75rem; letter-spacing: 0.1em;">${rating}</div>
  `;
  return item;
}

function renderProfile(profile) {
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("hero-title").textContent = profile.role;
  document.getElementById("profile-bio").textContent = profile.bio;

  if (profile.who_am_i) {
    document.getElementById("who-am-i-text").textContent = profile.who_am_i;
  }

  const whatIDoList = document.getElementById("what-i-do-list");
  if (profile.what_i_do && whatIDoList) {
    whatIDoList.innerHTML = "";
    profile.what_i_do.forEach(item => {
      const li = document.createElement("li");
      li.style.borderBottom = "none";
      li.style.padding = "4px 0";
      li.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px; color: var(--geist-success); margin-right: 8px;"></i> ${item}`;
      whatIDoList.appendChild(li);
    });
    lucide.createIcons({
      elements: whatIDoList.querySelectorAll('[data-lucide]')
    });
  }

  // LinkedIn and GitHub buttons already in HTML, but we could update URLs if needed
  const linkedinBtn = document.getElementById("linkedin-btn");
  const githubBtn = document.getElementById("github-btn");
  const linkedinLink = profile.links.find(l => l.label === "LinkedIn");
  const githubLink = profile.links.find(l => l.label === "GitHub");

  if (linkedinLink) linkedinBtn.href = linkedinLink.url;
  if (githubLink) githubBtn.href = githubLink.url;
}

function renderCollections(data) {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = ""; // Clear skeletons
  data.projects.forEach((project) =>
    projectsGrid.appendChild(createProjectCard(project))
  );

  const booksList = document.getElementById("books-list");
  booksList.innerHTML = ""; // Clear skeletons
  if (data.books && data.books.read) {
    data.books.read.forEach((book) => booksList.appendChild(createBookItem(book)));
  }

  // Update currently reading
  if (data.books && data.books.currently_reading) {
    document.getElementById("reading-title").textContent = data.books.currently_reading.title;
    document.getElementById("reading-author").textContent = data.books.currently_reading.author;
    const readingCard = document.getElementById("reading-card");
    if (readingCard.tagName === 'A' || readingCard.parentElement.tagName === 'A') {
        // already wrapped or is a link
    } else {
        const link = document.createElement("a");
        link.href = data.books.currently_reading.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.style.textDecoration = "none";
        link.style.color = "inherit";
        readingCard.parentNode.replaceChild(link, readingCard);
        link.appendChild(readingCard);
    }
  }
}

// Theme management
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
}

async function init() {
  initTheme();
  try {
    const data = await loadContent();
    renderProfile(data.profile);
    renderCollections(data);
  } catch (error) {
    const fallback = document.createElement("p");
    fallback.textContent = "Content could not be loaded.";
    document.querySelector("main").prepend(fallback);
    console.error(error);
  }
}

init();
