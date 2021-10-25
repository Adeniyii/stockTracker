const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  stock_symbol: String,
  stock_price: Number,
});

module.exports = mongoose.model('Stock', stockSchema);
