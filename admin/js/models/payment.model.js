// Multi-Gateway Payment Model
window.PaymentModel = {
  getSettings() {
    return Store.getPaymentSettings();
  },

  saveSettings(data) {
    return Store.savePaymentSettings(data);
  },

  getActiveGateways() {
    const s = this.getSettings();
    const active = [];

    if (s.iyzico && s.iyzico.enabled) {
      active.push({ id: 'iyzico', name: 'İyzico (Kredi / Banka Kartı - 3D Secure)', icon: 'credit-card', mode: s.iyzico.mode });
    }
    if (s.stripe && s.stripe.enabled) {
      active.push({ id: 'stripe', name: 'Stripe (Visa / Mastercard / Amex)', icon: 'credit-card', mode: s.stripe.mode });
    }
    if (s.paypal && s.paypal.enabled) {
      active.push({ id: 'paypal', name: 'PayPal (Global Ödeme)', icon: 'wallet', mode: s.paypal.mode });
    }
    if (s.paytr && s.paytr.enabled) {
      active.push({ id: 'paytr', name: 'PayTR Sanal POS', icon: 'shield-check' });
    }
    if (s.bank_transfer && s.bank_transfer.enabled) {
      active.push({
        id: 'bank_transfer',
        name: `Banka Havalesi / EFT (${s.bank_transfer.bank_name || 'Banka'})`,
        icon: 'building',
        details: s.bank_transfer
      });
    }
    if (s.cash_on_delivery && s.cash_on_delivery.enabled) {
      active.push({
        id: 'cash_on_delivery',
        name: `Kapıda Ödeme (+ $${s.cash_on_delivery.extra_fee || 0})`,
        icon: 'truck'
      });
    }
    if (s.crypto && s.crypto.enabled) {
      active.push({
        id: 'crypto',
        name: `Kripto Ödeme (${s.crypto.network || 'USDT'})`,
        icon: 'coins',
        wallet: s.crypto.wallet_address
      });
    }

    return active;
  },

  toggleGateway(gatewayId, isEnabled) {
    const s = this.getSettings();
    if (s[gatewayId]) {
      s[gatewayId].enabled = isEnabled ? 1 : 0;
      this.saveSettings(s);
    }
    return s;
  }
};