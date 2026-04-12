const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Logbook Button
html = html.replace('</div>\n        </section>\n\n        <!-- The Shelf -->', `</div>\n          <div class="logbook-footer" style="margin-top: 4vw; text-align: right;">\n            <a href="#" class="button button-massive" data-hover style="padding: 16px 32px; font-size: 1rem;">View Full Logbook →</a>\n          </div>\n        </section>\n\n        <!-- The Shelf -->`);

// Footer Instagram Link
html = html.replace('<a href="https://www.goodreads.com/user/show/106429003-daniel-maghis" target="_blank" rel="noreferrer" id="goodreads-btn" data-hover>GOODREADS</a>', `<a href="https://www.goodreads.com/user/show/106429003-daniel-maghis" target="_blank" rel="noreferrer" id="goodreads-btn" data-hover>GOODREADS</a>\n          <a href="#" target="_blank" rel="noreferrer" id="instagram-btn" data-hover>INSTAGRAM</a>`);

fs.writeFileSync('index.html', html);
