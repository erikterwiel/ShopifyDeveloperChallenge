const mongoose = require("mongoose");

const productLISchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  shopName: { type: String, require: true },
  productName: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },

  // everything after this line is handled through manager
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model("ProductLI", productLISchema);
