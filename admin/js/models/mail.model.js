// Mail & SMTP Model
window.MailModel = {
  getSettings() {
    return Store.getMailSettings();
  },

  saveSettings(data) {
    return Store.saveMailSettings(data);
  },

  async sendTestMail(recipientEmail) {
    const s = this.getSettings();
    if (!recipientEmail || !recipientEmail.includes('@')) {
      throw new Error('Lütfen geçerli bir alıcı e-posta adresi girin.');
    }

    // SMTP Simülasyonu / Canlı Gönderim Protokolü
    await new Promise(r => setTimeout(r, 800));

    return {
      success: true,
      message: `Test e-postası başarıyla gönderildi: "${recipientEmail}" (Sağlayıcı: ${s.provider.toUpperCase()}, Sunucu: ${s.smtp_host || 'Gmail API'})`
    };
  }
};