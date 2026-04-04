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

function createPostItem(post) {
  const item = document.createElement("li");
  item.innerHTML = `
    <a href="/posts/${post.slug}">
      <strong style="display: block; font-size: 1.125rem;">${post.title}</strong>
      <div class="meta" style="margin-top: 4px;">${post.date} - ${post.readTime}</div>
    </a>
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

  const linksList = document.getElementById("profile-links");
  linksList.innerHTML = "";
  profile.links.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.url}" class="button button-secondary" target="_blank" rel="noreferrer">${item.label}</a>`;
    linksList.appendChild(li);
  });
}

function renderCollections(data) {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = ""; // Clear skeletons
  data.projects.forEach((project) =>
    projectsGrid.appendChild(createProjectCard(project))
  );

  const postsList = document.getElementById("posts-list");
  postsList.innerHTML = ""; // Clear skeletons
  data.posts.forEach((post) => postsList.appendChild(createPostItem(post)));
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
