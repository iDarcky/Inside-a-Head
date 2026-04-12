const fs = require('fs');

let script = fs.readFileSync('script.js', 'utf8');
script = script.replace('title.textContent = `${paddedIndex}_${project.title.replace(/s+/g, \'\')}`;', 'title.textContent = `${paddedIndex}_${project.title.replace(/\\s+/g, \'\')}`;');
script = script.replace('const dateStr = new Date(entry.date).toLocaleDateString(\'en-US\', { year: \'numeric\', month: \'2-digit\', day: \'2-digit\' }).replace(///g, \'.\');', 'const dateStr = new Date(entry.date).toLocaleDateString(\'en-US\', { year: \'numeric\', month: \'2-digit\', day: \'2-digit\' }).replace(/\\//g, \'.\');');

fs.writeFileSync('script.js', script);
