// Product Model
window.ProductModel = {
  getAll() {
    return Store.getProducts();
  },

  getById(id) {
    const prods = Store.getProducts();
    return prods.find(p => p.id === parseInt(id)) || null;
  },

  validate(data) {
    const errors = [];
    if (!data.title || data.title.trim() === '') errors.push('Ürün adı zorunludur.');
    if (isNaN(data.price) || parseFloat(data.price) < 0) errors.push('Geçerli bir fiyat giriniz.');
    if (!data.category || data.category.trim() === '') errors.push('Kategori seçiniz.');
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  save(data) {
    const val = this.validate(data);
    if (!val.isValid) {
      throw new Error(val.errors.join(' '));
    }
    return Store.saveProduct(data);
  },

  delete(id) {
    return Store.deleteProduct(parseInt(id));
  }
};