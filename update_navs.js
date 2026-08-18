const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const navMatch = indexHtml.match(/<nav class="navbar[^>]*>\s*(<div class="container">[\s\S]*?<\/button>\s*<\/div>)\s*<\/nav>/);

if (!navMatch) {
    console.error("Could not find nav in index.html");
    process.exit(1);
}

let navInner = navMatch[1];

// 1. href="pages/xxx.html" -> href="xxx.html"
navInner = navInner.replace(/href="pages\/([^"]+)"/g, 'href="$1"');
// 2. href="index.html" -> href="../index.html"
navInner = navInner.replace(/href="index\.html"/g, 'href="../index.html"');
// 3. src="assets/..." -> src="../assets/..."
navInner = navInner.replace(/src="assets\//g, 'src="../assets/');

const ignoreFiles = ['login.html', 'dashboard.html', 'signup.html'];
const pagesDir = 'pages';

const files = fs.readdirSync(pagesDir);

for (const filename of files) {
    if (filename.endsWith('.html') && !ignoreFiles.includes(filename)) {
        const filepath = path.join(pagesDir, filename);
        let content = fs.readFileSync(filepath, 'utf8');
        
        content = content.replace(/(<nav class="navbar[^>]*>)\s*<div class="container">[\s\S]*?<\/button>\s*<\/div>\s*(<\/nav>)/, 
                                  `$1\n    ${navInner}\n  $2`);
        
        // Remove active class from all links
        content = content.replace(/class="nav-link active"/g, 'class="nav-link"');
        
        // Add active class to current page
        // Special case: home2.html uses regex
        const pageName = filename;
        const regex = new RegExp(`href="${pageName}" class="nav-link"`, 'g');
        content = content.replace(regex, `href="${pageName}" class="nav-link active"`);
        
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated ${filename}`);
    }
}

// Add version busting to components.css in all pages to fix the hamburger menu bug there too!
for (const filename of files) {
    if (filename.endsWith('.html')) {
        const filepath = path.join(pagesDir, filename);
        let content = fs.readFileSync(filepath, 'utf8');
        content = content.replace(/assets\/css\/components\.css(?![\?])/g, 'assets/css/components.css?v=3');
        content = content.replace(/assets\/css\/variables\.css(?![\?])/g, 'assets/css/variables.css?v=3');
        content = content.replace(/assets\/css\/global\.css(?![\?])/g, 'assets/css/global.css?v=3');
        fs.writeFileSync(filepath, content, 'utf8');
    }
}
console.log("CSS versioning updated for all pages.");

console.log("Done.");
