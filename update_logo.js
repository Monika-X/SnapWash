const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

function processHtmlFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // Determine depth
    const relPath = path.relative(baseDir, filepath);
    const depth = relPath.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    // Update favicon
    if (!content.includes('<link rel="icon"')) {
        const faviconTag = `<link rel="icon" type="image/png" href="${prefix}assets/images/favicon.png">\n  `;
        content = content.replace(/(<head>[\s\S]*?)(<title>)/, `$1${faviconTag}$2`);
    }
    
    // Replace logo
    content = content.replace(/<a\s+href="([^"]+)"\s+class="logo"[^>]*>[\s\S]*?<\/a>/g, (match, href) => {
        let styleColor = '';
        if (match.includes('color: white') || match.includes('color: var(--bg-color)')) {
            styleColor = ' style="color: var(--bg-color);"';
        }
        
        return `<a href="${href}" class="logo"${styleColor}>
        <img src="${prefix}assets/images/logo.png" alt="SnapWash Logo" style="height: 40px; width: auto; object-fit: contain;">
        <div class="logo-text">
          <div>Snap<span>Wash</span></div>
          <div class="logo-tagline">Premium Care, Delivered.</div>
        </div>
      </a>`;
    });
    
    fs.writeFileSync(filepath, content, 'utf-8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processHtmlFile(fullPath);
        }
    }
}

walkDir(baseDir);
console.log('Done updating HTML files.');
