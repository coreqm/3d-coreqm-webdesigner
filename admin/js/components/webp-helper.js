// WebP Conversion Utility Component
window.WebPHelper = {
  convertImageToWebP(file, quality = 0.85, maxWidth = null) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        reject(new Error('Lütfen geçerli bir görsel dosyası seçin.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (maxWidth && width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const webpDataUrl = canvas.toDataURL('image/webp', quality);
          const head = 'data:image/webp;base64,';
          const base64Length = webpDataUrl.length - head.length;
          const webpSizeBytes = Math.round((base64Length * 3) / 4);

          const origSize = file.size;
          const savings = origSize > webpSizeBytes ? Math.round(((origSize - webpSizeBytes) / origSize) * 100) : 0;

          resolve({
            dataUrl: webpDataUrl,
            originalSize: origSize,
            webpSize: webpSizeBytes,
            savingsPercent: savings,
            width,
            height
          });
        };
        img.onerror = () => reject(new Error('Görsel çözümlenemedi.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Dosya okunamadı.'));
      reader.readAsDataURL(file);
    });
  },

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
};