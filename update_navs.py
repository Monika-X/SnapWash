import os
import re

# Read index.html to get the nav container content
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract the inner HTML of the nav
nav_match = re.search(r'<nav class="navbar[^>]*>\s*(<div class="container">.*?</button>\s*</div>)\s*</nav>', index_html, re.DOTALL)
if not nav_match:
    print("Could not find nav in index.html")
    exit(1)

nav_inner = nav_match.group(1)

# Now fix the paths in nav_inner for the pages directory
# 1. href="pages/xxx.html" -> href="xxx.html"
nav_inner_pages = re.sub(r'href="pages/([^"]+)"', r'href="\1"', nav_inner)
# 2. href="index.html" -> href="../index.html"
nav_inner_pages = re.sub(r'href="index\.html"', r'href="../index.html"', nav_inner_pages)
# 3. src="assets/..." -> src="../assets/..."
nav_inner_pages = re.sub(r'src="assets/', r'src="../assets/', nav_inner_pages)

# Files to ignore
ignore_files = ['login.html', 'dashboard.html', 'signup.html']

pages_dir = 'pages'
for filename in os.listdir(pages_dir):
    if filename.endswith('.html') and filename not in ignore_files:
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace the inner nav
        new_content = re.sub(r'(<nav class="navbar[^>]*>)\s*<div class="container">.*?</button>\s*</div>\s*(</nav>)', 
                             lambda m: f"{m.group(1)}\n      {nav_inner_pages}\n  {m.group(2)}", 
                             content, flags=re.DOTALL)
                             
        # Fix the active class
        # First, remove active from all nav-links
        new_content = re.sub(r'class="nav-link active"', 'class="nav-link"', new_content)
        # Then, add active to the current page
        page_name = filename
        # Special cases or direct matches
        new_content = re.sub(f'href="{page_name}" class="nav-link"', f'href="{page_name}" class="nav-link active"', new_content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")

print("Done.")
