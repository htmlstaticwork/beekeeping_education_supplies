import os
import re

files = [
    "404.html", "about.html", "cart.html", "checkout.html", "contact.html",
    "course-details.html", "courses.html", "dashboard.html", "home-2.html",
    "index.html", "login.html", "pricing.html", "product-details.html",
    "register.html", "service-details.html", "services.html", "shop.html"
]

path = "d:\\March Websites\\beekeeping_education_supplies\\"

for file_name in files:
    full_path = os.path.join(path, file_name)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find rtl-toggle button and replace languages with globe
        # Looking for <button class="...rtl-toggle..." ...><i data-lucide="languages"></i></button>
        new_content = re.sub(
            r'(<button\s+[^>]*class="[^"]*rtl-toggle[^"]*"[^>]*>\s*<i\s+data-lucide=")languages(")',
            r'\1globe\2',
            content
        )
        
        if content != new_content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_name}")
        else:
            print(f"No match in {file_name}")
