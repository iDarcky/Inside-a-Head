const fs = require('fs');

const data = JSON.parse(fs.readFileSync('content.json', 'utf8'));

// Clean up old profile data
delete data.profile.who_am_i;
delete data.profile.what_i_do;

// Update profile bio
data.profile.role = "The digital studio of Daniel.";
data.profile.bio = "Product Manager, Musician, and Builder. Constructing human-centric software and creative workflows.";

// Add logbook data
data.logbook = [
  {
    "date": "2026-03-15",
    "title": "On Minimalism in Interface Design",
    "excerpt": "Exploring the boundaries of whitespace and typography in modern web applications. Why less often translates to a more focused user experience.",
    "url": "#"
  },
  {
    "date": "2026-02-28",
    "title": "The Swiss Industrial Philosophy",
    "excerpt": "Applying principles from classic Swiss design to component-based architectures. A look at grids, stark contrasts, and functional aesthetics.",
    "url": "#"
  },
  {
    "date": "2026-01-10",
    "title": "Building Reliable Workflows",
    "excerpt": "How to structure digital environments that adapt to creative processes rather than constraining them.",
    "url": "#"
  }
];

fs.writeFileSync('content.json', JSON.stringify(data, null, 2));
console.log('content.json updated successfully');
