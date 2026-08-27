// SEO & Analytics ViewModel
window.SeoViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('seo');
    AdminHeader.init({
      title: 'Gelişmiş SEO & Analitik',
      subtitle: 'Arama motoru optimizasyonu, sosyal medya meta etiketleri ve takip kodları.'
    });

    this.bindEvents();
    this.loadData();
    this.initWebPUploaders();
  },

  bindEvents() {
    document.getElementById('seoForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveData();
    });

    const titleInput = document.getElementById('seo_meta_title');
    const descInput = document.getElementById('seo_meta_desc');

    titleInput?.addEventListener('input', () => this.updateSerp());
    descInput?.addEventListener('input', () => this.updateSerp());
  },

  switchSubTab(tabId) {
    document.querySelectorAll('.seo-sub-panel').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById('sub-panel-' + tabId);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.seo-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-subtab') === tabId) {
        btn.className = 'seo-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shadow-xs flex items-center gap-2';
      } else {
        btn.className = 'seo-tab-btn px-4 py-2.5 rounded-xl font-medium text-xs text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 hover:text-neutral-900 dark:hover:text-white transition-all flex items-center gap-2';
      }
    });
    lucide.createIcons();
  },

  loadData() {
    const s = SeoModel.getSeo();
    
    // Genel
    document.getElementById('seo_meta_title').value = s.meta_title || '';
    document.getElementById('seo_meta_desc').value = s.meta_description || '';
    document.getElementById('seo_keywords').value = s.keywords || '';
    document.getElementById('seo_site_name').value = s.site_name || '';
    document.getElementById('seo_author').value = s.author || '';
    document.getElementById('seo_logo_url').value = s.logo_url || '';
    document.getElementById('seo_favicon_url').value = s.favicon_url || '';
    document.getElementById('seo_touch_icon').value = s.apple_touch_icon || '';

    // Sosyal
    document.getElementById('seo_og_title').value = s.og_title || '';
    document.getElementById('seo_og_desc').value = s.og_description || '';
    document.getElementById('seo_og_image').value = s.og_image || '';
    document.getElementById('seo_twitter_handle').value = s.twitter_handle || '';

    // Analitik
    document.getElementById('seo_ga4_id').value = s.ga4_id || '';
    document.getElementById('seo_gtm_id').value = s.gtm_id || '';
    document.getElementById('seo_fb_pixel').value = s.fb_pixel_id || '';
    document.getElementById('seo_tiktok_pixel').value = s.tiktok_pixel_id || '';
    document.getElementById('seo_yandex_metrica').value = s.yandex_metrica_id || '';

    // Search Console
    document.getElementById('seo_google_verify').value = s.google_site_verification || '';
    document.getElementById('seo_bing_verify').value = s.bing_verification || '';
    document.getElementById('seo_yandex_verify').value = s.yandex_verification || '';

    // Teknik SEO
    document.getElementById('seo_canonical').value = s.canonical_url || '';
    document.getElementById('seo_robots_meta').value = s.robots_meta || 'index, follow';
    document.getElementById('seo_robots_txt').value = s.robots_txt || 'User-agent: *\nAllow: /\nSitemap: https://benimplaka.com/sitemap.xml';

    // Kod Enjeksiyonu
    document.getElementById('seo_custom_head').value = s.custom_head_code || '';
    document.getElementById('seo_custom_body').value = s.custom_body_code || '';

    this.updateSerp();
  },

  updateSerp() {
    const t = document.getElementById('seo_meta_title')?.value || '3D Coreqm — 3D Video & Showcase';
    const d = document.getElementById('seo_meta_desc')?.value || 'Yeni nesil Apple tarzı 3D video ve etkileşimli WebP ürün vitrini deneyimi.';

    const prevT = document.getElementById('serpPrevTitle');
    const prevD = document.getElementById('serpPrevDesc');
    const cntT = document.getElementById('titleCount');
    const cntD = document.getElementById('descCount');

    if (prevT) prevT.textContent = t;
    if (prevD) prevD.textContent = d;
    if (cntT) cntT.textContent = t.length + ' / 60';
    if (cntD) cntD.textContent = d.length + ' / 160';
  },

  initWebPUploaders() {
    const pairs = [
      { inputId: 'file_seo_logo', targetId: 'seo_logo_url', badgeId: 'badge_seo_logo' },
      { inputId: 'file_seo_favicon', targetId: 'seo_favicon_url', badgeId: 'badge_seo_favicon' },
      { inputId: 'file_seo_og', targetId: 'seo_og_image', badgeId: 'badge_seo_og' }
    ];

    pairs.forEach(({ inputId, targetId, badgeId }) => {
      const el = document.getElementById(inputId);
      if (!el) return;

      el.addEventListener('change', async (e) => {
        const f = e.target.files[0];
        if (!f) return;

        const badge = document.getElementById(badgeId);
        try {
          if (badge) {
            badge.textContent = '⚡ WebP Dönüştürülüyor...';
            badge.classList.remove('hidden');
          }
          const res = await WebPHelper.convertImageToWebP(f, 0.9, 1200);
          document.getElementById(targetId).value = res.dataUrl;
          if (badge) {
            badge.textContent = `⚡ WebP (%${res.savingsPercent} Tasarruf)`;
            badge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
          }
        } catch (err) {
          alert(err.message);
        }
      });
    });
  },

  saveData() {
    const data = {
      meta_title: document.getElementById('seo_meta_title').value,
      meta_description: document.getElementById('seo_meta_desc').value,
      keywords: document.getElementById('seo_keywords').value,
      site_name: document.getElementById('seo_site_name').value,
      author: document.getElementById('seo_author').value,
      logo_url: document.getElementById('seo_logo_url').value,
      favicon_url: document.getElementById('seo_favicon_url').value,
      apple_touch_icon: document.getElementById('seo_touch_icon').value,

      og_title: document.getElementById('seo_og_title').value,
      og_description: document.getElementById('seo_og_desc').value,
      og_image: document.getElementById('seo_og_image').value,
      twitter_handle: document.getElementById('seo_twitter_handle').value,

      ga4_id: document.getElementById('seo_ga4_id').value,
      gtm_id: document.getElementById('seo_gtm_id').value,
      fb_pixel_id: document.getElementById('seo_fb_pixel').value,
      tiktok_pixel_id: document.getElementById('seo_tiktok_pixel').value,
      yandex_metrica_id: document.getElementById('seo_yandex_metrica').value,

      google_site_verification: document.getElementById('seo_google_verify').value,
      bing_verification: document.getElementById('seo_bing_verify').value,
      yandex_verification: document.getElementById('seo_yandex_verify').value,

      canonical_url: document.getElementById('seo_canonical').value,
      robots_meta: document.getElementById('seo_robots_meta').value,
      robots_txt: document.getElementById('seo_robots_txt').value,

      custom_head_code: document.getElementById('seo_custom_head').value,
      custom_body_code: document.getElementById('seo_custom_body').value
    };

    SeoModel.saveSeo(data);
    alert('SEO, Analitik ve Piksel ayarları başarıyla kaydedildi!');
  }
};