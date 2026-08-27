// Shared Admin Header Component
window.AdminHeader = {
  init({ title = 'Yönetim Paneli', subtitle = '3D Coreqm Yönetim Portalı' } = {}) {
    const container = document.getElementById('header-container');
    if (!container) return;

    const user = Store.getUser() || { username: 'Admin', email: 'admin@test.com' };
    const uName = user.full_name || user.username;
    const uInitial = uName.charAt(0).toUpperCase();

    const html = `
      <header class="h-16 bg-white dark:bg-[#0d0f14] border-b border-neutral-200 dark:border-zinc-800 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
        <div class="flex items-center gap-4">
          <button onclick="AdminSidebar.toggleMobile()" class="lg:hidden p-2 rounded-xl text-neutral-600 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800">
            <i data-lucide="menu" class="w-5 h-5"></i>
          </button>
          <div>
            <h1 class="text-base font-bold text-neutral-900 dark:text-white leading-none">${title}</h1>
            <span class="text-[11px] text-neutral-500 dark:text-zinc-400 font-normal">${subtitle}</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Tema Değiştirici -->
          <button onclick="AdminHeader.toggleTheme()" class="p-2 rounded-xl bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 text-neutral-600 dark:text-zinc-300 transition-colors shadow-2xs" title="Tema Değiştir">
            <i data-lucide="sun" class="w-4 h-4 hidden dark:block text-amber-400"></i>
            <i data-lucide="moon" class="w-4 h-4 block dark:hidden text-neutral-700"></i>
          </button>

          <!-- Dil Seçici -->
          <div class="flex items-center bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 rounded-xl p-0.5 text-[11px] font-mono">
            <button onclick="AdminHeader.setLang('tr')" id="langBtnTr" class="px-2 py-1 rounded-lg text-white font-bold bg-neutral-900 dark:bg-zinc-700 transition-colors">TR</button>
            <button onclick="AdminHeader.setLang('en')" id="langBtnEn" class="px-2 py-1 rounded-lg text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors">EN</button>
          </div>

          <!-- Kullanıcı Profil Menüsü -->
          <div class="relative" id="adminUserMenuContainer">
            <button onclick="AdminHeader.toggleUserDropdown(event)" class="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-zinc-800/80 transition-colors outline-none">
              <div class="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold text-xs shadow-2xs">
                ${uInitial}
              </div>
              <span class="hidden md:inline text-xs font-semibold text-neutral-800 dark:text-zinc-200">${uName}</span>
              <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-neutral-400"></i>
            </button>

            <div id="adminUserDropdown" class="hidden absolute right-0 mt-2 w-56 bg-white dark:bg-[#12141a] border border-neutral-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1">
              <div class="px-3 py-2 border-b border-neutral-100 dark:border-zinc-800">
                <div class="font-bold text-neutral-900 dark:text-white truncate">${uName}</div>
                <div class="text-[10px] text-neutral-500 dark:text-zinc-400 font-mono truncate">${user.email}</div>
              </div>
              <a href="/profile.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors">
                <i data-lucide="user" class="w-4 h-4"></i>
                <span>Müşteri Paneline Git</span>
              </a>
              <a href="/admin/security.html" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors">
                <i data-lucide="shield-check" class="w-4 h-4"></i>
                <span>Şifremi Değiştir</span>
              </a>
              <div class="border-t border-neutral-100 dark:border-zinc-800 my-1"></div>
              <button onclick="Store.logout(); window.location.href='/login.html';" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left font-medium">
                <i data-lucide="log-out" class="w-4 h-4"></i>
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    `;

    container.innerHTML = html;

    AdminHeader.initTheme();
    lucide.createIcons();

    document.addEventListener('click', (e) => {
      const ddContainer = document.getElementById('adminUserMenuContainer');
      const dd = document.getElementById('adminUserDropdown');
      if (ddContainer && dd && !ddContainer.contains(e.target)) {
        dd.classList.add('hidden');
      }
    });
  },

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    lucide.createIcons();
  },

  toggleUserDropdown(e) {
    if (e) e.stopPropagation();
    const dd = document.getElementById('adminUserDropdown');
    if (dd) dd.classList.toggle('hidden');
  },

  setLang(lang) {
    localStorage.setItem('aether_lang', lang);
    const btnTr = document.getElementById('langBtnTr');
    const btnEn = document.getElementById('langBtnEn');
    if (lang === 'tr') {
      if (btnTr) btnTr.className = 'px-2 py-1 rounded-lg text-white font-bold bg-neutral-900 dark:bg-zinc-700 transition-colors';
      if (btnEn) btnEn.className = 'px-2 py-1 rounded-lg text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors';
    } else {
      if (btnEn) btnEn.className = 'px-2 py-1 rounded-lg text-white font-bold bg-neutral-900 dark:bg-zinc-700 transition-colors';
      if (btnTr) btnTr.className = 'px-2 py-1 rounded-lg text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white transition-colors';
    }
  }
};