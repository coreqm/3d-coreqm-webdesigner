// Payments ViewModel
window.PaymentsViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('payments');
    AdminHeader.init({
      title: 'Ödeme Sistemleri',
      subtitle: 'Stripe, PayPal, İyzico, PayTR, Havale/EFT ve diğer ödeme ağ geçitlerini yönetin.'
    });

    this.loadData();
    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('paymentsForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveData();
    });
  },

  loadData() {
    const s = PaymentModel.getSettings();

    // İyzico
    if (s.iyzico) {
      document.getElementById('iyzico_enabled').checked = !!s.iyzico.enabled;
      document.getElementById('iyzico_mode').value = s.iyzico.mode || 'sandbox';
      document.getElementById('iyzico_api_key').value = s.iyzico.api_key || '';
      document.getElementById('iyzico_secret_key').value = s.iyzico.secret_key || '';
      document.getElementById('iyzico_base_url').value = s.iyzico.base_url || 'https://sandbox-api.iyzipay.com';
    }

    // Stripe
    if (s.stripe) {
      document.getElementById('stripe_enabled').checked = !!s.stripe.enabled;
      document.getElementById('stripe_mode').value = s.stripe.mode || 'test';
      document.getElementById('stripe_pub_key').value = s.stripe.publishable_key || '';
      document.getElementById('stripe_sec_key').value = s.stripe.secret_key || '';
    }

    // PayPal
    if (s.paypal) {
      document.getElementById('paypal_enabled').checked = !!s.paypal.enabled;
      document.getElementById('paypal_mode').value = s.paypal.mode || 'sandbox';
      document.getElementById('paypal_client_id').value = s.paypal.client_id || '';
      document.getElementById('paypal_secret_key').value = s.paypal.secret_key || '';
    }

    // PayTR
    if (s.paytr) {
      document.getElementById('paytr_enabled').checked = !!s.paytr.enabled;
      document.getElementById('paytr_merchant_id').value = s.paytr.merchant_id || '';
      document.getElementById('paytr_merchant_key').value = s.paytr.merchant_key || '';
      document.getElementById('paytr_merchant_salt').value = s.paytr.merchant_salt || '';
    }

    // Bank Transfer
    if (s.bank_transfer) {
      document.getElementById('bank_enabled').checked = !!s.bank_transfer.enabled;
      document.getElementById('bank_name').value = s.bank_transfer.bank_name || '';
      document.getElementById('bank_holder').value = s.bank_transfer.account_holder || '';
      document.getElementById('bank_iban').value = s.bank_transfer.iban || '';
      document.getElementById('bank_instructions').value = s.bank_transfer.instructions || '';
    }

    // COD
    if (s.cash_on_delivery) {
      document.getElementById('cod_enabled').checked = !!s.cash_on_delivery.enabled;
      document.getElementById('cod_extra_fee').value = s.cash_on_delivery.extra_fee !== undefined ? s.cash_on_delivery.extra_fee : 5.00;
    }

    // Crypto
    if (s.crypto) {
      document.getElementById('crypto_enabled').checked = !!s.crypto.enabled;
      document.getElementById('crypto_network').value = s.crypto.network || 'TRC20 (USDT)';
      document.getElementById('crypto_wallet').value = s.crypto.wallet_address || '';
    }
  },

  saveData() {
    const data = {
      iyzico: {
        enabled: document.getElementById('iyzico_enabled').checked ? 1 : 0,
        mode: document.getElementById('iyzico_mode').value,
        api_key: document.getElementById('iyzico_api_key').value,
        secret_key: document.getElementById('iyzico_secret_key').value,
        base_url: document.getElementById('iyzico_base_url').value
      },
      stripe: {
        enabled: document.getElementById('stripe_enabled').checked ? 1 : 0,
        mode: document.getElementById('stripe_mode').value,
        publishable_key: document.getElementById('stripe_pub_key').value,
        secret_key: document.getElementById('stripe_sec_key').value
      },
      paypal: {
        enabled: document.getElementById('paypal_enabled').checked ? 1 : 0,
        mode: document.getElementById('paypal_mode').value,
        client_id: document.getElementById('paypal_client_id').value,
        secret_key: document.getElementById('paypal_secret_key').value
      },
      paytr: {
        enabled: document.getElementById('paytr_enabled').checked ? 1 : 0,
        merchant_id: document.getElementById('paytr_merchant_id').value,
        merchant_key: document.getElementById('paytr_merchant_key').value,
        merchant_salt: document.getElementById('paytr_merchant_salt').value
      },
      bank_transfer: {
        enabled: document.getElementById('bank_enabled').checked ? 1 : 0,
        bank_name: document.getElementById('bank_name').value,
        account_holder: document.getElementById('bank_holder').value,
        iban: document.getElementById('bank_iban').value,
        instructions: document.getElementById('bank_instructions').value
      },
      cash_on_delivery: {
        enabled: document.getElementById('cod_enabled').checked ? 1 : 0,
        extra_fee: parseFloat(document.getElementById('cod_extra_fee').value || 0)
      },
      crypto: {
        enabled: document.getElementById('crypto_enabled').checked ? 1 : 0,
        network: document.getElementById('crypto_network').value,
        wallet_address: document.getElementById('crypto_wallet').value
      }
    };

    PaymentModel.saveSettings(data);
    alert('Ödeme sistemleri yapılandırması başarıyla kaydedildi!');
  }
};