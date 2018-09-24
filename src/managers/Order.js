const mongoose = require("mongoose");
const Order = require("../models/Order");

class OrderManager {

  constructor(orderService, productService, productLIService) {
    this._orderService = orderService;
    this._productService = productService;
    this._productLIService = productLIService;
  }

  async get({ id, shopName, }) {
    if (id) {

      const originalOrder = await this._orderService.getById(id);
      
      const order = JSON.parse(JSON.stringify(originalOrder));

      order.orderLineItems = order.orderLineItems.map(lineItem => {
        
        const newLineItem = {};
        newLineItem.product = await this._productService.getByName(order.shopName, lineItem.name);
        newLineItem.quantity = lineItem.quantity;

        newLineItem.productLineItems = lineItem.productLineItems.map(productLineItem => {
          const newProductLineItem = {};
          newProductLineItem.product
        });

        newLineItem.total = newLineItem.lineItem; 
      });


      order.total = 0;
    } else if (shopName) {

    }
  }

  async create({ shopName, buyerName, orderLineItems }) {

    const newOrder = new Order({
      _id: new mongoose.Types.ObjectId(),
      shopName,
      buyerName,
      orderLineItems,
      total: 0,
    });

    try {
      const result = await this._orderService.create(newOrder);
      return { status: 201, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }

  async update(data) {
    
    try {
      const result = await this._orderService.update(data.id, data);
      return { status: 200, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }

  async delete(data) {

    try {
      const result = await this._orderService.delete(data.id);
      return { status: 200, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }
}

module.exports = OrderManager;