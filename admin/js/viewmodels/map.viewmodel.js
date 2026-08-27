// Map & Showroom ViewModel
window.MapViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('map');
    AdminHeader.init({
      title: 'Harita & Showroom',
      subtitle: 'Mağaza konumu, iletişim bilgileri ve canlı Google Harita entegrasyonu.'
    });

    this.bindEvents();
    this.loadData();
  },

  bindEvents() {
    document.getElementById('mapForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveData();
    });

    document.getElementById('map_iframe')?.addEventListener('input', (e) => {
      this.renderPreview(e.target.value);
    });
  },

  loadData() {
    const s = SettingsModel.getMapSettings();
    document.getElementById('map_title').value = s.map_title || '';
    document.getElementById('map_address').value = s.map_address || '';
    document.getElementById('map_phone').value = s.map_phone || '';
    document.getElementById('map_iframe').value = s.map_iframe || '';

    this.renderPreview(s.map_iframe);
  },

  renderPreview(val) {
    const prev = document.getElementById('adminMapPreview');
    if (!prev) return;

    if (val && val.includes('<iframe')) {
      prev.innerHTML = val;
      const ifr = prev.querySelector ? prev.querySelector('iframe') : null;
      if (ifr && ifr.style) {
        ifr.style.width = '100%';
        ifr.style.height = '100%';
        ifr.style.minHeight = '300px';
        ifr.style.borderRadius = '12px';
        ifr.style.border = 'none';
      }
    } else {
      prev.innerHTML = '<span class="text-xs font-mono text-neutral-400">Harita embed kodu girildiğinde burada canlı görünür</span>';
    }
  },

  saveData() {
    const data = {
      map_title: document.getElementById('map_title').value,
      map_address: document.getElementById('map_address').value,
      map_phone: document.getElementById('map_phone').value,
      map_iframe: document.getElementById('map_iframe').value
    };

    SettingsModel.saveMapSettings(data);
    alert('Harita ve lokasyon bilgileri başarıyla güncellendi!');
  }
};