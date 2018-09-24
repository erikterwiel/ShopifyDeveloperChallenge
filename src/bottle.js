const Bottle = require("bottlejs");

const ShopService = require("./services/Shop");
const ProductService = require("./services/Product");
const ProdcutLIService = require("./services/ProductLI");
const OrderService = require("./services/Order");

const bottle = new Bottle();

bottle.service("shopService", ShopService);
bottle.service("productService", ProductService);
bottle.service("productLIService", ProdcutLIService);
bottle.service("orderService", OrderService);

module.exports = bottle.container;
