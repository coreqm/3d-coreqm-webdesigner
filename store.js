/**
 * 3D Coreqm — Pure Client-Side Storage & IndexedDB Frame Engine
 * Tarayıcı İçi Otomatik Video -> 240 WebP Kare Dönüştürücüsü
 */

const DB_NAME = 'AETHER_FRAME_DB';
const DB_VERSION = 1;
const STORE_NAME = 'frames_store';

function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}

const Store = {
  // 1. Veritabanını / LocalStorage'ı İlk Kez Başlat
  init() {
    if (!localStorage.getItem('aether_settings')) {
      const defaultSettings = {
        header_mode: 'fixed',
        header_zindex: 99999,
        header_flush: 1,
        theme_style: 'elite-gray',
        map_title: 'Merkez Showroom & Ar-Ge Merkezi',
        map_address: 'Levent, Büyükdere Cd. No:193, 34394 Şişli/İstanbul',
        map_phone: '+90 (212) 800 24 00',
        map_iframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.8288599424757!2d29.009418676648017!3d41.07270291546738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab65d6c95e1e1%3A0x2ff924976722d3e4!2sLevent%2C%20B%C3%BCy%C3%BCkdere%20Cd.%20No%3A193%2C%2034394%20%C5%9Ei%C5%9Fli%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
        show_3d_hero: 1,
        ecommerce_enabled: 1,
        hero_title_enabled: 1,
        hero_tag: 'OTONOM LÜKS SİSTEMLER',
        hero_title: '3D Coreqm TITANIUM',
        hero_subtitle: 'Mikron hassasiyetinde 240 kare WebP sekansı ve Grade 5 havacılık titanyumu.',
        hero_btn_text: 'Koleksiyonu Keşfet',
        hero_align: 'center',
        hero_valign: 'center',
        site_title: '3D Coreqm — Elite Autonomous Systems',
        site_logo: 'frames/frame_0001.webp',
        site_favicon: 'favicon.ico',
        site_apple_touch_icon: 'frames/frame_0001.webp',
        seo_meta_title: '3D Coreqm — 3D Video & WebP Frame Vitrini | Otonom Lüks Sistemler',
        seo_meta_description: 'Grade 5 havacılık titanyumu, 240 kare WebP sekansı ve otonom lüks teknolojinin zirvesi. 360 derece etkileşimli yeni nesil vitrin.',
        seo_keywords: 'aether one, 3d vitrin, 3d canvas, titanyum saat, webp frame, e-ticaret, lüks saat',
        seo_author: 'Muhammed Ali Gürdal — BenimPlaka',
        seo_canonical_url: 'https://benimplaka.com',
        seo_robots: 'index, follow',
        seo_og_title: '3D Coreqm — 3D Video & WebP Vitrini',
        seo_og_description: '240 kare akıcı WebP motoru ile geleceğin donanımını keşfedin.',
        seo_og_image: 'https://benimplaka.com/frames/frame_0120.webp',
        seo_google_site_verification: '',
        seo_google_analytics_id: '',
        seo_gtm_id: '',
        seo_facebook_pixel_id: '',
        seo_tiktok_pixel_id: '',
        seo_yandex_metrica_id: '',
        seo_bing_verification: '',
        seo_yandex_verification: '',
        seo_pinterest_verification: '',
        seo_twitter_handle: '@benimplaka',
        seo_twitter_card: 'summary_large_image',
        seo_schema_type: 'Organization',
        seo_custom_head_code: '',
        seo_custom_body_code: '',
        seo_robots_txt: 'User-agent: *\nAllow: /\nDisallow: /admin.html\nSitemap: https://benimplaka.com/sitemap.xml'
      };
      localStorage.setItem('aether_settings', JSON.stringify(defaultSettings));
    }

    
    if (!localStorage.getItem('aether_auth_settings')) {
      const defaultAuth = {
        google_login_enabled: 1,
        google_client_id: '',
        google_client_secret: '',
        microsoft_login_enabled: 1,
        microsoft_client_id: '',
        microsoft_tenant_id: 'common',
        microsoft_client_secret: '',
        two_factor_enabled: 0,
        two_factor_method: 'totp',
        two_factor_secret: ''
      };
      localStorage.setItem('aether_auth_settings', JSON.stringify(defaultAuth));
    }

    if (!localStorage.getItem('aether_mail_settings')) {
      const defaultMail = {
        provider: 'smtp',
        smtp_host: 'mail.benimplaka.com',
        smtp_port: 587,
        smtp_encryption: 'tls',
        smtp_user: 'noreply@benimplaka.com',
        smtp_pass: '',
        from_email: 'noreply@benimplaka.com',
        from_name: '3D Coreqm Store',
        gmail_client_id: '',
        gmail_app_password: ''
      };
      localStorage.setItem('aether_mail_settings', JSON.stringify(defaultMail));
    }

    if (!localStorage.getItem('aether_payment_settings')) {
      const defaultPayments = {
        stripe: { enabled: 0, mode: 'test', publishable_key: '', secret_key: '' },
        paypal: { enabled: 0, mode: 'sandbox', client_id: '', secret_key: '' },
        iyzico: { enabled: 0, mode: 'sandbox', api_key: '', secret_key: '', base_url: 'https://sandbox-api.iyzipay.com' },
        paytr: { enabled: 0, merchant_id: '', merchant_key: '', merchant_salt: '' },
        bank_transfer: { enabled: 1, bank_name: 'Garanti BBVA', account_holder: '3D Coreqm Ltd.', iban: 'TR00 0000 0000 0000 0000 0000 00', instructions: 'Lütfen sipariş numaranızı açıklama kısmına yazınız.' },
        cash_on_delivery: { enabled: 1, extra_fee: 5.00 },
        crypto: { enabled: 0, network: 'TRC20 (USDT)', wallet_address: '' }
      };
      localStorage.setItem('aether_payment_settings', JSON.stringify(defaultPayments));
    }

    if (!localStorage.getItem('aether_iframes')) {
      const defaultIframes = [
        {
          id: 1,
          title: 'AETHER Titanyum Ana Vitrin',
          subtitle: '240 Kare Apple WebP Sekansı',
          frames_folder: 'frames',
          frames_count: 240,
          is_active: 1,
          created_at: '2026-08-26'
        }
      ];
      localStorage.setItem('aether_iframes', JSON.stringify(defaultIframes));
    }

    if (!localStorage.getItem('aether_products')) {
      const defaultProducts = [
        {
          id: 1,
          title: '3D Coreqm Chrono',
          slug: 'aether-one-chrono',
          price: 1299,
          old_price: 1899,
          description: '360° dönebilen Grade 5 Titanyum gövde ve yerel yapay zeka işlemcisine sahip lüks otonom kronograf.',
          category: 'Kronograf',
          stock: 15,
          image_url: 'frames/frame_0001.webp',
          frames_folder: 'frames',
          frames_count: 240,
          specs_json: JSON.stringify([
            { label: 'Gövde', value: 'Grade 5 Havacılık Titanyumu' },
            { label: 'İşlemci', value: 'Quantum NPU 2nm 40 TFLOPS' },
            { label: 'Ekran', value: 'Safir Kristal & 3000 Nit OLED' },
            { label: 'Batarya', value: 'Katı Hal Grafen (14 Gün)' },
            { label: 'Su Dayanımı', value: '100 ATM / 1000m' }
          ])
        },
        {
          id: 2,
          title: 'Pulse Neural Ring',
          slug: 'pulse-neural-ring',
          price: 499,
          old_price: 699,
          description: 'Klinik düzeyde EKG, SpO2 ve sinirsel stres takibi yapan mat platin kaplama akıllı yüzük.',
          category: 'Biyometri',
          stock: 30,
          image_url: 'frames/frame_0060.webp',
          frames_folder: '',
          frames_count: 0,
          specs_json: JSON.stringify([
            { label: 'Kasa', value: 'Karbon Fiber & Mat Platin' },
            { label: 'Sensör', value: 'Fotonik Biyometrik Dizi v3' },
            { label: 'Bağlantı', value: 'Kuantum Şifreli Bluetooth 5.4' },
            { label: 'Ağırlık', value: '38 Gram' }
          ])
        },
        {
          id: 3,
          title: 'Horizon Cybernetic Eyewear',
          slug: 'horizon-cybernetic-eyewear',
          price: 899,
          old_price: 1199,
          description: 'Gerçek zamanlı artırılmış gerçeklik telemetrisi sunan safir kristal lensli akıllı gözlük.',
          category: 'Optik & AR',
          stock: 8,
          image_url: 'frames/frame_0120.webp',
          frames_folder: '',
          frames_count: 0,
          specs_json: JSON.stringify([
            { label: 'Lens', value: 'Elektrokromik Polarize Safir' },
            { label: 'Çözünürlük', value: 'Mikro LED 4K Dual Eye' },
            { label: 'Pil Ömrü', value: '18 Saat Aktif AR' },
            { label: 'Ağırlık', value: '42 Gram' }
          ])
        }
      ];
      localStorage.setItem('aether_products', JSON.stringify(defaultProducts));
    }

        if (!localStorage.getItem('aether_users')) {
      const defaultUsers = [
        { 
          id: 1, 
          username: 'admin', 
          email: 'admin@benimplaka.com', 
          salt: 'c0reqm_salt_2026', 
          password_hash: '950fcf400b14bc269f24c8de8284b9a37114c1d70b6c96f8febb09c0f522a48e', 
          role: 'admin', 
          full_name: 'Sistem Yöneticisi' 
        },
        { 
          id: 2, 
          username: 'demo_user', 
          email: 'user@benimplaka.com', 
          salt: 'c0reqm_salt_2026', 
          password_hash: 'cbc67d498cf01fca3641d91b77e0b984092eba0b2f29168d7c490be071e33458', 
          role: 'user', 
          full_name: 'Kayıtlı Müşteri' 
        }
      ];
      localStorage.setItem('aether_users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('aether_orders')) {
      localStorage.setItem('aether_orders', JSON.stringify([]));
    }

    if (!localStorage.getItem('aether_nav_menu')) {
      const defaultNavMenu = [
        { id: 1, title_tr: '3D Deneyim', title_en: '3D Experience', url: '#heroSection', is_active: 1, is_blank: 0, badge: 'ping', order: 1 },
        { id: 2, title_tr: 'Ürünler', title_en: 'Products', url: '#productsSection', is_active: 1, is_blank: 0, badge: '', order: 2 },
        { id: 3, title_tr: 'Teknoloji', title_en: 'Technology', url: '#techSection', is_active: 1, is_blank: 0, badge: '', order: 3 },
        { id: 4, title_tr: 'Showroom & Harita', title_en: 'Showroom & Map', url: '#mapSection', is_active: 1, is_blank: 0, badge: '', order: 4 }
      ];
      localStorage.setItem('aether_nav_menu', JSON.stringify(defaultNavMenu));
    }
  },

  // 2. Settings (Anasayfa & Header Ayarları)
  getSettings() {
    this.init();
    const settings = JSON.parse(localStorage.getItem('aether_settings') || '{}');
    if (settings.ecommerce_enabled === undefined) settings.ecommerce_enabled = 1;
    if (settings.hero_title_enabled === undefined) settings.hero_title_enabled = 1;
    if (settings.hero_align === undefined) settings.hero_align = 'center';
    if (settings.hero_valign === undefined) settings.hero_valign = 'center';
    if (settings.hero_title === undefined) settings.hero_title = '3D Coreqm TITANIUM';
    if (settings.hero_subtitle === undefined) settings.hero_subtitle = 'Mikron hassasiyetinde 240 kare Apple WebP sekansı ve Grade 5 havacılık titanyumu.';
    if (settings.hero_tag === undefined) settings.hero_tag = 'OTONOM LÜKS SİSTEMLER';
    if (settings.hero_btn_text === undefined) settings.hero_btn_text = 'Koleksiyonu Keşfet';
    if (settings.hero_btn_url === undefined) settings.hero_btn_url = '#productsSection';
    if (settings.site_logo === undefined) settings.site_logo = 'frames/frame_0001.webp';
    if (settings.site_favicon === undefined) settings.site_favicon = 'favicon.ico';
    if (settings.site_apple_touch_icon === undefined) settings.site_apple_touch_icon = 'frames/frame_0001.webp';
    if (settings.seo_meta_title === undefined) settings.seo_meta_title = '3D Coreqm — 3D Video & WebP Frame Vitrini | Otonom Lüks Sistemler';
    if (settings.seo_meta_description === undefined) settings.seo_meta_description = 'Grade 5 havacılık titanyumu, 240 kare Apple WebP sekansı ve otonom lüks teknolojinin zirvesi. 360 derece etkileşimli yeni nesil vitrin.';
    if (settings.seo_keywords === undefined) settings.seo_keywords = 'aether one, 3d vitrin, 3d canvas, titanyum saat, webp frame, e-ticaret, lüks saat';
    if (settings.seo_author === undefined) settings.seo_author = 'Muhammed Ali Gürdal — BenimPlaka';
    if (settings.seo_canonical_url === undefined) settings.seo_canonical_url = 'https://benimplaka.com';
    if (settings.seo_og_title === undefined) settings.seo_og_title = '3D Coreqm — 3D Video & WebP Vitrini';
    if (settings.seo_og_description === undefined) settings.seo_og_description = '240 kare akıcı Apple WebP motoru ile geleceğin donanımını keşfedin.';
    if (settings.seo_og_image === undefined) settings.seo_og_image = 'https://benimplaka.com/frames/frame_0120.webp';
    if (settings.seo_robots === undefined) settings.seo_robots = 'index, follow';
    if (settings.seo_google_site_verification === undefined) settings.seo_google_site_verification = '';
    if (settings.seo_google_analytics_id === undefined) settings.seo_google_analytics_id = '';
    if (settings.seo_gtm_id === undefined) settings.seo_gtm_id = '';
    if (settings.seo_facebook_pixel_id === undefined) settings.seo_facebook_pixel_id = '';
    if (settings.seo_tiktok_pixel_id === undefined) settings.seo_tiktok_pixel_id = '';
    if (settings.seo_yandex_metrica_id === undefined) settings.seo_yandex_metrica_id = '';
    if (settings.seo_bing_verification === undefined) settings.seo_bing_verification = '';
    if (settings.seo_yandex_verification === undefined) settings.seo_yandex_verification = '';
    if (settings.seo_pinterest_verification === undefined) settings.seo_pinterest_verification = '';
    if (settings.seo_twitter_handle === undefined) settings.seo_twitter_handle = '@benimplaka';
    if (settings.seo_twitter_card === undefined) settings.seo_twitter_card = 'summary_large_image';
    if (settings.seo_schema_type === undefined) settings.seo_schema_type = 'Organization';
    if (settings.seo_custom_head_code === undefined) settings.seo_custom_head_code = '';
    if (settings.seo_custom_body_code === undefined) settings.seo_custom_body_code = '';
    if (settings.seo_robots_txt === undefined) settings.seo_robots_txt = 'User-agent: *\nAllow: /\nDisallow: /admin.html\nSitemap: https://benimplaka.com/sitemap.xml';
    return settings;
  },
  saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem('aether_settings', JSON.stringify(updated));
    return updated;
  },

  // 3. Products (Ürünler)
  getProducts() {
    this.init();
    return JSON.parse(localStorage.getItem('aether_products') || '[]');
  },
  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === parseInt(id) || p.slug === id);
  },
  saveProduct(prod) {
    const products = this.getProducts();
    if (prod.id) {
      const idx = products.findIndex(p => p.id === parseInt(prod.id));
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...prod };
      }
    } else {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const slug = prod.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      products.unshift({ ...prod, id: newId, slug, created_at: new Date().toISOString() });
    }
    localStorage.setItem('aether_products', JSON.stringify(products));
    return products;
  },
  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== parseInt(id));
    localStorage.setItem('aether_products', JSON.stringify(products));
    return products;
  },

  // 4. 3D Iframes & Frame Showcases
  getIframes() {
    this.init();
    return JSON.parse(localStorage.getItem('aether_iframes') || '[]');
  },
  getActiveIframe() {
    const list = this.getIframes();
    return list.find(i => i.is_active === 1) || list[0] || { frames_folder: 'frames', frames_count: 240 };
  },
  saveIframe(item) {
    const list = this.getIframes();
    if (item.is_active) list.forEach(i => i.is_active = 0);
    const newId = list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1;
    list.unshift({ ...item, id: newId, is_active: item.is_active ? 1 : 0, created_at: new Date().toISOString() });
    localStorage.setItem('aether_iframes', JSON.stringify(list));
    return list;
  },
  setActiveIframe(id) {
    const list = this.getIframes();
    list.forEach(i => i.is_active = (i.id === parseInt(id) ? 1 : 0));
    localStorage.setItem('aether_iframes', JSON.stringify(list));
    return list;
  },
  deleteIframe(id) {
    let list = this.getIframes();
    list = list.filter(i => i.id !== parseInt(id));
    if (list.length > 0 && !list.some(i => i.is_active === 1)) {
      list[0].is_active = 1;
    }
    localStorage.setItem('aether_iframes', JSON.stringify(list));
    return list;
  },

  // 4.5. Navigation Menus (Dinamik Menü Yönetimi)
  getNavMenu() {
    this.init();
    const menu = JSON.parse(localStorage.getItem('aether_nav_menu') || '[]');
    return menu.filter(m => m.url !== '#iframesGallerySection').sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  saveNavItem(item) {
    const menu = this.getNavMenu();
    if (item.id) {
      const idx = menu.findIndex(m => m.id === parseInt(item.id));
      if (idx !== -1) {
        menu[idx] = { ...menu[idx], ...item };
      }
    } else {
      const newId = menu.length > 0 ? Math.max(...menu.map(m => m.id)) + 1 : 1;
      const order = item.order !== undefined ? parseInt(item.order) : menu.length + 1;
      menu.push({ ...item, id: newId, order });
    }
    localStorage.setItem('aether_nav_menu', JSON.stringify(menu));
    return menu;
  },
  deleteNavItem(id) {
    let menu = this.getNavMenu();
    menu = menu.filter(m => m.id !== parseInt(id));
    localStorage.setItem('aether_nav_menu', JSON.stringify(menu));
    return menu;
  },
  resetNavMenu() {
    const defaultNavMenu = [
      { id: 1, title_tr: '3D Deneyim', title_en: '3D Experience', url: '#heroSection', is_active: 1, is_blank: 0, badge: 'ping', order: 1 },
      { id: 2, title_tr: '3D Canvas Vitrinleri', title_en: '3D Canvas Showcases', url: '#iframesGallerySection', is_active: 1, is_blank: 0, badge: '', order: 2 },
      { id: 3, title_tr: 'Ürünler', title_en: 'Products', url: '#productsSection', is_active: 1, is_blank: 0, badge: '', order: 3 },
      { id: 4, title_tr: 'Teknoloji', title_en: 'Technology', url: '#techSection', is_active: 1, is_blank: 0, badge: '', order: 4 },
      { id: 5, title_tr: 'Showroom & Harita', title_en: 'Showroom & Map', url: '#mapSection', is_active: 1, is_blank: 0, badge: '', order: 5 }
    ];
    localStorage.setItem('aether_nav_menu', JSON.stringify(defaultNavMenu));
    return defaultNavMenu;
  },

  // 5. INDEXEDDB KARE DEPOSU (Yüklenen Özel Videolar İçin)
  async saveCustomFramesToDB(customKey, framesArray) {
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ id: customKey, frames: framesArray, count: framesArray.length });
      tx.oncomplete = () => resolve(true);
      tx.onerror = (e) => reject(e);
    });
  },

  async getCustomFramesFromDB(customKey) {
    try {
      const db = await openIndexedDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(customKey);
        req.onsuccess = () => resolve(req.result ? req.result.frames : null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  },

  // 6. OTOMATİK VİDEODAN 240 WEBP KARE ÇÖZÜMLEME MOTORU
  async extractFramesFromVideoFile(file, targetFrames = 240, progressCallback) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const url = URL.createObjectURL(file);
      video.src = url;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';

      video.onloadedmetadata = async () => {
        const duration = video.duration || 5;
        const totalFrames = Math.max(10, Math.min(targetFrames, 240));
        const interval = duration / totalFrames;

        const canvas = document.createElement('canvas');
        // Kaliteli 1080p WebP çözünürlüğü
        const width = 1280;
        const height = Math.round(1280 * (video.videoHeight / video.videoWidth)) || 720;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        const frames = [];

        for (let i = 0; i < totalFrames; i++) {
          video.currentTime = i * interval;
          await new Promise(r => {
            video.onseeked = () => {
              ctx.drawImage(video, 0, 0, width, height);
              const webpData = canvas.toDataURL('image/webp', 0.82);
              frames.push(webpData);
              if (progressCallback) {
                progressCallback(Math.round(((i + 1) / totalFrames) * 100), i + 1, totalFrames);
              }
              r();
            };
          });
        }

        URL.revokeObjectURL(url);
        resolve({ frames, count: frames.length });
      };

      video.onerror = (err) => reject(err);
    });
  },

  // 7. Orders (Siparişler)
  getOrders(userId = null) {
    this.init();
    const orders = JSON.parse(localStorage.getItem('aether_orders') || '[]');
    if (userId) {
      return orders.filter(o => o.user_id === userId);
    }
    return orders;
  },
  createOrder(orderData) {
    const orders = this.getOrders();
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1001;
    const newOrder = {
      ...orderData,
      id: newId,
      status: 'Hazırlanıyor',
      created_at: new Date().toLocaleDateString('tr-TR')
    };
    orders.unshift(newOrder);
    localStorage.setItem('aether_orders', JSON.stringify(orders));
    return newOrder;
  },
  updateOrderStatus(id, status) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === parseInt(id));
    if (order) {
      order.status = status;
      localStorage.setItem('aether_orders', JSON.stringify(orders));
    }
    return orders;
  },

    // ==========================================
  // KRİPTOGRAFİK GÜVENLİK & ŞİFRE HASHLEME MOTORU (SHA-256)
  // ==========================================
  sha256(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const lengthProperty = 'length';
    let i, j, result = '';
    const words = [];
    let hash = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    const k = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    let str = unescape(encodeURIComponent(ascii));
    let strLength = str[lengthProperty];
    let bitLength = strLength * 8;
    for (i = 0; i < strLength; i++) {
      words[i >> 2] |= (str.charCodeAt(i) & 0xff) << ((3 - (i % 4)) * 8);
    }
    words[strLength >> 2] |= 0x80 << ((3 - (strLength % 4)) * 8);
    words[(((strLength + 8) >> 6) << 4) + 15] = bitLength;

    for (i = 0; i < words.length; i += 16) {
      const w = [];
      for (j = 0; j < 16; j++) w[j] = words[i + j] || 0;
      for (j = 16; j < 64; j++) {
        const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
      }
      let a = hash[0], b = hash[1], c = hash[2], d = hash[3];
      let e = hash[4], f = hash[5], g = hash[6], h = hash[7];
      for (j = 0; j < 64; j++) {
        const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
        const ch = (e & f) ^ ((~e) & g);
        const temp1 = (h + S1 + ch + k[j] + w[j]) | 0;
        const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const temp2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + temp1) | 0;
        d = c; c = b; b = a; a = (temp1 + temp2) | 0;
      }
      hash[0] = (hash[0] + a) | 0;
      hash[1] = (hash[1] + b) | 0;
      hash[2] = (hash[2] + c) | 0;
      hash[3] = (hash[3] + d) | 0;
      hash[4] = (hash[4] + e) | 0;
      hash[5] = (hash[5] + f) | 0;
      hash[6] = (hash[6] + g) | 0;
      hash[7] = (hash[7] + h) | 0;
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j >= 0; j--) {
        const b = (hash[i] >> (8 * j)) & 255;
        result += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
    return result;
  },

  hashPassword(password, salt = 'c0reqm_salt_2026') {
    return this.sha256((salt || 'c0reqm_salt_2026') + ':' + password);
  },

  generateSalt(length = 16) {
    let result = '';
    const hex = '0123456789abcdef';
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint8Array(length);
      window.crypto.getRandomValues(arr);
      for (let i = 0; i < length; i++) result += hex[arr[i] % 16];
    } else {
      for (let i = 0; i < length; i++) result += hex[Math.floor(Math.random() * 16)];
    }
    return result;
  },

  generateSecureToken(length = 32) {
    let result = 'sec_';
    const hex = '0123456789abcdef';
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint8Array(length);
      window.crypto.getRandomValues(arr);
      for (let i = 0; i < length; i++) result += hex[arr[i] % 16];
    } else {
      for (let i = 0; i < length; i++) result += hex[Math.floor(Math.random() * 16)];
    }
    return result;
  },

  // 8. Auth & Users (Güvenli Kriptografik Kullanıcı Katmanı)
  getUsers() {
    this.init();
    return JSON.parse(localStorage.getItem('aether_users') || '[]');
  },

  sanitize(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[<>&"']/g, (m) => {
      switch (m) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        default: return m;
      }
    });
  },

  login(emailOrUsername, password) {
    const users = this.getUsers();
    const cleanIdent = (emailOrUsername || '').trim();
    const user = users.find(u => 
      u.email.toLowerCase() === cleanIdent.toLowerCase() || 
      u.username.toLowerCase() === cleanIdent.toLowerCase()
    );

    if (!user) {
      return { success: false, error: 'Hatalı e-posta veya şifre.' };
    }

    const salt = user.salt || 'c0reqm_salt_2026';
    const expectedHash = this.hashPassword(password, salt);
    const storedHash = user.password_hash || user.password;

    // Kriptografik Doğrulama (veya eski düz metin kayıttan güvenli hash'e otomatik terfi)
    const isHashMatch = storedHash === expectedHash;
    const isPlainMatch = storedHash === password;

    if (isHashMatch || isPlainMatch) {
      // Eğer eski şifre hashlenmemişse hemen kriptografik hash'e terfi et
      if (isPlainMatch && !isHashMatch) {
        user.salt = this.generateSalt(16);
        user.password_hash = this.hashPassword(password, user.salt);
        delete user.password;
        localStorage.setItem('aether_users', JSON.stringify(users));
      }

      // Kriptografik Rastgele Oturum Belirteci (Session Token)
      const sessionToken = this.generateSecureToken(32);
      const tokenMeta = {
        token: sessionToken,
        user_id: user.id,
        role: user.role,
        created_at: Date.now(),
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 Saatlik Geçerlilik
      };

      // Hassas alanları oturumdan ayıkla (Asla şifre / salt client nesnesinde taşınmaz)
      const { password: _p, password_hash: _ph, salt: _s, ...safeUser } = user;

      localStorage.setItem('aether_user', JSON.stringify(safeUser));
      localStorage.setItem('aether_token', sessionToken);
      localStorage.setItem('aether_token_meta', JSON.stringify(tokenMeta));

      return { success: true, user: safeUser, token: sessionToken };
    }

    return { success: false, error: 'Hatalı e-posta veya şifre.' };
  },

  validateSession(token, userId) {
    if (!token || !userId) return false;
    try {
      const meta = JSON.parse(localStorage.getItem('aether_token_meta') || '{}');
      if (meta.token !== token || meta.user_id !== parseInt(userId)) return false;
      if (Date.now() > meta.expires_at) return false;
      return true;
    } catch (e) {
      return false;
    }
  },

  register(userData) {
    const users = this.getUsers();
    const email = (userData.email || '').trim().toLowerCase();
    const username = (userData.username || '').trim().toLowerCase();

    if (!userData.password || userData.password.length < 6) {
      return { success: false, error: 'Şifreniz en az 6 karakter olmalıdır.' };
    }

    if (users.some(u => u.email.toLowerCase() === email || u.username.toLowerCase() === username)) {
      return { success: false, error: 'Bu kullanıcı adı veya e-posta zaten kullanımda.' };
    }

    const salt = this.generateSalt(16);
    const passwordHash = this.hashPassword(userData.password, salt);
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
      id: newId,
      username: this.sanitize(username),
      email: this.sanitize(email),
      salt: salt,
      password_hash: passwordHash,
      full_name: this.sanitize(userData.full_name || ''),
      role: 'user',
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('aether_users', JSON.stringify(users));

    // Hassas alanları temizleyerek oturum aç
    const { password: _p, password_hash: _ph, salt: _s, ...safeUser } = newUser;
    const sessionToken = this.generateSecureToken(32);
    const tokenMeta = {
      token: sessionToken,
      user_id: newId,
      role: 'user',
      created_at: Date.now(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000)
    };

    localStorage.setItem('aether_user', JSON.stringify(safeUser));
    localStorage.setItem('aether_token', sessionToken);
    localStorage.setItem('aether_token_meta', JSON.stringify(tokenMeta));

    return { success: true, user: safeUser, token: sessionToken };
  },

  getUser() {
    const u = localStorage.getItem('aether_user');
    if (!u) return null;
    try {
      const user = JSON.parse(u);
      const { password: _p, password_hash: _ph, salt: _s, ...safeUser } = user;
      return safeUser;
    } catch (e) {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem('aether_token') || null;
  },

  logout() {
    localStorage.removeItem('aether_user');
    localStorage.removeItem('aether_token');
    localStorage.removeItem('aether_token_meta');
  },

  changePassword(userId, oldPass, newPass) {
    const users = this.getUsers();
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) {
      return { success: false, error: 'Kullanıcı bulunamadı.' };
    }

    const salt = user.salt || 'c0reqm_salt_2026';
    const expectedOldHash = this.hashPassword(oldPass, salt);
    const storedHash = user.password_hash || user.password;
    if (storedHash !== expectedOldHash && storedHash !== oldPass) {
      return { success: false, error: 'Mevcut şifreniz hatalı.' };
    }

    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'Yeni şifreniz en az 6 karakter olmalıdır.' };
    }

    // Yeni benzersiz salt üret ve yeni şifreyi hashle
    const newSalt = this.generateSalt(16);
    user.salt = newSalt;
    user.password_hash = this.hashPassword(newPass, newSalt);
    delete user.password;

    localStorage.setItem('aether_users', JSON.stringify(users));

    const { password: _p, password_hash: _ph, salt: _s, ...safeUser } = user;
    localStorage.setItem('aether_user', JSON.stringify(safeUser));

    return { success: true, message: 'Şifreniz başarıyla güncellendi.' };
  },

  // 9. Cart (Sepet)
  getCart() {
    return JSON.parse(localStorage.getItem('aether_cart') || '[]');
  },
  addToCart(product, qty = 1) {
    const cart = this.getCart();
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image_url: product.image_url,
        qty
      });
    }
    localStorage.setItem('aether_cart', JSON.stringify(cart));
    return cart;
  },
  removeFromCart(index) {
    const cart = this.getCart();
    cart.splice(index, 1);
    localStorage.setItem('aether_cart', JSON.stringify(cart));
    return cart;
  },
  clearCart() {
    localStorage.removeItem('aether_cart');
    return [];
  },

  // 10. Auth & 2FA Settings
  getAuthSettings() {
    this.init();
    return JSON.parse(localStorage.getItem('aether_auth_settings') || '{}');
  },
  saveAuthSettings(data) {
    const current = this.getAuthSettings();
    const updated = { ...current, ...data };
    localStorage.setItem('aether_auth_settings', JSON.stringify(updated));
    return updated;
  },

  // 11. Mail & SMTP Settings
  getMailSettings() {
    this.init();
    return JSON.parse(localStorage.getItem('aether_mail_settings') || '{}');
  },
  saveMailSettings(data) {
    const current = this.getMailSettings();
    const updated = { ...current, ...data };
    localStorage.setItem('aether_mail_settings', JSON.stringify(updated));
    return updated;
  },

  // 12. Multi-Gateway Payment Settings
  getPaymentSettings() {
    this.init();
    return JSON.parse(localStorage.getItem('aether_payment_settings') || '{}');
  },
  savePaymentSettings(data) {
    const current = this.getPaymentSettings();
    const updated = { ...current, ...data };
    localStorage.setItem('aether_payment_settings', JSON.stringify(updated));
    return updated;
  },

  // 13. SEO & Analitik Yönetimi
  getSeo() {
    this.init();
    const s = this.getSettings();
    return {
      meta_title: s.seo_meta_title || '3D Coreqm — 3D Video & WebP Vitrini',
      meta_description: s.seo_meta_description || 'Grade 5 havacılık titanyumu, 240 kare Apple WebP sekansı ve otonom lüks teknoloji.',
      keywords: s.seo_keywords || '3d coreqm, 3d canvas, 3d vitrin, titanyum saat, webp frame',
      site_name: s.site_title || '3D Coreqm',
      author: s.seo_author || 'Muhammed Ali Gürdal — BenimPlaka',
      logo_url: s.site_logo || 'frames/frame_0001.webp',
      favicon_url: s.site_favicon || '/favicon.webp',
      apple_touch_icon: s.site_apple_touch_icon || '/apple-touch-icon.png',

      og_title: s.seo_og_title || '3D Coreqm — 3D Video & WebP Vitrini',
      og_description: s.seo_og_description || '240 kare akıcı Apple WebP motoru ile geleceğin donanımını keşfedin.',
      og_image: s.seo_og_image || 'https://benimplaka.com/frames/frame_0120.webp',
      twitter_handle: s.seo_twitter_handle || '@3DCoreqm',

      ga4_id: s.seo_ga4_id || '',
      gtm_id: s.seo_gtm_id || '',
      fb_pixel_id: s.seo_fb_pixel_id || '',
      tiktok_pixel_id: s.seo_tiktok_pixel_id || '',
      yandex_metrica_id: s.seo_yandex_metrica_id || '',

      google_site_verification: s.seo_google_site_verification || '',
      bing_verification: s.seo_bing_verification || '',
      yandex_verification: s.seo_yandex_verification || '',

      canonical_url: s.seo_canonical_url || 'https://benimplaka.com',
      robots_meta: s.seo_robots_meta || 'index, follow',
      robots_txt: s.seo_robots_txt || 'User-agent: *\nAllow: /\nSitemap: https://benimplaka.com/sitemap.xml',

      custom_head_code: s.seo_custom_head_code || '',
      custom_body_code: s.seo_custom_body_code || ''
    };
  },

  saveSeo(data) {
    const update = {
      seo_meta_title: data.meta_title,
      seo_meta_description: data.meta_description,
      seo_keywords: data.keywords,
      site_title: data.site_name,
      seo_author: data.author,
      site_logo: data.logo_url,
      site_favicon: data.favicon_url,
      site_apple_touch_icon: data.apple_touch_icon,

      seo_og_title: data.og_title,
      seo_og_description: data.og_description,
      seo_og_image: data.og_image,
      seo_twitter_handle: data.twitter_handle,

      seo_ga4_id: data.ga4_id,
      seo_gtm_id: data.gtm_id,
      seo_fb_pixel_id: data.fb_pixel_id,
      seo_tiktok_pixel_id: data.tiktok_pixel_id,
      seo_yandex_metrica_id: data.yandex_metrica_id,

      seo_google_site_verification: data.google_site_verification,
      seo_bing_verification: data.bing_verification,
      seo_yandex_verification: data.yandex_verification,

      seo_canonical_url: data.canonical_url,
      seo_robots_meta: data.robots_meta,
      seo_robots_txt: data.robots_txt,

      seo_custom_head_code: data.custom_head_code,
      seo_custom_body_code: data.custom_body_code
    };
    const saved = this.saveSettings(update);
    if (typeof this.applySeoFavicon === 'function') {
      this.applySeoFavicon();
    }
    return saved;
  },

  // 14. Nav Items Alias
  getNavItems() {
    return this.getNavMenu();
  },

  // Dinamik Favicon Entegrasyonu
  applySeoFavicon() {
    try {
      const seo = this.getSeo ? this.getSeo() : (this.getSettings ? this.getSettings() : null);
      if (seo && seo.favicon_url) {
        let link = document.querySelector("link[rel*='icon']");
        if (link) {
          link.href = seo.favicon_url;
        }
      }
    } catch(e) {}
  }
};

// Başlat
Store.init();
if (typeof window !== 'undefined') {
  window.Store = Store;
  Store.applySeoFavicon();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Store;
}
