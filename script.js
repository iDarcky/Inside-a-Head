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

function createBookItem(book, index) {
  const item = document.createElement("li");
  item.style.display = "flex";
  item.style.alignItems = "center";
  item.style.gap = "16px";
  item.style.padding = "16px 0";

  const rating = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

  item.innerHTML = `
    <div style="font-family: 'Geist Mono', monospace; font-size: 0.875rem; color: var(--accents-3); width: 24px;">
      ${String(index + 1).padStart(2, '0')}
    </div>
    <div style="flex: 1;">
      <strong style="display: block; font-size: 1rem;">${book.title}</strong>
      <span style="font-size: 0.875rem; color: var(--accents-5); text-transform: lowercase;">${book.author}</span>
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

  const linkedinBtn = document.getElementById("linkedin-btn");
  const githubBtn = document.getElementById("github-btn");

  if (profile.links) {
    const linkedinLink = profile.links.find(l => l.label === "LinkedIn");
    const githubLink = profile.links.find(l => l.label === "GitHub");
    if (linkedinLink) linkedinBtn.href = linkedinLink.url;
    if (githubLink) githubBtn.href = githubLink.url;
  }
}

function renderCollections(data) {
  // Projects
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = "";
  data.projects.forEach((project) =>
    projectsGrid.appendChild(createProjectCard(project))
  );

  // Books
  const booksList = document.getElementById("books-list");
  booksList.innerHTML = "";

  const allBooks = data.books.read || [];
  const initialCount = 5;

  function displayBooks(count) {
    booksList.innerHTML = "";
    allBooks.slice(0, count).forEach((book, index) => {
      booksList.appendChild(createBookItem(book, index));
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
    document.getElementById("reading-title").textContent = data.books.currently_reading.title;
    document.getElementById("reading-author").textContent = data.books.currently_reading.author;

    let readingCard = document.getElementById("reading-card");
    if (readingCard.parentElement.tagName !== 'A') {
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
