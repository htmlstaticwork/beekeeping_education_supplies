document.addEventListener('DOMContentLoaded', () => {
    // 1. Dashboard Mobile Sidebar Toggle
    const dashboardMenuBtn = document.getElementById('dashboardMenuBtn');
    const dashboardSidebar = document.getElementById('dashboardSidebar');

    if (dashboardMenuBtn && dashboardSidebar) {
        dashboardMenuBtn.addEventListener('click', () => {
            dashboardSidebar.classList.toggle('show');
            // Toggle icon
            const iconNode = dashboardMenuBtn.querySelector('i');
            if (iconNode) {
                if (dashboardSidebar.classList.contains('show')) {
                    iconNode.setAttribute('data-lucide', 'x');
                } else {
                    iconNode.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close sidebar if clicked outside (on main content area) in mobile view
        document.querySelector('.dashboard-main').addEventListener('click', (e) => {
            if (window.innerWidth < 1024 && dashboardSidebar.classList.contains('show') && !dashboardMenuBtn.contains(e.target)) {
                dashboardSidebar.classList.remove('show');
                const iconNode = dashboardMenuBtn.querySelector('i');
                if (iconNode) {
                    iconNode.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    }

    // 2. Logout Redirect
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear simulated auth state if needed, then redirect
            window.location.href = 'index.html';
        });
    }
});
