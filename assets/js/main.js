document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');

    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('menu-open');
            // Toggle icon between menu and x
            const iconNode = mobileMenuBtn.querySelector('i');
            if (iconNode) {
                if (navbar.classList.contains('menu-open')) {
                    iconNode.setAttribute('data-lucide', 'x');
                } else {
                    iconNode.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
    }

    // 2. Dark Mode Toggle
    const htmlEl = document.documentElement;
    const darkToggleBtns = document.querySelectorAll('.dark-toggle');

    // Check LocalStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlEl.classList.add('dark');
    }

    darkToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            htmlEl.classList.toggle('dark');
            const isDark = htmlEl.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Optionally change icon dynamically if needed
            // But usually just letting the CSS handle colors is enough
        });
    });

    // 3. RTL Toggle
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
    const savedDir = localStorage.getItem('direction');
    if (savedDir === 'rtl') {
        htmlEl.setAttribute('dir', 'rtl');
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRTL = htmlEl.getAttribute('dir') === 'rtl';
            if (isRTL) {
                htmlEl.setAttribute('dir', 'ltr');
                localStorage.setItem('direction', 'ltr');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                localStorage.setItem('direction', 'rtl');
            }
        });
    });

    // 4. Password Toggle (For Auth Pages)
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        });
    });

    // 5. Cart Badge Updates
    window.updateCartBadge = function() {
        const cart = JSON.parse(localStorage.getItem('hivemaster_cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const badges = document.querySelectorAll('.cart-badge');
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        });
    };

    updateCartBadge();
});
