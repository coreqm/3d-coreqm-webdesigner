// Header & Hero Design ViewModel
window.HeaderDesignViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('header-design');
    AdminHeader.init({
      title: '3D Video & Hero Ayarları',
      subtitle: 'Üst navigasyon yerleşimi, hero katmanı ve 3D canvas başlıkları.'
    });

    this.loadData();
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('settingsForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveData();
    });
  },

  loadData() {
    const s = SettingsModel.getSettings();
    document.getElementById('set_header_mode').value = s.header_mode || 'fixed';
    document.getElementById('set_header_flush').value = s.header_flush !== undefined ? s.header_flush : '1';
    document.getElementById('set_ecommerce_enabled').value = s.ecommerce_enabled !== undefined ? s.ecommerce_enabled : '1';
    document.getElementById('set_show_3d_hero').value = s.show_3d_hero !== undefined ? s.show_3d_hero : '1';
    document.getElementById('set_site_title').value = s.site_title || '3D Coreqm';

    document.getElementById('set_hero_title_enabled').value = s.hero_title_enabled !== undefined ? s.hero_title_enabled : '1';
    document.getElementById('set_hero_align').value = s.hero_align || 'left';
    document.getElementById('set_hero_valign').value = s.hero_valign || 'center';
    document.getElementById('set_hero_tag').value = s.hero_tag || 'HIGGSFIELD ENGINE';
    document.getElementById('set_hero_title').value = s.hero_title || 'GELECEĞİN VİTRİNİ.';
    document.getElementById('set_hero_subtitle').value = s.hero_subtitle || 'Saf WebP kare dizilimleri ve akıcı 3D hareket deneyimi.';
    document.getElementById('set_hero_btn_text').value = s.hero_btn_text || 'Hemen Keşfet';
    document.getElementById('set_hero_btn_url').value = s.hero_btn_url || '#katalog';
  },

  saveData() {
    const data = {
      header_mode: document.getElementById('set_header_mode').value,
      header_flush: parseInt(document.getElementById('set_header_flush').value),
      ecommerce_enabled: parseInt(document.getElementById('set_ecommerce_enabled').value),
      show_3d_hero: parseInt(document.getElementById('set_show_3d_hero').value),
      site_title: document.getElementById('set_site_title').value,

      hero_title_enabled: parseInt(document.getElementById('set_hero_title_enabled').value),
      hero_align: document.getElementById('set_hero_align').value,
      hero_valign: document.getElementById('set_hero_valign').value,
      hero_tag: document.getElementById('set_hero_tag').value,
      hero_title: document.getElementById('set_hero_title').value,
      hero_subtitle: document.getElementById('set_hero_subtitle').value,
      hero_btn_text: document.getElementById('set_hero_btn_text').value,
      hero_btn_url: document.getElementById('set_hero_btn_url').value
    };

    SettingsModel.saveSettings(data);
    alert('3D Video ve Hero ayarları kaydedildi!');
  }
};