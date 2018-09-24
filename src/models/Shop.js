const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },

  // everything after this line is entered by manager
  
});

module.exports = mongoose.model("Shop", shopSchema);
