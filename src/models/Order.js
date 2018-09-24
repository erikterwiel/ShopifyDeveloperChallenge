const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  shopName: { type: String, required: true },
  buyer: { type: String, required: true },
  orderLineItems: [{
    name: String,
    lineItems: [{
      lineItemName: String,
      lineItemQuantity: Number,
    }],
    quantity: Number,
  }]
});

module.exports = mongoose.model("Order", orderSchema);