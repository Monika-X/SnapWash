const fs = require('fs');
const path = require('path');

const updateFiles = (dir) => {
    const files = fs.readdirSync(dir);
    for (const filename of files) {
        const filepath = path.join(dir, filename);
        if (fs.statSync(filepath).isDirectory()) {
            updateFiles(filepath);
        } else if (filename.endsWith('.html')) {
            let content = fs.readFileSync(filepath, 'utf8');
            content = content.replace(/assets\/css\/components\.css\?v=\d+/g, 'assets/css/components.css?v=8');
            content = content.replace(/assets\/css\/variables\.css\?v=\d+/g, 'assets/css/variables.css?v=8');
            content = content.replace(/assets\/css\/global\.css\?v=\d+/g, 'assets/css/global.css?v=8');
            // also match without ?v= just in case
            content = content.replace(/assets\/css\/components\.css(?![\?])/g, 'assets/css/components.css?v=8');
            
            // Bump JS cache too
            content = content.replace(/assets\/js\/main\.js\?v=\d+/g, 'assets/js/main.js?v=8');
            content = content.replace(/assets\/js\/main\.js(?![\?])/g, 'assets/js/main.js?v=8');

            fs.writeFileSync(filepath, content, 'utf8');
        }
    }
};

updateFiles('.');
console.log("Version bumped to v=8");
