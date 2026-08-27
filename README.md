# 3D Coreqm — Web Designer & Luxury 3D Canvas Platform

<p align="center">
  <img src="frames/frame_0001.webp" alt="3D Coreqm Titanium Chrono" width="360" style="border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
</p>

<p align="center">
  <b>Yeni Nesil 360° İnteraktif 3D Canvas Vitrini, İstemci Taraflı Video Dönüştürücü ve Lüks E-Ticaret Ekosistemi</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Security-SHA--256_Cryptographic-red?style=for-the-badge" alt="Security">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License">
</p>

---

## 🌟 Proje Genel Bakış (Overview)

**3D Coreqm Web Designer**, yüksek performanslı interaktif 3D ürün sunumlarını modern e-ticaret altyapısıyla birleştiren kurumsal bir web platformudur. 

Ağır 3D motorları (Three.js, WebGL shaderları) veya yüksek CPU/GPU tüketen video oynatıcıları yerine; **240 karelik optimize WebP sekansı** ve **Pure JS Canvas Motoru** kullanarak **120 FPS akıcılıkta** 360 derece ürün inceleme deneyimi sunar.

Platform, bağımsız bir **MVVM (Model-View-ViewModel)** mimarisi üzerine inşa edilmiş olup, zengin bir yönetim paneli ve kurumsal düzeyde kriptografik güvenlik katmanı içerir.

---

## 🚀 Öne Çıkan Özellikler (Key Features)

### 💎 1. 360° İnteraktif 3D Canvas Vitrini
* **Ultra Akıcı 240 Kare Sekansı:** Sıfır video takılması, anlık kare atlama ve donanım hızlandırmalı HTML5 Canvas çizimi.
* **Hassas Kontroller:**
  * Masaüstünde fare ile sürükleyerek 360° döndürme.
  * Mobil ve tablet cihazlarda çoklu dokunmatik jest desteği.
  * Sayfa kaydırma (scroll) ile otomatik dönme veya interaktif zaman çizelgesi (timeline seek track).
* **Dinamik Başlık & Katman Editörü:** Admin panelinden vitrin üzerindeki başlık, etiket, buton metni ve konumlandırması (üst, orta, alt / sol, merkez, sağ) anlık olarak yönetilebilir.

### 🎬 2. Tarayıcı İçi Video-to-Frame Dönüştürme Motoru
* Doğrudan yönetim panelinden (`admin/iframes.html`) MP4/WebM formatındaki ürün videolarını **sürükle-bırak (Drag & Drop)** yöntemiyle yükleme.
* Sunucu tarafında ek render maliyeti olmadan, tamamen tarayıcı belleğinde videodan **240 karelik optimize WebP sekansı** oluşturma.
* Anlık ilerleme çubuğu ve yüklenen videonun 360° test önizleme simülatörü.

### 🛡️ 3. Kurumsal Düzeyde Kriptografik Güvenlik (Enterprise Security)
* **Sıfır Düz Metin Şifre Prensibi:** Kaynak kodda ve depolama alanında şifreler asla açık tutulmaz.
* **SHA-256 + Salt Koruması:** Kullanıcı ve yönetici şifreleri bağımsız çalışan saf JavaScript SHA-256 motoru ile 16 baytlık benzersiz kriptografik tuz (salt) eklenerek hashlenir.
* **256-Bit Kriptografik Oturum Belirteçleri:** `crypto.getRandomValues()` ile üretilen güvenli tokenlar ve 24 saatlik geçerlilik süresi (TTL).
* **Hassas Veri İzolasyonu:** İstemci nesnelerine şifre ve hash alanları asla iletilmez (`Store.getUser()`).
* **XSS Enjeksiyon Filtresi:** Kullanıcı girdilerini otomatik olarak sanitize eden güvenlik motoru.

### 🏗️ 4. Modüler MVVM Mimarisi (12 ViewModel & Model)
* Kod karmaşasını önleyen, bakım ve genişletmeyi kolaylaştıran saf **Model-View-ViewModel** yapısı:
  * `DashboardViewModel` — Canlı ciro, sipariş ve stok telemetrisi.
  * `ProductsViewModel` — Kapsamlı ürün ekleme, düzenleme, stok ve varyant yönetimi.
  * `OrdersViewModel` — Sipariş durumu güncelleme ve müşteri detayları.
  * `PaymentsViewModel` — Stripe, PayPal, Iyzico, PayTR, Havale ve Kripto ödeme geçidi konfigürasyonları.
  * `AuthSettingsViewModel` — Google OAuth, Microsoft Login ve dinamik Base-32 2FA ayarları.
  * `MailSettingsViewModel` — SMTP ve Google Workspace e-posta entegrasyonu.
  * `SeoViewModel` — Meta etiketleri, OpenGraph, Twitter Cards, Schema.org JSON-LD ve Google Analytics 4.
  * `HeaderDesignViewModel` — Header modları (Fixed, Sticky, Relative) ve logo ayarları.
  * `NavMenuViewModel` — Sürükle-bırak dinamik navigasyon menüsü oluşturucu.
  * `IframesViewModel` — 3D Canvas sekans ve video model yönetimi.
  * `MapViewModel` — Showroom konumu, çalışma saatleri ve harita yönetimi.
  * `SecurityViewModel` — Kriptografik şifre değiştirme ve güvenlik denetimi.

### 🌍 5. Çift Dilli Altyapı (TR / EN Internationalization)
* Tek tıkla Türkçe ve İngilizce dil değişimi.
* `data-i18n` öznitelikleriyle anlık arayüz çevirisi ve dil tercihinin kalıcı olarak saklanması.

### ⚡ 6. Akıllı Tembel Yükleme (Smart Lazy Loading)
* Sayfa açılış hızını maksimuma çıkarmak için Google Haritalar (Maps) gibi harici iframe bileşenleri `IntersectionObserver` ile kullanıcı bölüme yaklaşana kadar yüklenmez.
* Ağ gecikmeleri ve font bloklamaları tamamen elimine edilmiştir.

---

## 📁 Dizin ve Dosya Yapısı (Project Structure)

```text
3d-coreqm-webdesigner/
├── admin/                         # Yönetim Paneli Modülleri
│   ├── css/                       # Panel özel stilleri
│   ├── js/
│   │   ├── components/            # Yeniden kullanılabilir UI bileşenleri (Sidebar, Header, WebP Helper)
│   │   ├── models/                # Veri modelleri (Auth, Frame, Mail, Payment, Product, SEO, User vb.)
│   │   └── viewmodels/            # 12 adet MVVM ViewModel denetleyicisi
│   ├── auth-settings.html         # 2FA ve OAuth ayarları
│   ├── header-design.html         # Dinamik Header & Menü pozisyonu
│   ├── iframes.html               # 3D Canvas ve Video Yükleme Motoru
│   ├── index.html                 # Admin kontrol paneli ana sayfası
│   ├── mail-settings.html         # SMTP ve E-posta ayarları
│   ├── map.html                   # Harita ve Showroom ayarları
│   ├── nav-menu.html              # Dinamik Menü sıralayıcı
│   ├── orders.html                # Sipariş takip ve durum yönetimi
│   ├── payments.html              # Çoklu Ödeme Yöntemi Yönetimi
│   ├── products.html              # Ürün Kataloğu Yönetimi
│   ├── security.html              # Güvenlik ve Şifre Konsolu
│   └── seo.html                   # Arama Motoru Optimizasyonu (SEO)
├── css/
│   ├── input.css                  # Tailwind CSS kaynak dosyası
│   └── output.css                 # Optimize ve derlenmiş son CSS (Minified)
├── frames/                        # 240 adet optimize WebP görsel sekansı (360° model)
├── uploads/                       # Kullanıcı tarafından yüklenen video ve ortam dosyaları
├── .gitignore                     # Git filtreleme kuralları
├── checkout.js                    # Sepet ve sipariş tamamlama akışı
├── iframe-viewer.html             # Bağımsız gömülebilir 3D Canvas iframe oynatıcısı
├── index.html                     # Ana vitrin ve e-ticaret vitrini
├── login.html                     # Güvenli giriş kapısı (2FA destekli)
├── package.json                   # Geliştirme bağımlılıkları (Tailwind CSS)
├── product-detail.html            # 360° interaktif ürün detay sayfası
├── profile.html                   # Müşteri sipariş geçmişi ve profil sayfası
├── README.md                      # Proje dokümantasyonu
├── register.html                  # Güvenli üye kayıt sayfası
├── store.js                       # Kriptografik depolama, State Management ve Auth Motoru
└── tailwind.config.js             # Tailwind CSS tasarım sistemi ayarları
```

---

## 🛠️ Kurulum ve Yerel Çalıştırma (Getting Started)

### 1. Depoyu Klonlayın:
```bash
git clone https://github.com/muhammedaligurdal/3d-coreqm-webdesigner.git
cd 3d-coreqm-webdesigner
```

### 2. Geliştirme Ortamını Hazırlayın (Opsiyonel - CSS Derleme için):
```bash
npm install
npm run build:css
```

### 3. Yerel Sunucuyu Başlatın:
Statik bir HTTP sunucusu ile projeyi hemen çalıştırabilirsiniz:
```bash
# Python ile:
python -m http.server 8080

# veya Node.js ile:
npx serve .
```

Tarayıcınızda açın:
```text
http://localhost:8080
```

---

## 🔐 Yönetim Paneli & Giriş Bilgileri

* **Admin Paneli Adresi:** `http://localhost:8080/admin/index.html` veya `/login.html`
* **Varsayılan Yönetici:** `admin@benimplaka.com`
* **Varsayılan Şifre:** `admin123` *(İlk girişte SHA-256 ve benzersiz salt ile kriptografik olarak anında şifrelenir)*

---

## 💻 Teknoloji Yığını (Tech Stack)

* **Ön Yüz:** Vanilla JavaScript (ES6+), HTML5 Canvas, modern DOM API.
* **Tasarım:** Tailwind CSS 3.4, Lucide Icons, Glassmorphism & Cyberpunk-Luxury Dark UI.
* **Görsel Motoru:** WebP 240-Frame Lossless Scrubbing Engine.
* **Kriptografi:** Bağımsız Pure JS SHA-256 + High-Entropy Salt Hashing.
* **Mimari:** MVVM (Model-View-ViewModel), Event-Driven Reactive State Store.

---

## 📄 Lisans (License)

Bu proje [MIT Lisansı](LICENSE) kapsamında lisanslanmıştır. Ticari ve kişisel projelerde serbestçe kullanılabilir, geliştirilebilir ve dağıtılabilir.

---

<p align="center">
  Geliştirici: <b>Muhammed Ali Gürdal</b><br>
  E-posta: <a href="mailto:muhammedaligrdl@gmail.com">muhammedaligrdl@gmail.com</a> • Web: <a href="https://benimplaka.com">benimplaka.com</a>
</p>
