const Shop = require("../models/Shop");

class ShopService {
  async create(data) {
    return data.save();
  }

  async getAll() {
    return Shop.find().exec();
  }

  async getByName(name) {
    return Shop.find({ name }).exec();
  }

  async update(name, data) {
    return Shop.update({ name }, { $set: data }).exec();
  }

  async delete(name) {
    return Shop.remove({ name }).exec();
  }
}

module.exports = ShopService;
