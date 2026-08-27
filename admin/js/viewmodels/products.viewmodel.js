// Products ViewModel
window.ProductsViewModel = {
  products: [],
  selectedWebPData: null,

  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('products');
    AdminHeader.init({
      title: 'Ürün Kataloğu (CRUD)',
      subtitle: 'E-ticaret ürünlerini ekleyin, düzenleyin veya kaldırın.'
    });

    this.bindEvents();
    this.loadTable();
  },

  bindEvents() {
    // Arama ve Filtre
    document.getElementById('searchProductInput')?.addEventListener('input', (e) => {
      this.filterTable(e.target.value);
    });

    // Form Gönderimi
    document.getElementById('productForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // WebP Dosya Seçici
    const fileInput = document.getElementById('prod_image_file');
    if (fileInput) {
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const badge = document.getElementById('prod_webp_badge');
        const preview = document.getElementById('prod_image_preview');

        try {
          if (badge) {
            badge.textContent = '⚡ WebP Dönüştürülüyor...';
            badge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20';
            badge.classList.remove('hidden');
          }

          const res = await WebPHelper.convertImageToWebP(file, 0.85, 1200);
          this.selectedWebPData = res.dataUrl;

          if (badge) {
            badge.textContent = `⚡ WebP (%${res.savingsPercent} Tasarruf, ${WebPHelper.formatBytes(res.webpSize)})`;
            badge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
          }

          if (preview) {
            preview.src = res.dataUrl;
            preview.classList.remove('hidden');
          }
          document.getElementById('prod_image').value = res.dataUrl;
        } catch (err) {
          alert(err.message);
        }
      });
    }
  },

  loadTable() {
    this.products = ProductModel.getAll();
    this.renderRows(this.products);
  },

  formatImgUrl(url) {
    if (!url) return '/frames/frame_0001.webp';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('/')) {
      return url;
    }
    return '/' + url;
  },

  renderRows(list) {
    const tbody = document.getElementById('productTableBody');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="py-12 text-center text-slate-400 dark:text-zinc-500 text-sm font-medium">Henüz ürün bulunamadı. "+ Yeni Ürün Ekle" butonuna tıklayarak ilk ürününüzü ekleyin.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map(p => `
      <tr class="hover:bg-neutral-50/70 dark:hover:bg-zinc-800/30 transition-colors">
        <td class="py-6 pl-8 pr-4 font-bold text-neutral-900 dark:text-white text-base">
          #${p.id}
        </td>
        <td class="py-6 px-4">
          <div class="w-[84px] h-[84px] rounded-2xl bg-black flex items-center justify-center p-2.5 overflow-hidden shadow-2xs border border-neutral-100 dark:border-zinc-800">
            <img src="${this.formatImgUrl(p.image_url)}" onerror="this.src='/frames/frame_0001.webp'" class="w-full h-full object-contain" alt="${p.title}">
          </div>
        </td>
        <td class="py-6 px-4 font-bold text-[15px] text-neutral-900 dark:text-white">
          ${p.title}
        </td>
        <td class="py-6 px-4 text-xs font-semibold text-neutral-600 dark:text-zinc-400">
          ${p.category || 'Genel'}
        </td>
        <td class="py-6 px-4 font-bold text-[15px] text-neutral-900 dark:text-white font-mono">
          $${p.price}
        </td>
        <td class="py-6 px-4 text-center">
          ${p.has_3d ? 
            '<span class="inline-flex items-center justify-center bg-[#e8f8ee] text-[#16a34a] dark:bg-emerald-500/15 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold">360° Aktif</span>' : 
            '<span class="inline-flex items-center justify-center bg-[#f1f5f9] text-[#64748b] dark:bg-zinc-800 dark:text-zinc-400 px-4 py-1.5 rounded-full text-xs font-medium">Statik Görsel</span>'}
        </td>
        <td class="py-6 pl-4 pr-8 text-right">
          <div class="flex items-center justify-end gap-2.5">
            <button onclick="ProductsViewModel.openEditModal(${p.id})" title="Düzenle" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-[#eef2ff] dark:bg-indigo-950/40 text-[#4f46e5] dark:text-indigo-400 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button onclick="ProductsViewModel.deleteProduct(${p.id})" title="Sil" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-[#fff1f2] dark:bg-rose-950/40 text-[#e11d48] dark:text-rose-400 flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors shadow-2xs">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
  },

  filterTable(query) {
    const q = query.toLowerCase().trim();
    const filtered = this.products.filter(p => 
      p.title.toLowerCase().includes(q) || 
      (p.category && p.category.toLowerCase().includes(q)) ||
      p.id.toString().includes(q)
    );
    this.renderRows(filtered);
  },

  openNewModal() {
    document.getElementById('productModalTitle').textContent = 'Yeni Ürün Ekle';
    document.getElementById('productForm').reset();
    document.getElementById('prod_id').value = '';
    this.selectedWebPData = null;

    const preview = document.getElementById('prod_image_preview');
    if (preview) {
      preview.src = '';
      preview.classList.add('hidden');
    }
    const badge = document.getElementById('prod_webp_badge');
    if (badge) badge.classList.add('hidden');

    this.populateFramesSelect();
    document.getElementById('productModal').classList.remove('hidden');
  },

  openEditModal(id) {
    const p = ProductModel.getById(id);
    if (!p) return;

    document.getElementById('productModalTitle').textContent = 'Ürünü Düzenle #' + p.id;
    document.getElementById('prod_id').value = p.id;
    document.getElementById('prod_title').value = p.title;
    document.getElementById('prod_price').value = p.price;
    document.getElementById('prod_category').value = p.category || '';
    document.getElementById('prod_desc').value = p.description || '';
    document.getElementById('prod_has_3d').value = p.has_3d ? '1' : '0';
    document.getElementById('prod_image').value = p.image_url || '';

    const preview = document.getElementById('prod_image_preview');
    if (preview && p.image_url) {
      preview.src = this.formatImgUrl(p.image_url);
      preview.classList.remove('hidden');
    }

    this.populateFramesSelect(p.frame_folder);
    document.getElementById('productModal').classList.remove('hidden');
  },

  populateFramesSelect(selectedVal = '') {
    const select = document.getElementById('prod_frame_folder');
    if (!select) return;
    const iframes = FrameModel.getAll();
    select.innerHTML = '<option value="">(Seçilmedi - Statik Görsel)</option>' + iframes.map(f => `
      <option value="${f.folder}" ${f.folder === selectedVal ? 'selected' : ''}>${f.title} (${f.folder})</option>
    `).join('');
  },

  closeModal() {
    document.getElementById('productModal').classList.add('hidden');
  },

  handleFormSubmit() {
    const data = {
      id: document.getElementById('prod_id').value ? parseInt(document.getElementById('prod_id').value) : null,
      title: document.getElementById('prod_title').value,
      price: parseFloat(document.getElementById('prod_price').value),
      category: document.getElementById('prod_category').value,
      description: document.getElementById('prod_desc').value,
      has_3d: parseInt(document.getElementById('prod_has_3d').value),
      frame_folder: document.getElementById('prod_frame_folder').value,
      image_url: this.selectedWebPData || document.getElementById('prod_image').value
    };

    try {
      ProductModel.save(data);
      this.closeModal();
      this.loadTable();
      alert('Ürün başarıyla kaydedildi!');
    } catch (err) {
      alert(err.message);
    }
  },

  deleteProduct(id) {
    if (confirm(`Ürünü silmek istediğinize emin misiniz? (#${id})`)) {
      ProductModel.delete(id);
      this.loadTable();
    }
  }
};