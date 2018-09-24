const mongoose = require("mongoose");
const Shop = require("../models/Shop");

class ShopManager {
  constructor(shopService) {
    this._shopService = shopService;
  }

  async get(query) {
    
    const { name } = query;
    
    if (name) {
      const shop = await this._shopService.getByName(name);
      return { status: 200, json: [shop] };
    } else {
      const shops = await this._shopService.getAll();
      return { status: 200, json: shops };
    }
  }

  async create({ name }) {
    
    const newShop = new Shop({
      _id: new mongoose.Types.ObjectId(),
      name,
    });

    try {
      const result = await this._shopService.create(newShop);
      return { status: 201, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }
}

module.exports = ShopManager;