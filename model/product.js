const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image:String,
  name: String,
  price: Number,
  category: String,
  description: String,
  quantity: Number,
});

module.exports = mongoose.model('Product', productSchema);
