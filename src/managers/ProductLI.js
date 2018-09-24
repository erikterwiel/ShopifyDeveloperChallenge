const mongoose = require("mongoose");
const ProductLI = require("../models/ProductLI");

class ProductLIManager {
  
  constructor(productLIService) {
    this._productLIService = productLIService;
  }

  async get({ shopName, productName, name }) {
    
    if (shopName && productName && name) {
      const shop = await this._productLIService.getByName(shopName, productName, name);
      return { status: 200, json: [shop] };
    } else if (shopName && productName) {
      const shops = await this._shopService.getByProductName(shopName, productName);
      return { status: 200, json: shops };
    } else {
      return { status: 404, json: [] };
    }
  }

  async create({ shopName, productName, name, price }) {
    
    const newProductLI = new ProductLI({
      _id: new mongoose.Types.ObjectId(),
      shopName,
      productName,
      name,
      price,
    });

    try {
      const result = await this._productLIService.create(newProductLI);
      return { status: 201, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }

  async update(data) {
    
    const { shopName, productName, name } = data;
    
    try {
      const result = await this._productLIService.update(shopName, productName, name, data);
      return { status: 201, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }

  async delete({ shopName, productName,  name }) {

    try {
      const result = await this._productLIService.delete(shopName, productName, name);
      return { status: 201, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }
}

module.exports = ProductLIManager;