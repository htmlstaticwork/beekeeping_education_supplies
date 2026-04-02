import os

files_to_update = [
    "index.html", "home-2.html", "about.html", "shop.html", "courses.html", 
    "pricing.html", "contact.html", "dashboard.html", "course-details.html", 
    "product-details.html", "service-details.html", "services.html", 
    "blog.html", "blog-details.html", "cart.html", "checkout.html", 
    "login.html", "register.html", "404.html", "coming-soon.html"
]

old_footer = """                <div class="footer-col footer-dark-text">
                    <h3 class="footer-col-title">Resources</h3>
                    <ul>
                        <li><a href="blog.html">Blog & Guides</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                        <li><a href="#">Returns</a></li>
                    </ul>
                </div>"""

new_footer = """                <div class="footer-col footer-dark-text">
                    <h3 class="footer-col-title">Resources</h3>
                    <ul>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="pricing.html#faq">FAQ</a></li>
                        <li><a href="courses.html">Courses</a></li>
                        <li><a href="#">Returns</a></li>
                    </ul>
                </div>"""

for filename in files_to_update:
    if os.path.exists(filename):
        with open(filename, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace the old footer block with the new one
        if old_footer in content:
            new_content = content.replace(old_footer, new_footer)
            with open(filename, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            # Try with different whitespace if direct match fails
            import re
            pattern = re.compile(r'<h3 class="footer-col-title">Resources</h3>\s*<ul>\s*<li><a href="blog\.html">Blog & Guides</a></li>\s*<li><a href="#">FAQ</a></li>\s*<li><a href="#">Shipping Policy</a></li>\s*<li><a href="#">Returns</a></li>\s*</ul>', re.DOTALL)
            replacement = '<h3 class="footer-col-title">Resources</h3>\n                    <ul>\n                        <li><a href="shop.html">Shop</a></li>\n                        <li><a href="pricing.html#faq">FAQ</a></li>\n                        <li><a href="courses.html">Courses</a></li>\n                        <li><a href="#">Returns</a></li>\n                    </ul>'
            
            new_content = pattern.sub(replacement, content)
            if new_content != content:
                with open(filename, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filename} (regex)")
            else:
                print(f"Footer block not found in {filename}")
    else:
        print(f"File {filename} not found")
