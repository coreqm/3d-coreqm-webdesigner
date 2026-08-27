// 360 Video Frames Model
window.FrameModel = {
  getAll() {
    const list = (Store.getIframes ? Store.getIframes() : []) || [];
    return list.map(f => {
      const folder = f.frames_folder || f.folder || 'frames';
      const count = f.frames_count || f.total_frames || 240;
      return {
        ...f,
        folder: folder,
        frames_folder: folder,
        total_frames: count,
        frames_count: count
      };
    });
  },

  getById(id) {
    const iframes = this.getAll();
    return iframes.find(f => f.id === parseInt(id)) || null;
  },

  save(data) {
    const folder = (data.frames_folder || data.folder || 'frames').trim();
    const count = parseInt(data.frames_count || data.total_frames || 240);
    const item = {
      ...data,
      folder: folder,
      frames_folder: folder,
      total_frames: count,
      frames_count: count
    };
    return Store.saveIframe(item);
  },

  delete(id) {
    return Store.deleteIframe(parseInt(id));
  },

  setActive(id) {
    return Store.setActiveIframe(parseInt(id));
  }
};