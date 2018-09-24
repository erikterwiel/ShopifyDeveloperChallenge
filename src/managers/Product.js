const mongoose = require("mongoose");
const Product = require("../models/Product");

class ProductManager {
  
  constructor(productService, productLIService) {
    this._productService = productService;
    this._productLIService = productLIService;
  }

  async get({ shopName, name }) {
    
    if (shopName && name) {

      const product = await this._productService.getByName(shopName, name);
      product.productLineItems = await this._productLIService.getByProductName(shopName, name);
      delete product.quantity;
      delete product.total;
      delete product._id;
      delete product.__v;
      return { status: 200, json: product[0] };
    
    } else if (shopName) {

      const products = await this._productService.getByShopName(shopName);
      const productsModified = await Promise.all(products.map(async originalProduct => {
       
        const product = JSON.parse(JSON.stringify(originalProduct));

        const productLineItems = await this._productLIService.getByProductName(shopName, originalProduct.name);
        product.productLineItems = productLineItems.map(productLineItem => {
          
          const newLineItem = {};
          newLineItem.shopName = productLineItem.shopName;
          newLineItem.productName = productLineItem.productName;
          newLineItem.name = productLineItem.name;
          newLineItem.price = productLineItem.price;
          
          return newLineItem;
        })
        
        delete product.quantity;
        delete product.total;
        delete product._id;
        delete product.__v;
        return product;
      }));
      return { status: 200, json: productsModified };
    
    } else {

      return { status: 404, json: [] };
    
    }
  }

  async create({ shopName, name, price }) {

    const newProduct = new Product({
      _id: new mongoose.Types.ObjectId(),
      shopName,
      name,
      price,
      productLineItems: [],
      quantity: 0,
      total: 0,
    })

    try {
      const result = await this._productService.create(newProduct);
      return { status: 201, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }

  async update(data) {
    
    const { shopName, name } = data;
    
    try {
      const result = await this._productLIService.update(shopName, name, data);
      return { status: 200, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }

  async delete({ shopName, name }) {

    try {
      const result = await this._productLIService.delete(shopName, name);
      return { status: 200, json: result };
    } catch (error) {
      return { status: 500, json: error };
    }
  }
}

module.exports = ProductManager;