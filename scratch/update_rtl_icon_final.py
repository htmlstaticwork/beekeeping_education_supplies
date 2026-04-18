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
        
        # Replace languages with arrow-right-left inside rtl-toggle context
        # Supporting both double and single quotes and potential whitespace
        new_content = re.sub(
            r'(rtl-toggle[^>]*>\s*<i\s+data-lucide=")languages(")',
            r'\1arrow-right-left\2',
            content
        )
        
        if content != new_content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_name}")
        else:
            print(f"No match in {file_name}")
