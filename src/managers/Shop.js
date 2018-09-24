const mongoose = require("mongoose");
const Shop = require("../models/Shop");

class ShopManager {
  constructor(shopService, orderManager, productManager) {
    this._shopService = shopService;
    this._orderManager = orderManager;
    this._productManager = productManager;
  }

  async get(query) {
    
    const { name } = query;
    
    if (name) {
      
      const originalShop = await this._shopService.getByName(name);
      
      const shop = {};
      shop.products = await this._productManager.get({ shopName: name });
      shop.orders = await this._orderManager.get({ shopName: name });

      return { status: 200, json: shop };

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