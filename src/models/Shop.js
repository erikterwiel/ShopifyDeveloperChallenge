const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Shop", shopSchema);
