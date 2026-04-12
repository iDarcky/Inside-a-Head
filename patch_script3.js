const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');

// The backslash escaping broke the template literal syntax in the bash cat command.
s = s.replace(/end: \(\) => \\\`\+\=\\?\$\\{getScrollAmount\(\) \* \-1\\}\\\`,/, "end: () => `+=${getScrollAmount() * -1}`,");

fs.writeFileSync('script.js', s);
