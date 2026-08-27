// 360 Frames ViewModel
window.IframesViewModel = {
  frames: [],

  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('iframes');
    AdminHeader.init({
      title: '3D Canvas Setleri & Vitrin',
      subtitle: 'Video yükleme, 240 WebP kare çözümleme ve anasayfa 3D Canvas yönetimi.'
    });

    this.bindEvents();
    this.loadTable();
  },

  bindEvents() {
    document.getElementById('frameForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    const dropZone = document.getElementById('videoDropZone');
    if (dropZone) {
      ['dragenter', 'dragover'].forEach(name => {
        dropZone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleDragOver(e);
        });
      });

      ['dragleave', 'drop'].forEach(name => {
        dropZone.addEventListener(name, (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleDragLeave(e);
        });
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleDrop(e);
      });
    }

    const fileInput = document.getElementById('videoFileInput');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        this.handleVideoFileSelect(e);
      });
    }
  },

  handleDragOver(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const dropZone = document.getElementById('videoDropZone');
    if (dropZone) {
      dropZone.classList.add('border-indigo-500', 'bg-indigo-50/30', 'dark:bg-indigo-950/40', 'scale-[1.01]');
    }
  },

  handleDragLeave(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const dropZone = document.getElementById('videoDropZone');
    if (dropZone) {
      dropZone.classList.remove('border-indigo-500', 'bg-indigo-50/30', 'dark:bg-indigo-950/40', 'scale-[1.01]');
    }
  },

  handleDrop(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.handleDragLeave(e);
    const dt = e.dataTransfer;
    const file = dt && dt.files && dt.files.length > 0 ? dt.files[0] : null;
    if (file) {
      this.processVideoFile(file);
    }
  },

  handleVideoFileSelect(event) {
    let file = null;
    if (event instanceof File) {
      file = event;
    } else if (event && event.target && event.target.files) {
      file = event.target.files[0];
    } else if (event && event.dataTransfer && event.dataTransfer.files) {
      file = event.dataTransfer.files[0];
    }
    if (file) {
      this.processVideoFile(file);
    }
  },

  async processVideoFile(file) {
    if (!file) return;

    // Video uzantı kontrolü
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|ogg)$/i)) {
      alert('Lütfen geçerli bir video dosyası seçiniz (MP4, MOV veya WebM).');
      return;
    }

    const progressDiv = document.getElementById('videoExtractionProgress');
    const progressBar = document.getElementById('extractProgressBar');
    const percentText = document.getElementById('extractPercent');
    const statusText = document.getElementById('extractStatusText');

    if (progressDiv) progressDiv.classList.remove('hidden');
    if (statusText) statusText.textContent = `"${file.name}" videodan 240 WebP karesi çözümleniyor...`;

    try {
      const result = await Store.extractFramesFromVideoFile(file, 240, (pct, current, total) => {
        if (progressBar) progressBar.style.width = pct + '%';
        if (percentText) percentText.textContent = `${pct}% (${current}/${total})`;
      });

      this.extractedFrames = result.frames;
      const customKey = 'custom_' + Date.now();

      // IndexedDB'ye yüksek hızlı WebP karelerini kaydet
      if (Store.saveCustomFramesToDB) {
        await Store.saveCustomFramesToDB(customKey, this.extractedFrames);
      }

      document.getElementById('frm_title').value = file.name.replace(/\.[^/.]+$/, '');
      document.getElementById('frm_folder').value = customKey;
      document.getElementById('frm_count').value = result.count || 240;
      if (statusText) statusText.textContent = `✓ ${result.count || 240} WebP Karesi Başarıyla Çözümlendi!`;

      // Canlı 360 Döndürme Test Önizlemesi
      this.initModalPreview(this.extractedFrames);
    } catch (err) {
      console.error('Video extraction error:', err);
      if (statusText) statusText.textContent = 'Hata oluştu!';
      alert('Video karelere dönüştürülürken bir hata oluştu: ' + (err.message || err));
    }
  },

  loadTable() {
    this.frames = FrameModel.getAll();
    const tbody = document.getElementById('iframesTableBody');
    if (!tbody) return;

    if (!this.frames || this.frames.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="py-12 text-center text-slate-400 dark:text-zinc-500 text-sm">3D Canvas seti bulunamadı.</td></tr>';
      return;
    }

    tbody.innerHTML = this.frames.map(f => {
      const folderName = f.frames_folder || f.folder || 'frames';
      const frameCount = f.frames_count || f.total_frames || 240;
      return `
      <tr class="hover:bg-neutral-50/70 dark:hover:bg-zinc-800/30 transition-colors">
        <td class="py-5 pl-8 pr-4">
          <div class="w-16 h-16 rounded-xl bg-black flex items-center justify-center p-1 overflow-hidden shadow-2xs border border-neutral-200 dark:border-zinc-800">
            <img src="/${folderName}/frame_0001.webp" onerror="this.src='/frames/frame_0001.webp'" class="w-full h-full object-contain" alt="${f.title}">
          </div>
        </td>
        <td class="py-5 px-4 font-bold text-neutral-900 dark:text-white text-sm">
          ${f.title}
          <div class="text-xs text-neutral-400 font-mono font-normal">/${folderName}</div>
        </td>
        <td class="py-5 px-4 font-mono text-xs font-semibold text-neutral-700 dark:text-zinc-300">
          ${frameCount} Kare (WebP)
        </td>
        <td class="py-5 px-4 text-center">
          ${f.is_active ? 
            '<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#e8f8ee] text-[#16a34a] dark:bg-emerald-500/15 dark:text-emerald-400">👑 Anasayfada Aktif 3D Canvas</span>' : 
            `<button onclick="IframesViewModel.setActive(${f.id})" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Aktif Yap</button>`}
        </td>
        <td class="py-5 pl-4 pr-8 text-right">
          <button onclick="IframesViewModel.deleteFrame(${f.id})" title="Sil" class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-[#fff1f2] dark:bg-rose-950/40 text-[#e11d48] dark:text-rose-400 inline-flex items-center justify-center hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors shadow-2xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </td>
      </tr>
    `;
    }).join('');
    lucide.createIcons();
  },

  openNewModal() {
    document.getElementById('frameForm').reset();
    this.extractedFrames = null;
    const prog = document.getElementById('videoExtractionProgress');
    if (prog) prog.classList.add('hidden');
    const prev = document.getElementById('modalPreviewContainer');
    if (prev) prev.classList.add('hidden');
    document.getElementById('frameModal').classList.remove('hidden');
    lucide.createIcons();
  },

  closeModal() {
    document.getElementById('frameModal').classList.add('hidden');
  },

  initModalPreview(framesArray) {
    const container = document.getElementById('modalPreviewContainer');
    if (!container) return;
    container.classList.remove('hidden');

    const canvas = document.getElementById('previewCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 240;

    let idx = 0;
    function draw(i) {
      const img = new Image();
      img.src = framesArray[i];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const r = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const nw = img.naturalWidth * r;
        const nh = img.naturalHeight * r;
        ctx.drawImage(img, (canvas.width - nw) / 2, (canvas.height - nh) / 2, nw, nh);
      };
    }
    draw(0);

    const box = document.getElementById('previewCanvasBox');
    if (!box) return;
    let isDragging = false;
    let startX = 0;

    box.onmousedown = (e) => { isDragging = true; startX = e.clientX; };
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 5) {
        idx = (idx + (delta > 0 ? 1 : -1) + framesArray.length) % framesArray.length;
        draw(idx);
        startX = e.clientX;
      }
    });
    window.addEventListener('mouseup', () => isDragging = false);
  },

  handleFormSubmit() {
    const data = {
      title: document.getElementById('frm_title').value,
      folder: document.getElementById('frm_folder').value,
      frames_folder: document.getElementById('frm_folder').value,
      total_frames: parseInt(document.getElementById('frm_count').value || 240),
      frames_count: parseInt(document.getElementById('frm_count').value || 240),
      is_active: document.getElementById('frm_active').checked ? 1 : 0
    };

    FrameModel.save(data);
    this.closeModal();
    this.loadTable();
  },

  setActive(id) {
    FrameModel.setActive(id);
    this.loadTable();
  },

  deleteFrame(id) {
    if (confirm('Bu 3D Canvas setini silmek istediğinize emin misiniz?')) {
      FrameModel.delete(id);
      this.loadTable();
    }
  }
};

window.handleVideoFileSelect = function(event) {
  if (window.IframesViewModel && typeof window.IframesViewModel.handleVideoFileSelect === 'function') {
    window.IframesViewModel.handleVideoFileSelect(event);
  }
};