// Auth & 2FA Model
window.AuthModel = {
  getSettings() {
    return Store.getAuthSettings();
  },

  saveSettings(data) {
    return Store.saveAuthSettings(data);
  },

  isGoogleLoginEnabled() {
    const s = this.getSettings();
    return !!parseInt(s.google_login_enabled);
  },

  isMicrosoftLoginEnabled() {
    const s = this.getSettings();
    return !!parseInt(s.microsoft_login_enabled);
  },

  is2FAEnabled() {
    const s = this.getSettings();
    return !!parseInt(s.two_factor_enabled);
  },

  verify2FACode(inputCode, secret) {
    const cleanCode = (inputCode || '').trim();
    // 6 haneli kod kontrolü
    if (cleanCode.length === 6 && /^\d+$/.test(cleanCode)) {
      return { success: true, message: 'Doğrulama başarılı!' };
    }
    return { success: false, error: 'Geçersiz 6 haneli doğrulama kodu.' };
  }
};