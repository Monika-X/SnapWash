const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

function processHtmlFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // Replace <button id="dir-toggle" ...> <i...></i> </button> with just the button and text 'RTL'
    content = content.replace(
        /<button\s+id="dir-toggle"[^>]*>[\s\S]*?<\/button>/g,
        '<button id="dir-toggle" class="theme-toggle" aria-label="Toggle RTL/LTR" style="font-weight: 600; font-size: 0.8rem; font-family: var(--font-body);">RTL</button>'
    );
    
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
console.log('Done updating dir-toggle in HTML files.');
