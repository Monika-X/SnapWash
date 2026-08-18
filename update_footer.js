const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

function getFooterHtml(prefix) {
    return `<footer class="footer" style="position: relative;">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="${prefix}index.html" class="logo" style="color: var(--bg-color); margin-bottom: 1.5rem;">
            <img src="${prefix}assets/images/logo.png" alt="SnapWash Logo" style="height: 40px; width: auto; object-fit: contain;">
            <div class="logo-text">
              <div>Snap<span style="color: var(--accent)">Wash</span></div>
              <div class="logo-tagline" style="color: var(--text-muted)">Premium Care, Delivered.</div>
            </div>
          </a>
          <p style="opacity: 0.7; max-width: 300px; margin-bottom: 2rem; font-size: 0.9rem; line-height: 1.6;">London's most exclusive destination for premium garment care. A curated sanctuary where every piece is meticulously handled.</p>
          <div class="social-links">
            <a href="#" class="social-icon" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
            <a href="#" class="social-icon" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
            <a href="#" class="social-icon" aria-label="Twitter"><i class="ri-twitter-x-line"></i></a>
            <a href="#" class="social-icon" aria-label="YouTube"><i class="ri-youtube-fill"></i></a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4 style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;">Services</h4>
          <div class="footer-links">
            <a href="${prefix}pages/services.html">Luxury Wash & Fold</a>
            <a href="${prefix}pages/services.html">Executive Dry Cleaning</a>
            <a href="${prefix}pages/services.html">Artisan Steam Press</a>
            <a href="${prefix}pages/services.html">Couture Care</a>
            <a href="${prefix}pages/services.html">Leather & Suede</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4 style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;">Company</h4>
          <div class="footer-links">
            <a href="${prefix}index.html">Home</a>
            <a href="${prefix}pages/home2.html">Home 2</a>
            <a href="${prefix}pages/about.html">About Us</a>
            <a href="${prefix}pages/services.html">Services</a>
            <a href="${prefix}pages/blog.html">Journal</a>
            <a href="${prefix}pages/contact.html">Contact</a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4 style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;">The Private List</h4>
          <p style="opacity: 0.7; font-size: 0.9rem; line-height: 1.6;">Receive exclusive service previews, private membership invitations, and garment care insights before anyone else.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault();">
            <input type="email" class="newsletter-input" placeholder="Your email" required>
            <button type="submit" class="newsletter-btn">JOIN</button>
          </form>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div>&copy; 2026 SnapWash. All rights reserved. Established 2026, London.</div>
        <div class="center-dot-wrapper" style="text-align: center;">
            <div style="display: inline-block; padding: 6px; border: 1px solid rgba(214, 183, 124, 0.3); border-radius: 50%;">
                <div class="center-dot"></div>
            </div>
        </div>
        <div class="footer-bottom-links">
          <a href="${prefix}pages/privacy.html">Privacy Policy</a>
          <a href="${prefix}pages/terms.html">Terms & Conditions</a>
          <a href="${prefix}pages/sitemap.html">Sitemap</a>
        </div>
      </div>
    </div>
    
    <button class="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Back to top">
      <i class="ri-arrow-up-line"></i>
    </button>
  </footer>`;
}

function processHtmlFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    const relPath = path.relative(baseDir, filepath);
    const depth = relPath.split(path.sep).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    const newFooter = getFooterHtml(prefix);
    
    // Replace existing footer
    const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/i;
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooter);
    } else {
        // Just in case it's missing or different, insert before </body>
        content = content.replace(/<\/body>/, newFooter + '\n</body>');
    }
    
    fs.writeFileSync(filepath, content, 'utf-8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === '.git' || file === 'assets' || file === '.vscode') continue;
            walkDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processHtmlFile(fullPath);
        }
    }
}

walkDir(baseDir);
console.log('Updated all footers.');
