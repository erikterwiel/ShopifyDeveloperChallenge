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
      const order = await this._transformOrder(originalOrder);
      return { status: 200, json: order }; 

    } else if (shopName) {

      const originalOrders = await this._orderService.getByShopName(shopName);
      const orders = await Promise.all(originalOrders.map(originalOrder => this._transformOrder(originalOrder)));
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
    order.orderLineItems = await Promise.all(order.orderLineItems.map(async lineItem => {
        
      const lineItemObject = await this._productService.getByName(order.shopName, lineItem.name);
      const newLineItem = {};
      console.log(lineItemObject);
      newLineItem.name = lineItemObject[0].name;
      newLineItem.price = lineItemObject[0].price;
      newLineItem.quantity = lineItem.quantity;

      newLineItem.productLineItems = await Promise.all(lineItem.productLineItems.map(async productLineItem => {
        const originalProductLineItem = await this._productLIService.getByName(order.shopName, lineItem.name, productLineItem.name);
        
        const newProductLineItem = {};
        newProductLineItem.name = originalProductLineItem[0].name;
        newProductLineItem.price = originalProductLineItem[0].price;
        newProductLineItem.quantity = productLineItem.quantity;
        newProductLineItem.total = originalProductLineItem[0].price * productLineItem.quantity;

        return newProductLineItem;
      }));

      let total = lineItemObject[0].price;
      newLineItem.productLineItems.forEach(productLineItem => total += productLineItem.total);
      newLineItem.total = total;

      return newLineItem; 
    }));

    let total = 0;
    order.orderLineItems.forEach(orderLineItem => total += orderLineItem.total);
    order.total = total;

    return order;
  }
}

module.exports = OrderManager;