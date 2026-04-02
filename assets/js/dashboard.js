document.addEventListener('DOMContentLoaded', () => {
    // 1. Dashboard Mobile Sidebar Toggle
    const dashboardMenuBtn = document.getElementById('dashboardMenuBtn');
    const dashboardSidebar = document.getElementById('dashboardSidebar');

    if (dashboardMenuBtn && dashboardSidebar) {
        dashboardMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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
            if (window.innerWidth < 1024 && dashboardSidebar && dashboardSidebar.classList.contains('show') && !dashboardMenuBtn.contains(e.target)) {
                dashboardSidebar.classList.remove('show');
                const iconNode = dashboardMenuBtn.querySelector('i');
                if (iconNode) {
                    iconNode.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    }

    // 2. Tab Switching Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
    const dashboardContent = document.getElementById('dashboardContent');
    const dashboardTitle = document.getElementById('dashboardTitle');

    const templates = {
        overview: `
            <div class="fade-in">
                <div style="margin-bottom: 2rem;">
                    <h1 style="font-size:1.75rem; color:var(--text-main); margin-bottom:0.5rem;">Welcome back, Jane! 👋</h1>
                    <p style="color:var(--text-muted); margin:0;">Here's what's happening in your apiary today.</p>
                </div>

                <!-- Metrics Grid -->
                <div class="grid grid-cols-4 gap-6" style="margin-bottom: 3rem;">
                    <div class="metric-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; transition: var(--transition);">
                        <div class="metric-icon" style="width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(245, 158, 11, 0.1); color: var(--primary-color);"><i data-lucide="archive"></i></div>
                        <div class="metric-info">
                            <h3 style="margin: 0; font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">Active Hives</h3>
                            <p style="margin: 0.25rem 0 0; font-size: 1.5rem; font-weight: 700; color: var(--text-main); line-height: 1.2;">2</p>
                        </div>
                    </div>
                    <div class="metric-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; transition: var(--transition);">
                        <div class="metric-icon" style="width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(16, 185, 129, 0.1); color: #10b981;"><i data-lucide="activity"></i></div>
                        <div class="metric-info">
                            <h3 style="margin: 0; font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">Colony Health</h3>
                            <p style="margin: 0.25rem 0 0; font-size: 1.5rem; font-weight: 700; color: var(--text-main); line-height: 1.2;">Good</p>
                        </div>
                    </div>
                    <div class="metric-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; transition: var(--transition);">
                        <div class="metric-icon" style="width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;"><i data-lucide="calendar-check"></i></div>
                        <div class="metric-info">
                            <h3 style="margin: 0; font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">Last Inspection</h3>
                            <p style="margin: 0.25rem 0 0; font-size: 1.5rem; font-weight: 700; color: var(--text-main); line-height: 1.2;">3 days ago</p>
                        </div>
                    </div>
                    <div class="metric-card" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; transition: var(--transition);">
                        <div class="metric-icon" style="width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: rgba(239, 68, 68, 0.1); color: #ef4444;"><i data-lucide="alert-triangle"></i></div>
                        <div class="metric-info">
                            <h3 style="margin: 0; font-size: 0.875rem; color: var(--text-muted); font-weight: 500;">Tasks Due</h3>
                            <p style="margin: 0.25rem 0 0; font-size: 1.5rem; font-weight: 700; color: var(--text-main); line-height: 1.2;">1</p>
                        </div>
                    </div>
                </div>

                <!-- Content Panels -->
                <div class="grid grid-cols-2 gap-8">
                    <!-- Recent Reports -->
                    <div class="card" style="padding: 1.5rem;">
                        <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
                            <h3 style="margin:0; font-size:1.25rem;">Recent Hive Reports</h3>
                            <a href="#" class="text-primary" style="font-size:0.875rem; font-weight:500;">View All</a>
                        </div>
                        <div class="flex flex-col gap-4">
                            <div style="display:flex; align-items:flex-start; gap:1rem; padding-bottom:1rem; border-bottom:1px solid var(--border-color);">
                                <div style="width:40px; height:40px; background:var(--bg-alt); border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                    <i data-lucide="file-text" style="color:var(--text-muted); width:20px;"></i>
                                </div>
                                <div>
                                    <h4 style="margin:0 0 0.25rem; font-size:1rem;">Hive #1 - Spring Inspection</h4>
                                    <p style="margin:0; color:var(--text-muted); font-size:0.875rem;">Queen spotted. Strong brood pattern. Added 1:1 syrup.</p>
                                    <span style="font-size:0.75rem; color:var(--text-muted); display:block; margin-top:0.25rem;">May 10, 2026</span>
                                </div>
                            </div>
                            <div style="display:flex; align-items:flex-start; gap:1rem; padding-bottom:1rem;">
                                <div style="width:40px; height:40px; background:var(--bg-alt); border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                    <i data-lucide="file-text" style="color:var(--text-muted); width:20px;"></i>
                                </div>
                                <div>
                                    <h4 style="margin:0 0 0.25rem; font-size:1rem;">Hive #2 - Mite Check</h4>
                                    <p style="margin:0; color:var(--text-muted); font-size:0.875rem;">Alcohol wash showed 1 mite / 300 bees. Below threshold.</p>
                                    <span style="font-size:0.75rem; color:var(--text-muted); display:block; margin-top:0.25rem;">May 05, 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recommended Tutorials -->
                    <div class="card" style="padding: 1.5rem;">
                        <div class="flex items-center justify-between" style="margin-bottom: 1.5rem;">
                            <h3 style="margin:0; font-size:1.25rem;">Continue Learning</h3>
                            <i data-lucide="more-horizontal" style="color:var(--text-muted);"></i>
                        </div>
                        <div style="position:relative; border-radius:var(--radius-md); overflow:hidden; margin-bottom:1rem; aspect-ratio: 16/9;">
                            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800" alt="Video" style="width:100%; height:100%; object-fit:cover;">
                            <div style="position:absolute; inset:0; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center;">
                                <button class="btn-icon" style="background:var(--primary-color); color:#fff; width:56px; height:56px; border-radius:50%; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);"><i data-lucide="play" style="width:24px; height:24px; margin-left:4px;"></i></button>
                            </div>
                        </div>
                        <h4 style="margin:0 0 0.5rem; font-size:1rem; color:var(--text-main);">Module 3: Swarm Prevention Strategies</h4>
                        <div style="background:var(--bg-alt); height:8px; border-radius:4px; overflow:hidden; margin-bottom:0.75rem;">
                            <div style="background:var(--primary-color); width:40%; height:100%; border-radius:4px;"></div>
                        </div>
                        <div class="flex items-center justify-between">
                            <p style="margin:0; font-size:0.75rem; color:var(--text-muted);">40% complete • 12 mins left</p>
                            <span style="font-size:0.75rem; font-weight:600; color:var(--primary-color);">Intermediate</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        orders: `
            <div class="fade-in">
                <div style="margin-bottom: 2rem;">
                    <h1 style="font-size:1.75rem; color:var(--text-main); margin-bottom:0.5rem;">My Orders</h1>
                    <p style="color:var(--text-muted); margin:0;">Track and manage your beekeeping supply orders.</p>
                </div>

                <div class="card" style="overflow-x:auto;">
                    <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 700px;">
                        <thead style="background: var(--bg-alt); border-bottom: 1px solid var(--border-color);">
                            <tr>
                                <th style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Order ID</th>
                                <th style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Date</th>
                                <th style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Items</th>
                                <th style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Total</th>
                                <th style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Status</th>
                                <th style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-alt)'" onmouseout="this.style.background='transparent'">
                                <td style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-main);">#HM-8842</td>
                                <td style="padding: 1.25rem 1.5rem; color: var(--text-muted);">May 12, 2026</td>
                                <td style="padding: 1.25rem 1.5rem; color: var(--text-main);">Professional Hive Tool, Smoker</td>
                                <td style="padding: 1.25rem 1.5rem; font-weight: 700; color: var(--text-main);">$85.50</td>
                                <td style="padding: 1.25rem 1.5rem;">
                                    <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.35rem 0.85rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600;">Delivered</span>
                                </td>
                                <td style="padding: 1.25rem 1.5rem;">
                                    <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem; border-width: 1px;">Details</button>
                                </td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseover="this.style.background='var(--bg-alt)'" onmouseout="this.style.background='transparent'">
                                <td style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-main);">#HM-8791</td>
                                <td style="padding: 1.25rem 1.5rem; color: var(--text-muted);">April 28, 2026</td>
                                <td style="padding: 1.25rem 1.5rem; color: var(--text-main);">Beekeeping Veil, Gloves</td>
                                <td style="padding: 1.25rem 1.5rem; font-weight: 700; color: var(--text-main);">$42.00</td>
                                <td style="padding: 1.25rem 1.5rem;">
                                    <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.35rem 0.85rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600;">Delivered</span>
                                </td>
                                <td style="padding: 1.25rem 1.5rem;">
                                    <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem; border-width: 1px;">Details</button>
                                </td>
                            </tr>
                            <tr style="transition: background 0.2s;" onmouseover="this.style.background='var(--bg-alt)'" onmouseout="this.style.background='transparent'">
                                <td style="padding: 1.25rem 1.5rem; font-weight: 600; color: var(--text-main);">#HM-8755</td>
                                <td style="padding: 1.25rem 1.5rem; color: var(--text-muted);">April 15, 2026</td>
                                <td style="padding: 1.25rem 1.5rem; color: var(--text-main);">Langstroth Hives (2)</td>
                                <td style="padding: 1.25rem 1.5rem; font-weight: 700; color: var(--text-main);">$298.00</td>
                                <td style="padding: 1.25rem 1.5rem;">
                                    <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.35rem 0.85rem; border-radius: 99px; font-size: 0.75rem; font-weight: 600;">Delivered</span>
                                </td>
                                <td style="padding: 1.25rem 1.5rem;">
                                    <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem; border-width: 1px;">Details</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        reports: `
            <div class="fade-in">
                <div style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h1 style="font-size:1.75rem; color:var(--text-main); margin-bottom:0.5rem;">Hive Health Reports</h1>
                        <p style="color:var(--text-muted); margin:0;">Detailed inspection logs for your colonies.</p>
                    </div>
                    <button class="btn btn-primary" style="padding: 0.6rem 1.25rem;"><i data-lucide="plus" style="width:18px; margin-right:8px;"></i> New Inspection</button>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div class="card" style="padding: 1.5rem; border-left: 4px solid #10b981;">
                        <div class="flex justify-between items-start" style="margin-bottom: 1.25rem;">
                            <div>
                                <h3 style="margin:0; font-size:1.125rem; color:var(--text-main);">Hive #01 (Front Orchard)</h3>
                                <p style="margin:0; font-size:0.875rem; color:var(--text-muted);">Langstroth • Spring Build-up</p>
                            </div>
                            <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 0.35rem 0.85rem; border-radius: 99px; font-size: 0.75rem; font-weight: 700;">Excellent</span>
                        </div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
                            <div style="background: var(--bg-alt); padding: 0.85rem; border-radius: 12px; border: 1px solid var(--border-color);">
                                <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom: 0.25rem;">Brood Pattern</span>
                                <span style="font-weight:600; color:var(--text-main);">Solid / 8 Frames</span>
                            </div>
                            <div style="background: var(--bg-alt); padding: 0.85rem; border-radius: 12px; border: 1px solid var(--border-color);">
                                <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom: 0.25rem;">Mite Count</span>
                                <span style="font-weight:600; color:var(--text-main);">1 / 300 Bees</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2" style="margin-bottom: 1.5rem; color: var(--text-muted); font-size: 0.875rem;">
                            <i data-lucide="calendar" style="width:16px;"></i>
                            <span>Last Inspected: May 10, 2026</span>
                        </div>
                        <button class="btn btn-outline" style="width:100%; border-width: 1px;">View Full Report</button>
                    </div>

                    <div class="card" style="padding: 1.5rem; border-left: 4px solid #f59e0b;">
                        <div class="flex justify-between items-start" style="margin-bottom: 1.25rem;">
                            <div>
                                <h3 style="margin:0; font-size:1.125rem; color:var(--text-main);">Hive #02 (West Field)</h3>
                                <p style="margin:0; font-size:0.875rem; color:var(--text-muted);">Top Bar • Queen Replacement</p>
                            </div>
                            <span style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; padding: 0.35rem 0.85rem; border-radius: 99px; font-size: 0.75rem; font-weight: 700;">Monitor</span>
                        </div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
                            <div style="background: var(--bg-alt); padding: 0.85rem; border-radius: 12px; border: 1px solid var(--border-color);">
                                <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom: 0.25rem;">Brood Pattern</span>
                                <span style="font-weight:600; color:var(--text-main);">Spotty / 4 Frames</span>
                            </div>
                            <div style="background: var(--bg-alt); padding: 0.85rem; border-radius: 12px; border: 1px solid var(--border-color);">
                                <span style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom: 0.25rem;">Mite Count</span>
                                <span style="font-weight:600; color:var(--text-main);">8 / 300 Bees</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2" style="margin-bottom: 1.5rem; color: var(--text-muted); font-size: 0.875rem;">
                            <i data-lucide="calendar" style="width:16px;"></i>
                            <span>Last Inspected: May 05, 2026</span>
                        </div>
                        <button class="btn btn-outline" style="width:100%; border-width: 1px;">View Full Report</button>
                    </div>
                </div>
            </div>
        `,
        tutorials: `
            <div class="fade-in">
                <div style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h1 style="font-size:1.75rem; color:var(--text-main); margin-bottom:0.5rem;">Tutorial Library</h1>
                        <p style="color:var(--text-muted); margin:0;">Expand your knowledge with our honey bee masterclasses.</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="btn btn-outline" style="padding: 0.5rem 1rem; border-width: 1px; font-size: 0.875rem;">Filter</button>
                        <button class="btn btn-outline" style="padding: 0.5rem 1rem; border-width: 1px; font-size: 0.875rem;">Search</button>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-6">
                    <div class="card" style="overflow:hidden; height: auto;">
                        <img src="https://images.unsplash.com/photo-1558508958-c91d845cd15c?auto=format&fit=crop&q=80&w=800" style="width:100%; height:180px; object-fit:cover;">
                        <div style="padding:1.5rem;">
                            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--primary-color); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: block;">Beginner</span>
                            <h4 style="margin:0 0 0.75rem; color:var(--text-main); font-size: 1.125rem;">Intro to Hive Anatomy</h4>
                            <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.5rem; line-height: 1.5;">Master the components of Langstroth hives and their functions.</p>
                            <button class="btn btn-outline" style="width:100%; border-width: 1px;">Watch Now</button>
                        </div>
                    </div>
                    <div class="card" style="overflow:hidden; height: auto;">
                        <img src="https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&q=80&w=800" style="width:100%; height:180px; object-fit:cover;">
                        <div style="padding:1.5rem;">
                            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--primary-color); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: block;">Intermediate</span>
                            <h4 style="margin:0 0 0.75rem; color:var(--text-main); font-size: 1.125rem;">Spring Management</h4>
                            <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.5rem; line-height: 1.5;">Essential steps to prepare your colonies for the busy nectar flow season.</p>
                            <button class="btn btn-outline" style="width:100%; border-width: 1px;">Watch Now</button>
                        </div>
                    </div>
                    <div class="card" style="overflow:hidden; height: auto;">
                        <img src="https://images.unsplash.com/photo-1621460249243-7377507cc362?auto=format&fit=crop&q=80&w=800" style="width:100%; height:180px; object-fit:cover;">
                        <div style="padding:1.5rem;">
                            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--primary-color); font-weight: 700; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: block;">Advanced</span>
                            <h4 style="margin:0 0 0.75rem; color:var(--text-main); font-size: 1.125rem;">Queen Rearing Basics</h4>
                            <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1.5rem; line-height: 1.5;">Advanced techniques for propagating and improving your apiary stock.</p>
                            <button class="btn btn-outline" style="width:100%; border-width: 1px;">Watch Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        settings: `
            <div class="fade-in">
                <div style="margin-bottom: 2rem;">
                    <h1 style="font-size:1.75rem; color:var(--text-main); margin-bottom:0.5rem;">Account Settings</h1>
                    <p style="color:var(--text-muted); margin:0;">Manage your profile, security, and preferences.</p>
                </div>

                <div class="grid grid-cols-3 gap-8">
                    <div class="col-span-2" style="grid-column: span 2;">
                        <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                            <h3 style="margin: 0 0 1.5rem; font-size: 1.25rem; color:var(--text-main); display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="user" style="width:20px;"></i> Profile Information</h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label style="display:block; margin-bottom:0.5rem; font-size:0.875rem; font-weight: 500; color:var(--text-main);">Full Name</label>
                                    <input type="text" value="Jane Doe" style="width:100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-alt); color: var(--text-main);">
                                </div>
                                <div>
                                    <label style="display:block; margin-bottom:0.5rem; font-size:0.875rem; font-weight: 500; color:var(--text-main);">Email Address</label>
                                    <input type="email" value="jane@example.com" style="width:100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-alt); color: var(--text-main);">
                                </div>
                                <div style="grid-column: span 2;">
                                    <label style="display:block; margin-bottom:0.5rem; font-size:0.875rem; font-weight: 500; color:var(--text-main);">Professional Bio</label>
                                    <textarea style="width:100%; height:120px; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-alt); color: var(--text-main); font-family: inherit;">Hobbyist beekeeper with 3 years experience. Passionate about local conservation and sustainable honey production in the Pacific Northwest area.</textarea>
                                </div>
                            </div>
                            <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
                                <button class="btn btn-primary" style="padding: 0.75rem 2rem;">Save Changes</button>
                                <button class="btn btn-outline" style="border-width: 1px;">Reset</button>
                            </div>
                        </div>

                        <div class="card" style="padding: 1.5rem; max-width: 600px; height: fit-content;">
                            <h3 style="margin: 0 0 1rem; font-size: 1.125rem; color:var(--text-main); display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="shield-check" style="width:18px;"></i> Security & Privacy</h3>
                            <div class="flex flex-col gap-3">
                                <div class="flex items-center justify-between" style="background: var(--bg-alt); border-radius: 10px; padding: 0.8rem 1.25rem;">
                                    <div>
                                        <h4 style="margin:0; font-size: 0.9375rem;">Password</h4>
                                        <p style="margin:0; font-size: 0.8125rem; color:var(--text-muted);">Last changed 2 months ago</p>
                                    </div>
                                    <button class="btn btn-outline" style="padding: 0.45rem 1.1rem; border-width: 1px; font-size: 0.8125rem;">Update</button>
                                </div>
                                <div class="flex items-center justify-between" style="background: var(--bg-alt); border-radius: 10px; padding: 0.8rem 1.25rem;">
                                    <div>
                                        <h4 style="margin:0; font-size: 0.9375rem;">Two-Factor Authentication</h4>
                                        <p style="margin:0; font-size: 0.8125rem; color:var(--text-muted);">Extra layer of account security</p>
                                    </div>
                                    <button class="btn btn-primary" style="padding: 0.45rem 1.1rem; font-size: 0.8125rem;">Enable</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="card" style="padding: 2rem; text-align: center;">
                            <div style="position:relative; width:140px; height:140px; margin:0 auto 1.5rem;">
                                <img src="https://placehold.co/140x140/f59e0b/1f2937?text=JD" style="width:100%; height:100%; border-radius:50%; object-fit:cover; border: 4px solid var(--bg-alt);">
                                <button style="position:absolute; bottom:5px; right:5px; background:var(--primary-color); color:#fff; border:none; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <i data-lucide="camera" style="width:20px;"></i>
                                </button>
                            </div>
                            <h4 style="margin:0 0 0.5rem; color:var(--text-main); font-size: 1.25rem;">Jane Doe</h4>
                            <p style="margin:0 0 1.5rem; font-size:0.875rem; color:var(--text-muted);">Apiary Member since 2023</p>
                            <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                                <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
                                    <span style="font-size: 0.875rem; color: var(--text-muted);">Points</span>
                                    <span style="font-weight: 700; color: var(--primary-color);">420</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span style="font-size: 0.875rem; color: var(--text-muted);">Hives Tracked</span>
                                    <span style="font-weight: 700; color: var(--primary-color);">2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    };


    function switchTab(tabId) {
        // Update sidebar links
        sidebarLinks.forEach(link => {
            if (link.dataset.tab === tabId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Title
        const titleMap = {
            overview: 'Dashboard Overview',
            orders: 'Orders',
            reports: 'Hive Health Reports',
            tutorials: 'Tutorial Library',
            settings: 'Account Settings'
        };
        if (dashboardTitle) dashboardTitle.textContent = titleMap[tabId];

        // Update Content
        if (dashboardContent && templates[tabId]) {
            dashboardContent.innerHTML = templates[tabId];
            // Re-initialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.dataset.tab;
            if (tabId) switchTab(tabId);
            
            // Auto-close sidebar on mobile
            if (window.innerWidth < 1024 && dashboardSidebar && dashboardSidebar.classList.contains('show')) {
                dashboardSidebar.classList.remove('show');
                const iconNode = dashboardMenuBtn.querySelector('i');
                if (iconNode) {
                    iconNode.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // 3. Logout Redirect
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // Add styles for animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

