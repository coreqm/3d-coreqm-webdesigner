// Settings & Navigation Model
window.SettingsModel = {
  getSettings() {
    return Store.getSettings();
  },

  saveSettings(data) {
    return Store.saveSettings(data);
  },

  getNavItems() {
    return (Store.getNavItems ? Store.getNavItems() : Store.getNavMenu()) || [];
  },

  saveNavItem(item) {
    return Store.saveNavItem(item);
  },

  deleteNavItem(id) {
    return Store.deleteNavItem(parseInt(id));
  },

  getMapSettings() {
    const s = Store.getSettings();
    return {
      map_title: s.map_title || '',
      map_address: s.map_address || '',
      map_phone: s.map_phone || '',
      map_iframe: s.map_iframe || ''
    };
  },

  saveMapSettings(data) {
    return Store.saveSettings({
      map_title: data.map_title,
      map_address: data.map_address,
      map_phone: data.map_phone,
      map_iframe: data.map_iframe
    });
  }
};