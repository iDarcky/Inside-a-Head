const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace Shelf section with Bento Box layout
const oldShelf = `
        <!-- The Shelf -->
        <section class="shelf-horizontal-section section-snap" id="shelf">
          <div class="shelf-pin-wrapper">
            <h2 class="shelf-huge-title">THE SHELF</h2>
            <div class="shelf-track-container">
              <div class="shelf-track" id="shelf-track">
                <!-- Books injected by script.js -->
              </div>
            </div>
          </div>
        </section>
`;

const newBentoShelf = `
        <!-- The Shelf: Bento Box / Museum of My Mess -->
        <section class="bento-section section-snap" id="shelf">
          <div class="bento-wrapper">
            <h2 class="shelf-huge-title">MUSEUM OF MY MESS</h2>
            <div class="bento-grid">

              <!-- Tile 1: Tall Portrait (Currently Reading) -->
              <div class="bento-tile tile-tall" id="bento-reading">
                 <!-- Populated by script.js -->
              </div>

              <!-- Tile 2: Square (Athletics) -->
              <div class="bento-tile tile-square bento-athletics">
                <div class="bento-kicker">ATHLETICS</div>
                <div class="athletics-data">
                  <div class="ath-row">
                    <span class="ath-label">HALF MARATHON</span>
                    <span class="ath-value">1:38:42</span>
                  </div>
                  <div class="ath-row">
                    <span class="ath-label">5K PR</span>
                    <span class="ath-value">20:15</span>
                  </div>
                </div>
              </div>

              <!-- Tile 3: Wide Landscape (Infrastructure) -->
              <div class="bento-tile tile-wide bento-infra">
                <div class="bento-kicker">INFRASTRUCTURE</div>
                <div class="infra-schematic">
                  <div class="node n1"></div><div class="line l1"></div><div class="node n2"></div><div class="line l2"></div><div class="node n3"></div>
                </div>
              </div>

              <!-- Tile 4: Small Square (Personal) -->
              <div class="bento-tile tile-small bento-personal">
                <div class="bento-kicker">PERSONAL</div>
                <div class="film-still-placeholder"></div>
              </div>

            </div>
          </div>
        </section>
`;

html = html.replace(oldShelf.trim(), newBentoShelf.trim());

fs.writeFileSync('index.html', html);
