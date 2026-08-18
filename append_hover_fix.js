const fs = require('fs');
const path = require('path');

const cssContent = `
/* Fix for theme-toggle hover visibility on transparent navbar */
.navbar-alt:not(.scrolled) .theme-toggle:hover {
  color: var(--primary) !important;
  background: var(--surface);
}
`;

fs.appendFileSync(path.join(__dirname, 'assets', 'css', 'components.css'), cssContent);
console.log('Appended theme-toggle hover fix successfully.');
