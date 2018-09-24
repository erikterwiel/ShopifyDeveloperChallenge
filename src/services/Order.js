const Order = require("../models/Order");

class OrderService {
  async create(data) {
    return data.save();
  }

  async getByShopName(shopName) {
    return Order.find({ shopName }).exec();
  }

  async getById(id) {
    return Order.findById(id).exec();
  }

  async update(id, data) {
    return Order.update({ _id: id }, { $set: data }).exec();
  }

  async delete(id) {
    return Order.remove({ _id: id }).exec();
  }
}

module.exports = OrderService;
