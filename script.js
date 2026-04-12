async function loadContent() {
  const response = await fetch("content.json");
  if (!response.ok) {
    throw new Error("Could not load content.json");


  // 5. Intersection Observer for Dot Navigation
  const dots = document.querySelectorAll('.dot-nav .dot');
  const sections = document.querySelectorAll('.section-snap');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to corresponding dot
        const id = '#' + entry.target.id;
        const activeDot = document.querySelector(`.dot-nav .dot[data-target="${id}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // 6. Dot Navigation Click Event
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


}
  return response.json();
}

function createAppPanel(project, index) {
  const panel = document.createElement("div");
  panel.className = "app-panel section-snap";
  panel.id = `app-${index}`;

  // Placeholder charcoal tints
  const colors = ['#1a0f30', '#121f1a', '#300a0a'];
  const bgColor = colors[index % colors.length];
  panel.setAttribute('data-bg', bgColor);


  const paddedIndex = String(index + 1).padStart(2, '0');

  panel.innerHTML = `
    <div class="app-panel-content">
      <div class="app-text-column">
        <div class="app-index">${paddedIndex}</div>
        <h3 class="app-title">${project.title}</h3>
        <p class="app-desc">${project.description}</p>
        <div class="app-meta">
          <span>${project.status}</span>
          <a href="${project.url}" target="_blank" rel="noreferrer" class="app-view-link" data-hover>
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

  // Bento Box Reading Tile
  const bentoReading = document.getElementById("bento-reading");
  if (bentoReading && data.books) {
    let readingHTML = `<div class="bento-kicker">CURRENTLY READING</div><div class="bento-book-covers">`;


    if (data.books.currently_reading) {
      readingHTML += `<div class="book-cover" style="height: 100%; background: url('https://images.theconversation.com/files/620924/original/file-20240923-18-7oph3j.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1000&fit=clip') center/cover; position: relative;">
        <span style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.7); padding: 4px 8px;">${data.books.currently_reading.title}</span>
      </div>`;
    }

    readingHTML += `</div>`;
    bentoReading.innerHTML = readingHTML;
  }
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

  gsap.registerPlugin(ScrollTrigger);

  // 1. Initialize Lenis for Smooth Scrolling





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

  // 3. Studio Stack Overlap & Background Interpolation
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

    // Overlap Scale Effect (only for panels before the last one)
    if (i < panels.length - 1) {
      gsap.to(panel, {
        scale: 0.85,
        y: -50,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pinSpacing: false
        }
      });
    }
  });


  // 4. Logbook Cinematic Horizontal Stagger
  const logbookEntries = gsap.utils.toArray('.logbook-entry');
  logbookEntries.forEach(entry => {
    const date = entry.querySelector('.logbook-date');
    const title = entry.querySelector('.logbook-title-parallax');

    // Entry Fade/Slide
    gsap.from([date, title], {
      x: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: entry,
        start: "top 90%",
      }
    });

    // Horizontal Scroll Scrub Parallax
    gsap.to(title, {
      x: 50,
      ease: "none",
      scrollTrigger: {
        trigger: entry,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });





  // 5. Intersection Observer for Dot Navigation
  const dots = document.querySelectorAll('.dot-nav .dot');
  const sections = document.querySelectorAll('.section-snap');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to corresponding dot
        const id = '#' + entry.target.id;
        const activeDot = document.querySelector(`.dot-nav .dot[data-target="${id}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // 6. Dot Navigation Click Event
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });



  // 5. Intersection Observer for Dot Navigation
  const dots = document.querySelectorAll('.dot-nav .dot');
  const sections = document.querySelectorAll('.section-snap');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to corresponding dot
        const id = '#' + entry.target.id;
        const activeDot = document.querySelector(`.dot-nav .dot[data-target="${id}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // 6. Dot Navigation Click Event
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // 5. Intersection Observer for Dot Navigation
  const dots = document.querySelectorAll('.dot-nav .dot');
  const sections = document.querySelectorAll('.section-snap');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to corresponding dot
        const id = '#' + entry.target.id;
        const activeDot = document.querySelector(`.dot-nav .dot[data-target="${id}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // 6. Dot Navigation Click Event
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Intersection Observer for Dot Navigation
  const dots = document.querySelectorAll('.dot-nav .dot');
  const sections = document.querySelectorAll('.section-snap');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to corresponding dot
        const id = '#' + entry.target.id;
        const activeDot = document.querySelector(`.dot-nav .dot[data-target="${id}"]`);
        if (activeDot) {
          activeDot.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // 6. Dot Navigation Click Event
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

}
