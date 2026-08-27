// User & Auth Model
window.UserModel = {
  getCurrentUser() {
    return Store.getUser();
  },

  requireAdmin() {
    const user = Store.getUser();
    const token = Store.getToken ? Store.getToken() : (typeof localStorage !== 'undefined' ? localStorage.getItem('aether_token') : null);

    // Kriptografik Oturum ve Rol Doğrulaması
    const isTokenValid = (Store.validateSession && user) ? Store.validateSession(token, user.id) : (!!user && !!token);

    if (!user || user.role !== 'admin' || !isTokenValid) {
      if (Store.logout) Store.logout();
      if (typeof window !== 'undefined' && window.location) {
        window.location.href = '/login.html';
      }
      return null;
    }
    return user;
  },

  changePassword(oldPass, newPass) {
    const user = this.getCurrentUser();
    if (!user) throw new Error('Oturum açılmamış.');
    if (!newPass || newPass.length < 6) throw new Error('Yeni şifre en az 6 karakter olmalıdır.');
    return Store.changePassword(user.id, oldPass, newPass);
  },

  logout() {
    Store.logout();
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = '/login.html';
    }
  }
};