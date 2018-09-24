const Bottle = require("bottlejs");

const ShopService = require("./services/Shop");
const ProductService = require("./services/Product");
const ProdcutLIService = require("./services/ProductLI");
const OrderService = require("./services/Order");
const ShopManager = require("./managers/Shop");
const ProductManager = require("./managers/Product");
const ProductLIManager = require("./managers/ProductLI");
const OrderManager = require("./managers/Order");

const bottle = new Bottle();

bottle.service("shopService", ShopService);
bottle.service("productService", ProductService);
bottle.service("productLIService", ProdcutLIService);
bottle.service("orderService", OrderService);
bottle.service("productLIManager", ProductLIManager, "productLIService");
bottle.service("productManager", ProductManager, "productService", "productLIService");
bottle.service("orderManager", OrderManager, "orderService", "productService", "productLIService");
bottle.service("shopManager", ShopManager, "shopService", "orderManager", "productManager");

module.exports = bottle.container;
