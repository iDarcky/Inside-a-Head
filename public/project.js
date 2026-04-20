document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // 1. Reading Progress Bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);
  
  gsap.to(progressBar, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3
    }
  });

  // 2. Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && !window.matchMedia("(pointer: coarse)").matches) {
    let xTo = gsap.quickTo(cursor, "left", {duration: 0.1, ease: "power3"});
    let yTo = gsap.quickTo(cursor, "top", {duration: 0.1, ease: "power3"});

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    const hoverElements = document.querySelectorAll('[data-hover], a, button');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });


  }

  // 3. Parallax Hero Image
  const heroImg = document.querySelector('.project-hero-img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 30, // Move slower than scroll
      ease: "none",
      scrollTrigger: {
        trigger: ".project-hero-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
  
  // 4. Stagger Paragraphs Fade-in
  const textCols = document.querySelectorAll('.article-body p, .article-body blockquote, .article-body h2, .article-body h3');
  textCols.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      gsap.set(el, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });
  
  // 5. Mobile Hamburger Logic
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

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    mobileMenuOverlay.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    mobileMenuOverlay.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX - touchStartX > 50) {
        if (mobileMenuOverlay.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    }, {passive: true});
  }

});
