// Dashboard ViewModel
window.DashboardViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('dashboard');
    AdminHeader.init({
      title: 'Genel Bakış',
      subtitle: 'Sistem durumu, performans metrikleri ve son aktiviteler.'
    });

    this.loadMetrics();
    this.loadRecentOrders();
  },

  loadMetrics() {
    const stats = OrderModel.getStats();
    const prods = ProductModel.getAll();
    const frames = FrameModel.getAll();

    document.getElementById('dashOrdersCount').textContent = stats.totalOrders;
    document.getElementById('dashRevenue').textContent = '$' + stats.totalRevenue.toLocaleString();
    document.getElementById('dashProductsCount').textContent = prods.length;
    document.getElementById('dashFramesCount').textContent = frames.length;
  },

  loadRecentOrders() {
    const orders = OrderModel.getAll();
    const container = document.getElementById('dashRecentOrdersList');
    if (!container) return;

    if (!orders || orders.length === 0) {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-10 text-center select-none">
          <div class="w-14 h-11 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-100/70 dark:bg-zinc-800/70 flex items-center justify-center shadow-2xs mb-2">
            <i data-lucide="inbox" class="w-6 h-6 text-neutral-400 dark:text-zinc-500"></i>
          </div>
          <p class="text-xs font-medium text-neutral-500 dark:text-zinc-400">Henüz kayıtlı bir sipariş bulunmuyor.</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider border-b border-neutral-100 dark:border-zinc-800 pb-2">
            <tr>
              <th class="py-2.5">SİPARİŞ ID</th>
              <th class="py-2.5">MÜŞTERİ</th>
              <th class="py-2.5">TUTAR</th>
              <th class="py-2.5">DURUM</th>
              <th class="py-2.5 text-right">İŞLEM</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-100 dark:divide-zinc-800/60">
            ${orders.slice(0, 5).map(o => `
              <tr class="hover:bg-neutral-50 dark:hover:bg-zinc-800/30 transition-colors">
                <td class="py-3 font-bold text-neutral-900 dark:text-white">#${o.id}</td>
                <td class="py-3 text-neutral-700 dark:text-zinc-300 font-medium">${o.customer_name}</td>
                <td class="py-3 font-bold text-neutral-900 dark:text-white font-mono">$${o.total_amount}</td>
                <td class="py-3">
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300">
                    ${o.status}
                  </span>
                </td>
                <td class="py-3 text-right">
                  <a href="/admin/orders.html" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Yönet →</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    lucide.createIcons();
  }
};