const Product = require("../models/Product");

class ProductService {
  async create(data) {
    return data.save();
  }

  async getByShopName(shopName) {
    return Product.find({ shopName }).exec();
  }

  async getByName(shopName, name) {
    return Product.find({ shopName, name }).exec();
  }

  async update(shopName, name, data) {
    return Product.update({ shopName, name }, { $set: data }).exec();
  }

  async delete(shopName, name) {
    return Product.remove({ shopName, name }).exec();
  }
}

module.exports = ProductService;
