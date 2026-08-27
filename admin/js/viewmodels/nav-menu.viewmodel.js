// Navigation Menu ViewModel
window.NavMenuViewModel = {
  items: [],

  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('nav-menu');
    AdminHeader.init({
      title: 'Menü Yönetimi',
      subtitle: 'Üst navigasyon çubuğundaki bağlantıları ve sıralamaları düzenleyin.'
    });

    this.bindEvents();
    this.loadTable();
  },

  bindEvents() {
    document.getElementById('menuForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  },

  loadTable() {
    this.items = SettingsModel.getNavItems();
    const tbody = document.getElementById('navMenuTableBody');
    if (!tbody) return;

    if (!this.items || this.items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="py-12 text-center text-slate-400 dark:text-zinc-500 text-sm">Menü öğesi bulunamadı.</td></tr>';
      return;
    }

    tbody.innerHTML = this.items.map(m => `
      <tr class="hover:bg-neutral-50/70 dark:hover:bg-zinc-800/30 transition-colors">
        <td class="py-5 pl-8 pr-4 font-bold text-neutral-900 dark:text-white text-base">
          #${m.order || 0}
        </td>
        <td class="py-5 px-4 font-bold text-neutral-900 dark:text-white text-sm">
          ${m.title_tr}
        </td>
        <td class="py-5 px-4 text-xs font-semibold text-neutral-600 dark:text-zinc-400">
          ${m.title_en || '-'}
        </td>
        <td class="py-5 px-4 font-mono text-xs text-neutral-500 dark:text-zinc-400">
          ${m.url}
        </td>
        <td class="py-5 px-4 text-center">
          ${m.badge ? `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">● ${m.badge}</span>` : '<span class="text-neutral-400 text-xs">-</span>'}
        </td>
        <td class="py-5 pl-4 pr-8 text-right">
          <div class="flex items-center justify-end gap-2.5">
            <button onclick="NavMenuViewModel.openEditModal(${m.id})" title="Düzenle" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-[#eef2ff] dark:bg-indigo-950/40 text-[#4f46e5] dark:text-indigo-400 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button onclick="NavMenuViewModel.deleteItem(${m.id})" title="Sil" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-[#fff1f2] dark:bg-rose-950/40 text-[#e11d48] dark:text-rose-400 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
  },

  openNewModal() {
    document.getElementById('menuModalTitle').textContent = 'Yeni Menü Öğesi';
    document.getElementById('menuForm').reset();
    document.getElementById('menu_id').value = '';
    document.getElementById('menuModal').classList.remove('hidden');
  },

  openEditModal(id) {
    const m = this.items.find(i => i.id === id);
    if (!m) return;

    document.getElementById('menuModalTitle').textContent = 'Menü Öğesini Düzenle #' + m.id;
    document.getElementById('menu_id').value = m.id;
    document.getElementById('menu_title_tr').value = m.title_tr;
    document.getElementById('menu_title_en').value = m.title_en || '';
    document.getElementById('menu_url').value = m.url;
    document.getElementById('menu_order').value = m.order || 0;
    document.getElementById('menu_badge').value = m.badge || '';
    document.getElementById('menu_new_tab').value = m.new_tab ? '1' : '0';

    document.getElementById('menuModal').classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('menuModal').classList.add('hidden');
  },

  handleFormSubmit() {
    const item = {
      id: document.getElementById('menu_id').value ? parseInt(document.getElementById('menu_id').value) : null,
      title_tr: document.getElementById('menu_title_tr').value,
      title_en: document.getElementById('menu_title_en').value,
      url: document.getElementById('menu_url').value,
      order: parseInt(document.getElementById('menu_order').value || 0),
      badge: document.getElementById('menu_badge').value,
      new_tab: parseInt(document.getElementById('menu_new_tab').value)
    };

    SettingsModel.saveNavItem(item);
    this.closeModal();
    this.loadTable();
  },

  deleteItem(id) {
    if (confirm('Bu menü öğesini silmek istediğinize emin misiniz?')) {
      SettingsModel.deleteNavItem(id);
      this.loadTable();
    }
  }
};