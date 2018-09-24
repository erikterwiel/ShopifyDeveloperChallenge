const mongoose = require("mongoose");
const Order = require("../models/Order");

class OrderManager {

  constructor(orderService, productService, productLIService) {
    this._orderService = orderService;
    this._productService = productService;
    this._productLIService = productLIService;
  }

  async get({ id, shopName }) {
    if (id) {

      const originalOrder = await this._orderService.getById(id);
      const order = this._transformOrder(originalOrder);
      return { status: 200, json: order }; 

    } else if (shopName) {

      const originalOrders = await this._orderService.getByName(shopName);
      const orders = originalOrders.map(originalOrder => this._transformOrder(originalOrder));
      return { status: 200, json: orders };

    } else {

      return { status: 400, json: [] };

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

  async _transformOrder(originalOrder) {

    const order = JSON.parse(JSON.stringify(originalOrder));

    order.orderLineItems = order.orderLineItems.map(async lineItem => {
        
      const newLineItem = await this._productService.getByName(order.shopName, lineItem.name);
      newLineItem.quantity = lineItem.quantity;

      newLineItem.productLineItems = lineItem.productLineItems.map(async productLineItem => {
        const newProductLineItem = await this._productLIService.getByName(order.shopName, lineItem.name, productLineItem.name);
        newProductLineItem.quantity = productLineItem.quantity;
        newProductLineItem.total = productLineItem.price * productLineItem.quantity;
        return newProductLineItem;
      });

      let total = lineItem.price;
      newLineItem.productLineItems.forEach(productLineItem => total += productLineItem.total);
      newLineItem.total = newLineItem.lineItem;

      return newLineItem; 
    });

    let total = 0;
    total += order.orderLineItems.forEach(orderLineItem => total += orderLineItem.total);
    order.total = total;

    return order;
  }
}

module.exports = OrderManager;