// Orders ViewModel
window.OrdersViewModel = {
  orders: [],

  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('orders');
    AdminHeader.init({
      title: 'Sipariş Yönetimi',
      subtitle: 'Gelen siparişleri, kargo süreçlerini ve faturaları yönetin.'
    });

    this.loadTable();
  },

  loadTable() {
    this.orders = OrderModel.getAll();
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    if (!this.orders || this.orders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="py-12 text-center text-slate-400 dark:text-zinc-500 text-sm font-medium">Henüz sipariş bulunmuyor.</td></tr>';
      return;
    }

    tbody.innerHTML = this.orders.map(o => {
      const items = typeof o.items_json === 'string' ? JSON.parse(o.items_json || '[]') : (o.items_json || []);
      return `
        <tr class="hover:bg-neutral-50/70 dark:hover:bg-zinc-800/30 transition-colors">
          <td class="py-5 pl-8 pr-4 font-bold text-neutral-900 dark:text-white text-base">
            #${o.id}
          </td>
          <td class="py-5 px-4">
            <div class="font-bold text-neutral-900 dark:text-white text-sm">${o.customer_name}</div>
            <div class="text-xs text-neutral-500 dark:text-zinc-400 font-mono">${o.customer_email}</div>
            <div class="text-[11px] text-neutral-400 dark:text-zinc-500 mt-0.5 truncate max-w-xs">${o.customer_address || '-'}</div>
          </td>
          <td class="py-5 px-4 text-xs text-neutral-700 dark:text-zinc-300">
            ${items.map(i => `<div class="font-medium">• ${i.title} <span class="font-mono text-neutral-400">(${i.qty}x)</span></div>`).join('')}
          </td>
          <td class="py-5 px-4 font-bold text-[15px] text-neutral-900 dark:text-white font-mono">
            $${o.total_amount}
          </td>
          <td class="py-5 px-4 text-center">
            <select onchange="OrdersViewModel.updateStatus(${o.id}, this.value)" class="text-xs font-semibold px-3 py-1.5 rounded-full border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white outline-none cursor-pointer">
              <option value="Hazırlanıyor" ${o.status === 'Hazırlanıyor' ? 'selected' : ''}>⏳ Hazırlanıyor</option>
              <option value="Kargoya Verildi" ${o.status === 'Kargoya Verildi' ? 'selected' : ''}>🚚 Kargoya Verildi</option>
              <option value="Teslim Edildi" ${o.status === 'Teslim Edildi' ? 'selected' : ''}>✅ Teslim Edildi</option>
            </select>
          </td>
          <td class="py-5 pl-4 pr-8 text-right">
            <button onclick="OrdersViewModel.openInvoiceModal(${o.id})" title="Fatura Görüntüle" class="w-10 h-10 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-[#eef2ff] dark:bg-indigo-950/40 text-[#4f46e5] dark:text-indigo-400 inline-flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" x2="8" y1="13" y2="13"/>
                <line x1="16" x2="8" y1="17" y2="17"/>
              </svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
    lucide.createIcons();
  },

  updateStatus(id, newStatus) {
    OrderModel.updateStatus(id, newStatus);
    this.loadTable();
  },

  openInvoiceModal(id) {
    const o = OrderModel.getById(id);
    if (!o) return;

    document.getElementById('invModalId').textContent = 'Sipariş Faturası #' + o.id;
    const items = typeof o.items_json === 'string' ? JSON.parse(o.items_json || '[]') : (o.items_json || []);

    document.getElementById('invoiceModalContent').innerHTML = `
      <div class="p-4 rounded-2xl bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 space-y-2">
        <div class="flex justify-between">
          <span class="text-neutral-500 dark:text-zinc-400">Müşteri:</span>
          <span class="font-bold text-neutral-900 dark:text-white">${o.customer_name}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-500 dark:text-zinc-400">E-Posta:</span>
          <span>${o.customer_email}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-500 dark:text-zinc-400">Teslimat Adresi:</span>
          <span class="text-right max-w-xs">${o.customer_address || 'Belirtilmedi'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-neutral-500 dark:text-zinc-400">Durum:</span>
          <span class="font-bold text-indigo-600 dark:text-indigo-400">${o.status}</span>
        </div>
      </div>

      <div class="space-y-2 pt-2">
        <div class="font-bold text-xs uppercase text-neutral-400 dark:text-zinc-500">Ürün Kalemleri</div>
        ${items.map(item => `
          <div class="flex justify-between items-center p-3 rounded-xl bg-neutral-50 dark:bg-zinc-900/40 border border-neutral-100 dark:border-zinc-800">
            <div>
              <div class="font-bold text-neutral-900 dark:text-white">${item.title}</div>
              <div class="text-[11px] text-neutral-400">Birim: $${item.price} × ${item.qty} adet</div>
            </div>
            <div class="font-bold font-mono text-neutral-900 dark:text-white">$${item.price * item.qty}</div>
          </div>
        `).join('')}
      </div>

      <div class="pt-4 border-t border-neutral-200 dark:border-zinc-800 flex justify-between items-center text-sm font-bold">
        <span class="text-neutral-900 dark:text-white">TOPLAM TUTAR:</span>
        <span class="text-indigo-600 dark:text-indigo-400 text-base font-mono">$${o.total_amount}</span>
      </div>
    `;

    document.getElementById('invoiceModal').classList.remove('hidden');
    lucide.createIcons();
  },

  closeInvoiceModal() {
    document.getElementById('invoiceModal').classList.add('hidden');
  }
};