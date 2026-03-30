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
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = project.title;
  title.appendChild(link);

  const desc = document.createElement("p");
  desc.textContent = project.description;

  const meta = document.createElement("p");
  meta.className = "meta";
  meta.textContent = `${project.date} - ${project.status}`;

  const tagRow = document.createElement("div");
  tagRow.className = "tag-row";
  project.stack.forEach((tag) => tagRow.appendChild(createTag(tag)));

  card.append(title, desc, meta, tagRow);
  return card;
}

function createPostItem(post) {
  const item = document.createElement("li");
  item.innerHTML = `
    <a href="/posts/${post.slug}"><strong>${post.title}</strong></a>
    <div class="meta">${post.date} - ${post.readTime}</div>
    <p>${post.excerpt}</p>
  `;
  return item;
}

function createActivityItem(entry) {
  const item = document.createElement("li");
  item.innerHTML = `
    <div class="meta">${entry.category}</div>
    <a href="${entry.url}" target="_blank" rel="noreferrer"><strong>${entry.label}</strong></a>
    <div class="meta">${entry.timestamp}</div>
  `;
  return item;
}

function renderProfile(profile) {
  document.getElementById("profile-name").textContent = profile.name;
  document.querySelector(".hero-title").textContent = profile.role;
  document.getElementById("profile-bio").textContent = profile.bio;
  document.getElementById("about-text").textContent = profile.bio;

  const linksList = document.getElementById("profile-links");
  profile.links.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.url}" target="_blank" rel="noreferrer">${item.label}</a>`;
    linksList.appendChild(li);
  });
}

function renderCollections(data) {
  const projectsGrid = document.getElementById("projects-grid");
  data.projects.forEach((project) =>
    projectsGrid.appendChild(createProjectCard(project))
  );

  const postsList = document.getElementById("posts-list");
  data.posts.forEach((post) => postsList.appendChild(createPostItem(post)));

  const activityList = document.getElementById("activity-list");
  data.activity.forEach((entry) =>
    activityList.appendChild(createActivityItem(entry))
  );
}

async function init() {
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
