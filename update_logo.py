import os
import re

base_dir = r"c:\Users\LOKII_1526\Desktop\SnapWash"

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Determine depth for paths
    rel_path = os.path.relpath(filepath, base_dir)
    depth = rel_path.count(os.sep)
    prefix = '../' * depth if depth > 0 else ''
    
    # Update favicon
    if '<link rel="icon"' not in content:
        favicon_tag = f'<link rel="icon" type="image/png" href="{prefix}assets/images/favicon.png">\n  '
        content = re.sub(r'(<head>.*?)(<title>)', r'\1' + favicon_tag + r'\2', content, flags=re.DOTALL)
    
    # Update logo
    # We have a few variations of logo.
    # index.html: <a href="index.html" class="logo"> \n <i class="..."></i> \n Snap<span>Wash</span> \n </a>
    # home2.html: <a href="home2.html" class="logo" style="color: var(--accent);">Snap<span style="color: white;">Wash</span></a>
    
    # Let's replace the whole <a class="logo"...>...</a> using a regex, carefully keeping the href.
    
    def replacer(match):
        href = match.group(1)
        # keeping the original tag with any extra attributes like style might be tricky, let's just use standard class="logo"
        style_color = ""
        if "color: white" in match.group(0) or "color: var(--bg-color)" in match.group(0):
            style_color = ' style="color: var(--bg-color);"'
            
        return f'''<a href="{href}" class="logo"{style_color}>
        <img src="{prefix}assets/images/logo.png" alt="SnapWash Logo" style="height: 40px; width: auto; object-fit: contain;">
        <div class="logo-text">
          <div>Snap<span>Wash</span></div>
          <div class="logo-tagline">Premium Care, Delivered.</div>
        </div>
      </a>'''

    # Matches <a href="..." class="logo"...>...</a>
    # Note: re.DOTALL is needed if it spans multiple lines.
    content = re.sub(r'<a\s+href="([^"]+)"\s+class="logo"[^>]*>.*?</a>', replacer, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.html'):
            process_html_file(os.path.join(root, file))

print("Done updating HTML files.")
