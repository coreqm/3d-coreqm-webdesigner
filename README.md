# 3d-coreqm-webdesigner

3D Coreqm Web Designer is a next-generation interactive 3D WebP sequence showcase and autonomous luxury e-commerce platform.

## Key Features

- **360° Interactive 3D Canvas**: Smooth 240-frame WebP sequence scrubbing with touch and drag-to-rotate controls.
- **Client-Side Video-to-Frame Engine**: Extract up to 240 optimized WebP frames directly in the browser from uploaded MP4/WebM videos.
- **Enterprise-Grade Security**: Cryptographically salted SHA-256 password hashing, token-based session verification with TTL, and input sanitization.
- **Full MVVM Architecture**: 12 modular ViewModels and Models powering the administration console.
- **Dynamic Content & Store Management**: Complete control over products, orders, multi-gateway payments, SEO metadata, navigation menus, and Google Maps showroom location.
- **Multilingual Support**: Real-time Turkish and English internationalization (i18n).
- **Responsive & Modern UI**: Built with Tailwind CSS and Lucide icons.

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript (ES6+)
- Tailwind CSS
- Lucide Icons
- Pure JS Cryptographic SHA-256 Engine

## Getting Started

1. Clone repository:
   `ash
   git clone https://github.com/coreqm/3d-coreqm-webdesigner.git
   `
2. Install Tailwind dependencies if customizing styles:
   `ash
   npm install
   npm run build:css
   `
3. Serve locally with any static HTTP server:
   `ash
   npx serve .
   # or
   python -m http.server 8080
   `
4. Open http://localhost:8080 in your browser.

## License
MIT
