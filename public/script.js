async function loadContent() {
  const response = await fetch("content.json");
  if (!response.ok) {
    throw new Error("Could not load content.json");
  }
  return response.json();
}

function createAppPanel(project, index) {
  const panel = document.createElement("div");
  panel.className = "app-panel section-snap";

  // Placeholder charcoal tints
  const colors = ['#1a0f30', '#121f1a', '#300a0a'];
  const bgColor = colors[index % colors.length];
  panel.setAttribute('data-bg', bgColor);


  const paddedIndex = String(index + 1).padStart(2, '0');
  const reverseClass = index % 2 !== 0 ? 'reverse' : '';

  panel.innerHTML = `
    <div class="app-panel-content ${reverseClass}" id="app-${index}">
      <div class="app-text-column">
        <div class="app-index">${paddedIndex}</div>
        <h3 class="app-title">${project.title}</h3>
        <p class="app-desc">${project.description}</p>
        <div class="app-meta">
          <a href="/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="app-view-link" data-hover>Learn more</a>
          <a href="${project.url}" target="_blank" rel="noreferrer" class="app-view-link" data-hover>
            View Project <i data-lucide="arrow-up-right" style="margin-left: 8px; width: 16px;"></i>
          </a>
        </div>
      </div>
      <div class="app-visual-column">
        ${project.device === 'iphone' ? `
          <div class="glass-iphone">
            <div class="iphone-notch"></div>
            <div class="iphone-screen" ${project.image ? `style="background: url('${project.image}') top center/cover no-repeat;"` : ''}></div>
          </div>
        ` : `
          <div class="glass-browser">
            <div class="glass-header">
              <div class="glass-dot"></div><div class="glass-dot"></div><div class="glass-dot"></div>
            </div>
            <div class="glass-body" ${project.image ? `style="background: url('${project.image}') top left/cover no-repeat; height: 100%; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;"` : ''}>
              ${project.image ? '' : `
              <div class="glass-skeleton"></div>
              <div class="glass-skeleton"></div>
              <div class="glass-skeleton"></div>
              `}
            </div>
          </div>
        `}
      </div>
    </div>
  `;

  return panel;
}

function createLogbookEntry(entry) {
  const link = document.createElement("a");
  link.className = "logbook-entry";
  link.href = entry.url;
  link.setAttribute('data-hover', '');

  const dateStr = new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');

  link.innerHTML = `
    <div class="logbook-date">${dateStr}</div>
    <div class="logbook-content">
      <h3 class="logbook-title-parallax">${entry.title}</h3>
    </div>
  `;
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
  const kicker = isCurrent ? "CURRENTLY READING" : `READ // ${String(index + 1).padStart(2, '0')}`;

  card.innerHTML = `
    <div>
      <div class="book-kicker">${kicker}</div>
      <h4 class="book-premium-title">${book.title}</h4>
      <div class="book-premium-author">by ${book.author}</div>
    </div>
    <div class="book-premium-footer">
      <span>${rating}</span>
      <i data-lucide="arrow-up-right"></i>
    </div>
  `;
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

async function renderCollections(data) {
  // Studio Panels
  const studioAnchor = document.getElementById("studio-anchor");

  data.projects.forEach((project, idx) => {
    const panel = createAppPanel(project, idx);
    studioAnchor.parentNode.insertBefore(panel, studioAnchor);
  });

  // Logbook
  const logbookList = document.getElementById("logbook-list");
  if (data.logbook && logbookList) {
    logbookList.innerHTML = "";
    data.logbook.forEach(entry => {
      logbookList.appendChild(createLogbookEntry(entry));
    });
  }

  // Bento Box Reading Tile
  const bentoReading = document.getElementById("bento-reading");
  if (bentoReading && data.books) {
    let readingHTML = `<div class="bento-kicker">CURRENTLY READING</div><div class="bento-book-covers">`;


    if (data.books.currently_reading) {
      readingHTML += `<div class="book-cover" style="flex: 1; min-height: 300px; background: url('https://images.theconversation.com/files/620924/original/file-20240923-18-7oph3j.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1000&fit=clip') center/cover no-repeat; position: relative;">
        <span style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.7); padding: 4px 8px;">${data.books.currently_reading.title}</span>
      </div>`;
    }

    readingHTML += `</div>`;
    bentoReading.innerHTML = readingHTML;
  }

  // Populate GitHub Matrix (Option B: Real Data)
  const githubMatrix = document.querySelector(".github-matrix");
  if (githubMatrix) {
    githubMatrix.innerHTML = ""; // Clear existing
    try {
      const ghResp = await fetch("https://github-contributions-api.deno.dev/iDarcky");
      if (ghResp.ok) {
        const ghData = await ghResp.json();
        
        // Update Total Count
        const countEl = document.getElementById("gh-total-count");
        if (countEl) {
          let total = 0;
          if (ghData.totalContributions) {
            total = ghData.totalContributions;
          } else if (ghData.total) {
            total = Object.values(ghData.total).reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
          }
          countEl.textContent = `${total.toLocaleString()} contributions in the last year`;
        }

        // Set to 245 days (35 weeks) to perfectly fit a 2-span tile in a 5nd col grid
        const flattened = ghData.contributions.flat().slice(-245);
        flattened.forEach(day => {
          const box = document.createElement("div");
          box.className = "gh-box";
          // Map API intensity (0-4) to our lvl classes
          if (day.intensity > 0) {
            box.classList.add(`lvl-${day.intensity}`);
          }
          githubMatrix.appendChild(box);
        });
      } else {
        throw new Error("API response not ok");
      }
    } catch (e) {
      console.warn("GitHub fetch failed, simulating:", e);
      // Fallback to simulation if API fails (245 dots)
      for (let i = 0; i < 245; i++) {
        const box = document.createElement("div");
        box.className = "gh-box";
        const rand = Math.random();
        if (rand > 0.9) box.classList.add("lvl-4");
        else if (rand > 0.75) box.classList.add("lvl-3");
        else if (rand > 0.5) box.classList.add("lvl-2");
        else if (rand > 0.3) box.classList.add("lvl-1");
        githubMatrix.appendChild(box);
      }
    }
  }

  // Init Geist Clock
  const updateClock = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    
    const timeEl = document.getElementById('geist-time');
    const secEl = document.getElementById('geist-seconds');
    
    if (timeEl) timeEl.textContent = `${h}:${m}`;
    if (secEl) secEl.textContent = s;
  };
  
  updateClock();
  setInterval(updateClock, 1000); // update every second
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

function initKineticEngine() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // 2. Custom Cursor & Hero Mouse Parallax
  const cursor = document.querySelector('.custom-cursor');
  const heroText = document.querySelector('.hero-massive-text');
  const heroLogo = document.querySelector('.intro-logo-overlay');
  const heroPortrait = document.querySelector('.intro-portrait');

  // GSAP quickTo for highly performant cursor tracking
  let xTo = gsap.quickTo(cursor, "left", {duration: 0.1, ease: "power3"});
  let yTo = gsap.quickTo(cursor, "top", {duration: 0.1, ease: "power3"});

  window.addEventListener("mousemove", (e) => {
    // Move Cursor
    xTo(e.clientX);
    yTo(e.clientY);

    // Calculate normalized mouse position (-1 to 1)
    const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
    const yNorm = (e.clientY / window.innerHeight) * 2 - 1;

    // Mouse Parallax Logic
    if (heroText) gsap.to(heroText, { x: xNorm * 30, y: yNorm * 30, duration: 1, ease: "power2.out" });
    if (heroLogo) gsap.to(heroLogo, { x: xNorm * -20, y: yNorm * -20, duration: 1, ease: "power2.out" });
    if (heroPortrait) gsap.to(heroPortrait, { x: xNorm * -10, y: yNorm * -10, duration: 1, ease: "power2.out" });
  });

  // Cursor Hover States
  const hoverElements = document.querySelectorAll('[data-hover], a, button');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });



  // 2.5 Magnetic Button
  const magneticButton = document.querySelector('.ds-cta');
  if (magneticButton) {
    magneticButton.addEventListener('mousemove', (e) => {
      const rect = magneticButton.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(magneticButton, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power3.out"
      });
    });

    magneticButton.addEventListener('mouseleave', () => {
      gsap.to(magneticButton, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    });
  }

  // 3. Studio Stack Background Interpolation
  const panels = gsap.utils.toArray('.app-panel');
  panels.forEach((panel, i) => {
    const bgColor = panel.getAttribute('data-bg') || '#000000';

    // Background Color Interpolation on body
    ScrollTrigger.create({
      trigger: panel,
      start: "top center",
      end: "bottom center",
      onEnter: () => gsap.to('body', { backgroundColor: bgColor, duration: 0.8 }),
      onEnterBack: () => gsap.to('body', { backgroundColor: bgColor, duration: 0.8 }),
      onLeave: () => {
          if (i === panels.length - 1) {
              gsap.to('body', { backgroundColor: '#000000', duration: 0.8 }); // Reset after stack
          }
      },
      onLeaveBack: () => {
          if (i === 0) {
              gsap.to('body', { backgroundColor: '#000000', duration: 0.8 }); // Reset before stack
          }
      }
    });

    // Sub-animation: Bi-directional Motion to text elements
    const textEls = panel.querySelectorAll('.app-index, .app-title, .app-desc, .app-meta');
    if (textEls.length > 0) {
      gsap.set(textEls, { opacity: 0, y: 60 });
      
      ScrollTrigger.create({
        trigger: panel,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          gsap.fromTo(textEls, 
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", overwrite: true }
          );
        },
        onLeave: () => {
          gsap.to(textEls, { opacity: 0, y: -60, duration: 0.5, stagger: 0.1, ease: "power3.in", overwrite: true });
        },
        onEnterBack: () => {
          gsap.fromTo(textEls, 
            { opacity: 0, y: -60 },
            { opacity: 1, y: 0, duration: 0.8, stagger: -0.15, ease: "power3.out", overwrite: true }
          );
        },
        onLeaveBack: () => {
          gsap.to(textEls, { opacity: 0, y: 60, duration: 0.5, stagger: -0.1, ease: "power3.in", overwrite: true });
        }
      });
    }
  });


  // 4. Logbook Cinematic Horizontal Stagger
  const logbookEntries = gsap.utils.toArray('.logbook-entry');
  logbookEntries.forEach(entry => {
    const date = entry.querySelector('.logbook-date');
    const title = entry.querySelector('.logbook-title-parallax');

    // Bi-directional entry scroll animation settling left (x: 0)
    gsap.set([date, title], { x: 50, opacity: 0 });

    ScrollTrigger.create({
      trigger: entry,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: () => {
        gsap.fromTo([date, title], 
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", overwrite: true }
        );
      },
      onLeave: () => {
        gsap.to([date, title], { x: -50, opacity: 0, duration: 0.6, stagger: 0.05, ease: "power4.in", overwrite: true });
      },
      onEnterBack: () => {
        gsap.fromTo([date, title], 
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: -0.1, ease: "power4.out", overwrite: true }
        );
      },
      onLeaveBack: () => {
        gsap.to([date, title], { x: 50, opacity: 0, duration: 0.6, stagger: -0.05, ease: "power4.in", overwrite: true });
      }
    });
  });




  // --- Dot Navigation Logic ---
  const dots = document.querySelectorAll('.dot-nav .dot');

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-target') || dot.getAttribute('href');
      if (targetId) {
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: targetId, autoKill: false },
            ease: "power3.inOut"
        });
      }
    });
  });

  // Track active dot
  const sectionIds = ['#top', '#app-0', '#app-1', '#app-2', '#design-system', '#logbook', '#shelf', '#social'];
  sectionIds.forEach((id, index) => {
    ScrollTrigger.create({
      trigger: id,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: self => {
        if (self.isActive) {
          dots.forEach(d => d.classList.remove('active'));
          if (dots[index]) dots[index].classList.add('active');
        }
      }
    });
  });

  // --- Mobile Hamburger Menu Logic ---
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  let touchStartX = 0;
  let touchEndX = 0;

  function toggleMobileMenu() {
    hamburgerBtn.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (hamburgerBtn && mobileMenuOverlay) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        closeMobileMenu();
        // Allow smooth scroll to handle navigation if hash exists
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            setTimeout(() => {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                  // For mobile, scrollIntoView triggers native CSS scroll snap beautifully
                  targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // Wait for menu close transition to start
        }
      });
    });

    // Swipe right to close gesture
    mobileMenuOverlay.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    mobileMenuOverlay.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
  }

  function handleSwipe() {
    // If swiped right by more than 50px
    if (touchEndX - touchStartX > 50) {
      if (mobileMenuOverlay.classList.contains('active')) {
        closeMobileMenu();
      }
    }
  }

  // --- Manifesto Overlay Logic ---
  const manifestoBtn = document.getElementById('manifesto-btn');
  const manifestoOverlay = document.getElementById('manifesto-overlay');
  const manifestoClose = document.getElementById('manifesto-close');

  if (manifestoBtn && manifestoOverlay && manifestoClose) {
    manifestoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      manifestoOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    manifestoClose.addEventListener('click', () => {
      manifestoOverlay.classList.remove('active');
      document.body.style.overflow = ''; 
    });

    // Close on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && manifestoOverlay.classList.contains('active')) {
        manifestoOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

}