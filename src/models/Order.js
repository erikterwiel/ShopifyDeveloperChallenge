const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  shopName: { type: String, required: true },
  buyerName: { type: String, required: true },
  orderLineItems: [{
    name: String,
    quantity: Number,
    productLineItems: [{
      name: String,
      quantity: Number,
    }],
  }],

  // everything after this line is made by manager
  total: { type: Number,required: true },
});

module.exports = mongoose.model("Order", orderSchema);