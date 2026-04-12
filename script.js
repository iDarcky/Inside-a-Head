async function loadContent() {
  const response = await fetch("content.json");
  if (!response.ok) {
    throw new Error("Could not load content.json");
  }
  return response.json();
}

function createAppCard(project, index) {
  const card = document.createElement("a");
  card.className = "app-card";
  card.href = project.url;
  card.target = "_blank";
  card.rel = "noreferrer";

  // Add 4 borders for hover effect
  card.innerHTML += '<div class="border-top"></div><div class="border-bottom"></div>';

  const paddedIndex = String(index + 1).padStart(2, '0');

  const title = document.createElement("h3");
  title.textContent = `${paddedIndex}_${project.title.replace(/\s+/g, '')}`;

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

  link.innerHTML = `
    <div class="logbook-date">${dateStr}</div>
    <div class="logbook-content">
      <h3>${entry.title}</h3>
      <p>${entry.excerpt}</p>
    </div>
    <div class="logbook-divider"></div>
  `;
  return link;
}

function createBookCompactItem(book, index) {
  const item = document.createElement("div");
  item.className = "book-compact-item";

  const rating = "★".repeat(book.rating) + "☆".repeat(5 - book.rating);

  item.innerHTML = `
    <div class="book-compact-index">
      ${String(index + 1).padStart(2, '0')}
    </div>
    <div>
      <span class="book-compact-title">${book.title}</span>
      <span class="book-compact-author"> by ${book.author}</span>
    </div>
    <div class="book-rating">${rating}</div>
  `;
  return item;
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
  // Studio (Projects)
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = "";

  // Add shimmering background explicitly here
  const studioBg = document.createElement('div');
  studioBg.className = 'studio-grid-bg';
  document.getElementById('studio').prepend(studioBg);

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
      // Re-trigger scrollTrigger to recalculate bounds after DOM shift
      ScrollTrigger.refresh();
    });
  } else {
    seeAllBtn.style.display = "none";
  }

  // Currently Reading
  if (data.books && data.books.currently_reading) {
    let readingCard = document.getElementById("reading-card");
    readingCard.innerHTML = `
      <i data-lucide="book-open" style="color: var(--geist-foreground); margin-top: 2px;"></i>
      <div>
        <strong style="display: block; line-height: 1.2; margin-bottom: 4px; font-size: 1.1rem;">${data.books.currently_reading.title}</strong>
        <span style="font-size: 0.875rem; color: var(--accents-5);">${data.books.currently_reading.author}</span>
      </div>
    `;

    if (readingCard.parentElement.tagName !== 'A') {
        const link = document.createElement("a");
        link.href = data.books.currently_reading.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.className = "book-compact-card";
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

function initAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // 1. Intro Visual Parallax
  gsap.to(".intro-logo-overlay", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".intro-visual-container",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // 2. Studio App Cards Staggered Entry
  gsap.from(".app-card", {
    scrollTrigger: {
      trigger: ".studio-section",
      start: "top 75%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  });

  // 3. Logbook Kinetic Parallax and Staggered Entry
  const logbookEntries = gsap.utils.toArray('.logbook-entry');
  logbookEntries.forEach(entry => {
    // Divider animation on entry
    gsap.to(entry.querySelector('.logbook-divider'), {
      width: '100%',
      duration: 1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: entry,
        start: "top 85%"
      }
    });

    // Content entry staggered
    gsap.from(entry.querySelectorAll('.logbook-date, .logbook-content'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: entry,
        start: "top 85%"
      }
    });

    // Scrubbing horizontal parallax (Dates move faster/opposite to content)
    gsap.to(entry.querySelector('.logbook-date'), {
      x: -20,
      ease: "none",
      scrollTrigger: {
        trigger: entry,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(entry.querySelector('.logbook-content'), {
      x: 10,
      ease: "none",
      scrollTrigger: {
        trigger: entry,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // 4. Shelf Expanding Entry
  gsap.from(".book-compact-card, .book-compact-item", {
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.2)",
    scrollTrigger: {
      trigger: ".shelf-section",
      start: "top 80%"
    }
  });
}

async function init() {
  initTheme();
  try {
    const data = await loadContent();
    renderProfile(data.profile);
    renderCollections(data);
    lucide.createIcons();

    // Give DOM a tick to render elements before attaching ScrollTrigger
    setTimeout(initAnimations, 100);
  } catch (error) {
    const fallback = document.createElement("p");
    fallback.textContent = "Content could not be loaded.";
    document.querySelector("main").prepend(fallback);
    console.error("LOAD ERROR:", error.stack || error);
  }
}

init();
