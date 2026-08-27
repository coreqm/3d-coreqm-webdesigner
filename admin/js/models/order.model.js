// Order Model
window.OrderModel = {
  getAll() {
    return Store.getOrders();
  },

  getById(id) {
    const orders = Store.getOrders();
    return orders.find(o => o.id === parseInt(id)) || null;
  },

  updateStatus(id, newStatus) {
    return Store.updateOrderStatus(parseInt(id), newStatus);
  },

  getStats() {
    const orders = Store.getOrders();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);
    const activeShipments = orders.filter(o => o.status === 'Kargoya Verildi' || o.status === 'Hazırlanıyor').length;
    return {
      totalOrders,
      totalRevenue,
      activeShipments
    };
  }
};