// Shared Dynamic Checkout Modal Component
window.CheckoutEngine = {
  selectedGateway: null,

  init() {
    if (document.getElementById('checkoutModalWrapper')) return;

    const modalHtml = `
      <div id="checkoutModalWrapper" class="hidden fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-[#0f1117] border border-neutral-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          <div class="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
            <div>
              <span class="font-mono text-[10px] uppercase tracking-widest text-indigo-400">GÜVENLİ ÖDEME</span>
              <h3 class="text-lg font-bold text-white mt-0.5">Siparişi Tamamla & Ödeme</h3>
            </div>
            <button onclick="CheckoutEngine.close()" class="text-neutral-400 hover:text-white transition-colors">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <form id="checkoutDynamicForm" onsubmit="CheckoutEngine.handleSubmit(event)" class="space-y-6">
            
            <!-- Müşteri & Teslimat Bilgileri -->
            <div class="space-y-3">
              <h4 class="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">1. Teslimat & İletişim Bilgileri</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">Ad Soyad *</label>
                  <input type="text" id="chk_name" required placeholder="Adınız Soyadınız" class="w-full bg-[#161922] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500">
                </div>
                <div>
                  <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">E-Posta Adresi *</label>
                  <input type="email" id="chk_email" required placeholder="ornek@alanadi.com" class="w-full bg-[#161922] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500">
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">Telefon Numarası</label>
                  <input type="tel" id="chk_phone" placeholder="+90 555 000 00 00" class="w-full bg-[#161922] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500 font-mono">
                </div>
                <div>
                  <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">Şehir / İlçe</label>
                  <input type="text" id="chk_city" placeholder="İstanbul / Levent" class="w-full bg-[#161922] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500">
                </div>
              </div>
              <div>
                <label class="block text-[11px] font-mono text-neutral-400 uppercase mb-1">Açık Teslimat Adresi *</label>
                <textarea id="chk_address" required rows="2" placeholder="Mahalle, Cadde, Sokak, Bina No, Daire..." class="w-full bg-[#161922] border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-indigo-500"></textarea>
              </div>
            </div>

            <!-- Dinamik Ödeme Yöntemi Seçimi -->
            <div class="space-y-3 pt-4 border-t border-neutral-800">
              <h4 class="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">2. Ödeme Yöntemi Seçin</h4>
              <div id="checkoutGatewaysList" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <!-- Dinamik Ödeme Kartları -->
              </div>

              <!-- Seçilen Yönteme Özel Bilgi Paneli -->
              <div id="gatewayDetailsBox" class="p-4 rounded-xl bg-[#161922] border border-neutral-800 text-xs text-neutral-300 hidden"></div>
            </div>

            <!-- Sepet Özeti & Onay Butonu -->
            <div class="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs text-neutral-400">Toplam Ödenecek Tutar:</span>
                <div class="text-xl font-bold text-white font-mono" id="chk_total_display">$0</div>
              </div>
              <button type="submit" class="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2">
                <i data-lucide="lock" class="w-4 h-4"></i>
                <span>Siparişi Güvenle Tamamla</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    if (window.lucide) lucide.createIcons();
  },

  open() {
    this.init();
    const cart = Store.getCart();
    if (!cart || cart.length === 0) {
      alert('Sepetiniz henüz boş.');
      return;
    }

    const user = Store.getUser();
    if (user) {
      document.getElementById('chk_name').value = user.full_name || user.username || '';
      document.getElementById('chk_email').value = user.email || '';
      document.getElementById('chk_phone').value = user.phone || '';
      document.getElementById('chk_address').value = user.address || '';
    }

    this.renderGateways();
    this.updateTotal();

    document.getElementById('checkoutModalWrapper').classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  },

  close() {
    const modal = document.getElementById('checkoutModalWrapper');
    if (modal) modal.classList.add('hidden');
  },

  renderGateways() {
    const pSettings = Store.getPaymentSettings();
    const list = document.getElementById('checkoutGatewaysList');
    if (!list) return;

    const options = [];

    if (pSettings.iyzico && pSettings.iyzico.enabled) {
      options.push({
        id: 'iyzico',
        name: 'İyzico Sanal POS',
        sub: '3D Secure & Kredi Kartı',
        icon: 'credit-card'
      });
    }

    if (pSettings.stripe && pSettings.stripe.enabled) {
      options.push({
        id: 'stripe',
        name: 'Stripe',
        sub: 'Visa, Mastercard, Apple Pay',
        icon: 'zap'
      });
    }

    if (pSettings.paypal && pSettings.paypal.enabled) {
      options.push({
        id: 'paypal',
        name: 'PayPal',
        sub: 'Global Güvenli Ödeme',
        icon: 'wallet'
      });
    }

    if (pSettings.bank_transfer && pSettings.bank_transfer.enabled) {
      options.push({
        id: 'bank_transfer',
        name: 'Banka Havalesi / EFT',
        sub: pSettings.bank_transfer.bank_name || 'Banka Transferi',
        icon: 'building'
      });
    }

    if (pSettings.cash_on_delivery && pSettings.cash_on_delivery.enabled) {
      const fee = pSettings.cash_on_delivery.extra_fee || 0;
      options.push({
        id: 'cash_on_delivery',
        name: 'Kapıda Ödeme',
        sub: fee > 0 ? `+ $${fee} Hizmet Bedeli` : 'Teslimatta Nakit / Kart',
        icon: 'truck',
        fee
      });
    }

    if (pSettings.crypto && pSettings.crypto.enabled) {
      options.push({
        id: 'crypto',
        name: 'Kripto Para',
        sub: pSettings.crypto.network || 'USDT TRC20',
        icon: 'coins'
      });
    }

    if (options.length === 0) {
      list.innerHTML = '<div class="col-span-2 text-xs text-amber-400 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">Aktif ödeme yöntemi bulunmamaktadır. Lütfen yönetici ile iletişime geçin.</div>';
      this.selectedGateway = null;
      return;
    }

    // Varsayılan ilk seçenek
    this.selectedGateway = options[0].id;

    list.innerHTML = options.map((opt, i) => `
      <label onclick="CheckoutEngine.selectGateway('${opt.id}')" class="p-3.5 rounded-2xl bg-[#161922] border ${i === 0 ? 'border-indigo-500 bg-indigo-950/20' : 'border-neutral-800'} hover:border-neutral-700 transition-all cursor-pointer flex items-center gap-3 gateway-card" id="gateway_card_${opt.id}">
        <input type="radio" name="selected_gateway" value="${opt.id}" ${i === 0 ? 'checked' : ''} class="sr-only">
        <div class="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-indigo-400 flex-shrink-0">
          <i data-lucide="${opt.icon}" class="w-4 h-4"></i>
        </div>
        <div class="truncate">
          <div class="font-bold text-xs text-white truncate">${opt.name}</div>
          <div class="text-[10px] text-neutral-400 truncate">${opt.sub}</div>
        </div>
      </label>
    `).join('');

    this.showGatewayDetails(this.selectedGateway);
    if (window.lucide) lucide.createIcons();
  },

  selectGateway(id) {
    this.selectedGateway = id;
    document.querySelectorAll('.gateway-card').forEach(card => {
      card.classList.remove('border-indigo-500', 'bg-indigo-950/20');
      card.classList.add('border-neutral-800');
    });

    const activeCard = document.getElementById('gateway_card_' + id);
    if (activeCard) {
      activeCard.classList.remove('border-neutral-800');
      activeCard.classList.add('border-indigo-500', 'bg-indigo-950/20');
      const radio = activeCard.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    }

    this.showGatewayDetails(id);
    this.updateTotal();
  },

  showGatewayDetails(id) {
    const box = document.getElementById('gatewayDetailsBox');
    if (!box) return;

    const pSettings = Store.getPaymentSettings();

    if (id === 'bank_transfer' && pSettings.bank_transfer) {
      const b = pSettings.bank_transfer;
      box.classList.remove('hidden');
      box.innerHTML = `
        <div class="space-y-2">
          <div class="font-bold text-white flex items-center gap-2">
            <i data-lucide="building" class="w-4 h-4 text-emerald-400"></i>
            <span>${b.bank_name || 'Banka Hesabı'}</span>
          </div>
          <div class="font-mono text-xs">
            <span class="text-neutral-400">Hesap Sahibi:</span> <strong class="text-white">${b.account_holder || '-'}</strong>
          </div>
          <div class="font-mono text-xs p-2 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <span class="text-emerald-400 select-all">${b.iban || '-'}</span>
            <span class="text-[10px] text-neutral-500 uppercase">IBAN</span>
          </div>
          <div class="text-[11px] text-neutral-400">${b.instructions || 'Sipariş numaranızı havale açıklama kısmına yazınız.'}</div>
        </div>
      `;
    } else if (id === 'crypto' && pSettings.crypto) {
      const c = pSettings.crypto;
      box.classList.remove('hidden');
      box.innerHTML = `
        <div class="space-y-2">
          <div class="font-bold text-white">Kripto Cüzdan Adresi (${c.network || 'USDT'})</div>
          <div class="font-mono text-xs p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-indigo-400 select-all break-all">
            ${c.wallet_address || 'T...'}
          </div>
          <div class="text-[11px] text-neutral-400">Ödemenizi gönderdikten sonra siparişinizi teyit edin.</div>
        </div>
      `;
    } else if (id === 'iyzico' || id === 'stripe') {
      box.classList.remove('hidden');
      box.innerHTML = `
        <div class="flex items-center gap-2 text-emerald-400">
          <i data-lucide="shield-check" class="w-4 h-4"></i>
          <span>256-bit SSL ve 3D Secure ile güvenli kart ödeme oturumu açılacaktır.</span>
        </div>
      `;
    } else {
      box.classList.add('hidden');
    }

    if (window.lucide) lucide.createIcons();
  },

  updateTotal() {
    const cart = Store.getCart();
    let total = cart.reduce((s, i) => s + (i.price * i.qty), 0);

    const pSettings = Store.getPaymentSettings();
    if (this.selectedGateway === 'cash_on_delivery' && pSettings.cash_on_delivery) {
      total += (pSettings.cash_on_delivery.extra_fee || 0);
    }

    const disp = document.getElementById('chk_total_display');
    if (disp) disp.textContent = '$' + total.toLocaleString('en-US', { minimumFractionDigits: 2 });
  },

  handleSubmit(e) {
    e.preventDefault();
    if (!this.selectedGateway) {
      alert('Lütfen bir ödeme yöntemi seçiniz.');
      return;
    }

    const cart = Store.getCart();
    if (cart.length === 0) {
      alert('Sepetiniz boş.');
      return;
    }

    const name = document.getElementById('chk_name').value;
    const email = document.getElementById('chk_email').value;
    const phone = document.getElementById('chk_phone').value;
    const address = document.getElementById('chk_address').value;
    const city = document.getElementById('chk_city').value;

    let total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const pSettings = Store.getPaymentSettings();
    if (this.selectedGateway === 'cash_on_delivery' && pSettings.cash_on_delivery) {
      total += (pSettings.cash_on_delivery.extra_fee || 0);
    }

    const user = Store.getUser();

    let paymentStatus = 'Ödendi';
    if (this.selectedGateway === 'bank_transfer') paymentStatus = 'Havale Bekliyor';
    if (this.selectedGateway === 'cash_on_delivery') paymentStatus = 'Kapıda Tahsilat';
    if (this.selectedGateway === 'crypto') paymentStatus = 'Kripto Onay Bekliyor';

    const newOrder = Store.createOrder({
      user_id: user ? user.id : null,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      customer_address: `${address} / ${city}`,
      items_json: JSON.stringify(cart),
      total_amount: total,
      payment_gateway: this.selectedGateway,
      payment_status: paymentStatus
    });

    Store.clearCart();
    this.close();

    alert(`Tebrikler! Siparişiniz başarıyla alındı.\nSipariş No: #${newOrder.id}\nÖdeme Yöntemi: ${this.selectedGateway.toUpperCase()}\nDurum: ${paymentStatus}`);
    
    // UI Güncelle
    if (typeof updateCartCount === 'function') updateCartCount();
    if (typeof renderCartDrawer === 'function') renderCartDrawer();
    if (typeof toggleCartDrawer === 'function') toggleCartDrawer();

    // Profil sayfasına yönlendirme seçeneği
    if (confirm('Siparişinizi profilinizden takip etmek ister misiniz?')) {
      window.location.href = '/profile.html';
    }
  }
};

// Global checkoutCart fonksiyonunu CheckoutEngine ile bağla
window.checkoutCart = function() {
  CheckoutEngine.open();
};