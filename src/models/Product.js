const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  shopName: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  
  // everything here is added through manager
  productLineItems: { type: [], required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
