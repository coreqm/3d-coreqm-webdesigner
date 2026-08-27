// Shared Admin Sidebar Component
window.AdminSidebar = {
  init(activeKey = 'dashboard') {
    const user = Store.getUser();
    if (!user || user.role !== 'admin') {
      window.location.href = '/login.html';
      return;
    }

    const container = document.getElementById('sidebar-container');
    if (!container) return;

    const navSections = [
      {
        title: 'E-TİCARET & KATALOG',
        items: [
          { key: 'dashboard', href: '/admin/index.html', icon: 'layout-dashboard', title: 'Genel Bakış' },
          { key: 'products', href: '/admin/products.html', icon: 'package', title: 'Ürün Kataloğu (CRUD)' },
          { key: 'orders', href: '/admin/orders.html', icon: 'shopping-cart', title: 'Siparişler', badgeId: 'sidebarOrderCountBadge' },
          { key: 'header-design', href: '/admin/header-design.html', icon: 'palette', title: '3D Video & Hero' },
          { key: 'nav-menu', href: '/admin/nav-menu.html', icon: 'menu', title: 'Menü Yönetimi' },
          { key: 'iframes', href: '/admin/iframes.html', icon: 'layers', title: '3D Canvas Setleri' }
        ]
      },
      {
        title: 'SİSTEM, ÖDEME & GÜVENLİK',
        items: [
          { key: 'payments', href: '/admin/payments.html', icon: 'credit-card', title: 'Ödeme Sistemleri' },
          { key: 'auth-settings', href: '/admin/auth-settings.html', icon: 'shield-alert', title: 'Sosyal Giriş & 2FA' },
          { key: 'mail-settings', href: '/admin/mail-settings.html', icon: 'mail', title: 'E-Posta & SMTP' },
          { key: 'seo', href: '/admin/seo.html', icon: 'globe', title: 'Gelişmiş SEO & Analitik' },
          { key: 'map', href: '/admin/map.html', icon: 'map-pin', title: 'Harita & Showroom' },
          { key: 'security', href: '/admin/security.html', icon: 'lock', title: 'Şifre & Güvenlik' }
        ]
      }
    ];

    const uInitial = (user.full_name || user.username || 'A').charAt(0).toUpperCase();

    const html = `
      <aside id="sidebar" class="w-64 h-screen max-h-screen bg-white dark:bg-[#0d0f14] border-r border-neutral-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all duration-300 z-40 fixed inset-y-0 left-0 -translate-x-full lg:translate-x-0 lg:static">
        <!-- Üst Kısım -->
        <div class="p-5 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          <!-- Logo -->
          <div class="flex items-center justify-between">
            <a href="/admin/index.html" class="flex items-center gap-3 group">
              <div class="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
                <span>3D</span>
              </div>
              <div class="flex flex-col">
                <span class="font-extrabold text-[15px] tracking-tight leading-none text-neutral-900 dark:text-white">3D<span class="text-indigo-600 dark:text-indigo-400"> Coreqm</span></span>
                <span class="text-[9px] font-mono text-neutral-500 dark:text-zinc-400 uppercase tracking-widest mt-1">Yönetim Konsolu</span>
              </div>
            </a>
            <button onclick="AdminSidebar.toggleMobile()" class="lg:hidden p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-zinc-800">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Arama Filtresi -->
          <div class="relative">
            <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-zinc-500"></i>
            <input type="text" id="sidebarNavSearch" oninput="AdminSidebar.filterNav(this.value)" placeholder="Modüllerde ara..." class="w-full pl-8 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-zinc-900/80 border border-neutral-200/80 dark:border-zinc-800 text-xs text-neutral-800 dark:text-zinc-200 placeholder-neutral-400 dark:placeholder-zinc-500 outline-none focus:border-indigo-500 transition-colors">
          </div>

          <!-- Navigasyon Menüleri -->
          <nav class="space-y-4" id="adminSidebarNav">
            ${navSections.map(sec => `
              <div class="space-y-1">
                <div class="px-2 pb-1 text-[10px] font-bold text-neutral-400 dark:text-zinc-500 uppercase tracking-wider font-mono">${sec.title}</div>
                ${sec.items.map(item => {
                  const isActive = item.key === activeKey;
                  const activeClass = isActive 
                    ? 'text-neutral-950 dark:text-white bg-[#ebebeb] dark:bg-zinc-800 font-semibold' 
                    : 'text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800/60 font-medium';
                  const iconColor = isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-zinc-400';
                  
                  return `
                    <a href="${item.href}" class="admin-nav-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl ${activeClass} text-[13px] transition-all text-left group">
                      <div class="flex items-center gap-3">
                        <i data-lucide="${item.icon}" class="w-4 h-4 ${iconColor}"></i>
                        <span>${item.title}</span>
                      </div>
                      ${item.badgeId ? `<span id="${item.badgeId}" class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 font-bold">0</span>` : ''}
                    </a>
                  `;
                }).join('')}
              </div>
            `).join('')}
          </nav>
        </div>

        <!-- Alt Kısım -->
        <div class="p-4 border-t border-neutral-200 dark:border-zinc-800 space-y-3 bg-neutral-50/50 dark:bg-[#0b0d11]">
          <a href="/" target="_blank" class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-700 text-neutral-700 dark:text-zinc-200 text-xs font-medium transition-colors border border-neutral-200 dark:border-zinc-700 shadow-2xs">
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            <span>Mağazayı Aç</span>
          </a>


        </div>
      </aside>

      <!-- Mobil Karartma -->
      <div id="mobileBackdrop" onclick="AdminSidebar.toggleMobile()" class="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 hidden lg:hidden"></div>
    `;

    container.innerHTML = html;

    const orders = Store.getOrders();
    const b = document.getElementById('sidebarOrderCountBadge');
    if (b) b.textContent = orders.length;

    lucide.createIcons();
  },

  toggleMobile() {
    const sb = document.getElementById('sidebar');
    const bd = document.getElementById('mobileBackdrop');
    if (sb) sb.classList.toggle('-translate-x-full');
    if (bd) bd.classList.toggle('hidden');
  },

  filterNav(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('.admin-nav-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }
};