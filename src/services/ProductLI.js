const ProductLI = require("../models/ProductLI");

class ProductLIService {
  async create(data) {
    return data.save();
  }

  async getByProductName(shopName, productName) {
    return ProductLI.find({ shopName, productName }).exec();
  }

  async getByName(shopName, productName, name) {
    return ProductLI.find({ shopName, productName, name }).exec();
  }

  async update(shopName, productName, name, data) {
    return ProductLI.update({ shopName, productName, name }, { $set: data }).exec();
  }

  async delete(shopName, productName, name) {
    return ProductLI.remove({ shopName, productName, name }).exec();
  }
}

module.exports = ProductLIService;
