const fs = require('fs');
const path = require('path');

const cssContent = `
/* Alt Navbar Styles for Dark Backgrounds */
.navbar-alt {
  transition: all 0.3s ease;
}

.navbar-alt:not(.scrolled) .logo,
.navbar-alt:not(.scrolled) .logo-text > div:first-child,
.navbar-alt:not(.scrolled) .nav-link,
.navbar-alt:not(.scrolled) .theme-toggle {
  color: #ffffff !important;
}

.navbar-alt:not(.scrolled) .logo-text span {
  color: var(--accent) !important;
}

.navbar-alt:not(.scrolled) .logo-tagline {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Ensure hovered nav links on dark background use accent */
.navbar-alt:not(.scrolled) .nav-link:hover,
.navbar-alt:not(.scrolled) .nav-link.active {
  color: var(--accent) !important;
}
`;

fs.appendFileSync(path.join(__dirname, 'assets', 'css', 'components.css'), cssContent);
console.log('Appended navbar-alt CSS successfully.');
