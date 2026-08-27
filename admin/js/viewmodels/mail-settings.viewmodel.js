// Mail & SMTP ViewModel
window.MailSettingsViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('mail-settings');
    AdminHeader.init({
      title: 'E-Posta & SMTP Ayarları',
      subtitle: 'Sipariş bildirimleri ve güvenlik kodları için SMTP ve Gmail API entegrasyonu.'
    });

    this.loadData();
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('mailForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveData();
    });

    document.getElementById('mail_provider')?.addEventListener('change', (e) => {
      this.toggleProviderPanels(e.target.value);
    });

    document.getElementById('btnSendTestMail')?.addEventListener('click', async () => {
      await this.sendTestEmail();
    });
  },

  toggleProviderPanels(provider) {
    const smtpPanel = document.getElementById('smtpFieldsPanel');
    const gmailPanel = document.getElementById('gmailFieldsPanel');
    if (provider === 'gmail') {
      if (smtpPanel) smtpPanel.classList.add('hidden');
      if (gmailPanel) gmailPanel.classList.remove('hidden');
    } else {
      if (smtpPanel) smtpPanel.classList.remove('hidden');
      if (gmailPanel) gmailPanel.classList.add('hidden');
    }
  },

  loadData() {
    const s = MailModel.getSettings();
    document.getElementById('mail_provider').value = s.provider || 'smtp';
    document.getElementById('smtp_host').value = s.smtp_host || '';
    document.getElementById('smtp_port').value = s.smtp_port || 587;
    document.getElementById('smtp_encryption').value = s.smtp_encryption || 'tls';
    document.getElementById('smtp_user').value = s.smtp_user || '';
    document.getElementById('smtp_pass').value = s.smtp_pass || '';

    document.getElementById('from_email').value = s.from_email || '';
    document.getElementById('from_name').value = s.from_name || '';

    document.getElementById('gmail_client_id').value = s.gmail_client_id || '';
    document.getElementById('gmail_app_password').value = s.gmail_app_password || '';

    this.toggleProviderPanels(s.provider || 'smtp');
  },

  saveData() {
    const data = {
      provider: document.getElementById('mail_provider').value,
      smtp_host: document.getElementById('smtp_host').value,
      smtp_port: parseInt(document.getElementById('smtp_port').value || 587),
      smtp_encryption: document.getElementById('smtp_encryption').value,
      smtp_user: document.getElementById('smtp_user').value,
      smtp_pass: document.getElementById('smtp_pass').value,

      from_email: document.getElementById('from_email').value,
      from_name: document.getElementById('from_name').value,

      gmail_client_id: document.getElementById('gmail_client_id').value,
      gmail_app_password: document.getElementById('gmail_app_password').value
    };

    MailModel.saveSettings(data);
    alert('E-Posta ve sunucu ayarları başarıyla kaydedildi!');
  },

  async sendTestEmail() {
    const recipient = document.getElementById('test_recipient_email')?.value;
    const statusEl = document.getElementById('testMailStatus');

    if (!recipient) {
      alert('Lütfen test edilecek bir alıcı e-posta adresi yazın.');
      return;
    }

    if (statusEl) {
      statusEl.textContent = '⏳ Test e-postası gönderiliyor...';
      statusEl.className = 'text-xs font-mono text-amber-500 block';
    }

    try {
      const res = await MailModel.sendTestMail(recipient);
      if (statusEl) {
        statusEl.textContent = '✅ ' + res.message;
        statusEl.className = 'text-xs font-mono text-emerald-500 block';
      }
      alert(res.message);
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = '❌ Hata: ' + err.message;
        statusEl.className = 'text-xs font-mono text-rose-500 block';
      }
      alert('Gönderim hatası: ' + err.message);
    }
  }
};