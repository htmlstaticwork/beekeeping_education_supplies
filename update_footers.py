import os
import re

# The new footer socials block
new_footer_socials = r'''                    <p class="footer-dark-text" style="color: #9ca3af;">Empowering the next generation of beekeepers through comprehensive education and premium grade supplies.</p>
                    <div class="footer-socials">
                        <a href="#" class="social-icon" aria-label="Instagram"><i data-lucide="instagram"></i></a>
                        <a href="#" class="social-icon" aria-label="Facebook"><i data-lucide="facebook"></i></a>
                        <a href="#" class="social-icon" aria-label="X" title="X (Formerly Twitter)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-brand" style="display: inline-block; vertical-align: middle;">
                                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                            </svg>
                        </a>
                        <a href="#" class="social-icon" aria-label="YouTube"><i data-lucide="youtube"></i></a>
                    </div>'''

# Regex to find the existing footer block
# Note: It might have small variations in whitespace, so we use re.DOTALL and flexible matching
footer_pattern = re.compile(
    r'''<p class="footer-dark-text" style="color: #9ca3af;">Empowering the next generation of beekeepers\s+through comprehensive education and premium grade supplies.</p>\s+<div class="footer-socials">.*?</div>''',
    re.DOTALL
)

files_to_update = [
    "about.html", "shop.html", "courses.html", "course-details.html",
    "services.html", "service-details.html", "pricing.html",
    "blog.html", "blog-details.html", "contact.html", "404.html"
]

for filename in files_to_update:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = footer_pattern.sub(new_footer_socials, content)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            # Try a slightly different pattern if the first one fails (e.g. no newline in <p>)
            simple_pattern = re.compile(
                r'''<p class="footer-dark-text" style="color: #9ca3af;">Empowering the next generation of beekeepers through comprehensive education and premium grade supplies.</p>\s+<div class="footer-socials">.*?</div>''',
                re.DOTALL
            )
            new_content = simple_pattern.sub(new_footer_socials, content)
            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename} (simple pattern)")
            else:
                print(f"Match not found in {filename}")
    else:
        print(f"File {filename} not found")
