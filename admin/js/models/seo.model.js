// SEO Model
window.SeoModel = {
  getSeo() {
    return Store.getSeo ? Store.getSeo() : (Store.getSettings ? Store.getSettings() : {});
  },

  saveSeo(data) {
    return Store.saveSeo ? Store.saveSeo(data) : (Store.saveSettings ? Store.saveSettings(data) : data);
  },

  calculateSerpScore(title = '', desc = '') {
    const tLen = title.length;
    const dLen = desc.length;
    const titleScore = tLen >= 40 && tLen <= 60 ? 100 : (tLen > 60 ? Math.max(0, 100 - (tLen - 60) * 3) : Math.round((tLen / 40) * 80));
    const descScore = dLen >= 120 && dLen <= 160 ? 100 : (dLen > 160 ? Math.max(0, 100 - (dLen - 160) * 2) : Math.round((dLen / 120) * 80));
    return Math.round((titleScore + descScore) / 2);
  }
};