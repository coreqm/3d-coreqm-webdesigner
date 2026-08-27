// Security ViewModel
window.SecurityViewModel = {
  init() {
    UserModel.requireAdmin();
    AdminSidebar.init('security');
    AdminHeader.init({
      title: 'Şifre & Güvenlik',
      subtitle: 'Yönetici hesap şifresini ve oturum güvenlik parametrelerini yönetin.'
    });

    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('adminPassForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handlePasswordChange();
    });
  },

  handlePasswordChange() {
    const oldPass = document.getElementById('adm_old_pass').value;
    const newPass = document.getElementById('adm_new_pass').value;

    try {
      const res = UserModel.changePassword(oldPass, newPass);
      alert(res.message || res.error);
      if (res.success) {
        document.getElementById('adminPassForm').reset();
      }
    } catch (err) {
      alert(err.message);
    }
  }
};