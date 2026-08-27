// Auth & 2FA ViewModel
window.AuthSettingsViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('auth-settings');
    AdminHeader.init({
      title: 'Giriş Yöntemleri & 2FA',
      subtitle: 'Google/Microsoft OAuth sosyal giriş entegrasyonu ve iki aşamalı doğrulama.'
    });

    this.loadData();
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('authSettingsForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveData();
    });

    document.getElementById('two_factor_enabled')?.addEventListener('change', (e) => {
      const panel = document.getElementById('twoFactorDetailsPanel');
      if (panel) {
        if (e.target.checked) panel.classList.remove('hidden');
        else panel.classList.add('hidden');
      }
    });
  },

  loadData() {
    const s = AuthModel.getSettings();

    // Google
    document.getElementById('google_login_enabled').checked = !!parseInt(s.google_login_enabled);
    document.getElementById('google_client_id').value = s.google_client_id || '';
    document.getElementById('google_client_secret').value = s.google_client_secret || '';

    // Microsoft
    document.getElementById('microsoft_login_enabled').checked = !!parseInt(s.microsoft_login_enabled);
    document.getElementById('microsoft_client_id').value = s.microsoft_client_id || '';
    document.getElementById('microsoft_tenant_id').value = s.microsoft_tenant_id || 'common';
    document.getElementById('microsoft_client_secret').value = s.microsoft_client_secret || '';

    // 2FA
    const is2fa = !!parseInt(s.two_factor_enabled);
    document.getElementById('two_factor_enabled').checked = is2fa;
    document.getElementById('two_factor_method').value = s.two_factor_method || 'totp';
    document.getElementById('two_factor_secret').value = s.two_factor_secret || this.generateRandomBase32(16);

    const panel = document.getElementById('twoFactorDetailsPanel');
    if (panel) {
      if (is2fa) panel.classList.remove('hidden');
      else panel.classList.add('hidden');
    }
  },

  saveData() {
    const data = {
      google_login_enabled: document.getElementById('google_login_enabled').checked ? 1 : 0,
      google_client_id: document.getElementById('google_client_id').value,
      google_client_secret: document.getElementById('google_client_secret').value,

      microsoft_login_enabled: document.getElementById('microsoft_login_enabled').checked ? 1 : 0,
      microsoft_client_id: document.getElementById('microsoft_client_id').value,
      microsoft_tenant_id: document.getElementById('microsoft_tenant_id').value,
      microsoft_client_secret: document.getElementById('microsoft_client_secret').value,

      two_factor_enabled: document.getElementById('two_factor_enabled').checked ? 1 : 0,
      two_factor_method: document.getElementById('two_factor_method').value,
      two_factor_secret: document.getElementById('two_factor_secret').value
    };

    AuthModel.saveSettings(data);
    alert('Giriş yöntemleri ve 2FA güvenlik ayarları kaydedildi!');
  },

  generateRandomBase32(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let result = '';
    const array = new Uint8Array(length);
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length];
      }
    } else {
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    return result;
  }
};