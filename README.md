# 3D Coreqm — Web Designer & Luxury 3D Canvas Platform

<p align="center">
  <img src="frames/frame_0001.webp" alt="3D Coreqm 3D Chrono" width="360" style="border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
</p>

<p align="center">
  <b>Next-Generation 360° Interactive 3D Canvas Showcase, Client-Side Video-to-Frame Converter & Luxury Autonomous E-Commerce Platform</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JS">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Security-SHA--256_Cryptographic-red?style=for-the-badge" alt="Security">
  <img src="https://img.shields.io/badge/Architecture-MVVM_12_ViewModels-blue?style=for-the-badge" alt="MVVM">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License">
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. 360° Interactive 3D Canvas Showcase](#1-360-interactive-3d-canvas-showcase)
  - [2. Client-Side Video-to-Frame Converter](#2-client-side-video-to-frame-converter)
  - [3. Enterprise-Grade Cryptographic Security](#3-enterprise-grade-cryptographic-security)
  - [4. Decoupled MVVM Architecture](#4-decoupled-mvvm-architecture)
  - [5. Smart Lazy Loading & Performance](#5-smart-lazy-loading--performance)
  - [6. Bilingual i18n Engine](#6-bilingual-i18n-engine)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Installation](#-getting-started--installation)
- [Admin Console & Credentials](#-admin-console--credentials)
- [Technology Stack](#-technology-stack)
- [Security Specifications](#-security-specifications)
- [License](#-license)

---

## 🌟 Overview

**3D Coreqm Web Designer** is an enterprise web platform that combines high-performance interactive 3D product presentations with a modern luxury e-commerce ecosystem.

Instead of relying on heavy 3D runtime libraries (like Three.js or complex WebGL shaders) or battery-draining video decoders, 3D Coreqm uses an **optimized 240-frame WebP sequence** rendered onto an HTML5 Canvas. This achieves a butter-smooth **120 FPS** 360° inspection experience with zero playback stutter, minimal memory overhead, and instant response to touch and cursor scrub gestures.

The entire system is powered by a decoupled **Model-View-ViewModel (MVVM)** architecture, providing 12 dedicated ViewModels and Models for administration, real-time telemetry, and multi-gateway payment processing.

---

## 🚀 Key Features

### 1. 360° Interactive 3D Canvas Showcase
* **Ultra-Fluid 240-Frame Sequence:** High-resolution WebP frames preloaded into memory for instantaneous response.
* **Versatile Interaction Modes:**
  * Desktop mouse drag and hover rotation.
  * Mobile and tablet touch-drag gesture handling with passive listeners.
  * Scroll-driven interactive rotation with lerp smoothing.
  * Timeline scrub bar with real-time frame and progress indicators.
* **Customizable Overlay Engine:** Configure headline, tag badge, call-to-action button, and vertical/horizontal alignments directly from the admin panel.

### 2. Client-Side Video-to-Frame Converter
* **Drag-and-Drop Video Processing:** Upload MP4 or WebM video assets directly in `admin/iframes.html`.
* **Zero Server Overhead:** Frames are decoded, resized, and converted to optimized WebP images entirely within browser memory using HTML5 Canvas and `URL.createObjectURL`.
* **Live 360° Simulator:** Test and rotate newly extracted sequences immediately in the integrated 360° preview canvas before saving.

### 3. Enterprise-Grade Cryptographic Security
* **Zero Plain-Text Password Principle:** Passwords are never stored in plain text anywhere in source code or browser storage.
* **Salted SHA-256 Hashing:** Pure JavaScript implementation of the SHA-256 cryptographic hashing algorithm with unique 16-byte random salts per user.
* **256-Bit Cryptographic Session Tokens:** Generated via `crypto.getRandomValues()` with 24-hour time-to-live (TTL) expiration.
* **Strict De-Identification:** Sensitive credential attributes (`password`, `password_hash`, `salt`) are automatically stripped before user objects are returned to UI layers.
* **Built-in XSS Sanitizer:** All user-supplied inputs are automatically escaped against HTML and script injection attacks.

### 4. Decoupled MVVM Architecture
Separation of concerns is strictly enforced through 12 modular ViewModels and Data Models:
* **`DashboardViewModel`** — Real-time revenue, order telemetry, and low-stock alerts.
* **`ProductsViewModel`** — Product catalog, pricing, inventory, and 3D sequence association.
* **`OrdersViewModel`** — Order lifecycle tracking (Pending, Processing, Shipped, Delivered, Cancelled).
* **`PaymentsViewModel`** — Gateway configurations (Stripe, PayPal, Iyzico, PayTR, Bank Transfer, Crypto USDT).
* **`AuthSettingsViewModel`** — OAuth providers (Google, Microsoft) and dynamic Base-32 Two-Factor Authentication (2FA).
* **`MailSettingsViewModel`** — SMTP server settings and transactional email templates.
* **`SeoViewModel`** — Complete search engine suite (Meta tags, OpenGraph, Twitter Cards, JSON-LD Schema.org, GA4).
* **`HeaderDesignViewModel`** — Dynamic navigation modes (Fixed, Sticky, Relative) and branding assets.
* **`NavMenuViewModel`** — Custom drag-and-drop navigation menu builder with link targets and badges.
* **`IframesViewModel`** — 3D Canvas sequence management and video converter.
* **`MapViewModel`** — Showroom physical address, hours of operation, and interactive map coordinate controls.
* **`SecurityViewModel`** — Cryptographic password update console and session auditing.

### 5. Smart Lazy Loading & Performance
* **IntersectionObserver Integration:** Third-party embedded components (e.g., Google Maps) are deferred until the visitor scrolls within 300px of the showroom section.
* **Network Throttling Defense:** Eliminates unnecessary initial requests, saves bandwidth, and prevents Chrome font download interventions on slow network connections.

### 6. Bilingual i18n Engine
* Instant language switching between **Turkish (TR)** and **English (EN)** without page reloads.
* Automatic translation of navigation links, catalog titles, buttons, cart labels, and dialog prompts.

---

## 📁 Project Directory Structure

```text
3d-coreqm-webdesigner/
├── admin/                         # Administration Console
│   ├── css/                       # Admin-specific styles
│   ├── js/
│   │   ├── components/            # Shared UI components (Sidebar, Header, WebP Helper)
│   │   ├── models/                # Data Models (Auth, Frame, Mail, Payment, Product, SEO, User)
│   │   └── viewmodels/            # 12 Modular MVVM ViewModels
│   ├── auth-settings.html         # 2FA & OAuth configuration
│   ├── header-design.html         # Navigation bar & layout designer
│   ├── iframes.html               # 3D Canvas sequences & video uploader
│   ├── index.html                 # Main admin analytics dashboard
│   ├── mail-settings.html         # SMTP & email provider configuration
│   ├── map.html                   # Showroom location & map settings
│   ├── nav-menu.html              # Dynamic navigation menu manager
│   ├── orders.html                # Order management & status tracking
│   ├── payments.html              # Multi-gateway payment manager
│   ├── products.html              # Product catalog & inventory manager
│   ├── security.html              # Password & session security console
│   └── seo.html                   # SEO & Webmaster verification suite
├── css/
│   ├── input.css                  # Tailwind CSS source stylesheet
│   └── output.css                 # Compiled & minified production stylesheet
├── frames/                        # 240 pre-rendered WebP frames for the 360° showcase
├── uploads/                       # User-uploaded videos and media assets
├── .gitignore                     # Git exclusion rules
├── checkout.js                    # Cart drawer and checkout execution script
├── iframe-viewer.html             # Standalone embeddable 3D Canvas player
├── index.html                     # Main luxury showcase & e-commerce storefront
├── login.html                     # Secure authentication portal (2FA ready)
├── package.json                   # Project scripts and Tailwind dependencies
├── product-detail.html            # 360° interactive product detail page
├── profile.html                   # Customer portal & order history
├── README.md                      # Comprehensive project documentation
├── register.html                  # New customer registration page
├── store.js                       # Cryptographic storage engine & reactive state manager
└── tailwind.config.js             # Tailwind CSS theme configuration
```

---

## 🛠️ Getting Started & Installation

### Prerequisites
* Any modern web browser with HTML5 Canvas and ES6 support (Chrome, Firefox, Safari, Edge).
* (Optional) [Node.js](https://nodejs.org/) (v16+) for compiling Tailwind CSS.

### 1. Clone the Repository
```bash
git clone https://github.com/coreqm/3d-coreqm-webdesigner.git
cd 3d-coreqm-webdesigner
```

### 2. Install Dependencies (Optional — for CSS customization)
```bash
npm install
npm run build:css
```

### 3. Launch Local Server
You can run the project using any static file server:

```bash
# Using Python:
python -m http.server 8080

# Or using Node.js:
npx serve .
```

Open your browser and navigate to:
```text
http://localhost:8080
```

---

## 🔐 Admin Console & Credentials

| Role | Access URL | Default Identifier | Initial Password |
| :--- | :--- | :--- | :--- |
| **Administrator** | `/admin/index.html` or `/login.html` | `admin@test.com` | `admin123` |
| **Client Portal** | `/login.html` | `user@test.com` | `user123` |

> [!NOTE]
> Upon initial login, plain-text passwords are automatically migrated and permanently replaced in local storage with salted SHA-256 cryptographic digests.

---

## 💻 Technology Stack

* **Front-End:** Vanilla JavaScript (ES6+), HTML5 Canvas, DOM API.
* **Styling:** Tailwind CSS 3.4, Lucide Icons, Glassmorphic Dark Architecture.
* **Image Sequencing:** Lossless WebP 240-Frame Scrubbing Engine.
* **Cryptography:** Pure JS SHA-256 Engine, High-Entropy Crypto Salts.
* **Design Pattern:** MVVM (Model-View-ViewModel), Event-Driven State Store.

---

## 🛡️ Security Specifications

```text
+-------------------------+-------------------------------------------------------+
| Security Feature        | Implementation Detail                                 |
+-------------------------+-------------------------------------------------------+
| Password Storage        | SHA-256 with 16-byte random cryptographic salt        |
| Session Management      | 256-bit crypto-random tokens (crypto.getRandomValues) |
| Session Expiration      | 24-Hour Time-to-Live (TTL) with mandatory re-auth     |
| Credential Exposure     | Complete de-identification in Store.getUser()          |
| XSS Prevention          | HTML entity encoding for all persistent strings       |
| Two-Factor Auth (2FA)   | Dynamic Base-32 TOTP secret generator                 |
+-------------------------+-------------------------------------------------------+
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

<p align="center">
  Developed by <b>Coreqm AI & Muhammed Ali Gürdal</b><br>
  Website: <a href="https://benimplaka.com">benimplaka.com</a> • Repository: <a href="https://github.com/coreqm/3d-coreqm-webdesigner">github.com/coreqm/3d-coreqm-webdesigner</a>
</p>
