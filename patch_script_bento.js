const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// Update renderCollections to populate Bento Reading tile
const oldShelfRender = `
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
`;

const newBentoRender = `
  // Bento Box Reading Tile
  const bentoReading = document.getElementById("bento-reading");
  if (bentoReading && data.books) {
    let readingHTML = \`<div class="bento-kicker">CURRENTLY READING</div><div class="bento-book-covers">\`;

    if (data.books.currently_reading) {
      readingHTML += \`<div class="book-cover"><span>\${data.books.currently_reading.title}</span></div>\`;
    }
    const allBooks = data.books.read || [];
    if (allBooks.length > 0) {
      readingHTML += \`<div class="book-cover" style="opacity: 0.5;"><span>\${allBooks[0].title}</span></div>\`;
    }

    readingHTML += \`</div>\`;
    bentoReading.innerHTML = readingHTML;
  }
`;

s = s.replace(oldShelfRender.trim(), newBentoRender.trim());

// Add GSAP Stagger animation for bento tiles in initKineticEngine
const bentoAnim = `
  // 6. Bento Grid Stagger
  gsap.from(".bento-tile", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".bento-section",
      start: "top 80%"
    }
  });
`;
s = s.replace('// 5. Shelf Horizontal Scroll', bentoAnim);

// Map dot navigation based on scroll positions
const dotAnim = `
  // 7. Dot Navigation
  const dots = document.querySelectorAll('.dot');
  const sections = gsap.utils.toArray('.hero-immersive, .app-panel, .logbook-cinematic');

  sections.forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top center",
      end: "bottom center",
      onToggle: self => {
        if (self.isActive && dots[i]) {
          dots.forEach(d => d.classList.remove('active'));
          dots[i].classList.add('active');
        }
      }
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      lenis.scrollTo(sections[i]);
    });
  });
`;
s = s.replace('function getScrollAmount()', dotAnim + '\n  function getScrollAmount()'); // Just inject before old shelf code if it exists. Wait, I stripped shelf horizontal code.
// Let's inject at the bottom of initKineticEngine.
s = s.replace(/}\n$/, dotAnim + "\n}");


fs.writeFileSync('script.js', s);
