const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove Lenis script from HTML
html = html.replace(/<script src="https:\/\/unpkg\.com\/@studio-freight\/lenis@1\.0\.34\/dist\/lenis\.min\.js"><\/script>/, "");

fs.writeFileSync('index.html', html);
