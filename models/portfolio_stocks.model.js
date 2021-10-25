const mongoose = require('mongoose');

const portfolioStock = new mongoose.Schema({
  stock_id: { type: mongoose.Schema.Types.ObjectId, ref: 'stock' },
  portfolio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'portfolio' },
});

module.exports = mongoose.model('portfolio_stock', portfolioStock);
