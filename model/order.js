const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: String,
  totalAmount: Number,
  
});

module.exports = mongoose.model('Order', OrderSchema);
