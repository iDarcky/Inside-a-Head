const fs = require('fs');

// 1. Update HTML Title to match the Logbook structure
let html = fs.readFileSync('index.html', 'utf8');

// Replace Bento title wrapper with logbook style
const oldBentoWrapper = `<h2 class="shelf-huge-title">MUSEUM OF MY MESS</h2>`;
const newBentoWrapper = `<div class="logbook-header-wrapper" style="margin-bottom: 10vw;">
              <h2 class="logbook-huge-title bento-title-parallax">MUSEUM OF MY MESS</h2>
            </div>`;

html = html.replace(oldBentoWrapper, newBentoWrapper);
fs.writeFileSync('index.html', html);


// 2. Update CSS to ensure alignment
let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace('.bento-wrapper {\n  max-width: 1400px;\n  margin: 0 auto;\n}', `.bento-wrapper {
  max-width: 100vw;
  margin: 0;
}`);

// Add stroke effect to bento-title-parallax for the links effect
css += `
.bento-title-parallax {
  transition: -webkit-text-stroke var(--fast-transition), color var(--fast-transition);
}
.bento-title-parallax:hover {
  color: transparent;
  -webkit-text-stroke: 2px var(--accents-3);
}
`;
fs.writeFileSync('styles.css', css);


// 3. Update script.js for the Currently Reading Image & Parallax
let s = fs.readFileSync('script.js', 'utf8');

const newReading = `
    if (data.books.currently_reading) {
      readingHTML += \`<div class="book-cover" style="height: 100%; background: url('https://images.theconversation.com/files/620924/original/file-20240923-18-7oph3j.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=1000&fit=clip') center/cover; position: relative;">
        <span style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.7); padding: 4px 8px;">\${data.books.currently_reading.title}</span>
      </div>\`;
    }
`;
s = s.replace(/if \(data\.books\.currently_reading\) \{\n[\s\S]*?\}\n    const allBooks = data\.books\.read \|\| \[\];\n    if \(allBooks\.length > 0\) \{\n[\s\S]*?\}\n/, newReading);

// Also add horizontal scrub parallax to the new Bento Title
const bentoParallax = `
  // Bento Title Parallax
  const bentoTitle = document.querySelector('.bento-title-parallax');
  if (bentoTitle) {
    gsap.to(bentoTitle, {
      x: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".bento-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
`;
s = s.replace('// 7. Dot Navigation', bentoParallax + '\n  // 7. Dot Navigation');

fs.writeFileSync('script.js', s);
